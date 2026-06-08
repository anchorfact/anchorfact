---
id: rag-connector-throttling-and-crawl-rate-limits
title: 'RAG Connector Throttling and Crawl Rate Limits'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-rag-connector-throttling-and-crawl-rate-limits-1
    statement: >-
      Microsoft Graph documentation says throttled requests return HTTP status
      code 429 and can include a Retry-After header.
    source_title: Microsoft Graph Throttling
    source_url: https://learn.microsoft.com/en-us/graph/throttling
    confidence: medium
  - id: fact-ai-rag-connector-throttling-and-crawl-rate-limits-2
    statement: >-
      Google Drive API documentation describes usage limits and recommends
      truncated exponential backoff for time-based errors.
    source_title: Google Drive API Limits
    source_url: https://developers.google.com/drive/api/guides/limits
    confidence: medium
  - id: fact-ai-rag-connector-throttling-and-crawl-rate-limits-3
    statement: >-
      Atlassian Cloud documentation describes rate limiting responses that use
      HTTP 429 and Retry-After information.
    source_title: Atlassian Cloud Rate Limiting
    source_url: https://developer.atlassian.com/cloud/confluence/rate-limiting/
    confidence: medium
completeness: 0.84
known_gaps:
  - Connector limits differ by API, tenant, user, app, endpoint, quota window, expansion depth, and whether the connector uses delta sync or full recrawl.
  - Backoff settings that protect source APIs can delay index freshness, so agents need both crawl health and retrieval freshness evidence.
disputed_statements: []
primary_sources:
  - title: Microsoft Graph Throttling
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/graph/throttling
    institution: Microsoft
  - title: Google Drive API Limits
    type: documentation
    year: 2026
    url: https://developers.google.com/drive/api/guides/limits
    institution: Google
  - title: Atlassian Cloud Rate Limiting
    type: documentation
    year: 2026
    url: https://developer.atlassian.com/cloud/confluence/rate-limiting/
    institution: Atlassian
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG connectors must respect source-system throttling, but those same crawl limits can leave retrieval indexes stale if agents do not inspect sync lag.

## Core Explanation

Enterprise RAG systems often index sources such as drives, wikis, ticket systems, chats, and code hosts. Each source API has its own rate limits, retry headers, quota windows, and preferred sync pattern. A connector that ignores those limits can be blocked; a connector that backs off too aggressively can serve stale evidence.

Useful connector evidence includes source API, tenant, endpoint, cursor or delta token, last successful page, throttled request count, Retry-After value, backoff policy, crawl queue depth, document freshness, and failed document IDs. This lets an agent distinguish a ranking problem from a connector that simply has not crawled the newest version.

Agents should avoid recommending blind recrawls during throttling. Better first steps are to inspect the provider's retry guidance, reduce concurrency, resume from the last cursor, and prioritize high-value collections while preserving deletion and permission updates.

## Source-Mapped Facts

- Microsoft Graph documentation says throttled requests return HTTP status code 429 and can include a Retry-After header. ([source](https://learn.microsoft.com/en-us/graph/throttling))
- Google Drive API documentation describes usage limits and recommends truncated exponential backoff for time-based errors. ([source](https://developers.google.com/drive/api/guides/limits))
- Atlassian Cloud documentation describes rate limiting responses that use HTTP 429 and Retry-After information. ([source](https://developer.atlassian.com/cloud/confluence/rate-limiting/))

## Further Reading

- [Microsoft Graph Throttling](https://learn.microsoft.com/en-us/graph/throttling)
- [Google Drive API Limits](https://developers.google.com/drive/api/guides/limits)
- [Atlassian Cloud Rate Limiting](https://developer.atlassian.com/cloud/confluence/rate-limiting/)
