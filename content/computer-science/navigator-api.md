---
id: "kb-2026-00109"
title: "Navigator API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "The Navigator API (`window.navigator` / `navigator`) provides information about the browser and device. Key properties include `userAgent`, `language`, `onLine`, `platform`, `hardwareConcurrency`, and access to various sub-APIs (`geolocation`, `clipboard`, `mediaDevices`)."
    source_title: "HTML Standard — Navigator"
    source_url: "https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "The Navigator API (`window.navigator` / `navigator`) provides information about the browser and device. Key properties include `userAgent`, `language`, `onLine`, `platform`, `hardwareConcurrency`, and access to various sub-APIs (`geolocation`, `clipboard`, `mediaDevices`)."
    source_title: "HTML Standard — Navigator"
    source_url: "https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "HTML Standard — Navigator"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object"
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

The Navigator API (`window.navigator` / `navigator`) provides information about the browser and device. Key properties include `userAgent`, `language`, `onLine`, `platform`, `hardwareConcurrency`, and access to various sub-APIs (`geolocation`, `clipboard`, `mediaDevices`).

## Core Explanation

`navigator.userAgent` (becoming less reliable due to freezing), `navigator.language` (user's preferred language), `navigator.onLine` (connectivity status), `navigator.hardwareConcurrency` (logical CPU cores), `navigator.cookieEnabled`, `navigator.platform`. Sub-APIs: `navigator.geolocation`, `navigator.clipboard`, `navigator.mediaDevices`, `navigator.serviceWorker`.

## Further Reading

- [HTML Standard — Navigator](https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object)

## Related Articles

- [API Gateway](../api-gateway.md)
- [Broadcast Channel API](../broadcast-channel-api.md)
- [Canvas API](../canvas-api.md)
