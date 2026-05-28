---
id: kb-2026-00083
title: Server-Sent Events (SSE)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-sse-001
    statement: The EventSource interface opens a persistent HTTP connection for receiving events in text/event-stream format.
    source_title: EventSource - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
    confidence: medium
  - id: fact-computer-science-sse-002
    statement: >-
      MDN describes server-sent events as a one-way connection: clients receive events from a server but do not send
      events back through the same connection.
    source_title: Using server-sent events - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
    confidence: medium
  - id: fact-computer-science-sse-003
    statement: The HTML Standard defines the EventSource interface and server-sent events processing model.
    source_title: HTML Standard - Server-sent events
    source_url: https://html.spec.whatwg.org/multipage/server-sent-events.html
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: HTML Standard - Server-sent events
    type: standard
    year: 2026
    url: https://html.spec.whatwg.org/multipage/server-sent-events.html
    institution: WHATWG
  - title: Using server-sent events - Web APIs | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
    institution: Mozilla
  - title: EventSource - Web APIs | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
    institution: Mozilla
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Server-Sent Events use EventSource to receive server-pushed events over a persistent HTTP connection. This repair removes duplicate facts and keeps the comparison to WebSocket to a single documented one-way communication point.

## Core Explanation

SSE is useful for server-to-client updates such as feeds or status streams. The client creates an EventSource, the server streams text/event-stream data, and incoming messages are delivered as browser events.

## Further Reading

- [HTML Standard - Server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [Using server-sent events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [EventSource - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
