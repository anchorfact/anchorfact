# AnchorFact Public Content Audit - 2026-05-27

Generated: 2026-05-27T09:55:46.030Z

Snapshot: 573 public / 427 draft / 1715 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 8
- Articles with at least one fail check: 0
- High-confidence samples needing review: 2
- Claim-evidence failures: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `business/supply-chain-management` | low | 1/7 (14.3%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `history/byzantine-empire` | low | 1/7 (14.3%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `history/computer-history` | low | 1/3 (33.3%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `history/great-depression` | low | 2/5 (40.0%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `ai/gpt-models` | medium | 2/5 (40.0%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `science/plate-tectonics` | medium | 2/6 (33.3%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `arts/classical-music-periods` | low | 1/7 (14.3%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `history/age-of-exploration` | low | 1/7 (14.3%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `science/periodic-table` | high | 6/8 (75.0%) | 4 | source=weak; claim=pass; summary=pass | downgrade_confidence |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-for-food-science` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-governance-and-policy` | high | 4/4 (100.0%) | 3 | source=weak; claim=weak; summary=pass | downgrade_confidence |
| 13 | medium_capped_claims | `ai/computer-vision` | medium | 2/2 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/constitutional-ai` | medium | 1/2 (50.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/gradient-descent` | medium | 1/2 (50.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/graphrag` | medium | 2/4 (50.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 6 | source=pass; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `arts/world-literature` | low | 2/3 (66.7%) | 6 | source=weak; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `business/product-listing-optimization-amazon` | low | 1/1 (100.0%) | 6 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `health/strength-training` | low | 1/1 (100.0%) | 6 | source=pass; claim=weak; summary=pass | repair_sources |

## Article Findings

### 1. Supply Chain Management

- canonical slug: `business/supply-chain-management`
- canonical URL: https://anchorfact.org/business/supply-chain-management/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/7 (14.3%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 2. Byzantine Empire

- canonical slug: `history/byzantine-empire`
- canonical URL: https://anchorfact.org/history/byzantine-empire/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/7 (14.3%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 3. Computer History

- canonical slug: `history/computer-history`
- canonical URL: https://anchorfact.org/history/computer-history/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 4. Great Depression

- canonical slug: `history/great-depression`
- canonical URL: https://anchorfact.org/history/great-depression/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 5. GPT (Generative Pre-trained Transformer) Model Family

- canonical slug: `ai/gpt-models`
- canonical URL: https://anchorfact.org/ai/gpt-models/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.71)
- verified source coverage: 2/5 (40.0%)
- claims: 6 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 6. Plate Tectonics

- canonical slug: `science/plate-tectonics`
- canonical URL: https://anchorfact.org/science/plate-tectonics/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/6 (33.3%)
- claims: 6 total, 1 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 7. Classical Music Periods

- canonical slug: `arts/classical-music-periods`
- canonical URL: https://anchorfact.org/arts/classical-music-periods/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/7 (14.3%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 8. Age of Exploration

- canonical slug: `history/age-of-exploration`
- canonical URL: https://anchorfact.org/history/age-of-exploration/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/7 (14.3%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 9. Periodic Table

- canonical slug: `science/periodic-table`
- canonical URL: https://anchorfact.org/science/periodic-table/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.87)
- verified source coverage: 6/8 (75.0%)
- claims: 4 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `downgrade_confidence`

### 10. Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning

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

### 11. AI for Food Science: Quality Control, Flavor Prediction, and Personalized Nutrition

- canonical slug: `ai/ai-for-food-science`
- canonical URL: https://anchorfact.org/ai/ai-for-food-science/
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

### 12. AI Governance: Risk Frameworks, Audits, and International Cooperation

- canonical slug: `ai/ai-governance-and-policy`
- canonical URL: https://anchorfact.org/ai/ai-governance-and-policy/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.86)
- verified source coverage: 4/4 (100.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `downgrade_confidence`

### 13. Computer Vision

- canonical slug: `ai/computer-vision`
- canonical URL: https://anchorfact.org/ai/computer-vision/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 2/2 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 14. Constitutional AI

- canonical slug: `ai/constitutional-ai`
- canonical URL: https://anchorfact.org/ai/constitutional-ai/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.69)
- verified source coverage: 1/2 (50.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 15. Gradient Descent and Optimization

- canonical slug: `ai/gradient-descent`
- canonical URL: https://anchorfact.org/ai/gradient-descent/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.67)
- verified source coverage: 1/2 (50.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 16. GraphRAG

- canonical slug: `ai/graphrag`
- canonical URL: https://anchorfact.org/ai/graphrag/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.76)
- verified source coverage: 2/4 (50.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 17. Film Genres

- canonical slug: `arts/film-genres`
- canonical URL: https://anchorfact.org/arts/film-genres/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 18. World Literature

- canonical slug: `arts/world-literature`
- canonical URL: https://anchorfact.org/arts/world-literature/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources
- recommendation: `repair_sources`

### 19. Product Listing Optimization (Amazon)

- canonical slug: `business/product-listing-optimization-amazon`
- canonical URL: https://anchorfact.org/business/product-listing-optimization-amazon/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 20. Strength Training

- canonical slug: `health/strength-training`
- canonical URL: https://anchorfact.org/health/strength-training/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.43)
- verified source coverage: 1/1 (100.0%)
- claims: 6 total, 6 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Require `high` confidence to have verified coverage >= 50% and at least 2 verified sources.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
