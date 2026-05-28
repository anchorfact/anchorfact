---
id: distributed-training-systems
title: "Distributed Training: FSDP, DeepSpeed, and Scaling Laws"
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
  - id: fact-distributed-training-1
    statement: >-
      Megatron-LM used intra-layer model parallelism to train transformer language models with billions of
      parameters across GPUs.
    source_title: "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism"
    source_url: https://arxiv.org/abs/1909.08053
    confidence: medium
  - id: fact-distributed-training-2
    statement: >-
      ZeRO partitions optimizer states, gradients, and parameters across data-parallel processes to reduce
      memory redundancy.
    source_title: "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models"
    source_url: https://arxiv.org/abs/1910.02054
    confidence: medium
  - id: fact-distributed-training-3
    statement: >-
      GPipe applies pipeline parallelism and micro-batching to train very large neural networks across
      accelerator partitions.
    source_title: "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism"
    source_url: https://arxiv.org/abs/1811.06965
    confidence: medium
completeness: 0.86
primary_sources:
  - title: "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism"
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1909.08053
    institution: NVIDIA / arXiv
    authors:
      - Mohammad Shoeybi
      - Mostofa Patwary
      - Raul Puri
  - title: "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models"
    type: conference_paper
    year: 2020
    url: https://arxiv.org/abs/1910.02054
    institution: SC / Microsoft
    authors:
      - Samyam Rajbhandari
      - Jeff Rasley
      - Olatunji Ruwase
      - Yuxiong He
  - title: "GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism"
    type: conference_paper
    year: 2019
    url: https://arxiv.org/abs/1811.06965
    institution: NeurIPS / Google
    authors:
      - Yanping Huang
      - Youlong Cheng
      - Ankur Bapna
known_gaps:
  - >-
    Fault tolerance, heterogeneous clusters, and proprietary frontier-model training details are not claimed
    here.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Distributed training splits work across accelerators to train models that do not fit efficiently on a single device. This repair removes the unsupported GPT-4 training claim and keeps the evidence to Megatron-LM, ZeRO, and GPipe.

## Core Explanation

Megatron-LM covers tensor/model parallelism, ZeRO covers sharded memory optimization, and GPipe covers pipeline parallelism. Together they show the main families of distributed deep-learning training techniques without relying on unverified proprietary details.

## Further Reading

- [Megatron-LM](https://arxiv.org/abs/1909.08053)
- [ZeRO](https://arxiv.org/abs/1910.02054)
- [GPipe](https://arxiv.org/abs/1811.06965)

## Related Articles

- [Large Language Model Training](../large-language-model-training-scaling-laws-data-curation-and-compute.md)
- [MLOps and LLMOps](../mlops-llmops.md)
