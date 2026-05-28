# AnchorFact Public Content Audit - 2026-05-28

Generated: 2026-05-28T09:20:47.331Z

Snapshot: 555 public / 445 draft / 1585 claims.

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
| 7 | medium_capped_claims | `ai/ai-for-medical-imaging` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 8 | medium_capped_claims | `ai/ai-for-network-security` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 9 | medium_capped_claims | `ai/ai-for-oil-gas-exploration` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 10 | low_confidence_public | `arts/film-genres` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 11 | low_confidence_public | `arts/world-literature` | low | 2/2 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 12 | low_confidence_public | `history/age-of-exploration` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 13 | low_confidence_public | `history/byzantine-empire` | low | 1/1 (100.0%) | 5 | source=pass; claim=pass; summary=pass | keep_public |
| 14 | risk_fallback | `ai/ai-smart-contract-audit` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 15 | risk_fallback | `ai/cognitive-architectures` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 16 | risk_fallback | `ai/convolutional-neural-networks-cnn` | medium | 1/1 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |
| 17 | risk_fallback | `ai/data-centric-ai` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 18 | risk_fallback | `ai/human-computer-interaction` | medium | 1/2 (50.0%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 19 | risk_fallback | `ai/semantic-web-ontology` | medium | 2/3 (66.7%) | 2 | source=weak; claim=weak; summary=pass | repair_sources |
| 20 | risk_fallback | `ai/transfer-learning` | medium | 1/1 (100.0%) | 2 | source=pass; claim=weak; summary=pass | repair_sources |

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

### 7. AI for Medical Imaging: Radiology AI, Computer-Aided Diagnosis, and Clinical Deployment

- canonical slug: `ai/ai-for-medical-imaging`
- canonical URL: https://anchorfact.org/ai/ai-for-medical-imaging/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.765)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: none
- recommendation: `repair_sources`

### 8. AI for Network Security: Intelligent Firewalls, DDoS Mitigation, and Zero-Trust Architectures

- canonical slug: `ai/ai-for-network-security`
- canonical URL: https://anchorfact.org/ai/ai-for-network-security/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 9. AI for Oil and Gas Exploration: Seismic Interpretation, Reservoir Characterization, and Subsurface Intelligence

- canonical slug: `ai/ai-for-oil-gas-exploration`
- canonical URL: https://anchorfact.org/ai/ai-for-oil-gas-exploration/
- bucket: `medium_capped_claims`
- confidence: `medium` (verified_sources, score 0.85)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: partial_source_verification, high_confidence_evidence_gap
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

### 14. AI Smart Contract Auditing: Vulnerability Detection, Formal Verification, and Blockchain Security

- canonical slug: `ai/ai-smart-contract-audit`
- canonical URL: https://anchorfact.org/ai/ai-smart-contract-audit/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 15. Cognitive Architectures: ACT-R, Soar, and Computational Models of Human-Like Reasoning

- canonical slug: `ai/cognitive-architectures`
- canonical URL: https://anchorfact.org/ai/cognitive-architectures/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 16. Convolutional Neural Networks (CNN)

- canonical slug: `ai/convolutional-neural-networks-cnn`
- canonical URL: https://anchorfact.org/ai/convolutional-neural-networks-cnn/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.7)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_dispute_statement, generic_source_homepage
- recommendation: `repair_sources`

### 17. Data-Centric AI: The Systematic Engineering of Training Data

- canonical slug: `ai/data-centric-ai`
- canonical URL: https://anchorfact.org/ai/data-centric-ai/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 18. Human-Computer Interaction: AI-Powered UX, Generative Interfaces, and Usability Testing

- canonical slug: `ai/human-computer-interaction`
- canonical URL: https://anchorfact.org/ai/human-computer-interaction/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.74)
- verified source coverage: 1/2 (50.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: generic_source_homepage
- recommendation: `repair_sources`

### 19. Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data

- canonical slug: `ai/semantic-web-ontology`
- canonical URL: https://anchorfact.org/ai/semantic-web-ontology/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.785)
- verified source coverage: 2/3 (66.7%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: claim_evidence_weak, partial_source_verification
- source-title match: `weak`
- claim-evidence match: `weak`
- title-summary accuracy: `pass`
- hygiene flags: claim_evidence_weak
- recommendation: `repair_sources`

### 20. Transfer Learning

- canonical slug: `ai/transfer-learning`
- canonical URL: https://anchorfact.org/ai/transfer-learning/
- bucket: `risk_fallback`
- confidence: `medium` (verified_sources, score 0.7)
- verified source coverage: 1/1 (100.0%)
- claims: 2 total, 2 capped, 0 missing evidence
- quality reasons: generic_source_homepage
- source-title match: `pass`
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
