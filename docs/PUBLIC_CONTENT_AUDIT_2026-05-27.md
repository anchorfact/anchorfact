# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T04:05:33.207Z

Snapshot: 555 public / 445 draft / 1567 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 8
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 9, downgrade_confidence: 0, repair_sources: 11, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `computer-science/graphql-schema-design` | medium | 2/7 (28.6%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `computer-science/css` | medium | 2/6 (33.3%) | 2 | source=weak; claim=pass; summary=pass | repair_sources |
| 3 | low_verified_coverage | `computer-science/dart-language` | medium | 2/5 (40.0%) | 2 | source=weak; claim=pass; summary=pass | repair_sources |
| 4 | low_verified_coverage | `computer-science/dijkstra-s-algorithm` | medium | 2/5 (40.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `game-development/shader-programming` | low | 1/3 (33.3%) | 1 | source=weak; claim=weak; summary=weak | repair_sources |
| 6 | low_verified_coverage | `arts/digital-art-history` | low | 2/5 (40.0%) | 1 | source=weak; claim=weak; summary=weak | repair_sources |
| 7 | low_verified_coverage | `arts/photography-fundamentals` | low | 2/5 (40.0%) | 1 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `computer-science/sql` | medium | 2/6 (33.3%) | 1 | source=weak; claim=pass; summary=pass | keep_public |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `science/coral-reefs` | medium | 3/6 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `science/geological-time` | medium | 3/6 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `science/newton-s-laws-of-motion` | medium | 3/3 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `science/ocean-life` | medium | 3/3 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 18 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 19 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 20 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |

## Article Findings

### 1. GraphQL Schema Design

- canonical slug: `computer-science/graphql-schema-design`
- canonical URL: https://anchorfact.org/computer-science/graphql-schema-design/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 2/7 (28.6%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 2. CSS (Cascading Style Sheets)

- canonical slug: `computer-science/css`
- canonical URL: https://anchorfact.org/computer-science/css/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 2/6 (33.3%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 3. Dart Language

- canonical slug: `computer-science/dart-language`
- canonical URL: https://anchorfact.org/computer-science/dart-language/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 2/5 (40.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 4. Dijkstra's Algorithm

- canonical slug: `computer-science/dijkstra-s-algorithm`
- canonical URL: https://anchorfact.org/computer-science/dijkstra-s-algorithm/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/5 (40.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 5. Shader Programming Fundamentals

- canonical slug: `game-development/shader-programming`
- canonical URL: https://anchorfact.org/game-development/shader-programming/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.465)
- verified source coverage: 1/3 (33.3%)
- claims: 1 total, 1 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `weak`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 6. Digital Art and New Media Art History

- canonical slug: `arts/digital-art-history`
- canonical URL: https://anchorfact.org/arts/digital-art-history/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 1 total, 1 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `weak`
- hygiene flags: none
- recommendation: `repair_sources`

### 7. Photography Fundamentals and Composition

- canonical slug: `arts/photography-fundamentals`
- canonical URL: https://anchorfact.org/arts/photography-fundamentals/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 1 total, 1 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 8. SQL (Structured Query Language)

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

### 13. Coral Reefs

- canonical slug: `science/coral-reefs`
- canonical URL: https://anchorfact.org/science/coral-reefs/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.76)
- verified source coverage: 3/6 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 14. Geological Time Scale and Earth History

- canonical slug: `science/geological-time`
- canonical URL: https://anchorfact.org/science/geological-time/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.795)
- verified source coverage: 3/6 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 15. Newton's Laws of Motion

- canonical slug: `science/newton-s-laws-of-motion`
- canonical URL: https://anchorfact.org/science/newton-s-laws-of-motion/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.83)
- verified source coverage: 3/3 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 16. Ocean Life

- canonical slug: `science/ocean-life`
- canonical URL: https://anchorfact.org/science/ocean-life/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.83)
- verified source coverage: 3/3 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
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
