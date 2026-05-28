---
id: ai-hardware-accelerators
title: "AI Hardware: NVIDIA H100/B200, TPUs, and Cerebras"
schema_type: TechArticle
category: ai
language: en
confidence: medium
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
  - id: af-ai-ai-hardware-accelerators-1
    statement: The TPU paper analyzes a datacenter accelerator built for neural-network inference workloads.
    source_title: In-Datacenter Performance Analysis of a Tensor Processing Unit
    source_url: https://arxiv.org/abs/1704.04760
    confidence: medium
  - id: af-ai-ai-hardware-accelerators-2
    statement: >-
      Eyeriss presents a reconfigurable accelerator architecture designed for energy-efficient deep
      convolutional neural-network processing.
    source_title: "Eyeriss: An Energy-Efficient Reconfigurable Accelerator for Deep Convolutional Neural Networks"
    source_url: https://doi.org/10.1109/JSSC.2016.2616357
    confidence: medium
  - id: af-ai-ai-hardware-accelerators-3
    statement: >-
      Mixed precision training uses half-precision storage and computation techniques while
      preserving training stability with methods such as loss scaling.
    source_title: Mixed Precision Training
    source_url: https://arxiv.org/abs/1710.03740
    confidence: medium
completeness: 0.9
primary_sources:
  - id: ps-ai-ai-hardware-accelerators-1
    title: In-Datacenter Performance Analysis of a Tensor Processing Unit
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1704.04760
  - id: ps-ai-ai-hardware-accelerators-2
    title: "Eyeriss: An Energy-Efficient Reconfigurable Accelerator for Deep Convolutional Neural Networks"
    type: academic_paper
    year: 2016
    institution: IEEE Journal of Solid-State Circuits
    url: https://doi.org/10.1109/JSSC.2016.2616357
  - id: ps-ai-ai-hardware-accelerators-3
    title: Mixed Precision Training
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1710.03740
known_gaps:
  - Memory bandwidth wall in AI training
  - Optical interconnect for scale-up networking
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
AI hardware accelerators specialize computation for neural networks and related workloads. Important design themes include matrix multiplication throughput, data movement, memory bandwidth, precision formats, and energy efficiency.

## Core Explanation
General-purpose CPUs can run AI workloads, but accelerators are designed around the operations that dominate deep learning. Google's TPU is an example of a datacenter inference accelerator. Eyeriss illustrates energy-focused convolutional-network hardware design. Mixed-precision training shows why hardware support for lower-precision arithmetic can matter: it can reduce memory pressure and improve throughput while requiring numerical safeguards.

## Further Reading

- [Tensor Processing Unit paper](https://arxiv.org/abs/1704.04760)
- [Eyeriss](https://doi.org/10.1109/JSSC.2016.2616357)
- [Mixed Precision Training](https://arxiv.org/abs/1710.03740)
