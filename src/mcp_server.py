"""
AnchorFact MCP Server.

The MCP surface is backed by dist/manifest.json and exposes public articles only.
"""

import json
from pathlib import Path
from typing import Any

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import TextContent, Tool

from mcp_claims import build_citation_payload, render_citation_markdown
from mcp_context import build_context_payload, render_context_markdown
from mcp_index import (
    list_public_categories,
    load_article_detail,
    load_public_article_index,
    resolve_article_reference,
)
from mcp_plan import build_plan_payload
from mcp_resolve import build_reference_batch_payload, build_reference_payload, render_reference_batch_markdown
from mcp_search import BM25Index as SharedBM25Index

BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"

_article_index: list[dict] | None = None


_bm25_index = SharedBM25Index()


def load_article_index() -> list[dict]:
    global _article_index
    if _article_index is not None:
        return _article_index
    _article_index = load_public_article_index(DIST_DIR)
    _bm25_index.build(_article_index)
    return _article_index


def search_articles(query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
    load_article_index()
    return _bm25_index.search(query, confidence_min=confidence_min, limit=limit)


def list_categories() -> list[dict]:
    return list_public_categories(DIST_DIR)


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
        "description": article.get("description", ""),
        "markdown_url": article.get("markdown_url"),
        "jsonld_url": article.get("jsonld_url"),
    }


server = Server("anchorfact")


