"""
AnchorFact MCP Server v0.3 — AI Agent 直连知识库查询接口

v0.3: BM25 搜索替代简单关键词匹配
v0.2: 修复 list_categories 返回真实分类
"""

import json
import math
from collections import defaultdict
from pathlib import Path
from typing import Any

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# --- 配置 ---
BASE_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = BASE_DIR / "dist"
CONTENT_DIR = BASE_DIR / "content"

_article_index: list[dict] | None = None

# ---- BM25 参数 ----
K1 = 1.5   # TF 饱和度参数
B = 0.75   # 文档长度归一化参数

# ---- 分词器 ----
def tokenize(text: str) -> list[str]:
    """简单分词：按空格和标点分割，转小写，过滤短词"""
    import re
    words = re.split(r'[\s\-–—,()\[\]{}:;.!?\'\"<>/\\|@#$%^&*+=~`]+', text.lower())
    return [w for w in words if len(w) > 1]

# ---- BM25 索引 ----
class BM25Index:
    """BM25 全文搜索索引"""
    
    def __init__(self):
        self.documents: list[dict] = []          # 文档列表 [{id, title, confidence, ...}]
        self.doc_lengths: list[int] = []         # 每篇文档的词数
        self.avgdl: float = 0.0                  # 平均文档长度
        self.inverted_index: dict[str, dict[int, int]] = defaultdict(dict)  # 词 → {文档索引: 词频}
        self.N: int = 0                          # 文档总数
        self._built: bool = False
    
    def build(self, articles: list[dict]):
        """从文章列表构建索引"""
        self.documents = articles
        self.N = len(articles)
        if self.N == 0:
            self._built = True
            return
        
        total_len = 0
        for idx, article in enumerate(articles):
            title = tokenize(article.get("title", ""))
            desc = tokenize(article.get("description", ""))
            tokens = title + desc
            self.doc_lengths.append(len(tokens))
            total_len += len(tokens)
            
            # 统计词频
            tf_map: dict[str, int] = {}
            for t in tokens:
                tf_map[t] = tf_map.get(t, 0) + 1
            
            for term, freq in tf_map.items():
                self.inverted_index[term][idx] = freq
        
        self.avgdl = total_len / self.N if self.N > 0 else 0
        self._built = True
    
    def search(self, query: str, limit: int = 5, confidence_min: str = "medium") -> list[dict]:
        """BM25 搜索"""
        if not self._built or self.N == 0:
            return []
        
        confidence_rank = {"high": 3, "medium": 2, "low": 1}
        min_rank = confidence_rank.get(confidence_min, 1)
        
        query_terms = tokenize(query)
        if not query_terms:
            return []
        
        # 候选文档集合
        candidates: set[int] = set()
        for term in query_terms:
            if term in self.inverted_index:
                candidates.update(self.inverted_index[term].keys())
        
        if not candidates:
            return []
        
        # BM25 计算每个候选文档
        scores: list[tuple[float, dict]] = []
        for doc_id in candidates:
            article = self.documents[doc_id]
            conf = article.get("confidence", "low")
            if confidence_rank.get(conf, 0) < min_rank:
                continue
            
            dl = self.doc_lengths[doc_id]
            bm25 = 0.0
            
            for term in query_terms:
                if term not in self.inverted_index or doc_id not in self.inverted_index[term]:
                    continue
                
                # IDF: 该词出现在多少文档中
                df = len(self.inverted_index[term])  # document frequency
                idf = math.log((self.N - df + 0.5) / (df + 0.5) + 1.0)
                
                # TF: 该词在该文档中的词频
                tf = self.inverted_index[term][doc_id]
                
                # BM25 TF component
                tf_score = (tf * (K1 + 1)) / (tf + K1 * (1 - B + B * dl / self.avgdl))
                bm25 += idf * tf_score
            
            if bm25 > 0:
                # 置信度加成：high +0.3, medium +0.15, low +0
                conf_boost = 0.3 if conf == "high" else 0.15 if conf == "medium" else 0
                scores.append((bm25 + conf_boost, article))
        
        scores.sort(key=lambda x: x[0], reverse=True)
        return [a for _, a in scores[:limit]]

# 全局索引实例
_bm25_index = BM25Index()

# --- 加载数据 ---
def load_article_index() -> list[dict]:
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

        article_id = data.get("@id", "").split("/")[-1] if "@id" in data else ""
        if not article_id:
            continue

        index.append({
            "id": article_id,
            "title": data.get("headline", ""),
            "confidence": data.get("anchorfact:confidence", "medium"),
            "description": data.get("description", ""),
        })

    _article_index = index
    # 构建 BM25 索引
    _bm25_index.build(index)
    return index

