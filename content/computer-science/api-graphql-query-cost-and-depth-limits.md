---
id: api-graphql-query-cost-and-depth-limits
title: 'API GraphQL Query Cost and Depth Limits'
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
  - id: fact-cs-api-graphql-query-cost-and-depth-limits-1
    statement: >-
      GraphQL.org security documentation recommends limiting the maximum depth
      of fields that a single operation can have.
    source_title: GraphQL Security
    source_url: https://graphql.org/learn/security/
    confidence: medium
  - id: fact-cs-api-graphql-query-cost-and-depth-limits-2
    statement: >-
      GraphQL.org security documentation says query complexity analysis can
      estimate request cost by applying weights to types and fields in a schema.
    source_title: GraphQL Security
    source_url: https://graphql.org/learn/security/
    confidence: medium
  - id: fact-cs-api-graphql-query-cost-and-depth-limits-3
    statement: >-
      Apollo Router request-limit documentation lists operation limits including
      max_depth, max_height, max_aliases, and max_root_fields.
    source_title: Apollo Router Request Limits
    source_url: https://www.apollographql.com/docs/graphos/routing/security/request-limits
    confidence: medium
completeness: 0.82
known_gaps:
  - Query cost controls depend on schema design, resolver complexity, pagination rules, persisted documents, authorization, batching, aliases, fragments, federation, and per-client rate limits.
disputed_statements: []
primary_sources:
  - title: GraphQL Security
    type: documentation
    year: 2026
    url: https://graphql.org/learn/security/
    institution: GraphQL Foundation
  - title: Apollo Router Request Limits
    type: documentation
    year: 2026
    url: https://www.apollographql.com/docs/graphos/routing/security/request-limits
    institution: Apollo GraphQL
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

GraphQL query cost and depth limits protect APIs from operations that are syntactically valid but too expensive to execute safely.

## Core Explanation

GraphQL lets clients shape responses, so a single request can include deep nesting, aliases, many root fields, or expensive resolver paths. For agents, that flexibility can become a reliability risk when generated queries are not bounded.

A useful agent tool should expose allowed depth, field count, alias count, root-field count, trusted-document policy, pagination requirements, and any cost budget returned by the gateway. Agents should not learn limits by repeatedly sending larger queries against production.

## Source-Mapped Facts

- GraphQL.org security documentation recommends limiting the maximum depth of fields that a single operation can have. ([source](https://graphql.org/learn/security/))
- GraphQL.org security documentation says query complexity analysis can estimate request cost by applying weights to types and fields in a schema. ([source](https://graphql.org/learn/security/))
- Apollo Router request-limit documentation lists operation limits including max_depth, max_height, max_aliases, and max_root_fields. ([source](https://www.apollographql.com/docs/graphos/routing/security/request-limits))

## Further Reading

- [GraphQL Security](https://graphql.org/learn/security/)
- [Apollo Router Request Limits](https://www.apollographql.com/docs/graphos/routing/security/request-limits)
