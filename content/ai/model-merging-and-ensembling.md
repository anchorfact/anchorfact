---
id: model-merging-and-ensembling
title: Model Merging and Ensembling
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-model-merging-and-ensembling-1
    statement: >-
      Model Soups reports that averaging weights of multiple fine-tuned models can improve accuracy
      without increasing inference time.
    source_title: >-
      Model Soups: Averaging Weights of Multiple Fine-Tuned Models Improves Accuracy Without
      Increasing Inference Time
    source_url: https://arxiv.org/abs/2203.05482
    confidence: medium
  - id: fact-ai-model-merging-and-ensembling-2
    statement: >-
      TIES-Merging proposes trimming small parameter changes, resolving sign conflicts, and merging
      parameters aligned with the agreed sign.
    source_title: 'TIES-Merging: Resolving Interference When Merging Models'
    source_url: https://arxiv.org/abs/2306.01708
    confidence: medium
  - id: fact-ai-model-merging-and-ensembling-3
    statement: >-
      Deep ensembles train multiple neural networks and combine their predictions to produce strong
      predictive uncertainty estimates.
    source_title: Simple and Scalable Predictive Uncertainty Estimation Using Deep Ensembles
    source_url: https://arxiv.org/abs/1612.01474
    confidence: medium
completeness: 0.82
known_gaps:
  - Specialized edge cases and implementation details are outside this source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: >-
      Model Soups: Averaging Weights of Multiple Fine-Tuned Models Improves Accuracy Without
      Increasing Inference Time
    authors:
      - Mitchell Wortsman
      - Gabriel Ilharco
      - Samir Ya Gadre
      - et al.
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2203.05482
    institution: arXiv
  - title: 'TIES-Merging: Resolving Interference When Merging Models'
    authors:
      - Prateek Yadav
      - Derek Tam
      - Leshem Choshen
      - Colin Raffel
      - Mohit Bansal
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2306.01708
    institution: arXiv
  - title: Simple and Scalable Predictive Uncertainty Estimation Using Deep Ensembles
    authors:
      - Balaji Lakshminarayanan
      - Alexander Pritzel
      - Charles Blundell
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1612.01474
    institution: arXiv
secondary_sources: []
updated: '2026-05-28'
ai_models:
  - claude-opus
---

## TL;DR

Model merging and ensembling combine multiple trained models or checkpoints to improve accuracy, robustness, or uncertainty estimates.

## Core Explanation

Weight-space methods combine parameters directly, while prediction-space ensembles keep separate models and combine outputs at inference time.

## Source-Mapped Facts

- Model Soups reports that averaging weights of multiple fine-tuned models can improve accuracy without increasing inference time. ([source](https://arxiv.org/abs/2203.05482))
- TIES-Merging proposes trimming small parameter changes, resolving sign conflicts, and merging parameters aligned with the agreed sign. ([source](https://arxiv.org/abs/2306.01708))
- Deep ensembles train multiple neural networks and combine their predictions to produce strong predictive uncertainty estimates. ([source](https://arxiv.org/abs/1612.01474))

## Further Reading

- [Model Soups: Averaging Weights of Multiple Fine-Tuned Models Improves Accuracy Without Increasing Inference Time](https://arxiv.org/abs/2203.05482)
- [TIES-Merging: Resolving Interference When Merging Models](https://arxiv.org/abs/2306.01708)
- [Simple and Scalable Predictive Uncertainty Estimation Using Deep Ensembles](https://arxiv.org/abs/1612.01474)
