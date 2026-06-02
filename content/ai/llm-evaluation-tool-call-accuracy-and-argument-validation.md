---
id: llm-evaluation-tool-call-accuracy-and-argument-validation
title: 'LLM Evaluation Tool-Call Accuracy and Argument Validation'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-llm-evaluation-tool-call-accuracy-and-argument-validation-1
    statement: >-
      The MCP Tools specification says a tool definition includes a unique name,
      description, inputSchema, optional outputSchema, and optional annotations.
    source_title: MCP Tools Specification
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    confidence: medium
  - id: fact-ai-llm-evaluation-tool-call-accuracy-and-argument-validation-2
    statement: >-
      The MCP Tools specification says clients invoke a tool by sending a
      tools/call request with a tool name and arguments.
    source_title: MCP Tools Specification
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    confidence: medium
  - id: fact-ai-llm-evaluation-tool-call-accuracy-and-argument-validation-3
    statement: >-
      JSON Schema Validation 2020-12 says validation keywords in a schema impose
      requirements for successful validation of an instance.
    source_title: JSON Schema Validation 2020-12
    source_url: https://json-schema.org/draft/2020-12/json-schema-validation
    confidence: medium
completeness: 0.82
known_gaps:
  - Tool-call evaluation also needs task intent labels, allowed-tool sets, argument equivalence rules, execution side-effect policies, and provider-specific schema behavior.
disputed_statements: []
primary_sources:
  - title: MCP Tools Specification
    type: standard
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    institution: Model Context Protocol
  - title: JSON Schema Validation 2020-12
    type: standard
    year: 2020
    url: https://json-schema.org/draft/2020-12/json-schema-validation
    institution: JSON Schema
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Tool-call evaluation should score both routing accuracy and argument validity: whether the model selected the right tool and whether its arguments satisfy the declared schema and task intent.

## Core Explanation

A tool-calling model can fail in several distinct ways. It can choose the wrong tool, omit a required argument, hallucinate an unsupported argument, use a semantically wrong value, or produce a schema-valid call that is unsafe for the current task.

Agents and evaluators should log expected tool, actual tool, argument JSON, validation errors, execution status, and side-effect class. Schema validation is necessary, but it does not replace semantic checks against the user request.

## Source-Mapped Facts

- The MCP Tools specification says a tool definition includes a unique name, description, inputSchema, optional outputSchema, and optional annotations. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- The MCP Tools specification says clients invoke a tool by sending a tools/call request with a tool name and arguments. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- JSON Schema Validation 2020-12 says validation keywords in a schema impose requirements for successful validation of an instance. ([source](https://json-schema.org/draft/2020-12/json-schema-validation))

## Further Reading

- [MCP Tools Specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [JSON Schema Validation 2020-12](https://json-schema.org/draft/2020-12/json-schema-validation)
