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
secondary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis", "Perez", "Piktus"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.11401"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Vector databases store and query high-dimensional vector embeddings for similarity search, powering AI applications (semantic search, RAG, recommendation). Instead of exact match, they find nearest neighbors using Approximate Nearest Neighbor (ANN) algorithms. Key players: Pinecone, Weaviate, Qdrant, Milvus, pgvector (PostgreSQL extension).

## Core Explanation

Embedding: text/image/audio → vector (768-3072 dimensions). Similarity metrics: cosine similarity, Euclidean distance, dot product. ANN algorithms: HNSW (hierarchical navigable small world graphs — most popular), IVF (inverted file index), PQ (product quantization for compression). pgvector: add vector search to PostgreSQL — `SELECT * FROM items ORDER BY embedding <=> query_vector LIMIT 10`. Hybrid search: vector similarity + keyword/BM25 (Weaviate).

## Further Reading

- [Pinecone Documentation](undefined)
