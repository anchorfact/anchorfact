# AnchorFact 贡献指南

## 欢迎

AnchorFact 是一个开源项目，欢迎所有人参与。无论你是领域专家、事实核查员、代码贡献者，还是只是想纠正一个错误——这里都有你可以做的事。

## 行为准则

- 所有讨论以事实为依据
- 禁止人身攻击
- 利益冲突必须主动声明
- AI 辅助内容必须显式标注

详见[项目宪章](./GOVERNANCE.md)。

## 如何贡献

### 贡献内容（知识条目）

1. 在 `content/` 目录找到对应领域（如 `content/ai/`）
2. 按照[内容标准](./docs/CONTENT_STANDARD.md)创建 Markdown 文件
3. 提交 Pull Request
4. 等待自动检查（Schema、来源、格式）和审核人批准

### 报告错误

- 开 Issue，标题格式 `[勘误] 文章ID - 错误描述`
- 附上正确的来源

### 代码贡献

- 所有代码 PR 需通过 CI 检查
- 新功能需提供测试

## 内容标准速查

每篇文章必须:
- [ ] 包含完整的 Frontmatter（id / title / schema_type / confidence / primary_sources）
- [ ] 至少 1 个可验证的原始来源
- [ ] 遵循三层结构（TL;DR → 核心解释 → 详细分析）
- [ ] 若使用 AI 辅助，已显式标注 `generation_method`

---

> AI 生成内容必须标注。未经标注使用 AI 生成内容的贡献者将被暂停资格。
