"""Vercel entrypoint: serves the FastAPI app in backend/ as one serverless function.

vercel.json rewrites every /api/* request here; FastAPI still sees the original
path (e.g. /api/signups), so the routes in backend/ work unchanged.
"""

import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(BACKEND_DIR))

from server import app  # noqa: E402,F401
