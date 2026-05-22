# AnchorFact 内容标准

> 每篇文章在提交审核前必须满足以下标准。

---

## 一、Frontmatter 必填字段

每篇文章必须包含以下 YAML Frontmatter：

```yaml
---
id: "kb-2026-XXXXX"          # 全局唯一 ID（维护者分配）
title: "文章标题"
schema_type: "TechArticle"   # Schema.org 类型
category: "领域/子领域"       # 如 ai/transformer
language: "zh"               # zh | en
confidence: "high"           # high | medium | low

# 来源（至少 1 个，黄金种子至少 3 个）
primary_sources:
  - title: "来源标题"
    authors: ["作者1", "作者2"]
    type: "academic_paper"   # academic_paper | textbook | blog_post | official_report
    year: 2024
    url: "https://..."
    doi: "10.xxxx/..."      # 如有

# AI 参与标注（强制）
generation_method: "ai_assisted"  # human_only | ai_assisted | ai_generated_reviewed
ai_models: ["claude-opus"]   # 如适用

completeness: 0.85           # 0-1
last_verified: "2026-05-22"
---
```

---

## 二、三层内容结构

每篇文章必须遵循：

### TL;DR（≤ 50 字）

一句话核心回答，可被 AI 直接引用。

### 核心解释（100-200 字）

展开 TL;DR，提供上下文和关键细节。必须包含至少 1 个具体数据或数字。

### 详细分析（1000-3000 字）

按逻辑递进：

- **背景与动机**
- **核心机制**
- **应用与影响**
- **争议与局限**（如有）
- **关键数据摘要**（表格形式）

### 进一步阅读

列出推荐的进一步资料，含简短描述。

---

## 三、质量要求

| 要求 | 标准 |
|------|------|
| 来源数量 | 黄金种子 ≥ 3 个独立可验证来源；社区贡献 ≥ 1 个 |
| 事实密度 | 每个自然段至少 1 个具体数据或引用来源 |
| 语言 | 中性措辞，禁用营销形容词（"革命性的"、"最好的"） |
| 引用标注 | 所有来源标注作者、机构、DOI/URL、发表日期 |
| AI 标注 | 必须显式标注 `generation_method` |

---

## 四、黄金种子标准（Phase 0-1）

当前阶段的黄金种子文章遵循**引用模式**：

1. 基于 P0-P2 级别来源（顶级论文、大神著作、署名技术博客）
2. AI 仅用于辅助阅读、提取、整合，**不做主创作**
3. 每篇至少 3 个独立可验证来源
4. 标注原作者姓名、机构、DOI/URL、发表日期
5. 引用著名专家时，必须基于其公开发表的可验证内容

---

## 五、禁用规则

### 禁止发布

- `generation_method: "ai_generated"` 的内容
- 无来源或来源不可追溯的内容
- AI 生成但未标注的内容
- 含营销/广告语言的内容

### 禁止行为

- 伪造或篡改来源信息
- 未经允许复制付费内容全文
- 为商业利益修改置信度
- 隐藏利益冲突

---

## 六、审核检查清单

提交前自检：

- [ ] Frontmatter 所有必填字段完整
- [ ] 至少 1 个（黄金种子 3 个）可验证来源
- [ ] 三层结构完整（TL;DR / 核心解释 / 详细分析）
- [ ] AI 参与已显式标注
- [ ] 无营销语言
- [ ] 所有链接可访问

详见 [CONTRIBUTING.md](../CONTRIBUTING.md) 和 [DESIGN.md](../DESIGN.md)。
