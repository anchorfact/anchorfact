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

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"



    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"


    institution: "Mozilla"
atomic_facts:
  - id: fact-computer-science-01
    statement: The Broadcast Channel API enables same-origin communication between browsing contexts with a simple pub/sub model
    source_title: HTML Standard — BroadcastChannel
    source_url: https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

The Broadcast Channel API enables same-origin communication between browsing contexts (tabs, iframes, workers) with a simple pub/sub model. Messages are broadcasted to all listeners on a named channel.

## Core Explanation

`const bc = new BroadcastChannel('channel-name')`. `bc.postMessage(data)` sends; `bc.onmessage` receives. Data is structured-cloned. Simpler than SharedWorker or postMessage with window.opener. No persistence — messages are lost if no listeners are active. Ideal for login/logout synchronization across tabs.

## Further Reading

- [HTML Standard — BroadcastChannel](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts)
