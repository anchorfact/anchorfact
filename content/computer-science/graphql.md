---
id: "kb-2026-00074"
title: "GraphQL"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
derived_from_human_seed: true
primary_sources:
  - title: "GraphQL Specification (October 2021)"
    type: "standard"
    url: "https://spec.graphql.org/"
    institution: "GraphQL Foundation"
  - title: "GraphQL Specification GitHub"
    type: "repository"
    url: "https://github.com/graphql/graphql-spec"
    stars: 14571
completeness: 0.82
ai_citations: {last_citation_check: "2026-05-22"}
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
