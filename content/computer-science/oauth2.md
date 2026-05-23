---
id: "kb-2026-00075"


title: "OAuth 2.0"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "RFC 6749 — The OAuth 2.0 Authorization Framework"
    authors: ["Hardt, D."]
    type: "standard"


    year: 2012
    url: "https://www.rfc-editor.org/rfc/rfc6749"

    institution: "IETF"
secondary_sources:
  - title: "OAuth 2 in Action"
    authors: ["Richer", "Sanso"]
    type: "book"


    year: 2017
    url: "https://www.manning.com/books/oauth-2-in-action"

    institution: "Manning"
atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      OAuth 2.0 is an authorization framework standardized as IETF RFC 6749 that enables third-party applications to
      obtain limited access to a user's resources without exposing their credentials
    source_title: RFC 6749 — The OAuth 2.0 Authorization Framework
    source_url: https://www.rfc-editor.org/rfc/rfc6749
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "Statistics and data cited are from 2017 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
ai_citations: {last_citation_check: "2026-05-22"}
---

## TL;DR

OAuth 2.0 is an authorization framework standardized as IETF RFC 6749 (2012) that enables third-party applications to obtain limited access to a user's resources without exposing their credentials. It powers virtually all "Sign in with Google/GitHub/Apple" flows and is the foundation of modern API security.

## Core Grant Types

| Grant Type | Use Case |
|-----------|----------|
| **Authorization Code + PKCE** | Web/mobile apps (most common, most secure) |
| **Client Credentials** | Server-to-server, no user involved |
| **Device Code** | Input-constrained devices (TV, IoT) |
| **Refresh Token** | Obtain new access token without re-authentication |

## Further Reading

- [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749): OAuth 2.0 specification
- [OAuth 2.1 Draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/): Consolidation and security best practices
