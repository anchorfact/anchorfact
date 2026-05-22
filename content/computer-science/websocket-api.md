---
id: "kb-2026-00088"
title: "WebSocket API"
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
  - title: "The WebSocket API (W3C)"
    type: "standard"
    year: 2023
    url: "https://websockets.spec.whatwg.org/"
    institution: "WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The WebSocket API is the browser-side interface to the WebSocket protocol (RFC 6455), providing full-duplex, bidirectional communication between browser and server over a single TCP connection.

## Core Explanation

Usage: `const ws = new WebSocket('wss://example.com')`. Events: `onopen`, `onmessage`, `onerror`, `onclose`. Methods: `send()`, `close()`. The `readyState` property tracks connection state (CONNECTING=0, OPEN=1, CLOSING=2, CLOSED=3). Binary data can be sent as Blob or ArrayBuffer. WebSocket connections start as HTTP (upgrade) and are not HTTP after the handshake.

## Further Reading

- [The WebSocket API (W3C)](https://websockets.spec.whatwg.org/)
