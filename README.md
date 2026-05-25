# AnchorFact — Anchor AI to Facts

> **AI 时代的信息锚点**：一个由 AI 自动运维、专为 LLM 和 AI Agent 消费设计的结构化信息来源。不是内容创作——是可溯源信息的精准整合。

---

## 它是什么

AnchorFact 是一个**开源的结构化知识库**，所有内容由 AI 从可溯源出版物（学术论文、技术标准、专利等）中提取和整合。每条事实标注其原始来源、置信度和可验证路径——让下游 LLM 能判断这条信息有多可信，而不需要相信 AnchorFact 本身。

**核心理念**：信任不在于"谁写的"，而在于"来源是否可独立验证"。

---

## 现状态

| 指标 | 数值 |
|------|------|
| 文章数 | **805** 篇 |
| 领域 | 11 个（AI、计算机科学、科学、历史等） |
| 置信度分布 | A 级 169 · B 级 623 · C 级 13 |
| 输出格式 | MD · JSON-LD · Turtle · Plain Text · HTML |
| 部署 | Cloudflare Pages（[anchorfact.org](https://anchorfact.org)） |
| 许可证 | 内容 CC-BY 4.0 · 代码 MIT |

---

## 核心价值

| 原则 | 含义 |
|------|------|
| **可验证性优先** | 所有声明必须可追溯到机器可验证的原始来源 |
| **来源透明** | 置信度由公开公式自动计算，零人工干预 |
| **AI 原生** | 所有设计决策首先考虑 AI 消费体验 |
| **开源** | 内容和代码完全公开 |

---

## 为什么 AnchorFact 和其他知识库不同

| | AnchorFact | Wikipedia | Grokipedia |
|---|---|---|---|
| 读者 | **AI / LLM 优先** | 人类优先 | 人类优先 |
| 运维 | **AI 自动化** | 人类编辑社区 | AI 生成 |
| 数据格式 | **JSON-LD + Turtle + MD** | HTML | AI 输出 |
| 来源验证 | **机器可复现** | 编辑人工判断 | 无强制标准 |
| 置信度 | **公开公式自动计算** | 无量化标准 | 无 |
| 中立性保障 | **来源刚性 + 公式透明** | 编辑共识 | 单一 AI 视角 |

---

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/anchorfact/anchorfact.git
cd anchorfact

# 构建（需要 Node.js）
npm run build

# 或完整流水线：验证来源 → 编译 → 质量检查
npm run pipeline
```

内容在 `content/` 目录下，按领域分类。

---

## 架构

```
content/*.md  (Markdown + YAML Frontmatter)
  │
  ▼
verify-sources.js   ← 来源刚性验证（DOI / URL 可达性）
  │
  ▼
compile.js          ← Markdown → JSON-LD / Turtle / Plain Text / HTML
  │
  ▼
dist/               ← 部署到 Cloudflare Pages
```

**MCP Server**：`src/mcp_server.py` — AI Agent 可通过 MCP 协议直接检索知识库。

---

## 置信度如何计算

置信度不由 AI 主观判断，由公开公式自动计算：

```
confidence_score = (
    source_tier × 0.35     // 来源等级 (S=1.0, A=0.9, B=0.6, C=0.3)
  + source_count × 0.20   // 独立来源数 (1=0.5, 2=0.8, 3+=1.0)
  + source_verified × 0.25 // 来源可验证性 (DOI可查=1.0, URL可达=0.7)
  + freshness × 0.10      // 时效性 (1年内=1.0, 5年=0.7)
  - decay × 0.10          // 衰减 (disputed=0.2, known_gaps=0.1)
)

≥ 0.85 → high
≥ 0.60 → medium
< 0.60 → 不发布
```

公式详情见 `src/compile.js` 中的 `computeConfidence` 函数。任何下游系统可独立复现实算。

---

## 来源等级

| 等级 | 示例 | 验证方式 |
|------|------|---------|
| **S 级** | DOI 论文、ISO/IEC 标准、RFC、已授权专利 | CrossRef API / 数字签名 |
| **A 级** | 政府统计、大学官方出版物 | URL 可达性 + 机构确认 |
| **B 级** | 知名学者个人网站、技术博客 | 作者身份可验证 |
| **C 级** | Wikipedia、新闻媒体报道 | 不可作为唯一来源 |
| **D 级** | 匿名论坛、社交媒体、AI 直接生成 | **禁止作为来源** |

---

## 贡献

AnchorFact 当前由 AI 自动运维。任何人都可以：
- 通过 Issue 报告事实错误或提出条目提案
- 提交 PR 添加或改进内容
- 内容进入仓库后将自动通过来源验证流水线

无需人类社区治理，无需编辑许可。信任链条在代码里，不在人手里。

---

## 链接

- [DESIGN.md](./DESIGN.md) — 项目设计文档
- [anchorfact.org](https://anchorfact.org) — 部署站点
- [SECURITY.md](./SECURITY.md) — 安全策略

---

> *AnchorFact 不声称自己比 Wikipedia 更准确。它声称的是：任何人对它的信任可以由机器复现，而非相信任何一个编辑、任何一个机构、或任何一个 AI。*
