---
id: transformer-architecture-variants
title: "Transformer Variants: From Encoder-Decoder to State Space Models"
schema_type: TechArticle
category: ai
language: en
confidence: medium
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
  - id: fact-tv-1
    statement: The original Transformer introduced an encoder-decoder architecture based on multi-head attention and position-wise feed-forward layers.
    source_title: Attention Is All You Need
    source_url: https://arxiv.org/abs/1706.03762
    confidence: medium
  - id: fact-tv-2
    statement: Vision Transformer applies a standard Transformer directly to sequences of image patches for image classification.
    source_title: An Image is Worth 16x16 Words
    source_url: https://arxiv.org/abs/2010.11929
    confidence: medium
  - id: fact-tv-3
    statement: Swin Transformer introduced hierarchical shifted windows for efficient vision Transformer modeling.
    source_title: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows"
    source_url: https://arxiv.org/abs/2103.14030
    confidence: medium
  - id: fact-tv-4
    statement: Efficient Transformer research includes linear, sparse, low-rank, memory-compressed, and recurrent approaches for reducing long-sequence attention costs.
    source_title: "Efficient Transformers: A Survey"
    source_url: https://doi.org/10.1145/3530811
    confidence: medium
completeness: 0.9
known_gaps:
  - Hybrid attention and state-space architectures are evolving quickly
  - Large-scale production comparisons are not exhaustively covered
primary_sources:
  - title: Attention Is All You Need
    type: academic_paper
    year: 2017
    authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
    institution: NeurIPS
    url: https://arxiv.org/abs/1706.03762
  - title: An Image is Worth 16x16 Words
    type: academic_paper
    year: 2021
    authors:
      - Dosovitskiy, Alexey
      - Beyer, Lucas
      - Kolesnikov, Alexander
    institution: ICLR
    url: https://arxiv.org/abs/2010.11929
  - title: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows"
    type: academic_paper
    year: 2021
    authors:
      - Liu, Ze
      - Lin, Yutong
      - Cao, Yue
    institution: ICCV
    url: https://arxiv.org/abs/2103.14030
  - title: "Efficient Transformers: A Survey"
    type: academic_paper
    year: 2022
    authors:
      - Tay, Yi
      - Dehghani, Mostafa
      - Bahri, Dara
      - Metzler, Donald
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3530811
secondary_sources: []
updated: "2026-05-24"
---

## TL;DR

Transformer variants adapt the original attention-based architecture to different data types and scaling constraints. Major branches include encoder-decoder language models, encoder-only models, decoder-only models, vision Transformers, sparse or linear attention variants, and newer state-space alternatives.

## Core Explanation

The original Transformer used self-attention and cross-attention in an encoder-decoder architecture. Later variants changed the architecture for language understanding, autoregressive generation, vision tasks, and long-context efficiency. Vision Transformer treats image patches as tokens, while Swin Transformer adds hierarchical shifted windows. Efficient Transformer research studies ways to reduce the quadratic cost of standard attention on long sequences.

## Further Reading

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [An Image is Worth 16x16 Words](https://arxiv.org/abs/2010.11929)
- [Swin Transformer](https://arxiv.org/abs/2103.14030)
- [Efficient Transformers: A Survey](https://doi.org/10.1145/3530811)

## Related Articles

- [State Space Models: Mamba, Linear-Time Sequence Modeling, and Alternatives to Transformers](../state-space-models.md)
- [3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars](../3d-human-modeling.md)
- [AI Art and Creativity: Generative Models and Authorship](../ai-art-and-creativity.md)
