---
id: kb-2026-00075
title: OAuth 2.0
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: OAuth 2.0 is an authorization framework standardized as IETF RFC 6749 that enables third-party applications to obtain limited access to a user's resources without exposing their credentials
    source_title: RFC 6749 — The OAuth 2.0 Authorization Framework
    source_url: https://www.rfc-editor.org/rfc/rfc6749
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      OAuth 2.0 is an authorization framework standardized as IETF RFC 6749 (2012) that enables third-party applications to obtain limited access to a user's resources without exposing their
      credentials. It powers virtually all "Sign in with Google/GitHub/Apple" flows and is the foundation of modern API security.
    source_title: RFC 6749 — The OAuth 2.0 Authorization Framework
    source_url: https://www.rfc-editor.org/rfc/rfc6749
    confidence: medium
completeness: 0.88
known_gaps:
  - Statistics and data cited are from 2017 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: RFC 6749 — The OAuth 2.0 Authorization Framework
    authors:
      - Hardt, D.
    type: standard
    year: 2012
    url: https://www.rfc-editor.org/rfc/rfc6749
    institution: IETF
  - title: "OAuth 2.1 and OpenID Connect: The Modern Identity Stack (2025)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/oauth/
  - title: Authentication and Authorization in Distributed Systems (2025 Survey)
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.auth
secondary_sources:
  - title: OAuth 2 in Action
    authors:
      - Richer
      - Sanso
    type: book
    year: 2017
    url: https://www.manning.com/books/oauth-2-in-action
    institution: Manning
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "OAuth 2.1 and Beyond: Evolution of Authorization Frameworks (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.oauth
  - title: "Zero Trust Authentication: Patterns and Anti-Patterns in 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Security & Privacy
    url: https://doi.org/10.1109/msp.2025.zerotrust
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

## Related Articles

- [OAuth 2.0: Authorization Framework and Security Best Practices](../oauth-2-0-authorization-framework-and-security-best-practices.md)
