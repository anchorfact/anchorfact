---
id: "kb-2026-00094"
title: "Cross-Origin Resource Sharing (CORS)"
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
  - id: "fact-computer-science-01"
    statement: "CORS is a browser-enforced security mechanism that controls cross-origin HTTP requests"
    source_title: "Fetch Standard — CORS Protocol"
    source_url: "https://fetch.spec.whatwg.org/#http-cors-protocol"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "CORS is a browser-enforced security mechanism that controls cross-origin HTTP requests. By default, browsers block cross-origin requests for security (same-origin policy). Servers opt-in via response headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`."
    source_title: "Fetch Standard — CORS Protocol"
    source_url: "https://fetch.spec.whatwg.org/#http-cors-protocol"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Fetch Standard — CORS Protocol"
    type: "standard"
    year: 2026
    url: "https://fetch.spec.whatwg.org/#http-cors-protocol"
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

CORS is a browser-enforced security mechanism that controls cross-origin HTTP requests. By default, browsers block cross-origin requests for security (same-origin policy). Servers opt-in via response headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`.

## Core Explanation

Preflight requests (OPTIONS) check permission before actual request for non-simple requests. Simple requests (GET/POST with standard headers) skip preflight. Credentials (cookies, HTTP auth) require `Access-Control-Allow-Credentials: true` and cannot use wildcard origins. CORS is enforced by the browser, not the server — server-side requests are not restricted.

## Further Reading

- [Fetch Standard — CORS Protocol](https://fetch.spec.whatwg.org/#http-cors-protocol)

## Related Articles

- [AI for Predictive Policing: Crime Forecasting, Resource Allocation, and Bias Mitigation](../../ai/ai-predictive-policing.md)
- [AI for Team Collaboration: Smart Meetings, Knowledge Sharing, and Collaborative Intelligence](../../ai/ai-team-collaboration.md)
- [Low-Resource NLP: Multilingual Models, Endangered Language Preservation, and Translation](../../ai/low-resource-nlp.md)