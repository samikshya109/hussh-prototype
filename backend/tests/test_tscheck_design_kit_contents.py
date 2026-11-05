"""tscheck: refreshed design kit zip contains the expected structure.

Criterion: GET /downloads/hussh-design-kit.zip returns 200 application/zip; the
zip contains desktop/ and mobile/ full-page @2x PNGs, 8 section PNGs each,
assets/images, assets/brands (brand logos), tokens.json and README.md.

Served as a static asset from the frontend dev server (Vite publicDir), not the
FastAPI backend, so we hit :3000 directly (same host the browser uses).
"""
import io
import zipfile

import httpx

FRONTEND_BASE = "http://localhost:3000"


def _download_zip() -> zipfile.ZipFile:
    resp = httpx.get(f"{FRONTEND_BASE}/downloads/hussh-design-kit.zip", timeout=30)
    assert resp.status_code == 200, f"expected 200, got {resp.status_code}"
    content_type = resp.headers.get("content-type", "")
    assert "zip" in content_type, f"unexpected content-type: {content_type}"
    return zipfile.ZipFile(io.BytesIO(resp.content))


def test_design_kit_zip_has_full_page_exports_for_both_breakpoints():
    zf = _download_zip()
    names = zf.namelist()

    for breakpoint_ in ("desktop", "mobile"):
        full_page = [
            n for n in names
            if f"/{breakpoint_}/" in n and "full@2x.png" in n and "/sections/" not in n
        ]
        assert full_page, f"missing full-page @2x PNG for {breakpoint_}: {names}"

        section_pngs = [
            n for n in names
            if f"/{breakpoint_}/sections/" in n and n.endswith("@2x.png")
        ]
        assert len(section_pngs) == 8, (
            f"expected 8 section PNGs for {breakpoint_}, got {len(section_pngs)}: {section_pngs}"
        )


def test_design_kit_zip_has_assets_tokens_and_readme():
    zf = _download_zip()
    names = zf.namelist()

    assert any("/assets/images/" in n for n in names), f"missing assets/images/ entries: {names}"
    assert any(
        "/assets/brand-logos/" in n or "/assets/brands/" in n for n in names
    ), f"missing assets brand logos folder: {names}"
    assert any(n.endswith("tokens.json") for n in names), f"missing tokens.json: {names}"
    assert any(n.endswith("README.md") for n in names), f"missing README.md: {names}"
