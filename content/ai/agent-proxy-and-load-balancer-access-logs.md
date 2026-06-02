---
id: agent-proxy-and-load-balancer-access-logs
title: 'Agent Proxy and Load Balancer Access Logs'
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
  - id: fact-ai-agent-proxy-and-load-balancer-access-logs-1
    statement: >-
      AWS Application Load Balancer documentation says access logs capture detailed information
      about requests sent to a load balancer.
    source_title: AWS Application Load Balancer Access Logs
    source_url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html
    confidence: medium
  - id: fact-ai-agent-proxy-and-load-balancer-access-logs-2
    statement: >-
      Envoy documentation describes access logging as a configurable extension point for request
      and connection logging.
    source_title: Envoy Access Logging
    source_url: https://www.envoyproxy.io/docs/envoy/latest/configuration/observability/access_log/usage
    confidence: medium
  - id: fact-ai-agent-proxy-and-load-balancer-access-logs-3
    statement: >-
      Istio documentation includes a task for enabling Envoy access logs for mesh traffic.
    source_title: Istio Envoy Access Logs
    source_url: https://istio.io/latest/docs/tasks/observability/logs/access-log/
    confidence: medium
completeness: 0.83
known_gaps:
  - Access log interpretation depends on log format, proxy hop count, sampling, TLS termination point, tracing headers, and whether upstream services emit matching logs.
disputed_statements: []
primary_sources:
  - title: AWS Application Load Balancer Access Logs
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html
    institution: Amazon Web Services
  - title: Envoy Access Logging
    type: documentation
    year: 2026
    url: https://www.envoyproxy.io/docs/envoy/latest/configuration/observability/access_log/usage
    institution: Envoy
  - title: Istio Envoy Access Logs
    type: documentation
    year: 2026
    url: https://istio.io/latest/docs/tasks/observability/logs/access-log/
    institution: Istio
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Access logs give agents request-level evidence for routing, latency, status codes, upstream selection, retries, and client identity at proxy boundaries.

## Core Explanation

When a user says an API is down, the proxy or load balancer is often the first reliable witness. Access logs can show whether traffic reached the edge, which backend handled it, what status code was returned, and whether latency was in the edge, upstream, or client path.

Agents should correlate access-log request IDs with application logs and traces. A single status code is rarely enough; useful fields include timestamp, host, path, method, status, target status, latency fields, upstream cluster, client IP, user agent, TLS information, and trace headers.

## Source-Mapped Facts

- AWS Application Load Balancer documentation says access logs capture detailed information about requests sent to a load balancer. ([source](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html))
- Envoy documentation describes access logging as a configurable extension point for request and connection logging. ([source](https://www.envoyproxy.io/docs/envoy/latest/configuration/observability/access_log/usage))
- Istio documentation includes a task for enabling Envoy access logs for mesh traffic. ([source](https://istio.io/latest/docs/tasks/observability/logs/access-log/))

## Further Reading

- [AWS Application Load Balancer Access Logs](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html)
- [Envoy Access Logging](https://www.envoyproxy.io/docs/envoy/latest/configuration/observability/access_log/usage)
- [Istio Envoy Access Logs](https://istio.io/latest/docs/tasks/observability/logs/access-log/)
