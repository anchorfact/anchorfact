---
id:"distributed-training-systems"
title:"Distributed Training: FSDP, DeepSpeed, and Scaling Laws"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
created_date:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
conflict_of_interest:"none_declared"
is_live_document:false
data_period:"static"

atomic_facts:
  - id:"af-distributed-training-systems-1"
    statement:"ZeRO (Zero Redundancy Optimizer, DeepSpeed/Microsoft, 2020) eliminates memory redundancy in data-parallel training across three stages: optimizer state partitioning (ZeRO-1), gradient partitioning (ZeRO-2), and parameter partitioning (ZeRO-3) — enabling training of 100B+ parameter models on commodity GPU clusters."
    source_title:"Rajbhandari et al., SC20 (2020)"
    confidence:"high"
  - id:"af-distributed-training-systems-2"
    statement:"Fully Sharded Data Parallel (FSDP, Meta/PyTorch, 2022) implements ZeRO-3 semantics natively in PyTorch, sharding model parameters, gradients, and optimizer states across all GPUs, enabling Llama 2 70B training on clusters without specialized infrastructure."
    source_title:"Zhao et al., PyTorch FSDP (2023)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"ZeRO: Memory Optimizations Toward Training Trillion Parameter Models"
    type:"academic_paper"
    year:2020
    url:"https://arxiv.org/abs/1910.02054"
    institution:"SC20/Microsoft"
  - title:"PyTorch Fully Sharded Data Parallel (FSDP)"
    type:"official_documentation"
    year:2023
    url:"https://pytorch.org/docs/stable/fsdp.html"
    institution:"Meta/PyTorch"

known_gaps:
  - "Heterogeneous hardware training (mixed GPU types)"
  - "Fault tolerance in month-long training runs"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
Training frontier AI models requires thousands of GPUs working in parallel. FSDP and DeepSpeed ZeRO are the dominant strategies for memory-efficient distributed training, enabling models with hundreds of billions of parameters.

## Core Explanation
Data parallelism: each GPU has a full model copy, processes different batch. Model parallelism: split layers across GPUs. Pipeline parallelism: GPUs process different micro-batches in assembly-line fashion. Tensor parallelism: split individual matrices across GPUs. 3D parallelism combines all three.

## Detailed Analysis
ZeRO-3 reduces per-GPU memory from 120GB to 1.5GB for a 100B model. Activation checkpointing trades compute for memory (recompute activations during backward pass). Mixed precision (FP16/BF16) halves memory. Gradient accumulation simulates larger batch sizes. The trend toward larger clusters: Meta's 24,576 H100 cluster for Llama 3 405B training.

## Further Reading
- DeepSpeed GitHub
- PyTorch Distributed Training Guide
- NVIDIA Megatron-LM