# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T11:08:02.956Z

Snapshot: 555 public / 445 draft / 1650 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 1
- Articles with at least one fail check: 0
- High-confidence samples needing review: 1
- Claim-evidence failures: 0
- Recommendations: keep_public: 10, downgrade_confidence: 1, repair_sources: 9, move_to_draft: 0

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
| 7 | medium_capped_claims | `ai/multi-agent-reinforcement-learning` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | medium_capped_claims | `ai/multimodal-search` | medium | 2/2 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 9 | medium_capped_claims | `ai/program-synthesis-verification` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 10 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 14 | risk_fallback | `computer-science/bun-runtime` | low | 3/5 (60.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | risk_fallback | `computer-science/eslint` | low | 2/4 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | risk_fallback | `computer-science/responsive-web-design` | low | 2/3 (66.7%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | risk_fallback | `computer-science/webassembly` | high | 4/8 (50.0%) | 2 | source=weak; claim=pass; summary=pass | downgrade_confidence |
| 18 | risk_fallback | `game-development/godot-engine` | low | 1/1 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | risk_fallback | `game-development/pathfinding-algorithms-in-games` | low | 1/1 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | risk_fallback | `game-development/real-time-strategy-rts-game-design` | low | 1/1 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |

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

### 7. Multi-Agent Reinforcement Learning: Cooperation, Competition, and Emergent Strategies

- canonical slug: `ai/multi-agent-reinforcement-learning`
- canonical URL: https://anchorfact.org/ai/multi-agent-reinforcement-learning/
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

### 8. Multimodal Search: Cross-Modal Retrieval, Product Search, and Multimodal Embeddings

- canonical slug: `ai/multimodal-search`
- canonical URL: https://anchorfact.org/ai/multimodal-search/
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

### 9. Program Synthesis and Formal Verification: Neural Theorem Proving with LLMs

- canonical slug: `ai/program-synthesis-verification`
- canonical URL: https://anchorfact.org/ai/program-synthesis-verification/
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

### 14. Bun Runtime

- canonical slug: `computer-science/bun-runtime`
- canonical URL: https://anchorfact.org/computer-science/bun-runtime/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 3/5 (60.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 15. ESLint

- canonical slug: `computer-science/eslint`
- canonical URL: https://anchorfact.org/computer-science/eslint/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/4 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 16. Responsive Web Design

- canonical slug: `computer-science/responsive-web-design`
- canonical URL: https://anchorfact.org/computer-science/responsive-web-design/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 17. WebAssembly (Wasm) 3.0

- canonical slug: `computer-science/webassembly`
- canonical URL: https://anchorfact.org/computer-science/webassembly/
- bucket: `risk_fallback`
- confidence: `high` (verified_sources, score 0.87)
- verified source coverage: 4/8 (50.0%)
- claims: 2 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `downgrade_confidence`

### 18. Godot Engine

- canonical slug: `game-development/godot-engine`
- canonical URL: https://anchorfact.org/game-development/godot-engine/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.53)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 19. Pathfinding Algorithms in Games

- canonical slug: `game-development/pathfinding-algorithms-in-games`
- canonical URL: https://anchorfact.org/game-development/pathfinding-algorithms-in-games/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.53)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 20. Real-Time Strategy (RTS) Game Design

- canonical slug: `game-development/real-time-strategy-rts-game-design`
- canonical URL: https://anchorfact.org/game-development/real-time-strategy-rts-game-design/
- bucket: `risk_fallback`
- confidence: `low` (verified_sources, score 0.53)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
