---
id: "kb-2026-00165"
title: "Prometheus"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Prometheus is the de facto open-source monitoring and alerting system, graduated from CNCF. It scrapes metrics from instrumented targets via HTTP, stores time-series data locally, and provides a powerful query language (PromQL). Paired with Grafana for visualization and Alertmanager for notifications."
    source_title: "Prometheus Documentation"
    source_url: "https://prometheus.io/docs/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Pull-based model: Prometheus server scrapes targets at intervals (15s default)."
    source_title: "Prometheus Documentation"
    source_url: "https://prometheus.io/docs/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "PromQL: `rate(http_requests_total[5m])`, `histogram_quantile(0.99, ...)`."
    source_title: "Prometheus Documentation"
    source_url: "https://prometheus.io/docs/"
    confidence: "medium"
  - id: "fact-computer-science-004"
    statement: "Service discovery auto-detects targets (Kubernetes, Consul, EC2)."
    source_title: "Prometheus Documentation"
    source_url: "https://prometheus.io/docs/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Prometheus Documentation"
    type: "documentation"
    year: 2026
    url: "https://prometheus.io/docs/"
    institution: "CNCF"

secondary_sources:
  - title: "Site Reliability Engineering (Google)"
    authors: ["Beyer, Betsy", "Jones, Chris", "Petoff, Jennifer", "Murphy, Niall Richard"]
    type: "book"
    year: 2016
    url: "https://sre.google/books/"
    institution: "O'Reilly"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Prometheus is the de facto open-source monitoring and alerting system, graduated from CNCF. It scrapes metrics from instrumented targets via HTTP, stores time-series data locally, and provides a powerful query language (PromQL). Paired with Grafana for visualization and Alertmanager for notifications.

## Core Explanation

Pull-based model: Prometheus server scrapes targets at intervals (15s default). Instrumentation: client libraries expose /metrics endpoint. PromQL: `rate(http_requests_total[5m])`, `histogram_quantile(0.99, ...)`. Service discovery auto-detects targets (Kubernetes, Consul, EC2). Limitations: single-node, not suitable for long-term storage (use Thanos/Cortex for that).

## Further Reading

- [Prometheus Documentation](https://prometheus.io/docs/)
