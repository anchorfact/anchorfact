---
id: api-http-range-requests-and-content-range
title: 'API HTTP Range Requests and Content-Range'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-api-http-range-requests-and-content-range-1
    statement: >-
      MDN documentation says a client can request a specific part of a document
      by including the Range header in an HTTP request when the server supports
      range requests.
    source_title: MDN HTTP Range Requests
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests
    confidence: medium
  - id: fact-computer-science-api-http-range-requests-and-content-range-2
    statement: >-
      MDN documentation says the Range header can request multiple ranges in one
      multipart response.
    source_title: MDN HTTP Range Requests
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests
    confidence: medium
  - id: fact-computer-science-api-http-range-requests-and-content-range-3
    statement: >-
      RFC 9110 defines the Content-Range header field syntax for range responses
      and unsatisfied ranges.
    source_title: RFC 9110 HTTP Semantics
    source_url: https://datatracker.ietf.org/doc/html/rfc9110
    confidence: medium
  - id: fact-computer-science-api-http-range-requests-and-content-range-4
    statement: >-
      RFC 9110 says a single-part 206 Partial Content response must generate a
      Content-Range header field describing the enclosed range.
    source_title: RFC 9110 HTTP Semantics
    source_url: https://datatracker.ietf.org/doc/html/rfc9110
    confidence: medium
  - id: fact-computer-science-api-http-range-requests-and-content-range-5
    statement: >-
      RFC 9110 says a 416 Range Not Satisfiable response should send
      Content-Range with an unsatisfied-range value.
    source_title: RFC 9110 HTTP Semantics
    source_url: https://datatracker.ietf.org/doc/html/rfc9110
    confidence: medium
completeness: 0.84
known_gaps:
  - HTTP range diagnosis depends on method, Range syntax, Accept-Ranges response, ETag or Last-Modified validators, compressed transfer behavior, CDN support, multipart boundaries, 206 and 416 status handling, and whether clients recombine partial content safely.
disputed_statements: []
primary_sources:
  - title: MDN HTTP Range Requests
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests
    institution: MDN Web Docs
  - title: RFC 9110 HTTP Semantics
    type: rfc
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9110
    institution: IETF
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

HTTP Range and Content-Range evidence helps API agents debug partial downloads, resume behavior, CDN transformations, and clients that mishandle 206 or 416 responses.

## Core Explanation

Range requests are common in file APIs, media delivery, package registries, and resumable clients. A failed resume can come from an invalid `Range` header, missing range support, compressed content, a changed validator, or a proxy that rewrites partial responses.

Useful evidence includes the original URL, request method, `Range`, `If-Range`, `Accept-Ranges`, `Content-Range`, status code, ETag, Last-Modified, Content-Encoding, CDN headers, and whether the client expects one range or multipart byteranges.

## Source-Mapped Facts

- MDN documentation says a client can request a specific part of a document by including the Range header in an HTTP request when the server supports range requests. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests))
- MDN documentation says the Range header can request multiple ranges in one multipart response. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests))
- RFC 9110 defines the Content-Range header field syntax for range responses and unsatisfied ranges. ([source](https://datatracker.ietf.org/doc/html/rfc9110))
- RFC 9110 says a single-part 206 Partial Content response must generate a Content-Range header field describing the enclosed range. ([source](https://datatracker.ietf.org/doc/html/rfc9110))
- RFC 9110 says a 416 Range Not Satisfiable response should send Content-Range with an unsatisfied-range value. ([source](https://datatracker.ietf.org/doc/html/rfc9110))

## Further Reading

- [MDN HTTP Range Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests)
- [RFC 9110 HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
