---
id: llm-evaluation-structured-output-validity
title: 'LLM Evaluation Structured Output Validity'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-structured-output-validity-1
    statement: >-
      OpenAI Structured Outputs documentation describes supplying a JSON Schema in an API call
      with response_format set to json_schema and strict set to true.
    source_title: OpenAI Structured Model Outputs
    source_url: https://developers.openai.com/api/docs/guides/structured-outputs
    confidence: medium
  - id: fact-ai-llm-evaluation-structured-output-validity-2
    statement: >-
      JSON Schema documentation defines a JSON Schema document as a JSON document used to
      describe an instance.
    source_title: JSON Schema Core
    source_url: https://json-schema.org/draft/2020-12/json-schema-core
    confidence: medium
  - id: fact-ai-llm-evaluation-structured-output-validity-3
    statement: >-
      Pydantic documentation describes JSON Schema generation as a feature for Pydantic models.
    source_title: Pydantic JSON Schema
    source_url: https://docs.pydantic.dev/latest/concepts/json_schema/
    confidence: medium
completeness: 0.83
known_gaps:
  - Structured-output validity is not the same as task correctness; systems still need semantic checks, enum coverage, refusal handling, versioned schemas, and downstream contract tests.
disputed_statements: []
primary_sources:
  - title: OpenAI Structured Model Outputs
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/structured-outputs
    institution: OpenAI
  - title: JSON Schema Core
    type: standard
    year: 2020
    url: https://json-schema.org/draft/2020-12/json-schema-core
    institution: JSON Schema
  - title: Pydantic JSON Schema
    type: documentation
    year: 2026
    url: https://docs.pydantic.dev/latest/concepts/json_schema/
    institution: Pydantic
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Structured-output validity evaluates whether an LLM response can be parsed and validated against the schema that downstream software expects.

## Core Explanation

Tool calls, extraction workflows, and API agents often need JSON that satisfies a contract. A response can be fluent and still fail because a required field is missing, an enum is invalid, a number is emitted as text, or an object shape changed.

Agents should track parse success, schema validation errors, unsupported fields, null handling, refusal paths, and schema version compatibility separately from answer-quality scores.

## Source-Mapped Facts

- OpenAI Structured Outputs documentation describes supplying a JSON Schema in an API call with response_format set to json_schema and strict set to true. ([source](https://developers.openai.com/api/docs/guides/structured-outputs))
- JSON Schema documentation defines a JSON Schema document as a JSON document used to describe an instance. ([source](https://json-schema.org/draft/2020-12/json-schema-core))
- Pydantic documentation describes JSON Schema generation as a feature for Pydantic models. ([source](https://docs.pydantic.dev/latest/concepts/json_schema/))

## Further Reading

- [OpenAI Structured Model Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [JSON Schema Core](https://json-schema.org/draft/2020-12/json-schema-core)
- [Pydantic JSON Schema](https://docs.pydantic.dev/latest/concepts/json_schema/)
