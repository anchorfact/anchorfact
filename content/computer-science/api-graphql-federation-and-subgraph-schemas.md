---
id: api-graphql-federation-and-subgraph-schemas
title: 'API GraphQL Federation and Subgraph Schemas'
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
  - id: fact-cs-api-graphql-federation-and-subgraph-schemas-1
    statement: >-
      Apollo Federation documentation says a Federation 2 subgraph must correctly
      resolve the Query._service enhanced introspection field.
    source_title: Apollo Federation Subgraph Specification
    source_url: https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec
    confidence: medium
  - id: fact-cs-api-graphql-federation-and-subgraph-schemas-2
    statement: >-
      Apollo Federation documentation says a Federation 2 subgraph must provide
      a mechanism for resolving entity fields through Query._entities.
    source_title: Apollo Federation Subgraph Specification
    source_url: https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec
    confidence: medium
  - id: fact-cs-api-graphql-federation-and-subgraph-schemas-3
    statement: >-
      Apollo Federation documentation says Federation 2 subgraph schemas opt in
      to federation features by applying the @link directive to the schema type.
    source_title: Apollo Federation Directives Reference
    source_url: https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/directives
    confidence: medium
completeness: 0.82
known_gaps:
  - Federation behavior depends on subgraph schema versions, composition checks, router configuration, entity keys, directives, authorization boundaries, and whether production disables ordinary introspection.
disputed_statements: []
primary_sources:
  - title: Apollo Federation Subgraph Specification
    type: documentation
    year: 2026
    url: https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec
    institution: Apollo GraphQL
  - title: Apollo Federation Directives Reference
    type: documentation
    year: 2026
    url: https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/directives
    institution: Apollo GraphQL
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

GraphQL federation evidence helps agents reason about which subgraph owns a field, how entities are resolved, and whether a schema change will compose.

## Core Explanation

Federated GraphQL splits one API graph across subgraphs. That gives teams ownership boundaries, but it also creates failure modes that do not appear in a single schema: entity keys, composition rules, router query planning, subgraph availability, and directive compatibility.

Agents should inspect subgraph SDL, federation directives, entity keys, supergraph composition output, router version, schema checks, and field ownership before generating queries or recommending a schema migration.

## Source-Mapped Facts

- Apollo Federation documentation says a Federation 2 subgraph must correctly resolve the Query._service enhanced introspection field. ([source](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec))
- Apollo Federation documentation says a Federation 2 subgraph must provide a mechanism for resolving entity fields through Query._entities. ([source](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec))
- Apollo Federation documentation says Federation 2 subgraph schemas opt in to federation features by applying the @link directive to the schema type. ([source](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/directives))

## Further Reading

- [Apollo Federation Subgraph Specification](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/subgraph-spec)
- [Apollo Federation Directives Reference](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/directives)
