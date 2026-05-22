---
id:"kb-2026-00268"
title:"Gradient Descent"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Deep Learning (Goodfellow, Bengio, Courville)"
    type:"book"
    year:2016
    url:"https://www.deeplearningbook.org/"
    institution:"MIT Press"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Gradient descent is the fundamental optimization algorithm for training machine learning models. It iteratively adjusts parameters in the direction of steepest descent of the loss function. Variants: Batch GD (full dataset), Stochastic GD (single example), Mini-batch GD (small batches — standard).

## Core Explanation

Learning rate: controls step size — too small (slow convergence), too large (divergence). Momentum: accumulates past gradients for smoother steps. Adam optimizer: adaptive learning rates per parameter (combines momentum + RMSprop) — de facto standard (Kingma & Ba, 2014). Learning rate schedules: step decay, cosine annealing, warmup.

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
