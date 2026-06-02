---
id: api-pagination-cursors-and-continuation-tokens
title: 'API Pagination Cursors and Continuation Tokens'
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
  - id: fact-computer-science-api-pagination-cursors-and-continuation-tokens-1
    statement: >-
      Stripe API documentation says list API methods use cursor-based pagination through starting_after and ending_before parameters.
    source_title: Stripe Pagination
    source_url: https://docs.stripe.com/api/pagination
    confidence: medium
  - id: fact-computer-science-api-pagination-cursors-and-continuation-tokens-2
    statement: >-
      Microsoft Graph documentation says clients should use the entire URL returned in @odata.nextLink to retrieve the next page of results.
    source_title: Microsoft Graph Paging
    source_url: https://learn.microsoft.com/en-us/graph/paging
    confidence: medium
  - id: fact-computer-science-api-pagination-cursors-and-continuation-tokens-3
    statement: >-
      JSON:API cursor pagination profile documentation describes page after and page before parameters for cursor-based pagination.
    source_title: JSON:API Cursor Pagination Profile
    source_url: https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
    confidence: medium
completeness: 0.83
known_gaps:
  - Cursor semantics vary by provider, and tokens can encode filters, sorting, snapshots, expiration, or authorization state.
disputed_statements: []
primary_sources:
  - title: Stripe Pagination
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/pagination
    institution: Stripe
  - title: Microsoft Graph Paging
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/graph/paging
    institution: Microsoft
  - title: JSON:API Cursor Pagination Profile
    type: documentation
    year: 2026
    url: https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
    institution: JSON:API
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Pagination cursors and continuation tokens let agents enumerate large API collections without assuming all results arrive in one response.

## Core Explanation

Agents that inspect tickets, cloud resources, audit logs, users, or events must follow pagination correctly. Stopping at the first page can create false conclusions, while fabricating cursor parameters can skip or duplicate records.

The safe pattern is to use provider-returned next links or documented cursor parameters exactly as specified. Agents should preserve filters and sorting across pages and record when pagination was incomplete.

## Source-Mapped Facts

- Stripe API documentation says list API methods use cursor-based pagination through starting_after and ending_before parameters. ([source](https://docs.stripe.com/api/pagination))
- Microsoft Graph documentation says clients should use the entire URL returned in @odata.nextLink to retrieve the next page of results. ([source](https://learn.microsoft.com/en-us/graph/paging))
- JSON:API cursor pagination profile documentation describes page after and page before parameters for cursor-based pagination. ([source](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/))

## Further Reading

- [Stripe Pagination](https://docs.stripe.com/api/pagination)
- [Microsoft Graph Paging](https://learn.microsoft.com/en-us/graph/paging)
- [JSON:API Cursor Pagination Profile](https://jsonapi.org/profiles/ethanresnick/cursor-pagination/)
