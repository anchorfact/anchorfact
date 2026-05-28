---
id: llm-inference-optimization
title: "LLM Inference Optimization: From FlashAttention to Speculative Decoding"
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
  - id: fact-llm-inference-1
    statement: >-
      PagedAttention applies a virtual-memory style design to key-value cache management for
      large-language-model serving.
    source_title: Efficient Memory Management for Large Language Model Serving with PagedAttention
    source_url: https://arxiv.org/abs/2309.06180
    confidence: medium
  - id: fact-llm-inference-2
    statement: >-
      FlashAttention computes exact attention with IO-aware tiling to reduce memory traffic between GPU memory
      levels.
    source_title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
    source_url: https://arxiv.org/abs/2205.14135
    confidence: medium
  - id: fact-llm-inference-3
    statement: >-
      LLM.int8() uses mixed-precision decomposition to run 8-bit matrix multiplication for large transformers
      while preserving model quality.
    source_title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
    source_url: https://arxiv.org/abs/2208.07339
    confidence: medium
completeness: 0.86
known_gaps:
  - Speculative decoding, pruning, and serving schedulers are not covered in this compact evidence repair.
disputed_statements: []
primary_sources:
  - title: Efficient Memory Management for Large Language Model Serving with PagedAttention
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2309.06180
    institution: SOSP / UC Berkeley
    authors:
      - Woosuk Kwon
      - Zhuohan Li
      - Siyuan Zhuang
  - title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
    type: conference_paper
    year: 2022
    url: https://arxiv.org/abs/2205.14135
    institution: NeurIPS / Stanford
    authors:
      - Tri Dao
      - Daniel Y. Fu
      - Stefano Ermon
      - Atri Rudra
      - Christopher Re
  - title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
    type: conference_paper
    year: 2022
    url: https://arxiv.org/abs/2208.07339
    institution: NeurIPS / Meta AI
    authors:
      - Tim Dettmers
      - Mike Lewis
      - Younes Belkada
      - Luke Zettlemoyer
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

LLM inference optimization reduces memory use, latency, and serving cost for transformer models. This repaired entry focuses on three well-cited techniques: PagedAttention, FlashAttention, and LLM.int8().

## Core Explanation

PagedAttention targets key-value cache fragmentation, FlashAttention targets attention memory traffic, and LLM.int8() targets matrix multiplication precision. The prior future tutorial source was removed from public evidence.

## Further Reading

- [PagedAttention / vLLM](https://arxiv.org/abs/2309.06180)
- [FlashAttention](https://arxiv.org/abs/2205.14135)
- [LLM.int8()](https://arxiv.org/abs/2208.07339)

## Related Articles

- [Large Language Model Training](../large-language-model-training-scaling-laws-data-curation-and-compute.md)
- [Efficient Green AI](../efficient-green-ai.md)
