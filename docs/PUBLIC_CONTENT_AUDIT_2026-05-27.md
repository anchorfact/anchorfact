# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T12:00:28.434Z

Snapshot: 555 public / 445 draft / 1652 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 1
- Articles with at least one fail check: 0
- High-confidence samples needing review: 3
- Claim-evidence failures: 0
- Recommendations: keep_public: 11, downgrade_confidence: 3, repair_sources: 6, move_to_draft: 0

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
| 11 | risk_fallback | `science/climate-change` | medium | 4/5 (80.0%) | 3 | source=weak; claim=pass; summary=pass | keep_public |
| 12 | risk_fallback | `science/theory-of-relativity` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 13 | risk_fallback | `self-improvement/public-speaking` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 14 | risk_fallback | `sports/basketball-fundamentals` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 15 | risk_fallback | `ai/ai-for-materials-science` | high | 2/3 (66.7%) | 2 | source=weak; claim=pass; summary=pass | downgrade_confidence |
| 16 | risk_fallback | `ai/ai-for-speech-emotion-recognition` | high | 2/3 (66.7%) | 2 | source=weak; claim=pass; summary=pass | downgrade_confidence |
| 17 | risk_fallback | `ai/audio-source-separation` | high | 2/3 (66.7%) | 2 | source=weak; claim=pass; summary=pass | downgrade_confidence |
| 18 | risk_fallback | `computer-science/broadcast-channel-api` | medium | 1/1 (100.0%) | 2 | source=pass; claim=pass; summary=pass | repair_sources |
| 19 | risk_fallback | `computer-science/css-flexbox` | medium | 1/1 (100.0%) | 2 | source=pass; claim=pass; summary=pass | repair_sources |
| 20 | risk_fallback | `computer-science/ethereum` | low | 2/2 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |

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

### 11. Climate Change

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

### 12. Theory of Relativity

- canonical slug: `science/theory-of-relativity`
- canonical URL: https://anchorfact.org/science/theory-of-relativity/
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

### 13. Public Speaking

- canonical slug: `self-improvement/public-speaking`
- canonical URL: https://anchorfact.org/self-improvement/public-speaking/
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

### 14. Basketball Fundamentals

- canonical slug: `sports/basketball-fundamentals`
- canonical URL: https://anchorfact.org/sports/basketball-fundamentals/
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

### 15. AI for Materials Science: GNoME, Crystal Discovery, and Materials Informatics

- canonical slug: `ai/ai-for-materials-science`
- canonical URL: https://anchorfact.org/ai/ai-for-materials-science/
- bucket: `risk_fallback`
- confidence: `high` (verified_sources, score 0.88)
- verified source coverage: 2/3 (66.7%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `downgrade_confidence`

### 16. AI for Speech Emotion Recognition: Vocal Biomarkers, Mental Health Screening, and Affective Computing

- canonical slug: `ai/ai-for-speech-emotion-recognition`
- canonical URL: https://anchorfact.org/ai/ai-for-speech-emotion-recognition/
- bucket: `risk_fallback`
- confidence: `high` (verified_sources, score 0.88)
- verified source coverage: 2/3 (66.7%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `downgrade_confidence`

### 17. Audio Source Separation: Demixing Speech, Music, and Environmental Sounds with Deep Learning

- canonical slug: `ai/audio-source-separation`
- canonical URL: https://anchorfact.org/ai/audio-source-separation/
- bucket: `risk_fallback`
- confidence: `high` (verified_sources, score 0.88)
- verified source coverage: 2/3 (66.7%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `downgrade_confidence`

### 18. Broadcast Channel API

- canonical slug: `computer-science/broadcast-channel-api`
- canonical URL: https://anchorfact.org/computer-science/broadcast-channel-api/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.745)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 19. CSS Flexbox

- canonical slug: `computer-science/css-flexbox`
- canonical URL: https://anchorfact.org/computer-science/css-flexbox/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.695)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 20. Ethereum

- canonical slug: `computer-science/ethereum`
- canonical URL: https://anchorfact.org/computer-science/ethereum/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.56)
- verified source coverage: 2/2 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
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
