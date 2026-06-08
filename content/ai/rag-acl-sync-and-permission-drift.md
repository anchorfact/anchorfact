---
id: rag-acl-sync-and-permission-drift
title: 'RAG ACL Sync and Permission Drift'
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
  - id: fact-ai-rag-acl-sync-and-permission-drift-1
    statement: >-
      Azure AI Search documentation says document-level access control can
      restrict search results to documents a user is allowed to access.
    source_title: Azure AI Search Document-Level Access Control
    source_url: https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview
    confidence: medium
  - id: fact-ai-rag-acl-sync-and-permission-drift-2
    statement: >-
      Elastic documentation describes document-level security and field-level
      security as controls for limiting which documents and fields users can access.
    source_title: Elastic Document and Field Level Security
    source_url: https://www.elastic.co/docs/deploy-manage/users-roles/cluster-or-deployment-auth/controlling-access-at-document-field-level
    confidence: medium
  - id: fact-ai-rag-acl-sync-and-permission-drift-3
    statement: >-
      Microsoft Graph documentation describes delta query as a way to discover
      changes to resources without fetching the entire resource set each time.
    source_title: Microsoft Graph Delta Query
    source_url: https://learn.microsoft.com/en-us/graph/delta-query-overview
    confidence: medium
completeness: 0.84
known_gaps:
  - Permission correctness depends on source-system ACL semantics, group expansion, inherited permissions, connector lag, search-index filters, cached answers, and document deletion handling.
  - Enterprise ACL models can differ by provider, tenant, field, folder hierarchy, sharing link, and time-bound access rule.
disputed_statements: []
primary_sources:
  - title: Azure AI Search Document-Level Access Control
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview
    institution: Microsoft
  - title: Elastic Document and Field Level Security
    type: documentation
    year: 2026
    url: https://www.elastic.co/docs/deploy-manage/users-roles/cluster-or-deployment-auth/controlling-access-at-document-field-level
    institution: Elastic
  - title: Microsoft Graph Delta Query
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/graph/delta-query-overview
    institution: Microsoft
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG permission drift happens when a retrieval index, cache, or connector is out of sync with the source system's current access-control state.

## Core Explanation

Access-controlled retrieval is a correctness requirement, not only a security feature. If a source document becomes private but its chunks remain searchable, an agent can leak text, cite stale evidence, or answer from material that the current user should not see.

Reliable RAG systems treat ACL data as part of the indexed document state. The useful evidence includes source document ID, source ACL version, group-expansion timestamp, connector cursor, index update time, tenant or namespace, filter expression, cache key, and deletion or tombstone status. Without those fields, it is hard to tell whether a retrieval failure is a ranking problem, a connector lag problem, or a permissions problem.

Agents should prefer read-only diagnosis first: compare the source system's current permissions with indexed permissions, inspect the last successful delta sync, verify that cached answers are permission-scoped, and confirm whether group membership changes have propagated before recommending a reindex.

## Source-Mapped Facts

- Azure AI Search documentation says document-level access control can restrict search results to documents a user is allowed to access. ([source](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview))
- Elastic documentation describes document-level security and field-level security as controls for limiting which documents and fields users can access. ([source](https://www.elastic.co/docs/deploy-manage/users-roles/cluster-or-deployment-auth/controlling-access-at-document-field-level))
- Microsoft Graph documentation describes delta query as a way to discover changes to resources without fetching the entire resource set each time. ([source](https://learn.microsoft.com/en-us/graph/delta-query-overview))

## Further Reading

- [Azure AI Search Document-Level Access Control](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview)
- [Elastic Document and Field Level Security](https://www.elastic.co/docs/deploy-manage/users-roles/cluster-or-deployment-auth/controlling-access-at-document-field-level)
- [Microsoft Graph Delta Query](https://learn.microsoft.com/en-us/graph/delta-query-overview)
