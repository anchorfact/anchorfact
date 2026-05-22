---
id: "kb-2026-00108"
title: "Broadcast Channel API"
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
  - title: "HTML Standard — BroadcastChannel"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts"
    institution: "WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Broadcast Channel API enables same-origin communication between browsing contexts (tabs, iframes, workers) with a simple pub/sub model. Messages are broadcasted to all listeners on a named channel.

## Core Explanation

`const bc = new BroadcastChannel('channel-name')`. `bc.postMessage(data)` sends; `bc.onmessage` receives. Data is structured-cloned. Simpler than SharedWorker or postMessage with window.opener. No persistence — messages are lost if no listeners are active. Ideal for login/logout synchronization across tabs.

## Further Reading

- [HTML Standard — BroadcastChannel](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts)
