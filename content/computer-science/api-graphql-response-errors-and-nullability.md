---
id: api-graphql-response-errors-and-nullability
title: 'API GraphQL Response Errors and Nullability'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-api-graphql-response-errors-and-nullability-1
    statement: >-
      The GraphQL specification says a response may contain both a partial
      response and encountered errors.
    source_title: GraphQL Specification Response Format
    source_url: https://spec.graphql.org/October2021/#sec-Response-Format
    confidence: medium
  - id: fact-cs-api-graphql-response-errors-and-nullability-2
    statement: >-
      The GraphQL specification says the errors entry in a response is a
      non-empty list of errors raised during request processing.
    source_title: GraphQL Specification Errors
    source_url: https://spec.graphql.org/October2021/#sec-Errors
    confidence: medium
  - id: fact-cs-api-graphql-response-errors-and-nullability-3
    statement: >-
      The GraphQL specification says every error must contain an entry named
      message with a description of the error.
    source_title: GraphQL Specification Errors
    source_url: https://spec.graphql.org/October2021/#sec-Errors
    confidence: medium
  - id: fact-cs-api-graphql-response-errors-and-nullability-4
    statement: >-
      The GraphQL specification says GraphQL fields are nullable by default.
    source_title: GraphQL Specification Non-Null
    source_url: https://spec.graphql.org/October2021/#sec-Non-Null
    confidence: medium
  - id: fact-cs-api-graphql-response-errors-and-nullability-5
    statement: >-
      The GraphQL specification says if a field error is raised while resolving a
      field, the field is treated as if it returned null.
    source_title: GraphQL Specification Handling Field Errors
    source_url: https://spec.graphql.org/October2021/#sec-Handling-Field-Errors
    confidence: medium
completeness: 0.82
known_gaps:
  - GraphQL response diagnosis depends on server implementation, transport status policy, operation name, variables, resolver behavior, non-null propagation, federation layer, custom error extensions, and whether clients preserve partial data.
disputed_statements: []
primary_sources:
  - title: GraphQL Specification Response Format
    type: standard
    year: 2021
    url: https://spec.graphql.org/October2021/#sec-Response-Format
    institution: GraphQL Foundation
  - title: GraphQL Specification Errors
    type: standard
    year: 2021
    url: https://spec.graphql.org/October2021/#sec-Errors
    institution: GraphQL Foundation
  - title: GraphQL Specification Non-Null
    type: standard
    year: 2021
    url: https://spec.graphql.org/October2021/#sec-Non-Null
    institution: GraphQL Foundation
  - title: GraphQL Specification Handling Field Errors
    type: standard
    year: 2021
    url: https://spec.graphql.org/October2021/#sec-Handling-Field-Errors
    institution: GraphQL Foundation
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GraphQL response errors and nullability help agents distinguish a total API failure from a partial response with field-level resolver errors.

## Core Explanation

GraphQL clients often receive useful `data` alongside `errors`. An agent should preserve the full response envelope, selected fields, error messages, paths, locations, extensions, variables, and schema nullability before declaring the request unusable.

Nullability matters because a nullable field can fail locally, while a non-null field error can propagate upward and null a larger part of the response. For API debugging, that means the fix may be in a resolver, a schema contract, or a client assumption about partial data.

## Source-Mapped Facts

- The GraphQL specification says a response may contain both a partial response and encountered errors. ([source](https://spec.graphql.org/October2021/#sec-Response-Format))
- The GraphQL specification says the errors entry in a response is a non-empty list of errors raised during request processing. ([source](https://spec.graphql.org/October2021/#sec-Errors))
- The GraphQL specification says every error must contain an entry named message with a description of the error. ([source](https://spec.graphql.org/October2021/#sec-Errors))
- The GraphQL specification says GraphQL fields are nullable by default. ([source](https://spec.graphql.org/October2021/#sec-Non-Null))
- The GraphQL specification says if a field error is raised while resolving a field, the field is treated as if it returned null. ([source](https://spec.graphql.org/October2021/#sec-Handling-Field-Errors))

## Further Reading

- [GraphQL Response Format](https://spec.graphql.org/October2021/#sec-Response-Format)
- [GraphQL Errors](https://spec.graphql.org/October2021/#sec-Errors)
- [GraphQL Non-Null](https://spec.graphql.org/October2021/#sec-Non-Null)
- [GraphQL Handling Field Errors](https://spec.graphql.org/October2021/#sec-Handling-Field-Errors)
