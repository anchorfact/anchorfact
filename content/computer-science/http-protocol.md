---
id: "kb-2026-00008"
title: "Hypertext Transfer Protocol (HTTP)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-http-1"
    statement: "RFC 9110 defines HTTP as a stateless application-level request/response protocol with extensible semantics."
    source_title: "RFC 9110: HTTP Semantics"
    source_url: "https://www.ietf.org/rfc/rfc9110.html"
    confidence: "medium"
  - id: "fact-http-2"
    statement: "RFC 9112 defines HTTP/1.1 message syntax, message parsing, connection management, and related protocol requirements."
    source_title: "RFC 9112: HTTP/1.1"
    source_url: "https://www.ietf.org/rfc/rfc9112.html"
    confidence: "medium"
  - id: "fact-http-3"
    statement: "RFC 9113 defines HTTP/2 as a binary-framed mapping of HTTP semantics that supports multiplexing of request and response streams."
    source_title: "RFC 9113: HTTP/2"
    source_url: "https://www.ietf.org/rfc/rfc9113.html"
    confidence: "medium"
  - id: "fact-http-4"
    statement: "RFC 9114 defines HTTP/3 as a mapping of HTTP semantics over the QUIC transport protocol."
    source_title: "RFC 9114: HTTP/3"
    source_url: "https://www.ietf.org/rfc/rfc9114.html"
    confidence: "medium"

completeness: 0.82

known_gaps:
  - "This compact repair avoids traffic-share and performance claims that vary by measurement source."

disputed_statements: []

primary_sources:
  - title: "RFC 9110: HTTP Semantics"
    authors: ["Fielding, R.", "Nottingham, M.", "Reschke, J."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9110.html"
    institution: "IETF"
  - title: "RFC 9112: HTTP/1.1"
    authors: ["Fielding, R.", "Nottingham, M.", "Reschke, J."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9112.html"
    institution: "IETF"
  - title: "RFC 9113: HTTP/2"
    authors: ["Thomson, M.", "Benfield, C."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9113.html"
    institution: "IETF"
  - title: "RFC 9114: HTTP/3"
    authors: ["Bishop, M."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9114.html"
    institution: "IETF"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

HTTP is the application-level protocol that lets clients request resources and servers return responses. The modern HTTP standard separates protocol semantics from wire mappings: HTTP/1.1, HTTP/2, and HTTP/3 carry the same core semantics over different message formats and transports.

## Core Explanation

An HTTP exchange is centered on a request and a response. The semantics include methods, status codes, fields, representation metadata, caching behavior, and content negotiation rules.

HTTP/1.1 uses textual messages over a connection. HTTP/2 maps the same semantics to binary frames and multiplexed streams. HTTP/3 maps HTTP semantics onto QUIC, changing the transport while preserving the application-level model.

## Further Reading

- [RFC 9110: HTTP Semantics](https://www.ietf.org/rfc/rfc9110.html)
- [RFC 9112: HTTP/1.1](https://www.ietf.org/rfc/rfc9112.html)
- [RFC 9113: HTTP/2](https://www.ietf.org/rfc/rfc9113.html)
- [RFC 9114: HTTP/3](https://www.ietf.org/rfc/rfc9114.html)

## Related Articles

- [REST API](../rest-api.md)
- [HTTPS / TLS (Transport Layer Security)](../https-tls.md)
- [API Gateway](../api-gateway.md)
