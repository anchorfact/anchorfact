# AnchorFact Public Content Audit - 2026-05-27

Generated: 2026-05-27T16:11:20.788Z

Snapshot: 554 public / 446 draft / 1584 claims.

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
| 1 | low_verified_coverage | `history/enlightenment-era` | low | 1/5 (20.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `history/leonardo-da-vinci` | low | 1/3 (33.3%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `history/reformation` | low | 2/5 (40.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `history/ancient-egypt` | low | 3/7 (42.9%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `sports/olympic-games-history` | medium | 1/6 (16.7%) | 5 | source=weak; claim=pass; summary=pass | repair_sources |
| 6 | low_verified_coverage | `arts/architecture-history` | low | 1/6 (16.7%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `science/immune-system` | low | 1/6 (16.7%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `arts/design-thinking` | low | 1/5 (20.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/affective-computing` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-for-astronomy` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/tokenization-in-nlp` | medium | 1/2 (50.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/attention-mechanisms-deep-dive` | medium | 1/2 (50.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/constitutional-ai` | medium | 1/2 (50.0%) | 4 | source=weak; claim=fail; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/knowledge-distillation` | medium | 2/5 (40.0%) | 4 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `ai/natural-language-processing-nlp` | low | 2/3 (66.7%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `arts/digital-art` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `business/cryptocurrency` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `computer-science/angular` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |

## Article Findings

### 1. Enlightenment Era

- canonical slug: `history/enlightenment-era`
- canonical URL: https://anchorfact.org/history/enlightenment-era/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 2. Leonardo da Vinci

- canonical slug: `history/leonardo-da-vinci`
- canonical URL: https://anchorfact.org/history/leonardo-da-vinci/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 3. Reformation

- canonical slug: `history/reformation`
- canonical URL: https://anchorfact.org/history/reformation/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 4. Ancient Egypt

- canonical slug: `history/ancient-egypt`
- canonical URL: https://anchorfact.org/history/ancient-egypt/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 3/7 (42.9%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 5. Olympic Games History

- canonical slug: `sports/olympic-games-history`
- canonical URL: https://anchorfact.org/sports/olympic-games-history/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 1/6 (16.7%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 6. Architecture History

- canonical slug: `arts/architecture-history`
- canonical URL: https://anchorfact.org/arts/architecture-history/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 7. Immune System

- canonical slug: `science/immune-system`
- canonical URL: https://anchorfact.org/science/immune-system/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 8. Design Thinking

- canonical slug: `arts/design-thinking`
- canonical URL: https://anchorfact.org/arts/design-thinking/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
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

### 13. Tokenization in NLP

- canonical slug: `ai/tokenization-in-nlp`
- canonical URL: https://anchorfact.org/ai/tokenization-in-nlp/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.67)
- verified source coverage: 1/2 (50.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 14. Attention Mechanisms: Scaled Dot-Product to FlashAttention

- canonical slug: `ai/attention-mechanisms-deep-dive`
- canonical URL: https://anchorfact.org/ai/attention-mechanisms-deep-dive/
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

### 15. Constitutional AI

- canonical slug: `ai/constitutional-ai`
- canonical URL: https://anchorfact.org/ai/constitutional-ai/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.69)
- verified source coverage: 1/2 (50.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: broken_atomic_fact, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `fail`
- title-summary accuracy: `pass`
- hygiene flags: broken_atomic_fact
- recommendation: `repair_sources`

### 16. Knowledge Distillation

- canonical slug: `ai/knowledge-distillation`
- canonical URL: https://anchorfact.org/ai/knowledge-distillation/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.675)
- verified source coverage: 2/5 (40.0%)
- claims: 4 total, 4 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 17. Natural Language Processing (NLP)

- canonical slug: `ai/natural-language-processing-nlp`
- canonical URL: https://anchorfact.org/ai/natural-language-processing-nlp/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.54)
- verified source coverage: 2/3 (66.7%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 18. Digital Art

- canonical slug: `arts/digital-art`
- canonical URL: https://anchorfact.org/arts/digital-art/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.43)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 19. Cryptocurrency

- canonical slug: `business/cryptocurrency`
- canonical URL: https://anchorfact.org/business/cryptocurrency/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.45)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 20. Angular

- canonical slug: `computer-science/angular`
- canonical URL: https://anchorfact.org/computer-science/angular/
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

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
