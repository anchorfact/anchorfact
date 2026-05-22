---
id: "kb-2026-00083"
title: "Server-Sent Events (SSE)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Server-Sent Events (W3C Recommendation)"
    type: "standard"
    year: 2015
    url: "https://html.spec.whatwg.org/multipage/server-sent-events.html"
    institution: "W3C/WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Server-Sent Events (SSE) is a standard enabling servers to push real-time updates to browsers over a single HTTP connection. Unlike WebSocket's bidirectional communication, SSE is unidirectional (server-to-client only) but simpler to implement — using standard HTTP and automatic reconnection.

## Core Explanation

SSE uses the `EventSource` JavaScript API. The server sends data with `Content-Type: text/event-stream` and `data:`-prefixed lines. Built-in features include: automatic reconnection with Last-Event-ID, custom event types, and simple server implementation (no protocol upgrade). SSE is ideal for live feeds, notifications, and dashboards where client-to-server communication is handled separately via regular HTTP.

## Further Reading

- [Server-Sent Events (W3C Recommendation)](https://html.spec.whatwg.org/multipage/server-sent-events.html)
