---
id:"kb-2026-00165"
title:"Prometheus"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Prometheus Documentation"
    type: "documentation"
    year: 2026
    url: "https://prometheus.io/docs/"
    institution: "CNCF"
    note: "CNCF-graduated monitoring: PromQL, Alertmanager, time-series TSDB, pull model, exporters"
secondary_sources:
  - title: "Site Reliability Engineering (Google)"
    authors: ["Beyer, Betsy", "Jones, Chris", "Petoff, Jennifer", "Murphy, Niall Richard"]
    type: "book"
    year: 2016
    url: "https://sre.google/books/"
    institution: "O'Reilly"
    note: "Prometheus was inspired by Google's Borgmon — the SRE book covers the monitoring philosophy behind it"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Prometheus is the de facto open-source monitoring and alerting system, graduated from CNCF. It scrapes metrics from instrumented targets via HTTP, stores time-series data locally, and provides a powerful query language (PromQL). Paired with Grafana for visualization and Alertmanager for notifications.

## Core Explanation

Pull-based model: Prometheus server scrapes targets at intervals (15s default). Instrumentation: client libraries expose /metrics endpoint. PromQL: `rate(http_requests_total[5m])`, `histogram_quantile(0.99, ...)`. Service discovery auto-detects targets (Kubernetes, Consul, EC2). Limitations: single-node, not suitable for long-term storage (use Thanos/Cortex for that).

## Further Reading

- [Prometheus Documentation](https://prometheus.io/docs/)
