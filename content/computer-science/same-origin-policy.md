---
id: kb-2026-00095
title: Same-Origin Policy
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
  - id: fact-computer-science-sop-001
    statement: >-
      MDN defines the same-origin policy as a security mechanism restricting how a document or script from one origin
      can interact with resources from another origin.
    source_title: Same-origin policy - Security | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy
    confidence: medium
  - id: fact-computer-science-sop-002
    statement: >-
      The HTML Standard defines a tuple origin using a scheme, host, port, and domain, and says same-origin checks
      compare scheme, host, and port.
    source_title: HTML Standard - Origins
    source_url: https://html.spec.whatwg.org/multipage/browsers.html#origin
    confidence: medium
  - id: fact-computer-science-sop-003
    statement: >-
      MDN explains that fetch() and XMLHttpRequest follow the same-origin policy unless cross-origin responses include
      appropriate CORS headers.
    source_title: Cross-Origin Resource Sharing (CORS) - HTTP | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: Same-origin policy - Security | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy
    institution: Mozilla
  - title: HTML Standard - Origins
    type: standard
    year: 2026
    url: https://html.spec.whatwg.org/multipage/browsers.html#origin
    institution: WHATWG
  - title: Cross-Origin Resource Sharing (CORS) - HTTP | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    institution: Mozilla
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

The same-origin policy is a browser security boundary around documents, scripts, and cross-origin resources. This repair anchors the article to MDN and WHATWG origin definitions.

## Core Explanation

Origins are compared by scheme, host, and port. Same-origin policy limits cross-origin interaction by default, while CORS lets servers explicitly authorize selected cross-origin HTTP access.

## Further Reading

- [Same-origin policy - Security | MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)
- [HTML Standard - Origins](https://html.spec.whatwg.org/multipage/browsers.html#origin)
- [Cross-Origin Resource Sharing (CORS) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
