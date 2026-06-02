---
id: api-json-patch-and-merge-patch
title: 'API JSON Patch and Merge Patch'
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
  - id: fact-cs-api-json-patch-and-merge-patch-1
    statement: >-
      RFC 6902 defines JSON Patch as a JSON document structure for expressing a sequence of
      operations to apply to a JSON document.
    source_title: RFC 6902 JSON Patch
    source_url: https://datatracker.ietf.org/doc/html/rfc6902
    confidence: medium
  - id: fact-cs-api-json-patch-and-merge-patch-2
    statement: >-
      RFC 7396 defines JSON Merge Patch as a format for describing changes to a target JSON document
      using example-based syntax.
    source_title: RFC 7396 JSON Merge Patch
    source_url: https://datatracker.ietf.org/doc/html/rfc7396
    confidence: medium
  - id: fact-cs-api-json-patch-and-merge-patch-3
    statement: >-
      RFC 5789 defines the HTTP PATCH method for applying partial modifications to a resource.
    source_title: RFC 5789 PATCH Method for HTTP
    source_url: https://datatracker.ietf.org/doc/html/rfc5789
    confidence: medium
completeness: 0.82
known_gaps:
  - Partial-update safety depends on conditional requests, idempotency, conflict handling, schema validation, field-level authorization, and whether null means delete, clear, or retain.
disputed_statements: []
primary_sources:
  - title: RFC 6902 JSON Patch
    type: standard
    year: 2013
    url: https://datatracker.ietf.org/doc/html/rfc6902
    institution: IETF
  - title: RFC 7396 JSON Merge Patch
    type: standard
    year: 2014
    url: https://datatracker.ietf.org/doc/html/rfc7396
    institution: IETF
  - title: RFC 5789 PATCH Method for HTTP
    type: standard
    year: 2010
    url: https://datatracker.ietf.org/doc/html/rfc5789
    institution: IETF
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents should distinguish JSON Patch, JSON Merge Patch, and generic PATCH before editing API resources.

## Core Explanation

JSON Patch sends an ordered list of operations such as add, remove, replace, move, copy, and test. JSON Merge Patch sends a partial JSON document that describes the desired merge. Both can be carried by HTTP PATCH, but they have different media types and different risk profiles.

An agent should record the patch media type, target resource version, ETag or precondition, allowed fields, dry-run response, validation errors, and rollback path. For writes, it should avoid guessing whether a null field deletes data unless the API contract says so.

## Source-Mapped Facts

- RFC 6902 defines JSON Patch as a JSON document structure for expressing a sequence of operations to apply to a JSON document. ([source](https://datatracker.ietf.org/doc/html/rfc6902))
- RFC 7396 defines JSON Merge Patch as a format for describing changes to a target JSON document using example-based syntax. ([source](https://datatracker.ietf.org/doc/html/rfc7396))
- RFC 5789 defines the HTTP PATCH method for applying partial modifications to a resource. ([source](https://datatracker.ietf.org/doc/html/rfc5789))

## Further Reading

- [RFC 6902 JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902)
- [RFC 7396 JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396)
- [RFC 5789 PATCH Method for HTTP](https://datatracker.ietf.org/doc/html/rfc5789)
