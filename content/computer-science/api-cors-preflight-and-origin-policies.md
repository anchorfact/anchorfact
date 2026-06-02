---
id: api-cors-preflight-and-origin-policies
title: 'API CORS Preflight and Origin Policies'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-api-cors-preflight-and-origin-policies-1
    statement: >-
      MDN documentation describes Access-Control-Allow-Origin as a response header that
      indicates whether a response can be shared with requesting code from a given origin.
    source_title: MDN Access-Control-Allow-Origin
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
    confidence: medium
  - id: fact-api-cors-preflight-and-origin-policies-2
    statement: >-
      MDN documentation describes CORS as an HTTP-header based mechanism for permitting browser
      access to resources from another origin.
    source_title: MDN Cross-Origin Resource Sharing
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    confidence: medium
  - id: fact-api-cors-preflight-and-origin-policies-3
    statement: >-
      MDN documentation describes a preflight request as an OPTIONS request sent before some
      cross-origin requests.
    source_title: MDN Preflight Request
    source_url: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
    confidence: medium
completeness: 0.84
known_gaps:
  - CORS behavior depends on credentials mode, allowed methods, allowed headers, caches, redirects, and browser enforcement.
disputed_statements: []
primary_sources:
  - title: MDN Access-Control-Allow-Origin
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
    institution: MDN Web Docs
  - title: MDN Cross-Origin Resource Sharing
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    institution: MDN Web Docs
  - title: MDN Preflight Request
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
    institution: MDN Web Docs
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

CORS preflight and origin policies explain why browser API calls can fail even when the server endpoint works from curl.

## Core Explanation

CORS is enforced by browsers, not by generic HTTP clients. A request can succeed from a server-side script while failing in a browser because the response lacks the right origin, method, header, or credential policy.

Agents should inspect the Origin request header, OPTIONS preflight response, Access-Control headers, credentials mode, and browser console error before changing application logic. A broad wildcard policy can solve a test failure while creating a security problem.

## Source-Mapped Facts

- MDN documentation describes Access-Control-Allow-Origin as a response header that indicates whether a response can be shared with requesting code from a given origin. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin))
- MDN documentation describes CORS as an HTTP-header based mechanism for permitting browser access to resources from another origin. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS))
- MDN documentation describes a preflight request as an OPTIONS request sent before some cross-origin requests. ([source](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request))

## Further Reading

- [MDN Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin)
- [MDN Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [MDN Preflight Request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)
