# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T02:03:07.011Z

Snapshot: 555 public / 445 draft / 1520 claims.

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
| 1 | low_verified_coverage | `sports/chess-strategy` | medium | 3/7 (42.9%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `history/mongol-empire` | low | 1/7 (14.3%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `history/ottoman-empire` | low | 1/6 (16.7%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `science/cell-structure` | low | 1/6 (16.7%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `science/continental-drift` | low | 1/6 (16.7%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `science/quantum-mechanics` | low | 1/6 (16.7%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `business/negotiation-skills` | low | 1/5 (20.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `computer-science/graph-bfs-dfs` | low | 1/5 (20.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/neural-architecture-search` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/neural-rendering` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/neurosymbolic-ai` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/nlp-advanced-techniques` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 18 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 19 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 20 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |

## Article Findings

### 1. Chess Strategy

- canonical slug: `sports/chess-strategy`
- canonical URL: https://anchorfact.org/sports/chess-strategy/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 3/7 (42.9%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 2. Mongol Empire

- canonical slug: `history/mongol-empire`
- canonical URL: https://anchorfact.org/history/mongol-empire/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/7 (14.3%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 3. Ottoman Empire

- canonical slug: `history/ottoman-empire`
- canonical URL: https://anchorfact.org/history/ottoman-empire/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 4. Cell Structure

- canonical slug: `science/cell-structure`
- canonical URL: https://anchorfact.org/science/cell-structure/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 5. Continental Drift

- canonical slug: `science/continental-drift`
- canonical URL: https://anchorfact.org/science/continental-drift/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 6. Quantum Mechanics

- canonical slug: `science/quantum-mechanics`
- canonical URL: https://anchorfact.org/science/quantum-mechanics/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/6 (16.7%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 7. Negotiation Skills

- canonical slug: `business/negotiation-skills`
- canonical URL: https://anchorfact.org/business/negotiation-skills/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.495)
- verified source coverage: 1/5 (20.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 8. Graph & BFS/DFS

- canonical slug: `computer-science/graph-bfs-dfs`
- canonical URL: https://anchorfact.org/computer-science/graph-bfs-dfs/
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

### 13. Neural Architecture Search: Automated Design of Deep Neural Networks

- canonical slug: `ai/neural-architecture-search`
- canonical URL: https://anchorfact.org/ai/neural-architecture-search/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 14. Neural Rendering: NeRF, View Synthesis, and Implicit Scene Representations

- canonical slug: `ai/neural-rendering`
- canonical URL: https://anchorfact.org/ai/neural-rendering/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.73)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, duplicate_sources
- recommendation: `repair_sources`

### 15. Neuro-Symbolic AI: Bridging Learning and Reasoning

- canonical slug: `ai/neurosymbolic-ai`
- canonical URL: https://anchorfact.org/ai/neurosymbolic-ai/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.73)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 16. Advanced NLP: Tokenization, Embeddings, and Decoding

- canonical slug: `ai/nlp-advanced-techniques`
- canonical URL: https://anchorfact.org/ai/nlp-advanced-techniques/
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
