# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T02:09:11.455Z

Snapshot: 555 public / 445 draft / 1527 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 8
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 8, downgrade_confidence: 0, repair_sources: 12, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `computer-science/infrastructure-as-code-iac` | low | 1/5 (20.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `computer-science/linked-list` | low | 1/5 (20.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `history/colonialism` | low | 1/5 (20.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `ai/ai-blockchain` | medium | 1/4 (25.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `ai/ai-for-smart-homes` | medium | 1/4 (25.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `ai/ai-in-education` | medium | 1/4 (25.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `ai/mechanistic-interpretability` | medium | 1/4 (25.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `computer-science/docker` | low | 1/4 (25.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/object-detection` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/open-source-ai-movement` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/representation-learning` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/self-supervised-learning` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 18 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 19 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 20 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |

## Article Findings

### 1. Infrastructure as Code (IaC)

- canonical slug: `computer-science/infrastructure-as-code-iac`
- canonical URL: https://anchorfact.org/computer-science/infrastructure-as-code-iac/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 2. Linked List

- canonical slug: `computer-science/linked-list`
- canonical URL: https://anchorfact.org/computer-science/linked-list/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 3. Colonialism

- canonical slug: `history/colonialism`
- canonical URL: https://anchorfact.org/history/colonialism/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 4. AI and Blockchain: Decentralized Intelligence, Smart Contracts, and Crypto-Economic Systems

- canonical slug: `ai/ai-blockchain`
- canonical URL: https://anchorfact.org/ai/ai-blockchain/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/4 (25.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 5. AI for Smart Homes: Ambient Intelligence, Energy Optimization, and Predictive Home Automation

- canonical slug: `ai/ai-for-smart-homes`
- canonical URL: https://anchorfact.org/ai/ai-for-smart-homes/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.89)
- verified source coverage: 1/4 (25.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 6. AI in Education: Personalized Learning and Intelligent Tutoring Systems

- canonical slug: `ai/ai-in-education`
- canonical URL: https://anchorfact.org/ai/ai-in-education/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.705)
- verified source coverage: 1/4 (25.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 7. Mechanistic Interpretability: Reverse-Engineering Neural Network Circuits and Features

- canonical slug: `ai/mechanistic-interpretability`
- canonical URL: https://anchorfact.org/ai/mechanistic-interpretability/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.89)
- verified source coverage: 1/4 (25.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 8. Docker

- canonical slug: `computer-science/docker`
- canonical URL: https://anchorfact.org/computer-science/docker/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/4 (25.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
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

### 11. AI in Healthcare: Diagnostics, Drug Discovery, and Robotics

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

### 12. AI Red Teaming: Security Testing for Language Models

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

### 13. Object Detection: YOLO, R-CNN, and DETR

- canonical slug: `ai/object-detection`
- canonical URL: https://anchorfact.org/ai/object-detection/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.67)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 14. The Open-Source AI Movement: Llama, DeepSeek, and Democratization

- canonical slug: `ai/open-source-ai-movement`
- canonical URL: https://anchorfact.org/ai/open-source-ai-movement/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.71)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 15. Representation Learning: Autoencoders, VAEs, and MAEs

- canonical slug: `ai/representation-learning`
- canonical URL: https://anchorfact.org/ai/representation-learning/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 16. Self-Supervised Learning: Learning Without Labels

- canonical slug: `ai/self-supervised-learning`
- canonical URL: https://anchorfact.org/ai/self-supervised-learning/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.67)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, duplicate_sources
- recommendation: `repair_sources`

### 17. Film Genres

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

### 18. World Literature

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

### 19. Age of Exploration

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

### 20. Byzantine Empire

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

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
