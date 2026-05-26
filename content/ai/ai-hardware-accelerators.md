---
id: ai-hardware-accelerators
title: "AI Hardware: NVIDIA H100/B200, TPUs, and Cerebras"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      Google's TPU (Jouppi et al. 2017, ISCA) was the first domain-specific accelerator for neural network inference, using systolic arrays for matrix multiplication and achieving 15-30× better
      performance/Watt than contemporary GPUs.
    source_title: Jouppi, Norman P., et al. In-Datacenter Performance Analysis of a Tensor Processing Unit. ISCA 2017
    source_url: https://doi.org/10.1145/3079856.3080246
    confidence: high
  - id: f2
    statement: >-
      NVIDIA introduced Tensor Cores in Volta (2017) providing mixed-precision matrix multiply-accumulate, and has since evolved through Turing, Ampere, Hopper (H100), and Blackwell (B200)
      architectures for DL acceleration.
    source_title: "NVIDIA. Tensor Core Architecture: From Volta to Blackwell. 2017-2024"
    source_url: https://www.nvidia.com/en-us/data-center/tensorcore/
    confidence: high
  - id: f3
    statement: >-
      Emerging memories (memristors, phase-change memory, STT-MRAM) promise in-memory computing for AI, potentially overcoming the von Neumann bottleneck. A 2024 Nature Review surveyed progress across
      resistive RAM, PCM, and spintronic technologies.
    source_title: Multiple authors. High-Speed Emerging Memories for AI Hardware Accelerators. Nature Reviews Electrical Engineering 2024
    source_url: https://doi.org/10.1038/s44287-023-00002-9
    confidence: high
completeness: 0.9
primary_sources:
  - title: NVIDIA H100 Tensor Core GPU Architecture
    type: official_documentation
    year: 2022
    url: https://resources.nvidia.com/en-us-tensor-core
    institution: NVIDIA
  - title: "Cerebras WSE-3: The Fastest AI Chip in the World"
    type: official_report
    year: 2024
    url: https://www.cerebras.net/product-chip/
    institution: Cerebras Systems
known_gaps:
  - Memory bandwidth wall in AI training
  - Optical interconnect for scale-up networking
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: A Survey on Deep Learning Hardware Accelerators for Heterogeneous HPC and Edge Computing
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3729215
  - title: "High-Speed Emerging Memories for AI Hardware Accelerators: A Comprehensive Review"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Nature Reviews Electrical Engineering
    url: https://doi.org/10.1038/s44287-023-00002-9
  - title: "Hardware for Deep Learning Acceleration: From GPUs to Neuromorphic Chips"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: Advanced Intelligent Systems (Wiley)
    url: https://doi.org/10.1002/aisy.202300762
  - title: "Performance and Efficiency Gains of NPU-Based AI Inference: A Systematic GPU vs. NPU Comparison"
    type: journal_article
    year: 2025
    authors:
      - multiple
    institution: Systems (MDPI)
    url: https://doi.org/10.3390/systems13090797
updated: "2026-05-24"
---
## TL;DR
AI hardware has become the primary bottleneck and enabler of AI progress. NVIDIA dominates the GPU market (H100→B200 pipeline); Google TPUs and Cerebras wafer-scale chips offer alternative architectures for specialized workloads.

## Core Explanation
GPU architecture: thousands of CUDA cores + Tensor Cores for matrix multiplication. H100 introduced Transformer Engine with FP8 precision. B200 added FP4 support (2x throughput) and NVLink 5 (1.8 TB/s). Memory bandwidth (3.35 TB/s on B200) limits training more than compute.

## Detailed Analysis
TPU v5p (Google, 2023): 459 TFLOPS BF16 per chip, connected via ICI (Inter-Chip Interconnect). Cerebras WSE-3 fits an entire LLM on one chip — no networking bottlenecks. The competitive landscape includes AMD MI300X, Intel Gaudi 3, and Chinese alternatives (Huawei Ascend 910B).

## Further Reading
- NVIDIA CUDA Programming Guide
- MLPerf Training Benchmarks
- SemiAnalysis: AI Hardware Reports

## Related Articles

- [Deep Learning Hardware: GPUs, TPUs, and AI Accelerator Architecture](../../computer-science/deep-learning-hardware-gpus-tpus-and-ai-accelerator-architecture.md)
