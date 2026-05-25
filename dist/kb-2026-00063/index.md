---
id: "kb-2026-00063"
title: "WebSocket Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "WebSocket is a communication protocol providing full-duplex, bidirectional communication over a single TCP connection, standardized as IETF RFC 6455 in 2011"
    source_title: "RFC 6455 — The WebSocket Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc6455"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "WebSocket upgrades an HTTP connection to a persistent socket:  1."
    source_title: "RFC 6455 — The WebSocket Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc6455"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "**Handshake** (HTTP Upgrade): Client sends `Upgrade: websocket` header; server responds with `101 Switching Protocols` 2."
    source_title: "RFC 6455 — The WebSocket Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc6455"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "**Data Transfer**: Binary or text frames flow bidirectionally with minimal overhead (2-6 bytes per frame header vs."
    source_title: "RFC 6455 — The WebSocket Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc6455"
    confidence: "medium"
  - id: "fact-computer-science-004"
    statement: "**Close**: Either side initiates graceful closure  Key properties: - **Full-duplex**: Both sides can send independently - **Low latency**: No HTTP handshake per message — 2-6 byte frame overhead - **Binary + Text**: Native support for both message types - **Persistent**: Connection stays open until explicitly closed"
    source_title: "RFC 6455 — The WebSocket Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc6455"
    confidence: "medium"

completeness: 0.85

known_gaps:
  - "WebSocket extensions (RFC 7692 compression) not covered; secure WebSocket (wss://) details at TLS level"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "RFC 6455 — The WebSocket Protocol"
    authors: ["Fette, I.", "Melnikov, A."]
    type: "standard"
    year: 2011
    url: "https://www.rfc-editor.org/rfc/rfc6455"
    institution: "IETF"
  - title: "WebSockets Standard (2026-03-15)"
    type: "standard"
    year: 2026
    url: "https://websockets.spec.whatwg.org/"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — WebSocket API"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket"
    institution: "Mozilla"

---



## TL;DR

WebSocket is a communication protocol providing full-duplex, bidirectional communication over a single TCP connection, standardized as IETF RFC 6455 in 2011. Unlike HTTP's request-response model, WebSocket maintains a persistent connection where both client and server can send data at any time. It is the foundation of real-time web applications including chat systems, live dashboards, collaborative editing, multiplayer games, and financial trading platforms. The protocol has universal browser support and is maintained as a living standard by WHATWG (updated March 2026).

## Core Explanation

WebSocket upgrades an HTTP connection to a persistent socket:

1. **Handshake** (HTTP Upgrade): Client sends `Upgrade: websocket` header; server responds with `101 Switching Protocols`
2. **Data Transfer**: Binary or text frames flow bidirectionally with minimal overhead (2-6 bytes per frame header vs. HTTP's ~800 bytes)
3. **Close**: Either side initiates graceful closure

Key properties:
- **Full-duplex**: Both sides can send independently
- **Low latency**: No HTTP handshake per message — 2-6 byte frame overhead
- **Binary + Text**: Native support for both message types
- **Persistent**: Connection stays open until explicitly closed

## Comparison

| Protocol | Direction | Overhead/Message | Use Case |
|----------|:---------:|:----------------:|----------|
| HTTP | Client → Server (request-driven) | ~800 bytes | Documents, APIs |
| WebSocket | Bidirectional | ~2-6 bytes | Real-time apps |
| SSE (Server-Sent Events) | Server → Client only | Low | Unidirectional push |
| WebRTC | Peer-to-peer | Variable | Video/audio, P2P data |

## Further Reading

- [RFC 6455](https://www.rfc-editor.org/rfc/rfc6455): Official IETF standard
- [WHATWG WebSocket Standard](https://websockets.spec.whatwg.org/): Living standard (2026-03-15)
