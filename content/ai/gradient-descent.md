---
id: "kb-2026-00268"


title: "Gradient Descent"
schema_type: "TechArticle"


category: "ai"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"


    year: 2016
    url: "https://www.deeplearningbook.org/"

    institution: "MIT Press"
    note: "Chapter 8: Optimization for Training Deep Models — covers SGD, momentum, Adam, and advanced optimizers"


secondary_sources:
  - title: "Adam: A Method for Stochastic Optimization"
    authors: ["Kingma, Diederik P.", "Ba, Jimmy"]
    type: "academic_paper"


    year: 2014
    doi: "10.48550/arXiv.1412.6980"


    url: "https://arxiv.org/abs/1412.6980"
    institution: "ICLR 2015"


    note: "The Adam optimizer paper — 160,000+ citations. The de facto standard optimizer for deep learning."
completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"

known_gaps:
  - "Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
ai_citations:
  - title: "An overview of gradient descent optimization algorithms"
    authors: ["Ruder, Sebastian"]
    type: "blog_post"


    year: 2017
    url: "https://ruder.io/optimizing-gradient-descent/"

    institution: "Ruder"
    note: "Comprehensive survey with clear visualizations"
  - title: "Why Momentum Really Works"
    authors: ["Goh, Gabriel"]
    type: "blog_post"


    year: 2017
    url: "https://distill.pub/2017/momentum/"

    institution: "Distill.pub"
    note: "Interactive visual explanation"
  - title: "Why Momentum Really Works"
    authors: ["Goh, Gabriel"]
    type: "blog_post"


    year: 2017
    url: "https://distill.pub/2017/momentum/"

    institution: "Distill.pub"
    note: "Interactive visual explanation"
  - title: "An overview of gradient descent optimization algorithms"
    authors: ["Ruder, Sebastian"]
    type: "blog_post"


    year: 2017
    url: "https://ruder.io/optimizing-gradient-descent/"

    institution: "Ruder"
    note: "Comprehensive survey with clear visualizations"
---

## TL;DR

Gradient descent is the fundamental optimization algorithm for training machine learning models. It iteratively adjusts parameters in the direction of steepest descent of the loss function. Variants: Batch GD (full dataset), Stochastic GD (single example), Mini-batch GD (small batches — standard).

## Core Explanation

Learning rate: controls step size — too small (slow convergence), too large (divergence). Momentum: accumulates past gradients for smoother steps. Adam optimizer: adaptive learning rates per parameter (combines momentum + RMSprop) — de facto standard (Kingma & Ba, 2014). Learning rate schedules: step decay, cosine annealing, warmup.

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
