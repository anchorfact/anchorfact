"""
One-call local context payload for AnchorFact MCP stdio and HTTP interfaces.
"""

import json
from datetime import datetime, timezone
from pathlib import Path

from mcp_claims import CITATION_CONTRACT, build_citation_payload
from mcp_plan import build_plan_payload

CONTEXT_API_SCHEMA_VERSION = "anchorfact.context-api.v1"
MIN_LIMIT = 1
DEFAULT_LIMIT = 3
MAX_LIMIT = 10


def _load_json(dist_dir: Path, filename: str, default: dict) -> dict:
    try:
        path = Path(dist_dir) / filename
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return default


def _compact_content_health(payload: dict) -> dict | None:
    if not payload or not payload.get("schema_version"):
        return None
    snapshot = payload.get("snapshot") or {}
    public = payload.get("public") or {}
    return {
        "schema_version": payload.get("schema_version"),
        "generated": payload.get("generated"),
        "provenance_url": payload.get("provenance_url"),
        "path": "/content-health.json",
        "snapshot": {
            "public_articles": snapshot.get("public_articles"),
            "draft_articles": snapshot.get("draft_articles"),
            "public_claims": snapshot.get("public_claims"),
            "public_sources": snapshot.get("public_sources"),
        },
        "public_source_coverage": public.get("source_coverage"),
        "public_claim_mapping": public.get("claim_mapping"),
        "trust_boundaries": payload.get("trust_boundaries") or {},
        "machine_guidance": (payload.get("machine_guidance") or [])[:4],
    }


def _generated_timestamp() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def _clamp_limit(value) -> int:
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        return DEFAULT_LIMIT
    return min(MAX_LIMIT, max(MIN_LIMIT, parsed))


def _error_payload(code: str, message: str) -> dict:
    return {
        "schema_version": CONTEXT_API_SCHEMA_VERSION,
        "error": {"code": code, "message": message},
    }


def _short_claim_id(value) -> str | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    return raw.rstrip("/").split("/")[-1] or raw


def _public_article(manifest: dict, slug: str | None) -> dict | None:
    for article in manifest.get("articles", []):
        if (
            article.get("canonical_slug") == slug
            and article.get("status") == "public"
            and article.get("is_draft") is False
        ):
            return article
    return None


def _article_claims(claims_payload: dict, slug: str | None) -> list[dict]:
    return [
        claim
        for claim in claims_payload.get("claims", [])
        if claim.get("canonical_slug") == slug
    ]


def _article_sources(sources_payload: dict, slug: str | None) -> list[dict]:
    return [
        source
        for source in sources_payload.get("sources", [])
        if any(article.get("canonical_slug") == slug for article in source.get("articles", []))
    ]


def _article_summary(article: dict, result: dict) -> dict:
    return {
        "id": article.get("id"),
        "canonical_slug": article.get("canonical_slug"),
        "canonical_url": article.get("canonical_url") or result.get("url"),
        "title": article.get("title") or result.get("title"),
        "description": article.get("description") or result.get("description"),
        "status": article.get("status"),
        "is_draft": article.get("is_draft") is True,
        "confidence_level": article.get("confidence_level") or result.get("confidence_level"),
        "confidence_basis": article.get("confidence_basis"),
        "confidence_score": article.get("confidence_score"),
        "sources_verified": article.get("sources_verified"),
        "sources_total": article.get("sources_total"),
    }


def _retrieval_summary(result: dict) -> dict:
    return {
        "score": result.get("score"),
        "matched_keywords": result.get("matched_keywords", []),
        "source_coverage": result.get("source_coverage"),
        "claim_ids": result.get("claim_ids", []),
        "routes": result.get("routes", {}),
    }


def _citation_exports(dist_dir: Path, claims: list[dict]) -> list[dict]:
    exports = []
    for claim in claims:
        claim_id = _short_claim_id(claim.get("id"))
        if not claim_id:
            continue
        status, payload = build_citation_payload(dist_dir, claim_id)
        if status == 200 and payload.get("citation_export"):
            exports.append(payload["citation_export"])
    return exports


def _evidence_pack(dist_dir: Path, result: dict, article: dict, claims_payload: dict, sources_payload: dict) -> dict:
    claims = _article_claims(claims_payload, result.get("canonical_slug"))
    sources = _article_sources(sources_payload, result.get("canonical_slug"))
    return {
        "canonical_slug": result.get("canonical_slug"),
        "title": article.get("title") or result.get("title"),
        "url": article.get("canonical_url") or result.get("url"),
        "description": article.get("description") or result.get("description"),
        "confidence_level": article.get("confidence_level") or result.get("confidence_level"),
        "article": _article_summary(article, result),
        "retrieval": _retrieval_summary(result),
        "claim_count": len(claims),
        "claims": claims,
        "citation_exports": _citation_exports(dist_dir, claims),
        "source_count": len(sources),
        "sources": sources,
    }


