---
id: api-pagination-and-rate-limits
title: 'API Pagination and Rate Limits'
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
  - id: fact-api-pagination-and-rate-limits-1
    statement: >-
      GitHub REST API documentation says responses with many results are paginated and clients can use the Link header to request additional pages.
    source_title: Using pagination in the REST API - GitHub Docs
    source_url: https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api
  - id: fact-api-pagination-and-rate-limits-2
    statement: >-
      Stripe rate-limit documentation says Stripe uses rate and concurrency limiters and may return 429 responses when many requests arrive in quick succession.
    source_title: Rate limits - Stripe Documentation
    source_url: https://docs.stripe.com/rate-limits
  - id: fact-api-pagination-and-rate-limits-3
    statement: >-
      RFC 6585 defines the 429 Too Many Requests status code for cases where a user has sent too many requests in a given amount of time.
    source_title: RFC 6585 - Additional HTTP Status Codes
    source_url: https://datatracker.ietf.org/doc/html/rfc6585
completeness: 0.84
known_gaps:
  - API-specific quotas, pagination parameters, retry budgets, and abuse protections must be checked against each provider's current documentation.
disputed_statements: []
primary_sources:
  - title: Using pagination in the REST API - GitHub Docs
    type: documentation
    year: 2026
    url: https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api
    institution: GitHub
  - title: Rate limits - Stripe Documentation
    type: documentation
    year: 2026
    url: https://docs.stripe.com/rate-limits
    institution: Stripe
  - title: RFC 6585 - Additional HTTP Status Codes
    type: standard
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6585
    institution: IETF
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

API pagination controls how clients traverse large result sets. Rate limits control how fast clients may call the service without degrading reliability or triggering abuse protection.

## Core Explanation

Agents that call APIs need pagination and rate-limit handling as first-class execution logic. A model should not be expected to infer how many pages remain, whether a Link header has a next page, or how to back off after a 429. Robust API tooling exposes pagination cursors, request budgets, retry-after handling, exponential backoff, and maximum page limits in the runtime.

## Source-Mapped Facts

- GitHub REST API documentation says responses with many results are paginated and clients can use the Link header to request additional pages. ([source](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api))
- Stripe rate-limit documentation says Stripe uses rate and concurrency limiters and may return 429 responses when many requests arrive in quick succession. ([source](https://docs.stripe.com/rate-limits))
- RFC 6585 defines the 429 Too Many Requests status code for cases where a user has sent too many requests in a given amount of time. ([source](https://datatracker.ietf.org/doc/html/rfc6585))

## Further Reading

- [GitHub REST API pagination](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [Stripe rate limits](https://docs.stripe.com/rate-limits)
- [RFC 6585](https://datatracker.ietf.org/doc/html/rfc6585)
