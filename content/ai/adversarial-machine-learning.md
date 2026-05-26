---
id: adversarial-machine-learning
title: "Adversarial Machine Learning: Attacks, Defenses, and Robustness Engineering"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: fact-aml-1
    statement: FGSM (Goodfellow et al. 2015) generates adversarial examples by adding ε·sign(∇_x L(x,y)) to input, demonstrating that imperceptible perturbations can cause high-confidence misclassification.
    source_title: Goodfellow, Ian J., Jonathon Shlens, and Christian Szegedy. Explaining and Harnessing Adversarial Examples. ICLR 2015
    source_url: https://arxiv.org/abs/1412.6572
    confidence: high
  - id: fact-aml-2
    statement: >-
      PGD (Madry et al. 2018, MIT) is the strongest first-order adversarial attack — iteratively applying FGSM with projection — and adversarial training with PGD became the standard defense for
      certified robustness.
    source_title: Madry, Aleksander, et al. Towards Deep Learning Models Resistant to Adversarial Attacks. ICLR 2018
    source_url: https://openreview.net/forum?id=rJzIBfZAb
    confidence: high
  - id: fact-aml-3
    statement: >-
      Adversarial training, where models are trained on adversarially perturbed examples, is the most effective empirical defense, but certified defenses using interval bound propagation provide
      provable guarantees.
    source_title: Gowal, Sven, et al. Scalable Verified Training for Provably Robust Image Classification. ICCV 2019
    source_url: https://arxiv.org/abs/1905.12588
    confidence: high
primary_sources:
  - id: ps-adversarial-machine-learning-1
    title: "Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (NIST AI 100-2e3)"
    type: government_report
    year: 2025
    institution: NIST (National Institute of Standards and Technology)
    url: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2025.pdf
  - id: ps-adversarial-machine-learning-2
    title: "A survey on adversarial machine learning: Attacks, defenses, real-world applications, and algorithmic framework"
    type: academic_paper
    year: 2026
    institution: Neurocomputing / Elsevier
    url: https://www.sciencedirect.com/science/article/pii/S0925231226000676
known_gaps:
  - Certified robustness guarantees for deep networks
  - Real-time adversarial detection in production ML pipelines
disputed_statements: []
secondary_sources:
  - title: Explaining and Harnessing Adversarial Examples (FGSM)
    type: conference_paper
    year: 2015
    authors:
      - Goodfellow, Ian J.
      - Shlens, Jonathon
      - Szegedy, Christian
    institution: Google Brain / ICLR
    url: https://arxiv.org/abs/1412.6572
  - title: Towards Deep Learning Models Resistant to Adversarial Attacks (PGD)
    type: conference_paper
    year: 2018
    authors:
      - Madry, Aleksander
      - Makelov, Aleksandar
      - Schmidt, Ludwig
      - Tsipras, Dimitris
      - Vladu, Adrian
    institution: MIT / ICLR
    url: https://openreview.net/forum?id=rJzIBfZAb
  - title: "Adversarial Machine Learning: A Review of Methods, Tools, and Defenses"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Artificial Intelligence Review (Springer)
    url: https://doi.org/10.1007/s10462-025-11147-4
  - title: Adversarial Robustness — Theory and Practice (NeurIPS Tutorial)
    type: tutorial
    year: 2019
    authors:
      - Kolter, Zico
      - Madry, Aleksander
    institution: NeurIPS / MIT
    url: https://adversarial-ml-tutorial.org/
updated: "2026-05-24"
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

## Related Articles

- [AI for Drug Repurposing: Identifying New Uses for Existing Drugs Through Machine Learning](../ai-drug-repurposing.md)
- [AI Democratization: Open-Source Models, Low-Code AI, and Accessible Machine Learning](../ai-for-democratization.md)
- [Anomaly Detection in Machine Learning](../anomaly-detection.md)