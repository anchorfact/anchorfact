---
atomic_facts:
  - confidence: high
    id: fact-ai-01
    source_title: Interpretable Machine Learning
    source_url: https://christophm.github.io/interpretable-ml-book/
    statement: "Saliency maps: highlight input pixels most influential for prediction"
  - confidence: high
    id: fact-ai-001
    source_title: A Unified Approach to Interpreting Model Predictions (SHAP)
    source_url: https://papers.nips.cc/paper/7062-a-unified-approach-to-interpreting-model-predictions
    statement: >-
      Explainable AI makes model decisions interpretable by humans. As models become more complex (deep NNs, LLMs), understanding WHY a model made a decision becomes critical for trust, debugging, and
      regulatory compliance (EU AI Act, GDPR). Methods: SHAP (feature importance), LIME (local explanations), attention visualization, saliency maps.
  - confidence: high
    id: fact-ai-002
    source_title: A Unified Approach to Interpreting Model Predictions (SHAP)
    source_url: https://papers.nips.cc/paper/7062-a-unified-approach-to-interpreting-model-predictions
    statement: "SHAP (SHapley Additive exPlanations): game-theoretic approach assigning each feature an importance score."
  - confidence: medium
    id: fact-ai-003
    source_title: Interpretable Machine Learning
    source_url: https://christophm.github.io/interpretable-ml-book/
    statement: "Saliency maps: highlight input pixels most influential for prediction."
category: ai
completeness: 0.88
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: human_only
id: kb-2026-00277
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2023 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Ribeiro, Marco Tulio
      - Singh, Sameer
      - Guestrin, Carlos
    institution: University of Washington / KDD
    title: Why Should I Trust You? Explaining the Predictions of Any Classifier (LIME — Ribeiro et al.)
    type: conference_paper
    url: https://arxiv.org/abs/1602.04938
    year: 2016
  - authors:
      - Lundberg, Scott M.
      - Lee, Su-In
    institution: University of Washington / NeurIPS
    title: A Unified Approach to Interpreting Model Predictions (SHAP — Lundberg & Lee)
    type: conference_paper
    url: https://arxiv.org/abs/1705.07874
    year: 2017
  - authors:
      - Arrieta, Alejandro Barredo
      - Díaz-Rodríguez, Natalia
      - Del Ser, Javier
      - et al.
    institution: Information Fusion (Elsevier)
    title: "Explainable Artificial Intelligence (XAI): A Comprehensive Survey (Arrieta et al. — Information Fusion)"
    type: survey_paper
    url: https://doi.org/10.1016/j.inffus.2019.12.012
    year: 2020
schema_type: TechArticle
secondary_sources:
  - authors:
      - Lundberg, Scott M.
      - Lee, Su-In
    institution: NeurIPS
    title: A Unified Approach to Interpreting Model Predictions (SHAP)
    type: academic_paper
    url: https://papers.nips.cc/paper/7062-a-unified-approach-to-interpreting-model-predictions
    year: 2017
  - authors:
      - Ribeiro
      - Singh
      - Guestrin
    institution: KDD / University of Washington
    title: "\"Why Should I Trust You?\": Explaining the Predictions of Any Classifier (LIME)"
    type: academic_paper
    url: https://arxiv.org/abs/1602.04938
    year: 2016
title: Explainable AI (XAI)
updated: "2026-05-24"
---
## TL;DR

Explainable AI makes model decisions interpretable by humans. As models become more complex (deep NNs, LLMs), understanding WHY a model made a decision becomes critical for trust, debugging, and regulatory compliance (EU AI Act, GDPR). Methods: SHAP (feature importance), LIME (local explanations), attention visualization, saliency maps.

## Core Explanation

SHAP (SHapley Additive exPlanations): game-theoretic approach assigning each feature an importance score. LIME: locally approximate complex model with simple interpretable model. Saliency maps: highlight input pixels most influential for prediction. Limitations: explanations can be misleading, feature correlations complicate attribution. Post-hoc methods explain AFTER prediction; inherently interpretable models explain BY design.

## Further Reading

- [Interpretable Machine Learning (Christoph Molnar)](https://christophm.github.io/interpretable-ml-book/)
