"""tscheck: design kit zip is downloadable, correct content-type and size.

Served as a static asset from the frontend dev server (Vite publicDir), not the
FastAPI backend, so we hit :3000 directly (same host the browser uses).
"""
import httpx

FRONTEND_BASE = "http://localhost:3000"


def test_design_kit_zip_downloads_ok():
    resp = httpx.get(f"{FRONTEND_BASE}/downloads/hussh-design-kit.zip", timeout=30)
    assert resp.status_code == 200, f"expected 200, got {resp.status_code}"
    content_type = resp.headers.get("content-type", "")
    assert "zip" in content_type, f"unexpected content-type: {content_type}"
    size_mb = len(resp.content) / (1024 * 1024)
    assert size_mb >= 20, f"expected >=20MB zip, got {size_mb:.1f}MB"
