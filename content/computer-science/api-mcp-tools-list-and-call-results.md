---
id: api-mcp-tools-list-and-call-results
title: 'API MCP Tools List and Call Results'
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
  - id: fact-cs-api-mcp-tools-list-and-call-results-1
    statement: >-
      The Model Context Protocol tools specification says servers can expose
      tools that language models can invoke.
    source_title: MCP Tools
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    confidence: medium
  - id: fact-cs-api-mcp-tools-list-and-call-results-2
    statement: >-
      The Model Context Protocol tools specification says clients send a
      tools/list request to discover available tools.
    source_title: MCP Tools
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    confidence: medium
  - id: fact-cs-api-mcp-tools-list-and-call-results-3
    statement: >-
      The Model Context Protocol schema reference defines CallToolResult as the
      server response to a tool call, including content and optional structured
      content.
    source_title: MCP Schema Reference
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/schema
    confidence: medium
completeness: 0.82
known_gaps:
  - MCP tool behavior depends on host consent UI, tool descriptions, input schemas, output schemas, resource links, error handling, timeouts, access control, rate limits, audit logging, and whether the client validates structured tool results before adding them to model context.
disputed_statements: []
primary_sources:
  - title: MCP Tools
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    institution: Model Context Protocol
  - title: MCP Schema Reference
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/schema
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP tool discovery and call results are core API evidence for agents because they define what the model can invoke and what came back.

## Core Explanation

An agent cannot safely call tools from memory. It needs the current tools/list response, including names, descriptions, input schemas, annotations, and any output schema. After invocation, it needs the tools/call request, arguments, returned content, structuredContent, isError status, and any linked resources.

This is also a security boundary. A useful audit trail should show what tool list was exposed to the model, which arguments were shown to the user or host policy, and how the result was validated before it influenced follow-up reasoning.

## Source-Mapped Facts

- The Model Context Protocol tools specification says servers can expose tools that language models can invoke. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- The Model Context Protocol tools specification says clients send a tools/list request to discover available tools. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- The Model Context Protocol schema reference defines CallToolResult as the server response to a tool call, including content and optional structured content. ([source](https://modelcontextprotocol.io/specification/2025-06-18/schema))

## Further Reading

- [MCP Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [MCP Schema Reference](https://modelcontextprotocol.io/specification/2025-06-18/schema)
