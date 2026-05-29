"""
Reference resolver helpers for AnchorFact MCP and local HTTP interfaces.
"""

import json
from pathlib import Path
from urllib.parse import quote, unquote, urlparse, urlunparse

from mcp_claims import build_citation_payload, normalize_claim_id
from mcp_index import load_article_detail, resolve_article_reference

OFFICIAL_SITE = "https://anchorfact.org"
RESOLVE_API_SCHEMA_VERSION = "anchorfact.resolve-api.v1"
RESOLVE_BATCH_API_SCHEMA_VERSION = "anchorfact.resolve-batch-api.v1"
SOURCE_API_SCHEMA_VERSION = "anchorfact.source-api.v1"
MCP_ARTICLE_SCHEMA_VERSION = "anchorfact.mcp-article.v1"
MAX_BATCH_REFS = 20


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


def _normalize_source_id(value: object) -> str | None:
    raw = str(value or "").strip()
    if not raw or not raw.startswith("source:"):
        return None
    if any(char.isspace() for char in raw):
        return None
    return raw


def _normalize_url(value: object) -> str | None:
    raw = str(value or "").strip()
    if not raw:
        return None
    try:
        parsed = urlparse(unquote(raw))
    except Exception:
        return None
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return None
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path.rstrip("/"), "", "", ""))


def _is_external_url(value: object) -> bool:
    url = _normalize_url(value)
    if not url:
        return False
    return urlparse(url).netloc.lower() != "anchorfact.org"


def _error_payload(code: str, message: str, **extra: object) -> dict:
    return {
        "schema_version": RESOLVE_API_SCHEMA_VERSION,
        "error": {
            "code": code,
            "message": message,
        },
        **extra,
    }


def _batch_error_payload(code: str, message: str, **extra: object) -> dict:
    return {
        "schema_version": RESOLVE_BATCH_API_SCHEMA_VERSION,
        "error": {
            "code": code,
            "message": message,
        },
        **extra,
    }


def _source_by_lookup(sources_payload: dict, source_id: str | None, source_url: str | None) -> dict | None:
    normalized_url = (_normalize_url(source_url) or "").lower()
    for source in sources_payload.get("sources", []):
        if source_id and source.get("id") == source_id:
            return source
        source_lookup_url = (_normalize_url(source.get("url")) or "").lower()
        if normalized_url and source_lookup_url == normalized_url:
            return source
    return None


def _source_article_slugs(source: dict) -> set[str]:
    return {
        article.get("canonical_slug")
        for article in source.get("articles", [])
        if article.get("canonical_slug")
    }


def _claims_for_source(claims_payload: dict, source: dict) -> list[dict]:
    source_url = (_normalize_url(source.get("url")) or "").lower()
    source_title = _clean_text(source.get("title")).lower()
    slugs = _source_article_slugs(source)
    matches = []
    for claim in claims_payload.get("claims", []):
        if claim.get("canonical_slug") not in slugs:
            continue
        claim_url = (_normalize_url(claim.get("source_url") or claim.get("citation", {}).get("sameAs")) or "").lower()
        claim_title = _clean_text(claim.get("source_title")).lower()
        if (source_url and claim_url == source_url) or (source_title and claim_title == source_title):
            matches.append(claim)
    return matches


def _source_payload(dist_dir: Path, source_id: str | None = None, source_url: str | None = None) -> tuple[int, dict]:
    sources_payload = _load_json(dist_dir, "sources.json")
    claims_payload = _load_json(dist_dir, "claims.json")
    source = _source_by_lookup(sources_payload, source_id, source_url)
    if not source:
        return 404, _error_payload(
            "public_source_not_found",
            "No public AnchorFact source was found for the requested id or URL.",
            source_id=source_id,
            source_url=source_url,
        )
    claims = _claims_for_source(claims_payload, source)
    return 200, {
        "schema_version": SOURCE_API_SCHEMA_VERSION,
        "generated": sources_payload.get("generated") or claims_payload.get("generated"),
        "source_id": source.get("id"),
        "source_url": source.get("url"),
        "provenance_url": sources_payload.get("provenance_url") or claims_payload.get("provenance_url"),
        "source_index_generated": sources_payload.get("generated"),
        "claims_generated": claims_payload.get("generated"),
        "source": source,
        "claim_count": len(claims),
        "claims": claims,
    }


