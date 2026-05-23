---
id: "kb-2026-00093"



title: "Content Security Policy (CSP)"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"



last_verified: "2026-05-22"
generation_method: "human_only"



derived_from_human_seed: true
primary_sources:
  - title: "Content Security Policy Level 2 (W3C Recommendation)"
    type: "standard"



    year: 2018
    url: "https://www.w3.org/TR/CSP2/"


    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"



    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"


    institution: "Mozilla"
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      Content Security Policy is a security standard that helps prevent XSS, clickjacking, and code injection attacks by
      controlling which resources a web page is allowed to load
    source_title: Content Security Policy Level 2 (W3C Recommendation)
    source_url: https://www.w3.org/TR/CSP2/
    confidence: medium
  
completeness: 0.88
ai_citations:
---

## TL;DR

Content Security Policy (CSP) is a security standard that helps prevent XSS, clickjacking, and code injection attacks by controlling which resources a web page is allowed to load. It is delivered via HTTP headers (`Content-Security-Policy`) or `<meta>` tags.

## Core Explanation

Key directives: `default-src` (fallback), `script-src`, `style-src`, `img-src`, `connect-src` (fetch/XHR/WebSocket), `frame-ancestors` (clickjack protection), `form-action`. CSP supports nonces and hashes for inline scripts. `report-uri`/`report-to` sends violation reports. Strict CSP with `'nonce-...'` is the recommended deployment strategy.

## Further Reading

- [Content Security Policy Level 2 (W3C Recommendation)](https://www.w3.org/TR/CSP2/)
