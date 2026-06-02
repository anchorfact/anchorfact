---
id: hnsw-vector-indexing
title: 'HNSW Vector Indexing'
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
  - id: fact-hnsw-vector-indexing-1
    statement: >-
      Qdrant indexing documentation says a vector index speeds up vector search and payload indexes speed up filtering.
    source_title: Indexing - Qdrant
    source_url: https://qdrant.tech/documentation/manage-data/indexing/
    confidence: medium
  - id: fact-hnsw-vector-indexing-2
    statement: >-
      pgvector documentation says HNSW indexes create a multilayer graph and have better query performance than IVFFlat with slower build times and higher memory use.
    source_title: pgvector HNSW Documentation
    source_url: https://github.com/pgvector/pgvector#hnsw
    confidence: medium
  - id: fact-hnsw-vector-indexing-3
    statement: >-
      OpenSearch k-NN documentation describes approximate k-NN indexes and exposes HNSW parameters such as m and ef_construction.
    source_title: k-NN Index - OpenSearch Documentation
    source_url: https://docs.opensearch.org/latest/search-plugins/knn/knn-index/
    confidence: medium
completeness: 0.82
known_gaps:
  - Recall, latency, and memory behavior depend on collection size, distance metric, filtering strategy, quantization, and index parameters.
disputed_statements: []
primary_sources:
  - title: Indexing - Qdrant
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/manage-data/indexing/
    institution: Qdrant
  - title: pgvector HNSW Documentation
    type: documentation
    year: 2026
    url: https://github.com/pgvector/pgvector#hnsw
    institution: pgvector
  - title: k-NN Index - OpenSearch Documentation
    type: documentation
    year: 2026
    url: https://docs.opensearch.org/latest/search-plugins/knn/knn-index/
    institution: OpenSearch
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

HNSW vector indexing uses a graph-based approximate nearest neighbor structure to make embedding retrieval fast enough for production RAG and semantic search workloads.

## Core Explanation

Embedding search compares a query vector against many stored vectors. Exhaustive search can become expensive as collections grow, so vector databases often use approximate indexes. HNSW builds a navigable graph that trades build time and memory for low-latency retrieval.

For agents, HNSW tuning affects what evidence appears in context. Search latency, recall, filter behavior, and memory footprint all matter because low-quality retrieval can make a model confident about the wrong source set.

## Source-Mapped Facts

- Qdrant indexing documentation says a vector index speeds up vector search and payload indexes speed up filtering. ([source](https://qdrant.tech/documentation/manage-data/indexing/))
- pgvector documentation says HNSW indexes create a multilayer graph and have better query performance than IVFFlat with slower build times and higher memory use. ([source](https://github.com/pgvector/pgvector#hnsw))
- OpenSearch k-NN documentation describes approximate k-NN indexes and exposes HNSW parameters such as m and ef_construction. ([source](https://docs.opensearch.org/latest/search-plugins/knn/knn-index/))

## Further Reading

- [Qdrant indexing](https://qdrant.tech/documentation/manage-data/indexing/)
- [pgvector HNSW](https://github.com/pgvector/pgvector#hnsw)
- [OpenSearch k-NN index](https://docs.opensearch.org/latest/search-plugins/knn/knn-index/)
