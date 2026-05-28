# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T11:52:56.337Z

Snapshot: 555 public / 445 draft / 1652 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 1
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 11, downgrade_confidence: 0, repair_sources: 9, move_to_draft: 0

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
| 6 | medium_capped_claims | `business/strategic-management-theory` | medium | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 7 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 8 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 9 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | risk_fallback | `computer-science/vault-hashicorp` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 12 | risk_fallback | `computer-science/web-storage-api` | medium | 1/1 (100.0%) | 3 | source=pass; claim=pass; summary=pass | repair_sources |
| 13 | risk_fallback | `geography/international-trade` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 14 | risk_fallback | `health/nutrition-for-athletes` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 15 | risk_fallback | `health/posture-and-ergonomics` | medium | 1/1 (100.0%) | 3 | source=pass; claim=pass; summary=pass | repair_sources |
| 16 | risk_fallback | `health/public-health-basics` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 17 | risk_fallback | `health/running-fundamentals` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 18 | risk_fallback | `health/stress-management` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | risk_fallback | `science/climate-change` | medium | 4/5 (80.0%) | 3 | source=weak; claim=pass; summary=pass | keep_public |
| 20 | risk_fallback | `science/human-brain-structure` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |

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

### 6. Strategic Management: Frameworks and Practice

- canonical slug: `business/strategic-management-theory`
- canonical URL: https://anchorfact.org/business/strategic-management-theory/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.795)
- verified source coverage: 3/3 (100.0%)
- claims: 3 total, 2 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 7. Film Genres

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

### 8. World Literature

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

### 9. Age of Exploration

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

### 10. Byzantine Empire

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

### 11. Vault (HashiCorp)

- canonical slug: `computer-science/vault-hashicorp`
- canonical URL: https://anchorfact.org/computer-science/vault-hashicorp/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 12. Web Storage API

- canonical slug: `computer-science/web-storage-api`
- canonical URL: https://anchorfact.org/computer-science/web-storage-api/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.715)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 13. International Trade

- canonical slug: `geography/international-trade`
- canonical URL: https://anchorfact.org/geography/international-trade/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 14. Nutrition for Athletes

- canonical slug: `health/nutrition-for-athletes`
- canonical URL: https://anchorfact.org/health/nutrition-for-athletes/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 15. Posture and Ergonomics

- canonical slug: `health/posture-and-ergonomics`
- canonical URL: https://anchorfact.org/health/posture-and-ergonomics/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.735)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 16. Public Health Basics

- canonical slug: `health/public-health-basics`
- canonical URL: https://anchorfact.org/health/public-health-basics/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 17. Running Fundamentals

- canonical slug: `health/running-fundamentals`
- canonical URL: https://anchorfact.org/health/running-fundamentals/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.47)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 18. Stress Management

- canonical slug: `health/stress-management`
- canonical URL: https://anchorfact.org/health/stress-management/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.43)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 19. Climate Change

- canonical slug: `science/climate-change`
- canonical URL: https://anchorfact.org/science/climate-change/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 4/5 (80.0%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 20. Human Brain Structure

- canonical slug: `science/human-brain-structure`
- canonical URL: https://anchorfact.org/science/human-brain-structure/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.47)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
