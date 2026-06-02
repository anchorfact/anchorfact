---
id: agent-tool-authorization-and-permissions
title: 'Agent Tool Authorization and Permissions'
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
  - id: fact-agent-tool-authorization-and-permissions-1
    statement: >-
      The Model Context Protocol authorization specification says a protected MCP server acts as an OAuth resource server and accepts protected resource requests using access tokens.
    source_title: Authorization - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
  - id: fact-agent-tool-authorization-and-permissions-2
    statement: >-
      RFC 6749 says OAuth 2.0 lets a third-party application obtain limited access to an HTTP service either on behalf of a resource owner or on its own behalf.
    source_title: RFC 6749 - The OAuth 2.0 Authorization Framework
    source_url: https://datatracker.ietf.org/doc/html/rfc6749
  - id: fact-agent-tool-authorization-and-permissions-3
    statement: >-
      The Model Context Protocol authorization specification requires MCP clients to implement Resource Indicators for OAuth 2.0 to specify the target resource for which a token is requested.
    source_title: Authorization - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
completeness: 0.84
known_gaps:
  - Fine-grained per-tool policy models are implementation-specific and may sit outside MCP or OAuth protocol text.
disputed_statements: []
primary_sources:
  - title: Authorization - Model Context Protocol
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
    institution: Model Context Protocol
  - title: RFC 6749 - The OAuth 2.0 Authorization Framework
    type: standard
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6749
    institution: IETF
  - title: RFC 8707 - Resource Indicators for OAuth 2.0
    type: standard
    year: 2020
    url: https://datatracker.ietf.org/doc/html/rfc8707
    institution: IETF
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent tool authorization controls which external systems an agent may call, which user or service identity the call uses, and whether the token is scoped to the intended resource.

## Core Explanation

Tool authorization is separate from tool selection. A model may decide that a tool is useful, but the runtime still needs identity, token audience, scopes, confirmation rules, and audit logging before execution. For agent systems that operate across many APIs, OAuth resource scoping and MCP authorization discovery prevent a single broad credential from becoming an ambient permission to every tool.

## Source-Mapped Facts

- The Model Context Protocol authorization specification says a protected MCP server acts as an OAuth resource server and accepts protected resource requests using access tokens. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))
- RFC 6749 says OAuth 2.0 lets a third-party application obtain limited access to an HTTP service either on behalf of a resource owner or on its own behalf. ([source](https://datatracker.ietf.org/doc/html/rfc6749))
- The Model Context Protocol authorization specification requires MCP clients to implement Resource Indicators for OAuth 2.0 to specify the target resource for which a token is requested. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))

## Further Reading

- [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)
- [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707)