def _article_payload(dist_dir: Path, reference: str) -> tuple[int, dict]:
    entry = resolve_article_reference(dist_dir, reference)
    detail = load_article_detail(dist_dir, reference)
    if not entry or not detail:
        return 404, _error_payload(
            "public_article_not_found",
            "No public AnchorFact article was found for the requested reference.",
            reference=reference,
        )
    manifest = _load_json(dist_dir, "manifest.json")
    return 200, {
        "schema_version": MCP_ARTICLE_SCHEMA_VERSION,
        "generated": manifest.get("generated"),
        "canonical_slug": entry.get("canonical_slug"),
        "canonical_url": entry.get("canonical_url"),
        "jsonld_id": entry.get("jsonld_id"),
        "provenance_url": manifest.get("provenance_url"),
        "article": entry,
        "detail": detail,
        "primary_sources": [
            {"name": source.get("name", ""), "url": source.get("sameAs", "")}
            for source in detail.get("citation", [])
        ],
    }


def _links_for(resolved_type: str, canonical_ref: str, ref: str) -> dict:
    encoded_ref = quote(ref, safe="")
    links = {
        "local_http": f"/resolve?ref={encoded_ref}",
        "public_resolve_api": f"{OFFICIAL_SITE}/api/resolve?ref={encoded_ref}",
    }
    if resolved_type == "claim":
        encoded_claim = quote(canonical_ref, safe="")
        links["local_cite"] = f"/cite?id={encoded_claim}"
        links["public_claim_api"] = f"{OFFICIAL_SITE}/api/claim?id={encoded_claim}"
        links["public_cite_api"] = f"{OFFICIAL_SITE}/api/cite?id={encoded_claim}"
    elif resolved_type == "source":
        encoded_source = quote(canonical_ref, safe="")
        links["public_source_api"] = f"{OFFICIAL_SITE}/api/source?id={encoded_source}"
    elif resolved_type == "article":
        encoded_slug = quote(canonical_ref, safe="")
        links["local_article"] = f"/article?id={encoded_slug}"
        links["public_article_api"] = f"{OFFICIAL_SITE}/api/article?slug={encoded_slug}"
        links["article_jsonld"] = f"{OFFICIAL_SITE}/{canonical_ref}/index.json"
    return links


def _wrap(ref: str, resolved_type: str, canonical_ref: str, result: dict) -> dict:
    return {
        "schema_version": RESOLVE_API_SCHEMA_VERSION,
        "generated": result.get("generated"),
        "ref": ref,
        "resolved_type": resolved_type,
        "canonical_ref": canonical_ref,
        "provenance_url": result.get("provenance_url"),
        "result_schema_version": result.get("schema_version"),
        "links": _links_for(resolved_type, canonical_ref, ref),
        "result": result,
    }


def _wrap_not_found(ref: str, resolved_type: str, canonical_ref: str, nested: dict) -> dict:
    return _error_payload(
        "reference_not_found",
        "The reference was syntactically valid but did not resolve to a public AnchorFact record.",
        ref=ref,
        resolved_type=resolved_type,
        canonical_ref=canonical_ref,
        nested_error=nested.get("error"),
    )


