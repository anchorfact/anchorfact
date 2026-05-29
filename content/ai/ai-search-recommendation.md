---
id: ai-search-recommendation
title: 'AI for Search and Recommendation: Semantic Search, Collaborative Filtering, and Personalization Engines'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.77
known_gaps:
  - This article explains retrieval and recommendation methods rather than ranking any commercial product.
  - Search quality depends on corpus, query mix, freshness, latency budget, evaluation metrics, and user feedback loops.
disputed_statements:
  - statement: Recommender-system optimization can improve relevance while also raising separate concerns about diversity, bias, and user control.
atomic_facts:
  - id: af-ai-search-recommendation-1
    statement: Dense Passage Retrieval uses dense vector representations for questions and passages to retrieve evidence for open-domain question answering.
    source_title: Dense Passage Retrieval for Open-Domain Question Answering
    source_url: https://arxiv.org/abs/2004.04906
    confidence: medium
  - id: af-ai-search-recommendation-2
    statement: ColBERT represents queries and documents with contextual token embeddings and uses late interaction for efficient passage search.
    source_title: 'ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT'
    source_url: https://arxiv.org/abs/2004.12832
    confidence: medium
  - id: af-ai-search-recommendation-3
    statement: Neural Collaborative Filtering models user-item interactions with neural-network architectures instead of relying only on inner-product matrix factorization.
    source_title: Neural Collaborative Filtering
    source_url: https://arxiv.org/abs/1708.05031
    confidence: medium
  - id: af-ai-search-recommendation-4
    statement: A 2024 survey describes LLM-based recommender systems as an emerging area spanning discriminative, generative, and hybrid approaches.
    source_title: A Survey on Large Language Models for Recommendation
    source_url: https://arxiv.org/abs/2305.19860
    confidence: medium
primary_sources:
  - title: Dense Passage Retrieval for Open-Domain Question Answering
    authors:
      - Karpukhin, Vladimir
      - Oguz, Barlas
      - Min, Sewon
      - Lewis, Patrick
      - Wu, Ledell
      - Edunov, Sergey
      - Chen, Danqi
      - Yih, Wen-tau
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2004.04906
    institution: arXiv
  - title: 'ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT'
    authors:
      - Khattab, Omar
      - Zaharia, Matei
    type: conference_paper
    year: 2020
    url: https://arxiv.org/abs/2004.12832
    institution: SIGIR
  - title: Neural Collaborative Filtering
    authors:
      - He, Xiangnan
      - Liao, Lizi
      - Zhang, Hanwang
      - Nie, Liqiang
      - Hu, Xia
      - Chua, Tat-Seng
    type: conference_paper
    year: 2017
    url: https://arxiv.org/abs/1708.05031
    institution: WWW
  - title: A Survey on Large Language Models for Recommendation
    type: survey_paper
    year: 2024
    url: https://arxiv.org/abs/2305.19860
    institution: arXiv
secondary_sources:
  - title: Deep Neural Networks for YouTube Recommendations
    type: conference_paper
    year: 2016
    url: https://dl.acm.org/doi/10.1145/2959100.2959190
    institution: RecSys
---

## TL;DR

AI search and recommendation systems usually combine retrieval, ranking, and personalization. Dense retrieval and late-interaction search help find candidates, while recommender models learn from user-item interactions and feedback.

## Core Explanation

Search starts with a query and a corpus. Dense retrieval maps queries and passages into vectors, while late-interaction methods such as ColBERT keep token-level matching signals. Recommendation starts with users, items, and behavior data; neural collaborative filtering is one way to model user-item interactions beyond simple matrix factorization.

LLMs add new interfaces and ranking signals, but they do not replace evaluation. Search and recommendation systems still need offline relevance tests, online experiments, safety controls, freshness checks, and transparency about personalization.

## Further Reading

- [Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [ColBERT](https://arxiv.org/abs/2004.12832)
- [Neural Collaborative Filtering](https://arxiv.org/abs/1708.05031)
- [LLMs for Recommendation Survey](https://arxiv.org/abs/2305.19860)

## Related Articles

- [Recommender Systems](./recommender-systems.md)
- [AI Search Engines](./ai-search-engines.md)
- [Federated Learning](./federated-learning.md)
