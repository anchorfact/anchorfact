---
id: transformer-architecture-variants
title: "Transformer Variants: From Encoder-Decoder to Mamba State Space Models"
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
  - id: fact-tv-1
    statement: >-
      The original Transformer (Vaswani et al. 2017) introduced the encoder-decoder architecture with multi-head self-attention, replacing recurrence entirely and enabling parallel computation across
      all positions.
    source_title: Vaswani, Ashish, et al. Attention Is All You Need. NeurIPS 2017
    source_url: https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf
    confidence: high
  - id: fact-tv-2
    statement: >-
      Vision Transformer (ViT, Dosovitskiy et al. 2021, Google) applies a pure Transformer to sequences of image patches, achieving state-of-the-art on image classification when pre-trained on large
      datasets.
    source_title: Dosovitskiy, Alexey, et al. An Image is Worth 16x16 Words. ICLR 2021
    source_url: https://arxiv.org/abs/2010.11929
    confidence: high
  - id: fact-tv-3
    statement: Swin Transformer (Liu et al. 2021, Microsoft, ICCV Best Paper) introduced hierarchical shifted windows for efficient vision Transformers, enabling linear complexity relative to image size.
    source_title: "Liu, Ze, et al. Swin Transformer: Hierarchical Vision Transformer using Shifted Windows. ICCV 2021"
    source_url: https://arxiv.org/abs/2103.14030
    confidence: high
  - id: fact-tv-4
    statement: Efficient Transformers (Tay et al. 2022, Google) survey categorizes linear, sparse, and recurrent attention variants that reduce the O(N²) complexity barrier for long sequences.
    source_title: "Tay, Yi, et al. Efficient Transformers: A Survey. ACM Computing Surveys 2022"
    source_url: https://doi.org/10.1145/3530811
    confidence: high
completeness: 0.9
primary_sources:
  - title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2312.00752
    institution: CMU/Princeton
  - title: Attention Is All You Need
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1706.03762
    institution: NeurIPS
known_gaps:
  - Hybrid attention-SSM architectures
  - Mamba for billion-parameter scale
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: Attention Is All You Need (Original Transformer)
    type: conference_paper
    year: 2017
    authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
      - et al.
    institution: Google Brain / NeurIPS
    url: https://arxiv.org/abs/1706.03762
  - title: "Efficient Transformers: A Comprehensive Survey of Linear, Sparse, and Recurrent Attention Variants"
    type: survey_paper
    year: 2022
    authors:
      - Tay, Yi
      - Dehghani, Mostafa
      - Bahri, Dara
      - Metzler, Donald
    institution: Google Research / ACM Computing Surveys
    url: https://doi.org/10.1145/3530811
  - title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)"
    type: conference_paper
    year: 2021
    authors:
      - Dosovitskiy, Alexey
      - Beyer, Lucas
      - Kolesnikov, Alexander
      - et al.
    institution: Google Research / ICLR
    url: https://arxiv.org/abs/2010.11929
  - title: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows (ICCV Best Paper)"
    type: conference_paper
    year: 2021
    authors:
      - Liu, Ze
      - Lin, Yutong
      - Cao, Yue
      - et al.
    institution: Microsoft Research / ICCV
    url: https://arxiv.org/abs/2103.14030
updated: "2026-05-24"
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