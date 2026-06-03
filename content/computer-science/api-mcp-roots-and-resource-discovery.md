---
id: api-mcp-roots-and-resource-discovery
title: 'API MCP Roots and Resource Discovery'
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
  - id: fact-cs-api-mcp-roots-and-resource-discovery-1
    statement: >-
      The Model Context Protocol roots specification says roots define
      boundaries for where servers can operate within the filesystem.
    source_title: MCP Roots
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/roots
    confidence: medium
  - id: fact-cs-api-mcp-roots-and-resource-discovery-2
    statement: >-
      The Model Context Protocol roots specification says a root URI must be a
      file:// URI in the current specification.
    source_title: MCP Roots
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/roots
    confidence: medium
  - id: fact-cs-api-mcp-roots-and-resource-discovery-3
    statement: >-
      The Model Context Protocol resources specification says clients send a
      resources/list request to discover available resources.
    source_title: MCP Resources
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/resources
    confidence: medium
completeness: 0.82
known_gaps:
  - MCP roots and resource discovery behavior depends on client support, server trust, URI schemes, pagination, root list-change notifications, filesystem permissions, workspace remapping, resource subscriptions, and host UI choices for exposing context to the model.
disputed_statements: []
primary_sources:
  - title: MCP Roots
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/client/roots
    institution: Model Context Protocol
  - title: MCP Resources
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/resources
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP roots and resources tell agents what workspace boundaries and server-provided context are actually available before a tool tries to read files.

## Core Explanation

Developer-facing agents often fail when they assume a path exists, read outside the intended workspace, or miss structured resources that a server already exposes. MCP separates client-provided roots from server-provided resources. Roots describe filesystem boundaries from the client side; resources expose files, schemas, or application context from the server side.

An agent should preserve root URIs, root names, resource URIs, resource MIME types, pagination cursors, and list-change notifications. That evidence is the difference between a reproducible context lookup and an implicit filesystem guess.

## Source-Mapped Facts

- The Model Context Protocol roots specification says roots define boundaries for where servers can operate within the filesystem. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/roots))
- The Model Context Protocol roots specification says a root URI must be a file:// URI in the current specification. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/roots))
- The Model Context Protocol resources specification says clients send a resources/list request to discover available resources. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/resources))

## Further Reading

- [MCP Roots](https://modelcontextprotocol.io/specification/2025-06-18/client/roots)
- [MCP Resources](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)
