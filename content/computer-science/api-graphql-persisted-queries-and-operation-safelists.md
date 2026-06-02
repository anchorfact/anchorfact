---
id: api-graphql-persisted-queries-and-operation-safelists
title: 'API GraphQL Persisted Queries and Operation Safelists'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-api-graphql-persisted-queries-and-operation-safelists-1
    statement: >-
      Apollo GraphOS documentation says APQ does not provide safelisting because
      the router dynamically populates its APQ cache with operations it receives.
    source_title: Apollo GraphOS Safelisting with Persisted Queries
    source_url: https://www.apollographql.com/docs/graphos/platform/security/persisted-queries
    confidence: medium
  - id: fact-cs-api-graphql-persisted-queries-and-operation-safelists-2
    statement: >-
      Apollo GraphOS documentation says persisted-query safelisting can restrict
      execution to operations present in a persisted query list.
    source_title: Apollo GraphOS Safelisting with Persisted Queries
    source_url: https://www.apollographql.com/docs/graphos/platform/security/persisted-queries
    confidence: medium
  - id: fact-cs-api-graphql-persisted-queries-and-operation-safelists-3
    statement: >-
      Apollo Client documentation says its persisted queries link requires a
      SHA-256 hash function.
    source_title: Apollo Client Persisted Queries
    source_url: https://www.apollographql.com/docs/react/data/persisted-queries
    confidence: medium
completeness: 0.82
known_gaps:
  - Persisted query behavior varies by router, client version, hash manifest, CDN caching, allowlist rollout mode, and whether legacy clients still send full operation strings.
disputed_statements: []
primary_sources:
  - title: Apollo GraphOS Safelisting with Persisted Queries
    type: documentation
    year: 2026
    url: https://www.apollographql.com/docs/graphos/platform/security/persisted-queries
    institution: Apollo GraphQL
  - title: Apollo Client Persisted Queries
    type: documentation
    year: 2026
    url: https://www.apollographql.com/docs/react/data/persisted-queries
    institution: Apollo GraphQL
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

GraphQL persisted queries and operation safelists help agents distinguish approved operations from arbitrary query text and avoid relying on ad hoc introspection.

## Core Explanation

Persisted query systems replace or constrain full GraphQL operation text with registered IDs or hashes. For agents, this creates a safer lookup surface: the agent can inspect approved operations, expected variables, client manifests, and rejected-operation logs.

Agents should verify whether the system uses APQ caching, a persisted query list, safelisting, or ID-only safelisting. These modes have different failure cases and rollout risks.

## Source-Mapped Facts

- Apollo GraphOS documentation says APQ does not provide safelisting because the router dynamically populates its APQ cache with operations it receives. ([source](https://www.apollographql.com/docs/graphos/platform/security/persisted-queries))
- Apollo GraphOS documentation says persisted-query safelisting can restrict execution to operations present in a persisted query list. ([source](https://www.apollographql.com/docs/graphos/platform/security/persisted-queries))
- Apollo Client documentation says its persisted queries link requires a SHA-256 hash function. ([source](https://www.apollographql.com/docs/react/data/persisted-queries))

## Further Reading

- [Apollo GraphOS Safelisting with Persisted Queries](https://www.apollographql.com/docs/graphos/platform/security/persisted-queries)
- [Apollo Client Persisted Queries](https://www.apollographql.com/docs/react/data/persisted-queries)