def build_context_payload(dist_dir: Path, query: str | None, limit: int = DEFAULT_LIMIT) -> tuple[int, dict]:
    normalized_query = str(query or "").strip()
    if not normalized_query:
        return 400, _error_payload(
            "missing_or_invalid_query",
            "Provide a natural-language query with q or query.",
        )

    dist = Path(dist_dir)
    normalized_limit = _clamp_limit(limit)
    plan_status, plan = build_plan_payload(dist, normalized_query, normalized_limit)
    if plan_status != 200:
        error = plan.get("error") or {}
        return plan_status, _error_payload(
            error.get("code") or "context_plan_failed",
            error.get("message") or "Context planning failed.",
        )

    manifest = _load_json(dist, "manifest.json", {"articles": []})
    claims_payload = _load_json(dist, "claims.json", {"claims": []})
    sources_payload = _load_json(dist, "sources.json", {"sources": []})
    search_index = _load_json(dist, "search-index.json", {})
    content_health = _load_json(dist, "content-health.json", {})

    packs = []
    for result in (plan.get("matched_articles") or [])[:normalized_limit]:
        article = _public_article(manifest, result.get("canonical_slug"))
        if article:
            packs.append(_evidence_pack(dist, result, article, claims_payload, sources_payload))

    generated = (
        plan.get("generated")
        or search_index.get("generated")
        or manifest.get("generated")
        or claims_payload.get("generated")
        or sources_payload.get("generated")
        or _generated_timestamp()
    )

    return 200, {
        "schema_version": CONTEXT_API_SCHEMA_VERSION,
        "generated": generated,
        "provenance_url": (
            plan.get("provenance_url")
            or search_index.get("provenance_url")
            or manifest.get("provenance_url")
            or claims_payload.get("provenance_url")
            or sources_payload.get("provenance_url")
        ),
        "query": normalized_query,
        "limit": normalized_limit,
        "coverage_status": plan.get("coverage_status"),
        "should_use_anchorfact": plan.get("should_use_anchorfact"),
        "confidence": plan.get("confidence"),
        "citation_contract": CITATION_CONTRACT,
        "content_health": _compact_content_health(content_health),
        "trust_requirements": plan.get("trust_requirements", []),
        "fallback_guidance": plan.get("fallback_guidance", []),
        "recommended_next_calls": plan.get("recommended_next_calls", []),
        "local_mcp_next_tools": plan.get("local_mcp_next_tools", []),
        "local_http_next_calls": plan.get("local_http_next_calls", []),
        "matched_topics": plan.get("matched_topics", []),
        "matched_articles": plan.get("matched_articles", []),
        "evidence_pack_count": len(packs),
        "evidence_packs": packs,
        "source_index_generated": sources_payload.get("generated"),
        "search_index_generated": search_index.get("generated"),
        "manifest_generated": manifest.get("generated"),
        "claims_generated": claims_payload.get("generated"),
    }


def render_context_markdown(payload: dict) -> str:
    lines = [
        f"# AnchorFact Local Context: {payload.get('query') or 'unknown query'}",
        "",
        f"Generated: {payload.get('generated') or 'unknown'}",
        f"Provenance: {payload.get('provenance_url') or 'unavailable'}",
        f"Coverage status: {payload.get('coverage_status') or 'unknown'}",
        f"Should use AnchorFact: {'yes' if payload.get('should_use_anchorfact') is True else 'no'}",
        f"Evidence packs: {payload.get('evidence_pack_count') or 0}",
        "",
        "Citation contract: cite only public claims; include confidence, AnchorFact claim URL, and original source URL.",
        "",
    ]

    if payload.get("trust_requirements"):
        lines.extend(["## Trust Requirements", ""])
        for requirement in payload["trust_requirements"]:
            lines.append(f"- {requirement}")
        lines.append("")

    if payload.get("content_health"):
        health = payload["content_health"]
        snapshot = health.get("snapshot") or {}
        boundaries = health.get("trust_boundaries") or {}
        lines.extend(["## Corpus Health", ""])
        lines.append(f"- Public articles: {snapshot.get('public_articles') or 'unknown'}")
        lines.append(f"- Public claims: {snapshot.get('public_claims') or 'unknown'}")
        excluded = "yes" if boundaries.get("draft_entries_excluded_from_ai_entrypoints") is True else "unknown"
        lines.append(f"- Draft articles excluded: {excluded}")
        lines.append(f"- Health artifact: {health.get('path') or '/content-health.json'}")
        lines.append("")

    if payload.get("fallback_guidance"):
        lines.extend(["## Fallback Guidance", ""])
        for guidance in payload["fallback_guidance"]:
            lines.append(f"- {guidance}")
        lines.append("")

    packs = payload.get("evidence_packs") or []
    if not packs:
        lines.append("_No public evidence packs matched this query._")
        return "\n".join(lines) + "\n"

    for pack in packs:
        lines.append(f"## {pack.get('title') or pack.get('canonical_slug')}")
        lines.append("")
        lines.append(f"- Article: {pack.get('url') or pack.get('canonical_slug')}")
        lines.append(f"- Confidence: {pack.get('confidence_level') or 'unknown'}")
        matched = ", ".join(pack.get("retrieval", {}).get("matched_keywords", [])) or "none"
        lines.append(f"- Matched keywords: {matched}")
        lines.append("")
        lines.append("### Claims")
        citations = pack.get("citation_exports") or []
        if citations:
            for citation in citations:
                lines.append(citation.get("markdown") or f"- {citation.get('statement') or 'Claim unavailable.'}")
        else:
            lines.append("- No public claim citations were found for this pack.")
        lines.append("")
        lines.append("### Sources")
        sources = pack.get("sources") or []
        if sources:
            for source in sources:
                source_bits = ", ".join(
                    bit for bit in [f"tier {source.get('tier')}" if source.get("tier") else None, source.get("type")] if bit
                )
                suffix = f" ({source_bits})" if source_bits else ""
                url = f" - {source.get('url')}" if source.get("url") else ""
                lines.append(f"- {source.get('title') or source.get('id')}{suffix}{url}")
        else:
            lines.append("- No public sources were found for this pack.")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"
