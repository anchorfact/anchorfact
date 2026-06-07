---
id: agent-output-validation-and-repair-loops
title: 'Agent Output Validation and Repair Loops'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-07'
created_date: '2026-06-07'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-output-validation-and-repair-loops-1
    statement: >-
      OpenAI structured outputs documentation says Structured Outputs can make model output match
      a developer-supplied JSON Schema.
    source_title: OpenAI Structured Outputs
    source_url: https://platform.openai.com/docs/guides/structured-outputs
    confidence: medium
  - id: fact-ai-agent-output-validation-and-repair-loops-2
    statement: >-
      JSON Schema validation documentation describes validation keywords as assertions that a JSON
      instance must satisfy.
    source_title: JSON Schema Validation Draft 2020-12
    source_url: https://json-schema.org/draft/2020-12/json-schema-validation
    confidence: medium
  - id: fact-ai-agent-output-validation-and-repair-loops-3
    statement: >-
      The Model Context Protocol tools specification says a tool definition includes an
      inputSchema describing the expected parameters.
    source_title: Model Context Protocol Tools Specification
    source_url: https://modelcontextprotocol.io/specification/2024-11-05/server/tools
    confidence: medium
completeness: 0.83
known_gaps:
  - Schema-valid output can still be semantically wrong, unauthorized, stale, or unsafe to execute.
  - Provider-specific structured-output subsets and refusal formats must be checked before relying on portable schemas.
disputed_statements: []
primary_sources:
  - title: OpenAI Structured Outputs
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/structured-outputs
    institution: OpenAI
  - title: JSON Schema Validation Draft 2020-12
    type: standard
    year: 2022
    url: https://json-schema.org/draft/2020-12/json-schema-validation
    institution: JSON Schema
  - title: Model Context Protocol Tools Specification
    type: standard
    year: 2024
    url: https://modelcontextprotocol.io/specification/2024-11-05/server/tools
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-07'
ai_models:
  - gpt-5-codex
---

## TL;DR

Output validation checks whether an agent produced the shape required by a contract; repair loops decide whether to retry, ask for clarification, or fail closed.

## Core Explanation

Agents should not treat model text as executable truth. A robust loop parses the output, validates it against a schema, checks semantic constraints, and records any validation errors before a retry. The repair prompt should include the specific validation error and the required contract, not a vague request to "fix the JSON."

The loop also needs a stop condition. After a small number of repair attempts, the safer behavior is usually to fail closed, return the validation error, or ask for human review rather than silently applying malformed output.

## Source-Mapped Facts

- OpenAI structured outputs documentation says Structured Outputs can make model output match a developer-supplied JSON Schema. ([source](https://platform.openai.com/docs/guides/structured-outputs))
- JSON Schema validation documentation describes validation keywords as assertions that a JSON instance must satisfy. ([source](https://json-schema.org/draft/2020-12/json-schema-validation))
- The Model Context Protocol tools specification says a tool definition includes an inputSchema describing the expected parameters. ([source](https://modelcontextprotocol.io/specification/2024-11-05/server/tools))

## Further Reading

- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [JSON Schema Validation Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-validation)
- [Model Context Protocol Tools Specification](https://modelcontextprotocol.io/specification/2024-11-05/server/tools)
