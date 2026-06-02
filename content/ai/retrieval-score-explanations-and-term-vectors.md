---
id: retrieval-score-explanations-and-term-vectors
title: 'Retrieval Score Explanations and Term Vectors'
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
  - id: fact-ai-retrieval-score-explanations-and-term-vectors-1
    statement: >-
      Elasticsearch Explain API documentation says the API gives information
      about why a specific document matches or does not match a query.
    source_title: Elasticsearch Explain API
    source_url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain
    confidence: medium
  - id: fact-ai-retrieval-score-explanations-and-term-vectors-2
    statement: >-
      Elasticsearch Explain API documentation says the API computes a score
      explanation for a query and a specific document.
    source_title: Elasticsearch Explain API
    source_url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain
    confidence: medium
  - id: fact-ai-retrieval-score-explanations-and-term-vectors-3
    statement: >-
      Elasticsearch Term Vectors API documentation says the API returns
      information and statistics about terms in fields of a particular document.
    source_title: Elasticsearch Term Vectors API
    source_url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-termvectors
    confidence: medium
completeness: 0.82
known_gaps:
  - Ranking diagnosis depends on analyzer configuration, query rewriting, index-time boosts, similarity settings, shard-level statistics, vector rerankers, filters, candidate cutoffs, and whether explanation APIs reflect the same request path as production retrieval.
disputed_statements: []
primary_sources:
  - title: Elasticsearch Explain API
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain
    institution: Elastic
  - title: Elasticsearch Term Vectors API
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-termvectors
    institution: Elastic
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Score explanations and term vectors help agents debug why retrieval returned a document, missed a document, or ranked evidence unexpectedly.

## Core Explanation

RAG failures are often blamed on prompts even when the retrieval layer selected weak evidence. Score explanations and term vectors give agents a lower-level view of lexical matching, term statistics, and document-specific scoring inputs.

Agents should preserve the query, filters, analyzer, candidate document ID, explanation payload, term vectors, shard context, reranker stage, and final evidence order. Explanation output is diagnostic evidence, not a guarantee that the ranking is desirable.

## Source-Mapped Facts

- Elasticsearch Explain API documentation says the API gives information about why a specific document matches or does not match a query. ([source](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain))
- Elasticsearch Explain API documentation says the API computes a score explanation for a query and a specific document. ([source](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain))
- Elasticsearch Term Vectors API documentation says the API returns information and statistics about terms in fields of a particular document. ([source](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-termvectors))

## Further Reading

- [Elasticsearch Explain API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain)
- [Elasticsearch Term Vectors API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-termvectors)
