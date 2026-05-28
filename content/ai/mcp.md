---
id: kb-2026-00016
title: Model Context Protocol (MCP)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-mcp-1
    statement: >-
      Anthropic introduced the Model Context Protocol in November 2024 as a standard for connecting
      AI assistants to systems where data lives.
    source_title: Introducing the Model Context Protocol
    source_url: https://www.anthropic.com/news/model-context-protocol
    confidence: medium
  - id: fact-ai-mcp-2
    statement: >-
      MCP documentation describes MCP as an open-source standard for connecting AI applications to
      external systems such as data sources, tools, and workflows.
    source_title: Model Context Protocol Introduction
    source_url: https://modelcontextprotocol.io/docs/getting-started/intro
    confidence: medium
  - id: fact-ai-mcp-3
    statement: >-
      The MCP architecture documentation describes MCP as a host-client-server architecture in which
      hosts connect to one or more MCP servers through clients.
    source_title: Model Context Protocol Architecture
    source_url: https://modelcontextprotocol.io/docs/learn/architecture
    confidence: medium
completeness: 0.82
known_gaps:
  - Specialized edge cases and implementation details are outside this source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: Introducing the Model Context Protocol
    authors:
      - Anthropic
    type: announcement
    year: 2024
    url: https://www.anthropic.com/news/model-context-protocol
    institution: Anthropic
  - title: Model Context Protocol Introduction
    type: documentation
    year: 2026
    url: https://modelcontextprotocol.io/docs/getting-started/intro
    institution: Model Context Protocol
  - title: Model Context Protocol Architecture
    type: documentation
    year: 2026
    url: https://modelcontextprotocol.io/docs/learn/architecture
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-05-28'
ai_models:
  - claude-opus
---

## TL;DR

Model Context Protocol is an open standard for connecting AI applications to external systems through a host-client-server architecture.

## Core Explanation

The public page emphasizes the durable protocol shape: a standard connection model, official architecture, and the original Anthropic announcement.

## Source-Mapped Facts

- Anthropic introduced the Model Context Protocol in November 2024 as a standard for connecting AI assistants to systems where data lives. ([source](https://www.anthropic.com/news/model-context-protocol))
- MCP documentation describes MCP as an open-source standard for connecting AI applications to external systems such as data sources, tools, and workflows. ([source](https://modelcontextprotocol.io/docs/getting-started/intro))
- The MCP architecture documentation describes MCP as a host-client-server architecture in which hosts connect to one or more MCP servers through clients. ([source](https://modelcontextprotocol.io/docs/learn/architecture))

## Further Reading

- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Model Context Protocol Introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Model Context Protocol Architecture](https://modelcontextprotocol.io/docs/learn/architecture)
