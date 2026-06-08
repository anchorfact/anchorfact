---
id: agent-cloudflare-graphql-analytics-and-traffic-scorecards
title: 'Agent Cloudflare GraphQL Analytics and Traffic Scorecards'
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
  - id: fact-ai-agent-cloudflare-graphql-analytics-and-traffic-scorecards-1
    statement: >-
      Cloudflare GraphQL Analytics API documentation says the API provides data about HTTP requests passing through Cloudflare's network and product-specific data such as Firewall or Load Balancing data.
    source_title: Cloudflare GraphQL Analytics API
    source_url: https://developers.cloudflare.com/analytics/graphql-api/
    confidence: medium
  - id: fact-ai-agent-cloudflare-graphql-analytics-and-traffic-scorecards-2
    statement: >-
      Cloudflare GraphQL Analytics API documentation says the API has a single endpoint at https://api.cloudflare.com/client/v4/graphql.
    source_title: Cloudflare GraphQL Analytics API
    source_url: https://developers.cloudflare.com/analytics/graphql-api/
    confidence: medium
  - id: fact-ai-agent-cloudflare-graphql-analytics-and-traffic-scorecards-3
    statement: >-
      Cloudflare GraphQL Analytics API documentation says queries specify datasets, metrics, filters, and grouping dimensions.
    source_title: Cloudflare GraphQL Analytics API
    source_url: https://developers.cloudflare.com/analytics/graphql-api/
    confidence: medium
  - id: fact-ai-agent-cloudflare-graphql-analytics-and-traffic-scorecards-4
    statement: >-
      Cloudflare GraphQL Analytics API documentation says GraphQL analytics data should not be used as the measure of usage that Cloudflare uses for billing purposes.
    source_title: Cloudflare GraphQL Analytics API
    source_url: https://developers.cloudflare.com/analytics/graphql-api/
    confidence: medium
completeness: 0.84
known_gaps:
  - Adoption scorecards depend on account and zone permissions, dataset availability, metadata-region boundaries, lookback windows, sampling, bot filtering, cache status, and route-level normalization.
disputed_statements: []
primary_sources:
  - title: Cloudflare GraphQL Analytics API
    type: documentation
    year: 2026
    url: https://developers.cloudflare.com/analytics/graphql-api/
    institution: Cloudflare
  - title: Cloudflare GraphQL Analytics API Get Started
    type: documentation
    year: 2026
    url: https://developers.cloudflare.com/analytics/graphql-api/getting-started/
    institution: Cloudflare
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Cloudflare GraphQL Analytics gives agents a machine-readable way to build traffic, reliability, cache, and adoption scorecards from Cloudflare network data.

## Core Explanation

An agent evaluating a production site should not rely only on local tests. Cloudflare analytics can show whether real traffic reached the site, which routes were requested, whether responses failed, and how edge behavior changed across a release window.

Good scorecards should record account or zone scope, dataset name, query text, metric fields, dimensions, filters, lookback window, timezone, and whether the result is suitable for operational monitoring rather than billing reconciliation.

## Source-Mapped Facts

- Cloudflare GraphQL Analytics API documentation says the API provides data about HTTP requests passing through Cloudflare's network and product-specific data such as Firewall or Load Balancing data. ([source](https://developers.cloudflare.com/analytics/graphql-api/))
- Cloudflare GraphQL Analytics API documentation says the API has a single endpoint at https://api.cloudflare.com/client/v4/graphql. ([source](https://developers.cloudflare.com/analytics/graphql-api/))
- Cloudflare GraphQL Analytics API documentation says queries specify datasets, metrics, filters, and grouping dimensions. ([source](https://developers.cloudflare.com/analytics/graphql-api/))
- Cloudflare GraphQL Analytics API documentation says GraphQL analytics data should not be used as the measure of usage that Cloudflare uses for billing purposes. ([source](https://developers.cloudflare.com/analytics/graphql-api/))

## Further Reading

- [Cloudflare GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/)
- [Cloudflare GraphQL Analytics API Get Started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/)
