"""
AnchorFact MCP Server — AI Agent 直连知识库查询接口

让 Claude、ChatGPT 等 AI Agent 通过 MCP 协议直接检索 AnchorFact 知识库。
"""

import json
import os
import re
from pathlib import Path
from typing import Any

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# --- 配置 ---
DIST_DIR = Path(__file__).resolve().parent.parent / "dist"
MANIFEST_PATH = DIST_DIR / "manifest.json"
LLMS_FULL_PATH = DIST_DIR / "llms-full.txt"
KB_DIR = DIST_DIR / "kb"
JSON_LD_DIR = DIST_DIR / "jsonld"

# --- 加载数据 ---
def load_manifest() -> list[dict]:
    if not MANIFEST_PATH.exists():
        return []
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def load_llms_full() -> str:
    if not LLMS_FULL_PATH.exists():
        return ""
    with open(LLMS_FULL_PATH, "r", encoding="utf-8") as f:
        return f.read()

# --- 搜索 ---
def search_articles(query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
    """在 manifest 中搜索文章，按关键词匹配标题和描述"""
    manifest = load_manifest()
    confidence_rank = {"high": 3, "medium": 2, "low": 1}
    min_rank = confidence_rank.get(confidence_min, 1)

    query_lower = query.lower()
    keywords = query_lower.split()
    scored: list[tuple[int, dict]] = []

    for article in manifest:
        conf = article.get("confidence", "low")
        if confidence_rank.get(conf, 0) < min_rank:
            continue

        title = (article.get("title") or "").lower()
        desc = (article.get("description") or "").lower()
        combined = title + " " + desc

        score = sum(1 for kw in keywords if kw in combined)
        if score == 0:
            continue
        scored.append((score, article))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [a for _, a in scored[:limit]]

def get_article_detail(article_id: str) -> dict | None:
    """获取单篇文章的完整的 JSON-LD 数据"""
    jsonld_file = JSON_LD_DIR / f"{article_id}.json"
    if not jsonld_file.exists():
        return None
    with open(jsonld_file, "r", encoding="utf-8") as f:
        return json.load(f)

def get_article_markdown_url(article_id: str) -> str:
    return f"https://anchorfact.org/kb/{article_id}.md"

def get_article_jsonld_url(article_id: str) -> str:
    return f"https://anchorfact.org/jsonld/{article_id}.json"

def list_categories() -> list[dict]:
    """列出所有领域及其文章数"""
    manifest = load_manifest()
    cats: dict[str, int] = {}
    for a in manifest:
        cat = a.get("category", "unknown")
        cats[cat] = cats.get(cat, 0) + 1
    return [{"category": k, "count": v} for k, v in sorted(cats.items(), key=lambda x: -x[1])]

# --- MCP Server ---
server = Server("anchorfact")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="anchorfact_search",
            description="在 AnchorFact 知识库中搜索事实性知识。返回结构化结果，含置信度、原子事实和原始来源。",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "自然语言搜索查询",
                    },
                    "confidence_min": {
                        "type": "string",
                        "enum": ["high", "medium", "low"],
                        "description": "最低置信度筛选，默认 medium",
                    },
                    "limit": {
                        "type": "integer",
                        "description": "返回结果数，默认 5，最大 20",
                    },
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="anchorfact_get_article",
            description="获取指定文章的完整内容，包含所有原子事实和来源链。",
            inputSchema={
                "type": "object",
                "properties": {
                    "article_id": {
                        "type": "string",
                        "description": "文章 ID，例如 kb-2026-00001",
                    },
                },
                "required": ["article_id"],
            },
        ),
        Tool(
            name="anchorfact_list_categories",
            description="列出 AnchorFact 所有知识领域及其文章数量。",
            inputSchema={
                "type": "object",
                "properties": {},
            },
        ),
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
    if name == "anchorfact_search":
        query = arguments.get("query", "")
        confidence_min = arguments.get("confidence_min", "medium")
        limit = min(arguments.get("limit", 5), 20)

        results = search_articles(query, confidence_min, limit)
        if not results:
            return [TextContent(type="text", text=json.dumps({
                "query": query,
                "results": [],
                "hint": "未找到匹配结果。尝试更宽泛的关键词或降低 confidence_min。"
            }, ensure_ascii=False, indent=2))]

        output = []
        for r in results:
            output.append({
                "id": r.get("id"),
                "title": r.get("title"),
                "category": r.get("category"),
                "confidence": r.get("confidence"),
                "description": r.get("description", ""),
                "markdown_url": get_article_markdown_url(r.get("id", "")),
                "jsonld_url": get_article_jsonld_url(r.get("id", "")),
            })

        return [TextContent(type="text", text=json.dumps({
            "query": query,
            "confidence_min": confidence_min,
            "results": output,
            "source": "AnchorFact — anchorfact.org",
        }, ensure_ascii=False, indent=2))]

    elif name == "anchorfact_get_article":
        article_id = arguments.get("article_id", "")
        detail = get_article_detail(article_id)
        if not detail:
            return [TextContent(type="text", text=json.dumps({
                "error": f"文章 {article_id} 不存在",
            }, ensure_ascii=False))]

        # 提取关键字段
        summary = {
            "id": detail.get("id"),
            "title": detail.get("title"),
            "confidence": detail.get("confidence"),
            "confidence_rationale": detail.get("confidence_rationale"),
            "category": detail.get("category"),
            "primary_sources": detail.get("primary_sources", []),
            "atomic_facts": detail.get("atomic_facts", []),
            "completeness": detail.get("completeness"),
            "last_verified": detail.get("last_verified"),
            "markdown_url": get_article_markdown_url(article_id),
        }
        return [TextContent(type="text", text=json.dumps(summary, ensure_ascii=False, indent=2))]

    elif name == "anchorfact_list_categories":
        cats = list_categories()
        total = sum(c["count"] for c in cats)
        return [TextContent(type="text", text=json.dumps({
            "total_articles": total,
            "categories": cats,
            "source": "AnchorFact — anchorfact.org",
        }, ensure_ascii=False, indent=2))]

    else:
        return [TextContent(type="text", text=f"Unknown tool: {name}")]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())