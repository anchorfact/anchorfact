---
id: kb-2026-00284
title: Attention vs. Self-Attention
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-attention-vs-self-attention-1
    statement: >-
      Bahdanau attention lets a neural machine translation model learn to align and translate by
      searching for relevant source-sentence parts while generating a target word.
    source_title: Neural Machine Translation by Jointly Learning to Align and Translate
    source_url: https://arxiv.org/abs/1409.0473
    confidence: medium
  - id: fact-ai-attention-vs-self-attention-2
    statement: >-
      The Transformer replaces recurrence and convolution with attention mechanisms, including
      self-attention over sequence positions.
    source_title: Attention Is All You Need
    source_url: https://arxiv.org/abs/1706.03762
    confidence: medium
  - id: fact-ai-attention-vs-self-attention-3
    statement: >-
      Efficient Transformers surveys Transformer variants that target computational and memory
      efficiency limitations of attention.
    source_title: 'Efficient Transformers: A Survey'
    source_url: https://doi.org/10.1145/3530811
    confidence: medium
completeness: 0.82
known_gaps:
  - Specialized edge cases and implementation details are outside this source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: Neural Machine Translation by Jointly Learning to Align and Translate
    authors:
      - Dzmitry Bahdanau
      - Kyunghyun Cho
      - Yoshua Bengio
    type: conference_paper
    year: 2015
    url: https://arxiv.org/abs/1409.0473
    institution: arXiv
  - title: Attention Is All You Need
    authors:
      - Ashish Vaswani
      - Noam Shazeer
      - Niki Parmar
      - et al.
    type: conference_paper
    year: 2017
    url: https://arxiv.org/abs/1706.03762
    institution: arXiv
  - title: 'Efficient Transformers: A Survey'
    authors:
      - Yi Tay
      - Mostafa Dehghani
      - Dara Bahri
      - Donald Metzler
    type: survey_paper
    year: 2022
    url: https://doi.org/10.1145/3530811
    institution: ACM Computing Surveys
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

Attention mechanisms relate one set of sequence states to another, while self-attention relates positions within the same sequence.

## Core Explanation

The key distinction is whether attention relates decoder state to encoder state, as in early neural machine translation, or relates positions inside the same sequence.

## Source-Mapped Facts

- Bahdanau attention lets a neural machine translation model learn to align and translate by searching for relevant source-sentence parts while generating a target word. ([source](https://arxiv.org/abs/1409.0473))
- The Transformer replaces recurrence and convolution with attention mechanisms, including self-attention over sequence positions. ([source](https://arxiv.org/abs/1706.03762))
- Efficient Transformers surveys Transformer variants that target computational and memory efficiency limitations of attention. ([source](https://doi.org/10.1145/3530811))

## Further Reading

- [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Efficient Transformers: A Survey](https://doi.org/10.1145/3530811)
