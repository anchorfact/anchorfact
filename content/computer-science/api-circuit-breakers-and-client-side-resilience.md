---
id: api-circuit-breakers-and-client-side-resilience
title: 'API Circuit Breakers and Client-Side Resilience'
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
  - id: fact-cs-api-circuit-breakers-and-client-side-resilience-1
    statement: >-
      Microsoft Azure Architecture documentation describes the Circuit Breaker pattern as
      preventing repeated attempts to execute operations likely to fail.
    source_title: Azure Circuit Breaker Pattern
    source_url: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
    confidence: medium
  - id: fact-cs-api-circuit-breakers-and-client-side-resilience-2
    statement: >-
      Envoy documentation describes circuit breaking as a distributed-system pattern for
      limiting resources used by upstream clusters.
    source_title: Envoy Circuit Breaking
    source_url: https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking
    confidence: medium
  - id: fact-cs-api-circuit-breakers-and-client-side-resilience-3
    statement: >-
      Polly documentation describes a circuit breaker strategy that opens, closes, and half-opens
      based on handled failures.
    source_title: Polly Circuit Breaker Strategy
    source_url: https://www.pollydocs.org/strategies/circuit-breaker.html
    confidence: medium
completeness: 0.83
known_gaps:
  - Resilience tuning depends on retry budgets, timeout budgets, bulkheads, rate limits, idempotency, fallback behavior, and SLO impact.
disputed_statements: []
primary_sources:
  - title: Azure Circuit Breaker Pattern
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
    institution: Microsoft Azure
  - title: Envoy Circuit Breaking
    type: documentation
    year: 2026
    url: https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking
    institution: Envoy
  - title: Polly Circuit Breaker Strategy
    type: documentation
    year: 2026
    url: https://www.pollydocs.org/strategies/circuit-breaker.html
    institution: Polly
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Circuit breakers protect APIs and clients from cascading failure by stopping repeated calls when a dependency is unhealthy.

## Core Explanation

Agents that call APIs need resilience policy evidence: timeout, retry count, retry backoff, circuit state, failure threshold, half-open probe rules, and fallback behavior. Retrying everything can amplify an outage if the dependency is already failing.

Circuit breakers should be interpreted with SLO context. An open breaker may be a protective success, not a failure, if it prevents a slow downstream service from consuming all client resources.

## Source-Mapped Facts

- Microsoft Azure Architecture documentation describes the Circuit Breaker pattern as preventing repeated attempts to execute operations likely to fail. ([source](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker))
- Envoy documentation describes circuit breaking as a distributed-system pattern for limiting resources used by upstream clusters. ([source](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking))
- Polly documentation describes a circuit breaker strategy that opens, closes, and half-opens based on handled failures. ([source](https://www.pollydocs.org/strategies/circuit-breaker.html))

## Further Reading

- [Azure Circuit Breaker Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
- [Envoy Circuit Breaking](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking)
- [Polly Circuit Breaker Strategy](https://www.pollydocs.org/strategies/circuit-breaker.html)
