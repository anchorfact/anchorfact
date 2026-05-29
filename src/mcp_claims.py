"""
Claim citation helpers for AnchorFact MCP and local HTTP interfaces.
"""

import json
from pathlib import Path
from urllib.parse import unquote, urlparse, urlunparse

OFFICIAL_SITE = "https://anchorfact.org"
CITE_API_SCHEMA_VERSION = "anchorfact.cite-api.v1"

CITATION_CONTRACT = {
    "cite_only_public_claims": True,
    "prefer_claim_level_citations": True,
    "include_confidence": True,
    "include_original_source_url": True,
    "include_anchorfact_claim_url": True,
}


def _load_json(dist_dir: Path, filename: str) -> dict:
    path = dist_dir / filename
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def _clean_text(value: object) -> str:
    return " ".join(str(value or "").split()).strip()


def _normalize_url(value: object) -> str | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    try:
        parsed = urlparse(raw)
        if not parsed.scheme or not parsed.netloc:
            return raw
        return urlunparse((parsed.scheme, parsed.netloc, parsed.path.rstrip("/"), "", "", ""))
    except ValueError:
        return raw


def normalize_claim_id(value: object) -> str | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    try:
        raw = unquote(raw)
    except Exception:
        return None

    if raw.lower().startswith("fact/") or raw.lower().startswith("/fact/"):
        raw = f"{OFFICIAL_SITE}/{raw.lstrip('/')}"
    elif "/" not in raw and raw:
        raw = f"{OFFICIAL_SITE}/fact/{raw}"

    parsed = urlparse(raw)
    if parsed.scheme != "https" or parsed.netloc != "anchorfact.org":
        return None
    parts = [part for part in parsed.path.split("/") if part]
    if len(parts) != 2 or parts[0] != "fact" or not parts[1]:
        return None
    return f"{OFFICIAL_SITE}/fact/{parts[1]}"


def _public_article(manifest: dict, slug: str | None) -> dict | None:
    for article in manifest.get("articles", []):
        if (
            article.get("canonical_slug") == slug
            and article.get("status") == "public"
            and article.get("is_draft") is False
        ):
            return article
    return None


def _matching_sources(sources_payload: dict, claim: dict) -> list[dict]:
    claim_url = (_normalize_url(claim.get("source_url")) or _normalize_url(claim.get("citation", {}).get("sameAs")) or "").lower()
    claim_title = _clean_text(claim.get("source_title")).lower()
    slug = claim.get("canonical_slug")
    matches = []
    for source in sources_payload.get("sources", []):
        linked_to_article = any(article.get("canonical_slug") == slug for article in source.get("articles", []))
        if not linked_to_article:
            continue
        source_url = (_normalize_url(source.get("url")) or "").lower()
        source_title = _clean_text(source.get("title")).lower()
        if (claim_url and source_url == claim_url) or (claim_title and source_title == claim_title):
            matches.append(source)
    return matches


def _source_label(source_title: str | None, source_url: str | None) -> str:
    if source_title and source_url:
        return f"{source_title} ({source_url})"
    return source_title or source_url or "source unavailable"


def _article_url_for(claim: dict, article: dict) -> str | None:
    return _normalize_url(article.get("canonical_url") or claim.get("article")) or (
        f"{OFFICIAL_SITE}/{claim.get('canonical_slug')}/" if claim.get("canonical_slug") else None
    )


def _citation_export(claim: dict, article: dict, source: dict | None) -> dict:
    article_title = _clean_text(article.get("title") or claim.get("title") or claim.get("canonical_slug"))
    statement = _clean_text(claim.get("statement"))
    confidence = claim.get("confidence") or article.get("confidence_level")
    claim_url = _normalize_url(claim.get("id"))
    article_url = _article_url_for(claim, article)
    source_title = _clean_text((source or {}).get("title") or claim.get("source_title")) or None
    source_url = _normalize_url((source or {}).get("url") or claim.get("source_url") or claim.get("citation", {}).get("sameAs"))
    target_url = claim_url or article_url or OFFICIAL_SITE
    inline = (
        f"[AnchorFact: {article_title}; {confidence or 'unknown'} confidence; "
        f"source: {_source_label(source_title, source_url)}]({target_url})"
    )
    return {
        "claim_id": claim_url,
        "statement": statement,
        "confidence": confidence,
        "article_title": article_title,
        "article_url": article_url,
        "source_title": source_title,
        "source_url": source_url,
        "source_tier": (source or {}).get("tier"),
        "source_type": (source or {}).get("type"),
        "anchorfact_url": target_url,
        "inline": inline,
        "markdown": f"- {statement} {inline}",
    }


def _error_payload(code: str, message: str, **extra: object) -> dict:
    return {
        "schema_version": CITE_API_SCHEMA_VERSION,
        "error": {
            "code": code,
            "message": message,
        },
        **extra,
    }


def build_citation_payload(dist_dir: Path, claim_id: object) -> tuple[int, dict]:
    normalized_id = normalize_claim_id(claim_id)
    if not normalized_id:
        return 400, _error_payload(
            "missing_or_invalid_claim_id",
            "Provide a public claim id such as https://anchorfact.org/fact/{id}.",
        )

    manifest = _load_json(dist_dir, "manifest.json")
    claims_payload = _load_json(dist_dir, "claims.json")
    sources_payload = _load_json(dist_dir, "sources.json")
    claim = next((entry for entry in claims_payload.get("claims", []) if entry.get("id") == normalized_id), None)
    if not claim:
        return 404, _error_payload(
            "public_claim_not_found",
            "No public AnchorFact claim was found for the requested id.",
            claim_id=normalized_id,
        )

    article = _public_article(manifest, claim.get("canonical_slug"))
    if not article:
        return 404, _error_payload(
            "public_article_not_found",
            "The requested claim does not resolve to a public AnchorFact article.",
            claim_id=normalized_id,
            canonical_slug=claim.get("canonical_slug"),
        )

    source = (_matching_sources(sources_payload, claim) or [None])[0]
    return 200, {
        "schema_version": CITE_API_SCHEMA_VERSION,
        "generated": claims_payload.get("generated") or manifest.get("generated") or sources_payload.get("generated"),
        "claim_id": normalized_id,
        "canonical_slug": claim.get("canonical_slug"),
        "provenance_url": claims_payload.get("provenance_url") or manifest.get("provenance_url") or sources_payload.get("provenance_url"),
        "citation_contract": CITATION_CONTRACT,
        "citation_export": _citation_export(claim, article, source),
        "claim": claim,
        "article": article,
        "source": source,
    }


def render_citation_markdown(payload: dict) -> str:
    citation = payload.get("citation_export") or {}
    lines = [
        "# AnchorFact Citation",
        "",
        f"Generated: {payload.get('generated') or 'unknown'}",
        f"Provenance: {payload.get('provenance_url') or 'unavailable'}",
        f"Claim: {payload.get('claim_id') or 'unavailable'}",
        "",
        citation.get("markdown") or "- Citation unavailable.",
    ]
    if citation.get("source_url"):
        lines.extend(["", f"Source: {citation['source_url']}"])
    return "\n".join(lines) + "\n"
