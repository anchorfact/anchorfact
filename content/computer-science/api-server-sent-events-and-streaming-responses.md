---
id: api-server-sent-events-and-streaming-responses
title: 'API Server-Sent Events and Streaming Responses'
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
  - id: fact-cs-api-server-sent-events-and-streaming-responses-1
    statement: >-
      MDN documentation describes Server-Sent Events as a way for servers to push updates to
      clients over HTTP.
    source_title: MDN Server-Sent Events
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
    confidence: medium
  - id: fact-cs-api-server-sent-events-and-streaming-responses-2
    statement: >-
      The HTML Living Standard defines the EventSource interface for receiving server-sent
      events.
    source_title: HTML Living Standard Server-Sent Events
    source_url: https://html.spec.whatwg.org/multipage/server-sent-events.html
    confidence: medium
  - id: fact-cs-api-server-sent-events-and-streaming-responses-3
    statement: >-
      OpenAI API documentation describes streaming model responses so applications can receive
      output incrementally.
    source_title: OpenAI Streaming Responses
    source_url: https://developers.openai.com/api/docs/guides/streaming-responses
    confidence: medium
completeness: 0.83
known_gaps:
  - Streaming APIs need product-specific handling for reconnects, event IDs, partial JSON, cancellation, backpressure, moderation, and final usage accounting.
disputed_statements: []
primary_sources:
  - title: MDN Server-Sent Events
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
    institution: Mozilla
  - title: HTML Living Standard Server-Sent Events
    type: standard
    year: 2026
    url: https://html.spec.whatwg.org/multipage/server-sent-events.html
    institution: WHATWG
  - title: OpenAI Streaming Responses
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/streaming-responses
    institution: OpenAI
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Streaming responses let APIs deliver incremental output, but agents need explicit event parsing, cancellation, retry, and final-state handling.

## Core Explanation

Server-sent events are common for model output, job progress, logs, and notification feeds. They are simpler than bidirectional WebSockets for one-way server updates, but the client still needs to parse events and handle dropped connections.

Agents should treat partial streamed output as provisional. The reliable evidence is the final event, finish reason, request ID, usage metadata, and any server-side state that confirms completion.

## Source-Mapped Facts

- MDN documentation describes Server-Sent Events as a way for servers to push updates to clients over HTTP. ([source](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events))
- The HTML Living Standard defines the EventSource interface for receiving server-sent events. ([source](https://html.spec.whatwg.org/multipage/server-sent-events.html))
- OpenAI API documentation describes streaming model responses so applications can receive output incrementally. ([source](https://developers.openai.com/api/docs/guides/streaming-responses))

## Further Reading

- [MDN Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [HTML Living Standard Server-Sent Events](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [OpenAI Streaming Responses](https://developers.openai.com/api/docs/guides/streaming-responses)
