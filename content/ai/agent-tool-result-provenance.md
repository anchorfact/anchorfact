---
id: agent-tool-result-provenance
title: 'Agent Tool Result Provenance'
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
  - id: fact-agent-tool-result-provenance-1
    statement: >-
      The W3C PROV overview defines provenance as information about entities, activities, and people involved in producing data or things.
    source_title: PROV-Overview
    source_url: https://www.w3.org/TR/prov-overview/
  - id: fact-agent-tool-result-provenance-2
    statement: >-
      The Model Context Protocol tools specification defines tool results with content, optional structuredContent, and optional isError fields.
    source_title: Tools - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
  - id: fact-agent-tool-result-provenance-3
    statement: >-
      W3C Trace Context defines HTTP headers that propagate distributed trace context across services.
    source_title: Trace Context
    source_url: https://www.w3.org/TR/trace-context/
completeness: 0.82
known_gaps:
  - Provenance schemas for agent-generated summaries, cached tool results, and redacted evidence vary by product.
disputed_statements: []
primary_sources:
  - title: PROV-Overview
    type: standard
    year: 2013
    url: https://www.w3.org/TR/prov-overview/
    institution: W3C
  - title: Tools - Model Context Protocol
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    institution: Model Context Protocol
  - title: Trace Context
    type: standard
    year: 2021
    url: https://www.w3.org/TR/trace-context/
    institution: W3C
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent tool result provenance records where a tool result came from, how it was produced, which request caused it, and how later model output depends on it.

## Core Explanation

Tool result provenance is the evidence layer behind grounded agent behavior. A result should carry a tool name, input hash or normalized parameters, output schema version, timestamps, trace identifiers, source URLs or record identifiers, and error state.

This matters because agents often transform tool output into natural-language claims. Without provenance, a user cannot tell whether an answer came from live data, cached data, generated reasoning, or a failed tool call. Provenance also makes audits, retries, citation repair, and incident analysis tractable.

## Source-Mapped Facts

- The W3C PROV overview defines provenance as information about entities, activities, and people involved in producing data or things. ([source](https://www.w3.org/TR/prov-overview/))
- The Model Context Protocol tools specification defines tool results with content, optional structuredContent, and optional isError fields. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- W3C Trace Context defines HTTP headers that propagate distributed trace context across services. ([source](https://www.w3.org/TR/trace-context/))

## Further Reading

- [W3C PROV overview](https://www.w3.org/TR/prov-overview/)
- [MCP tools specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)
