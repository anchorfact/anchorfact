---
id: kb-2026-00284
title: Attention vs. Self-Attention
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Attention Is All You Need (Vaswani et al., 2017)
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1706.03762
    institution: NeurIPS
secondary_sources:
  - title: Neural Machine Translation by Jointly Learning to Align and Translate
    authors:
      - Bahdanau
      - Cho
      - Bengio
    type: academic_paper
    year: 2014
    doi: 10.48550/arXiv.1409.0473
    url: https://arxiv.org/abs/1409.0473
    institution: arXiv
completeness: 0.88
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
    confidence: medium
known_gaps:
  - Statistics and data cited are from 2017 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
ai_citations: null
atomic_facts:
  - id: fact-ai-001
    statement: >-
      Attention (Bahdanau 2014) computes relevance between encoder and decoder states — cross-attention. Self-Attention (Vaswani 2017) computes relevance within a single sequence — each position
      attends to all other positions. Self-attention enables the Transformer to capture long-range dependencies without recurrence.
    confidence: medium
    source_title: Attention Is All You Need (Vaswani et al., 2017)
    source_url: https://arxiv.org/abs/1706.03762
  - id: fact-ai-002
    statement: "Scaled Dot-Product Attention: Attention(Q,K,V) = softmax(QK^T/√d_k)V."
    confidence: medium
    source_title: Attention Is All You Need (Vaswani et al., 2017)
    source_url: https://arxiv.org/abs/1706.03762
  - id: fact-ai-003
    statement: "Multi-Head Attention: run attention h times in parallel, concatenate outputs — captures different relationship types."
    confidence: medium
    source_title: Attention Is All You Need (Vaswani et al., 2017)
    source_url: https://arxiv.org/abs/1706.03762
---



## TL;DR

Attention (Bahdanau 2014) computes relevance between encoder and decoder states — cross-attention. Self-Attention (Vaswani 2017) computes relevance within a single sequence — each position attends to all other positions. Self-attention enables the Transformer to capture long-range dependencies without recurrence.

## Core Explanation

Scaled Dot-Product Attention: Attention(Q,K,V) = softmax(QK^T/√d_k)V. Q=query, K=key, V=value. d_k scaling prevents softmax saturation. Multi-Head Attention: run attention h times in parallel, concatenate outputs — captures different relationship types. Cross-attention: Q from decoder, K,V from encoder. Self-attention: Q,K,V all from same sequence. Causal/Masked self-attention prevents attending to future tokens.

## Further Reading

- [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
