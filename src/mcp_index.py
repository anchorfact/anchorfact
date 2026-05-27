"""
Manifest-backed article index for AnchorFact MCP and HTTP interfaces.
"""

import json
from pathlib import Path
from urllib.parse import urlparse


def _load_manifest(dist_dir: Path) -> dict:
    manifest_path = dist_dir / "manifest.json"
    if not manifest_path.exists():
        return {"articles": []}
    try:
        return json.loads(manifest_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {"articles": []}


def _safe_slug(value: str) -> str | None:
    slug = str(value or "").strip().replace("\\", "/")
    slug = slug.removeprefix("/")
    if slug.endswith("/index.json") or slug.endswith("/index.md") or slug.endswith("/index.txt"):
        slug = slug.rsplit("/", 1)[0]
    slug = slug.strip("/")
    parts = [part for part in slug.split("/") if part]
    if not parts or any(part in {".", ".."} for part in parts):
        return None
    return "/".join(parts)


def canonical_slug_from_reference(reference: str) -> str | None:
    value = str(reference or "").strip()
    if not value:
        return None

    if value.startswith("http://") or value.startswith("https://"):
        parsed = urlparse(value)
        path = parsed.path.strip("/")
        if path.startswith("kb/"):
            return _safe_slug(path.removeprefix("kb/"))
        return _safe_slug(path)

    return _safe_slug(value)


def _article_slug(article: dict) -> str | None:
    if article.get("canonical_slug"):
        return _safe_slug(article["canonical_slug"])
    return canonical_slug_from_reference(article.get("canonical_url", ""))


def _is_public(article: dict) -> bool:
    return article.get("status") == "public" and article.get("is_draft") is False


def _article_file(dist_dir: Path, slug: str) -> Path:
    safe_slug = _safe_slug(slug)
    if not safe_slug:
        raise ValueError("invalid article slug")
    return dist_dir.joinpath(*safe_slug.split("/"), "index.json")


def _article_description(dist_dir: Path, slug: str) -> str:
    try:
        detail = json.loads(_article_file(dist_dir, slug).read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError, ValueError):
        return ""
    return detail.get("description", "")


def load_public_article_index(dist_dir: Path) -> list[dict]:
    manifest = _load_manifest(dist_dir)
    index = []
    for article in manifest.get("articles", []):
        if not _is_public(article):
            continue
        slug = _article_slug(article)
        if not slug:
            continue
        canonical_url = article.get("canonical_url") or f"https://anchorfact.org/{slug}/"
        jsonld_id = article.get("id") or f"https://anchorfact.org/kb/{slug}"
        index.append({
            "id": slug,
            "canonical_slug": slug,
            "canonical_url": canonical_url,
            "jsonld_id": jsonld_id,
            "title": article.get("title", ""),
            "confidence": article.get("confidence_level", "low"),
            "confidence_score": article.get("confidence_score"),
            "confidence_basis": article.get("confidence_basis"),
            "description": _article_description(dist_dir, slug),
            "markdown_url": f"https://anchorfact.org/{slug}/index.md",
            "jsonld_url": f"https://anchorfact.org/{slug}/index.json",
        })
    return index


def resolve_article_reference(dist_dir: Path, reference: str) -> dict | None:
    slug = canonical_slug_from_reference(reference)
    for article in load_public_article_index(dist_dir):
        if reference == article.get("jsonld_id"):
            return article
        if reference == article.get("canonical_url"):
            return article
        if slug and slug == article.get("canonical_slug"):
            return article
    return None


def load_article_detail(dist_dir: Path, reference: str) -> dict | None:
    article = resolve_article_reference(dist_dir, reference)
    if not article:
        return None
    try:
        return json.loads(_article_file(dist_dir, article["canonical_slug"]).read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError, ValueError):
        return None


def list_public_categories(dist_dir: Path) -> list[dict]:
    counts: dict[str, int] = {}
    for article in load_public_article_index(dist_dir):
        category = article["canonical_slug"].split("/", 1)[0]
        counts[category] = counts.get(category, 0) + 1
    return [
        {"category": category, "count": count}
        for category, count in sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    ]
