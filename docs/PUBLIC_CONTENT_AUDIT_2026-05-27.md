# AnchorFact Public Content Audit - 2026-05-27

Generated: 2026-05-27T23:59:09.070Z

Snapshot: 555 public / 445 draft / 1548 claims.

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
| 1 | low_verified_coverage | `arts/political-philosophy` | low | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `business/economics-fundamentals` | medium | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `business/strategic-management-theory` | low | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `geography/desert-ecosystems` | medium | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `history/ancient-mesopotamia` | low | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `history/world-war-ii-overview` | low | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `science/astronomy-and-cosmology` | low | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `science/environmental-science` | low | 1/4 (25.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `computer-science/c-language` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/affective-computing` | high | 2/2 (100.0%) | 2 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/ai-in-healthcare` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/ai-red-teaming-and-safety` | medium | 2/3 (66.7%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/ai-training-data-curation` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/ai-video-generation` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `geography/ocean-currents` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `geography/oceania-geography` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `geography/south-america-geography` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `history/enlightenment-era` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |

## Article Findings

### 1. Political Philosophy: Justice, Liberty, and the Social Contract

- canonical slug: `arts/political-philosophy`
- canonical URL: https://anchorfact.org/arts/political-philosophy/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 2. Economics: Supply, Demand, and Market Equilibrium

- canonical slug: `business/economics-fundamentals`
- canonical URL: https://anchorfact.org/business/economics-fundamentals/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.675)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 3. Strategic Management: Frameworks and Practice

- canonical slug: `business/strategic-management-theory`
- canonical URL: https://anchorfact.org/business/strategic-management-theory/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 4. Desert Ecosystems and Adaptations

- canonical slug: `geography/desert-ecosystems`
- canonical URL: https://anchorfact.org/geography/desert-ecosystems/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.86)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 5. Ancient Mesopotamia: Cradle of Civilization

- canonical slug: `history/ancient-mesopotamia`
- canonical URL: https://anchorfact.org/history/ancient-mesopotamia/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 6. World War II: Global Conflict and Its Aftermath

- canonical slug: `history/world-war-ii-overview`
- canonical URL: https://anchorfact.org/history/world-war-ii-overview/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 7. Astronomy and Cosmology: From Solar System to the Universe

- canonical slug: `science/astronomy-and-cosmology`
- canonical URL: https://anchorfact.org/science/astronomy-and-cosmology/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.465)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_source_homepage
- recommendation: `repair_sources`

### 8. Environmental Science: Ecosystems and Global Change

- canonical slug: `science/environmental-science`
- canonical URL: https://anchorfact.org/science/environmental-science/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.465)
- verified source coverage: 1/4 (25.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
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

### 13. AI in Healthcare: Diagnostics, Drug Discovery, and Robotics

- canonical slug: `ai/ai-in-healthcare`
- canonical URL: https://anchorfact.org/ai/ai-in-healthcare/
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

### 14. AI Red Teaming: Security Testing for Language Models

- canonical slug: `ai/ai-red-teaming-and-safety`
- canonical URL: https://anchorfact.org/ai/ai-red-teaming-and-safety/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.795)
- verified source coverage: 2/3 (66.7%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 15. AI Training Data Curation: Quality at Scale

- canonical slug: `ai/ai-training-data-curation`
- canonical URL: https://anchorfact.org/ai/ai-training-data-curation/
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

### 16. AI Video Generation: Sora, Veo, and the Future of Synthetic Media

- canonical slug: `ai/ai-video-generation`
- canonical URL: https://anchorfact.org/ai/ai-video-generation/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 17. Ocean Currents

- canonical slug: `geography/ocean-currents`
- canonical URL: https://anchorfact.org/geography/ocean-currents/
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

### 18. Oceania Geography

- canonical slug: `geography/oceania-geography`
- canonical URL: https://anchorfact.org/geography/oceania-geography/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.43)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 19. South America Geography

- canonical slug: `geography/south-america-geography`
- canonical URL: https://anchorfact.org/geography/south-america-geography/
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

### 20. Enlightenment Era

- canonical slug: `history/enlightenment-era`
- canonical URL: https://anchorfact.org/history/enlightenment-era/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.47)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
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
