# AnchorFact — 推广清单

## 核心卖点（30秒电梯演讲）

AnchorFact 是第一个 **AI 原生知识库**：不是 Wikipedia，不是 AI 生成的内容农场。
它是一个 **面向 LLM 和 AI Agent 消费的结构化信息来源**，所有内容由 AI 从可溯源出版物中提取整合，置信度由**公开公式自动计算**——任何下游 AI 都可以独立复现实算，不需要信任 AnchorFact 本身。

- 826 篇文章，11 个领域，在 anchorfact.org 上线
- 95 篇 high 置信度（DOI 论文 + ISO/IEC/RFC 标准验证）
- 置信度公式公开：source_tier × verifiability × freshness
- MIT 开源 + CC-BY 内容
- MCP Server 可用，AI Agent 可直接检索

---

## 推广渠道

### 1. Show HN (Hacker News)
**标题**: Show HN: AnchorFact — An AI-native knowledge base for LLM citations (826 articles, MIT)

**正文**:
```
AnchorFact (anchorfact.org) is an AI-structured knowledge base designed for LLM and AI Agent consumption.

The problem: AI search engines (ChatGPT, Perplexity, Claude) cite Wikipedia and random blog posts — sources designed for humans, not machines. Extraction errors are common, structure is inconsistent, and trust is opaque.

What AnchorFact does differently:
- Every article is compiled from traceable publications (papers, standards, RFCs), not written from scratch
- Confidence is computed by a PUBLIC FORMULA (source tier × verifiability × freshness) — not a black-box AI score
- Output in 5 formats: JSON-LD (semantic web), Turtle (RDF), Markdown, plain text, HTML
- MCP Server included — AI agents can query the knowledge base directly
- llms.txt, sitemap.xml, CORS headers, and full AI crawler access
- MIT licensed code, CC-BY content

Current stats:
- 826 articles across 11 domains (AI, CS, science, history, etc.)
- 95 high-confidence articles backed by DOI-verified sources
- Source verification pipeline: CrossRef + arXiv API + HTTP reachability
- ~2.5 verifiable sources per article

Trust = source tier × verifiability × freshness — not consensus, not authority, not editing.

Happy to answer questions.
```

### 2. Reddit: r/MachineLearning
**标题**: [P] AnchorFact: An AI-native, source-verifiable knowledge base for LLM citations

聚焦于技术架构：置信度公式、来源验证流水线、MCP Server、JSON-LD 输出。

### 3. Reddit: r/LocalLLaMA
**标题**: I built a knowledge base designed for LLM consumption — MCP Server included

强调：MCP Server 可接入任何 MCP 兼容的 LLM Agent、置信度公式可复现实算、llms.txt 完整。

### 4. Twitter/X 帖子

```
Introducing AnchorFact (anchorfact.org) — an AI-native knowledge base for LLM citations.

826 articles. 11 domains. 95 high-confidence articles backed by DOI-verified sources.

Confidence is computed by a PUBLIC FORMULA, not black-box AI scoring.
Source tier × verifiability × freshness → high/medium/low.

MCP Server included — AI agents can query directly.

MIT + CC-BY
github.com/anchorfact/anchorfact
```

### 5. OpenAI / Claude 应用商店
- 提交到即将开放的 OpenAI GPT Store 作为 "Knowledge Source" 或 "Verified Data" 类别
- Claude MCP: 直接使用 MCP Server 接入 Claude Desktop

### 6. Awesome Lists
- awesome-llm-apps
- awesome-semantic-web
- awesome-mcp-servers
- awesome-ai-agents
- awesome-geo (generative engine optimization)

### 7. Perplexity / You.com
- 提交网站到 Perplexity 的网页索引
- 确保 robots.txt 已开放、sitemap.xml 已提交

---

## 关键落地页检查

- [x] anchorfact.org 在线 (Cloudflare Pages)
- [x] robots.txt 向所有 AI 爬虫开放
- [x] sitemap.xml 包含所有 826 篇文章
- [x] llms.txt AI 站点地图
- [x] JSON-LD CORS headers (_headers)
- [x] IndexNow key 已部署
- [ ] Google Search Console 提交 (需手动)
- [ ] Bing Webmaster Tools 提交 (需手动)
- [ ] Perplexity/You.com 提交