def build_reference_payload(dist_dir: Path, reference: object) -> tuple[int, dict]:
    ref = str(reference or "").strip()
    if not ref:
        return 400, _error_payload(
            "missing_or_invalid_reference",
            "Provide a public AnchorFact reference with claim id, article slug, source id, or source URL.",
        )

    source_id = _normalize_source_id(ref)
    if source_id:
        status, payload = _source_payload(dist_dir, source_id=source_id)
        if status != 200:
            return status, _wrap_not_found(ref, "source", source_id, payload)
        return 200, _wrap(ref, "source", payload["source_id"], payload)

    claim_id = normalize_claim_id(ref)
    if claim_id:
        status, payload = build_citation_payload(dist_dir, claim_id)
        if status != 200:
            return status, _wrap_not_found(ref, "claim", claim_id, payload)
        return 200, _wrap(ref, "claim", payload["claim_id"], payload)

    if _is_external_url(ref):
        source_url = _normalize_url(ref)
        status, payload = _source_payload(dist_dir, source_url=source_url)
        if status != 200:
            return status, _wrap_not_found(ref, "source", source_url or ref, payload)
        return 200, _wrap(ref, "source", payload["source_id"], payload)

    status, payload = _article_payload(dist_dir, ref)
    if status != 200:
        return status, _wrap_not_found(ref, "article", ref, payload)
    return 200, _wrap(ref, "article", payload["canonical_slug"], payload)


def _normalize_batch_references(references: object) -> list[str]:
    if references is None:
        return []
    if isinstance(references, str):
        values = references.replace("\n", ",").split(",")
    elif isinstance(references, (list, tuple)):
        values = []
        for item in references:
            if isinstance(item, str) and ("\n" in item or "," in item):
                values.extend(item.replace("\n", ",").split(","))
            else:
                values.append(item)
    else:
        values = [references]
    return [str(value).strip() for value in values if str(value or "").strip()]


def build_reference_batch_payload(dist_dir: Path, references: object) -> tuple[int, dict]:
    refs = _normalize_batch_references(references)
    if not refs:
        return 400, _batch_error_payload(
            "missing_or_invalid_references",
            "Provide one or more public AnchorFact references.",
        )
    if len(refs) > MAX_BATCH_REFS:
        return 400, _batch_error_payload(
            "too_many_references",
            f"Resolve batch accepts at most {MAX_BATCH_REFS} references per request.",
            max_references=MAX_BATCH_REFS,
            requested_references=len(refs),
        )

    results = []
    for ref in refs:
        status, payload = build_reference_payload(dist_dir, ref)
        results.append({
            "ok": status == 200,
            "status": status,
            **payload,
        })
    ok_count = sum(1 for result in results if result["ok"])
    provenance_url = next((result.get("provenance_url") for result in results if result.get("provenance_url")), None)
    return 200, {
        "schema_version": RESOLVE_BATCH_API_SCHEMA_VERSION,
        "generated": next((result.get("generated") for result in results if result.get("generated")), None),
        "provenance_url": provenance_url,
        "reference_count": len(refs),
        "ok_count": ok_count,
        "error_count": len(results) - ok_count,
        "results": results,
    }


def render_reference_batch_markdown(payload: dict) -> str:
    lines = [
        "# AnchorFact Resolve Batch",
        "",
        f"Generated: {payload.get('generated') or 'unknown'}",
        f"Provenance: {payload.get('provenance_url') or 'unavailable'}",
        f"Results: {payload.get('ok_count', 0)} resolved / {payload.get('error_count', 0)} errors",
        "",
    ]
    for item in payload.get("results", []):
        if not item.get("ok"):
            lines.append(f"- {item.get('ref') or 'unknown'}: {item.get('status')} {(item.get('error') or {}).get('code') or 'error'}")
            continue
        label = (
            ((item.get("result") or {}).get("claim") or {}).get("statement")
            or ((item.get("result") or {}).get("article") or {}).get("title")
            or ((item.get("result") or {}).get("source") or {}).get("title")
            or item.get("canonical_ref")
        )
        lines.append(
            f"- {item.get('ref')}: {item.get('resolved_type')} -> {item.get('canonical_ref')} "
            f"({item.get('result_schema_version')}) - {label}"
        )
    return "\n".join(lines) + "\n"
