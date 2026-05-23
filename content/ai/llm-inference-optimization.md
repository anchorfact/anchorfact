---
id:"llm-inference-optimization"
title:"LLM Inference Optimization: From FlashAttention to Speculative Decoding"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-llm-inference-optimization-1"
    statement:"FlashAttention (Dao et al., Stanford, 2022) reduces attention computation from O(n²) memory to O(n) by tiling and recomputing attention in SRAM, enabling training of models with 8x longer sequences without approximation."
    source_title:"Dao et al., NeurIPS (2022)"
    confidence:"high"
  - id:"af-llm-inference-optimization-2"
    statement:"Speculative decoding (Leviathan et al., 2023) uses a small draft model to propose multiple tokens, then a large model verifies them in parallel — achieving 2-3x inference speedup with no quality loss."
    source_title:"Leviathan et al., ICML (2023)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"FlashAttention: Fast and Memory-Efficient Exact Attention"
    type:"academic_paper"
    year:2022
    url:"https://arxiv.org/abs/2205.14135"
    institution:"NeurIPS/Stanford"
  - title:"Fast Inference from Transformers via Speculative Decoding"
    type:"academic_paper"
    year:2023
    url:"https://arxiv.org/abs/2211.17192"
    institution:"ICML"

known_gaps:
  - "Sparse attention for ultra-long sequences"
  - "Multi-query speculative decoding"

disputed_statements:
  - statement:"No major disputed statements identified"

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