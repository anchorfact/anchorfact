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
QUERY_STOPWORDS = {
    "a", "about", "an", "and", "are", "as", "at", "be", "best", "by", "can", "did",
    "do", "does", "for", "from", "how", "i", "in", "is", "it", "me", "my", "near",
    "now", "of", "on", "or", "should", "the", "this", "to", "was", "were", "what",
    "when", "where", "which", "who", "why", "with",
}
STANDALONE_YEAR_RE = re.compile(r"^(?:1[6-9]\d{2}|20\d{2}|21\d{2})$")
WEAK_MULTI_TOKEN_MATCHES = {
    "architecture", "basics", "evidence", "fundamentals", "guide", "history",
    "introduction", "methods", "models", "overview", "systems", "techniques", "theorem",
}
SHORT_TOKEN_BOOST_SKIP = {"ai"}


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


def _text_tokens(value) -> list[str]:
    normalized = _normalize_text(value)
    return normalized.split(" ") if normalized else []


def _query_tokens(query: str) -> list[str]:
    return [
        token
        for token in _text_tokens(query)
        if len(token) >= 2
        and token not in QUERY_STOPWORDS
        and not STANDALONE_YEAR_RE.match(token)
    ]


def _has_strong_matched_token(tokens: list[str], matched_tokens: set[str]) -> bool:
    if len(tokens) < 2:
        return True
    strong_tokens = [token for token in tokens if token not in WEAK_MULTI_TOKEN_MATCHES]
    if not strong_tokens:
        return True
    return any(token in matched_tokens for token in strong_tokens)


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


