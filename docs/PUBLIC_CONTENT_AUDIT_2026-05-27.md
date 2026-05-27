# AnchorFact Public Content Audit - 2026-05-27

Generated: 2026-05-27T18:07:23.856Z

Snapshot: 554 public / 446 draft / 1553 claims.

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
| 1 | low_verified_coverage | `history/great-wall-of-china` | low | 1/6 (16.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `history/greek-philosophy` | low | 1/6 (16.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `science/photosynthesis` | low | 1/6 (16.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `arts/audio-engineering` | low | 1/5 (20.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `arts/renaissance-art` | low | 1/5 (20.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `business/management-styles` | low | 1/5 (20.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `history/civil-rights-movement` | low | 1/5 (20.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `science/genetics-and-heredity` | low | 1/5 (20.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `computer-science/c-language` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/affective-computing` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/ai-ethics-and-bias` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/ai-for-science` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/ai-for-visualization` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/ai-governance-and-policy` | medium | 4/4 (100.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `geography/asian-geography` | low | 1/2 (50.0%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `geography/economic-systems` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `geography/mount-everest` | low | 2/3 (66.7%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `geography/north-america-geography` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |

## Article Findings

### 1. Great Wall of China

- canonical slug: `history/great-wall-of-china`
- canonical URL: https://anchorfact.org/history/great-wall-of-china/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 2. Greek Philosophy

- canonical slug: `history/greek-philosophy`
- canonical URL: https://anchorfact.org/history/greek-philosophy/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 3. Photosynthesis

- canonical slug: `science/photosynthesis`
- canonical URL: https://anchorfact.org/science/photosynthesis/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 4. Audio Engineering

- canonical slug: `arts/audio-engineering`
- canonical URL: https://anchorfact.org/arts/audio-engineering/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 5. Renaissance Art

- canonical slug: `arts/renaissance-art`
- canonical URL: https://anchorfact.org/arts/renaissance-art/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 6. Management Styles

- canonical slug: `business/management-styles`
- canonical URL: https://anchorfact.org/business/management-styles/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 7. Civil Rights Movement

- canonical slug: `history/civil-rights-movement`
- canonical URL: https://anchorfact.org/history/civil-rights-movement/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 8. Genetics and Heredity

- canonical slug: `science/genetics-and-heredity`
- canonical URL: https://anchorfact.org/science/genetics-and-heredity/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/5 (20.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
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

### 13. AI Ethics and Algorithmic Bias

- canonical slug: `ai/ai-ethics-and-bias`
- canonical URL: https://anchorfact.org/ai/ai-ethics-and-bias/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.795)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 14. AI for Science: AlphaFold and the AI-Driven Discovery Revolution

- canonical slug: `ai/ai-for-science`
- canonical URL: https://anchorfact.org/ai/ai-for-science/
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

### 15. AI for Data Visualization: Automated Chart Generation, Insight Discovery, and Visual Analytics

- canonical slug: `ai/ai-for-visualization`
- canonical URL: https://anchorfact.org/ai/ai-for-visualization/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.73)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 16. AI Governance: Risk Frameworks, Audits, and International Cooperation

- canonical slug: `ai/ai-governance-and-policy`
- canonical URL: https://anchorfact.org/ai/ai-governance-and-policy/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.86)
- verified source coverage: 4/4 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 17. Asian Geography

- canonical slug: `geography/asian-geography`
- canonical URL: https://anchorfact.org/geography/asian-geography/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.51)
- verified source coverage: 1/2 (50.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 18. Economic Systems

- canonical slug: `geography/economic-systems`
- canonical URL: https://anchorfact.org/geography/economic-systems/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.43)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 19. Mount Everest

- canonical slug: `geography/mount-everest`
- canonical URL: https://anchorfact.org/geography/mount-everest/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 20. North America Geography

- canonical slug: `geography/north-america-geography`
- canonical URL: https://anchorfact.org/geography/north-america-geography/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.43)
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
