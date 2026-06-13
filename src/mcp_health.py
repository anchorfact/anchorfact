"""
Local corpus health payload for AnchorFact MCP stdio and HTTP interfaces.
"""

import json
from pathlib import Path


def _error_payload(code: str, message: str) -> dict:
    return {
        "schema_version": "anchorfact.content-health.v1",
        "error": {"code": code, "message": message},
    }


def build_health_payload(dist_dir: Path) -> tuple[int, dict]:
    path = Path(dist_dir) / "content-health.json"
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return 404, _error_payload(
            "content_health_missing",
            "content-health.json is missing; run npm run build before using local MCP health.",
        )
    except json.JSONDecodeError as error:
        return 500, _error_payload(
            "content_health_invalid_json",
            f"content-health.json is not valid JSON: {error.msg}",
        )
    except OSError as error:
        return 500, _error_payload(
            "content_health_unreadable",
            f"content-health.json could not be read: {error}",
        )

    payload = dict(payload)
    payload["path"] = "/content-health.json"
    payload["source"] = "AnchorFact local dist"
    return 200, payload


def render_health_markdown(payload: dict) -> str:
    if payload.get("error"):
        error = payload["error"]
        return f"# AnchorFact Local Corpus Health\n\nError: {error.get('message') or error.get('code')}\n"

    snapshot = payload.get("snapshot") or {}
    public = payload.get("public") or {}
    draft = payload.get("draft") or {}
    queue = draft.get("repair_queue") or {}
    boundaries = payload.get("trust_boundaries") or {}

    lines = [
        "# AnchorFact Local Corpus Health",
        "",
        f"Generated: {payload.get('generated') or 'unknown'}",
        f"Provenance: {payload.get('provenance_url') or 'unavailable'}",
        f"Artifact: {payload.get('path') or '/content-health.json'}",
        "",
        "## Snapshot",
        "",
        f"- Public articles: {snapshot.get('public_articles') if snapshot.get('public_articles') is not None else 'unknown'}",
        f"- Draft articles: {snapshot.get('draft_articles') if snapshot.get('draft_articles') is not None else 'unknown'}",
        f"- Public claims: {snapshot.get('public_claims') if snapshot.get('public_claims') is not None else 'unknown'}",
        f"- Public sources: {snapshot.get('public_sources') if snapshot.get('public_sources') is not None else 'unknown'}",
        "",
    ]

    claim_mapping = public.get("claim_mapping") or {}
    if claim_mapping:
        lines.extend([
            "## Public Claim Mapping",
            "",
            f"- Total: {claim_mapping.get('total') if claim_mapping.get('total') is not None else 'unknown'}",
            f"- Mapped: {claim_mapping.get('mapped') if claim_mapping.get('mapped') is not None else 'unknown'}",
            f"- Ratio: {claim_mapping.get('ratio') if claim_mapping.get('ratio') is not None else 'unknown'}",
            "",
        ])

    lines.extend([
        "## Draft Repair Queue",
        "",
        f"- Candidate count: {queue.get('candidate_count') if queue.get('candidate_count') is not None else 0}",
        f"- Automatic repair exclusions: {queue.get('excluded_count') if queue.get('excluded_count') is not None else 0}",
        f"- Next batch size: {queue.get('next_batch_size') if queue.get('next_batch_size') is not None else len(queue.get('next_batch') or [])}",
        f"- Source-ready candidates: {queue.get('source_ready_candidate_count') if queue.get('source_ready_candidate_count') is not None else 0}",
        f"- Source-ready next batch size: {queue.get('source_ready_next_batch_size') if queue.get('source_ready_next_batch_size') is not None else len(queue.get('source_ready_next_batch') or [])}",
        f"- Source acquisition candidates: {queue.get('source_acquisition_candidate_count') if queue.get('source_acquisition_candidate_count') is not None else 0}",
        f"- Source acquisition next batch size: {queue.get('source_acquisition_next_batch_size') if queue.get('source_acquisition_next_batch_size') is not None else len(queue.get('source_acquisition_next_batch') or [])}",
    ])

    for item in queue.get("next_batch") or []:
        reasons = ", ".join(item.get("quality_reasons") or []) or "unspecified"
        lines.append(
            f"- {item.get('canonical_slug')}: {item.get('title') or 'untitled'} "
            f"(complexity {item.get('repair_complexity')}, reasons: {reasons})"
        )
    source_ready_batch = queue.get("source_ready_next_batch") or []
    if source_ready_batch:
        lines.extend(["", "Source-ready draft repairs:"])
        for item in source_ready_batch:
            reasons = ", ".join(item.get("quality_reasons") or []) or "unspecified"
            verified = item.get("sources_verified") if item.get("sources_verified") is not None else 0
            total = item.get("sources_total") if item.get("sources_total") is not None else 0
            lines.append(
                f"- {item.get('canonical_slug')}: {item.get('title') or 'untitled'} "
                f"({verified}/{total} sources, complexity {item.get('repair_complexity')}, reasons: {reasons})"
            )
    source_acquisition_batch = queue.get("source_acquisition_next_batch") or []
    if source_acquisition_batch:
        lines.extend(["", "Source acquisition draft repairs:"])
        for item in source_acquisition_batch:
            reasons = ", ".join(item.get("quality_reasons") or []) or "unspecified"
            verified = item.get("sources_verified") if item.get("sources_verified") is not None else 0
            total = item.get("sources_total") if item.get("sources_total") is not None else 0
            lines.append(
                f"- {item.get('canonical_slug')}: {item.get('title') or 'untitled'} "
                f"({verified}/{total} sources, complexity {item.get('repair_complexity')}, reasons: {reasons})"
            )
    lines.append("")

    exclusion_reasons = queue.get("exclusion_reason_distribution") or []
    if exclusion_reasons:
        lines.extend(["## Repair Queue Exclusions", ""])
        for item in exclusion_reasons:
            lines.append(f"- {item.get('name') or 'unknown'}: {item.get('count') if item.get('count') is not None else 0}")
        lines.append("")

    if queue.get("selection_policy"):
        lines.extend(["## Selection Policy", ""])
        for policy in queue["selection_policy"]:
            lines.append(f"- {policy}")
        lines.append("")

    lines.extend(["## Trust Boundaries", ""])
    for key, value in boundaries.items():
        lines.append(f"- {key}: {str(value).lower()}")

    return "\n".join(lines).rstrip() + "\n"
