---
id: kb-2026-00082
title: XMLHttpRequest
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
  - id: fact-computer-science-01
    statement: XMLHttpRequest is a browser API for making HTTP requests from JavaScript.
    source_title: XMLHttpRequest
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    confidence: medium
  - id: fact-computer-science-02
    statement: XMLHttpRequest.open() initializes a request and specifies the HTTP method and URL.
    source_title: "XMLHttpRequest: open() method"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
    confidence: medium
  - id: fact-computer-science-03
    statement: XMLHttpRequest.upload returns an XMLHttpRequestUpload object for monitoring upload progress.
    source_title: "XMLHttpRequest: upload property"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
    confidence: medium
completeness: 0.88
known_gaps:
  - Legacy browser behavior and compatibility differences
  - Migration tradeoffs from XMLHttpRequest to Fetch in existing applications
disputed_statements: []
primary_sources:
  - title: XMLHttpRequest
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  - title: "XMLHttpRequest: open() method"
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
  - title: "XMLHttpRequest: upload property"
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
XMLHttpRequest is a legacy browser API for making HTTP requests from JavaScript. Fetch is usually preferred for new code, but XHR remains relevant in older codebases and in some upload-progress workflows.

## Core Explanation
An XHR request is configured with open(), sent with send(), and observed through events or callbacks. It predates the Promise-based Fetch API and has a more event-oriented programming model.

## Detailed Analysis
The durable reason XHR still appears in applications is compatibility and upload progress support. Public content should avoid claiming Fetch has completely replaced it, because migration depends on browser support, app architecture, and progress-event needs.

## Further Reading
- MDN XMLHttpRequest
- MDN open()
- MDN upload
