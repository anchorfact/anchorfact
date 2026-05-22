"""
AnchorFact MCP Server — AI Agent 直连知识库查询接口

让 Claude、ChatGPT 等 AI Agent 通过 MCP 协议直接检索 AnchorFact 知识库。
"""

import json
from pathlib import Path
from typing import Any

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# --- 配置 ---
DIST_DIR = Path(__file__).resolve().parent.parent / "dist"

# 内存索引缓存
_article_index: list[dict] | None = None

# --- 加载数据 ---
def load_article_index() -> list[dict]:
    """扫描 dist/*/index.json 构建文章索引缓存"""
    global _article_index
    if _article_index is not None:
        return _article_index

    if not DIST_DIR.exists():
        return []

    index = []
    for json_file in DIST_DIR.glob("*/index.json"):
        try:
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
        except (json.JSONDecodeError, IOError):
            continue

        # 从 JSON-LD 提取关键字段
        article_id = data.get("@id", "").split("/")[-1] if "@id" in data else ""
        if not article_id:
            continue

        headline = data.get("headline", "")
        confidence = data.get("anchorfact:confidence", "medium")
        description = data.get("description", "")

        index.append({
            "id": article_id,
            "title": headline,
            "confidence": confidence,
            "description": description,
        })

    _article_index = index
    return index

def get_article_path(article_id: str) -> Path:
    """获取文章目录路径"""
    return DIST_DIR / article_id

# --- 搜索 ---
def search_articles(query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
    """在文章索引中搜索，按关键词匹配标题和描述"""
    manifest = load_article_index()
    confidence_rank = {"high": 3, "medium": 2, "low": 1}
    min_rank = confidence_rank.get(confidence_min, 1)

    query_lower = query.lower()
    keywords = query_lower.split()
    scored: list[tuple[int, dict, str]] = []

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
        scored.append((score, article, conf))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [a for _, a, _ in scored[:limit]]

def get_article_detail(article_id: str) -> dict | None:
    """获取单篇文章的完整的 JSON-LD 数据"""
    jsonld_file = get_article_path(article_id) / "index.json"
    if not jsonld_file.exists():
        return None
    with open(jsonld_file, "r", encoding="utf-8") as f:
        return json.load(f)

def get_article_markdown_url(article_id: str) -> str:
    return f"https://anchorfact.org/{article_id}/index.md"

def get_article_jsonld_url(article_id: str) -> str:
    return f"https://anchorfact.org/{article_id}/index.json"

def list_categories() -> list[dict]:
    """列出所有领域及其文章数 — 从 index.json 中的 headline 推断类别"""
    manifest = load_article_index()
    cats: dict[str, int] = {}
    for a in manifest:
        # 类别默认值，后续可从完整文章数据中提取
        cat = "knowledge"
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

        # 提取关键字段（适配 compile.js 的 Schema.org JSON-LD 输出格式）
        summary = {
            "id": article_id,
            "title": detail.get("headline", ""),
            "confidence": detail.get("anchorfact:confidence", "medium"),
            "confidence_rationale": detail.get("anchorfact:confidenceRationale", ""),
            "description": detail.get("description", ""),
            "primary_sources": [
                {"name": s.get("name", ""), "url": s.get("sameAs", "")}
                for s in detail.get("citation", [])
            ],
            "date_created": detail.get("dateCreated", ""),
            "date_modified": detail.get("dateModified", ""),
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