---
id: embedding-model-selection-and-vector-distance
title: 'Embedding Model Selection and Vector Distance'
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
  - id: fact-embedding-model-selection-and-vector-distance-1
    statement: >-
      OpenAI embeddings documentation says an embedding is a vector of floating point numbers and distance between two vectors measures their relatedness.
    source_title: Vector embeddings - OpenAI API
    source_url: https://platform.openai.com/docs/guides/embeddings
  - id: fact-embedding-model-selection-and-vector-distance-2
    statement: >-
      OpenAI embeddings documentation says cosine similarity and Euclidean distance produce identical rankings for OpenAI embeddings because the embeddings are normalized to length 1.
    source_title: Vector embeddings - OpenAI API
    source_url: https://platform.openai.com/docs/guides/embeddings
  - id: fact-embedding-model-selection-and-vector-distance-3
    statement: >-
      Qdrant search documentation lists Dot product, Euclidean distance, and Cosine as available vector similarity metrics.
    source_title: Search - Qdrant
    source_url: https://qdrant.tech/documentation/search/search/
completeness: 0.84
known_gaps:
  - Actual retrieval quality must be measured on the target corpus because embedding model, metric, chunking, and reranking interact.
disputed_statements: []
primary_sources:
  - title: Vector embeddings - OpenAI API
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/embeddings
    institution: OpenAI
  - title: Search - Qdrant
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/search/search/
    institution: Qdrant
  - title: pgvector
    type: documentation
    year: 2026
    url: https://github.com/pgvector/pgvector
    institution: pgvector
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Embedding model selection determines how text, code, images, or other items are represented as vectors. Vector distance determines how the retrieval engine ranks similarity.

## Core Explanation

Good retrieval is not just "use embeddings." Engineers need to choose an embedding model that fits the domain and language, store vectors with compatible dimensionality, pick the distance metric expected by the model or database, and test recall on known answer-bearing examples. Normalized embeddings can make cosine, dot product, and Euclidean rankings equivalent in some systems, but that is a property to verify rather than assume.

## Source-Mapped Facts

- OpenAI embeddings documentation says an embedding is a vector of floating point numbers and distance between two vectors measures their relatedness. ([source](https://platform.openai.com/docs/guides/embeddings))
- OpenAI embeddings documentation says cosine similarity and Euclidean distance produce identical rankings for OpenAI embeddings because the embeddings are normalized to length 1. ([source](https://platform.openai.com/docs/guides/embeddings))
- Qdrant search documentation lists Dot product, Euclidean distance, and Cosine as available vector similarity metrics. ([source](https://qdrant.tech/documentation/search/search/))

## Further Reading

- [OpenAI vector embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Qdrant search metrics](https://qdrant.tech/documentation/search/search/)
- [pgvector](https://github.com/pgvector/pgvector)
