---
id: kb-2026-00165
title: Prometheus
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Prometheus Documentation
    type: documentation
    year: 2026
    url: https://prometheus.io/docs/
    institution: CNCF
    note: "CNCF-graduated monitoring: PromQL, Alertmanager, time-series TSDB, pull model, exporters"
secondary_sources:
  - title: Site Reliability Engineering (Google)
    authors:
      - Beyer, Betsy
      - Jones, Chris
      - Petoff, Jennifer
      - Murphy, Niall Richard
    type: book
    year: 2016
    url: https://sre.google/books/
    institution: O'Reilly
    note: Prometheus was inspired by Google's Borgmon — the SRE book covers the monitoring philosophy behind it
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
ai_citations: null
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Prometheus is the de facto open-source monitoring and alerting system, graduated from CNCF. It scrapes metrics from instrumented targets via HTTP, stores time-series data locally, and provides a
      powerful query language (PromQL). Paired with Grafana for visualization and Alertmanager for notifications.
    confidence: medium
    source_title: Prometheus Documentation
    source_url: https://prometheus.io/docs/
  - id: fact-computer-science-002
    statement: "Pull-based model: Prometheus server scrapes targets at intervals (15s default)."
    confidence: medium
    source_title: Prometheus Documentation
    source_url: https://prometheus.io/docs/
  - id: fact-computer-science-003
    statement: "PromQL: `rate(http_requests_total[5m])`, `histogram_quantile(0.99, ...)`."
    confidence: medium
    source_title: Prometheus Documentation
    source_url: https://prometheus.io/docs/
  - id: fact-computer-science-004
    statement: Service discovery auto-detects targets (Kubernetes, Consul, EC2).
    confidence: medium
    source_title: Prometheus Documentation
    source_url: https://prometheus.io/docs/
---


## TL;DR

Prometheus is the de facto open-source monitoring and alerting system, graduated from CNCF. It scrapes metrics from instrumented targets via HTTP, stores time-series data locally, and provides a powerful query language (PromQL). Paired with Grafana for visualization and Alertmanager for notifications.

## Core Explanation

Pull-based model: Prometheus server scrapes targets at intervals (15s default). Instrumentation: client libraries expose /metrics endpoint. PromQL: `rate(http_requests_total[5m])`, `histogram_quantile(0.99, ...)`. Service discovery auto-detects targets (Kubernetes, Consul, EC2). Limitations: single-node, not suitable for long-term storage (use Thanos/Cortex for that).

## Further Reading

- [Prometheus Documentation](https://prometheus.io/docs/)
