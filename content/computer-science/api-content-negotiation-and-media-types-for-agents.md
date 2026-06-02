---
id: api-content-negotiation-and-media-types-for-agents
title: 'API Content Negotiation and Media Types for Agents'
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
  - id: fact-cs-api-content-negotiation-and-media-types-for-agents-1
    statement: >-
      RFC 9110 says the Accept header field can be used by user agents to
      specify acceptable response media types.
    source_title: RFC 9110 - Accept
    source_url: https://datatracker.ietf.org/doc/html/rfc9110#name-accept
    confidence: medium
  - id: fact-cs-api-content-negotiation-and-media-types-for-agents-2
    statement: >-
      RFC 9110 says the Content-Type field indicates the media type of the
      associated representation.
    source_title: RFC 9110 - Content-Type
    source_url: https://datatracker.ietf.org/doc/html/rfc9110#name-content-type
    confidence: medium
  - id: fact-cs-api-content-negotiation-and-media-types-for-agents-3
    statement: >-
      MDN documentation describes server-driven content negotiation as using
      request headers such as Accept, Accept-Encoding, and Accept-Language.
    source_title: MDN Content Negotiation
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation
    confidence: medium
completeness: 0.82
known_gaps:
  - Negotiation behavior depends on API versioning, vendor media types, charset handling, content encodings, language preferences, error responses, caches, and whether clients send explicit Accept and Content-Type headers.
disputed_statements: []
primary_sources:
  - title: RFC 9110 - Accept
    type: technical_standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9110#name-accept
    institution: IETF
  - title: RFC 9110 - Content-Type
    type: technical_standard
    year: 2022
    url: https://datatracker.ietf.org/doc/html/rfc9110#name-content-type
    institution: IETF
  - title: MDN Content Negotiation
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation
    institution: MDN
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Content negotiation tells an API which representation an agent wants and tells the agent what media type it actually received.

## Core Explanation

Agents that call APIs should not assume every response is JSON or every request body is accepted under the same media type. The Accept header expresses preferred response formats, while Content-Type describes the representation being sent or received.

This matters for tool calls, API migrations, and error handling. A request can fail because the agent sent the wrong Content-Type, omitted a vendor media type, asked for an unsupported response format, or parsed an HTML error page as JSON. Useful API evidence includes request headers, response headers, status code, media type, charset, body shape, and versioning policy.

## Source-Mapped Facts

- RFC 9110 says the Accept header field can be used by user agents to specify acceptable response media types. ([source](https://datatracker.ietf.org/doc/html/rfc9110#name-accept))
- RFC 9110 says the Content-Type field indicates the media type of the associated representation. ([source](https://datatracker.ietf.org/doc/html/rfc9110#name-content-type))
- MDN documentation describes server-driven content negotiation as using request headers such as Accept, Accept-Encoding, and Accept-Language. ([source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation))

## Further Reading

- [RFC 9110 - Accept](https://datatracker.ietf.org/doc/html/rfc9110#name-accept)
- [RFC 9110 - Content-Type](https://datatracker.ietf.org/doc/html/rfc9110#name-content-type)
- [MDN Content Negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation)
