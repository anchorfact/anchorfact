---
id: kolmogorov-arnold-networks
title: 'Kolmogorov-Arnold Networks: Learnable Edge Functions'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.72
atomic_facts:
  - id: af-kolmogorov-arnold-networks-1
    statement: 'The KAN paper proposes neural networks with learnable univariate functions on edges, contrasting them with MLPs that use fixed activation functions at nodes and learned scalar weights.'
    source_title: 'KAN: Kolmogorov-Arnold Networks'
    source_url: https://arxiv.org/abs/2404.19756
    confidence: medium
  - id: af-kolmogorov-arnold-networks-2
    statement: 'FastKAN studies a KAN variant that replaces the spline basis used in the original KAN formulation with radial basis functions to reduce implementation overhead.'
    source_title: 'FastKAN: Very Fast Kolmogorov-Arnold Networks using Radial Basis Functions'
    source_url: https://arxiv.org/abs/2405.06721
    confidence: medium
  - id: af-kolmogorov-arnold-networks-3
    statement: 'KAN 2.0 frames Kolmogorov-Arnold Networks as tools for scientific discovery tasks such as identifying relevant variables, modular structure, and symbolic formulas.'
    source_title: 'KAN 2.0: Kolmogorov-Arnold Networks Meet Science'
    source_url: https://arxiv.org/abs/2408.10205
    confidence: medium
primary_sources:
  - id: ps-kolmogorov-arnold-networks-1
    title: 'KAN: Kolmogorov-Arnold Networks'
    type: conference_paper
    year: 2025
    institution: ICLR
    url: https://arxiv.org/abs/2404.19756
  - id: ps-kolmogorov-arnold-networks-2
    title: 'FastKAN: Very Fast Kolmogorov-Arnold Networks using Radial Basis Functions'
    type: academic_paper
    year: 2024
    institution: arXiv
    url: https://arxiv.org/abs/2405.06721
  - id: ps-kolmogorov-arnold-networks-3
    title: 'KAN 2.0: Kolmogorov-Arnold Networks Meet Science'
    type: academic_paper
    year: 2024
    institution: arXiv
    url: https://arxiv.org/abs/2408.10205
known_gaps:
  - KAN results are task- and implementation-dependent, so small benchmark wins should not be generalized to all neural-network workloads.
  - Large-scale language and vision applications still need comparison against highly optimized MLP and Transformer baselines.
disputed_statements: []
secondary_sources: []
updated: '2026-05-30'
---

## TL;DR

Kolmogorov-Arnold Networks replace scalar edge weights with learnable one-dimensional functions. They are interesting for interpretability and scientific modeling, but they are not yet a proven general replacement for MLPs or Transformers.

## Core Explanation

In a standard multilayer perceptron, each edge usually has a learned scalar weight and each node applies a fixed nonlinearity such as ReLU or GELU. KANs move much of the learnable nonlinear behavior onto edges: each edge represents a learnable univariate function, and nodes aggregate those function outputs.

The main promise is that learned edge functions can make some fitted relationships easier to inspect. The main caution is that evaluating and optimizing those functions can be more expensive than dense matrix operations, so practical value depends on the task, implementation, and hardware.

## Related Articles

- [Activation Functions in Neural Networks](../activation-functions.md)
- [Neural Network Basics](../neural-network-basics.md)
- [AI for Science: Foundation Models for Scientific Discovery](../ai-for-science.md)
