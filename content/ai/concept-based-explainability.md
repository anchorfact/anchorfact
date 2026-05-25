---
id: concept-based-explainability
title: "Concept-Based Explainability: TCAV and Concept Bottleneck Models"
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
  - id: af-concept-based-explainability-1
    statement: >-
      TCAV (Testing with Concept Activation Vectors, Kim et al., ICML 2018) introduced a quantitative method for measuring how much a trained model relies on human-defined concepts (e.g., "stripes"
      for zebra classification) — training linear classifiers in the model's activation space to separate concept-present from concept-absent examples.
    source_title: Kim et al., ICML 2018 (Google Brain) — TCAV — Interpretability Beyond Feature Attribution
    source_url: https://proceedings.mlr.press/v80/kim18d.html
    confidence: high
  - id: af-concept-based-explainability-2
    statement: >-
      CVPR 2025 introduced Hybrid Concept Bottleneck Models (HCBM) that combine the interpretability of standard CBMs with the flexibility of post-hoc concept extraction — allowing models to discover
      new concepts from data while maintaining alignment with predefined human-interpretable concepts.
    source_title: Liu et al., CVPR 2025 — Hybrid Concept Bottleneck Models
    source_url: https://dl.acm.org/doi/abs/10.1145/3774643
    confidence: high
primary_sources:
  - id: ps-concept-based-explainability-1
    title: "Interpretability Beyond Feature Attribution: Quantitative Testing with Concept Activation Vectors (TCAV)"
    type: academic_paper
    year: 2018
    institution: ICML / Google Brain
    url: https://proceedings.mlr.press/v80/kim18d.html
  - id: ps-concept-based-explainability-2
    title: "Concept-based Explainable Artificial Intelligence: A Survey"
    type: academic_paper
    year: 2025
    institution: ACM Computing Surveys
    url: https://dl.acm.org/doi/abs/10.1145/3774643
known_gaps:
  - Automatic concept discovery without human labeling
  - Truthfulness and reliability of concept explanations
disputed_statements: []
secondary_sources:
  - title: "This Looks Like That: Deep Learning for Interpretable Image Recognition (Prototypical Networks for XAI)"
    type: conference_paper
    year: 2019
    authors:
      - Chen, Chaofan
      - Li, Oscar
      - Tao, Chaofan
      - et al.
    institution: Duke University / NeurIPS
    url: https://arxiv.org/abs/1806.10574
  - title: "Explainable AI (XAI): A Comprehensive Survey of Methods, Metrics, and Applications"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: "TCAV: Interpretability Beyond Feature Attribution — Quantitative Testing with Concept Activation Vectors"
    type: conference_paper
    year: 2018
    authors:
      - Kim, Been
      - Wattenberg, Martin
      - Gilmer, Justin
      - et al.
    institution: Google Brain / ICML
    url: https://arxiv.org/abs/1711.11279
  - title: A Unified Approach to Interpreting Model Predictions (SHAP — Lundberg & Lee)
    type: conference_paper
    year: 2017
    authors:
      - Lundberg, Scott M.
      - Lee, Su-In
    institution: University of Washington / NeurIPS
    url: https://arxiv.org/abs/1705.07874
updated: "2026-05-24"
---
## TL;DR
Concept-based explainability moves beyond pixel-level saliency maps to higher-level human-understandable concepts. TCAV quantifies whether a model "thinks" about stripes when classifying zebras, while Concept Bottleneck Models embed interpretable concept reasoning into the architecture itself.

## Core Explanation
Post-hoc saliency methods (Grad-CAM, Integrated Gradients) show "where" a model looks but not "what concept" it uses. TCAV approach: (1) Collect examples of concept (e.g., images with stripes vs. without); (2) Train a linear CAV (Concept Activation Vector) in the model's activation layer that separates concept from non-concept; (3) Measure the directional derivative of the model's output along the CAV direction — the TCAV score = fraction of inputs where the concept influences classification. Statistical significance via two-sided t-test against random concepts.

## Detailed Analysis
Concept Bottleneck Models (CBMs): architecture forces predictions to pass through a concept layer — model learns to predict concepts from input, then predict label from concepts. Advantages: inherently interpretable, can intervene on misconceptions (e.g., "ignore texture bias, use shape"). Limitations: requires annotated concept labels; reduces accuracy vs. unrestricted models. Hybrid CBMs (CVPR 2025) relax the bottleneck with residual connections. Visual-TCAV (2024) generates concept saliency maps showing where concepts are recognized spatially. Applications: medical imaging (clinician-verifiable reasoning), autonomous driving (concept-level failure analysis), and bias auditing (checking if models use protected attributes as concepts).

## Further Reading
- TensorFlow TCAV GitHub Repository
- Yannic Kilcher's TCAV Video Explanation
- DALLE-3 Concept Understanding Analysis

## Related Articles

- [3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars](../3d-human-modeling.md)
- [AI Art and Creativity: Generative Models and Authorship](../ai-art-and-creativity.md)
- [AI Democratization: Open-Source Models, Low-Code AI, and Accessible Machine Learning](../ai-for-democratization.md)
