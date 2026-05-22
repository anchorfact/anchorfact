---
id: "kb-2026-00094"
title: "Cross-Origin Resource Sharing (CORS)"
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
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

CORS is a browser-enforced security mechanism that controls cross-origin HTTP requests. By default, browsers block cross-origin requests for security (same-origin policy). Servers opt-in via response headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`.

## Core Explanation

Preflight requests (OPTIONS) check permission before actual request for non-simple requests. Simple requests (GET/POST with standard headers) skip preflight. Credentials (cookies, HTTP auth) require `Access-Control-Allow-Credentials: true` and cannot use wildcard origins. CORS is enforced by the browser, not the server — server-side requests are not restricted.

## Further Reading

- [Fetch Standard — CORS Protocol](https://fetch.spec.whatwg.org/#http-cors-protocol)
