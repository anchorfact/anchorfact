# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T00:46:15.839Z

Snapshot: 555 public / 445 draft / 1540 claims.

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
| 1 | low_verified_coverage | `history/cold-war` | medium | 2/7 (28.6%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 2 | low_verified_coverage | `science/molecular-biology-central-dogma` | medium | 2/7 (28.6%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 3 | low_verified_coverage | `science/neuroscience-brain-plasticity` | low | 2/7 (28.6%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 4 | low_verified_coverage | `ai/autoencoders` | medium | 2/6 (33.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 5 | low_verified_coverage | `ai/backpropagation` | medium | 1/3 (33.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 6 | low_verified_coverage | `ai/llm-inference-optimization` | medium | 1/3 (33.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 7 | low_verified_coverage | `ai/world-models-video-prediction` | medium | 1/3 (33.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | low_verified_coverage | `arts/aesthetics` | low | 2/6 (33.3%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | medium_capped_claims | `ai/contrastive-learning` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 14 | medium_capped_claims | `ai/distributed-training-systems` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | medium_capped_claims | `ai/dropout-and-regularization` | medium | 2/2 (100.0%) | 3 | source=pass; claim=weak; summary=pass | repair_sources |
| 16 | medium_capped_claims | `ai/edge-ai-and-tinyml` | medium | 1/2 (50.0%) | 3 | source=weak; claim=weak; summary=pass | repair_sources |
| 17 | low_confidence_public | `history/mayan-civilization` | low | 2/3 (66.7%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 18 | low_confidence_public | `history/meiji-restoration` | low | 2/3 (66.7%) | 5 | source=weak; claim=weak; summary=pass | repair_sources |
| 19 | low_confidence_public | `history/napoleonic-era` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |
| 20 | low_confidence_public | `history/renaissance` | low | 1/1 (100.0%) | 5 | source=pass; claim=weak; summary=pass | repair_sources |

## Article Findings

### 1. Cold War

- canonical slug: `history/cold-war`
- canonical URL: https://anchorfact.org/history/cold-war/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/7 (28.6%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 2. Molecular Biology: The Central Dogma

- canonical slug: `science/molecular-biology-central-dogma`
- canonical URL: https://anchorfact.org/science/molecular-biology-central-dogma/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.87)
- verified source coverage: 2/7 (28.6%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage, high_confidence_evidence_gap
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 3. Neuroscience: Neuroplasticity and Brain Function

- canonical slug: `science/neuroscience-brain-plasticity`
- canonical URL: https://anchorfact.org/science/neuroscience-brain-plasticity/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/7 (28.6%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 4. Autoencoders

- canonical slug: `ai/autoencoders`
- canonical URL: https://anchorfact.org/ai/autoencoders/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.685)
- verified source coverage: 2/6 (33.3%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, generic_dispute_statement
- recommendation: `repair_sources`

### 5. Backpropagation: The Engine of Neural Network Learning

- canonical slug: `ai/backpropagation`
- canonical URL: https://anchorfact.org/ai/backpropagation/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.685)
- verified source coverage: 1/3 (33.3%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 6. LLM Inference Optimization: From FlashAttention to Speculative Decoding

- canonical slug: `ai/llm-inference-optimization`
- canonical URL: https://anchorfact.org/ai/llm-inference-optimization/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.685)
- verified source coverage: 1/3 (33.3%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 7. World Models: Video Prediction, Physical Reasoning, and Interactive AI

- canonical slug: `ai/world-models-video-prediction`
- canonical URL: https://anchorfact.org/ai/world-models-video-prediction/
- bucket: `low_verified_coverage`
- confidence: `medium` (verified_sources, score 0.705)
- verified source coverage: 1/3 (33.3%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification, low_verified_coverage
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 8. Aesthetics

- canonical slug: `arts/aesthetics`
- canonical URL: https://anchorfact.org/arts/aesthetics/
- bucket: `low_verified_coverage`
- confidence: `low` (verified_sources, score 0.475)
- verified source coverage: 2/6 (33.3%)
- claims: 3 total, 3 capped, 0 missing evidence
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

### 13. Contrastive Learning: SimCLR, MoCo, and CLIP

- canonical slug: `ai/contrastive-learning`
- canonical URL: https://anchorfact.org/ai/contrastive-learning/
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

### 14. Distributed Training: FSDP, DeepSpeed, and Scaling Laws

- canonical slug: `ai/distributed-training-systems`
- canonical URL: https://anchorfact.org/ai/distributed-training-systems/
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

### 15. Dropout and Regularization Techniques

- canonical slug: `ai/dropout-and-regularization`
- canonical URL: https://anchorfact.org/ai/dropout-and-regularization/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.7)
- verified source coverage: 2/2 (100.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: generic_source_homepage, claim_evidence_weak
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, duplicate_sources, generic_source_homepage
- recommendation: `repair_sources`

### 16. Edge AI and TinyML: Intelligence at the Edge

- canonical slug: `ai/edge-ai-and-tinyml`
- canonical URL: https://anchorfact.org/ai/edge-ai-and-tinyml/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.67)
- verified source coverage: 1/2 (50.0%)
- claims: 3 total, 3 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak, duplicate_sources
- recommendation: `repair_sources`

### 17. Mayan Civilization

- canonical slug: `history/mayan-civilization`
- canonical URL: https://anchorfact.org/history/mayan-civilization/
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

### 18. Meiji Restoration

- canonical slug: `history/meiji-restoration`
- canonical URL: https://anchorfact.org/history/meiji-restoration/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.55)
- verified source coverage: 2/3 (66.7%)
- claims: 5 total, 5 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 19. Napoleonic Era

- canonical slug: `history/napoleonic-era`
- canonical URL: https://anchorfact.org/history/napoleonic-era/
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

### 20. Renaissance

- canonical slug: `history/renaissance`
- canonical URL: https://anchorfact.org/history/renaissance/
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
