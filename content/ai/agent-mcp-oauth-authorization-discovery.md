---
id: agent-mcp-oauth-authorization-discovery
title: 'Agent MCP OAuth Authorization Discovery'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-mcp-oauth-authorization-discovery-1
    statement: >-
      The Model Context Protocol authorization specification says authorization
      is optional, and HTTP-based implementations that support it should conform
      to the MCP authorization specification.
    source_title: MCP Authorization
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
    confidence: medium
  - id: fact-ai-agent-mcp-oauth-authorization-discovery-2
    statement: >-
      RFC 8414 specifies OAuth 2.0 Authorization Server Metadata for publishing
      authorization server endpoint and capability metadata.
    source_title: RFC 8414 OAuth 2.0 Authorization Server Metadata
    source_url: https://datatracker.ietf.org/doc/html/rfc8414
    confidence: medium
  - id: fact-ai-agent-mcp-oauth-authorization-discovery-3
    statement: >-
      RFC 9728 specifies OAuth 2.0 Protected Resource Metadata for publishing
      metadata about protected resources.
    source_title: RFC 9728 OAuth 2.0 Protected Resource Metadata
    source_url: https://datatracker.ietf.org/doc/html/rfc9728
    confidence: medium
completeness: 0.84
known_gaps:
  - MCP authorization behavior depends on transport, client type, resource server metadata, authorization server metadata, dynamic client registration support, token audience, and tool-level authorization policy.
  - This article does not replace provider-specific OAuth configuration or enterprise identity policy.
disputed_statements: []
primary_sources:
  - title: MCP Authorization
    type: documentation
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
    institution: Model Context Protocol
  - title: RFC 8414 OAuth 2.0 Authorization Server Metadata
    type: rfc
    year: 2018
    url: https://datatracker.ietf.org/doc/html/rfc8414
    institution: IETF
  - title: RFC 9728 OAuth 2.0 Protected Resource Metadata
    type: rfc
    year: 2025
    url: https://datatracker.ietf.org/doc/html/rfc9728
    institution: IETF
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP authorization evidence should include resource metadata, authorization server metadata, token audience, scopes, and transport mode before an agent calls restricted tools.

## Core Explanation

Agents that connect to remote MCP servers need more than a bearer token. They need to know which MCP server the token was issued for, which authorization server issued it, what scopes or privileges apply, and how the client discovered those endpoints.

The evidence trail should preserve the MCP server URL, protected resource metadata URL, authorization server issuer, client ID, requested scopes, resource parameter, token audience validation behavior, and HTTP status or WWW-Authenticate challenge. Without that evidence, an agent can accidentally reuse a token for the wrong resource or misdiagnose an authorization failure as a tool failure.

For local STDIO MCP servers, credential handling is different from HTTP transport. Agents should not apply remote OAuth assumptions to local environment-provided credentials.

## Source-Mapped Facts

- The Model Context Protocol authorization specification says authorization is optional, and HTTP-based implementations that support it should conform to the MCP authorization specification. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))
- RFC 8414 specifies OAuth 2.0 Authorization Server Metadata for publishing authorization server endpoint and capability metadata. ([source](https://datatracker.ietf.org/doc/html/rfc8414))
- RFC 9728 specifies OAuth 2.0 Protected Resource Metadata for publishing metadata about protected resources. ([source](https://datatracker.ietf.org/doc/html/rfc9728))

## Further Reading

- [MCP Authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- [RFC 8414 OAuth 2.0 Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414)
- [RFC 9728 OAuth 2.0 Protected Resource Metadata](https://datatracker.ietf.org/doc/html/rfc9728)
