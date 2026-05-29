"""
Local query planner for AnchorFact MCP stdio and HTTP interfaces.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode

PLAN_API_SCHEMA_VERSION = "anchorfact.plan-api.v1"
OFFICIAL_SITE = "https://anchorfact.org"
LOCAL_HTTP_BASE_URL = "http://127.0.0.1:8000"
PROVENANCE_PATH = "/provenance.json"
MIN_LIMIT = 1
DEFAULT_LIMIT = 3
MAX_LIMIT = 10


def _public_url(path: str, site: str = OFFICIAL_SITE) -> str:
    normalized_path = path if str(path).startswith("/") else f"/{path}"
    return f"{str(site or OFFICIAL_SITE).rstrip('/')}{normalized_path}"


def _local_http_url(path: str) -> str:
    normalized_path = path if str(path).startswith("/") else f"/{path}"
    return f"{LOCAL_HTTP_BASE_URL}{normalized_path}"


def _load_json(dist_dir: Path, filename: str, default: dict) -> dict:
    try:
        path = Path(dist_dir) / filename
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return default


def _normalize_text(value) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", str(value or "").lower())).strip()


def _query_tokens(query: str) -> list[str]:
    return [token for token in _normalize_text(query).split(" ") if len(token) >= 2]


def _clamp_limit(value) -> int:
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        return DEFAULT_LIMIT
    return min(MAX_LIMIT, max(MIN_LIMIT, parsed))


def _query_path(path: str, params: dict) -> str:
    clean_params = {
        key: str(value)
        for key, value in params.items()
        if value is not None and str(value).strip()
    }
    return f"{path}?{urlencode(clean_params)}"


def _call(path: str, purpose: str, site: str = OFFICIAL_SITE) -> dict:
    return {
        "method": "GET",
        "path": path,
        "url": _public_url(path, site),
        "purpose": purpose,
    }


def _local_http_call(path: str, purpose: str) -> dict:
    return {
        "method": "GET",
        "path": path,
        "url": _local_http_url(path),
        "purpose": purpose,
    }


def _error_payload(code: str, message: str) -> dict:
    return {
        "schema_version": PLAN_API_SCHEMA_VERSION,
        "error": {"code": code, "message": message},
    }


def _generated_timestamp() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def _occurrence_count(haystack: str, needle: str) -> int:
    if not needle:
        return 0
    count = 0
    position = haystack.find(needle)
    while position != -1:
        count += 1
        position = haystack.find(needle, position + len(needle))
    return count


def _score_record(record: dict, query: str, tokens: list[str]) -> dict:
    title = _normalize_text(record.get("title", ""))
    description = _normalize_text(record.get("description", ""))
    text = _normalize_text(record.get("search_text", ""))
    keywords = {_normalize_text(keyword) for keyword in record.get("keywords", [])}
    phrase = _normalize_text(query)
    matched_keywords: set[str] = set()
    score = 0

    if phrase and phrase in title:
        score += 16
    if phrase and phrase in text:
        score += 8
    if phrase and phrase in description:
        score += 4

    title_words = set(title.split(" "))
    for token in tokens:
        if token in title_words:
            score += 8
            matched_keywords.add(token)
        if token in keywords:
            score += 6
            matched_keywords.add(token)
        if token in description:
            score += 2
            matched_keywords.add(token)
        occurrences = _occurrence_count(text, token)
        if occurrences > 0:
            score += min(occurrences, 4)
            matched_keywords.add(token)

    return {"score": score, "matched_keywords": sorted(matched_keywords)}


def _result_record(record: dict, score: dict) -> dict:
    return {
        "canonical_slug": record.get("canonical_slug"),
        "title": record.get("title"),
        "url": record.get("url"),
        "description": record.get("description"),
        "confidence_level": record.get("confidence_level"),
        "source_coverage": record.get("source_coverage"),
        "claim_count": record.get("claim_count", 0),
        "claim_ids": record.get("claim_ids", []),
        "routes": record.get("routes", {}),
        "score": round(score["score"], 3),
        "matched_keywords": score["matched_keywords"],
    }


def _rank_search_records(records: list[dict], query: str, limit: int) -> list[dict]:
    tokens = _query_tokens(query)
    if not tokens:
        return []

    scored = [
        {"record": record, "score": _score_record(record, query, tokens)}
        for record in records or []
    ]
    matches = [entry for entry in scored if entry["score"]["score"] > 0]
    matches.sort(
        key=lambda entry: (
            -entry["score"]["score"],
            -(entry["record"].get("claim_count") or 0),
            str(entry["record"].get("canonical_slug", "")),
        )
    )
    return [_result_record(entry["record"], entry["score"]) for entry in matches[:_clamp_limit(limit)]]


def _score_topic(topic: dict, query: str, tokens: list[str]) -> dict:
    phrase = _normalize_text(query)
    topic_id = _normalize_text(topic.get("id", ""))
    title = _normalize_text(topic.get("title", ""))
    article_text = _normalize_text(" ".join(
        f"{article.get('title', '')} {article.get('canonical_slug', '')}"
        for article in topic.get("top_articles", [])
    ))
    matched_keywords: set[str] = set()
    score = 0

    if phrase and phrase in title:
        score += 8
    if phrase and topic_id == phrase:
        score += 6

    id_words = set(topic_id.split(" "))
    title_words = set(title.split(" "))
    for token in tokens:
        if token in id_words or token in title_words:
            score += 3
            matched_keywords.add(token)
        if token in article_text:
            score += 1
            matched_keywords.add(token)

    return {"score": score, "matched_keywords": sorted(matched_keywords)}


def _topic_entrypoint(topic: dict) -> str:
    return topic.get("best_entrypoint") or _query_path(
        "/api/evidence",
        {"q": topic.get("title") or topic.get("id"), "limit": DEFAULT_LIMIT},
    )


def _ranked_topics(topics: list[dict], query: str, limit: int) -> list[dict]:
    tokens = _query_tokens(query)
    if not tokens:
        return []

    scored = [
        {"topic": topic, "score": _score_topic(topic, query, tokens)}
        for topic in topics or []
    ]
    matches = [entry for entry in scored if entry["score"]["score"] > 0]
    matches.sort(
        key=lambda entry: (
            -entry["score"]["score"],
            -(entry["topic"].get("article_count") or 0),
            str(entry["topic"].get("id", "")),
        )
    )
    return [
        {
            "id": entry["topic"].get("id"),
            "title": entry["topic"].get("title"),
            "article_count": entry["topic"].get("article_count", 0),
            "claim_count": entry["topic"].get("claim_count", 0),
            "source_count": entry["topic"].get("source_count", 0),
            "best_entrypoint": _topic_entrypoint(entry["topic"]),
            "score": entry["score"]["score"],
            "matched_keywords": entry["score"]["matched_keywords"],
        }
        for entry in matches[:limit]
    ]


def _compact_article(result: dict) -> dict:
    return {
        "canonical_slug": result.get("canonical_slug"),
        "title": result.get("title"),
        "url": result.get("url"),
        "confidence_level": result.get("confidence_level"),
        "source_coverage": result.get("source_coverage") or None,
        "claim_count": result.get("claim_count", 0),
        "claim_ids": (result.get("claim_ids") or [])[:3],
        "routes": result.get("routes", {}),
        "score": result.get("score"),
        "matched_keywords": result.get("matched_keywords", []),
    }


def _coverage_status(article_matches: list[dict], topic_matches: list[dict]) -> str:
    if article_matches:
        return "supported"
    if topic_matches:
        return "topic_supported"
    return "unsupported"


def _confidence_for(status: str, article_matches: list[dict]) -> str:
    if status == "unsupported":
        return "low"
    if status == "topic_supported":
        return "medium"
    top_score = float(article_matches[0].get("score") or 0)
    return "high" if top_score >= 12 else "medium"


def _recommended_calls(status: str, query: str, limit: int, article_matches: list[dict], topic_matches: list[dict]) -> list[dict]:
    if status == "unsupported":
        return [
            _call("/coverage.json", "Inspect AnchorFact topic limits before relying on this query."),
            _call(
                _query_path("/api/search", {"q": query, "limit": limit}),
                "Optional broad check; do not cite if this also returns no public records.",
            ),
        ]

    calls = [
        _call(
            _query_path("/api/evidence", {"q": query, "limit": limit}),
            "Fetch source-grounded evidence packs for the planned query.",
        )
    ]
    top_article = article_matches[0] if article_matches else None
    if top_article and top_article.get("canonical_slug"):
        calls.append(_call(
            _query_path("/api/article", {"slug": top_article["canonical_slug"]}),
            "Inspect the highest ranked public article with claims and sources.",
        ))
    first_claim = (top_article.get("claim_ids") or [None])[0] if top_article else None
    if first_claim:
        calls.append(_call(
            _query_path("/api/cite", {"id": first_claim}),
            "Retrieve citation-ready text for the strongest candidate claim.",
        ))
    if topic_matches and topic_matches[0].get("best_entrypoint") and topic_matches[0]["best_entrypoint"] != calls[0]["path"]:
        calls.append(_call(
            topic_matches[0]["best_entrypoint"],
            "Compare against the nearest topic-level evidence entrypoint.",
        ))
    calls.append(_call("/provenance.json", "Verify the signed production artifact set before trusting static artifact hashes."))
    return calls


def _local_http_next_calls(status: str, query: str, limit: int, article_matches: list[dict]) -> list[dict]:
    if status == "unsupported":
        return [
            _local_http_call("/stats", "Inspect local public coverage counts and categories."),
            _local_http_call(
                _query_path("/search", {"q": query, "confidence_min": "low", "limit": limit}),
                "Optional broad local search; do not cite if this returns no records.",
            ),
        ]

    calls = [
        _local_http_call(
            _query_path("/search", {"q": query, "confidence_min": "low", "limit": limit}),
            "Search the local public article index.",
        )
    ]
    top_article = article_matches[0] if article_matches else None
    if top_article and top_article.get("canonical_slug"):
        calls.append(_local_http_call(
            _query_path("/article", {"id": top_article["canonical_slug"]}),
            "Load the top local public article detail.",
        ))
    first_claim = (top_article.get("claim_ids") or [None])[0] if top_article else None
    if first_claim:
        calls.append(_local_http_call(
            _query_path("/cite", {"id": first_claim}),
            "Return citation-ready local JSON for the strongest candidate claim.",
        ))
    return calls


def _local_mcp_next_tools(status: str, query: str, limit: int, article_matches: list[dict]) -> list[dict]:
    if status == "unsupported":
        return [
            {
                "tool": "anchorfact_search",
                "arguments": {"query": query, "confidence_min": "low", "limit": limit},
                "purpose": "Optional broad local search; do not cite if this returns no public records.",
            }
        ]

    tools = [
        {
            "tool": "anchorfact_search",
            "arguments": {"query": query, "confidence_min": "low", "limit": limit},
            "purpose": "Search local public records before retrieving details.",
        }
    ]
    top_article = article_matches[0] if article_matches else None
    if top_article and top_article.get("canonical_slug"):
        tools.append({
            "tool": "anchorfact_get_article",
            "arguments": {"article_id": top_article["canonical_slug"]},
            "purpose": "Inspect claims and sources for the top matched article.",
        })
    first_claim = (top_article.get("claim_ids") or [None])[0] if top_article else None
    if first_claim:
        tools.append({
            "tool": "anchorfact_cite_claim",
            "arguments": {"claim_id": first_claim},
            "purpose": "Export citation-ready text for the strongest candidate claim.",
        })
    return tools


def _fallback_guidance(status: str) -> list[str]:
    if status == "unsupported":
        return [
            "AnchorFact has no clear public coverage for this query.",
            "Use external primary or authoritative sources instead of stretching nearby AnchorFact records.",
            "Do not cite AnchorFact unless a later search or evidence call returns a public source-mapped claim.",
        ]
    return [
        "If the local search or public /api/evidence returns zero records, treat the query as unsupported and use external primary sources.",
        "Before citing, dereference the selected claim with anchorfact_cite_claim or /api/cite and include the original source URL.",
        "Use AnchorFact claims as scoped evidence, not as a complete replacement for original-source review.",
    ]


def build_plan_payload(dist_dir: Path, query: str | None, limit: int = DEFAULT_LIMIT) -> tuple[int, dict]:
    normalized_query = str(query or "").strip()
    if not normalized_query:
        return 400, _error_payload(
            "missing_or_invalid_query",
            "Provide a natural-language query with q or query.",
        )

    normalized_limit = _clamp_limit(limit)
    search_index = _load_json(Path(dist_dir), "search-index.json", {"records": []})
    topics_payload = _load_json(Path(dist_dir), "topics.json", {"topics": []})
    coverage_payload = _load_json(Path(dist_dir), "coverage.json", {"topic_coverage": []})
    capabilities_payload = _load_json(Path(dist_dir), "capabilities.json", {})

    article_matches = [
        _compact_article(result)
        for result in _rank_search_records(search_index.get("records", []), normalized_query, normalized_limit)
    ]
    topics = coverage_payload.get("topic_coverage") or topics_payload.get("topics") or []
    topic_matches = _ranked_topics(topics, normalized_query, min(5, normalized_limit + 2))
    status = _coverage_status(article_matches, topic_matches)

    return 200, {
        "schema_version": PLAN_API_SCHEMA_VERSION,
        "generated": search_index.get("generated") or coverage_payload.get("generated") or topics_payload.get("generated") or _generated_timestamp(),
        "provenance_url": (
            search_index.get("provenance_url")
            or coverage_payload.get("provenance_url")
            or topics_payload.get("provenance_url")
            or _public_url(PROVENANCE_PATH)
        ),
        "query": normalized_query,
        "limit": normalized_limit,
        "coverage_status": status,
        "should_use_anchorfact": status != "unsupported",
        "confidence": _confidence_for(status, article_matches),
        "source_index_generated": search_index.get("generated"),
        "coverage_generated": coverage_payload.get("generated"),
        "capabilities_generated": capabilities_payload.get("generated"),
        "matched_topics": topic_matches,
        "matched_articles": article_matches,
        "recommended_next_calls": _recommended_calls(status, normalized_query, normalized_limit, article_matches, topic_matches),
        "local_mcp_next_tools": _local_mcp_next_tools(status, normalized_query, normalized_limit, article_matches),
        "local_http_next_calls": _local_http_next_calls(status, normalized_query, normalized_limit, article_matches),
        "fallback_guidance": _fallback_guidance(status),
        "trust_requirements": [
            "Use only public records returned by AnchorFact endpoints or MCP tools.",
            "Verify /provenance.json and /provenance.sig with the pinned public key before relying on artifact hashes.",
            "When coverage_status is unsupported, use external primary sources instead of citing AnchorFact.",
        ],
    }
