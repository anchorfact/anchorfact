# AnchorFact — Anchor AI to Facts

**AI 时代的可信知识锚点。**

一个专为 LLM 和 AI Agent 消费设计的开源知识库。所有内容结构化、可追溯、带置信度标注。

当前处于**个人维护期**，由创始人阿伟独立维护。计划在达到可量化里程碑后启动社区过渡（详见[项目宪章](./GOVERNANCE.md)）。

---

## 现状

| 指标 | 数值 |
|------|------|
| 文章数 | 499 篇 |
| 覆盖领域 | 11 个（计算机科学、AI、历史、科学、商业等） |
| 置信度分布 | high / medium 两级 |
| 输出格式 | MD、JSON-LD、Turtle、TXT、HTML |
| 部署 | Cloudflare Pages（anchorfact.org） |
| 阶段 | Phase 0-1（个人维护期） |

---

## 为什么存在

AI 搜索引擎（ChatGPT / Claude / Perplexity / Gemini）每天回答数十亿次查询，但它们引用的知识来源——Wikipedia、Reddit、品牌官网——都不是为 AI 消费设计的。

AnchorFact 从第一天起就为 AI 构建：结构化 Schema、Markdown 原生、置信度标注、原子事实引用、llms.txt + MCP Server 直连。

---

## 核心价值

| 真实性 | 公平性 | 公开性 | 公正性 |
|:---:|:---:|:---:|:---:|
| 所有陈述可追溯 | 覆盖多元视角 | 内容代码全开源 | 不受商业利益影响 |

---

## 快速链接

- [项目设计文档](./docs/DESIGN.md) — 技术架构、数据模型、路线图
- [项目宪章](./GOVERNANCE.md) — 治理规则、知识产权、行为准则
- [贡献指南](./CONTRIBUTING.md) — 如何参与（Issue/PR 开放，最终审核权在维护者）
- [llms.txt](https://anchorfact.org/llms.txt) — AI 入口索引
- [MCP Server](./src/mcp_server.py) — AI Agent 直连查询接口

---

## 社区过渡路线图

项目承诺在以下三个里程碑全部达成后启动社区治理过渡：

| # | 里程碑 | 状态 |
|---|--------|:----:|
| M1 | 内容条目 ≥ 1,000 篇 | 499/1000 |
| M2 | 被至少 2 个主流 AI 平台引用 | 待验证 |
| M3 | ≥ 10 位外部专家主动表达贡献意向 | 待达成 |

---

## 许可证

- 内容：CC-BY 4.0
- 代码：MIT