---
id: mcp-resources-and-prompts
title: 'MCP Resources and Prompts'
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
  - id: fact-mcp-resources-and-prompts-1
    statement: >-
      The MCP resources specification says resources let servers share context data with clients, such as files, database schemas, or application-specific information.
    source_title: Resources - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/resources
    confidence: medium
  - id: fact-mcp-resources-and-prompts-2
    statement: >-
      The MCP prompts specification says prompts let servers expose structured messages and instructions that clients can discover, retrieve, and customize with arguments.
    source_title: Prompts - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/prompts
    confidence: medium
  - id: fact-mcp-resources-and-prompts-3
    statement: >-
      The MCP roots specification says roots define filesystem boundaries that a client makes available to servers.
    source_title: Roots - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/roots
    confidence: medium
completeness: 0.84
known_gaps:
  - MCP implementations vary in how hosts surface resource pickers, prompt menus, and root boundaries to users.
disputed_statements: []
primary_sources:
  - title: Resources - Model Context Protocol
    type: standard
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/resources
    institution: Model Context Protocol
  - title: Prompts - Model Context Protocol
    type: standard
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/prompts
    institution: Model Context Protocol
  - title: Roots - Model Context Protocol
    type: standard
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/client/roots
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP resources expose contextual data, prompts expose reusable interaction templates, and roots define the filesystem scope a client is willing to share with a server.

## Core Explanation

Tools are not the whole MCP surface. Resources let an agent discover and read contextual data without treating every lookup as an action. Prompts let a server publish reusable task templates that a client can display and fill with arguments. Roots give a server explicit boundaries for local files or workspaces that the client has made available.

For agent infrastructure, these three concepts help separate "what context exists", "what workflow template can be invoked", and "what local scope is authorized". That separation is useful for product UIs, security review, and reliable context assembly.

## Source-Mapped Facts

- The MCP resources specification says resources let servers share context data with clients, such as files, database schemas, or application-specific information. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/resources))
- The MCP prompts specification says prompts let servers expose structured messages and instructions that clients can discover, retrieve, and customize with arguments. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts))
- The MCP roots specification says roots define filesystem boundaries that a client makes available to servers. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/roots))

## Further Reading

- [MCP resources](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)
- [MCP prompts](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)
- [MCP roots](https://modelcontextprotocol.io/specification/2025-06-18/client/roots)