def get_article_path(article_id: str) -> Path:
    return DIST_DIR / article_id

# --- 搜索 (BM25) ---
def search_articles(query: str, confidence_min: str = "medium", limit: int = 5) -> list[dict]:
    """BM25 全文搜索，带置信度加成"""
    manifest = load_article_index()
    if not manifest:
        return []
    return _bm25_index.search(query, limit, confidence_min)

def get_article_detail(article_id: str) -> dict | None:
    jsonld_file = get_article_path(article_id) / "index.json"
    if not jsonld_file.exists():
        return None
    with open(jsonld_file, "r", encoding="utf-8") as f:
        return json.load(f)

def get_article_markdown_url(article_id: str) -> str:
    return f"https://anchorfact.org/{article_id}/index.md"

def get_article_jsonld_url(article_id: str) -> str:
    return f"https://anchorfact.org/{article_id}/index.json"

# --- 真实分类 ---
def list_categories() -> list[dict]:
    cats: dict[str, int] = {}
    if CONTENT_DIR.exists():
        for domain_path in CONTENT_DIR.iterdir():
            if domain_path.is_dir() and not domain_path.name.startswith(('.', '_', 'drafts')):
                md_files = list(domain_path.glob("*.md"))
                if md_files:
                    cats[domain_path.name] = len(md_files)
    return [{"category": k, "count": v} for k, v in sorted(cats.items(), key=lambda x: -x[1])]

# --- MCP Server ---
server = Server("anchorfact")

@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="anchorfact_search",
            description="在 AnchorFact 知识库中搜索事实性知识。使用 BM25 全文搜索，按置信度和相关性排序。",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "自然语言搜索查询"},
                    "confidence_min": {"type": "string", "enum": ["high", "medium", "low"], "description": "最低置信度筛选，默认 medium"},
                    "limit": {"type": "integer", "description": "返回结果数，默认 5，最大 20"},
                },
                "required": ["query"],
            },
        ),
        Tool(
            name="anchorfact_get_article",
            description="获取指定文章的完整内容，包含所有原子事实和来源链。",
            inputSchema={
                "type": "object",
                "properties": {"article_id": {"type": "string", "description": "文章 ID，例如 kb-2026-00001"}},
                "required": ["article_id"],
            },
        ),
        Tool(
            name="anchorfact_list_categories",
            description="列出 AnchorFact 所有知识领域及其文章数量。",
            inputSchema={"type": "object", "properties": {}},
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
                "query": query, "results": [],
                "hint": "未找到匹配结果。尝试更宽泛的关键词或降低 confidence_min。",
                "search_engine": "BM25 (v0.3)",
            }, ensure_ascii=False, indent=2))]

        output = [{
            "id": r.get("id"), "title": r.get("title"),
            "confidence": r.get("confidence"), "description": r.get("description", ""),
            "markdown_url": get_article_markdown_url(r.get("id", "")),
            "jsonld_url": get_article_jsonld_url(r.get("id", "")),
        } for r in results]

        return [TextContent(type="text", text=json.dumps({
            "query": query, "confidence_min": confidence_min,
            "results": output, "source": "AnchorFact — anchorfact.org",
            "search_engine": "BM25 (v0.3)",
        }, ensure_ascii=False, indent=2))]

    elif name == "anchorfact_get_article":
        article_id = arguments.get("article_id", "")
        detail = get_article_detail(article_id)
        if not detail:
            return [TextContent(type="text", text=json.dumps({"error": f"文章 {article_id} 不存在"}, ensure_ascii=False))]

        summary = {
            "id": article_id,
            "title": detail.get("headline", ""),
            "confidence": detail.get("anchorfact:confidence", "medium"),
            "description": detail.get("description", ""),
            "primary_sources": [{"name": s.get("name", ""), "url": s.get("sameAs", "")} for s in detail.get("citation", [])],
            "date_created": detail.get("dateCreated", ""),
            "date_modified": detail.get("dateModified", ""),
            "markdown_url": get_article_markdown_url(article_id),
        }
        return [TextContent(type="text", text=json.dumps(summary, ensure_ascii=False, indent=2))]

    elif name == "anchorfact_list_categories":
        cats = list_categories()
        total = sum(c["count"] for c in cats)
        return [TextContent(type="text", text=json.dumps({
            "total_articles": total, "categories": cats,
            "source": "AnchorFact — anchorfact.org",
        }, ensure_ascii=False, indent=2))]

    return [TextContent(type="text", text=json.dumps({"error": f"未知工具: {name}"}, ensure_ascii=False))]

# --- Entry ---
async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
