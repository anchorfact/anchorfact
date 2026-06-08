---
id: api-json-schema-additionalproperties-and-unevaluatedproperties
title: 'API JSON Schema additionalProperties and unevaluatedProperties'
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
  - id: fact-cs-api-json-schema-additionalproperties-and-unevaluatedproperties-1
    statement: >-
      JSON Schema documentation says additionalProperties controls properties
      whose names are not listed in properties or matched by patternProperties.
    source_title: JSON Schema Object Reference
    source_url: https://json-schema.org/understanding-json-schema/reference/object
    confidence: medium
  - id: fact-cs-api-json-schema-additionalproperties-and-unevaluatedproperties-2
    statement: >-
      JSON Schema documentation says additional properties are allowed by
      default.
    source_title: JSON Schema Object Reference
    source_url: https://json-schema.org/understanding-json-schema/reference/object
    confidence: medium
  - id: fact-cs-api-json-schema-additionalproperties-and-unevaluatedproperties-3
    statement: >-
      JSON Schema documentation says setting additionalProperties to false means
      no additional properties are allowed.
    source_title: JSON Schema Object Reference
    source_url: https://json-schema.org/understanding-json-schema/reference/object
    confidence: medium
  - id: fact-cs-api-json-schema-additionalproperties-and-unevaluatedproperties-4
    statement: >-
      JSON Schema documentation says unevaluatedProperties is similar to
      additionalProperties except it can recognize properties declared in
      subschemas.
    source_title: JSON Schema Object Reference
    source_url: https://json-schema.org/understanding-json-schema/reference/object
    confidence: medium
completeness: 0.82
known_gaps:
  - API schema diagnosis depends on JSON Schema dialect, OpenAPI version, validator behavior, properties, patternProperties, additionalProperties, unevaluatedProperties, allOf/anyOf/oneOf composition, generated SDK behavior, and whether unknown fields should be rejected or preserved for compatibility.
disputed_statements: []
primary_sources:
  - title: JSON Schema Object Reference
    type: documentation
    year: 2026
    url: https://json-schema.org/understanding-json-schema/reference/object
    institution: JSON Schema
  - title: JSON Schema 2020-12 Core
    type: specification
    year: 2020
    url: https://json-schema.org/draft/2020-12/json-schema-core
    institution: JSON Schema
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

JSON Schema object-boundary evidence tells agents whether an API, tool schema, or structured output contract rejects unknown fields or allows extension fields.

## Core Explanation

Agents often need to decide whether to send only documented fields or preserve unknown ones. In JSON Schema, that behavior is controlled by object keywords. `additionalProperties` constrains names not declared by `properties` or `patternProperties`; `unevaluatedProperties` matters when schemas are composed with subschemas.

Agents should inspect the schema dialect, object keywords, composition keywords, validator implementation, generated SDK behavior, and compatibility policy before removing unknown fields or tightening a schema.

## Source-Mapped Facts

- JSON Schema documentation says additionalProperties controls properties whose names are not listed in properties or matched by patternProperties. ([source](https://json-schema.org/understanding-json-schema/reference/object))
- JSON Schema documentation says additional properties are allowed by default. ([source](https://json-schema.org/understanding-json-schema/reference/object))
- JSON Schema documentation says setting additionalProperties to false means no additional properties are allowed. ([source](https://json-schema.org/understanding-json-schema/reference/object))
- JSON Schema documentation says unevaluatedProperties is similar to additionalProperties except it can recognize properties declared in subschemas. ([source](https://json-schema.org/understanding-json-schema/reference/object))

## Further Reading

- [JSON Schema Object Reference](https://json-schema.org/understanding-json-schema/reference/object)
- [JSON Schema 2020-12 Core](https://json-schema.org/draft/2020-12/json-schema-core)
