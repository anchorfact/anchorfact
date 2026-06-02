---
id: sparse-retrieval-and-bm25
title: 'Sparse Retrieval and BM25'
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
  - id: fact-sparse-retrieval-and-bm25-1
    statement: >-
      Elasticsearch similarity documentation lists BM25 as a built-in similarity and the default similarity for text scoring.
    source_title: Similarity Settings - Elasticsearch
    source_url: https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity
  - id: fact-sparse-retrieval-and-bm25-2
    statement: >-
      Apache Lucene documentation provides a BM25Similarity class for implementing BM25-based relevance scoring.
    source_title: BM25Similarity - Apache Lucene
    source_url: https://lucene.apache.org/core/9_10_0/core/org/apache/lucene/search/similarities/BM25Similarity.html
  - id: fact-sparse-retrieval-and-bm25-3
    statement: >-
      Weaviate keyword search documentation describes BM25 as a keyword search algorithm that ranks objects by keyword relevance.
    source_title: Keyword Search BM25 - Weaviate
    source_url: https://docs.weaviate.io/weaviate/concepts/search/keyword-search
completeness: 0.83
known_gaps:
  - BM25 variants, analyzers, stemming, stop words, and field boosts are implementation-specific.
disputed_statements: []
primary_sources:
  - title: Similarity Settings - Elasticsearch
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity
    institution: Elastic
  - title: BM25Similarity - Apache Lucene
    type: documentation
    year: 2024
    url: https://lucene.apache.org/core/9_10_0/core/org/apache/lucene/search/similarities/BM25Similarity.html
    institution: Apache Lucene
  - title: Keyword Search BM25 - Weaviate
    type: documentation
    year: 2026
    url: https://docs.weaviate.io/weaviate/concepts/search/keyword-search
    institution: Weaviate
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Sparse retrieval uses exact or token-based text features, and BM25 is a widely used relevance model for ranking documents by keyword matches.

## Core Explanation

Dense embeddings are useful for semantic similarity, but sparse retrieval remains important because users often search for exact names, error codes, API symbols, identifiers, dates, and rare technical terms. BM25 rewards matching terms while accounting for term frequency and document length.

In RAG systems, BM25 is often paired with vector search. Sparse retrieval provides high precision for exact terms, while dense retrieval expands recall for paraphrases. Hybrid retrieval then fuses or reranks candidates before the model sees them.

## Source-Mapped Facts

- Elasticsearch similarity documentation lists BM25 as a built-in similarity and the default similarity for text scoring. ([source](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity))
- Apache Lucene documentation provides a BM25Similarity class for implementing BM25-based relevance scoring. ([source](https://lucene.apache.org/core/9_10_0/core/org/apache/lucene/search/similarities/BM25Similarity.html))
- Weaviate keyword search documentation describes BM25 as a keyword search algorithm that ranks objects by keyword relevance. ([source](https://docs.weaviate.io/weaviate/concepts/search/keyword-search))

## Further Reading

- [Elasticsearch similarity settings](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity)
- [Apache Lucene BM25Similarity](https://lucene.apache.org/core/9_10_0/core/org/apache/lucene/search/similarities/BM25Similarity.html)
- [Weaviate keyword search](https://docs.weaviate.io/weaviate/concepts/search/keyword-search)
