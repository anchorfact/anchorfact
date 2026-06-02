---
id: api-field-masks-and-partial-response
title: 'API Field Masks and Partial Response'
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
  - id: fact-cs-api-field-masks-and-partial-response-1
    statement: >-
      Google AIP-157 defines guidance for using field masks to select specific fields in API
      requests.
    source_title: Google AIP-157 Field Masks
    source_url: https://google.aip.dev/157
    confidence: medium
  - id: fact-cs-api-field-masks-and-partial-response-2
    statement: >-
      Google Drive API documentation describes using the fields parameter to return only
      specific fields in a response.
    source_title: Google Drive API Partial Response
    source_url: https://developers.google.com/drive/api/guides/performance#partial
    confidence: medium
  - id: fact-cs-api-field-masks-and-partial-response-3
    statement: >-
      Google AIP-161 states that fields representing a field mask must use the
      google.protobuf.FieldMask type.
    source_title: Google AIP-161 Field Masks
    source_url: https://google.aip.dev/161
    confidence: medium
completeness: 0.83
known_gaps:
  - Field selection semantics vary by API, including default fields, nested masks, update masks, forbidden fields, pagination interaction, and schema evolution.
disputed_statements: []
primary_sources:
  - title: Google AIP-157 Field Masks
    type: standard
    year: 2026
    url: https://google.aip.dev/157
    institution: Google
  - title: Google Drive API Partial Response
    type: documentation
    year: 2026
    url: https://developers.google.com/drive/api/guides/performance#partial
    institution: Google
  - title: Google AIP-161 Field Masks
    type: standard
    year: 2021
    url: https://google.aip.dev/161
    institution: Google
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Field masks and partial responses let agents request only the fields they need, reducing payload size and accidental exposure of irrelevant data.

## Core Explanation

APIs often return large resource objects. A field mask or partial response parameter can narrow the response to the fields needed for the current task. This matters for agents because smaller payloads reduce context cost and make evidence easier to inspect.

Agents should still know the difference between read masks and update masks. Selecting fields for a response is not the same as declaring which fields an update may change.

## Source-Mapped Facts

- Google AIP-157 defines guidance for using field masks to select specific fields in API requests. ([source](https://google.aip.dev/157))
- Google Drive API documentation describes using the fields parameter to return only specific fields in a response. ([source](https://developers.google.com/drive/api/guides/performance#partial))
- Google AIP-161 states that fields representing a field mask must use the google.protobuf.FieldMask type. ([source](https://google.aip.dev/161))

## Further Reading

- [Google AIP-157 Field Masks](https://google.aip.dev/157)
- [Google Drive API Partial Response](https://developers.google.com/drive/api/guides/performance#partial)
- [Google AIP-161 Field Masks](https://google.aip.dev/161)
