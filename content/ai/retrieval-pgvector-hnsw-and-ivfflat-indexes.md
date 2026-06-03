---
id: retrieval-pgvector-hnsw-and-ivfflat-indexes
title: 'Retrieval pgvector HNSW and IVFFlat Indexes'
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
  - id: fact-ai-retrieval-pgvector-hnsw-and-ivfflat-indexes-1
    statement: >-
      pgvector documentation says pgvector supports exact and approximate nearest
      neighbor search for vector embeddings.
    source_title: pgvector README
    source_url: https://github.com/pgvector/pgvector
    confidence: medium
  - id: fact-ai-retrieval-pgvector-hnsw-and-ivfflat-indexes-2
    statement: >-
      pgvector documentation says supported approximate index types include HNSW
      and IVFFlat.
    source_title: pgvector HNSW Documentation
    source_url: https://github.com/pgvector/pgvector#hnsw
    confidence: medium
  - id: fact-ai-retrieval-pgvector-hnsw-and-ivfflat-indexes-3
    statement: >-
      pgvector documentation says an HNSW index can be created without any data
      in the table because it has no training step.
    source_title: pgvector HNSW Documentation
    source_url: https://github.com/pgvector/pgvector#hnsw
    confidence: medium
completeness: 0.82
known_gaps:
  - pgvector retrieval quality depends on vector type, distance operator, Postgres version, table size, index parameters, analyze/vacuum state, filters, memory settings, and whether recall is measured against exact search.
disputed_statements: []
primary_sources:
  - title: pgvector README
    type: documentation
    year: 2026
    url: https://github.com/pgvector/pgvector
    institution: pgvector
  - title: pgvector HNSW Documentation
    type: documentation
    year: 2026
    url: https://github.com/pgvector/pgvector#hnsw
    institution: pgvector
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

pgvector HNSW and IVFFlat indexes let agents reason about vector search latency, recall, and Postgres operational state in RAG systems.

## Core Explanation

Using pgvector keeps embeddings inside Postgres, which makes vector retrieval visible to database tooling but also brings normal index, planner, and maintenance tradeoffs. Agents should inspect the vector column type, operator class, query filter, index type, index parameters, table row count, and whether approximate results have been compared against exact search.

HNSW and IVFFlat solve different operational problems. HNSW is often chosen for query performance and recall, while IVFFlat introduces list/probe tuning and training considerations. A source-mapped diagnosis should name the index type and distance operator before recommending rebuilds or parameter changes.

## Source-Mapped Facts

- pgvector documentation says pgvector supports exact and approximate nearest neighbor search for vector embeddings. ([source](https://github.com/pgvector/pgvector))
- pgvector documentation says supported approximate index types include HNSW and IVFFlat. ([source](https://github.com/pgvector/pgvector#hnsw))
- pgvector documentation says an HNSW index can be created without any data in the table because it has no training step. ([source](https://github.com/pgvector/pgvector#hnsw))

## Further Reading

- [pgvector README](https://github.com/pgvector/pgvector)
- [pgvector HNSW Documentation](https://github.com/pgvector/pgvector#hnsw)
