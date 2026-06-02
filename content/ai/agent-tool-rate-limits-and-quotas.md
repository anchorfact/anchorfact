---
id: agent-tool-rate-limits-and-quotas
title: 'Agent Tool Rate Limits and Quotas'
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
  - id: fact-agent-tool-rate-limits-and-quotas-1
    statement: >-
      GitHub REST API documentation says GitHub limits the number of REST API requests a client can make within a specific amount of time.
    source_title: Rate Limits for the REST API - GitHub Docs
    source_url: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    confidence: medium
  - id: fact-agent-tool-rate-limits-and-quotas-2
    statement: >-
      Stripe documentation says a concurrency limiter restricts the number of concurrent active requests.
    source_title: Rate Limits - Stripe Documentation
    source_url: https://docs.stripe.com/rate-limits
    confidence: medium
  - id: fact-agent-tool-rate-limits-and-quotas-3
    statement: >-
      Google Cloud documentation says quotas help ensure fairness and reduce spikes in resource use and availability.
    source_title: Cloud Quotas Overview - Google Cloud
    source_url: https://cloud.google.com/docs/quotas/overview
    confidence: medium
completeness: 0.83
known_gaps:
  - Providers differ in headers, reset windows, secondary limits, retry-after behavior, and whether quota increases are available.
disputed_statements: []
primary_sources:
  - title: Rate Limits for the REST API - GitHub Docs
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    institution: GitHub
  - title: Rate Limits - Stripe Documentation
    type: documentation
    year: 2026
    url: https://docs.stripe.com/rate-limits
    institution: Stripe
  - title: Cloud Quotas Overview - Google Cloud
    type: documentation
    year: 2026
    url: https://cloud.google.com/docs/quotas/overview
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent tool rate limits and quotas define how many external operations an agent can perform before an API throttles, delays, rejects, or requires backoff.

## Core Explanation

Tool-using agents can issue many calls quickly: search, list, fetch, patch, rerun, or retry. Without quota awareness, an agent can exhaust a user token, trigger secondary abuse limits, or create noisy failures that look like task failures.

Production agents should track per-provider budgets, expose remaining quota in traces, prefer batching where supported, and treat retry-after or reset metadata as hard scheduling constraints rather than model suggestions.

## Source-Mapped Facts

- GitHub REST API documentation says GitHub limits the number of REST API requests a client can make within a specific amount of time. ([source](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api))
- Stripe documentation says a concurrency limiter restricts the number of concurrent active requests. ([source](https://docs.stripe.com/rate-limits))
- Google Cloud documentation says quotas help ensure fairness and reduce spikes in resource use and availability. ([source](https://cloud.google.com/docs/quotas/overview))

## Further Reading

- [GitHub REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Stripe rate limits](https://docs.stripe.com/rate-limits)
- [Google Cloud quotas](https://cloud.google.com/docs/quotas/overview)
