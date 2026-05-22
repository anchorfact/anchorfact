---
id:"kb-2026-00255"
title:"Vector Databases"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Pinecone Documentation"
    type:"undefined"
    url:"undefined"
    institution:"Pinecone"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Vector databases store and query high-dimensional vector embeddings for similarity search, powering AI applications (semantic search, RAG, recommendation). Instead of exact match, they find nearest neighbors using Approximate Nearest Neighbor (ANN) algorithms. Key players: Pinecone, Weaviate, Qdrant, Milvus, pgvector (PostgreSQL extension).

## Core Explanation

Embedding: text/image/audio → vector (768-3072 dimensions). Similarity metrics: cosine similarity, Euclidean distance, dot product. ANN algorithms: HNSW (hierarchical navigable small world graphs — most popular), IVF (inverted file index), PQ (product quantization for compression). pgvector: add vector search to PostgreSQL — `SELECT * FROM items ORDER BY embedding <=> query_vector LIMIT 10`. Hybrid search: vector similarity + keyword/BM25 (Weaviate).

## Further Reading

- [Pinecone Documentation](undefined)
