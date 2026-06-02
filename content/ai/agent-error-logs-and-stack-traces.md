---
id: agent-error-logs-and-stack-traces
title: 'Agent Error Logs and Stack Traces'
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
  - id: fact-ai-agent-error-logs-and-stack-traces-1
    statement: >-
      OpenTelemetry's logs data model defines fields such as Timestamp, ObservedTimestamp, TraceId,
      SpanId, SeverityText, SeverityNumber, Body, Resource, InstrumentationScope, and Attributes.
    source_title: OpenTelemetry Logs Data Model
    source_url: https://opentelemetry.io/docs/specs/otel/logs/data-model/
    confidence: medium
  - id: fact-ai-agent-error-logs-and-stack-traces-2
    statement: >-
      Sentry issue details documentation says the main issue area displays information about a
      specific event, including stack trace, breadcrumbs, tags, and more.
    source_title: Sentry Issue Details
    source_url: https://docs.sentry.io/product/issues/issue-details/
    confidence: medium
  - id: fact-ai-agent-error-logs-and-stack-traces-3
    statement: >-
      MDN says the non-standard Error stack property offers a trace of which functions were called,
      in what order, from which line and file, and with what arguments.
    source_title: Error.prototype.stack
    source_url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
    confidence: medium
completeness: 0.83
known_gaps:
  - Log retention, redaction, sampling, and tenant access controls must be verified for the deployed observability system.
disputed_statements: []
primary_sources:
  - title: OpenTelemetry Logs Data Model
    type: specification
    year: 2026
    url: https://opentelemetry.io/docs/specs/otel/logs/data-model/
    institution: OpenTelemetry
  - title: Sentry Issue Details
    type: documentation
    year: 2026
    url: https://docs.sentry.io/product/issues/issue-details/
    institution: Sentry
  - title: Error.prototype.stack
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
    institution: MDN Web Docs
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Logs and stack traces are high-frequency agent evidence because they connect observed failures to timestamps, traces, severity, files, functions, and runtime context.

## Core Explanation

An engineering agent should read logs as structured evidence, not just free text. Log records can contain timestamps, severity, trace identifiers, resources, attributes, and bodies. Stack traces then add a code-location view of the failure path.

The practical workflow is to collect the relevant event, preserve trace and span context, inspect the stack frame closest to the application boundary, and connect the failure to source code, configuration, and recent changes. Agents should also avoid leaking secrets or personal data from logs into prompts.

## Source-Mapped Facts

- OpenTelemetry's logs data model defines fields such as Timestamp, ObservedTimestamp, TraceId, SpanId, SeverityText, SeverityNumber, Body, Resource, InstrumentationScope, and Attributes. ([source](https://opentelemetry.io/docs/specs/otel/logs/data-model/))
- Sentry issue details documentation says the main issue area displays information about a specific event, including stack trace, breadcrumbs, tags, and more. ([source](https://docs.sentry.io/product/issues/issue-details/))
- MDN says the non-standard Error stack property offers a trace of which functions were called, in what order, from which line and file, and with what arguments. ([source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack))

## Further Reading

- [OpenTelemetry Logs Data Model](https://opentelemetry.io/docs/specs/otel/logs/data-model/)
- [Sentry Issue Details](https://docs.sentry.io/product/issues/issue-details/)
- [Error.prototype.stack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack)
