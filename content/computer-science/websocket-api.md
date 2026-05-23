---
id: "kb-2026-00088"
title: "WebSocket API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "The WebSocket API is the browser-side interface to the WebSocket protocol (RFC 6455), providing full-duplex, bidirectional communication between browser and server over a single TCP connection."
    source_url: "https://www.rfc-editor.org/rfc/rfc6455"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "The `readyState` property tracks connection state (CONNECTING=0, OPEN=1, CLOSING=2, CLOSED=3)."
    source_url: "https://websockets.spec.whatwg.org/"
    confidence: "medium"

completeness: 0.88

primary_sources:
  - title: "The WebSocket API (W3C)"
    type: "standard"
    year: 2023
    url: "https://www.w3.org/"
    institution: "WHATWG"

secondary_sources:
  - title: "The WebSocket Protocol (RFC 6455)"
    authors: ["Fette", "Melnikov"]
    type: "standard"
    year: 2011
    url: "https://www.rfc-editor.org/rfc/rfc6455"
    institution: "IETF"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

The WebSocket API is the browser-side interface to the WebSocket protocol (RFC 6455), providing full-duplex, bidirectional communication between browser and server over a single TCP connection.

## Core Explanation

Usage: `const ws = new WebSocket('wss://example.com')`. Events: `onopen`, `onmessage`, `onerror`, `onclose`. Methods: `send()`, `close()`. The `readyState` property tracks connection state (CONNECTING=0, OPEN=1, CLOSING=2, CLOSED=3). Binary data can be sent as Blob or ArrayBuffer. WebSocket connections start as HTTP (upgrade) and are not HTTP after the handshake.

## Further Reading

- [The WebSocket API (W3C)](https://websockets.spec.whatwg.org/)
