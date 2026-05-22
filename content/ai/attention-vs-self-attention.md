---
id:"kb-2026-00284"
title:"Attention vs. Self-Attention"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed:true
primary_sources:
  - title:"Attention Is All You Need (Vaswani et al., 2017)"
    type:"paper"
    year:2017
    url:"https://arxiv.org/abs/1706.03762"
    institution:"NeurIPS"
secondary_sources:
  - title: "Neural Machine Translation by Jointly Learning to Align and Translate"
    authors: ["Bahdanau", "Cho", "Bengio"]
    type: "academic_paper"
    year: 2014
    doi: "10.48550/arXiv.1409.0473"
    url: "https://arxiv.org/abs/1409.0473"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Attention (Bahdanau 2014) computes relevance between encoder and decoder states — cross-attention. Self-Attention (Vaswani 2017) computes relevance within a single sequence — each position attends to all other positions. Self-attention enables the Transformer to capture long-range dependencies without recurrence.

## Core Explanation

Scaled Dot-Product Attention: Attention(Q,K,V) = softmax(QK^T/√d_k)V. Q=query, K=key, V=value. d_k scaling prevents softmax saturation. Multi-Head Attention: run attention h times in parallel, concatenate outputs — captures different relationship types. Cross-attention: Q from decoder, K,V from encoder. Self-attention: Q,K,V all from same sequence. Causal/Masked self-attention prevents attending to future tokens.

## Further Reading

- [Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
