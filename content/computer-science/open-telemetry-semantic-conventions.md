---
id: open-telemetry-semantic-conventions
title: 'OpenTelemetry Semantic Conventions'
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
  - id: fact-computer-science-open-telemetry-semantic-conventions-1
    statement: >-
      OpenTelemetry semantic conventions documentation says semantic conventions specify span names, kinds, metric instruments, units, and attribute names.
    source_title: OpenTelemetry Semantic Conventions
    source_url: https://opentelemetry.io/docs/specs/semconv/
    confidence: medium
  - id: fact-computer-science-open-telemetry-semantic-conventions-2
    statement: >-
      OpenTelemetry resource semantic conventions documentation defines attributes for resources that produce telemetry.
    source_title: OpenTelemetry Resource Semantic Conventions
    source_url: https://opentelemetry.io/docs/specs/semconv/resource/
    confidence: medium
  - id: fact-computer-science-open-telemetry-semantic-conventions-3
    statement: >-
      OpenTelemetry trace semantic conventions documentation defines general conventions for traces.
    source_title: OpenTelemetry Trace Semantic Conventions
    source_url: https://opentelemetry.io/docs/specs/semconv/general/trace/
    confidence: medium
completeness: 0.83
known_gaps:
  - Semantic convention stability differs by signal and domain, so instrumentation upgrades can rename or reclassify attributes.
disputed_statements: []
primary_sources:
  - title: OpenTelemetry Semantic Conventions
    type: documentation
    year: 2026
    url: https://opentelemetry.io/docs/specs/semconv/
    institution: OpenTelemetry
  - title: OpenTelemetry Resource Semantic Conventions
    type: documentation
    year: 2026
    url: https://opentelemetry.io/docs/specs/semconv/resource/
    institution: OpenTelemetry
  - title: OpenTelemetry Trace Semantic Conventions
    type: documentation
    year: 2026
    url: https://opentelemetry.io/docs/specs/semconv/general/trace/
    institution: OpenTelemetry
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

OpenTelemetry semantic conventions give agents a shared vocabulary for interpreting traces, metrics, logs, spans, resources, and attributes across services.

## Core Explanation

Observability data is much more useful when services use consistent names and attribute meanings. Semantic conventions help agents query telemetry reliably without learning a different schema for every library or team.

Agents should still check exact instrumentation versions. A query that works for one semantic convention release may miss data after an upgrade or when custom instrumentation uses different attribute names.

## Source-Mapped Facts

- OpenTelemetry semantic conventions documentation says semantic conventions specify span names, kinds, metric instruments, units, and attribute names. ([source](https://opentelemetry.io/docs/specs/semconv/))
- OpenTelemetry resource semantic conventions documentation defines attributes for resources that produce telemetry. ([source](https://opentelemetry.io/docs/specs/semconv/resource/))
- OpenTelemetry trace semantic conventions documentation defines general conventions for traces. ([source](https://opentelemetry.io/docs/specs/semconv/general/trace/))

## Further Reading

- [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/)
- [OpenTelemetry Resource Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/resource/)
- [OpenTelemetry Trace Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/general/trace/)
