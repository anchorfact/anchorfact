---
id: ai-tool-use-and-function-calling
title: 'AI Tool Use and Function Calling'
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
  - id: fact-ai-tool-use-and-function-calling-1
    statement: >-
      OpenAI function calling documentation describes function calling, also called tool calling,
      as a way for models to interface with external systems and access data outside their
      training data.
    source_title: OpenAI Function Calling Guide
    source_url: https://developers.openai.com/api/docs/guides/function-calling
    confidence: medium
  - id: fact-ai-tool-use-and-function-calling-2
    statement: >-
      OpenAI documentation says a function is a specific kind of tool defined by a JSON schema,
      allowing the model to pass data to application code.
    source_title: OpenAI Function Calling Guide
    source_url: https://developers.openai.com/api/docs/guides/function-calling
    confidence: medium
  - id: fact-ai-tool-use-and-function-calling-3
    statement: >-
      Anthropic documentation says Claude can call functions that developers define or tools that
      Anthropic provides, returning a structured call for client-side tools.
    source_title: Anthropic Tool Use With Claude
    source_url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
    confidence: medium
  - id: fact-ai-tool-use-and-function-calling-4
    statement: >-
      The Model Context Protocol tools specification says each MCP tool is identified by a name
      and includes metadata describing its input schema.
    source_title: Model Context Protocol Tools Specification
    source_url: https://modelcontextprotocol.io/specification/2024-11-05/server/tools
    confidence: medium
completeness: 0.84
known_gaps:
  - Provider-specific tool choice controls, pricing, and supported schema subsets can change and need current vendor checks.
disputed_statements: []
primary_sources:
  - title: OpenAI Function Calling Guide
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/function-calling
    institution: OpenAI
  - title: Anthropic Tool Use With Claude
    type: documentation
    year: 2026
    url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
    institution: Anthropic
  - title: Model Context Protocol Tools Specification
    type: standard
    year: 2024
    url: https://modelcontextprotocol.io/specification/2024-11-05/server/tools
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Tool use lets an AI system request external functions, APIs, data lookups, or computations through explicit schemas instead of relying only on text generation.

## Core Explanation

For agents, tool use is an execution boundary. The model may decide that a prompt requires a tool, but application or server code still owns the actual operation, validation, permission checks, result handling, and audit trail. Function calling is the common API shape for application-owned tools because the tool definition gives the model a structured argument contract.

MCP generalizes this pattern across clients and servers: a server exposes named tools with input schemas, and clients decide how tool discovery, invocation, user confirmation, and result validation are presented.

## Source-Mapped Facts

- OpenAI function calling documentation describes function calling, also called tool calling, as a way for models to interface with external systems and access data outside their training data. ([source](https://developers.openai.com/api/docs/guides/function-calling))
- OpenAI documentation says a function is a specific kind of tool defined by a JSON schema, allowing the model to pass data to application code. ([source](https://developers.openai.com/api/docs/guides/function-calling))
- Anthropic documentation says Claude can call functions that developers define or tools that Anthropic provides, returning a structured call for client-side tools. ([source](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview))
- The Model Context Protocol tools specification says each MCP tool is identified by a name and includes metadata describing its input schema. ([source](https://modelcontextprotocol.io/specification/2024-11-05/server/tools))

## Further Reading

- [OpenAI Function Calling Guide](https://developers.openai.com/api/docs/guides/function-calling)
- [Anthropic Tool Use With Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [Model Context Protocol Tools Specification](https://modelcontextprotocol.io/specification/2024-11-05/server/tools)
