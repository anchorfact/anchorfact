---
id: reciprocal-rank-fusion
title: 'Reciprocal Rank Fusion'
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
  - id: fact-reciprocal-rank-fusion-1
    statement: >-
      Elasticsearch documentation describes reciprocal rank fusion as a method for combining multiple ranked result sets.
    source_title: Reciprocal Rank Fusion - Elasticsearch
    source_url: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion
  - id: fact-reciprocal-rank-fusion-2
    statement: >-
      Azure AI Search documentation says reciprocal rank fusion is used to merge ranked results from parallel query executions in hybrid search.
    source_title: Hybrid Search Scoring - Azure AI Search
    source_url: https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking
  - id: fact-reciprocal-rank-fusion-3
    statement: >-
      OpenSearch documentation describes a reciprocal rank fusion processor for search pipelines that combines scores from multiple result sets.
    source_title: Reciprocal Rank Fusion - OpenSearch
    source_url: https://docs.opensearch.org/docs/latest/search-plugins/search-pipelines/reciprocal-rank-fusion/
completeness: 0.83
known_gaps:
  - The best rank constant and candidate depth depend on corpus size, retriever mix, and downstream reranking.
disputed_statements: []
primary_sources:
  - title: Reciprocal Rank Fusion - Elasticsearch
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion
    institution: Elastic
  - title: Hybrid Search Scoring - Azure AI Search
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking
    institution: Microsoft
  - title: Reciprocal Rank Fusion - OpenSearch
    type: documentation
    year: 2026
    url: https://docs.opensearch.org/docs/latest/search-plugins/search-pipelines/reciprocal-rank-fusion/
    institution: OpenSearch
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Reciprocal rank fusion is a rank aggregation method that combines multiple search result lists by rewarding documents that appear highly in any contributing list.

## Core Explanation

RAG systems often run several retrievers at once: BM25, dense vector search, metadata-filtered search, or domain-specific indexes. Their raw scores are not always comparable. RRF avoids score calibration by using rank positions instead.

The method is useful when lexical and semantic retrievers each catch different relevant documents. It is usually followed by deduplication, optional reranking, and source diversity controls so the final context is not dominated by near-duplicates.

## Source-Mapped Facts

- Elasticsearch documentation describes reciprocal rank fusion as a method for combining multiple ranked result sets. ([source](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion))
- Azure AI Search documentation says reciprocal rank fusion is used to merge ranked results from parallel query executions in hybrid search. ([source](https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking))
- OpenSearch documentation describes a reciprocal rank fusion processor for search pipelines that combines scores from multiple result sets. ([source](https://docs.opensearch.org/docs/latest/search-plugins/search-pipelines/reciprocal-rank-fusion/))

## Further Reading

- [Elasticsearch reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)
- [Azure AI Search hybrid scoring](https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking)
- [OpenSearch reciprocal rank fusion](https://docs.opensearch.org/docs/latest/search-plugins/search-pipelines/reciprocal-rank-fusion/)
