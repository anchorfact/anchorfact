---
id: "adversarial-machine-learning"
title: "Adversarial Machine Learning: Attacks, Defenses, and Robustness Engineering"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-adversarial-machine-learning-1"
    statement: "NIST AI 100-2e3 (April 2025) published the authoritative taxonomy of adversarial ML — classifying attacks into evasion (inference-time, e.g., adversarial patches on stop signs), poisoning (training-time data corruption), and privacy (model inversion, membership inference), with detailed defense matrices for each category."
    source_title: "NIST AI 100-2e3 (April 2025) — Adversarial Machine Learning Taxonomy"
    source_url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2025.pdf"
    confidence: "high"
  - id: "af-adversarial-machine-learning-2"
    statement: "A 2025 systematic review of 150+ peer-reviewed papers found that adversarial training (injecting adversarial examples into training data) remains the most effective general defense — improving robustness by 30-60% against white-box attacks — but at the cost of 5-10% degradation on clean data accuracy (the robustness-accuracy trade-off)."
    source_title: "AML Survey, Neurocomputing (March 2026) / AML Methods & Tools (2025)"
    source_url: "https://www.sciencedirect.com/science/article/pii/S0925231226000676"
    confidence: "high"
primary_sources:
  - id: "ps-adversarial-machine-learning-1"
    title: "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (NIST AI 100-2e3)"
    type: "government_report"
    year: 2025
    institution: "NIST (National Institute of Standards and Technology)"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2025.pdf"
  - id: "ps-adversarial-machine-learning-2"
    title: "A survey on adversarial machine learning: Attacks, defenses, real-world applications, and algorithmic framework"
    type: "academic_paper"
    year: 2026
    institution: "Neurocomputing / Elsevier"
    url: "https://www.sciencedirect.com/science/article/pii/S0925231226000676"
known_gaps:
  - "Certified robustness guarantees for deep networks"
  - "Real-time adversarial detection in production ML pipelines"
disputed_statements: []
---

## TL;DR
Adversarial Machine Learning studies how AI systems can be fooled — and defended. Tiny perturbations invisible to humans can cause state-of-the-art models to misclassify with high confidence. Building robust AI requires understanding the attack surface and engineering defenses.

## Core Explanation
Adversarial attacks: (1) Evasion attacks — add imperceptible perturbation ε to input x such that f(x+ε) ≠ f(x). FGSM (Fast Gradient Sign Method): x' = x + ε·sign(∇_x L). PGD (Projected Gradient Descent) iterates FGSM within L∞ ball. Physical attacks: printed adversarial patches on objects fool real-world computer vision. (2) Poisoning attacks — inject malicious samples into training data to create backdoors. (3) Privacy attacks — extract training data (membership inference) or reconstruct inputs (model inversion).

## Detailed Analysis
Defense taxonomy: (1) Adversarial training — augment training with adversarial examples (most effective but computationally expensive); (2) Certified defenses — provide mathematical guarantees of robustness within perturbation bounds (randomized smoothing, interval bound propagation); (3) Detection methods — identify adversarial inputs at inference (feature squeezing, MagNet); (4) Input preprocessing — JPEG compression, total variation minimization to remove perturbations. 2025 trend: multimodal adversarial attacks combining visual, text, and audio modalities. NIST emphasizes that no defense is universally effective — defense-in-depth and red teaming are essential. ICCV 2025 featured adversarial vulnerability exploration in vision-language-action models for robotics.

## Further Reading
- Adversarial Robustness Toolbox (IBM ART)
- CleverHans Library (Google/TensorFlow)
- NIST AI Risk Management Framework
