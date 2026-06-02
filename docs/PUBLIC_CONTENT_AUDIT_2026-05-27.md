# AnchorFact Public Content Audit - 2026-06-02

Generated: 2026-06-02T01:29:31.615Z

Snapshot: 724 public / 300 draft / 2319 claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: 20
- Low verified coverage samples: 0
- Articles with at least one fail check: 0
- High-confidence samples needing review: 0
- Claim-evidence failures: 0
- Recommendations: keep_public: 20, downgrade_confidence: 0, repair_sources: 0, move_to_draft: 0

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

| # | bucket | slug | confidence | coverage | claims | checks | recommendation |
|---:|---|---|---|---:|---:|---|---|
| 1 | high_confidence | `ai/gpt-models` | high | 4/4 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 2 | high_confidence | `ai/agentic-ai` | high | 2/2 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 3 | high_confidence | `ai/ai-in-healthcare` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 4 | high_confidence | `ai/ai-red-teaming-and-safety` | high | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 5 | medium_capped_claims | `business/strategic-management-theory` | medium | 3/3 (100.0%) | 3 | source=pass; claim=pass; summary=pass | keep_public |
| 6 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 7 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 8 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 9 | low_confidence_public | `health/strength-training` | low | 1/1 (100.0%) | 4 | source=pass; claim=pass; summary=pass | keep_public |
| 10 | risk_fallback | `game-development/agent-tools` | medium | 5/5 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | risk_fallback | `science/plate-tectonics` | medium | 2/2 (100.0%) | 6 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | risk_fallback | `ai/ai-for-art-and-creativity-gans-diffusion-and-computational-aesthetics` | medium | 5/5 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | risk_fallback | `ai/ai-for-audio-processing-speech-recognition-music-generation-and-sound-understanding` | medium | 4/4 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 14 | risk_fallback | `ai/ai-for-augmented-reality-real-time-object-detection-depth-estimation-and-scene-understanding` | medium | 5/5 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 15 | risk_fallback | `ai/diffusion-models-ddpm-stable-diffusion-and-score-based-generative-modeling` | medium | 3/3 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 16 | risk_fallback | `ai/gradient-descent` | medium | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 17 | risk_fallback | `ai/large-language-model-training-scaling-laws-data-curation-and-compute` | medium | 3/3 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 18 | risk_fallback | `ai/multimodal-ai-vision-language-models-from-clip-to-gpt-4v` | medium | 3/3 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 19 | risk_fallback | `ai/nerf-neural-radiance-fields-for-view-synthesis` | medium | 4/4 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 20 | risk_fallback | `ai/reinforcement-learning` | medium | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |

## Article Findings

### 1. GPT (Generative Pre-trained Transformer) Model Family

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

### 2. Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning

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

### 3. AI in Healthcare: Diagnostics, Drug Discovery, and Robotics

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

### 4. AI Red Teaming: Security Testing for Language Models

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

### 5. Strategic Management: Frameworks and Practice

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

### 6. Film Genres

- canonical slug: `arts/film-genres`
- canonical URL: https://anchorfact.org/arts/film-genres/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.575)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 7. Age of Exploration

- canonical slug: `history/age-of-exploration`
- canonical URL: https://anchorfact.org/history/age-of-exploration/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.555)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 8. Byzantine Empire

- canonical slug: `history/byzantine-empire`
- canonical URL: https://anchorfact.org/history/byzantine-empire/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.555)
- verified source coverage: 1/1 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 9. Strength Training

- canonical slug: `health/strength-training`
- canonical URL: https://anchorfact.org/health/strength-training/
- bucket: `low_confidence_public`
- confidence: `low` (verified_sources, score 0.555)
- verified source coverage: 1/1 (100.0%)
- claims: 4 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 10. AI Agent Tools for Game Development

- canonical slug: `game-development/agent-tools`
- canonical URL: https://anchorfact.org/game-development/agent-tools/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.865)
- verified source coverage: 5/5 (100.0%)
- claims: 6 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 11. Plate Tectonics

- canonical slug: `science/plate-tectonics`
- canonical URL: https://anchorfact.org/science/plate-tectonics/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.82)
- verified source coverage: 2/2 (100.0%)
- claims: 6 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 12. AI for Art and Creativity: GANs, Diffusion, and Computational Aesthetics

- canonical slug: `ai/ai-for-art-and-creativity-gans-diffusion-and-computational-aesthetics`
- canonical URL: https://anchorfact.org/ai/ai-for-art-and-creativity-gans-diffusion-and-computational-aesthetics/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.855)
- verified source coverage: 5/5 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 13. AI for Audio Processing: Speech Recognition, Music Generation, and Sound Understanding

- canonical slug: `ai/ai-for-audio-processing-speech-recognition-music-generation-and-sound-understanding`
- canonical URL: https://anchorfact.org/ai/ai-for-audio-processing-speech-recognition-music-generation-and-sound-understanding/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.82)
- verified source coverage: 4/4 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 14. AI for Augmented Reality: Real-Time Object Detection, Depth Estimation, and Scene Understanding

- canonical slug: `ai/ai-for-augmented-reality-real-time-object-detection-depth-estimation-and-scene-understanding`
- canonical URL: https://anchorfact.org/ai/ai-for-augmented-reality-real-time-object-detection-depth-estimation-and-scene-understanding/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.83)
- verified source coverage: 5/5 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 15. Diffusion Models: DDPM, Stable Diffusion, and Score-Based Generative Modeling

- canonical slug: `ai/diffusion-models-ddpm-stable-diffusion-and-score-based-generative-modeling`
- canonical URL: https://anchorfact.org/ai/diffusion-models-ddpm-stable-diffusion-and-score-based-generative-modeling/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.8)
- verified source coverage: 3/3 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 16. Gradient Descent and Optimization

- canonical slug: `ai/gradient-descent`
- canonical URL: https://anchorfact.org/ai/gradient-descent/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.72)
- verified source coverage: 2/2 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 17. Large Language Model Training: Scaling Laws, Data Curation, and Compute

- canonical slug: `ai/large-language-model-training-scaling-laws-data-curation-and-compute`
- canonical URL: https://anchorfact.org/ai/large-language-model-training-scaling-laws-data-curation-and-compute/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.8)
- verified source coverage: 3/3 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 18. Multimodal AI: Vision-Language Models from CLIP to GPT-4V

- canonical slug: `ai/multimodal-ai-vision-language-models-from-clip-to-gpt-4v`
- canonical URL: https://anchorfact.org/ai/multimodal-ai-vision-language-models-from-clip-to-gpt-4v/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.82)
- verified source coverage: 3/3 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 19. NeRF: Neural Radiance Fields for View Synthesis

- canonical slug: `ai/nerf-neural-radiance-fields-for-view-synthesis`
- canonical URL: https://anchorfact.org/ai/nerf-neural-radiance-fields-for-view-synthesis/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.82)
- verified source coverage: 4/4 (100.0%)
- claims: 5 total, 0 capped, 0 missing evidence
- quality reasons: none
- source-title match: `pass`
- claim-evidence match: `pass`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `keep_public`

### 20. Reinforcement Learning

- canonical slug: `ai/reinforcement-learning`
- canonical URL: https://anchorfact.org/ai/reinforcement-learning/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.72)
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
