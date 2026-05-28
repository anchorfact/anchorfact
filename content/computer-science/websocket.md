---
id: kb-2026-00063
title: WebSocket Protocol
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-websocket-1
    statement: >-
      RFC 6455 defines WebSocket as a protocol for two-way communication between a client and a
      remote host over a single TCP connection.
    source_title: 'RFC 6455: The WebSocket Protocol'
    source_url: https://www.rfc-editor.org/rfc/rfc6455
    confidence: medium
  - id: fact-computer-science-websocket-2
    statement: >-
      RFC 6455 specifies an opening handshake that uses HTTP Upgrade semantics before WebSocket data
      frames are exchanged.
    source_title: 'RFC 6455: The WebSocket Protocol'
    source_url: https://www.rfc-editor.org/rfc/rfc6455
    confidence: medium
  - id: fact-computer-science-websocket-3
    statement: >-
      MDN describes the WebSocket API as the browser interface for opening WebSocket connections and
      sending or receiving data.
    source_title: MDN WebSocket API
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
    confidence: medium
completeness: 0.82
known_gaps:
  - Specialized edge cases and implementation details are outside this source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: 'RFC 6455: The WebSocket Protocol'
    authors:
      - Ian Fette
      - Alexey Melnikov
    type: standard
    year: 2011
    url: https://www.rfc-editor.org/rfc/rfc6455
    institution: IETF
  - title: MDN WebSocket API
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
    institution: MDN Web Docs
  - title: MDN Writing WebSocket Client Applications
    type: documentation
    year: 2026
    url: >-
      https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
    institution: MDN Web Docs
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

WebSocket provides a browser-compatible protocol and API for persistent, bidirectional communication between clients and servers.

## Core Explanation

Protocol behavior belongs to RFC 6455, while browser-facing application code uses the WebSocket API exposed by web platforms and documented for developers.

## Source-Mapped Facts

- RFC 6455 defines WebSocket as a protocol for two-way communication between a client and a remote host over a single TCP connection. ([source](https://www.rfc-editor.org/rfc/rfc6455))
- RFC 6455 specifies an opening handshake that uses HTTP Upgrade semantics before WebSocket data frames are exchanged. ([source](https://www.rfc-editor.org/rfc/rfc6455))
- MDN describes the WebSocket API as the browser interface for opening WebSocket connections and sending or receiving data. ([source](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket))

## Further Reading

- [RFC 6455: The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [MDN Writing WebSocket Client Applications](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
