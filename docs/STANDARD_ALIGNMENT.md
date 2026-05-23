# 质量标准 vs 评分引擎 对照分析

## 对照矩阵

| 质量标准 (v1.0) | 评分引擎覆盖 | 当前得分 | 覆盖度 | 差距 |
|:---|:---|:---:|:---:|------|
| **1.1 来源权威** | D3.1 source_tier (0-10) | D3: 17.9/25 | 80% | SOURCE_TIER_SCORE 正确分层，但未区分"一级信源×1"和"二级信源×2"的等效规则 |
| **1.2 可验证** | D1.3 verifiability (0-6) + D2.3 accuracy (0-5) | D1.3: 26.5max | 70% | ✅ URL/DOI 校验 ✓ | 缺少"链接失效"检测和存档要求 |
| **1.3 置信度标注** | D1.4 confidence (0-4) | ✓ | 100% | `high/medium/low/disputed` 全覆盖 |
| **2.1 事实与观点分离** | ❌ 未覆盖 | — | 0% | 🔴 **新增维度**：检测正文中是否混入评价性语言 |
| **2.2 利益冲突规避** | ❌ 未覆盖 | — | 0% | 🔴 **新增字段**：frontmatter 添加 `conflict_of_interest` |
| **2.3 争议呈现** | D4.3 disputed_statements (0-5) | ✓ | 60% | 存在检测 ✓，但未评估"是否公平呈现多方观点" |
| **3.1 时间标记** | D2.1 freshness (0-10) | ✓ | 50% | 仅检测 `last_verified` 新旧，**未校验 `created_date` 字段** |
| **3.2 动态事实处理** | ❌ 未覆盖 | — | 0% | 🔴 **新增机制**：`is_live_document` 标记 + 版本链接 |
| **4.1 核心要素齐备** | D1.1 structure (0-8) + D2.2 completeness (0-5) | D1: 26.5/30 | 70% | TL;DR/核心解释字段检测 ✓，但"原子事实与来源关联深度"可加强 |
| **4.2 结构化规范** | D1.1 structure (0-8) | ✓ | 90% | Schema/字段格式校验 ✓，JSON-LD 编译器已到位 |
| **5.1 分类准确** | D2.4 classification (0-5) | ✓ | 100% | 目录名 vs category 字段一致性校验 ✓ |
| **5.2 可机器解析** | score-schema.json + validate-content.cjs | ✓ | 100% | ✅ JSON Schema + 程序化验证 |

## 差距优先级

### P0 — 立即补充

| # | 差距 | 实现方案 | 影响 |
|:---:|------|----------|:---:|
| 1 | **事实与观点分离** | 新增 D5 维度 `scoreFactOpinionSeparation`：检测正文中是否标注了观点持有方、是否存在未归因评价性断言。通过 `known_disputes` 和 `disputed_statements` 字段推断覆盖度。 | 新增 5 分维度 |
| 2 | **创建日期字段** | frontmatter 添加 `created_date` 必填字段，`validate-content.cjs` 校验其存在性。评分引擎对缺失项扣 D1 分。 | 修复时间标记完整性 |
| 3 | **来源等效规则** | SOURCE_TIER_SCORE 增加 "1 级信源×1" 等效 "2 级信源×2" 的加分逻辑，鼓励多源交叉验证。 | D3 维度精度提升 |

### P1 — 本月补充

| # | 差距 | 实现方案 |
|:---:|------|----------|
| 4 | **利益冲突声明** | frontmatter 添加 `conflict_of_interest` 可选字段，validate 检查是否存在 |
| 5 | **链接失效检测** | `check-urls.cjs` 增加定期扫描，标记 404/301，结合 `last_verified` 降级 |
| 6 | **争议公平性评分** | D4.3 从"是否存在"升级为"是否充分呈现"，检查 disputed_statements 中是否提供了反方论据来源 |
| 7 | **动态事实标记** | frontmatter 添加 `is_live_document` 和 `data_period` 字段，适配疫情/选举类内容 |

## 执行建议

1. **立即**：创建 `scripts/audit-quality-standard.cjs` — 对照 v1.0 标准输出每篇条目的逐项通过/失败报告
2. **本周**：实现 P0 三项（事实观点分离、创建日期、来源等效规则）
3. **本月**：实现 P1 四项
