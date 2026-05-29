---
id: "kb-2026-00185"
title: "HTTP Status Codes"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-http-status-1"
    statement: "RFC 9110 says the status-code element is a three-digit integer code that describes the result of understanding and satisfying a request."
    source_title: "RFC 9110: HTTP Semantics"
    source_url: "https://www.ietf.org/rfc/rfc9110.html"
    confidence: "medium"
  - id: "fact-http-status-2"
    statement: "RFC 9110 groups HTTP status codes into five classes: informational 1xx, successful 2xx, redirection 3xx, client error 4xx, and server error 5xx."
    source_title: "RFC 9110: HTTP Semantics"
    source_url: "https://www.ietf.org/rfc/rfc9110.html"
    confidence: "medium"
  - id: "fact-http-status-3"
    statement: "RFC 9110 defines 429 Too Many Requests as a client error status code indicating that the user has sent too many requests in a given amount of time."
    source_title: "RFC 9110: HTTP Semantics"
    source_url: "https://www.ietf.org/rfc/rfc9110.html"
    confidence: "medium"
  - id: "fact-http-status-4"
    statement: "IANA maintains the Hypertext Transfer Protocol Status Code Registry for registered HTTP status codes."
    source_title: "Hypertext Transfer Protocol (HTTP) Status Code Registry"
    source_url: "https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml"
    confidence: "medium"

completeness: 0.78

known_gaps:
  - "This compact repair focuses on the standard status-code model and does not list every registered HTTP status code."

disputed_statements: []

primary_sources:
  - title: "RFC 9110: HTTP Semantics"
    authors: ["Fielding, R.", "Nottingham, M.", "Reschke, J."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9110.html"
    institution: "IETF"
  - title: "Hypertext Transfer Protocol (HTTP) Status Code Registry"
    authors: ["Internet Assigned Numbers Authority"]
    type: "official_record"
    year: 2026
    url: "https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml"
    institution: "IANA"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

HTTP status codes are standardized three-digit result codes in HTTP responses. The first digit identifies the broad class: informational, successful, redirection, client error, or server error.

## Core Explanation

Status codes let clients make programmatic decisions without parsing human-readable text. For example, a `2xx` response means the request succeeded, a `3xx` response indicates redirection, a `4xx` response points to a client-side problem, and a `5xx` response points to a server-side problem.

The response body can add application-specific detail, but the status code itself should remain one of the standard HTTP meanings so intermediaries, clients, and monitoring tools can interpret it consistently.

## Further Reading

- [RFC 9110: HTTP Semantics](https://www.ietf.org/rfc/rfc9110.html)
- [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)

## Related Articles

- [Hypertext Transfer Protocol (HTTP)](../http-protocol.md)
- [REST API](../rest-api.md)
- [API Gateway](../api-gateway.md)
