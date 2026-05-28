---
id: vector-databases
title: 'Vector Databases: Approximate Nearest Neighbor Search, Embedding Storage, and Retrieval at Scale'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
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
  - id: af-vector-databases-1
    statement: HNSW is an approximate nearest-neighbor graph method used for efficient similarity search.
    source_title: Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs
    source_url: https://arxiv.org/abs/1603.09320
    confidence: medium
  - id: af-vector-databases-2
    statement: FAISS supports billion-scale similarity search over dense vectors using GPU acceleration.
    source_title: Billion-scale similarity search with GPUs
    source_url: https://arxiv.org/abs/1702.08734
    confidence: medium
  - id: af-vector-databases-3
    statement: Milvus is described as a purpose-built vector data management system for embedding vectors.
    source_title: 'Milvus: A Purpose-Built Vector Data Management System'
    source_url: https://arxiv.org/abs/2105.08459
    confidence: medium
primary_sources:
  - id: ps-vector-databases-1
    title: Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs
    type: academic_paper
    year: 2016
    institution: arXiv
    url: https://arxiv.org/abs/1603.09320
  - id: ps-vector-databases-2
    title: Billion-scale similarity search with GPUs
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1702.08734
  - id: ps-vector-databases-3
    title: 'Milvus: A Purpose-Built Vector Data Management System'
    type: academic_paper
    year: 2021
    institution: arXiv
    url: https://arxiv.org/abs/2105.08459
known_gaps:
  - Filtering, freshness, and transactional semantics in vector retrieval systems
  - Evaluation of retrieval quality beyond nearest-neighbor recall
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Vector databases store and query embeddings for similarity search. The core evidence belongs to approximate nearest-neighbor methods, GPU similarity search, and purpose-built vector data management.

## Core Explanation
Embeddings turn items such as text, images, or users into numeric vectors. A vector database indexes those vectors so applications can retrieve similar items quickly, often with metadata filtering and operational management around the index.

## Detailed Analysis
This repair avoids product claims and keeps the public article anchored to HNSW, FAISS, and Milvus.

## Related Articles

- [Multimodal Search: Cross-Modal Retrieval, Product Search, and Multimodal Embeddings](../multimodal-search.md)
- [Vector Databases](../../computer-science/vector-databases.md)
- [Advanced RAG: From Naive Retrieval to Agentic RAG](../advanced-rag-techniques.md)
