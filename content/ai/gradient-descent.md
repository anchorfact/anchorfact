---
id: ""
title: ""
schema_type: TechArticle
category: ""
language: en
confidence: high
last_verified: ""
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
---



## TL;DR

Gradient descent is the fundamental optimization algorithm for training machine learning models. It iteratively adjusts parameters in the direction of steepest descent of the loss function. Variants: Batch GD (full dataset), Stochastic GD (single example), Mini-batch GD (small batches — standard).

## Core Explanation

Learning rate: controls step size — too small (slow convergence), too large (divergence). Momentum: accumulates past gradients for smoother steps. Adam optimizer: adaptive learning rates per parameter (combines momentum + RMSprop) — de facto standard (Kingma & Ba, 2014). Learning rate schedules: step decay, cosine annealing, warmup.

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
