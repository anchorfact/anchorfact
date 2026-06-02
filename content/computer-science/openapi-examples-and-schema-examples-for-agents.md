---
id: openapi-examples-and-schema-examples-for-agents
title: 'OpenAPI Examples and Schema Examples for Agents'
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
  - id: fact-cs-openapi-examples-and-schema-examples-for-agents-1
    statement: >-
      OpenAPI 3.1.1 defines an Example Object that can include a summary, description, value, or
      externalValue.
    source_title: OpenAPI Specification 3.1.1
    source_url: https://spec.openapis.org/oas/v3.1.1.html
    confidence: medium
  - id: fact-cs-openapi-examples-and-schema-examples-for-agents-2
    statement: >-
      OpenAPI 3.1.1 says example and examples fields are mutually exclusive in a Media Type Object.
    source_title: OpenAPI Specification 3.1.1
    source_url: https://spec.openapis.org/oas/v3.1.1.html
    confidence: medium
  - id: fact-cs-openapi-examples-and-schema-examples-for-agents-3
    statement: >-
      JSON Schema documentation describes examples as an annotation keyword that provides sample
      JSON values associated with a schema.
    source_title: JSON Schema Annotations
    source_url: https://json-schema.org/understanding-json-schema/reference/annotations
    confidence: medium
completeness: 0.82
known_gaps:
  - Examples can be stale, partial, non-authoritative, or inconsistent with required fields, auth scopes, server variables, pagination, and error models.
disputed_statements: []
primary_sources:
  - title: OpenAPI Specification 3.1.1
    type: standard
    year: 2024
    url: https://spec.openapis.org/oas/v3.1.1.html
    institution: OpenAPI Initiative
  - title: JSON Schema Annotations
    type: documentation
    year: 2026
    url: https://json-schema.org/understanding-json-schema/reference/annotations
    institution: JSON Schema
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

OpenAPI examples help agents infer payload shape, but agents should validate examples against the schema before using them as tool-call templates.

## Core Explanation

Schemas define the contract; examples illustrate concrete payloads. Agents often need both. A schema can say a field is optional, while an example can show the common shape, nested objects, enum values, and realistic error payloads.

Good agent tool preparation records the operation ID, request schema, response schema, named examples, example provenance, and whether the sample validates against the current schema. Agents should not copy example secrets, placeholder IDs, or environment-specific URLs into real requests.

## Source-Mapped Facts

- OpenAPI 3.1.1 defines an Example Object that can include a summary, description, value, or externalValue. ([source](https://spec.openapis.org/oas/v3.1.1.html))
- OpenAPI 3.1.1 says example and examples fields are mutually exclusive in a Media Type Object. ([source](https://spec.openapis.org/oas/v3.1.1.html))
- JSON Schema documentation describes examples as an annotation keyword that provides sample JSON values associated with a schema. ([source](https://json-schema.org/understanding-json-schema/reference/annotations))

## Further Reading

- [OpenAPI Specification 3.1.1](https://spec.openapis.org/oas/v3.1.1.html)
- [JSON Schema Annotations](https://json-schema.org/understanding-json-schema/reference/annotations)
