---
id:"ai-hardware-accelerators"
title:"AI Hardware: NVIDIA H100/B200, TPUs, and Cerebras"
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
  - id:"af-ai-hardware-accelerators-1"
    statement:"NVIDIA H100 (Hopper, 2022) delivers 1,979 TFLOPS (FP8) with 80GB HBM3. The B200 (Blackwell, 2024) doubles this to 4,500 TFLOPS (FP4) with 192GB HBM3e — providing 4x the training throughput of H100 for large language models."
    source_title:"NVIDIA H100/B200 Whitepapers (2022-2024)"
    confidence:"high"
  - id:"af-ai-hardware-accelerators-2"
    statement:"Cerebras WSE-3 (2024) is the largest chip ever built — 4 trillion transistors on a single wafer-scale chip with 900,000 AI cores and 44GB on-chip SRAM — designed to train models with trillions of parameters without distributed computing complexity."
    source_title:"Cerebras WSE-3 Technical Brief (2024)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"NVIDIA H100 Tensor Core GPU Architecture"
    type:"official_documentation"
    year:2022
    url:"https://resources.nvidia.com/en-us-tensor-core"
    institution:"NVIDIA"
  - title:"Cerebras WSE-3: The Fastest AI Chip in the World"
    type:"official_report"
    year:2024
    url:"https://www.cerebras.net/product-chip/"
    institution:"Cerebras Systems"

known_gaps:
  - "Memory bandwidth wall in AI training"
  - "Optical interconnect for scale-up networking"

disputed_statements:
  - statement:"No major disputed statements identified"

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