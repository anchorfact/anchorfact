---
id:"kb-2026-00283"
title:"Batch Normalization"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Batch Normalization: Accelerating Deep Network Training (Ioffe & Szegedy, 2015)"
    type:"paper"
    year:2015
    url:"https://arxiv.org/abs/1502.03167"
    institution:"ICML"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
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
