---
id: kb-2026-00155
title: Monitoring and Observability
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-monitoring-observability-1
    statement: >-
      The Google SRE book identifies latency, traffic, errors, and saturation as the four golden
      signals for monitoring user-facing systems.
    source_title: "SRE Book: Monitoring Distributed Systems"
    source_url: https://sre.google/sre-book/monitoring-distributed-systems/
    confidence: medium
  - id: fact-monitoring-observability-2
    statement: >-
      The Google SRE book frames service level objectives as target values or ranges for service
      levels measured by service level indicators.
    source_title: "SRE Book: Service Level Objectives"
    source_url: https://sre.google/sre-book/service-level-objectives/
    confidence: medium
  - id: fact-monitoring-observability-3
    statement: OpenTelemetry groups telemetry into signals such as traces, metrics, logs, and events.
    source_title: OpenTelemetry Signals
    source_url: https://opentelemetry.io/docs/concepts/signals/
    confidence: medium
completeness: 0.86
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: "SRE Book: Monitoring Distributed Systems"
    type: book
    year: 2016
    url: https://sre.google/sre-book/monitoring-distributed-systems/
    institution: Google
  - title: "SRE Book: Service Level Objectives"
    type: book
    year: 2016
    url: https://sre.google/sre-book/service-level-objectives/
    institution: Google
  - title: OpenTelemetry Signals
    type: documentation
    year: 2026
    url: https://opentelemetry.io/docs/concepts/signals/
    institution: OpenTelemetry
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Monitoring and observability combine reliability targets, golden-signal monitoring, and telemetry signals such as traces, metrics, logs, and events.

## Core Explanation

The repaired entry replaces unsupported future observability surveys with Google SRE material and OpenTelemetry documentation. The claims now map directly to monitoring signals, service level objectives, and telemetry signal categories.

## Further Reading

- [SRE Book: Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [SRE Book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [OpenTelemetry Signals](https://opentelemetry.io/docs/concepts/signals/)
