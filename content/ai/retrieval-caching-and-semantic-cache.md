---
id: retrieval-caching-and-semantic-cache
title: 'Retrieval Caching and Semantic Cache'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-retrieval-caching-and-semantic-cache-1
    statement: >-
      Redis documentation describes a LangCacheSemanticCache class that uses exact search and semantic search options for LLM response caching.
    source_title: LLM Cache - RedisVL
    source_url: https://redis.io/docs/latest/develop/ai/redisvl/api/cache/
    confidence: medium
  - id: fact-retrieval-caching-and-semantic-cache-2
    statement: >-
      LlamaIndex documentation says each node and transformation pair in an ingestion pipeline is cached so later runs can reuse cached results.
    source_title: Ingestion Pipeline - LlamaIndex
    source_url: https://docs.llamaindex.ai/en/stable/module_guides/loading/ingestion_pipeline/
    confidence: medium
  - id: fact-retrieval-caching-and-semantic-cache-3
    statement: >-
      OpenSearch documentation says the index request cache stores frequently executed search query results at the shard level to reduce cluster load and improve response times.
    source_title: Index Request Cache - OpenSearch Documentation
    source_url: https://docs.opensearch.org/latest/search-plugins/caching/request-cache/
    confidence: medium
completeness: 0.82
known_gaps:
  - Cache correctness depends on invalidation, document freshness, query normalization, user permissions, and whether cached answers are rechecked against current sources.
disputed_statements: []
primary_sources:
  - title: LLM Cache - RedisVL
    type: documentation
    year: 2026
    url: https://redis.io/docs/latest/develop/ai/redisvl/api/cache/
    institution: Redis
  - title: Ingestion Pipeline - LlamaIndex
    type: documentation
    year: 2026
    url: https://docs.llamaindex.ai/en/stable/module_guides/loading/ingestion_pipeline/
    institution: LlamaIndex
  - title: Index Request Cache - OpenSearch Documentation
    type: documentation
    year: 2026
    url: https://docs.opensearch.org/latest/search-plugins/caching/request-cache/
    institution: OpenSearch
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Retrieval caching stores reusable retrieval or preprocessing results; semantic cache reuses results for similar prompts or queries rather than only exact string matches.

## Core Explanation

RAG systems repeat work: parsing documents, chunking, embedding, filtering, search requests, reranking, and answer synthesis. Caches reduce latency and cost, but they also introduce correctness risk when source documents, permissions, or query intent change.

Agent systems should separate ingestion caches, search result caches, and answer caches. The more a cache moves from exact retrieval artifacts toward generated answers, the stronger its invalidation, provenance, and permission checks need to be.

## Source-Mapped Facts

- Redis documentation describes a LangCacheSemanticCache class that uses exact search and semantic search options for LLM response caching. ([source](https://redis.io/docs/latest/develop/ai/redisvl/api/cache/))
- LlamaIndex documentation says each node and transformation pair in an ingestion pipeline is cached so later runs can reuse cached results. ([source](https://docs.llamaindex.ai/en/stable/module_guides/loading/ingestion_pipeline/))
- OpenSearch documentation says the index request cache stores frequently executed search query results at the shard level to reduce cluster load and improve response times. ([source](https://docs.opensearch.org/latest/search-plugins/caching/request-cache/))

## Further Reading

- [RedisVL LLM cache](https://redis.io/docs/latest/develop/ai/redisvl/api/cache/)
- [LlamaIndex ingestion pipeline](https://docs.llamaindex.ai/en/stable/module_guides/loading/ingestion_pipeline/)
- [OpenSearch index request cache](https://docs.opensearch.org/latest/search-plugins/caching/request-cache/)
