---
id: agent-tool-schema-validation
title: 'Agent Tool Schema Validation'
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
  - id: fact-agent-tool-schema-validation-1
    statement: >-
      The Model Context Protocol tools specification says a tool definition includes an inputSchema JSON Schema for expected parameters and an optional outputSchema JSON Schema for expected output structure.
    source_title: Tools - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
  - id: fact-agent-tool-schema-validation-2
    statement: >-
      JSON Schema Validation Draft 2020-12 specifies a vocabulary for JSON instance validation and assertions about what a valid document must look like.
    source_title: JSON Schema Validation - Draft 2020-12
    source_url: https://json-schema.org/draft/2020-12/json-schema-validation
  - id: fact-agent-tool-schema-validation-3
    statement: >-
      OpenAI function calling documentation says setting strict to true makes function calls reliably adhere to the function schema instead of being best effort.
    source_title: Function calling - OpenAI API
    source_url: https://platform.openai.com/docs/guides/function-calling?api-mode=chat
completeness: 0.84
known_gaps:
  - Provider-specific JSON Schema subsets, unsupported keywords, and schema portability change over time.
disputed_statements: []
primary_sources:
  - title: Tools - Model Context Protocol
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    institution: Model Context Protocol
  - title: JSON Schema Validation - Draft 2020-12
    type: specification
    year: 2022
    url: https://json-schema.org/draft/2020-12/json-schema-validation
    institution: JSON Schema
  - title: Function calling - OpenAI API
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/function-calling?api-mode=chat
    institution: OpenAI
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent tool schema validation is the practice of defining, constraining, and checking the structured inputs and outputs that flow between an LLM agent and external tools.

## Core Explanation

Tool schemas are a reliability boundary. They tell the model what arguments a tool accepts, help the runtime reject malformed calls, and give downstream code a predictable output contract. In production agent systems, schemas should be versioned, validated before execution, validated again after tool return, and paired with separate authorization and side-effect policies.

## Source-Mapped Facts

- The Model Context Protocol tools specification says a tool definition includes an inputSchema JSON Schema for expected parameters and an optional outputSchema JSON Schema for expected output structure. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- JSON Schema Validation Draft 2020-12 specifies a vocabulary for JSON instance validation and assertions about what a valid document must look like. ([source](https://json-schema.org/draft/2020-12/json-schema-validation))
- OpenAI function calling documentation says setting strict to true makes function calls reliably adhere to the function schema instead of being best effort. ([source](https://platform.openai.com/docs/guides/function-calling?api-mode=chat))

## Further Reading

- [MCP tools specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [JSON Schema Validation Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-validation)
- [OpenAI function calling](https://platform.openai.com/docs/guides/function-calling?api-mode=chat)
