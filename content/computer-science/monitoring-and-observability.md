---
id: "kb-2026-00155"



title: "Monitoring and Observability"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Site Reliability Engineering (Google)"
    authors: ["Beyer, Betsy", "Jones, Chris", "Petoff, Jennifer", "Murphy, Niall Richard"]
    type: "book"



    year: 2016
    url: "https://sre.google/books/"


    institution: "Google"
    note: "Four golden signals: latency, traffic, errors, saturation"



secondary_sources:
  - title: "Observability Engineering"
    authors: ["Majors, Charity", "Fong-Jones, Liz", "Miranda, George"]
    type: "book"



    year: 2022
    url: "https://www.oreilly.com/library/view/observability-engineering/9781492076438/"


    institution: "O'Reilly"
    note: "Metrics, logs, traces — structured events, OpenTelemetry, high-cardinality dimensions"



completeness: 0.88
known_gaps:
  - "Statistics and data cited are from 2022 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

Monitoring tells you what's wrong; observability lets you ask why. Three pillars: metrics (numeric time-series, counters/gauges), logs (timestamped event records), traces (end-to-end request flow across services). The 'Golden Signals': latency, traffic, errors, saturation.

## Core Explanation

Tools: Prometheus (metrics, pull-based), Grafana (dashboards), ELK/OpenSearch (logs), Jaeger/Zipkin (traces), OpenTelemetry (vendor-neutral instrumentation). SLOs (Service Level Objectives) define acceptable reliability: e.g., 99.9% availability with <100ms p99 latency. Alerting: alert on symptoms (user-facing impact), not causes. RED method: Rate, Errors, Duration per service.

## Further Reading

- [Google SRE Book](https://sre.google/books/)
