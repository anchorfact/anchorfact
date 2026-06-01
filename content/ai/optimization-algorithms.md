---
id: optimization-algorithms
title: "Optimization Algorithms for Deep Learning: SGD, Adam, AdamW, and Lion"
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-06-01"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.82
atomic_facts:
  - id: f1
    statement: >-
      Adam combines first-moment and second-moment estimates of gradients to adapt per-parameter learning rates during stochastic optimization.
    source_title: "Adam: A Method for Stochastic Optimization"
    source_url: https://arxiv.org/abs/1412.6980
    confidence: medium
  - id: f2
    statement: >-
      AdamW decouples weight decay from the gradient-based update, addressing a mismatch between L2 regularization and adaptive optimizers.
    source_title: "Decoupled Weight Decay Regularization"
    source_url: https://arxiv.org/abs/1711.05101
    confidence: medium
  - id: f3
    statement: >-
      SGDR introduced cosine annealing learning-rate schedules with warm restarts for stochastic gradient descent.
    source_title: "SGDR: Stochastic Gradient Descent with Warm Restarts"
    source_url: https://arxiv.org/abs/1608.03983
    confidence: medium
  - id: f4
    statement: >-
      Lion is an optimizer discovered through symbolic program search that uses sign operations in its update rule.
    source_title: "Symbolic Discovery of Optimization Algorithms"
    source_url: https://arxiv.org/abs/2302.06675
    confidence: medium
primary_sources:
  - id: ps-optimization-algorithms-1
    title: "Adam: A Method for Stochastic Optimization"
    type: conference_paper
    year: 2015
    institution: ICLR
    url: https://arxiv.org/abs/1412.6980
  - id: ps-optimization-algorithms-2
    title: "Decoupled Weight Decay Regularization"
    type: conference_paper
    year: 2019
    institution: ICLR
    url: https://arxiv.org/abs/1711.05101
  - id: ps-optimization-algorithms-3
    title: "SGDR: Stochastic Gradient Descent with Warm Restarts"
    type: conference_paper
    year: 2017
    institution: ICLR
    url: https://arxiv.org/abs/1608.03983
  - id: ps-optimization-algorithms-4
    title: "Symbolic Discovery of Optimization Algorithms"
    type: conference_paper
    year: 2023
    institution: NeurIPS
    url: https://arxiv.org/abs/2302.06675
known_gaps:
  - Second-order and large-batch optimizers are outside this short article.
  - Recommended hyperparameters depend on architecture, data, batch size, and training budget.
disputed_statements: []
secondary_sources:
  - title: "An Overview of Gradient Descent Optimization Algorithms"
    type: blog_post
    year: 2016
    institution: Independent
    url: https://www.ruder.io/optimizing-gradient-descent/
  - title: "torch.optim"
    type: documentation
    year: 2026
    institution: PyTorch
    url: https://pytorch.org/docs/stable/optim.html
updated: "2026-06-01"
---

## TL;DR

Optimizers are the update rules that turn gradients into model-parameter changes. For agent builders, optimizer details matter when training or fine-tuning models, but they also provide a useful general lesson: performance claims are meaningless without the learning rate schedule, batch size, model size, and evaluation setup.

## Core Explanation

Stochastic gradient descent updates parameters using gradients from mini-batches. Momentum smooths noisy updates by carrying part of the previous update forward. Adam adds adaptive per-parameter scaling based on moving averages of gradients and squared gradients. AdamW separates weight decay from the adaptive gradient update, which is why it is common in Transformer training recipes.

Learning-rate schedules can matter as much as the optimizer choice. Warmup can stabilize early training, cosine decay can reduce the learning rate smoothly, and restarts can periodically raise it again. A change in optimizer should be evaluated with its schedule, regularization, and batch-size assumptions, not as an isolated name.

## Agent Notes

- When comparing training runs, log optimizer, learning rate, schedule, batch size, weight decay, gradient clipping, and random seed.
- For fine-tuning language models, start from the model provider's recommended optimizer settings before changing many variables at once.
- Treat optimizer changes as experiments with an eval plan, not as guaranteed improvements.
- If an agent proposes a training recipe, require reproducible configuration before accepting the result.

## Related Articles

- [Gradient Descent: The Workhorse of Machine Learning Optimization](../gradient-descent.md)
- [Transformer Architecture](../transformer.md)
- [Efficient and Green AI: Measuring Cost, Energy, and Deployment Tradeoffs](../efficient-green-ai.md)
