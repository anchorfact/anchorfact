---
id: bayesian-deep-learning
title: "Bayesian Deep Learning: Uncertainty Quantification and Robust Predictions"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
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
  - id: fact-bayesian-deep-learning-1
    statement: >-
      Bayes by Backprop learns probability distributions over neural network weights with
      variational inference.
    source_title: Weight Uncertainty in Neural Networks
    source_url: https://arxiv.org/abs/1505.05424
    confidence: medium
  - id: fact-bayesian-deep-learning-2
    statement: Dropout can be interpreted as approximate Bayesian inference in deep Gaussian processes.
    source_title: "Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning"
    source_url: https://arxiv.org/abs/1506.02142
    confidence: medium
  - id: fact-bayesian-deep-learning-3
    statement: >-
      Kendall and Gal distinguish aleatoric and epistemic uncertainty for computer-vision deep
      learning.
    source_title: What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?
    source_url: https://arxiv.org/abs/1703.04977
    confidence: medium
primary_sources:
  - title: Weight Uncertainty in Neural Networks
    type: academic_paper
    year: 2015
    url: https://arxiv.org/abs/1505.05424
    institution: ICML / arXiv
  - title: "Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning"
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1506.02142
    institution: ICML / arXiv
  - title: What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1703.04977
    institution: NeurIPS / arXiv
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Bayesian deep learning represents uncertainty in neural networks using approximate Bayesian methods such as variational weights and dropout. This repair maps claims to primary papers.

## Core Explanation

The sampled entry had low source coverage. This version keeps three canonical Bayesian deep learning facts.

## Further Reading

- [Weight Uncertainty in Neural Networks](https://arxiv.org/abs/1505.05424)
- [Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning](https://arxiv.org/abs/1506.02142)
- [What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?](https://arxiv.org/abs/1703.04977)
