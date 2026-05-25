---
id: llm-inference-optimization
title: "LLM Inference Optimization: From FlashAttention to Speculative Decoding"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      vLLM (Kwon et al. 2023, UC Berkeley, SOSP) introduces PagedAttention — a virtual memory-inspired attention algorithm that reduces memory waste from KV-cache fragmentation by 80%, achieving 24×
      higher throughput than HuggingFace Transformers.
    source_title: Kwon, Woosuk, et al. Efficient Memory Management for Large Language Model Serving with PagedAttention. SOSP 2023
    source_url: https://arxiv.org/abs/2309.06180
    confidence: high
  - id: f2
    statement: >-
      FlashAttention (Dao et al. 2022, NeurIPS) reduces attention memory from O(N²) to O(N) via IO-aware tiling, and FlashAttention-2 (2023) further optimizes parallelism, achieving 2-4× speedup with
      no approximation.
    source_title: "Dao, Tri, et al. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. NeurIPS 2022"
    source_url: https://arxiv.org/abs/2205.14135
    confidence: high
  - id: f3
    statement: LLM.int8() (Dettmers et al. 2022, NeurIPS) enables 8-bit matrix multiplication for transformers with zero performance degradation by handling outlier features in FP16 and the rest in INT8.
    source_title: "Dettmers, Tim, et al. LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale. NeurIPS 2022"
    source_url: https://arxiv.org/abs/2208.07339
    confidence: high
completeness: 0.9
known_gaps:
  - Sparse attention for ultra-long sequences
  - Multi-query speculative decoding
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "FlashAttention: Fast and Memory-Efficient Exact Attention"
    type: academic_paper
    year: 2022
    url: https://arxiv.org/abs/2205.14135
    institution: NeurIPS/Stanford
  - title: Fast Inference from Transformers via Speculative Decoding
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2211.17192
    institution: ICML
secondary_sources:
  - title: Efficient Memory Management for Large Language Model Serving with PagedAttention (vLLM)
    type: conference_paper
    year: 2023
    authors:
      - Kwon, Woosuk
      - Li, Zhuohan
      - Zhuang, Siyuan
      - et al.
    institution: UC Berkeley / SOSP
    url: https://arxiv.org/abs/2309.06180
  - title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
    type: conference_paper
    year: 2022
    authors:
      - Dettmers, Tim
      - Lewis, Mike
      - Belkada, Younes
      - Zettlemoyer, Luke
    institution: Meta AI Research / NeurIPS
    url: https://arxiv.org/abs/2208.07339
  - title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
    type: conference_paper
    year: 2022
    authors:
      - Dao, Tri
      - Fu, Daniel Y.
      - Ermon, Stefano
      - Rudra, Atri
      - Ré, Christopher
    institution: Stanford / NeurIPS
    url: https://arxiv.org/abs/2205.14135
  - title: "A Survey on Efficient Inference for Large Language Models: Quantization, Pruning, and Distillation"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
updated: "2026-05-24"
---
## TL;DR
LLM inference optimization has made serving trillion-parameter models economically viable. FlashAttention eliminates the memory bottleneck; speculative decoding accelerates generation 2-3x; KV-cache optimization reduces memory by 8x.

## Core Explanation
Attention is the bottleneck: computing attention scores between all token pairs requires O(n²) memory. FlashAttention tiles this computation in fast SRAM. KV-cache stores past key/value vectors to avoid recomputation but consumes GBs of memory. Quantization compresses it to INT4/INT8.

## Detailed Analysis
Continuous batching (vLLM) maximizes GPU utilization by dynamically adding/removing requests. PagedAttention manages KV-cache like virtual memory. Tensor parallelism splits matrices across GPUs. Pipeline parallelism divides layers across devices. Mixture-of-Experts reduces active parameters per token.

## Further Reading
- FlashAttention GitHub
- vLLM Project
- NVIDIA TensorRT-LLM