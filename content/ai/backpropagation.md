---
id: backpropagation
title: "Backpropagation: The Engine of Neural Network Learning"
schema_type: TechArticle
category: ai
language: en
confidence: high
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
  - id: fact-backprop-1
    statement: >-
      Rumelhart, Hinton, and Williams showed how errors can be propagated backward through a network to learn
      internal representations.
    source_title: Learning representations by back-propagating errors
    source_url: https://www.nature.com/articles/323533a0
    source_doi: 10.1038/323533a0
    confidence: medium
  - id: fact-backprop-2
    statement: >-
      Automatic differentiation generalizes gradient calculation over computational graphs and underlies
      modern machine-learning frameworks.
    source_title: "Automatic Differentiation in Machine Learning: a Survey"
    source_url: https://jmlr.org/papers/v18/17-468.html
    confidence: medium
  - id: fact-backprop-3
    statement: >-
      Residual learning introduced shortcut connections that made very deep image-recognition networks easier
      to optimize.
    source_title: Deep Residual Learning for Image Recognition
    source_url: https://arxiv.org/abs/1512.03385
    confidence: medium
completeness: 0.86
known_gaps:
  - Biologically plausible alternatives and second-order optimization methods are outside this compact repair.
disputed_statements: []
primary_sources:
  - title: Learning representations by back-propagating errors
    type: academic_paper
    year: 1986
    url: https://www.nature.com/articles/323533a0
    doi: 10.1038/323533a0
    institution: Nature
    authors:
      - David E. Rumelhart
      - Geoffrey E. Hinton
      - Ronald J. Williams
  - title: "Automatic Differentiation in Machine Learning: a Survey"
    type: academic_paper
    year: 2018
    url: https://jmlr.org/papers/v18/17-468.html
    institution: JMLR
    authors:
      - Atilim Gunes Baydin
      - Barak A. Pearlmutter
      - Alexey Andreyevich Radul
      - Jeffrey Mark Siskind
  - title: Deep Residual Learning for Image Recognition
    type: conference_paper
    year: 2016
    url: https://arxiv.org/abs/1512.03385
    institution: CVPR / arXiv
    authors:
      - Kaiming He
      - Xiangyu Zhang
      - Shaoqing Ren
      - Jian Sun
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Backpropagation computes how model parameters should change by propagating error signals backward through a neural network. This repair removes unsupported future optimization-survey metadata and maps each fact to a direct source.

## Core Explanation

The selected facts cover classic backpropagation, automatic differentiation as the broader computational technique, and residual connections as one architectural response to optimization difficulty in deep networks.

## Further Reading

- [Learning representations by back-propagating errors](https://www.nature.com/articles/323533a0)
- [Automatic Differentiation in Machine Learning](https://jmlr.org/papers/v18/17-468.html)
- [Deep Residual Learning](https://arxiv.org/abs/1512.03385)

## Related Articles

- [Neural Network Basics](../neural-network-basics.md)
- [Gradient Descent](../gradient-descent.md)
