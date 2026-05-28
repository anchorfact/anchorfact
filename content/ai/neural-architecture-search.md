---
id: neural-architecture-search
title: "Neural Architecture Search: Automated Design of Deep Neural Networks"
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
  - id: fact-nas-1
    statement: >-
      Early neural architecture search used reinforcement learning to generate neural network
      architectures.
    source_title: Neural Architecture Search with Reinforcement Learning
    source_url: https://arxiv.org/abs/1611.01578
    confidence: medium
  - id: fact-nas-2
    statement: ENAS accelerates architecture search by sharing parameters among candidate architectures.
    source_title: Efficient Neural Architecture Search via Parameter Sharing
    source_url: https://arxiv.org/abs/1802.03268
    confidence: medium
  - id: fact-nas-3
    statement: DARTS relaxes architecture search into a differentiable optimization problem.
    source_title: "DARTS: Differentiable Architecture Search"
    source_url: https://arxiv.org/abs/1806.09055
    confidence: medium
primary_sources:
  - title: Neural Architecture Search with Reinforcement Learning
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1611.01578
    institution: arXiv
  - title: Efficient Neural Architecture Search via Parameter Sharing
    type: academic_paper
    year: 2018
    url: https://arxiv.org/abs/1802.03268
    institution: ICML / arXiv
  - title: "DARTS: Differentiable Architecture Search"
    type: academic_paper
    year: 2018
    url: https://arxiv.org/abs/1806.09055
    institution: ICLR / arXiv
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Neural architecture search automates model design with reinforcement learning, weight sharing, and differentiable search. This repair maps NAS claims to primary papers.

## Core Explanation

The previous entry had partial coverage. The repaired version keeps three canonical NAS facts tied to Zoph and Le, ENAS, and DARTS.

## Further Reading

- [Neural Architecture Search with Reinforcement Learning](https://arxiv.org/abs/1611.01578)
- [Efficient Neural Architecture Search via Parameter Sharing](https://arxiv.org/abs/1802.03268)
- [DARTS: Differentiable Architecture Search](https://arxiv.org/abs/1806.09055)
