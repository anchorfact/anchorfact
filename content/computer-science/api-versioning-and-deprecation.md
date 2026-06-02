---
id: api-versioning-and-deprecation
title: 'API Versioning and Deprecation'
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
  - id: fact-api-versioning-and-deprecation-1
    statement: >-
      Stripe API versioning documentation says major releases can contain breaking changes while monthly releases contain only backward-compatible changes.
    source_title: API Versioning - Stripe
    source_url: https://docs.stripe.com/api/versioning
  - id: fact-api-versioning-and-deprecation-2
    statement: >-
      Google AIP-185 requires API interfaces to provide a major version number.
    source_title: AIP-185 Versioning
    source_url: https://google.aip.dev/185
  - id: fact-api-versioning-and-deprecation-3
    statement: >-
      RFC 8594 defines the Sunset HTTP response header field for communicating that a resource is expected to become unresponsive at a specified time.
    source_title: RFC 8594 - The Sunset HTTP Header Field
    source_url: https://datatracker.ietf.org/doc/html/rfc8594
completeness: 0.83
known_gaps:
  - Versioning policy differs for REST, GraphQL, SDKs, event schemas, and model APIs.
disputed_statements: []
primary_sources:
  - title: API Versioning - Stripe
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/versioning
    institution: Stripe
  - title: AIP-185 Versioning
    type: design_standard
    year: 2026
    url: https://google.aip.dev/185
    institution: Google
  - title: RFC 8594 - The Sunset HTTP Header Field
    type: standard
    year: 2019
    url: https://datatracker.ietf.org/doc/html/rfc8594
    institution: IETF
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

API versioning and deprecation define how an API changes without surprising clients that depend on existing request, response, authentication, or event behavior.

## Core Explanation

Good API versioning separates compatible evolution from breaking change. Compatible changes can add optional fields or endpoints. Breaking changes require a version boundary, migration guide, sunset timeline, observability for affected clients, and a communication channel that reaches integrators before behavior changes.

For developer infrastructure, versioning is also an agent-readiness issue. Agents inspect API docs, call SDKs, and debug failures. Clear version labels, changelogs, deprecation headers, and migration examples make tool use safer and reduce brittle automation.

## Source-Mapped Facts

- Stripe API versioning documentation says major releases can contain breaking changes while monthly releases contain only backward-compatible changes. ([source](https://docs.stripe.com/api/versioning))
- Google AIP-185 requires API interfaces to provide a major version number. ([source](https://google.aip.dev/185))
- RFC 8594 defines the Sunset HTTP response header field for communicating that a resource is expected to become unresponsive at a specified time. ([source](https://datatracker.ietf.org/doc/html/rfc8594))

## Further Reading

- [Stripe API versioning](https://docs.stripe.com/api/versioning)
- [Google AIP-185](https://google.aip.dev/185)
- [RFC 8594](https://datatracker.ietf.org/doc/html/rfc8594)
