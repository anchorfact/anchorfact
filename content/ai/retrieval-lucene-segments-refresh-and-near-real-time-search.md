---
id: retrieval-lucene-segments-refresh-and-near-real-time-search
title: 'Retrieval Lucene Segments, Refresh, and Near Real-Time Search'
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
  - id: fact-ai-retrieval-lucene-segments-refresh-and-near-real-time-search-1
    statement: >-
      Elasticsearch documentation says documents are indexed and fully
      searchable in near real-time after being stored.
    source_title: Elasticsearch Near Real-Time Search
    source_url: https://www.elastic.co/docs/manage-data/data-store/near-real-time-search
    confidence: medium
  - id: fact-ai-retrieval-lucene-segments-refresh-and-near-real-time-search-2
    statement: >-
      Elasticsearch documentation explains near real-time search using Lucene's
      per-segment search model.
    source_title: Elasticsearch Near Real-Time Search
    source_url: https://www.elastic.co/docs/manage-data/data-store/near-real-time-search
    confidence: medium
  - id: fact-ai-retrieval-lucene-segments-refresh-and-near-real-time-search-3
    statement: >-
      Apache Lucene IndexWriter documentation describes a near real-time mode
      when DirectoryReader.open(IndexWriter) has been called.
    source_title: Apache Lucene IndexWriter
    source_url: https://lucene.apache.org/core/10_3_1/core/org/apache/lucene/index/IndexWriter.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Retrieval freshness depends on refresh intervals, explicit refresh calls, index aliases, replicas, translog durability, segment merges, ingestion failures, source connector lag, and whether the application reads from the same index it writes.
disputed_statements: []
primary_sources:
  - title: Elasticsearch Near Real-Time Search
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/manage-data/data-store/near-real-time-search
    institution: Elastic
  - title: Apache Lucene IndexWriter
    type: api_documentation
    year: 2026
    url: https://lucene.apache.org/core/10_3_1/core/org/apache/lucene/index/IndexWriter.html
    institution: Apache Lucene
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Near real-time search means a freshly indexed document may not be retrievable until the search engine refreshes searchable segments.

## Core Explanation

RAG and search agents often assume that a successful write means immediate retrieval. Lucene-backed systems expose a more nuanced boundary: documents can be accepted, indexed into segments, and become visible to search only after refresh behavior makes those segments available to readers.

Agents should record the write response, target index or alias, refresh policy, refresh interval, last refresh time, replica state, and search request target. If a document is missing from retrieval immediately after ingestion, the first question is whether it is unindexed, unrefreshed, filtered, or written to a different index generation.

## Source-Mapped Facts

- Elasticsearch documentation says documents are indexed and fully searchable in near real-time after being stored. ([source](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search))
- Elasticsearch documentation explains near real-time search using Lucene's per-segment search model. ([source](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search))
- Apache Lucene IndexWriter documentation describes a near real-time mode when DirectoryReader.open(IndexWriter) has been called. ([source](https://lucene.apache.org/core/10_3_1/core/org/apache/lucene/index/IndexWriter.html))

## Further Reading

- [Elasticsearch Near Real-Time Search](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search)
- [Apache Lucene IndexWriter](https://lucene.apache.org/core/10_3_1/core/org/apache/lucene/index/IndexWriter.html)
