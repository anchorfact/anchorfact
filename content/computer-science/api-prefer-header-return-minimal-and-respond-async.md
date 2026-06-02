---
id: api-prefer-header-return-minimal-and-respond-async
title: 'API Prefer Header: return=minimal and respond-async'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-api-prefer-header-return-minimal-and-respond-async-1
    statement: >-
      RFC 7240 defines the Prefer request header field for clients to request
      optional server behaviors while processing a request.
    source_title: RFC 7240 Prefer Header for HTTP
    source_url: https://www.rfc-editor.org/info/rfc7240/
    confidence: medium
  - id: fact-cs-api-prefer-header-return-minimal-and-respond-async-2
    statement: >-
      RFC 7240 defines the respond-async preference for cases where a client
      prefers asynchronous processing.
    source_title: RFC 7240 Prefer Header for HTTP
    source_url: https://www.rfc-editor.org/info/rfc7240/
    confidence: medium
  - id: fact-cs-api-prefer-header-return-minimal-and-respond-async-3
    statement: >-
      MDN documentation describes the Prefer header as supporting preferences
      such as return=minimal and respond-async.
    source_title: MDN Prefer Header
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Prefer
    confidence: medium
completeness: 0.82
known_gaps:
  - Prefer handling depends on API support, Preference-Applied headers, cache behavior, write method semantics, asynchronous operation resources, and whether clients can tolerate servers ignoring optional preferences.
disputed_statements: []
primary_sources:
  - title: RFC 7240 Prefer Header for HTTP
    type: technical_standard
    year: 2014
    url: https://www.rfc-editor.org/info/rfc7240/
    institution: IETF
  - title: MDN Prefer Header
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Prefer
    institution: MDN
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

The HTTP Prefer header lets API agents request optional response behavior such as minimal write responses or asynchronous handling.

## Core Explanation

Some APIs let clients influence how much work happens synchronously or how much representation data comes back after a write. Prefer is useful because it expresses a client preference without turning it into a required precondition.

Agents should record the Prefer value, response status, Preference-Applied header, response body shape, operation URL, and retry or polling policy. If a server ignores the preference, the agent still needs to parse the actual response rather than assuming a minimal body or an async job resource exists.

## Source-Mapped Facts

- RFC 7240 defines the Prefer request header field for clients to request optional server behaviors while processing a request. ([source](https://www.rfc-editor.org/info/rfc7240/))
- RFC 7240 defines the respond-async preference for cases where a client prefers asynchronous processing. ([source](https://www.rfc-editor.org/info/rfc7240/))
- MDN documentation describes the Prefer header as supporting preferences such as return=minimal and respond-async. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Prefer))

## Further Reading

- [RFC 7240 Prefer Header for HTTP](https://www.rfc-editor.org/info/rfc7240/)
- [MDN Prefer Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Prefer)
