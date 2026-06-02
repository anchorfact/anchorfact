---
id: api-resource-names-and-canonical-identifiers-for-agents
title: 'API Resource Names and Canonical Identifiers for Agents'
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
  - id: fact-cs-api-resource-names-and-canonical-identifiers-for-agents-1
    statement: >-
      Google AIP-122 says resources are named and each resource has a unique identifier that users
      use to reference that resource.
    source_title: Google AIP-122 Resource Names
    source_url: https://google.aip.dev/122
    confidence: medium
  - id: fact-cs-api-resource-names-and-canonical-identifiers-for-agents-2
    statement: >-
      RFC 6570 defines URI Template syntax and the process for expanding a URI Template into a URI
      reference.
    source_title: RFC 6570 URI Template
    source_url: https://datatracker.ietf.org/doc/html/rfc6570
    confidence: medium
  - id: fact-cs-api-resource-names-and-canonical-identifiers-for-agents-3
    statement: >-
      OpenAPI learning documentation says API endpoints are called Paths in the OpenAPI
      Specification and are stored under the paths field.
    source_title: OpenAPI API Endpoints
    source_url: https://learn.openapis.org/specification/paths.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Identifier safety depends on provider-specific canonicalization, alias handling, deleted-resource reuse, tenant prefixes, URL encoding, pagination cursors, and whether IDs remain stable across API versions.
disputed_statements: []
primary_sources:
  - title: Google AIP-122 Resource Names
    type: design_standard
    year: 2019
    url: https://google.aip.dev/122
    institution: Google
  - title: RFC 6570 URI Template
    type: standard
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6570
    institution: IETF
  - title: OpenAPI API Endpoints
    type: documentation
    year: 2025
    url: https://learn.openapis.org/specification/paths.html
    institution: OpenAPI Initiative
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents need canonical resource identifiers so they update the intended object and cite the same object later.

## Core Explanation

Natural-language labels are not stable enough for API automation. A project name can be duplicated, a file title can change, and a URL can be a view rather than the canonical resource. Resource names, IDs, and path templates give agents a more precise way to target reads, writes, links, and audit records.

Before acting, an agent should record the resource name or ID, parent collection, canonical URL or path template, API version, tenant or account scope, and whether aliases such as "me" resolve to a stable object. This reduces wrong-resource writes and makes later evidence easier to verify.

## Source-Mapped Facts

- Google AIP-122 says resources are named and each resource has a unique identifier that users use to reference that resource. ([source](https://google.aip.dev/122))
- RFC 6570 defines URI Template syntax and the process for expanding a URI Template into a URI reference. ([source](https://datatracker.ietf.org/doc/html/rfc6570))
- OpenAPI learning documentation says API endpoints are called Paths in the OpenAPI Specification and are stored under the paths field. ([source](https://learn.openapis.org/specification/paths.html))

## Further Reading

- [Google AIP-122 Resource Names](https://google.aip.dev/122)
- [RFC 6570 URI Template](https://datatracker.ietf.org/doc/html/rfc6570)
- [OpenAPI API Endpoints](https://learn.openapis.org/specification/paths.html)
