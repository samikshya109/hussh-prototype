"""
Backend coverage for the "Email signups" acceptance criterion.
Hits the running server over HTTP (never imports the app object / mocks the DB).
"""
import time
import httpx
import pytest

BASE_URL = "http://localhost:8001/api"


def _unique_email():
    return f"tscheck-signup-{int(time.time() * 1000)}@example.com"


@pytest.mark.asyncio
async def test_signup_happy_path_creates_new_email():
    email = _unique_email()
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(f"{BASE_URL}/signups", json={"email": email, "source": "tag_one"})
    assert resp.status_code == 201, resp.text
    body = resp.json()
    assert body["email"] == email.lower()
    assert body["source"] == "tag_one"
    assert "id" in body and "created_at" in body


@pytest.mark.asyncio
async def test_signup_duplicate_email_returns_409():
    email = _unique_email()
    async with httpx.AsyncClient(timeout=10) as client:
        first = await client.post(f"{BASE_URL}/signups", json={"email": email, "source": "agent_one"})
        assert first.status_code == 201, first.text
        second = await client.post(f"{BASE_URL}/signups", json={"email": email, "source": "agent_one"})
    assert second.status_code == 409, second.text
    assert "already" in second.json().get("detail", "").lower()


@pytest.mark.asyncio
async def test_signup_invalid_email_returns_422():
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(
            f"{BASE_URL}/signups", json={"email": "not-an-email", "source": "tag_one"}
        )
    assert resp.status_code == 422, resp.text
