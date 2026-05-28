# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T01:55:22.380Z

Snapshot: 555 public / 445 draft / 1524 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 8
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 6, downgrade_confidence: 0, repair_sources: 14, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | low_verified_coverage | `sports/swimming-training` | medium | 2/6 (33.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `history/american-revolution` | low | 3/8 (37.5%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `health/yoga-practice` | low | 2/5 (40.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `history/world-war-ii` | low | 2/5 (40.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `self-improvement/focus-techniques` | medium | 4/10 (40.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `science/big-bang-theory` | medium | 3/7 (42.9%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `science/data-science-fundamentals` | low | 3/7 (42.9%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `self-improvement/communication-skills` | medium | 1/9 (11.1%) | 3 | source=weak; claim=pass; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/latent-diffusion-models` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/lora` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/loss-functions` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/multi-modal-learning` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `self-improvement/productivity-systems` | low | 2/2 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `sports/marathon-running` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 20 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |

## Article Findings

### 1. Swimming Training and Stroke Techniques

- canonical slug: `sports/swimming-training`
- canonical URL: https://anchorfact.org/sports/swimming-training/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.705)
- verified source coverage: 2/6 (33.3%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 2. American Revolution

- canonical slug: `history/american-revolution`
- canonical URL: https://anchorfact.org/history/american-revolution/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 3/8 (37.5%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 3. Yoga Practice

- canonical slug: `health/yoga-practice`
- canonical URL: https://anchorfact.org/health/yoga-practice/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 4. World War II

- canonical slug: `history/world-war-ii`
- canonical URL: https://anchorfact.org/history/world-war-ii/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/5 (40.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 5. Focus and Concentration Techniques

- canonical slug: `self-improvement/focus-techniques`
- canonical URL: https://anchorfact.org/self-improvement/focus-techniques/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.705)
- verified source coverage: 4/10 (40.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 6. Big Bang Theory

- canonical slug: `science/big-bang-theory`
- canonical URL: https://anchorfact.org/science/big-bang-theory/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 3/7 (42.9%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 7. Data Science: Methods, Tools, and Best Practices

- canonical slug: `science/data-science-fundamentals`
- canonical URL: https://anchorfact.org/science/data-science-fundamentals/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 3/7 (42.9%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 8. Communication Skills

- canonical slug: `self-improvement/communication-skills`
- canonical URL: https://anchorfact.org/self-improvement/communication-skills/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.685)
- verified source coverage: 1/9 (11.1%)
- claims: 3 total, 0 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `pass`
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

### 13. Diffusion Models in Depth: From DDPM to Stable Diffusion

- canonical slug: `ai/latent-diffusion-models`
- canonical URL: https://anchorfact.org/ai/latent-diffusion-models/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.69)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: duplicate_sources
- recommendation: `repair_sources`

### 14. LoRA (Low-Rank Adaptation)

- canonical slug: `ai/lora`
- canonical URL: https://anchorfact.org/ai/lora/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.725)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement
- recommendation: `repair_sources`

### 15. Loss Functions in Machine Learning

- canonical slug: `ai/loss-functions`
- canonical URL: https://anchorfact.org/ai/loss-functions/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.67)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, duplicate_sources, generic_source_homepage
- recommendation: `repair_sources`

### 16. Multi-Modal Machine Learning

- canonical slug: `ai/multi-modal-learning`
- canonical URL: https://anchorfact.org/ai/multi-modal-learning/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.71)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 17. Productivity Systems

- canonical slug: `self-improvement/productivity-systems`
- canonical URL: https://anchorfact.org/self-improvement/productivity-systems/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.51)
- verified source coverage: 2/2 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 18. Marathon Running

- canonical slug: `sports/marathon-running`
- canonical URL: https://anchorfact.org/sports/marathon-running/
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

### 19. Film Genres

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

### 20. World Literature

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

## Rule Calibration

- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.
- Keep the current high-confidence rule, while continuing spot checks.
- Keep exporting claims with confidence caps, but continue auditing weak evidence.

## Next Manual Review

For each article marked `repair_sources` or `move_to_draft`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
