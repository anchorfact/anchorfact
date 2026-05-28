# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T10:51:03.975Z

Snapshot: 555 public / 445 draft / 1630 claims.

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
| 7 | medium_capped_claims | `ai/concept-based-explainability` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | medium_capped_claims | `ai/continual-learning` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | medium_capped_claims | `ai/conversational-ai-systems` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 10 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 14 | risk_fallback | `ai/few-shot-learning` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | risk_fallback | `ai/geometric-deep-learning` | medium | 2/2 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | risk_fallback | `ai/learned-database-systems` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | risk_fallback | `ai/machine-translation` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 18 | risk_fallback | `ai/mlops-llmops` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 19 | risk_fallback | `ai/protein-structure-prediction` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 20 | risk_fallback | `ai/recommender-systems` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |

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

### 7. Concept-Based Explainability: TCAV and Concept Bottleneck Models

- canonical slug: `ai/concept-based-explainability`
- canonical URL: https://anchorfact.org/ai/concept-based-explainability/
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

### 8. Continual Learning and Catastrophic Forgetting: EWC to MESU

- canonical slug: `ai/continual-learning`
- canonical URL: https://anchorfact.org/ai/continual-learning/
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

### 9. Conversational AI: Task-Oriented Dialogue and Open-Domain Chatbots

- canonical slug: `ai/conversational-ai-systems`
- canonical URL: https://anchorfact.org/ai/conversational-ai-systems/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.73)
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

### 14. Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation

- canonical slug: `ai/few-shot-learning`
- canonical URL: https://anchorfact.org/ai/few-shot-learning/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.69)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources
- recommendation: `repair_sources`

### 15. Geometric Deep Learning: Group Equivariance and Symmetry

- canonical slug: `ai/geometric-deep-learning`
- canonical URL: https://anchorfact.org/ai/geometric-deep-learning/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.78)
- verified source coverage: 2/2 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 16. Learned Database Systems: AI-Driven Query Optimization, Learned Indexes, and Cardinality Estimation

- canonical slug: `ai/learned-database-systems`
- canonical URL: https://anchorfact.org/ai/learned-database-systems/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.85)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 17. Machine Translation: Neural MT, LLM-Based Translation, and Multilingual Quality at Scale

- canonical slug: `ai/machine-translation`
- canonical URL: https://anchorfact.org/ai/machine-translation/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.85)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 18. MLOps and LLMOps: Production AI Engineering, Observability, and Platform Architecture

- canonical slug: `ai/mlops-llmops`
- canonical URL: https://anchorfact.org/ai/mlops-llmops/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.85)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 19. Protein Structure Prediction: AlphaFold, RoseTTAFold, and AI-Driven Structural Biology

- canonical slug: `ai/protein-structure-prediction`
- canonical URL: https://anchorfact.org/ai/protein-structure-prediction/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.85)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 20. Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation

- canonical slug: `ai/recommender-systems`
- canonical URL: https://anchorfact.org/ai/recommender-systems/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.85)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
