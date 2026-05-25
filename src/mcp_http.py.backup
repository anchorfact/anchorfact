"""
AnchorFact MCP HTTP Server - REST API wrapper
"""
import json
from pathlib import Path
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse

DIST_DIR = Path(__file__).resolve().parent.parent / "dist"

app = FastAPI(title="AnchorFact MCP", version="1.0.0")

_article_index: list[dict] | None = None

def load_index() -> list[dict]:
    global _article_index
    if _article_index is not None:
        return _article_index
    index = []
    for json_file in DIST_DIR.glob("*/index.json"):
        try:
            data = json.loads(json_file.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, IOError):
            continue
        aid = data.get("@id", "").split("/")[-1] if "@id" in data else ""
        if not aid:
            continue
        index.append({
            "id": aid,
            "title": data.get("headline", ""),
            "confidence": data.get("anchorfact:confidence", "medium"),
            "description": data.get("description", ""),
        })
    _article_index = index
    return index

def search_articles(query: str, confidence_min: str = "medium", limit: int = 5):
    manifest = load_index()
    confidence_rank = {"high": 3, "medium": 2, "low": 1}
    min_rank = confidence_rank.get(confidence_min, 1)
    ql = query.lower()
    keywords = ql.split()
    scored = []
    for a in manifest:
        conf = a.get("confidence", "low")
        if confidence_rank.get(conf, 0) < min_rank:
            continue
        title = (a.get("title") or "").lower()
        desc = (a.get("description") or "").lower()
        combined = title + " " + desc
        score = sum(1 for kw in keywords if kw in combined)
        if score == 0:
            continue
        scored.append((score, a, conf))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [a for _, a, _ in scored[:limit]]

@app.get("/health")
def health():
    return {"status": "ok", "articles": len(load_index())}

@app.get("/search")
def api_search(
    q: str = Query(..., description="搜索关键词"),
    confidence_min: str = Query("medium", enum=["high", "medium", "low"]),
    limit: int = Query(5, ge=1, le=20),
):
    results = search_articles(q, confidence_min, limit)
    return {
        "query": q,
        "confidence_min": confidence_min,
        "results": [{
            "id": r.get("id"),
            "title": r.get("title"),
            "confidence": r.get("confidence"),
            "description": r.get("description"),
            "markdown_url": f"https://anchorfact.org/{r.get('id')}/index.md",
            "jsonld_url": f"https://anchorfact.org/{r.get('id')}/index.json",
        } for r in results],
        "source": "AnchorFact — anchorfact.org",
    }

@app.get("/article/{article_id}")
def api_article(article_id: str):
    jsonld_file = DIST_DIR / article_id / "index.json"
    if not jsonld_file.exists():
        return JSONResponse({"error": f"文章 {article_id} 不存在"}, status_code=404)
    detail = json.loads(jsonld_file.read_text(encoding="utf-8"))
    return {
        "id": article_id,
        "title": detail.get("headline", ""),
        "confidence": detail.get("anchorfact:confidence", "medium"),
        "confidence_rationale": detail.get("anchorfact:confidenceRationale", ""),
        "description": detail.get("description", ""),
        "primary_sources": [
            {"name": s.get("name", ""), "url": s.get("sameAs", "")}
            for s in detail.get("citation", [])
        ],
        "date_created": detail.get("dateCreated", ""),
        "date_modified": detail.get("dateModified", ""),
        "markdown_url": f"https://anchorfact.org/{article_id}/index.md",
    }

@app.get("/stats")
def api_stats():
    manifest = load_index()
    total = len(manifest)
    high = sum(1 for a in manifest if a.get("confidence") == "high")
    medium = sum(1 for a in manifest if a.get("confidence") == "medium")
    low = sum(1 for a in manifest if a.get("confidence") == "low")
    return {"total": total, "high": high, "medium": medium, "low": low}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

