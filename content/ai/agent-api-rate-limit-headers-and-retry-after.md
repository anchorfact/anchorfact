---
id: agent-api-rate-limit-headers-and-retry-after
title: 'Agent API Rate-Limit Headers and Retry-After'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-api-rate-limit-headers-and-retry-after-1
    statement: >-
      RFC 9110 defines the Retry-After response header field for indicating how long a user agent
      ought to wait before a follow-up request.
    source_title: RFC 9110 HTTP Semantics
    source_url: https://datatracker.ietf.org/doc/html/rfc9110#section-10.2.3
    confidence: medium
  - id: fact-ai-agent-api-rate-limit-headers-and-retry-after-2
    statement: >-
      RFC 6585 defines the 429 Too Many Requests status code for rate limiting and says responses
      may include a Retry-After header.
    source_title: RFC 6585 Additional HTTP Status Codes
    source_url: https://datatracker.ietf.org/doc/html/rfc6585#section-4
    confidence: medium
  - id: fact-ai-agent-api-rate-limit-headers-and-retry-after-3
    statement: >-
      GitHub REST API documentation lists rate-limit response headers such as x-ratelimit-limit,
      x-ratelimit-remaining, and x-ratelimit-reset.
    source_title: GitHub REST API Rate Limits
    source_url: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    confidence: medium
completeness: 0.84
known_gaps:
  - Rate-limit semantics differ by provider and may also depend on authentication, endpoint class, and abuse detection.
disputed_statements: []
primary_sources:
  - title: RFC 9110 HTTP Semantics
    type: standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9110#section-10.2.3
    institution: IETF
  - title: RFC 6585 Additional HTTP Status Codes
    type: standard
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6585#section-4
    institution: IETF
  - title: GitHub REST API Rate Limits
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Rate-limit headers and Retry-After tell agents when to slow down, retry later, or ask for a quota-aware plan.

## Core Explanation

Tool-using agents call APIs repeatedly, so they need to read rate-limit signals instead of blindly retrying. A 429 response, Retry-After value, and provider-specific quota headers can indicate whether the correct behavior is waiting, backing off, reducing concurrency, or using a different endpoint.

Agents should record the exact headers and endpoint involved. They should not infer global quota state from one failed request when a provider has separate limits for different resources, tokens, or secondary abuse protection.

## Source-Mapped Facts

- RFC 9110 defines the Retry-After response header field for indicating how long a user agent ought to wait before a follow-up request. ([source](https://datatracker.ietf.org/doc/html/rfc9110#section-10.2.3))
- RFC 6585 defines the 429 Too Many Requests status code for rate limiting and says responses may include a Retry-After header. ([source](https://datatracker.ietf.org/doc/html/rfc6585#section-4))
- GitHub REST API documentation lists rate-limit response headers such as x-ratelimit-limit, x-ratelimit-remaining, and x-ratelimit-reset. ([source](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api))

## Further Reading

- [RFC 9110 Retry-After](https://datatracker.ietf.org/doc/html/rfc9110#section-10.2.3)
- [RFC 6585 429 Too Many Requests](https://datatracker.ietf.org/doc/html/rfc6585#section-4)
- [GitHub REST API Rate Limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
