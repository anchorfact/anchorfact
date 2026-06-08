---
id: api-mcp-authorization-and-oauth-protected-resources
title: 'API MCP Authorization and OAuth Protected Resources'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-api-mcp-authorization-and-oauth-protected-resources-1
    statement: >-
      The MCP authorization specification defines authorization requirements for
      MCP implementations that use HTTP transport.
    source_title: MCP Authorization
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
    confidence: medium
  - id: fact-cs-api-mcp-authorization-and-oauth-protected-resources-2
    statement: >-
      RFC 8707 defines an OAuth 2.0 resource parameter for indicating the
      intended target service for an access request.
    source_title: RFC 8707 OAuth 2.0 Resource Indicators
    source_url: https://datatracker.ietf.org/doc/html/rfc8707
    confidence: medium
  - id: fact-cs-api-mcp-authorization-and-oauth-protected-resources-3
    statement: >-
      RFC 6750 specifies how bearer tokens are used to access OAuth 2.0 protected
      resources.
    source_title: RFC 6750 OAuth 2.0 Bearer Token Usage
    source_url: https://datatracker.ietf.org/doc/html/rfc6750
    confidence: medium
completeness: 0.84
known_gaps:
  - MCP authorization behavior depends on the host, client, authorization server, resource server metadata, token audience, scopes, and transport security.
  - Agent-facing tool catalogs can expose many resources, so authorization checks must be tied to the specific protected resource and not only to a broad user login.
disputed_statements: []
primary_sources:
  - title: MCP Authorization
    type: technical_specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization
    institution: Model Context Protocol
  - title: RFC 8707 OAuth 2.0 Resource Indicators
    type: technical_specification
    year: 2020
    url: https://datatracker.ietf.org/doc/html/rfc8707
    institution: IETF
  - title: RFC 6750 OAuth 2.0 Bearer Token Usage
    type: technical_specification
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6750
    institution: IETF
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP authorization needs OAuth-style protected-resource boundaries so agents can discover tools without gaining access to every connected system.

## Core Explanation

An MCP client can expose tools, resources, prompts, and workflows that sit behind real production systems. Authorization therefore has to answer two questions at once: whether the user or agent is allowed to use the MCP server, and whether a requested call is allowed for the specific protected resource.

Useful evidence includes the MCP server URL, transport, authorization server metadata, protected resource identifier, token audience, scopes, client identity, user identity, consent record, requested method, and audit trail. A token that is valid for one API should not be assumed valid for another tool surface just because both are reachable through the same agent host.

For API designers, MCP authorization should be reviewed together with normal API security. Agents need enough metadata to request the right token and explain failures, while servers still need server-side enforcement for each protected resource and operation.

## Source-Mapped Facts

- The MCP authorization specification defines authorization requirements for MCP implementations that use HTTP transport. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization))
- RFC 8707 defines an OAuth 2.0 resource parameter for indicating the intended target service for an access request. ([source](https://datatracker.ietf.org/doc/html/rfc8707))
- RFC 6750 specifies how bearer tokens are used to access OAuth 2.0 protected resources. ([source](https://datatracker.ietf.org/doc/html/rfc6750))

## Further Reading

- [MCP Authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- [RFC 8707 OAuth 2.0 Resource Indicators](https://datatracker.ietf.org/doc/html/rfc8707)
- [RFC 6750 OAuth 2.0 Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
