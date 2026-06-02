---
id: rag-document-deletion-and-tombstone-handling
title: 'RAG Document Deletion and Tombstone Handling'
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
  - id: fact-ai-rag-document-deletion-and-tombstone-handling-1
    statement: >-
      Qdrant documentation describes deleting points by point IDs or by a filter.
    source_title: Qdrant Points
    source_url: https://qdrant.tech/documentation/concepts/points/
    confidence: medium
  - id: fact-ai-rag-document-deletion-and-tombstone-handling-2
    statement: >-
      Weaviate documentation describes deleting objects by ID and by filter.
    source_title: Weaviate Delete Objects
    source_url: https://docs.weaviate.io/weaviate/manage-objects/delete
    confidence: medium
  - id: fact-ai-rag-document-deletion-and-tombstone-handling-3
    statement: >-
      Elasticsearch documentation describes the Delete API as removing a JSON document from
      an index.
    source_title: Elasticsearch Delete API
    source_url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete
    confidence: medium
completeness: 0.83
known_gaps:
  - Deletion correctness depends on connector tombstones, chunk IDs, parent document IDs, vector payload filters, ACL sync, index compaction, and cached retrieval results.
disputed_statements: []
primary_sources:
  - title: Qdrant Points
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/concepts/points/
    institution: Qdrant
  - title: Weaviate Delete Objects
    type: documentation
    year: 2026
    url: https://docs.weaviate.io/weaviate/manage-objects/delete
    institution: Weaviate
  - title: Elasticsearch Delete API
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete
    institution: Elastic
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG deletion handling keeps removed documents from being retrieved, cited, cached, or answered from stale chunks.

## Core Explanation

RAG pipelines often split one source document into many chunks. A delete event therefore has to map from source document ID to every derived chunk, vector, metadata record, and cached answer that depends on it.

Agents should inspect deletion logs, tombstone records, vector store delete status, source connector checkpoints, and cache invalidation before saying that a document is gone. Missing this step can leave sensitive or obsolete content available through retrieval.

## Source-Mapped Facts

- Qdrant documentation describes deleting points by point IDs or by a filter. ([source](https://qdrant.tech/documentation/concepts/points/))
- Weaviate documentation describes deleting objects by ID and by filter. ([source](https://docs.weaviate.io/weaviate/manage-objects/delete))
- Elasticsearch documentation describes the Delete API as removing a JSON document from an index. ([source](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete))

## Further Reading

- [Qdrant Points](https://qdrant.tech/documentation/concepts/points/)
- [Weaviate Delete Objects](https://docs.weaviate.io/weaviate/manage-objects/delete)
- [Elasticsearch Delete API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete)
