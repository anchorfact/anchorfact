---
id: "kb-2026-00074"
title: "GraphQL"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "GraphQL is a query language and runtime for APIs developed by Facebook in 2012 and open-sourced in 2015"
    source_title: "GraphQL Specification (October 2021)"
    source_url: "https://spec.graphql.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Unlike REST where the server defines fixed endpoints, GraphQL lets clients request exactly the data they need in a single request — no over-fetching or under-fetching."
    source_title: "GraphQL Specification (October 2021)"
    source_url: "https://spec.graphql.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "The specification is maintained by the GraphQL Foundation (part of the Linux Foundation)."
    source_title: "GraphQL Specification (October 2021)"
    source_url: "https://spec.graphql.org/"
    confidence: "medium"
  - id: "fact-computer-science-004"
    statement: "Key adopters include GitHub, Shopify, Airbnb, and PayPal."
    source_title: "GraphQL Specification GitHub"
    source_url: "https://github.com/graphql/graphql-spec"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Statistics and data cited are from 2018 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "GraphQL Specification (October 2021)"
    type: "standard"
    url: "https://spec.graphql.org/"
    institution: "GraphQL Foundation"
  - title: "GraphQL Specification GitHub"
    type: "repository"
    url: "https://github.com/graphql/graphql-spec"
    institution: "GitHub"

secondary_sources:
  - title: "Learning GraphQL"
    authors: ["Porcello", "Banks"]
    type: "book"
    year: 2018
    url: "https://www.oreilly.com/library/view/learning-graphql/9781492030706/"
    institution: "O'Reilly"

---



## TL;DR

GraphQL is a query language and runtime for APIs developed by Facebook in 2012 and open-sourced in 2015. Unlike REST where the server defines fixed endpoints, GraphQL lets clients request exactly the data they need in a single request — no over-fetching or under-fetching. The specification is maintained by the GraphQL Foundation (part of the Linux Foundation). Key adopters include GitHub, Shopify, Airbnb, and PayPal.

## Core Concepts

- **Schema**: Strongly typed definition of available data and operations
- **Queries**: Read operations — `query { user(id: 1) { name, email } }`
- **Mutations**: Write operations — `mutation { createUser(name: "Alice") { id } }`
- **Subscriptions**: Real-time data via WebSocket
- **Resolvers**: Functions that fetch data for each field
- **Single Endpoint**: Typically `POST /graphql`

## Further Reading

- [GraphQL Spec](https://spec.graphql.org/): Official specification
- [GraphQL Foundation](https://graphql.org/foundation/): Governance body

## Related Articles

- [GraphQL Schema Design](../graphql-schema-design.md)