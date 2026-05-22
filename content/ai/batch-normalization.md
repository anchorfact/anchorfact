---
id:"kb-2026-00283"
title:"Batch Normalization"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Batch Normalization: Accelerating Deep Network Training (Ioffe & Szegedy, 2015)"
    type: "paper"
    year: 2015
    url: "https://arxiv.org/abs/1502.03167"
    institution: "ICML"
    note: "The original Batch Normalization paper, 40,000+ citations on Google Scholar"
secondary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
    note: "Chapter 8: Optimization for Training Deep Models — covers Batch Normalization in context"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Batch Normalization (BN) normalizes layer inputs to zero mean and unit variance within each mini-batch, then scales and shifts with learnable parameters. Benefits: faster training (higher learning rates), reduces sensitivity to initialization, acts as regularizer (reduces need for dropout). BN is standard in most CNN architectures.

## Core Explanation

BN computes μ and σ² per mini-batch, normalizes, then applies γ*normalized + β (learnable). At inference: use running averages of μ and σ² (not batch statistics). Internal Covariate Shift: the phenomenon BN was designed to address (distribution of layer inputs changes during training). Layer Normalization (LN, used in Transformers) normalizes across features, not batch — works for variable batch sizes and RNNs.

## Further Reading

- [Batch Normalization: Accelerating Deep Network Training (Ioffe & Szegedy, 2015)](https://arxiv.org/abs/1502.03167)
