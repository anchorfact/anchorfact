---
id: api-sunset-and-deprecation-headers
title: 'API Sunset and Deprecation Headers'
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
  - id: fact-api-sunset-and-deprecation-headers-1
    statement: >-
      RFC 8594 defines the Sunset HTTP response header field for indicating when a URI is expected
      to become unresponsive.
    source_title: RFC 8594 Sunset Header
    source_url: https://datatracker.ietf.org/doc/html/rfc8594
    confidence: medium
  - id: fact-api-sunset-and-deprecation-headers-2
    statement: >-
      RFC 9745 defines the Deprecation HTTP response header field for communicating deprecation.
    source_title: RFC 9745 Deprecation Header
    source_url: https://datatracker.ietf.org/doc/html/rfc9745
    confidence: medium
  - id: fact-api-sunset-and-deprecation-headers-3
    statement: >-
      RFC 8288 defines Web Linking for expressing typed links in HTTP header fields.
    source_title: RFC 8288 Web Linking
    source_url: https://datatracker.ietf.org/doc/html/rfc8288
    confidence: medium
completeness: 0.84
known_gaps:
  - Deprecation policy also needs documentation links, versioning rules, migration examples, client ownership, and enforcement dates.
disputed_statements: []
primary_sources:
  - title: RFC 8594 Sunset Header
    type: standard
    year: 2019
    url: https://datatracker.ietf.org/doc/html/rfc8594
    institution: IETF
  - title: RFC 9745 Deprecation Header
    type: standard
    year: 2026
    url: https://datatracker.ietf.org/doc/html/rfc9745
    institution: IETF
  - title: RFC 8288 Web Linking
    type: standard
    year: 2017
    url: https://datatracker.ietf.org/doc/html/rfc8288
    institution: IETF
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Sunset and Deprecation headers give API clients and agents machine-readable warnings before an endpoint is removed.

## Core Explanation

Deprecation is a lifecycle signal, not just a changelog sentence. HTTP response headers can tell clients that an endpoint is deprecated, when it may stop working, and where to find related migration links.

Agents should use these headers as evidence for migration planning. They should still check documentation, client usage, and version policy before recommending endpoint removal or automated SDK updates.

## Source-Mapped Facts

- RFC 8594 defines the Sunset HTTP response header field for indicating when a URI is expected to become unresponsive. ([source](https://datatracker.ietf.org/doc/html/rfc8594))
- RFC 9745 defines the Deprecation HTTP response header field for communicating deprecation. ([source](https://datatracker.ietf.org/doc/html/rfc9745))
- RFC 8288 defines Web Linking for expressing typed links in HTTP header fields. ([source](https://datatracker.ietf.org/doc/html/rfc8288))

## Further Reading

- [RFC 8594 Sunset Header](https://datatracker.ietf.org/doc/html/rfc8594)
- [RFC 9745 Deprecation Header](https://datatracker.ietf.org/doc/html/rfc9745)
- [RFC 8288 Web Linking](https://datatracker.ietf.org/doc/html/rfc8288)
