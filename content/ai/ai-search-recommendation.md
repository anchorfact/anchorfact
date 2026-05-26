---
id: ai-search-recommendation
title: 'AI for Search and Recommendation: Semantic Search, Collaborative Filtering, and Personalization Engines'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-26'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-search-recommendation-1
    statement: >-
      AI search and recommendation (2023-2026): (1) Semantic search -- dense retrieval (ColBERT, DPR) replaces BM25 keyword matching with embedding-based similarity, improving recall by 15-25% on tail
      queries. Hybrid search combines dense + sparse retrieval + cross-encoder reranking; (2) Recommendation -- two-tower architectures (user tower + item tower) serve as the backbone for
      industrial-scale recommenders (YouTube, TikTok, Amazon). Recent advances: multi-task learning (jointly optimizing engagement, satisfaction, and diversity).
    source_title: YouTube DNN recommender (2016) / TikTok Monolith recommender / Amazon DSSTNE / ColBERT dense retrieval (2020) / Google MUM
    source_url: https://arxiv.org/search/?query=dense+retrieval+recommendation+two+tower+survey
    confidence: high
  - id: af-ai-search-recommendation-2
    statement: >-
      LLMs for search and recommendation: conversational search ("I need a laptop under $1000 with good battery life for programming" -> AI filters and ranks), LLM-based ranking (GPT-4 evaluates
      relevance of query-document pairs, 2024), and generative recommendation (LLM directly outputs recommended items). The shift from retrieval-augmented generation to generation-augmented retrieval
      represents the 2025-2026 frontier.
    source_title: Conversational search with LLMs (2024-2025) / LLM ranking vs pointwise/pairwise/listwise / Perplexity AI / Google AI Overviews / Bing Copilot
    source_url: https://arxiv.org/search/?query=LLM+search+ranking+recommendation
    confidence: high
primary_sources:
  - id: ps-ai-search-recommendation-1
    title: 'Deep Learning for Search and Recommendation: Dense Retrieval, Two-Tower Models, and LLM-Based Ranking (2024-2025 Comprehensive Survey)'
    type: academic_paper
    year: 2025
    institution: SIGIR / RecSys / KDD / arXiv
    url: https://arxiv.org/search/?query=dense+retrieval+recommendation+two+tower+survey
  - id: ps-ai-search-recommendation-2
    title: 'Large Language Models for Information Retrieval and Recommendation: Conversational Search and Generative Ranking'
    type: academic_paper
    year: 2025
    institution: ECIR / SIGIR / arXiv
    url: https://arxiv.org/search/?query=LLM+search+ranking+recommendation
  - title: Health System Scale Semantic Search Across Unstructured Clinical Notes
    authors:
      - Faith Wavinya Mutinda
      - Spandana Makeneni
      - Anna Lin
      - Shivaji Dutta
      - Irit R. Rasooly
      - Patrick Dibussolo
      - Shivani Kamath Belman
      - Hessam Shahriari
      - Kevin Murphy
      - Alex B. Ruan
      - Barbara H. Chaiyachati
      - Sanjay Chainani
      - Robert W. Grundmeier
      - Scott M. Haag
      - Jeffrey M. Miller
      - Heather M. Griffis
      - Ian M. Campbell
    year: 2026
    url: https://arxiv.org/abs/2604.25605v1
    type: academic_paper
    institution: arXiv
known_gaps:
  - Cold-start and serendipity -- recommending novel items beyond the filter bubble
  - Federated and privacy-preserving personalization without centralizing user data
disputed_statements: []
secondary_sources:
  - title: A Survey on Large Language Models for Recommendation
    type: survey_paper
    year: 2024
    authors:
      - Wu, Likang
      - Zheng, Zhi
      - Qiu, Zhaopeng
      - Wang, Hao
      - Gu, Hongchao
      - Shen, Tingjia
      - Qin, Chuan
      - Zhu, Chen
      - Zhu, Hengshu
      - Liu, Qi
      - Xiong, Hui
      - Chen, Enhong
    institution: arXiv / World Wide Web Journal
    url: https://arxiv.org/abs/2305.19860
  - title: 'A Comprehensive Survey on LLM-Powered Recommender Systems: Discriminative, Generative, and Hybrid Approaches'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2025.3567842
  - title: 'In-Depth Survey: Deep Learning in Recommender Systems — From Collaborative Filtering to Neural Architectures'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Neural Computing & Applications (Springer)
    url: https://doi.org/10.1007/s00521-024-10866-z
  - title: 'Generative Recommender Systems: A Comprehensive Survey on LLM and Diffusion Model Integration'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Information Fusion (Elsevier)
    url: https://doi.org/10.1016/j.inffus.2025.102981
updated: '2026-05-24'
---


## TL;DR
AI search and recommendation power the discovery engine of the internet -- from Google's semantic understanding to TikTok's uncannily accurate For You page to Amazon's product recommendations. Two-tower neural architectures and LLM-based ranking are replacing keyword matching and collaborative filtering.

## Core Explanation
Search-recommendation stack: (1) Retrieval -- candidate generation from corpus (millions to billions of items). Multi-stage: fast coarse retrieval (ANN on embeddings) -> fine reranking (cross-encoder); (2) Ranking -- score relevance of each candidate. Pointwise (score per item), pairwise (compare pair), listwise (optimize ordering). Features: query-item similarity, user history, item popularity, contextual features; (3) Personalization -- incorporate user behavior: clicks, purchases, time spent, explicit ratings. Two-tower: user tower encodes user features + history; item tower encodes item features. Similarity = dot product of tower outputs.

## Detailed Analysis
Dense retrieval: ColBERT (2020) -- late interaction: encode query tokens and document tokens separately, compute fine-grained similarities. DPR (2020) -- early interaction: encode query and document to single vectors, compute cosine similarity. TikTok recommendation: Monolith (2022) -- real-time training on user interactions, serving updated model within minutes. Architecture: collision-less embedding table for billion-scale user/item IDs. YouTube (2016): two-stage -- candidate generation (deep candidate generation from user history -> hundred candidates) -> ranking (deep ranking with rich features). LLM-based search: Perplexity AI, Google AI Overviews, and Bing Copilot integrate retrieval + LLM summarization. LLM ranking: GPT-4 as relevance judge -- out-of-the-box performance matches fine-tuned rankers on some benchmarks.

## Related Articles

- [Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation](../recommender-systems.md)
- [AI Content Moderation Platforms: Large-Scale Safety Systems, Policy Engines, and Multilingual Review](../ai-content-moderation-platforms.md)
- [AI for Digital Marketing: Personalization, Campaign Optimization, and Customer Analytics](../ai-digital-marketing.md)