---
id: recommender-systems
title: "Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-recommender-systems-1
    statement: >-
      Nature Scientific Reports (August 2025) conducted an extensive experimental comparison of collaborative filtering models — evaluating neural collaborative filtering, graph-based models
      (LightGCN, NGCF), and traditional matrix factorization — finding that GNN-based models achieve 8-15% improvement in recall@20 and NDCG@20 on large-scale datasets (Amazon, Yelp, MovieLens-20M),
      with the gains primarily driven by capturing high-order connectivity patterns in user-item interaction graphs beyond simple co-occurrence.
    source_title: "Nature Scientific Reports (2025) — Collaborative filtering models: experimental and detailed comparison — doi:10.1038/s41598-025-15096-4"
    source_url: https://www.nature.com/articles/s41598-025-15096-4
    confidence: high
  - id: af-recommender-systems-2
    statement: >-
      The 2025-2026 recommender systems landscape (SIGIR 2026, ScienceDirect FIGNNCF 2026) is defined by three trends: LLM-based generative recommendation (LLMs directly outputting recommended items
      as tokens), feature-integrated GNNs (combining collaborative signals with item content features), and trustworthy recommendation (robustness against shilling attacks, fairness across user
      groups, and explainability of recommendations).
    source_title: SIGIR 2026 recommender systems papers / ScienceDirect FIGNNCF (2026) / AAAI 2025 Trust-GRS
    source_url: https://www.sciencedirect.com/science/article/pii/S0925231225026980
    confidence: high
primary_sources:
  - id: ps-recommender-systems-1
    title: "Collaborative filtering models: an experimental and detailed comparison of neural and graph-based approaches"
    type: academic_paper
    year: 2025
    institution: Nature Scientific Reports
    doi: 10.1038/s41598-025-15096-4
    url: https://www.nature.com/articles/s41598-025-15096-4
  - id: ps-recommender-systems-2
    title: "FIGNNCF: Feature Integrated Graph Neural Network based Collaborative Filtering for Sequential Recommendation"
    type: academic_paper
    year: 2026
    institution: Neurocomputing / Elsevier
    url: https://www.sciencedirect.com/science/article/pii/S0925231225026980
known_gaps:
  - Cold-start recommendation for new users/items without interaction history
  - Causal recommendation — distinguishing correlation from causation in user behavior
disputed_statements: []
secondary_sources:
  - title: "Deep Learning for Recommender Systems: A Comprehensive Survey"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: A Survey on Large Language Models for Recommendation
    type: survey_paper
    year: 2024
    authors:
      - Wu, Likang
      - Zheng, Zhi
      - Qiu, Zhaopeng
      - et al.
    institution: arXiv / WWW Journal
    url: https://arxiv.org/abs/2305.19860
  - title: Matrix Factorization Techniques for Recommender Systems (Netflix Prize Paper)
    type: journal_article
    year: 2009
    authors:
      - Koren, Yehuda
      - Bell, Robert
      - Volinsky, Chris
    institution: AT&T Labs / IEEE Computer
    url: https://doi.org/10.1109/MC.2009.263
  - title: Deep Neural Networks for YouTube Recommendations
    type: conference_paper
    year: 2016
    authors:
      - Covington, Paul
      - Adams, Jay
      - Sargin, Emre
    institution: Google / RecSys
    url: https://doi.org/10.1145/2959100.2959190
updated: "2026-05-24"
---
## TL;DR
Recommender systems power the discovery engine of the internet — from Netflix suggestions to Amazon product recommendations and TikTok's For You page. Graph neural networks have become the dominant architecture, while LLMs are opening a new paradigm of generative recommendation where AI creates personalized suggestions from natural conversation.

## Core Explanation
Classical approaches: (1) Collaborative filtering (CF) — "users who liked X also liked Y." Matrix factorization decomposes the sparse user-item interaction matrix into low-rank user and item embeddings; (2) Content-based — recommend items similar to what the user previously liked based on item features (genre, keywords, author); (3) Hybrid — combine both. Neural CF (He et al., 2017) replaced dot product with learned neural scoring. Graph neural CF: users and items are nodes in a bipartite graph; GNN layers aggregate information from neighbors — LightGCN simplifies GCN by removing non-linearities and feature transformations, keeping only neighborhood aggregation. Sequential recommendation: the order of interactions matters — GRU4Rec, SASRec (self-attention), and BERT4Rec model user behavior sequences as language-like patterns.

## Detailed Analysis
Nature 2025 comparison: tested 6 model families on 5 datasets. Key finding — GNN-based approaches (LightGCN, NGCF) consistently outperform traditional MF and neural CF on ranking metrics, with diminishing returns beyond 3-4 message-passing layers (over-smoothing). FIGNNCF (2026) integrates item features (text descriptions, categories, images) into the GNN propagation, achieving 12% improvement over pure collaborative GNNs. LLM-based recommendation (SIGIR 2026): three paradigms — (1) LLM as feature encoder (LLM-generated item descriptions enrich GNN input); (2) LLM as ranker (prompt: "Given user history [items], rank these candidates"); (3) Generative recommendation (P5, InstructRec) — LLM directly generates recommended item IDs as tokens. Cold-start problem remains the Achilles' heel: new users and items have no interactions. Solutions: meta-learning (learn to adapt from few examples), cross-domain transfer, and content-based bootstrapping. Trustworthy recommendation (AAAI 2025): detecting shilling attacks (fake reviews boosting products), ensuring demographic fairness, and generating explanations for recommendations to build user trust.

## Further Reading
- LightGCN: Simplifying and Powering Graph Convolution Network for Recommendation (He et al., SIGIR 2020)
- P5: Pretraining with Prompts for Recommendation (Geng et al., RecSys 2022)
- RecBole: Unified Recommender Systems Library
