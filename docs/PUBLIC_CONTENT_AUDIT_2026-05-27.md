# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T05:20:14.649Z

Snapshot: 555 public / 445 draft / 1568 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 1
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 10, downgrade_confidence: 0, repair_sources: 10, move_to_draft: 0

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
| 7 | medium_capped_claims | `ai/3d-human-modeling` | medium | 2/2 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 8 | medium_capped_claims | `ai/ai-content-moderation-platforms` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | medium_capped_claims | `ai/ai-digital-forensics` | medium | 2/2 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 10 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 14 | risk_fallback | `business/private-label-products` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 15 | risk_fallback | `game-development/game-ui-ux-design` | low | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | risk_fallback | `history/indian-independence-movement` | low | 2/3 (66.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | risk_fallback | `history/ming-dynasty` | low | 2/3 (66.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 18 | risk_fallback | `history/tang-dynasty` | low | 2/3 (66.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 19 | risk_fallback | `science/mars-exploration` | low | 1/1 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | risk_fallback | `self-improvement/emotional-intelligence` | low | 4/6 (66.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |

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

### 7. 3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars

- canonical slug: `ai/3d-human-modeling`
- canonical URL: https://anchorfact.org/ai/3d-human-modeling/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 2/2 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 8. AI Content Moderation Platforms: Large-Scale Safety Systems, Policy Engines, and Multilingual Review

- canonical slug: `ai/ai-content-moderation-platforms`
- canonical URL: https://anchorfact.org/ai/ai-content-moderation-platforms/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 9. AI for Digital Forensics: Deepfake Provenance, Evidence Authentication, and Digital Crime Investigation

- canonical slug: `ai/ai-digital-forensics`
- canonical URL: https://anchorfact.org/ai/ai-digital-forensics/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.79)
- verified source coverage: 2/2 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
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

### 14. Private Label Products

- canonical slug: `business/private-label-products`
- canonical URL: https://anchorfact.org/business/private-label-products/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.5)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources, generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 15. Game User Interface and UX Design

- canonical slug: `game-development/game-ui-ux-design`
- canonical URL: https://anchorfact.org/game-development/game-ui-ux-design/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.51)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 16. Indian Independence Movement

- canonical slug: `history/indian-independence-movement`
- canonical URL: https://anchorfact.org/history/indian-independence-movement/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 17. Ming Dynasty

- canonical slug: `history/ming-dynasty`
- canonical URL: https://anchorfact.org/history/ming-dynasty/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 18. Tang Dynasty

- canonical slug: `history/tang-dynasty`
- canonical URL: https://anchorfact.org/history/tang-dynasty/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 19. Mars Exploration

- canonical slug: `science/mars-exploration`
- canonical URL: https://anchorfact.org/science/mars-exploration/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.53)
- verified source coverage: 1/1 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 20. Emotional Intelligence

- canonical slug: `self-improvement/emotional-intelligence`
- canonical URL: https://anchorfact.org/self-improvement/emotional-intelligence/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 4/6 (66.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
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
