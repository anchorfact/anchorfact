---
id: api-json-schema-dialects-and-vocabularies
title: 'API JSON Schema Dialects and Vocabularies'
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
  - id: fact-cs-api-json-schema-dialects-and-vocabularies-1
    statement: >-
      The JSON Schema 2020-12 Core specification defines a JSON Schema dialect
      as a set of vocabularies and their required support identified in a
      meta-schema.
    source_title: JSON Schema 2020-12 Core
    source_url: https://json-schema.org/draft/2020-12/json-schema-core
    confidence: medium
  - id: fact-cs-api-json-schema-dialects-and-vocabularies-2
    statement: >-
      The JSON Schema 2020-12 Core specification defines vocabularies as sets of
      keywords, their syntax, and their semantics.
    source_title: JSON Schema 2020-12 Core
    source_url: https://json-schema.org/draft/2020-12/json-schema-core
    confidence: medium
  - id: fact-cs-api-json-schema-dialects-and-vocabularies-3
    statement: >-
      The JSON Schema 2020-12 Validation specification describes validation as
      one purpose of JSON Schema for JSON instances.
    source_title: JSON Schema 2020-12 Validation
    source_url: https://json-schema.org/draft/2020-12/json-schema-validation
    confidence: medium
completeness: 0.82
known_gaps:
  - API schema compatibility depends on the dialect, validator implementation, OpenAPI version, unsupported keywords, custom vocabularies, nullable conventions, format handling, and code generator behavior.
disputed_statements: []
primary_sources:
  - title: JSON Schema 2020-12 Core
    type: standard
    year: 2022
    url: https://json-schema.org/draft/2020-12/json-schema-core
    institution: JSON Schema
  - title: JSON Schema 2020-12 Validation
    type: standard
    year: 2022
    url: https://json-schema.org/draft/2020-12/json-schema-validation
    institution: JSON Schema
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

JSON Schema dialects and vocabularies tell agents which validation keywords actually mean something for a given API contract.

## Core Explanation

Two schemas can look similar but use different drafts, vocabularies, and validator behavior. That matters when an agent generates tool arguments, client code, or contract tests. A keyword that is valid in one dialect may be ignored or interpreted differently elsewhere.

Agents should record the declared schema dialect, meta-schema URI, required vocabularies, validator version, OpenAPI version, custom keywords, format policy, and code generation target before treating validation results as authoritative.

## Source-Mapped Facts

- The JSON Schema 2020-12 Core specification defines a JSON Schema dialect as a set of vocabularies and their required support identified in a meta-schema. ([source](https://json-schema.org/draft/2020-12/json-schema-core))
- The JSON Schema 2020-12 Core specification defines vocabularies as sets of keywords, their syntax, and their semantics. ([source](https://json-schema.org/draft/2020-12/json-schema-core))
- The JSON Schema 2020-12 Validation specification describes validation as one purpose of JSON Schema for JSON instances. ([source](https://json-schema.org/draft/2020-12/json-schema-validation))

## Further Reading

- [JSON Schema 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core)
- [JSON Schema 2020-12 Validation](https://json-schema.org/draft/2020-12/json-schema-validation)
