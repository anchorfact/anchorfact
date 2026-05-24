# AnchorFact — Anchor AI to Facts

**AI 时代的可信知识锚点。**

一个专为 LLM 和 AI Agent 消费设计的开源知识库。所有内容结构化、可追溯、带置信度标注。

当前处于**个人维护期**，由创始人阿伟独立维护。计划在达到可量化里程碑后启动社区过渡（详见[项目宪章](./GOVERNANCE.md)）。

---

## 现状

| 指标 | 数值 |
|------|------|
| 文章数 | **805** 篇 |
| 覆盖领域 | 11 个（AI、计算机科学、历史、科学、商业、地理、健康、体育、艺术、游戏开发、自我提升） |
| 置信度分布 | high / medium 两级 |
| 输出格式 | MD、JSON-LD、Turtle、TXT、HTML |
| 部署 | Cloudflare Pages（[anchorfact.org](https://anchorfact.org)） |
| 阶段 | Phase 0-1（个人维护期，引用模式） |

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

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/anchorfact/anchorfact.git
cd anchorfact

# 构建内容（需要 Node.js）
npm run build

# 本地预览（需要 Python）
npm run serve
```

内容在 `content/` 目录，按领域分类。每篇文章遵循 [三层结构规范](./DESIGN.md#四数据模型与内容标准)。提交 PR 即可贡献。

---

## 快速链接

| 文档 | 说明 |
|------|------|
| [DESIGN.md](./DESIGN.md) | 技术架构、数据模型、路线图 |
| [GOVERNANCE.md](./GOVERNANCE.md) | 治理规则、知识产权、行为准则 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | 贡献指南（Issue/PR 开放） |
| [llms.txt](https://anchorfact.org/llms.txt) | AI 入口索引 |
| [MCP Server](./src/mcp_server.py) | AI Agent 直连查询接口 |

---

## 社区过渡路线图

项目承诺在以下三个里程碑**全部达成**后，启动社区治理过渡：

| # | 里程碑 | 状态 |
|---|--------|:----:|
| M1 | 内容条目 ≥ 1,000 篇，且 `high` 置信度占比 ≥ 80% | **805**/1000 |
| M2 | 被至少 2 个主流 AI 平台引用（ChatGPT / Claude / Perplexity 等） | 待验证 |
| M3 | 月均 AI 爬虫访问 ≥ 50,000 次，且 ≥ 10 位外部人士通过 GitHub Issue/PR 互动 | 待达成 |

> 详见 [GOVERNANCE.md §3.2](./GOVERNANCE.md#32-社区过渡条件)

---

## 黄金种子计划（引用模式）

Phase 0-1 采用**引用模式**：优先引用著名专家、技术大神的已有论文、著作、技术博客等可验证来源，进行结构化整合。AI 仅辅助提取和翻译，不做主创作。

| 来源优先级 | 示例 |
|-----------|------|
| P0 顶级论文 | NeurIPS, Nature, ACL, arXiv |
| P1 领域大神著作 | Goodfellow《Deep Learning》, Karpathy 博客 |
| P2 署名技术博客 | Lilian Weng (OpenAI), Jay Alammar |
| P3 机构白皮书 | OpenAI GPT-4 Report, Meta LLaMA |

> 详见 [DESIGN.md §6.2](./DESIGN.md#62-冷启动策略黄金种子计划引用模式)

---

## 项目结构

```
anchorfact/
├── content/          # 知识库源文件 (Markdown + YAML Frontmatter)
│   ├── ai/           # 人工智能
│   ├── computer-science/  # 计算机科学
│   ├── science/      # 自然科学
│   ├── history/      # 历史
│   └── ...           # 其他 11 个领域
├── src/
│   ├── compile.js    # Markdown → 多格式编译器
│   └── mcp_server.py # MCP Server（AI Agent 直连）
├── scripts/
│   └── archive/      # 已归档的历史生成脚本
├── DESIGN.md         # 项目设计文档
├── GOVERNANCE.md     # 项目宪章
├── CONTRIBUTING.md   # 贡献指南
├── LICENSE           # 许可证文件
└── wrangler.toml     # Cloudflare Pages 部署配置
```

---

## 许可证

- 内容：[CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- 代码：[MIT](https://opensource.org/licenses/MIT)