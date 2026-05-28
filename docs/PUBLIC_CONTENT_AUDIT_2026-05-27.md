# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T04:21:37.323Z

Snapshot: 555 public / 445 draft / 1577 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 1
- Articles with at least one fail check: 7
- High-confidence samples needing review: 0
- Claim-evidence failures: 7
- Recommendations: keep_public: 9, downgrade_confidence: 0, repair_sources: 11, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `computer-science/sql` | medium | 2/6 (33.3%) | 1 | source=weak; claim=pass; summary=pass | keep_public |
| 2 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 3 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 4 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 5 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 6 | medium_capped_claims | `science/particle-physics` | medium | 2/4 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | medium_capped_claims | `sports/sports-exercise-physiology` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | medium_capped_claims | `sports/sports-nutrition` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 9 | medium_capped_claims | `ai/ai-agent-frameworks` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 10 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 14 | risk_fallback | `game-development/accessibility-guide` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=weak | repair_sources |
| 15 | risk_fallback | `game-development/animation-state-machines` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=weak | repair_sources |
| 16 | risk_fallback | `game-development/audio-design-guide` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=weak | repair_sources |
| 17 | risk_fallback | `game-development/game-localization` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=pass | repair_sources |
| 18 | risk_fallback | `game-development/input-systems-accessibility` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=weak | repair_sources |
| 19 | risk_fallback | `game-development/performance-optimization` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=weak | repair_sources |
| 20 | risk_fallback | `game-development/story-architecture-code` | low | 1/1 (100.0%) | 4 | source=pass; claim=fail; summary=weak | repair_sources |

## Article Findings

### 1. SQL (Structured Query Language)

- canonical slug: `computer-science/sql`
- canonical URL: https://anchorfact.org/computer-science/sql/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/6 (33.3%)
- claims: 1 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 2. GPT (Generative Pre-trained Transformer) Model Family

- canonical slug: `ai/gpt-models`
- canonical URL: https://anchorfact.org/ai/gpt-models/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.88)
- verified source coverage: 4/4 (100.0%)
- claims: 6 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 3. Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning

- canonical slug: `ai/agentic-ai`
- canonical URL: https://anchorfact.org/ai/agentic-ai/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.85)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 4. AI in Healthcare: Diagnostics, Drug Discovery, and Robotics

- canonical slug: `ai/ai-in-healthcare`
- canonical URL: https://anchorfact.org/ai/ai-in-healthcare/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.865)
- verified source coverage: 3/3 (100.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 5. AI Red Teaming: Security Testing for Language Models

- canonical slug: `ai/ai-red-teaming-and-safety`
- canonical URL: https://anchorfact.org/ai/ai-red-teaming-and-safety/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.865)
- verified source coverage: 3/3 (100.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 6. Particle Physics and the Standard Model

- canonical slug: `science/particle-physics`
- canonical URL: https://anchorfact.org/science/particle-physics/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.86)
- verified source coverage: 2/4 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 7. Exercise Physiology: How the Body Adapts to Training

- canonical slug: `sports/sports-exercise-physiology`
- canonical URL: https://anchorfact.org/sports/sports-exercise-physiology/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.725)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 8. Sports Nutrition: Fueling Performance and Recovery

- canonical slug: `sports/sports-nutrition`
- canonical URL: https://anchorfact.org/sports/sports-nutrition/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.795)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 9. AI Agent Frameworks: LangChain, AutoGen, and CrewAI

- canonical slug: `ai/ai-agent-frameworks`
- canonical URL: https://anchorfact.org/ai/ai-agent-frameworks/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.76)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 10. Film Genres

- canonical slug: `arts/film-genres`
- canonical URL: https://anchorfact.org/arts/film-genres/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.47)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 11. World Literature

- canonical slug: `arts/world-literature`
- canonical URL: https://anchorfact.org/arts/world-literature/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.58)
- verified source coverage: 2/2 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 12. Age of Exploration

- canonical slug: `history/age-of-exploration`
- canonical URL: https://anchorfact.org/history/age-of-exploration/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 13. Byzantine Empire

- canonical slug: `history/byzantine-empire`
- canonical URL: https://anchorfact.org/history/byzantine-empire/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 14. 游戏可访问性设计指南

- canonical slug: `game-development/accessibility-guide`
- canonical URL: https://anchorfact.org/game-development/accessibility-guide/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 15. 游戏动画状态机设计

- canonical slug: `game-development/animation-state-machines`
- canonical URL: https://anchorfact.org/game-development/animation-state-machines/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 16. 游戏音效设计完全指南

- canonical slug: `game-development/audio-design-guide`
- canonical URL: https://anchorfact.org/game-development/audio-design-guide/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 17. 游戏本地化（Localization / L10n）

- canonical slug: `game-development/game-localization`
- canonical URL: https://anchorfact.org/game-development/game-localization/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `pass`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 18. input systems accessibility

- canonical slug: `game-development/input-systems-accessibility`
- canonical URL: https://anchorfact.org/game-development/input-systems-accessibility/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 19. 游戏性能优化

- canonical slug: `game-development/performance-optimization`
- canonical URL: https://anchorfact.org/game-development/performance-optimization/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 20. 叙事架构代码实现指南

- canonical slug: `game-development/story-architecture-code`
- canonical URL: https://anchorfact.org/game-development/story-architecture-code/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

## Rule Calibration

- Upgrade `low_verified_coverage` from audit marker to draft condition in the next rules pass.
- Keep the current high-confidence rule, while continuing spot checks.
- Restrict `claims.json` to atomic facts with precise evidence matches.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
