# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T02:21:07.189Z

Snapshot: 555 public / 445 draft / 1543 claims.

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
| 1 | low_verified_coverage | `computer-science/docker-compose` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `computer-science/express-js` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `computer-science/fastapi` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `computer-science/flask` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `computer-science/helm` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `computer-science/julia-language` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `computer-science/monitoring-and-observability` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `computer-science/progressive-web-apps-pwa` | low | 1/3 (33.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `arts/western-ethics-tradition` | medium | 3/4 (75.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `business/marketing-fundamentals` | medium | 3/3 (100.0%) | 3 | source=pass; claim=weak; summary=weak | repair_sources |
| 15 | medium_capped_claims | `computer-science/cybersecurity-fundamentals` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `game-development/game-audio-systems` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 18 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 19 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 20 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |

## Article Findings

### 1. Docker Compose

- canonical slug: `computer-science/docker-compose`
- canonical URL: https://anchorfact.org/computer-science/docker-compose/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 2. Express.js

- canonical slug: `computer-science/express-js`
- canonical URL: https://anchorfact.org/computer-science/express-js/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 3. FastAPI

- canonical slug: `computer-science/fastapi`
- canonical URL: https://anchorfact.org/computer-science/fastapi/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 4. Flask

- canonical slug: `computer-science/flask`
- canonical URL: https://anchorfact.org/computer-science/flask/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 5. Helm

- canonical slug: `computer-science/helm`
- canonical URL: https://anchorfact.org/computer-science/helm/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 6. Julia Language

- canonical slug: `computer-science/julia-language`
- canonical URL: https://anchorfact.org/computer-science/julia-language/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 7. Monitoring and Observability

- canonical slug: `computer-science/monitoring-and-observability`
- canonical URL: https://anchorfact.org/computer-science/monitoring-and-observability/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 8. Progressive Web Apps (PWA)

- canonical slug: `computer-science/progressive-web-apps-pwa`
- canonical URL: https://anchorfact.org/computer-science/progressive-web-apps-pwa/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.495)
- verified source coverage: 1/3 (33.3%)
- claims: 2 total, 2 capped, 0 missing evidence
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

### 13. Western Ethical Tradition: Aristotle, Kant, and Utilitarianism

- canonical slug: `arts/western-ethics-tradition`
- canonical URL: https://anchorfact.org/arts/western-ethics-tradition/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.6)
- verified source coverage: 3/4 (75.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 14. Marketing: Strategy, Consumer Behavior, and Digital Channels

- canonical slug: `business/marketing-fundamentals`
- canonical URL: https://anchorfact.org/business/marketing-fundamentals/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.8)
- verified source coverage: 3/3 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `weak`
- hygiene flags: none
- recommendation: `repair_sources`

### 15. Cybersecurity: Threats, Cryptography, and Defense

- canonical slug: `computer-science/cybersecurity-fundamentals`
- canonical URL: https://anchorfact.org/computer-science/cybersecurity-fundamentals/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.755)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 16. Game Audio Systems and Sound Design

- canonical slug: `game-development/game-audio-systems`
- canonical URL: https://anchorfact.org/game-development/game-audio-systems/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
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
