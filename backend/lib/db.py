"""Shared Mongo handle — import `client`/`db` from here (server.py, routers, seed.py).

The Motor client is created lazily, one per running event loop. A Motor client is
tied to the loop it first runs on, and serverless hosts (Vercel) may serve requests
on a different loop than the one the module was imported under, so a single
import-time client would fail there. Locally (uvicorn) there is one loop, so this
behaves exactly like a plain module-level client.
"""

import asyncio
import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel

load_dotenv(Path(__file__).parent.parent / ".env")

mongo_url = os.environ["MONGO_URL"]
db_name = os.environ["DB_NAME"]

logger = logging.getLogger(__name__)

_clients: dict[asyncio.AbstractEventLoop, AsyncIOMotorClient] = {}


def _current_client() -> AsyncIOMotorClient:
    loop = asyncio.get_running_loop()
    # Drop clients whose loop has gone away so they don't pile up.
    for old_loop in [lp for lp in _clients if lp.is_closed()]:
        _clients.pop(old_loop).close()
    c = _clients.get(loop)
    if c is None:
        c = AsyncIOMotorClient(mongo_url)
        _clients[loop] = c
    return c


class _LazyClient:
    def __getattr__(self, name):
        return getattr(_current_client(), name)

    def __getitem__(self, name):
        return _current_client()[name]

    def close(self) -> None:
        for c in _clients.values():
            c.close()
        _clients.clear()


class _LazyDB:
    def __getattr__(self, name):
        return getattr(_current_client()[db_name], name)

    def __getitem__(self, name):
        return _current_client()[db_name][name]


client = _LazyClient()
db = _LazyDB()

# One entry per collection: every field a route filters, sorts, or dedupes on. Applied by ensure_indexes() at startup.
INDEXES: dict[str, list[IndexModel]] = {
    "status_checks": [IndexModel([("timestamp", DESCENDING)], name="timestamp_desc")],
    "signups": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("email", ASCENDING), ("source", ASCENDING)], name="email_source", unique=True),
    ],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:  # one at a time so a bad spec skips only itself
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:  # never block boot on an index; the log line names what to fix
                logger.error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)
