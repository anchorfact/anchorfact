"""
AnchorFact MCP Server.

The MCP surface is backed by dist/manifest.json and exposes public articles only.
"""

import json
import math
import re
from collections import defaultdict
from pathlib import Path
from typing import Any

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import TextContent, Tool

from mcp_index import (
    list_public_categories,
    load_article_detail,
    load_public_article_index,
    resolve_article_reference,
)

BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"

K1 = 1.5
B = 0.75

_article_index: list[dict] | None = None


def tokenize(text: str) -> list[str]:
    words = re.split(r"[\s\-–—()\[\]{}:;.!?'\"<>/\\|@#$%^&*+=~`]+", text.lower())
    return [word for word in words if len(word) > 1]


class BM25Index:
    def __init__(self):
        self.documents: list[dict] = []
        self.doc_lengths: list[int] = []
        self.avgdl = 0.0
        self.inverted_index: dict[str, dict[int, int]] = defaultdict(dict)
        self.n = 0
        self._built = False

    def build(self, articles: list[dict]) -> None:
        self.documents = articles
        self.doc_lengths = []
        self.inverted_index = defaultdict(dict)
        self.n = len(articles)
        if self.n == 0:
            self._built = True
            return

        total_len = 0
        for index, article in enumerate(articles):
            tokens = tokenize(article.get("title", "")) + tokenize(article.get("description", ""))
            self.doc_lengths.append(len(tokens))
            total_len += len(tokens)
            term_counts: dict[str, int] = {}
            for token in tokens:
                term_counts[token] = term_counts.get(token, 0) + 1
            for term, count in term_counts.items():
                self.inverted_index[term][index] = count

        self.avgdl = total_len / self.n if self.n else 0.0
        self._built = True

    def search(self, query: str, limit: int = 5, confidence_min: str = "medium") -> list[dict]:
        if not self._built or self.n == 0:
            return []

        confidence_rank = {"high": 3, "medium": 2, "low": 1}
        min_rank = confidence_rank.get(confidence_min, 1)
        query_terms = tokenize(query)
        if not query_terms:
            return []

        candidates: set[int] = set()
        for term in query_terms:
            candidates.update(self.inverted_index.get(term, {}).keys())

        scores: list[tuple[float, dict]] = []
        for doc_id in candidates:
            article = self.documents[doc_id]
            confidence = article.get("confidence", "low")
            if confidence_rank.get(confidence, 0) < min_rank:
                continue

            doc_len = self.doc_lengths[doc_id] or 1
            score = 0.0
            for term in query_terms:
                postings = self.inverted_index.get(term, {})
                if doc_id not in postings:
                    continue
                df = len(postings)
                idf = math.log((self.n - df + 0.5) / (df + 0.5) + 1.0)
                tf = postings[doc_id]
                tf_score = (tf * (K1 + 1)) / (tf + K1 * (1 - B + B * doc_len / self.avgdl))
                score += idf * tf_score

            if score > 0:
                score += 0.3 if confidence == "high" else 0.15 if confidence == "medium" else 0
                scores.append((score, article))

        scores.sort(key=lambda item: item[0], reverse=True)
        return [article for _, article in scores[:limit]]


_bm25_index = BM25Index()


def load_article_index() -> list[dict]:
    global _article_index
    if _article_index is not None:
        return _article_index
    _article_index = load_public_article_index(DIST_DIR)
    _bm25_index.build(_article_index)
    return _article_index


def search_articles(query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
    load_article_index()
    return _bm25_index.search(query, limit=limit, confidence_min=confidence_min)


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
            name="anchorfact_list_categories",
            description="List public AnchorFact categories and article counts.",
            inputSchema={"type": "object", "properties": {}},
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
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
