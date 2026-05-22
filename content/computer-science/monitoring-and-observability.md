---
id:"kb-2026-00155"
title:"Monitoring and Observability"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Google SRE Book"
    type:"book"
    year:2016
    url:"https://sre.google/books/"
    institution:"Google"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Monitoring tells you what's wrong; observability lets you ask why. Three pillars: metrics (numeric time-series, counters/gauges), logs (timestamped event records), traces (end-to-end request flow across services). The 'Golden Signals': latency, traffic, errors, saturation.

## Core Explanation

Tools: Prometheus (metrics, pull-based), Grafana (dashboards), ELK/OpenSearch (logs), Jaeger/Zipkin (traces), OpenTelemetry (vendor-neutral instrumentation). SLOs (Service Level Objectives) define acceptable reliability: e.g., 99.9% availability with <100ms p99 latency. Alerting: alert on symptoms (user-facing impact), not causes. RED method: Rate, Errors, Duration per service.

## Further Reading

- [Google SRE Book](https://sre.google/books/)
