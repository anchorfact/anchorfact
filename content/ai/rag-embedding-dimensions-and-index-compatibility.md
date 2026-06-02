---
id: rag-embedding-dimensions-and-index-compatibility
title: 'RAG Embedding Dimensions and Index Compatibility'
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
  - id: fact-ai-rag-embedding-dimensions-and-index-compatibility-1
    statement: >-
      Pinecone documentation describes the create index API as taking a dimension value for
      the vectors stored in the index.
    source_title: Pinecone Create Index
    source_url: https://docs.pinecone.io/reference/create_index/
    confidence: medium
  - id: fact-ai-rag-embedding-dimensions-and-index-compatibility-2
    statement: >-
      Qdrant documentation describes vector size as the dimensionality of vectors for a
      collection.
    source_title: Qdrant Vectors
    source_url: https://qdrant.tech/documentation/manage-data/vectors/
    confidence: medium
  - id: fact-ai-rag-embedding-dimensions-and-index-compatibility-3
    statement: >-
      Weaviate documentation describes vector indexes as enabling similarity search over
      stored vectors.
    source_title: Weaviate Vector Index
    source_url: https://docs.weaviate.io/weaviate/concepts/vector-index
    confidence: medium
completeness: 0.83
known_gaps:
  - Compatibility depends on embedding model dimensions, metric choice, normalization, multi-vector schemas, migration strategy, and whether old and new embeddings coexist during reindexing.
disputed_statements: []
primary_sources:
  - title: Pinecone Create Index
    type: documentation
    year: 2026
    url: https://docs.pinecone.io/reference/create_index/
    institution: Pinecone
  - title: Qdrant Vectors
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/manage-data/vectors/
    institution: Qdrant
  - title: Weaviate Vector Index
    type: documentation
    year: 2026
    url: https://docs.weaviate.io/weaviate/concepts/vector-index
    institution: Weaviate
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Embedding dimensions and index configuration must match, or RAG ingestion and retrieval can fail or silently mix incompatible vectors.

## Core Explanation

Vector stores are configured around assumptions about vector dimensionality and distance metric. If an agent switches embedding models without reindexing or migration, new vectors may not fit the existing index or may be compared under the wrong metric.

Agents should inspect index dimension, vector field schema, embedding model version, metric, normalization, and whether a backfill completed. Reindexing is often part of a model upgrade, not an optional cleanup step.

## Source-Mapped Facts

- Pinecone documentation describes the create index API as taking a dimension value for the vectors stored in the index. ([source](https://docs.pinecone.io/reference/create_index/))
- Qdrant documentation describes vector size as the dimensionality of vectors for a collection. ([source](https://qdrant.tech/documentation/manage-data/vectors/))
- Weaviate documentation describes vector indexes as enabling similarity search over stored vectors. ([source](https://docs.weaviate.io/weaviate/concepts/vector-index))

## Further Reading

- [Pinecone Create Index](https://docs.pinecone.io/reference/create_index/)
- [Qdrant Vectors](https://qdrant.tech/documentation/manage-data/vectors/)
- [Weaviate Vector Index](https://docs.weaviate.io/weaviate/concepts/vector-index)
