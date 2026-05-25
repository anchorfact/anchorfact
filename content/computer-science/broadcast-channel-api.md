---
id: "kb-2026-00108"
title: "Broadcast Channel API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "The Broadcast Channel API enables same-origin communication between browsing contexts with a simple pub/sub model"
    source_title: "HTML Standard — BroadcastChannel"
    source_url: "https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "The Broadcast Channel API enables same-origin communication between browsing contexts (tabs, iframes, workers) with a simple pub/sub model. Messages are broadcasted to all listeners on a named channel."
    source_title: "HTML Standard — BroadcastChannel"
    source_url: "https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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

The Broadcast Channel API enables same-origin communication between browsing contexts (tabs, iframes, workers) with a simple pub/sub model. Messages are broadcasted to all listeners on a named channel.

## Core Explanation

`const bc = new BroadcastChannel('channel-name')`. `bc.postMessage(data)` sends; `bc.onmessage` receives. Data is structured-cloned. Simpler than SharedWorker or postMessage with window.opener. No persistence — messages are lost if no listeners are active. Ideal for login/logout synchronization across tabs.

## Further Reading

- [HTML Standard — BroadcastChannel](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts)

## Related Articles

- [API Gateway](../api-gateway.md)
- [Canvas API](../canvas-api.md)
- [Clipboard API](../clipboard-api.md)
