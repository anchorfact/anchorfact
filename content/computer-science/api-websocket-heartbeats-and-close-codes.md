---
id: api-websocket-heartbeats-and-close-codes
title: 'API WebSocket Heartbeats and Close Codes'
schema_type: TechArticle
category: computer-science
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
  - id: fact-computer-science-api-websocket-heartbeats-and-close-codes-1
    statement: >-
      RFC 6455 defines the WebSocket Protocol and includes control frames such as Close, Ping, and
      Pong.
    source_title: RFC 6455 WebSocket Protocol
    source_url: https://datatracker.ietf.org/doc/html/rfc6455
    confidence: medium
  - id: fact-computer-science-api-websocket-heartbeats-and-close-codes-2
    statement: >-
      MDN documentation describes CloseEvent.code as the WebSocket connection close code sent by
      the server.
    source_title: MDN CloseEvent Code
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
    confidence: medium
  - id: fact-computer-science-api-websocket-heartbeats-and-close-codes-3
    statement: >-
      The websockets documentation describes keepalive and heartbeat behavior based on Ping and Pong
      frames.
    source_title: websockets Keepalive and Latency
    source_url: https://websockets.readthedocs.io/en/stable/topics/keepalive.html
    confidence: medium
completeness: 0.83
known_gaps:
  - WebSocket reliability depends on proxy timeouts, browser APIs, ping interval, application-level heartbeats, backoff, load balancers, and close-code conventions.
disputed_statements: []
primary_sources:
  - title: RFC 6455 WebSocket Protocol
    type: rfc
    year: 2011
    url: https://datatracker.ietf.org/doc/html/rfc6455
    institution: IETF
  - title: MDN CloseEvent Code
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
    institution: MDN Web Docs
  - title: websockets Keepalive and Latency
    type: documentation
    year: 2026
    url: https://websockets.readthedocs.io/en/stable/topics/keepalive.html
    institution: websockets
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

WebSocket heartbeats and close codes give agents concrete evidence for distinguishing idle timeout, protocol error, server shutdown, and client reconnect behavior.

## Core Explanation

Long-lived API connections fail differently from request-response APIs. Agents should inspect close code, close reason, ping/pong behavior, reconnect policy, and proxy idle timeout before changing application-level message handling.

Good diagnostics include timestamped connect, ping, pong, close, retry, and subscription events, plus whether the heartbeat is protocol-level or an application message.

## Source-Mapped Facts

- RFC 6455 defines the WebSocket Protocol and includes control frames such as Close, Ping, and Pong. ([source](https://datatracker.ietf.org/doc/html/rfc6455))
- MDN documentation describes CloseEvent.code as the WebSocket connection close code sent by the server. ([source](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent))
- The websockets documentation describes keepalive and heartbeat behavior based on Ping and Pong frames. ([source](https://websockets.readthedocs.io/en/stable/topics/keepalive.html))

## Further Reading

- [RFC 6455 WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)
- [MDN CloseEvent Code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent)
- [websockets Keepalive and Latency](https://websockets.readthedocs.io/en/stable/topics/keepalive.html)
