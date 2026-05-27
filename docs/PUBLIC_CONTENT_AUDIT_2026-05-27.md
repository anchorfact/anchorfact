# AnchorFact Public Content Audit - 2026-05-27

Generated: 2026-05-27T17:42:39.453Z

Snapshot: 554 public / 446 draft / 1564 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 8
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 4, downgrade_confidence: 0, repair_sources: 16, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `history/polynesian-navigation` | low | 2/5 (40.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `ai/neural-network-basics` | medium | 2/7 (28.6%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `ai/overfitting-and-regularization` | medium | 2/5 (40.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `science/dna-structure` | medium | 3/7 (42.9%) | 4 | source=weak; claim=pass; summary=pass | repair_sources |
| 5 | low_verified_coverage | `geography/world-religions` | medium | 3/8 (37.5%) | 4 | source=weak; claim=pass; summary=pass | repair_sources |
| 6 | low_verified_coverage | `self-improvement/decision-making-psychology` | medium | 1/10 (10.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `ai/attention-mechanism` | medium | 1/7 (14.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `business/corporate-finance` | medium | 1/6 (16.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `computer-science/c-language` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/affective-computing` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/advanced-rag-techniques` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/ai-art-and-creativity` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/ai-benchmarks-and-evaluation` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/ai-content-authenticity` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `game-development/game-ai-systems` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=weak | repair_sources |
| 18 | low_confidence_public | `game-development/save-systems-design` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=weak | repair_sources |
| 19 | low_confidence_public | `game-development/unreal-engine-5` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `geography/african-geography` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |

## Article Findings

### 1. Polynesian Navigation

- canonical slug: `history/polynesian-navigation`
- canonical URL: https://anchorfact.org/history/polynesian-navigation/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 2. Neural Network Basics

- canonical slug: `ai/neural-network-basics`
- canonical URL: https://anchorfact.org/ai/neural-network-basics/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/7 (28.6%)
- claims: 4 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 3. Overfitting and Regularization

- canonical slug: `ai/overfitting-and-regularization`
- canonical URL: https://anchorfact.org/ai/overfitting-and-regularization/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/5 (40.0%)
- claims: 4 total, 2 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, duplicate_sources, generic_dispute_statement
- recommendation: `repair_sources`

### 4. DNA Structure

- canonical slug: `science/dna-structure`
- canonical URL: https://anchorfact.org/science/dna-structure/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 3/7 (42.9%)
- claims: 4 total, 1 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 5. World Religions

- canonical slug: `geography/world-religions`
- canonical URL: https://anchorfact.org/geography/world-religions/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 3/8 (37.5%)
- claims: 4 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 6. The Psychology of Decision Making

- canonical slug: `self-improvement/decision-making-psychology`
- canonical URL: https://anchorfact.org/self-improvement/decision-making-psychology/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 1/10 (10.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 7. Attention Mechanism

- canonical slug: `ai/attention-mechanism`
- canonical URL: https://anchorfact.org/ai/attention-mechanism/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.84)
- verified source coverage: 1/7 (14.3%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 8. Corporate Finance: Capital Structure and Valuation

- canonical slug: `business/corporate-finance`
- canonical URL: https://anchorfact.org/business/corporate-finance/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.685)
- verified source coverage: 1/6 (16.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
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

### 11. C Programming Language

- canonical slug: `computer-science/c-language`
- canonical URL: https://anchorfact.org/computer-science/c-language/
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

### 12. Affective Computing: Multimodal Emotion Recognition, Sentiment Analysis, and Empathetic AI

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

### 13. Advanced RAG: From Naive Retrieval to Agentic RAG

- canonical slug: `ai/advanced-rag-techniques`
- canonical URL: https://anchorfact.org/ai/advanced-rag-techniques/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.76)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources
- recommendation: `repair_sources`

### 14. AI Art and Creativity: Generative Models and Authorship

- canonical slug: `ai/ai-art-and-creativity`
- canonical URL: https://anchorfact.org/ai/ai-art-and-creativity/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.76)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 15. AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence

- canonical slug: `ai/ai-benchmarks-and-evaluation`
- canonical URL: https://anchorfact.org/ai/ai-benchmarks-and-evaluation/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.76)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 16. AI Content Authenticity: Watermarking and Detection

- canonical slug: `ai/ai-content-authenticity`
- canonical URL: https://anchorfact.org/ai/ai-content-authenticity/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.71)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 17. 游戏 AI 系统设计

- canonical slug: `game-development/game-ai-systems`
- canonical URL: https://anchorfact.org/game-development/game-ai-systems/
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

### 18. save systems design

- canonical slug: `game-development/save-systems-design`
- canonical URL: https://anchorfact.org/game-development/save-systems-design/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `weak`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 19. Unreal Engine 5

- canonical slug: `game-development/unreal-engine-5`
- canonical URL: https://anchorfact.org/game-development/unreal-engine-5/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.53)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 20. African Geography

- canonical slug: `geography/african-geography`
- canonical URL: https://anchorfact.org/geography/african-geography/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
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
