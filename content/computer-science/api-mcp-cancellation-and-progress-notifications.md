---
id: api-mcp-cancellation-and-progress-notifications
title: 'API MCP Cancellation and Progress Notifications'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-11'
created_date: '2026-06-11'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-api-mcp-cancellation-and-progress-notifications-1
    statement: >-
      The Model Context Protocol cancellation specification says MCP supports
      optional cancellation of in-progress requests through notification
      messages.
    source_title: MCP Cancellation
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation
    confidence: medium
  - id: fact-cs-api-mcp-cancellation-and-progress-notifications-2
    statement: >-
      The MCP cancellation specification says a cancellation notification uses
      the notifications/cancelled method.
    source_title: MCP Cancellation
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation
    confidence: medium
  - id: fact-cs-api-mcp-cancellation-and-progress-notifications-3
    statement: >-
      The MCP cancellation specification says receivers should stop processing
      the cancelled request, free associated resources, and not send a response
      for the cancelled request.
    source_title: MCP Cancellation
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation
    confidence: medium
  - id: fact-cs-api-mcp-cancellation-and-progress-notifications-4
    statement: >-
      The Model Context Protocol progress specification says MCP supports
      optional progress tracking for long-running operations through
      notification messages.
    source_title: MCP Progress
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress
    confidence: medium
  - id: fact-cs-api-mcp-cancellation-and-progress-notifications-5
    statement: >-
      The MCP progress specification says progress tokens must be unique across
      all active requests.
    source_title: MCP Progress
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress
    confidence: medium
completeness: 0.82
known_gaps:
  - MCP cancellation and progress evidence depends on transport, request direction, request ID lifecycle, progress token uniqueness, host UI behavior, server cleanup guarantees, and race conditions where a response arrives after a cancellation request.
disputed_statements: []
primary_sources:
  - title: MCP Cancellation
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation
    institution: Model Context Protocol
  - title: MCP Progress
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-11'
ai_models:
  - gpt-5-codex
---

## TL;DR

MCP cancellation and progress notifications let agent clients stop long-running work and expose bounded progress without inventing provider-specific side channels.

## Core Explanation

Long-running tool calls need lifecycle evidence. MCP cancellation notifications identify an in-progress request that should stop, while progress notifications report work associated with a progress token.

For agent infrastructure, preserve request ID, progress token, transport, direction, cancellation reason, last progress value, total if known, cleanup behavior, and whether a late response arrived after cancellation. That context lets an agent distinguish a cancelled request from a timeout, transport disconnect, or completed call whose response arrived late.

## Source-Mapped Facts

- The Model Context Protocol cancellation specification says MCP supports optional cancellation of in-progress requests through notification messages. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation))
- The MCP cancellation specification says a cancellation notification uses the notifications/cancelled method. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation))
- The MCP cancellation specification says receivers should stop processing the cancelled request, free associated resources, and not send a response for the cancelled request. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation))
- The Model Context Protocol progress specification says MCP supports optional progress tracking for long-running operations through notification messages. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress))
- The MCP progress specification says progress tokens must be unique across all active requests. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress))

## Further Reading

- [MCP Cancellation](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation)
- [MCP Progress](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress)
