# AnchorFact Public Content Audit - 2026-05-27

Generated: 2026-05-27T17:03:26.648Z

Snapshot: 554 public / 446 draft / 1574 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 9
- Articles with at least one fail check: 1
- High-confidence samples needing review: 0
- Claim-evidence failures: 1
- Recommendations: keep_public: 4, downgrade_confidence: 0, repair_sources: 16, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `history/renaissance-science` | low | 1/5 (20.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `history/silk-road` | low | 1/5 (20.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `history/viking-age` | low | 1/5 (20.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `business/financial-literacy` | low | 2/7 (28.6%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `ai/explainable-ai-xai` | low | 1/3 (33.3%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `game-development/game-testing-methodology` | low | 1/3 (33.3%) | 4 | source=weak; claim=fail; summary=weak | repair_sources |
| 7 | low_verified_coverage | `history/french-revolution` | low | 2/6 (33.3%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `ai/recurrent-neural-networks-rnn` | medium | 2/5 (40.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/affective-computing` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-for-astronomy` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/transformer-architecture-variants` | medium | 1/2 (50.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `computer-science/c-language` | medium | 3/7 (42.9%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/activation-functions` | medium | 2/2 (100.0%) | 4 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/3d-generation-gaussian-splatting` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `computer-science/php-language` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `computer-science/playwright` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `computer-science/react` | low | 2/4 (50.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `game-development/community-management` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=weak | repair_sources |

## Article Findings

### 1. Renaissance Science

- canonical slug: `history/renaissance-science`
- canonical URL: https://anchorfact.org/history/renaissance-science/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 2. Silk Road

- canonical slug: `history/silk-road`
- canonical URL: https://anchorfact.org/history/silk-road/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 3. Viking Age

- canonical slug: `history/viking-age`
- canonical URL: https://anchorfact.org/history/viking-age/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 4. Financial Literacy

- canonical slug: `business/financial-literacy`
- canonical URL: https://anchorfact.org/business/financial-literacy/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/7 (28.6%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 5. Explainable AI (XAI)

- canonical slug: `ai/explainable-ai-xai`
- canonical URL: https://anchorfact.org/ai/explainable-ai-xai/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.425)
- verified source coverage: 1/3 (33.3%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_dispute_statement
- recommendation: `repair_sources`

### 6. 游戏测试方法论

- canonical slug: `game-development/game-testing-methodology`
- canonical URL: https://anchorfact.org/game-development/game-testing-methodology/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `fail`
- title-summary accuracy: `weak`
- hygiene flags: broken_atomic_fact, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 7. French Revolution

- canonical slug: `history/french-revolution`
- canonical URL: https://anchorfact.org/history/french-revolution/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/6 (33.3%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 8. Recurrent Neural Networks (RNN)

- canonical slug: `ai/recurrent-neural-networks-rnn`
- canonical URL: https://anchorfact.org/ai/recurrent-neural-networks-rnn/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/5 (40.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_dispute_statement
- recommendation: `repair_sources`

### 9. GPT (Generative Pre-trained Transformer) Model Family

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

### 11. Affective Computing: Multimodal Emotion Recognition, Sentiment Analysis, and Empathetic AI

- canonical slug: `ai/affective-computing`
- canonical URL: https://anchorfact.org/ai/affective-computing/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.85)
- verified source coverage: 2/2 (100.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 12. AI for Astronomy: Exoplanet Detection, Galaxy Classification, and Computational Astrophysics

- canonical slug: `ai/ai-for-astronomy`
- canonical URL: https://anchorfact.org/ai/ai-for-astronomy/
- bucket: `high_confidence`
- confidence: `high` (verified_sources, score 0.85)
- verified source coverage: 2/2 (100.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 13. Transformer Variants: From Encoder-Decoder to Mamba State Space Models

- canonical slug: `ai/transformer-architecture-variants`
- canonical URL: https://anchorfact.org/ai/transformer-architecture-variants/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.71)
- verified source coverage: 1/2 (50.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 14. C Programming Language

- canonical slug: `computer-science/c-language`
- canonical URL: https://anchorfact.org/computer-science/c-language/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.75)
- verified source coverage: 3/7 (42.9%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources
- recommendation: `repair_sources`

### 15. Activation Functions in Neural Networks

- canonical slug: `ai/activation-functions`
- canonical URL: https://anchorfact.org/ai/activation-functions/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 2/2 (100.0%)
- claims: 4 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 16. 3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering

- canonical slug: `ai/3d-generation-gaussian-splatting`
- canonical URL: https://anchorfact.org/ai/3d-generation-gaussian-splatting/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.78)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 17. PHP Language

- canonical slug: `computer-science/php-language`
- canonical URL: https://anchorfact.org/computer-science/php-language/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 18. Playwright

- canonical slug: `computer-science/playwright`
- canonical URL: https://anchorfact.org/computer-science/playwright/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 19. React

- canonical slug: `computer-science/react`
- canonical URL: https://anchorfact.org/computer-science/react/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/4 (50.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 20. 游戏社区运营

- canonical slug: `game-development/community-management`
- canonical URL: https://anchorfact.org/game-development/community-management/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `weak`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
