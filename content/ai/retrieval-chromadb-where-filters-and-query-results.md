---
id: retrieval-chromadb-where-filters-and-query-results
title: 'Retrieval ChromaDB Where Filters and Query Results'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-retrieval-chromadb-where-filters-and-query-results-1
    statement: >-
      Chroma where-filter documentation says where filters allow filtering
      records by metadata values and document content when querying or searching
      Chroma collections.
    source_title: Chroma Where Filters
    source_url: https://docs.trychroma.com/reference/where-filter
    confidence: medium
  - id: fact-ai-retrieval-chromadb-where-filters-and-query-results-2
    statement: >-
      Chroma where-filter documentation says SDK filter DSLs compile to a JSON
      format that can also be constructed directly.
    source_title: Chroma Where Filters
    source_url: https://docs.trychroma.com/reference/where-filter
    confidence: medium
  - id: fact-ai-retrieval-chromadb-where-filters-and-query-results-3
    statement: >-
      Chroma where-filter documentation includes logical operators such as $and
      for combining metadata filter expressions.
    source_title: Chroma Where Filters
    source_url: https://docs.trychroma.com/reference/where-filter
    confidence: medium
  - id: fact-ai-retrieval-chromadb-where-filters-and-query-results-4
    statement: >-
      Chroma usage documentation says query results can include ids, embeddings,
      documents, metadata, distances, and included data chosen by the caller.
    source_title: Chroma Usage Guide
    source_url: https://github.com/chroma-core/docs/blob/main/docs/usage-guide.md
    confidence: medium
  - id: fact-ai-retrieval-chromadb-where-filters-and-query-results-5
    statement: >-
      Chroma usage documentation says callers can filter queries by metadata and
      document contents.
    source_title: Chroma Usage Guide
    source_url: https://github.com/chroma-core/docs/blob/main/docs/usage-guide.md
    confidence: medium
completeness: 0.82
known_gaps:
  - Chroma retrieval diagnosis depends on collection schema, client/server version, embedding function, persistent path, filter JSON shape, metadata value types, included result fields, distance metric, candidate count, and whether metadata was written consistently at ingest time.
disputed_statements: []
primary_sources:
  - title: Chroma Where Filters
    type: documentation
    year: 2026
    url: https://docs.trychroma.com/reference/where-filter
    institution: Chroma
  - title: Chroma Usage Guide
    type: documentation
    year: 2026
    url: https://github.com/chroma-core/docs/blob/main/docs/usage-guide.md
    institution: Chroma
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

ChromaDB where filters give retrieval agents a structured way to explain why a result set was constrained by metadata, document content, or both.

## Core Explanation

Metadata filtering is often the difference between a useful RAG result and a misleading one. In Chroma-backed systems, agents should preserve the collection name, query text, `where` filter JSON, document filter, included fields, returned ids, distances, and metadata.

The filter should be treated as part of the retrieval contract. A query that works without filters can fail under tenant, source, language, date, or permission filters, so debugging should compare unfiltered and filtered candidates before changing embeddings or prompts.

## Source-Mapped Facts

- Chroma where-filter documentation says where filters allow filtering records by metadata values and document content when querying or searching Chroma collections. ([source](https://docs.trychroma.com/reference/where-filter))
- Chroma where-filter documentation says SDK filter DSLs compile to a JSON format that can also be constructed directly. ([source](https://docs.trychroma.com/reference/where-filter))
- Chroma where-filter documentation includes logical operators such as $and for combining metadata filter expressions. ([source](https://docs.trychroma.com/reference/where-filter))
- Chroma usage documentation says query results can include ids, embeddings, documents, metadata, distances, and included data chosen by the caller. ([source](https://github.com/chroma-core/docs/blob/main/docs/usage-guide.md))
- Chroma usage documentation says callers can filter queries by metadata and document contents. ([source](https://github.com/chroma-core/docs/blob/main/docs/usage-guide.md))

## Further Reading

- [Chroma Where Filters](https://docs.trychroma.com/reference/where-filter)
- [Chroma Usage Guide](https://github.com/chroma-core/docs/blob/main/docs/usage-guide.md)
