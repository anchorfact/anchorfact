---
id: "transformer-architecture-variants"
title: "Transformer Variants: From Encoder-Decoder to Mamba State Space Models"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-transformer-architecture-variants-1"
    statement: "The original Transformer (Vaswani et al., 2017) used encoder-decoder architecture. BERT (2018) popularized encoder-only for understanding; GPT (2018) established decoder-only for generation — the dominant design for modern LLMs."
    source_title: "Vaswani et al. (2017) / Devlin et al. (2019) / Radford et al. (2018)"
    confidence: "high"
  - id: "af-transformer-architecture-variants-2"
    statement: "Mamba (Gu & Dao, 2023) introduced selective state space models as an alternative to attention — achieving linear time complexity while matching Transformer performance on language modeling, potentially enabling 10x longer context windows at the same compute cost."
    source_title: "Gu & Dao, Mamba (2023)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
    type: "academic_paper"
    year: 2023
    url: "https://arxiv.org/abs/2312.00752"
    institution: "CMU/Princeton"
  - title: "Attention Is All You Need"
    type: "academic_paper"
    year: 2017
    url: "https://arxiv.org/abs/1706.03762"
    institution: "NeurIPS"

known_gaps:
  - "Hybrid attention-SSM architectures"
  - "Mamba for billion-parameter scale"

disputed_statements:
  - statement: "No major disputed statements identified"

---

## TL;DR
While the Transformer architecture dominates AI, alternatives are emerging. State Space Models (Mamba, Jamba) promise linear complexity for long sequences, challenging attention's O(n²) bottleneck.

## Core Explanation
Transformer evolution: encoder-decoder (original, T5) → encoder-only (BERT, RoBERTa — understanding) → decoder-only (GPT family — generation). Decoder-only's simplicity and predictable scaling made it the architecture of choice for frontier LLMs.

## Detailed Analysis
State Space Models (SSMs): discretize continuous-time differential equations to process sequences. Mamba adds input-dependent selectivity — the model dynamically adjusts which parts of the input to focus on. Jamba (AI21) hybridizes Mamba layers with attention layers for the best of both worlds.

## Further Reading
- The Annotated Transformer (Harvard NLP)
- Mamba GitHub
- Lilian Weng: The Transformer Family