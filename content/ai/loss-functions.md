---
id: loss-functions
title: Loss Functions in Machine Learning
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-loss-functions-1
    statement: Cross-entropy is a common classification loss connected to probabilistic modeling.
    source_title: Deep Learning
    source_url: https://www.deeplearningbook.org/contents/ml.html
    confidence: medium
  - id: fact-loss-functions-2
    statement: >-
      Huber introduced a robust loss that is less sensitive to outliers than squared error for large
      residuals.
    source_title: Robust Estimation of a Location Parameter
    source_url: https://doi.org/10.1214/aoms/1177703732
    confidence: medium
  - id: fact-loss-functions-3
    statement: Focal loss was proposed to address class imbalance in dense object detection.
    source_title: Focal Loss for Dense Object Detection
    source_url: https://arxiv.org/abs/1708.02002
    confidence: medium
completeness: 0.9
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: Deep Learning
    type: book
    year: 2016
    url: https://www.deeplearningbook.org/contents/ml.html
    institution: MIT Press
    authors:
      - Ian Goodfellow
      - Yoshua Bengio
      - Aaron Courville
  - title: Robust Estimation of a Location Parameter
    type: academic_paper
    year: 1964
    url: https://doi.org/10.1214/aoms/1177703732
    doi: 10.1214/aoms/1177703732
    institution: The Annals of Mathematical Statistics
  - title: Focal Loss for Dense Object Detection
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1708.02002
    institution: ICCV / arXiv
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Loss functions define optimization targets for machine learning, from cross-entropy to robust and class-imbalance losses. This repair keeps only source-backed examples.

## Core Explanation

The previous entry had weak source matching. The repaired version maps core loss-function claims to textbook or paper evidence.

## Further Reading

- [Deep Learning](https://www.deeplearningbook.org/contents/ml.html)
- [Robust Estimation of a Location Parameter](https://doi.org/10.1214/aoms/1177703732)
- [Focal Loss for Dense Object Detection](https://arxiv.org/abs/1708.02002)
