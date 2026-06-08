---
id: agent-process-diagnostic-reports-and-crash-evidence
title: 'Agent Process Diagnostic Reports and Crash Evidence'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-process-diagnostic-reports-and-crash-evidence-1
    statement: >-
      Node.js report documentation describes a diagnostic report that summarizes
      diagnostic information for a Node.js process.
    source_title: Node.js Diagnostic Report
    source_url: https://nodejs.org/api/report.html
    confidence: medium
  - id: fact-ai-agent-process-diagnostic-reports-and-crash-evidence-2
    statement: >-
      Python faulthandler documentation describes dumping Python tracebacks
      explicitly on a fault, timeout, or user signal.
    source_title: Python faulthandler
    source_url: https://docs.python.org/3/library/faulthandler.html
    confidence: medium
  - id: fact-ai-agent-process-diagnostic-reports-and-crash-evidence-3
    statement: >-
      Kubernetes documentation describes using previous container logs to
      inspect logs from a crashed container instance.
    source_title: Kubernetes Debug Pods
    source_url: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/
    confidence: medium
completeness: 0.84
known_gaps:
  - Crash evidence depends on runtime, signal, exit code, core-dump policy, container restart policy, log retention, symbol availability, and whether the process died before flushing telemetry.
  - Diagnostic reports can contain environment variables, command-line arguments, file paths, loaded modules, and request context, so they require redaction before broad sharing.
disputed_statements: []
primary_sources:
  - title: Node.js Diagnostic Report
    type: documentation
    year: 2026
    url: https://nodejs.org/api/report.html
    institution: Node.js
  - title: Python faulthandler
    type: documentation
    year: 2026
    url: https://docs.python.org/3/library/faulthandler.html
    institution: Python Software Foundation
  - title: Kubernetes Debug Pods
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Crash evidence lets agents distinguish application exceptions, runtime faults, out-of-memory kills, signal exits, container restarts, and missing log retention.

## Core Explanation

An agent investigating a crash should not rely only on the final error message. The useful evidence is the process exit code, signal, runtime diagnostic report, previous container logs, stack trace, loaded modules, memory limits, restart count, and deployment version.

Diagnostic reports and fault handlers preserve context that ordinary logs may miss. They can show runtime version, thread state, stack frames, resource usage, and process arguments. In container platforms, previous logs and restart metadata are often the only evidence after a container has been replaced.

Agents should treat diagnostic artifacts as sensitive operational data. They should summarize the crash signature, redact secrets, and link the exact artifact or log window used for the conclusion.

## Source-Mapped Facts

- Node.js report documentation describes a diagnostic report that summarizes diagnostic information for a Node.js process. ([source](https://nodejs.org/api/report.html))
- Python faulthandler documentation describes dumping Python tracebacks explicitly on a fault, timeout, or user signal. ([source](https://docs.python.org/3/library/faulthandler.html))
- Kubernetes documentation describes using previous container logs to inspect logs from a crashed container instance. ([source](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/))

## Further Reading

- [Node.js Diagnostic Report](https://nodejs.org/api/report.html)
- [Python faulthandler](https://docs.python.org/3/library/faulthandler.html)
- [Kubernetes Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)
