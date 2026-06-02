---
id: api-scim-user-provisioning
title: 'API SCIM User Provisioning'
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
  - id: fact-computer-science-api-scim-user-provisioning-1
    statement: >-
      RFC 7643 defines a core schema and extension model for representing users and groups.
    source_title: RFC 7643 SCIM Core Schema
    source_url: https://datatracker.ietf.org/doc/html/rfc7643
    confidence: medium
  - id: fact-computer-science-api-scim-user-provisioning-2
    statement: >-
      RFC 7644 defines a protocol for creating, modifying, retrieving, and discovering SCIM
      resources.
    source_title: RFC 7644 SCIM Protocol
    source_url: https://datatracker.ietf.org/doc/html/rfc7644
    confidence: medium
  - id: fact-computer-science-api-scim-user-provisioning-3
    statement: >-
      Microsoft Entra documentation describes using SCIM to automate provisioning of users and
      groups to applications.
    source_title: Microsoft Entra SCIM Provisioning
    source_url: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups
    confidence: medium
completeness: 0.84
known_gaps:
  - SCIM deployments depend on identity-provider mappings, filtering behavior, PATCH support, deactivation semantics, rate limits, and group membership scale.
disputed_statements: []
primary_sources:
  - title: RFC 7643 SCIM Core Schema
    type: rfc
    year: 2015
    url: https://datatracker.ietf.org/doc/html/rfc7643
    institution: IETF
  - title: RFC 7644 SCIM Protocol
    type: rfc
    year: 2015
    url: https://datatracker.ietf.org/doc/html/rfc7644
    institution: IETF
  - title: Microsoft Entra SCIM Provisioning
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

SCIM provisioning APIs let identity systems synchronize users and groups, which is critical context for agents debugging access and onboarding failures.

## Core Explanation

Developer infrastructure often treats account access as a data synchronization problem. SCIM gives systems a standard shape for users and groups plus protocol operations for provisioning and updates.

Agents should inspect identity-provider mappings, user identifiers, group membership, deactivation behavior, and PATCH support before diagnosing a missing user as an application bug. A provisioning delay or mapping mismatch can look like an authorization defect.

## Source-Mapped Facts

- RFC 7643 defines a core schema and extension model for representing users and groups. ([source](https://datatracker.ietf.org/doc/html/rfc7643))
- RFC 7644 defines a protocol for creating, modifying, retrieving, and discovering SCIM resources. ([source](https://datatracker.ietf.org/doc/html/rfc7644))
- Microsoft Entra documentation describes using SCIM to automate provisioning of users and groups to applications. ([source](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups))

## Further Reading

- [RFC 7643 SCIM Core Schema](https://datatracker.ietf.org/doc/html/rfc7643)
- [RFC 7644 SCIM Protocol](https://datatracker.ietf.org/doc/html/rfc7644)
- [Microsoft Entra SCIM Provisioning](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups)
