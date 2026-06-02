---
id: api-mcp-sampling-and-elicitation
title: 'API MCP Sampling and Elicitation'
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
  - id: fact-cs-api-mcp-sampling-and-elicitation-1
    statement: >-
      The Model Context Protocol sampling specification says servers send a
      sampling/createMessage request to request language model generation.
    source_title: MCP Sampling
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/sampling
    confidence: medium
  - id: fact-cs-api-mcp-sampling-and-elicitation-2
    statement: >-
      The Model Context Protocol sampling specification says applications
      should provide a human in the loop with the ability to deny sampling
      requests.
    source_title: MCP Sampling
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/sampling
    confidence: medium
  - id: fact-cs-api-mcp-sampling-and-elicitation-3
    statement: >-
      The Model Context Protocol elicitation specification defines a client
      capability that lets servers request additional user information.
    source_title: MCP Elicitation
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation
    confidence: medium
completeness: 0.82
known_gaps:
  - MCP sampling and elicitation safety depends on client capabilities, user review UI, prompt visibility, schema validation, privacy policy, server trust, consent logging, and whether sampled model output is allowed to trigger follow-up tool calls.
disputed_statements: []
primary_sources:
  - title: MCP Sampling
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/client/sampling
    institution: Model Context Protocol
  - title: MCP Elicitation
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP sampling and elicitation give agent tool servers protocol-level ways to ask the client for model generation or user-provided information, which makes consent and review boundaries part of the API contract.

## Core Explanation

MCP tools are not limited to one-way tool calls. A server can ask the client to sample from a language model, and it can request structured information from the user. Those features are powerful because they cross trust boundaries between server, client, model, and human.

Agents should preserve client capability negotiation, request schemas, user review state, prompt text, sampled output, and whether the server is allowed to continue after the response. A sampling or elicitation request should be auditable, especially when it could reveal private context or trigger side effects.

## Source-Mapped Facts

- The Model Context Protocol sampling specification says servers send a sampling/createMessage request to request language model generation. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling))
- The Model Context Protocol sampling specification says applications should provide a human in the loop with the ability to deny sampling requests. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling))
- The Model Context Protocol elicitation specification defines a client capability that lets servers request additional user information. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation))

## Further Reading

- [MCP Sampling](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling)
- [MCP Elicitation](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)
