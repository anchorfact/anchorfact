---
id: kb-2026-00108
title: Broadcast Channel API
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      MDN describes the Broadcast Channel API as allowing basic communication between browsing
      contexts on the same origin.
    source_title: Broadcast Channel API - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
    confidence: medium
  - id: fact-computer-science-002
    statement: MDN documents BroadcastChannel as an interface for sending messages to a named channel.
    source_title: BroadcastChannel - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      The HTML Standard specifies broadcasting messages to other browsing contexts through
      BroadcastChannel.
    source_title: 'HTML Standard: Broadcasting to other browsing contexts'
    source_url: >-
      https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    Coverage intentionally narrowed to directly sourced public evidence; adjacent subtopics are not
    exhaustively covered.
disputed_statements: []
primary_sources:
  - title: Broadcast Channel API - Web APIs | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
    institution: Mozilla
  - title: BroadcastChannel - Web APIs | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
    institution: Mozilla
  - title: 'HTML Standard: Broadcasting to other browsing contexts'
    type: standard
    year: 2026
    url: >-
      https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts
    institution: WHATWG
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR

The Broadcast Channel API lets same-origin browsing contexts exchange messages through named channels. This repair removes duplicated and malformed source text and maps each claim to MDN or the HTML Standard.

## Core Explanation

A page or worker creates a BroadcastChannel with a channel name, sends data with postMessage, and receives messages through message events. BroadcastChannel is useful for same-origin coordination across tabs, frames, and workers.

## Further Reading

- [Broadcast Channel API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
- [BroadcastChannel - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
- [HTML Standard: Broadcasting to other browsing contexts](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts)

## Related Articles

- [API Gateway](../api-gateway.md)
- [Canvas API](../canvas-api.md)
- [Clipboard API](../clipboard-api.md)
