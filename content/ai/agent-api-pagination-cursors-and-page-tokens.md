---
id: agent-api-pagination-cursors-and-page-tokens
title: 'Agent API Pagination, Cursors, and Page Tokens'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-api-pagination-cursors-and-page-tokens-1
    statement: >-
      Google AIP-158 defines pagination guidance for list methods and uses page tokens to
      retrieve subsequent pages.
    source_title: Google AIP-158 Pagination
    source_url: https://google.aip.dev/158
    confidence: medium
  - id: fact-ai-agent-api-pagination-cursors-and-page-tokens-2
    statement: >-
      GitHub REST API documentation describes using the Link header to request additional
      pages of paginated responses.
    source_title: GitHub REST API Pagination
    source_url: https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api
    confidence: medium
  - id: fact-ai-agent-api-pagination-cursors-and-page-tokens-3
    statement: >-
      Stripe API documentation describes list methods as returning paginated objects that
      include a data array and a has_more value.
    source_title: Stripe API Pagination
    source_url: https://docs.stripe.com/api/pagination
    confidence: medium
completeness: 0.83
known_gaps:
  - Pagination behavior varies by API, including cursor stability, deleted records, sorting guarantees, page-size limits, snapshot semantics, and rate-limit interaction.
disputed_statements: []
primary_sources:
  - title: Google AIP-158 Pagination
    type: standard
    year: 2019
    url: https://google.aip.dev/158
    institution: Google
  - title: GitHub REST API Pagination
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api
    institution: GitHub
  - title: Stripe API Pagination
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/pagination
    institution: Stripe
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Pagination tokens, cursors, and link headers tell agents how to continue API reads without silently truncating evidence.

## Core Explanation

Agents often fail on APIs by reading only the first page and treating it as the full dataset. A robust agent should detect pagination fields, preserve the cursor or page token, request follow-up pages within limits, and record whether the result is complete or sampled.

Cursor handling also affects correctness. Some APIs use opaque page tokens, some use link headers, and some expose cursor fields such as `starting_after` or `has_more`. Agents should not invent token structure or sort order unless the API documentation states it.

## Source-Mapped Facts

- Google AIP-158 defines pagination guidance for list methods and uses page tokens to retrieve subsequent pages. ([source](https://google.aip.dev/158))
- GitHub REST API documentation describes using the Link header to request additional pages of paginated responses. ([source](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api))
- Stripe API documentation describes list methods as returning paginated objects that include a data array and a has_more value. ([source](https://docs.stripe.com/api/pagination))

## Further Reading

- [Google AIP-158 Pagination](https://google.aip.dev/158)
- [GitHub REST API Pagination](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
- [Stripe API Pagination](https://docs.stripe.com/api/pagination)
