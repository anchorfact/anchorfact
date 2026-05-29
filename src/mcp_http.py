"""
AnchorFact MCP HTTP wrapper.

This local API is backed by dist/manifest.json and exposes public articles only.
"""

from pathlib import Path

from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse, PlainTextResponse

from mcp_claims import build_citation_payload, render_citation_markdown
from mcp_index import (
    list_public_categories,
    load_article_detail,
    load_public_article_index,
    resolve_article_reference,
)
from mcp_search import BM25Index

DIST_DIR = Path(__file__).resolve().parent.parent / "dist"

app = FastAPI(title="AnchorFact MCP", version="1.1.0")

_article_index: list[dict] | None = None
_search_index = BM25Index()


def load_index() -> list[dict]:
    global _article_index
    if _article_index is None:
        _article_index = load_public_article_index(DIST_DIR)
        _search_index.build(_article_index)
    return _article_index


def search_articles(query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
    load_index()
    return _search_index.search(query, confidence_min=confidence_min, limit=limit)


def search_result(article: dict) -> dict:
    return {
        "id": article.get("id"),
        "canonical_slug": article.get("canonical_slug"),
        "canonical_url": article.get("canonical_url"),
        "jsonld_id": article.get("jsonld_id"),
        "title": article.get("title"),
        "confidence": article.get("confidence"),
        "confidence_score": article.get("confidence_score"),
        "confidence_basis": article.get("confidence_basis"),
        "description": article.get("description"),
        "markdown_url": article.get("markdown_url"),
        "jsonld_url": article.get("jsonld_url"),
    }


def article_response(article_id: str):
    entry = resolve_article_reference(DIST_DIR, article_id)
    detail = load_article_detail(DIST_DIR, article_id)
    if not entry or not detail:
        return JSONResponse({"error": {"code": "NOT_FOUND", "message": f"Article not found: {article_id}"}}, status_code=404)
    return {
        "id": entry.get("id"),
        "canonical_slug": entry.get("canonical_slug"),
        "canonical_url": entry.get("canonical_url"),
        "jsonld_id": entry.get("jsonld_id"),
        "title": detail.get("headline", ""),
        "confidence": detail.get("anchorfact:confidence", "medium"),
        "confidence_score": detail.get("anchorfact:confidenceScore"),
        "description": detail.get("description", ""),
        "primary_sources": [
            {"name": source.get("name", ""), "url": source.get("sameAs", "")}
            for source in detail.get("citation", [])
        ],
        "date_created": detail.get("dateCreated", ""),
        "date_modified": detail.get("dateModified", ""),
        "markdown_url": entry.get("markdown_url"),
        "jsonld_url": entry.get("jsonld_url"),
    }


@app.get("/health")
def health():
    return {"status": "ok", "articles": len(load_index())}


@app.get("/search")
def api_search(
    q: str = Query(..., description="Search query"),
    confidence_min: str = Query("medium", enum=["high", "medium", "low"]),
    limit: int = Query(5, ge=1, le=20),
):
    return {
        "query": q,
        "confidence_min": confidence_min,
        "results": [search_result(article) for article in search_articles(q, confidence_min, limit)],
        "source": "AnchorFact - anchorfact.org",
    }


@app.get("/article")
def api_article_query(id: str = Query(..., description="Canonical slug, canonical URL, or JSON-LD @id")):
    return article_response(id)


@app.get("/article/{article_id:path}")
def api_article(article_id: str):
    return article_response(article_id)


@app.get("/cite")
def api_cite(
    id: str = Query(..., description="Claim shorthand, /fact/{id}, or full AnchorFact claim URL"),
    format: str = Query("json", enum=["json", "markdown", "md"]),
):
    status, payload = build_citation_payload(DIST_DIR, id)
    if status == 200 and format in {"markdown", "md"}:
        return PlainTextResponse(render_citation_markdown(payload), media_type="text/markdown")
    return JSONResponse(payload, status_code=status)


@app.get("/stats")
def api_stats():
    articles = load_index()
    high = sum(1 for article in articles if article.get("confidence") == "high")
    medium = sum(1 for article in articles if article.get("confidence") == "medium")
    low = sum(1 for article in articles if article.get("confidence") == "low")
    return {
        "total": len(articles),
        "high": high,
        "medium": medium,
        "low": low,
        "categories": list_public_categories(DIST_DIR),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
