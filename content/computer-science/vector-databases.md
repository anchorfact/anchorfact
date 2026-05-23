---
id: kb-2026-00255
title: Vector Databases
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The NoSQL vs. SQL debate has evolved: while NoSQL offered horizontal scalability benefits, modern NewSQL systems (CockroachDB, Spanner) have narrowed the gap, and PostgreSQL's JSON support blurs
      the distinction
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: Instead of exact match, they find nearest neighbors using Approximate Nearest Neighbor algorithms
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      Vector databases store and query high-dimensional vector embeddings for similarity search, powering AI applications (semantic search, RAG, recommendation). Instead of exact match, they find
      nearest neighbors using Approximate Nearest Neighbor (ANN) algorithms. Key players: Pinecone, Weaviate, Qdrant, Milvus, pgvector (PostgreSQL extension).
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Embedding: text/image/audio → vector (768-3072 dimensions)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: "ANN algorithms: HNSW (hierarchical navigable small world graphs — most popular), IVF (inverted file index), PQ (product quantization for compression)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-004
    statement: "pgvector: add vector search to PostgreSQL — `SELECT * FROM items ORDER BY embedding <=> query_vector LIMIT 10`."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-005
    statement: "Hybrid search: vector similarity + keyword/BM25 (Weaviate)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---



## TL;DR

Vector databases store and query high-dimensional vector embeddings for similarity search, powering AI applications (semantic search, RAG, recommendation). Instead of exact match, they find nearest neighbors using Approximate Nearest Neighbor (ANN) algorithms. Key players: Pinecone, Weaviate, Qdrant, Milvus, pgvector (PostgreSQL extension).

## Core Explanation

Embedding: text/image/audio → vector (768-3072 dimensions). Similarity metrics: cosine similarity, Euclidean distance, dot product. ANN algorithms: HNSW (hierarchical navigable small world graphs — most popular), IVF (inverted file index), PQ (product quantization for compression). pgvector: add vector search to PostgreSQL — `SELECT * FROM items ORDER BY embedding <=> query_vector LIMIT 10`. Hybrid search: vector similarity + keyword/BM25 (Weaviate).

## Further Reading

- [Pinecone Documentation](undefined)
