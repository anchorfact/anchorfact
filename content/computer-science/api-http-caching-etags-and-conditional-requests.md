---
id: api-http-caching-etags-and-conditional-requests
title: 'API HTTP Caching, ETags, and Conditional Requests'
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
  - id: fact-api-http-caching-etags-and-conditional-requests-1
    statement: >-
      RFC 9110 defines the ETag response header field as carrying an entity tag for the selected
      representation.
    source_title: RFC 9110 ETag
    source_url: https://datatracker.ietf.org/doc/html/rfc9110#section-8.8.3
    confidence: medium
  - id: fact-api-http-caching-etags-and-conditional-requests-2
    statement: >-
      RFC 9110 defines If-None-Match as a request header field that makes a request conditional on
      entity tag comparison.
    source_title: RFC 9110 If-None-Match
    source_url: https://datatracker.ietf.org/doc/html/rfc9110#section-13.1.2
    confidence: medium
  - id: fact-api-http-caching-etags-and-conditional-requests-3
    statement: >-
      GitHub REST API best-practices documentation recommends using conditional requests where
      possible.
    source_title: GitHub REST API Best Practices
    source_url: https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api
    confidence: medium
completeness: 0.84
known_gaps:
  - Cache safety depends on method semantics, authorization, Vary headers, surrogate cache behavior, and API-specific freshness policy.
disputed_statements: []
primary_sources:
  - title: RFC 9110 ETag
    type: standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9110#section-8.8.3
    institution: IETF
  - title: RFC 9110 If-None-Match
    type: standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9110#section-13.1.2
    institution: IETF
  - title: GitHub REST API Best Practices
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

ETags and conditional requests let APIs reduce unnecessary transfer while preserving explicit freshness checks.

## Core Explanation

API clients and agents often poll the same resources repeatedly. HTTP validators such as ETags let a client ask whether the representation has changed without downloading the full response again. Conditional requests can reduce bandwidth and API work when implemented correctly.

Agents should not add caching blindly. Authenticated API responses, personalized data, and rapidly changing state need clear cache directives and validation behavior. A good change cites the response headers, request method, status behavior, and client retry logic.

## Source-Mapped Facts

- RFC 9110 defines the ETag response header field as carrying an entity tag for the selected representation. ([source](https://datatracker.ietf.org/doc/html/rfc9110#section-8.8.3))
- RFC 9110 defines If-None-Match as a request header field that makes a request conditional on entity tag comparison. ([source](https://datatracker.ietf.org/doc/html/rfc9110#section-13.1.2))
- GitHub REST API best-practices documentation recommends using conditional requests where possible. ([source](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api))

## Further Reading

- [RFC 9110 ETag](https://datatracker.ietf.org/doc/html/rfc9110#section-8.8.3)
- [RFC 9110 If-None-Match](https://datatracker.ietf.org/doc/html/rfc9110#section-13.1.2)
- [GitHub REST API Best Practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api)
