---
atomic_facts:
  - confidence: medium
    id: fact-ai-001
    source_title: Attention Is All You Need (Vaswani et al., 2017)
    source_url: https://arxiv.org/abs/1706.03762
    statement: >-
      Attention (Bahdanau 2014) computes relevance between encoder and decoder states — cross-attention. Self-Attention (Vaswani 2017) computes relevance within a single sequence — each position
      attends to all other positions. Self-attention enables the Transformer to capture long-range dependencies without recurrence.
  - confidence: medium
    id: fact-ai-002
    source_title: Attention Is All You Need (Vaswani et al., 2017)
    source_url: https://arxiv.org/abs/1706.03762
    statement: "Scaled Dot-Product Attention: Attention(Q,K,V) = softmax(QK^T/√d_k)V."
  - confidence: medium
    id: fact-ai-003
    source_title: Attention Is All You Need (Vaswani et al., 2017)
    source_url: https://arxiv.org/abs/1706.03762
    statement: "Multi-Head Attention: run attention h times in parallel, concatenate outputs — captures different relationship types."
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
id: kb-2026-00284
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2017 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
      - Uszkoreit, Jakob
      - Jones, Llion
      - Gomez, Aidan N.
      - Kaiser, Łukasz
      - Polosukhin, Illia
    institution: Google Brain / NeurIPS
    title: Attention Is All You Need (Transformer)
    type: conference_paper
    url: https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf
    year: 2017
  - authors:
      - Bahdanau, Dzmitry
      - Cho, Kyunghyun
      - Bengio, Yoshua
    institution: University of Montreal / ICLR
    title: Neural Machine Translation by Jointly Learning to Align and Translate (Bahdanau Attention)
    type: conference_paper
    url: https://arxiv.org/abs/1409.0473
    year: 2015
  - authors:
      - Tay, Yi
      - Dehghani, Mostafa
      - Bahri, Dara
      - Metzler, Donald
    institution: Google Research / ACM Computing Surveys
    title: "Efficient Transformers: A Comprehensive Survey (Tay et al. — Google)"
    type: survey_paper
    url: https://doi.org/10.1145/3530811
    year: 2022
schema_type: TechArticle
secondary_sources:
  - authors:
      - Bahdanau
      - Cho
      - Bengio
    doi: 10.48550/arXiv.1409.0473
    institution: arXiv
    title: Neural Machine Translation by Jointly Learning to Align and Translate
    type: academic_paper
    url: https://arxiv.org/abs/1409.0473
    year: 2014
title: Attention vs. Self-Attention
updated: "2026-05-24"
---
## TL;DR

Attention (Bahdanau 2014) computes relevance between encoder and decoder states — cross-attention. Self-Attention (Vaswani 2017) computes relevance within a single sequence — each position attends to all other positions. Self-attention enables the Transformer to capture long-range dependencies without recurrence.

## Core Explanation

Scaled Dot-Product Attention: Attention(Q,K,V) = softmax(QK^T/√d_k)V. Q=query, K=key, V=value. d_k scaling prevents softmax saturation. Multi-Head Attention: run attention h times in parallel, concatenate outputs — captures different relationship types. Cross-attention: Q from decoder, K,V from encoder. Self-attention: Q,K,V all from same sequence. Causal/Masked self-attention prevents attending to future tokens.

## Further Reading

- [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
