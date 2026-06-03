---
id: api-graphql-defer-stream-and-incremental-delivery
title: 'API GraphQL Defer Stream and Incremental Delivery'
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
  - id: fact-cs-api-graphql-defer-stream-and-incremental-delivery-1
    statement: >-
      The GraphQL defer and stream RFC says servers that do not implement
      @defer or @stream should not expose those directives in their schema.
    source_title: GraphQL Defer and Stream RFC
    source_url: https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md
    confidence: medium
  - id: fact-cs-api-graphql-defer-stream-and-incremental-delivery-2
    statement: >-
      The GraphQL defer and stream RFC says queries containing unsupported
      @defer or @stream directives should fail validation.
    source_title: GraphQL Defer and Stream RFC
    source_url: https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md
    confidence: medium
  - id: fact-cs-api-graphql-defer-stream-and-incremental-delivery-3
    statement: >-
      The GraphQL defer and stream RFC says GraphQL-over-HTTP communications
      can naturally use HTTP chunked encoding for incremental delivery.
    source_title: GraphQL Defer and Stream RFC
    source_url: https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md
    confidence: medium
  - id: fact-cs-api-graphql-defer-stream-and-incremental-delivery-4
    statement: >-
      The GraphQL-over-HTTP Incremental Delivery RFC is titled Incremental
      Delivery over HTTP.
    source_title: GraphQL-over-HTTP Incremental Delivery RFC
    source_url: https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md
    confidence: medium
completeness: 0.78
known_gaps:
  - GraphQL incremental delivery remains implementation-sensitive; agents must check schema directives, transport negotiation, multipart or SSE response support, client patch handling, gateway support, caching layers, subscription behavior, and whether the deployed server implements the relevant draft semantics.
disputed_statements: []
primary_sources:
  - title: GraphQL Defer and Stream RFC
    type: specification
    year: 2026
    url: https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md
    institution: GraphQL Working Group
  - title: GraphQL-over-HTTP Incremental Delivery RFC
    type: specification
    year: 2026
    url: https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md
    institution: GraphQL over HTTP Working Group
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

GraphQL defer, stream, and incremental delivery are API contract features that agents must verify in the schema and transport before assuming partial responses will work.

## Core Explanation

Agents consuming GraphQL APIs sometimes need large responses where a useful initial result can arrive before all fields are ready. The important evidence is whether the server exposes `@defer` or `@stream`, whether the gateway and client support multiple payloads, and whether the HTTP transport negotiates a compatible response format.

An API agent should not add these directives just because a client library supports them. It should inspect the schema, server documentation, accepted response media types, validation errors, and client patch semantics before changing generated queries.

## Source-Mapped Facts

- The GraphQL defer and stream RFC says servers that do not implement @defer or @stream should not expose those directives in their schema. ([source](https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md))
- The GraphQL defer and stream RFC says queries containing unsupported @defer or @stream directives should fail validation. ([source](https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md))
- The GraphQL defer and stream RFC says GraphQL-over-HTTP communications can naturally use HTTP chunked encoding for incremental delivery. ([source](https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md))
- The GraphQL-over-HTTP Incremental Delivery RFC is titled Incremental Delivery over HTTP. ([source](https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md))

## Further Reading

- [GraphQL Defer and Stream RFC](https://github.com/graphql/graphql-wg/blob/main/rfcs/DeferStream.md)
- [GraphQL-over-HTTP Incremental Delivery RFC](https://github.com/graphql/graphql-over-http/blob/main/rfcs/IncrementalDelivery.md)
