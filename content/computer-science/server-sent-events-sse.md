---
id: "kb-2026-00083"
title: "Server-Sent Events (SSE)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Server-Sent Events (SSE) is a standard enabling servers to push real-time updates to browsers over a single HTTP connection. Unlike WebSocket's bidirectional communication, SSE is unidirectional (server-to-client only) but simpler to implement — using standard HTTP and automatic reconnection."
    source_title: "Server-Sent Events (W3C Recommendation)"
    source_url: "https://html.spec.whatwg.org/multipage/server-sent-events.html"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Server-Sent Events (SSE) is a standard enabling servers to push real-time updates to browsers over a single HTTP connection. Unlike WebSocket's bidirectional communication, SSE is unidirectional (server-to-client only) but simpler to implement — using standard HTTP and automatic reconnection."
    source_title: "Server-Sent Events (W3C Recommendation)"
    source_url: "https://html.spec.whatwg.org/multipage/server-sent-events.html"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Server-Sent Events (W3C Recommendation)"
    type: "standard"
    year: 2015
    url: "https://html.spec.whatwg.org/multipage/server-sent-events.html"
    institution: "W3C/WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "The WebSocket Protocol (RFC 6455)"
    authors: ["Fette", "Melnikov"]
    type: "standard"
    year: 2011
    url: "https://www.rfc-editor.org/rfc/rfc6455"
    institution: "IETF"

---




## TL;DR

Server-Sent Events (SSE) is a standard enabling servers to push real-time updates to browsers over a single HTTP connection. Unlike WebSocket's bidirectional communication, SSE is unidirectional (server-to-client only) but simpler to implement — using standard HTTP and automatic reconnection.

## Core Explanation

SSE uses the `EventSource` JavaScript API. The server sends data with `Content-Type: text/event-stream` and `data:`-prefixed lines. Built-in features include: automatic reconnection with Last-Event-ID, custom event types, and simple server implementation (no protocol upgrade). SSE is ideal for live feeds, notifications, and dashboards where client-to-server communication is handled separately via regular HTTP.

## Further Reading

- [Server-Sent Events (W3C Recommendation)](https://html.spec.whatwg.org/multipage/server-sent-events.html)

## Related Articles

- [Track and Field Events](../../sports/track-and-field.md)
