---
id: optimization-algorithms
title: Optimization Algorithms for Deep Learning
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
  - id: f1
    statement: >-
      Adam (Kingma & Ba 2015, ICLR) combines momentum and adaptive learning rates per-parameter, becoming the most widely used optimizer in deep learning. It computes running averages of gradients
      (m_t) and squared gradients (v_t).
    source_title: "Kingma, Diederik P., and Jimmy Ba. Adam: A Method for Stochastic Optimization. ICLR 2015"
    source_url: https://arxiv.org/abs/1412.6980
    confidence: high
  - id: f2
    statement: >-
      AdamW (Loshchilov & Hutter 2019, ICLR) fixes Adam's weight decay implementation by decoupling it from the adaptive gradient update, improving generalization and becoming the default optimizer
      for Transformer training.
    source_title: Loshchilov, Ilya, and Frank Hutter. Decoupled Weight Decay Regularization. ICLR 2019
    source_url: https://arxiv.org/abs/1711.05101
    confidence: high
  - id: f3
    statement: >-
      Lion (Chen et al. 2023, Google) is a simpler optimizer using only sign operations, discovered through program search. It achieves 2-5× memory savings over AdamW while matching or exceeding its
      performance.
    source_title: Chen, Xiangning, et al. Symbolic Discovery of Optimization Algorithms. NeurIPS 2023
    source_url: https://arxiv.org/abs/2302.06675
    confidence: high
completeness: 0.9
known_gaps:
  - Second-order methods (KFAC, Shampoo)
  - Optimizer selection for specific architectures
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "Adam: A Method for Stochastic Optimization"
    type: academic_paper
    year: 2015
    url: https://arxiv.org/abs/1412.6980
    institution: ICLR
  - title: "SGDR: Stochastic Gradient Descent with Warm Restarts"
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1608.03983
    institution: ICLR
secondary_sources:
  - title: "Gradient Descent Algorithm Survey: From SGD to Adam to Lion — A Practical Configuration Guide for Deep Learning"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv
    url: https://arxiv.org/abs/2511.20725
  - title: "A Refined Lion Optimizer for Deep Learning: Faster Training with Lower Memory"
    type: journal_article
    year: 2025
    authors:
      - Chen, Xiangning
      - Liang, Chen
      - Huang, Da
      - et al.
    institution: Google / Nature Scientific Reports
    url: https://doi.org/10.1038/s41598-025-07112-4
  - title: "Adam: A Method for Stochastic Optimization (Seminal)"
    type: conference_paper
    year: 2015
    authors:
      - Kingma, Diederik P.
      - Ba, Jimmy
    institution: ICLR / Google / University of Toronto
    url: https://arxiv.org/abs/1412.6980
  - title: Decoupled Weight Decay Regularization (AdamW)
    type: conference_paper
    year: 2019
    authors:
      - Loshchilov, Ilya
      - Hutter, Frank
    institution: ICLR / University of Freiburg
    url: https://arxiv.org/abs/1711.05101
updated: "2026-05-24"
---
## TL;DR
Optimization algorithms update neural network weights to minimize the loss function. Adam dominates practice, but SGD with momentum remains competitive when well-tuned.

## Core Explanation
Gradient descent computes the average gradient over training data to update weights. SGD uses single examples or mini-batches for faster, noisier updates that often generalize better. Momentum accumulates past gradients to smooth updates and escape local minima. Adam adapts learning rates per-parameter.

## Detailed Analysis
AdamW (Loshchilov & Hutter, 2019) fixes Adam's weight decay implementation, making it the recommended variant. Learning rate warmup — gradually increasing from a small initial rate — prevents training instability in transformers. Gradient clipping prevents exploding gradients.

## Further Reading
- Ruder: An Overview of Gradient Descent Algorithms
- Lilian Weng: Optimization for Deep Learning
- PyTorch: torch.optim Documentation