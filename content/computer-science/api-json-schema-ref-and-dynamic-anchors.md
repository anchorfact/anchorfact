---
id: api-json-schema-ref-and-dynamic-anchors
title: 'API JSON Schema Ref and Dynamic Anchors'
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
  - id: fact-computer-science-api-json-schema-ref-and-dynamic-anchors-1
    statement: >-
      JSON Schema Core 2020-12 defines $ref as an applicator used to reference
      a statically identified schema.
    source_title: JSON Schema Core 2020-12
    source_url: https://json-schema.org/draft/2020-12/json-schema-core
    confidence: medium
  - id: fact-computer-science-api-json-schema-ref-and-dynamic-anchors-2
    statement: >-
      JSON Schema Core 2020-12 defines $dynamicRef as an applicator used to
      reference an extensible schema.
    source_title: JSON Schema Core 2020-12
    source_url: https://json-schema.org/draft/2020-12/json-schema-core
    confidence: medium
  - id: fact-computer-science-api-json-schema-ref-and-dynamic-anchors-3
    statement: >-
      JSON Schema Core 2020-12 defines $dynamicAnchor as a keyword that
      identifies an extensible schema for $dynamicRef.
    source_title: JSON Schema Core 2020-12
    source_url: https://json-schema.org/draft/2020-12/json-schema-core
    confidence: medium
  - id: fact-computer-science-api-json-schema-ref-and-dynamic-anchors-4
    statement: >-
      The JSON Schema structuring guide describes references as a way to avoid
      copying and pasting schemas.
    source_title: JSON Schema Structuring Guide
    source_url: https://json-schema.org/understanding-json-schema/structuring
    confidence: medium
  - id: fact-computer-science-api-json-schema-ref-and-dynamic-anchors-5
    statement: >-
      The JSON Schema structuring guide says $defs reserves a location for
      reusable schemas.
    source_title: JSON Schema Structuring Guide
    source_url: https://json-schema.org/understanding-json-schema/structuring
    confidence: medium
completeness: 0.82
known_gaps:
  - JSON Schema reference diagnosis depends on dialect, base URI, $id placement, bundling strategy, resolver implementation, remote reference availability, recursive schema structure, dynamic scope, and whether an API tool generator preserves $defs and annotations.
disputed_statements: []
primary_sources:
  - title: JSON Schema Core 2020-12
    type: specification
    year: 2022
    url: https://json-schema.org/draft/2020-12/json-schema-core
    institution: JSON Schema
  - title: JSON Schema Structuring Guide
    type: documentation
    year: 2026
    url: https://json-schema.org/understanding-json-schema/structuring
    institution: JSON Schema
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

JSON Schema reference evidence tells API agents whether a tool schema failed because of resolution, dialect mismatch, reusable definitions, or dynamic anchor behavior.

## Core Explanation

Agents often consume OpenAPI or tool schemas after a bundler has expanded or rewritten references. If `$ref`, `$defs`, `$dynamicRef`, or `$dynamicAnchor` are mishandled, an agent can validate the wrong parameter shape or omit required nested constraints.

Useful evidence includes the declared dialect, root URI, `$id` values, resolver base URI, local and remote references, `$defs` entries, dynamic anchors, bundled output, and validator version. A schema that passes one resolver can fail another when base URI or dynamic scope is different.

## Source-Mapped Facts

- JSON Schema Core 2020-12 defines `$ref` as an applicator used to reference a statically identified schema. ([source](https://json-schema.org/draft/2020-12/json-schema-core))
- JSON Schema Core 2020-12 defines `$dynamicRef` as an applicator used to reference an extensible schema. ([source](https://json-schema.org/draft/2020-12/json-schema-core))
- JSON Schema Core 2020-12 defines `$dynamicAnchor` as a keyword that identifies an extensible schema for `$dynamicRef`. ([source](https://json-schema.org/draft/2020-12/json-schema-core))
- The JSON Schema structuring guide describes references as a way to avoid copying and pasting schemas. ([source](https://json-schema.org/understanding-json-schema/structuring))
- The JSON Schema structuring guide says `$defs` reserves a location for reusable schemas. ([source](https://json-schema.org/understanding-json-schema/structuring))

## Further Reading

- [JSON Schema Core 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)
- [JSON Schema Structuring Guide](https://json-schema.org/understanding-json-schema/structuring)