@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="anchorfact_plan_query",
            description="Plan whether AnchorFact has plausible public coverage and which local or public calls to make next.",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Natural-language factual query to assess."},
                    "limit": {"type": "integer", "description": "Maximum planned result count, default 3, max 10"},
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="anchorfact_search",
            description="Search public AnchorFact articles with BM25 ranking.",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Natural-language search query"},
                    "confidence_min": {
                        "type": "string",
                        "enum": ["high", "medium", "low"],
                        "description": "Minimum confidence filter, default medium",
                    },
                    "limit": {"type": "integer", "description": "Maximum result count, default 5, max 20"},
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="anchorfact_context",
            description="Return one local prompt context pack with coverage status, fallback guidance, evidence packs, and citation guardrails.",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Natural-language factual query to contextualize."},
                    "limit": {"type": "integer", "description": "Maximum evidence pack count, default 3, max 10"},
                    "format": {
                        "type": "string",
                        "enum": ["json", "markdown", "md"],
                        "description": "Output format, default json.",
                    },
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="anchorfact_get_article",
            description="Retrieve one public article by canonical slug, canonical URL, or JSON-LD @id.",
            inputSchema={
                "type": "object",
                "properties": {
                    "article_id": {
                        "type": "string",
                        "description": "Canonical slug, canonical URL, or JSON-LD @id",
                    }
                },
                "required": ["article_id"],
            },
        ),
        Tool(
            name="anchorfact_resolve_reference",
            description="Resolve a public AnchorFact claim id, article slug or URL, source id, or source URL.",
            inputSchema={
                "type": "object",
                "properties": {
                    "reference": {
                        "type": "string",
                        "description": "Claim id, article slug, AnchorFact URL, source id, or source URL.",
                    }
                },
                "required": ["reference"],
            },
        ),
        Tool(
            name="anchorfact_resolve_references",
            description="Resolve several mixed public AnchorFact references in one call.",
            inputSchema={
                "type": "object",
                "properties": {
                    "references": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Claim ids, article slugs, AnchorFact URLs, source ids, or source URLs.",
                    },
                    "format": {
                        "type": "string",
                        "enum": ["json", "markdown", "md"],
                        "description": "Output format, default json.",
                    },
                },
                "required": ["references"],
            },
        ),
        Tool(
            name="anchorfact_cite_claim",
            description="Return citation-ready JSON or Markdown for one public AnchorFact claim.",
            inputSchema={
                "type": "object",
                "properties": {
                    "claim_id": {
                        "type": "string",
                        "description": "Claim shorthand, /fact/{id}, or full https://anchorfact.org/fact/{id} URL.",
                    },
                    "format": {
                        "type": "string",
                        "enum": ["json", "markdown", "md"],
                        "description": "Output format, default json.",
                    },
                },
                "required": ["claim_id"],
            },
        ),
        Tool(
            name="anchorfact_list_categories",
            description="List public AnchorFact categories and article counts.",
            inputSchema={"type": "object", "properties": {}},
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
    if name == "anchorfact_plan_query":
        status, payload = build_plan_payload(DIST_DIR, arguments.get("query", arguments.get("q", "")), arguments.get("limit", 3))
        return [TextContent(type="text", text=json.dumps(payload, ensure_ascii=False, indent=2))]

    if name == "anchorfact_search":
        query = arguments.get("query", "")
        confidence_min = arguments.get("confidence_min", "medium")
        limit = min(arguments.get("limit", 5), 20)
        results = [search_result(article) for article in search_articles(query, confidence_min, limit)]
        return [TextContent(type="text", text=json.dumps({
            "query": query,
            "confidence_min": confidence_min,
            "results": results,
            "source": "AnchorFact - anchorfact.org",
            "search_engine": "BM25",
        }, ensure_ascii=False, indent=2))]

    if name == "anchorfact_context":
        query = arguments.get("query", arguments.get("q", ""))
        limit = arguments.get("limit", 3)
        output_format = str(arguments.get("format", "json")).strip().lower()
        status, payload = build_context_payload(DIST_DIR, query, limit)
        if status == 200 and output_format in {"markdown", "md"}:
            return [TextContent(type="text", text=render_context_markdown(payload))]
        return [TextContent(type="text", text=json.dumps(payload, ensure_ascii=False, indent=2))]

    if name == "anchorfact_get_article":
        article_id = arguments.get("article_id", "")
        entry = resolve_article_reference(DIST_DIR, article_id)
        detail = load_article_detail(DIST_DIR, article_id)
        if not entry or not detail:
            return [TextContent(type="text", text=json.dumps({
                "error": f"Article not found: {article_id}"
            }, ensure_ascii=False))]

        return [TextContent(type="text", text=json.dumps({
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
        }, ensure_ascii=False, indent=2))]

    if name == "anchorfact_resolve_reference":
        reference = arguments.get("reference", arguments.get("ref", ""))
        _, payload = build_reference_payload(DIST_DIR, reference)
        return [TextContent(type="text", text=json.dumps(payload, ensure_ascii=False, indent=2))]

    if name == "anchorfact_resolve_references":
        references = arguments.get("references", arguments.get("refs", []))
        output_format = str(arguments.get("format", "json")).strip().lower()
        _, payload = build_reference_batch_payload(DIST_DIR, references)
        if output_format in {"markdown", "md"} and "error" not in payload:
            return [TextContent(type="text", text=render_reference_batch_markdown(payload))]
        return [TextContent(type="text", text=json.dumps(payload, ensure_ascii=False, indent=2))]

    if name == "anchorfact_cite_claim":
        claim_id = arguments.get("claim_id", "")
        output_format = str(arguments.get("format", "json")).strip().lower()
        status, payload = build_citation_payload(DIST_DIR, claim_id)
        if status == 200 and output_format in {"markdown", "md"}:
            return [TextContent(type="text", text=render_citation_markdown(payload))]
        return [TextContent(type="text", text=json.dumps(payload, ensure_ascii=False, indent=2))]

    if name == "anchorfact_list_categories":
        categories = list_categories()
        return [TextContent(type="text", text=json.dumps({
            "total_articles": sum(category["count"] for category in categories),
            "categories": categories,
            "source": "AnchorFact - anchorfact.org",
        }, ensure_ascii=False, indent=2))]

    return [TextContent(type="text", text=json.dumps({"error": f"Unknown tool: {name}"}, ensure_ascii=False))]


async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
