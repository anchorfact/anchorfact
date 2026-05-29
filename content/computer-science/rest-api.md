---
id: "kb-2026-00064"
title: "REST API"
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
  - id: "fact-rest-api-1"
    statement: "Roy Fielding's dissertation defines REST as an architectural style for distributed hypermedia systems."
    source_title: "Architectural Styles and the Design of Network-based Software Architectures"
    source_url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm"
    confidence: "medium"
  - id: "fact-rest-api-2"
    statement: "Fielding describes REST's constraints as client-server, stateless, cache, uniform interface, layered system, and optional code-on-demand."
    source_title: "Architectural Styles and the Design of Network-based Software Architectures"
    source_url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm"
    confidence: "medium"
  - id: "fact-rest-api-3"
    statement: "RFC 9110 defines HTTP methods as the primary source of request semantics in HTTP."
    source_title: "RFC 9110: HTTP Semantics"
    source_url: "https://www.ietf.org/rfc/rfc9110.html"
    confidence: "medium"

completeness: 0.8

known_gaps:
  - "This compact repair defines REST from primary sources and avoids broad adoption or vendor-usage claims."

disputed_statements: []

primary_sources:
  - title: "Architectural Styles and the Design of Network-based Software Architectures"
    authors: ["Fielding, Roy Thomas"]
    type: "dissertation"
    year: 2000
    url: "https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm"
    institution: "UC Irvine"
  - title: "RFC 9110: HTTP Semantics"
    authors: ["Fielding, R.", "Nottingham, M.", "Reschke, J."]
    type: "rfc"
    year: 2022
    url: "https://www.ietf.org/rfc/rfc9110.html"
    institution: "IETF"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

REST is an architectural style for distributed hypermedia systems, not a single protocol. A REST-style web API usually exposes resources through HTTP, uses HTTP request semantics, keeps application state out of the server session, and relies on representations transferred between client and server.

## Core Explanation

Fielding's REST constraints are client-server, stateless, cache, uniform interface, layered system, and optional code-on-demand. The uniform interface constraint is the key distinction: clients interact with resources through a shared interface instead of custom per-application operations.

In HTTP APIs, REST-style designs commonly pair resource identifiers with HTTP methods and status codes. That practical pattern should not be confused with the full architectural style, which is broader than CRUD naming conventions.

## Further Reading

- [Architectural Styles and the Design of Network-based Software Architectures](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [RFC 9110: HTTP Semantics](https://www.ietf.org/rfc/rfc9110.html)

## Related Articles

- [Hypertext Transfer Protocol (HTTP)](../http-protocol.md)
- [HTTP Status Codes](../http-status-codes.md)
- [API Gateway](../api-gateway.md)
