---
id: retrieval-azure-ai-search-indexers-and-data-sources
title: 'Retrieval Azure AI Search Indexers and Data Sources'
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
  - id: fact-ai-retrieval-azure-ai-search-indexers-and-data-sources-1
    statement: >-
      Microsoft Learn says an indexer in Azure AI Search is a crawler that
      extracts textual data from cloud data sources and populates a search
      index.
    source_title: Indexer Overview - Azure AI Search
    source_url: https://learn.microsoft.com/en-us/azure/search/search-indexer-overview
    confidence: medium
  - id: fact-ai-retrieval-azure-ai-search-indexers-and-data-sources-2
    statement: >-
      The Azure AI Search indexer REST API defines dataSourceName as the name
      of the data source from which an indexer reads data.
    source_title: Indexers - Create - REST API
    source_url: https://learn.microsoft.com/en-us/rest/api/searchservice/indexers/create?view=rest-searchservice-2025-09-01
    confidence: medium
  - id: fact-ai-retrieval-azure-ai-search-indexers-and-data-sources-3
    statement: >-
      Microsoft Learn says Azure AI Search indexers can run on demand or on a
      recurring data refresh schedule.
    source_title: Indexer Overview - Azure AI Search
    source_url: https://learn.microsoft.com/en-us/azure/search/search-indexer-overview
    confidence: medium
completeness: 0.82
known_gaps:
  - Azure AI Search indexing behavior depends on source connector type, change detection, skillsets, field mappings, vectorization, index schema, schedule frequency, search units, throttling, private networking, authentication, and whether the pipeline uses a pull indexer or a custom push model.
disputed_statements: []
primary_sources:
  - title: Indexer Overview - Azure AI Search
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/search-indexer-overview
    institution: Microsoft Learn
  - title: Indexers - Create - REST API
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/rest/api/searchservice/indexers/create?view=rest-searchservice-2025-09-01
    institution: Microsoft Learn
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Azure AI Search indexers are retrieval ingestion evidence: they show which source populated an index, how documents were mapped, and when refreshes run.

## Core Explanation

RAG incidents are often ingestion incidents. If a document is missing, stale, or wrongly chunked, agents should inspect the search indexer configuration instead of only testing query prompts. The relevant evidence includes data source, index, field mappings, skillset, schedule, last run status, error details, change detection, and whether vector fields are generated during enrichment.

For agent workflows, the key question is whether the retrieval index is a pull-based projection of a data source or a custom push pipeline. That determines where the agent should look for freshness, failures, and rollback controls.

## Source-Mapped Facts

- Microsoft Learn says an indexer in Azure AI Search is a crawler that extracts textual data from cloud data sources and populates a search index. ([source](https://learn.microsoft.com/en-us/azure/search/search-indexer-overview))
- The Azure AI Search indexer REST API defines dataSourceName as the name of the data source from which an indexer reads data. ([source](https://learn.microsoft.com/en-us/rest/api/searchservice/indexers/create?view=rest-searchservice-2025-09-01))
- Microsoft Learn says Azure AI Search indexers can run on demand or on a recurring data refresh schedule. ([source](https://learn.microsoft.com/en-us/azure/search/search-indexer-overview))

## Further Reading

- [Indexer Overview - Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-indexer-overview)
- [Indexers - Create - REST API](https://learn.microsoft.com/en-us/rest/api/searchservice/indexers/create?view=rest-searchservice-2025-09-01)
