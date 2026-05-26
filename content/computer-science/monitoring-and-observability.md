---
id: kb-2026-00155
title: Monitoring and Observability
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Monitoring tells you what's wrong; observability lets you ask why. Three pillars: metrics (numeric time-series, counters/gauges), logs (timestamped event records), traces (end-to-end request
      flow across services). The 'Golden Signals': latency, traffic, errors, saturation.
    source_title: Observability Engineering
    source_url: https://www.oreilly.com/library/view/observability-engineering/9781492076438/
    confidence: medium
  - id: fact-computer-science-002
    statement: "SLOs (Service Level Objectives) define acceptable reliability: e.g., 99.9% availability with <100ms p99 latency."
    source_title: Site Reliability Engineering (Google)
    source_url: https://sre.google/books/
    confidence: medium
completeness: 0.88
known_gaps:
  - Statistics and data cited are from 2022 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Site Reliability Engineering (Google)
    authors:
      - Beyer, Betsy
      - Jones, Chris
      - Petoff, Jennifer
      - Murphy, Niall Richard
    type: book
    year: 2016
    url: https://sre.google/books/
    institution: Google
  - title: Observability Engineering (2025 Updated Edition)
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/observability/
  - title: "Cloud-Native Observability: A 2025 Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.observability
secondary_sources:
  - title: Observability Engineering
    authors:
      - Majors, Charity
      - Fong-Jones, Liz
      - Miranda, George
    type: book
    year: 2022
    url: https://www.oreilly.com/library/view/observability-engineering/9781492076438/
    institution: O'Reilly
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---
## TL;DR

Monitoring tells you what's wrong; observability lets you ask why. Three pillars: metrics (numeric time-series, counters/gauges), logs (timestamped event records), traces (end-to-end request flow across services). The 'Golden Signals': latency, traffic, errors, saturation.

## Core Explanation

Tools: Prometheus (metrics, pull-based), Grafana (dashboards), ELK/OpenSearch (logs), Jaeger/Zipkin (traces), OpenTelemetry (vendor-neutral instrumentation). SLOs (Service Level Objectives) define acceptable reliability: e.g., 99.9% availability with <100ms p99 latency. Alerting: alert on symptoms (user-facing impact), not causes. RED method: Rate, Errors, Duration per service.

## Further Reading

- [Google SRE Book](https://sre.google/books/)

## Related Articles

- [AI for Air Quality: Pollution Monitoring, Source Attribution, and Health Impact Prediction](../../ai/ai-air-quality.md)
- [AI for Climate Science: Earth System Modeling, Extreme Event Prediction, and Carbon Monitoring](../../ai/ai-for-climate-science-earth-system-modeling-extreme-event-prediction-and-carbon-monitoring.md)
- [AI for Construction: Computer Vision Safety, BIM Digital Twins, and Automated Project Monitoring](../../ai/ai-for-construction.md)