---
id: recommender-systems
title: "Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-recommender-systems-1
    statement: >-
      Matrix factorization models user-item interactions through latent factors for recommender
      systems.
    source_title: Matrix Factorization Techniques for Recommender Systems
    source_url: https://doi.org/10.1109/MC.2009.263
    confidence: medium
  - id: af-ai-recommender-systems-2
    statement: >-
      Neural Collaborative Filtering replaces fixed inner-product interaction functions with neural
      network modeling.
    source_title: Neural Collaborative Filtering
    source_url: https://arxiv.org/abs/1708.05031
    confidence: medium
  - id: af-ai-recommender-systems-3
    statement: >-
      The YouTube recommendation paper describes a large-scale deep neural network system for
      candidate generation and ranking.
    source_title: Deep Neural Networks for YouTube Recommendations
    source_url: https://dl.acm.org/doi/10.1145/2959100.2959190
    confidence: medium
primary_sources:
  - id: ps-ai-recommender-systems-1
    title: Matrix Factorization Techniques for Recommender Systems
    type: academic_paper
    year: 2009
    institution: IEEE Computer
    url: https://doi.org/10.1109/MC.2009.263
  - id: ps-ai-recommender-systems-2
    title: Neural Collaborative Filtering
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1708.05031
  - id: ps-ai-recommender-systems-3
    title: Deep Neural Networks for YouTube Recommendations
    type: academic_paper
    year: 2016
    institution: ACM RecSys
    url: https://dl.acm.org/doi/10.1145/2959100.2959190
known_gaps:
  - Cold-start recommendation for new users/items without interaction history
  - Causal recommendation — distinguishing correlation from causation in user behavior
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation: Recommender systems rank or suggest items such as products, videos, posts, songs, or articles based on user, item, and context signals.

## Core Explanation
Core approaches include collaborative filtering, matrix factorization, neural recommenders, sequence models, and large-scale ranking systems. Quality must consider relevance, diversity, feedback loops, fairness, privacy, and evaluation bias.

## Further Reading

- [Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Neural Collaborative Filtering](https://arxiv.org/abs/1708.05031)
- [Deep Neural Networks for YouTube Recommendations](https://dl.acm.org/doi/10.1145/2959100.2959190)