def _token_counts(tokens: list[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for token in tokens:
        counts[token] = counts.get(token, 0) + 1
    return counts


def _contains_phrase(tokens: list[str], phrase: str) -> bool:
    if not phrase:
        return False
    return f" {' '.join(tokens)} ".find(f" {phrase} ") != -1


def _is_short_exact_token(token: str) -> bool:
    return 2 <= len(token) <= 5 and token not in SHORT_TOKEN_BOOST_SKIP


def _score_record(record: dict, query: str, tokens: list[str]) -> dict:
    title_tokens = _text_tokens(record.get("title", ""))
    slug_tokens = _text_tokens(record.get("canonical_slug", ""))
    description_tokens = _text_tokens(record.get("description", ""))
    search_tokens = _text_tokens(record.get("search_text", ""))
    keyword_tokens = []
    for keyword in record.get("keywords", []):
        keyword_tokens.extend(_text_tokens(keyword))
    title_set = set(title_tokens)
    slug_set = set(slug_tokens)
    keyword_set = set(keyword_tokens)
    description_counts = _token_counts(description_tokens)
    search_counts = _token_counts(search_tokens)
    phrase = _normalize_text(query)
    matched_keywords: set[str] = set()
    matched_query_tokens: set[str] = set()
    score = 0

    if _contains_phrase(title_tokens, phrase):
        score += 16
    if _contains_phrase(search_tokens, phrase):
        score += 8
    if _contains_phrase(description_tokens, phrase):
        score += 4

    for token in tokens:
        exact_slug = token in slug_set
        exact_title = token in title_set
        exact_keyword = token in keyword_set
        if exact_slug:
            score += 10
            matched_keywords.add(token)
            matched_query_tokens.add(token)
        if exact_title:
            score += 8
            matched_keywords.add(token)
            matched_query_tokens.add(token)
        if exact_keyword:
            score += 6
            matched_keywords.add(token)
            matched_query_tokens.add(token)
        if (exact_slug or exact_title or exact_keyword) and _is_short_exact_token(token):
            score += 8

        description_occurrences = description_counts.get(token, 0)
        if description_occurrences > 0:
            score += min(description_occurrences, 2) * 2
            matched_keywords.add(token)
            matched_query_tokens.add(token)
        search_occurrences = search_counts.get(token, 0)
        if search_occurrences > 0:
            score += min(search_occurrences, 4)
            matched_keywords.add(token)
            matched_query_tokens.add(token)

    return {
        "score": score,
        "matched_keywords": sorted(matched_keywords),
        "matched_query_tokens": matched_query_tokens,
    }


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
    matches = [
        entry
        for entry in scored
        if entry["score"]["score"] > 0
        and _has_strong_matched_token(tokens, entry["score"]["matched_query_tokens"])
    ]
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
    topic_id_tokens = _text_tokens(topic.get("id", ""))
    title_tokens = _text_tokens(topic.get("title", ""))
    article_tokens = _text_tokens(" ".join(
        f"{article.get('title', '')} {article.get('canonical_slug', '')}"
        for article in topic.get("top_articles", [])
    ))
    topic_id = " ".join(topic_id_tokens)
    title = " ".join(title_tokens)
    article_set = set(article_tokens)
    matched_keywords: set[str] = set()
    matched_query_tokens: set[str] = set()
    score = 0

    if phrase and f" {title} ".find(f" {phrase} ") != -1:
        score += 8
    if phrase and topic_id == phrase:
        score += 6

    for token in tokens:
        if token in topic_id_tokens or token in title_tokens:
            score += 3
            matched_keywords.add(token)
            matched_query_tokens.add(token)
        if token in article_set:
            score += 1
            matched_keywords.add(token)
            matched_query_tokens.add(token)

    return {
        "score": score,
        "matched_keywords": sorted(matched_keywords),
        "matched_query_tokens": matched_query_tokens,
    }


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
    matches = [
        entry
        for entry in scored
        if entry["score"]["score"] > 0
        and _has_strong_matched_token(tokens, entry["score"]["matched_query_tokens"])
    ]
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


def _unsupported_intent_reasons(query: str) -> list[str]:
    normalized = _normalize_text(query)
    reasons = []
    has_live_time_marker = re.search(
        r"\b(?:today|tonight|tomorrow|yesterday|now|current|latest|recent|this week|this month)\b",
        normalized,
    ) is not None
    asks_live_weather = (
        re.search(r"\bweather\b", normalized) is not None
        and (has_live_time_marker or re.search(r"\bweather (?:forecast|in|near|for)\b", normalized) is not None)
    )
    if (
        re.search(r"\b(?:near me|nearby|closest|directions|opening hours|for me|my location)\b", normalized)
        or re.search(r"\blocal (?:restaurants?|venues?|business(?:es)?|listings?|stores?|shops?|services?|events?)\b", normalized)
        or re.search(r"\bbest restaurants?\b", normalized)
    ):
        reasons.append("local_or_personalized")
    if (
        has_live_time_marker
        or asks_live_weather
        or re.search(r"\b(?:score|scores|standings|schedule|stock price|exchange rate)\b", normalized)
        or re.search(r"\bwho won\b", normalized)
        or re.search(r"\b20(?:2[5-9]|[3-9]\d)\b", normalized)
    ):
        reasons.append("live_or_time_sensitive")
    if _high_stakes_personal_advice_intent(normalized):
        reasons.append("high_stakes_personal_advice")
    if _harmful_operational_request_intent(normalized):
        reasons.append("harmful_operational_request")
    return list(dict.fromkeys(reasons))


def _high_stakes_personal_advice_intent(normalized: str) -> bool:
    personal_advice = re.search(
        r"\b(?:should|can|could|would|do|does|need|must)\s+(?:i|we)\b|\b(?:for me|my|me|myself|our)\b",
        normalized,
    ) is not None
    direct_advice = re.search(
        r"\b(?:diagnose|treat|treatment|dosage|dose|prescribe|take|sue|lawsuit|appeal|buy|sell|invest|retire|retirement)\b",
        normalized,
    ) is not None
    medical_domain = re.search(
        r"\b(?:aspirin|chest pain|symptoms?|diagnos(?:e|is)|treat(?:ment)?|dosage|dose|medication|medicine|depression|anxiety|suicid(?:e|al)|cancer|doctor|hospital|pain|pregnan(?:t|cy)|infection|blood pressure)\b",
        normalized,
    ) is not None
    legal_domain = re.search(
        r"\b(?:sue|lawsuit|eviction|landlord|tenant|contract|court|custody|divorce|immigration|criminal|lawyer|attorney|legal advice)\b",
        normalized,
    ) is not None
    financial_domain = re.search(
        r"\b(?:invest|investment|buy|sell|stock|stocks|crypto|bitcoin|portfolio|loan|mortgage|tax|retire|retirement|insurance)\b",
        normalized,
    ) is not None
    return (medical_domain or legal_domain or financial_domain) and (personal_advice or direct_advice)


def _harmful_operational_request_intent(normalized: str) -> bool:
    harmful_action = re.search(
        r"\b(?:write|create|make|build|generate|template|payload|bypass|exploit|attack|steal|commit|evade|fake|construct|design)\b",
        normalized,
    ) is not None
    broad_how_to = re.search(r"\bhow to\b", normalized) is not None
    defensive_intent = re.search(
        r"\b(?:prevent(?:ion)?|defen[sc]e|defend|protect|mitigat(?:e|ion)|detect(?:ion)?|monitor(?:ing)?|incident response|awareness|training|secure|security|report|recognize|analysis|forensics|education(?:al)?)\b",
        normalized,
    ) is not None
    cyber_abuse = re.search(
        r"\b(?:ransomware|malware|phishing|credential theft|keylogger|exploit|payload|bypass authentication|hack(?:ing)?|ddos|sql injection attack)\b",
        normalized,
    ) is not None
    weapon_abuse = re.search(
        r"\b(?:pipe bomb|bomb|explosive|weapon design|nuclear weapon|bioweapon)\b",
        normalized,
    ) is not None
    fraud_abuse = re.search(
        r"\b(?:tax fraud|fraud|scam|money laundering|identity theft|credit card theft)\b",
        normalized,
    ) is not None
    return (cyber_abuse or weapon_abuse or fraud_abuse) and (harmful_action or (broad_how_to and not defensive_intent))


def _site_help_intent(query: str) -> bool:
    normalized = _normalize_text(query)
    if re.search(r"\banchorfact\b", normalized) is None:
        return False
    return re.search(
        r"\b(?:api|apis|endpoint|endpoints|cite|citation|claim|claims|source|sources|provenance|signature|openapi|mcp|context|evidence|resolve|verify|use|usage)\b",
        normalized,
    ) is not None


def _confidence_for(status: str, article_matches: list[dict]) -> str:
    if status == "site_help":
        return "high"
    if status == "unsupported":
        return "low"
    if status == "topic_supported":
        return "medium"
    top_score = float(article_matches[0].get("score") or 0)
    return "high" if top_score >= 12 else "medium"


def _recommended_calls(status: str, query: str, limit: int, article_matches: list[dict], topic_matches: list[dict]) -> list[dict]:
    if status == "site_help":
        normalized = _normalize_text(query)
        calls = [
            _call("/api", "Discover AnchorFact machine API endpoints and response contracts."),
            _call("/openapi.json", "Inspect the formal OpenAPI schema for programmatic integration."),
        ]
        if re.search(r"\b(?:cite|citation|claim|claims|resolve)\b", normalized):
            calls.extend([
                _call("/api/cite?id=f1", "Example citation export; replace f1 with the target AnchorFact claim id."),
                _call("/api/claim?id=f1", "Example claim dereference; replace f1 with the target AnchorFact claim id."),
                _call("/api/resolve?ref=f1", "Resolve a claim, article, or source reference before citing it."),
            ])
        else:
            calls.extend([
                _call(_query_path("/api/context", {"q": "gaussian splatting", "limit": limit}), "Example answer-ready context payload for a content query."),
                _call(_query_path("/api/evidence", {"q": "gaussian splatting", "limit": limit}), "Example source-grounded evidence packs for a content query."),
                _call(_query_path("/api/search", {"q": "gaussian splatting", "limit": limit}), "Example search results for public AnchorFact records."),
            ])
        calls.append(_call("/provenance.json", "Verify the signed production artifact set before trusting static artifact hashes."))
        return calls

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
    if status == "site_help":
        normalized = _normalize_text(query)
        calls = [
            _local_http_call("/stats", "Inspect local public coverage counts and categories."),
        ]
        if re.search(r"\b(?:cite|citation|claim|claims|resolve)\b", normalized):
            calls.extend([
                _local_http_call("/cite?id=f1", "Example local citation export; replace f1 with the target claim id."),
                _local_http_call("/resolve?ref=f1", "Resolve a local claim, article, or source reference before citing it."),
            ])
        else:
            calls.append(_local_http_call(
                _query_path("/context", {"q": "gaussian splatting", "limit": limit}),
                "Example local context payload for a content query.",
            ))
        return calls

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
    if status == "site_help":
        normalized = _normalize_text(query)
        tools = [
            {
                "tool": "anchorfact_content_health",
                "arguments": {},
                "purpose": "Inspect local corpus health and trust boundaries.",
            }
        ]
        if re.search(r"\b(?:cite|citation|claim|claims|resolve)\b", normalized):
            tools.extend([
                {
                    "tool": "anchorfact_cite_claim",
                    "arguments": {"claim_id": "f1"},
                    "purpose": "Example citation export; replace f1 with the target claim id.",
                },
                {
                    "tool": "anchorfact_resolve_reference",
                    "arguments": {"ref": "f1"},
                    "purpose": "Resolve a claim, article, or source reference before citing it.",
                },
            ])
        else:
            tools.append({
                "tool": "anchorfact_context",
                "arguments": {"query": "gaussian splatting", "limit": limit},
                "purpose": "Example answer-ready local context payload for a content query.",
            })
        return tools

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


def _fallback_guidance(status: str, intent_reasons: list[str] | None = None) -> list[str]:
    if status == "site_help":
        return [
            "This is an AnchorFact usage query; use API discovery and recommended_next_calls instead of searching public content articles.",
            "For citation tasks, dereference a specific claim with anchorfact_cite_claim, /api/cite, or /api/claim before quoting AnchorFact.",
            "For answer tasks, call anchorfact_context, /api/context, or /api/evidence with the real content query and cite only returned public claims.",
        ]
    if status == "unsupported":
        intent_reasons = intent_reasons or []
        guidance = []
        if "local_or_personalized" in intent_reasons:
            guidance.append("AnchorFact is not a live local directory or personalized recommendation source; use current local listings or official venue sources.")
        if "live_or_time_sensitive" in intent_reasons:
            guidance.append("AnchorFact is not a live news, sports, market, weather, or current-results source; use current authoritative sources.")
        if "high_stakes_personal_advice" in intent_reasons:
            guidance.append("AnchorFact is not a medical, legal, or financial professional advice source; use qualified professional guidance or current authoritative sources.")
        if "harmful_operational_request" in intent_reasons:
            guidance.append("AnchorFact does not support harmful operational requests for abuse, weapons, fraud, or intrusion; use defensive, educational, or authoritative safety resources instead.")
        return [
            *guidance,
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

    intent_reasons = _unsupported_intent_reasons(normalized_query)
    intent_unsupported = len(intent_reasons) > 0
    is_site_help = _site_help_intent(normalized_query)
    article_matches = [
        _compact_article(result)
        for result in (
            []
            if intent_unsupported or is_site_help
            else _rank_search_records(search_index.get("records", []), normalized_query, normalized_limit)
        )
    ]
    topics = coverage_payload.get("topic_coverage") or topics_payload.get("topics") or []
    topic_matches = [] if intent_unsupported or is_site_help else _ranked_topics(topics, normalized_query, min(5, normalized_limit + 2))
    status = "site_help" if is_site_help else _coverage_status(article_matches, topic_matches)

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
        "query_intent": "site_help" if is_site_help else "content",
        "unsupported_intent_reasons": intent_reasons,
        "confidence": _confidence_for(status, article_matches),
        "source_index_generated": search_index.get("generated"),
        "coverage_generated": coverage_payload.get("generated"),
        "capabilities_generated": capabilities_payload.get("generated"),
        "matched_topics": topic_matches,
        "matched_articles": article_matches,
        "recommended_next_calls": _recommended_calls(status, normalized_query, normalized_limit, article_matches, topic_matches),
        "local_mcp_next_tools": _local_mcp_next_tools(status, normalized_query, normalized_limit, article_matches),
        "local_http_next_calls": _local_http_next_calls(status, normalized_query, normalized_limit, article_matches),
        "fallback_guidance": _fallback_guidance(status, intent_reasons),
        "trust_requirements": [
            "Use only public records returned by AnchorFact endpoints or MCP tools.",
            "Verify /provenance.json and /provenance.sig with the pinned public key before relying on artifact hashes.",
            "When coverage_status is unsupported, use external primary sources instead of citing AnchorFact.",
        ],
    }
