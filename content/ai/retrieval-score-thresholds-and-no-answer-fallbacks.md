---
id: retrieval-score-thresholds-and-no-answer-fallbacks
title: 'Retrieval Score Thresholds and No-Answer Fallbacks'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-retrieval-score-thresholds-and-no-answer-fallbacks-1
    statement: >-
      Qdrant documentation says the score_threshold search parameter excludes results whose score
      is worse than the given threshold.
    source_title: Qdrant Search
    source_url: https://qdrant.tech/documentation/concepts/search/
    confidence: medium
  - id: fact-ai-retrieval-score-thresholds-and-no-answer-fallbacks-2
    statement: >-
      Weaviate documentation says vector search results can be limited with a threshold such as a
      maximum cosine distance.
    source_title: Weaviate Vector Search Concepts
    source_url: https://docs.weaviate.io/weaviate/concepts/search/vector-search
    confidence: medium
  - id: fact-ai-retrieval-score-thresholds-and-no-answer-fallbacks-3
    statement: >-
      Elasticsearch documentation says search results can be filtered with boolean filter clauses
      or the post_filter parameter.
    source_title: Elasticsearch Filter Search Results
    source_url: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/filter-search-results
    confidence: medium
completeness: 0.81
known_gaps:
  - Score thresholds depend on embedding model, distance metric, normalization, reranker calibration, corpus freshness, query intent, and whether the application treats low evidence as a no-answer case.
disputed_statements: []
primary_sources:
  - title: Qdrant Search
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/concepts/search/
    institution: Qdrant
  - title: Weaviate Vector Search Concepts
    type: documentation
    year: 2026
    url: https://docs.weaviate.io/weaviate/concepts/search/vector-search
    institution: Weaviate
  - title: Elasticsearch Filter Search Results
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/filter-search-results
    institution: Elastic
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG systems need an explicit low-evidence path: score thresholds can suppress weak retrieval, but the answer layer still needs a no-answer fallback.

## Core Explanation

Similarity scores are not universal probabilities. A threshold that works for one embedding model, distance metric, corpus, or reranker can fail after an index rebuild or model upgrade. Agents should treat thresholds as calibrated system settings, not fixed truths.

For retrieval debugging, record the model, metric, raw score, threshold, filtered candidate count, reranker score, and fallback behavior. If every returned passage is below the acceptance threshold, the agent should cite no source and route to clarification, broader search, or external authoritative sources.

## Source-Mapped Facts

- Qdrant documentation says the score_threshold search parameter excludes results whose score is worse than the given threshold. ([source](https://qdrant.tech/documentation/concepts/search/))
- Weaviate documentation says vector search results can be limited with a threshold such as a maximum cosine distance. ([source](https://docs.weaviate.io/weaviate/concepts/search/vector-search))
- Elasticsearch documentation says search results can be filtered with boolean filter clauses or the post_filter parameter. ([source](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/filter-search-results))

## Further Reading

- [Qdrant Search](https://qdrant.tech/documentation/concepts/search/)
- [Weaviate Vector Search Concepts](https://docs.weaviate.io/weaviate/concepts/search/vector-search)
- [Elasticsearch Filter Search Results](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/filter-search-results)
