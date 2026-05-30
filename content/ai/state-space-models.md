---
id: state-space-models
title: 'State Space Models: S4, H3, and Mamba'
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
  - id: af-state-space-models-1
    statement: 'S4 applies structured state-space sequence models to long-range sequence modeling by parameterizing continuous state-space dynamics for efficient computation.'
    source_title: 'Efficiently Modeling Long Sequences with Structured State Spaces'
    source_url: https://arxiv.org/abs/2111.00396
    confidence: medium
  - id: af-state-space-models-2
    statement: 'Hungry Hungry Hippos studies state-space models for language modeling and identifies token recall and comparison as important challenges for SSM-only language models.'
    source_title: 'Hungry Hungry Hippos: Towards Language Modeling with State Space Models'
    source_url: https://arxiv.org/abs/2212.14052
    confidence: medium
  - id: af-state-space-models-3
    statement: 'Mamba introduces selective state-space layers with input-dependent parameters, aiming to keep linear-time sequence modeling while improving content-dependent behavior.'
    source_title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces'
    source_url: https://arxiv.org/abs/2312.00752
    confidence: medium
primary_sources:
  - id: ps-state-space-models-1
    title: 'Efficiently Modeling Long Sequences with Structured State Spaces'
    type: conference_paper
    year: 2022
    institution: ICLR
    url: https://arxiv.org/abs/2111.00396
  - id: ps-state-space-models-2
    title: 'Hungry Hungry Hippos: Towards Language Modeling with State Space Models'
    type: conference_paper
    year: 2023
    institution: ICLR
    url: https://arxiv.org/abs/2212.14052
  - id: ps-state-space-models-3
    title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces'
    type: conference_paper
    year: 2024
    institution: COLM
    url: https://arxiv.org/abs/2312.00752
known_gaps:
  - SSM results are architecture- and benchmark-dependent, so they should not be described as a universal replacement for attention.
  - Exact copying, retrieval, and long-context reasoning behavior need task-specific evaluation against attention and hybrid baselines.
disputed_statements: []
secondary_sources: []
updated: '2026-05-30'
---

## TL;DR

State space models are a family of sequence models that update a compact hidden state through time. In AI systems, S4, H3, and Mamba are important because they explore alternatives to full self-attention for long sequences and language modeling.

## Core Explanation

State-space layers process a sequence by updating a latent state and producing outputs from that state. This can be computationally attractive for long inputs because the model does not always need the full quadratic attention pattern used by standard Transformers.

S4 showed that structured state-space parameterizations could model long-range dependencies effectively. H3 investigated what SSMs need for language modeling, including the ability to recall and compare tokens. Mamba then made the state-space parameters input-dependent, giving the model a content-selective mechanism while retaining a linear-time scan-style computation.

## Related Articles

- [Long-Context Language Models: Memory, Retrieval, and Evaluation](../long-context-models.md)
- [Transformer Architecture Variants](../transformer-architecture-variants.md)
- [Attention Mechanism: Query-Key-Value and Contextual Representation](../attention-mechanism.md)
