---
id: kb-2026-00074
title: GraphQL
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: The GraphQL specification defines GraphQL as a query language and execution engine for APIs.
    source_title: GraphQL Specification October 2021
    source_url: https://spec.graphql.org/October2021/
    confidence: medium
  - id: fact-computer-science-002
    statement: >-
      GraphQL.org documents queries as requests where clients specify fields and receive
      correspondingly shaped data.
    source_title: Queries and Mutations
    source_url: https://graphql.org/learn/queries/
    confidence: medium
  - id: fact-computer-science-003
    statement: The GraphQL over HTTP draft specifies conventions for serving GraphQL requests over HTTP.
    source_title: GraphQL over HTTP
    source_url: https://graphql.github.io/graphql-over-http/draft/
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    Statistics and data cited are from 2018 and earlier; more recent data may have become available
    since publication
  - >-
    This field is under active research and rapid development; some conclusions may evolve with new
    evidence or technological advances
  - >-
    Certain sub-topics are covered at a general level; specialized edge cases and nuanced
    applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
disputed_statements: []
primary_sources:
  - id: ps-graphql-1
    title: GraphQL Specification October 2021
    type: standard
    year: 2021
    institution: GraphQL Foundation
    url: https://spec.graphql.org/October2021/
  - id: ps-graphql-2
    title: Queries and Mutations
    type: documentation
    year: 2026
    institution: GraphQL.org
    url: https://graphql.org/learn/queries/
  - id: ps-graphql-3
    title: GraphQL over HTTP
    type: draft_standard
    year: 2026
    institution: GraphQL Foundation
    url: https://graphql.github.io/graphql-over-http/draft/
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
GraphQL is a query language and runtime model for APIs. It lets clients request specific fields and relies on schemas, resolvers, and transport conventions to execute those requests.

## Core Explanation
A GraphQL schema describes available types and fields. Clients send queries or mutations that specify the data shape they want. GraphQL can be transported over HTTP using established request and response conventions.

## Related Articles

- [API Design](../api-design.md)
- [REST APIs](../rest-apis.md)
- [JSON](../json.md)
