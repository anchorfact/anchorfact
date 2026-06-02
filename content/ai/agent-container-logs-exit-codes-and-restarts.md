---
id: agent-container-logs-exit-codes-and-restarts
title: 'Agent Container Logs, Exit Codes, and Restarts'
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
  - id: fact-ai-agent-container-logs-exit-codes-and-restarts-1
    statement: >-
      Kubernetes documentation describes Pod lifecycle fields that report container state,
      lastState, ready, and restartCount.
    source_title: Kubernetes Pod Lifecycle
    source_url: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
    confidence: medium
  - id: fact-ai-agent-container-logs-exit-codes-and-restarts-2
    statement: >-
      Kubernetes logging documentation describes container logs as application output written to
      standard output and standard error.
    source_title: Kubernetes Logging Architecture
    source_url: https://kubernetes.io/docs/concepts/cluster-administration/logging/
    confidence: medium
  - id: fact-ai-agent-container-logs-exit-codes-and-restarts-3
    statement: >-
      Docker CLI documentation describes docker container logs as fetching logs from a container.
    source_title: Docker Container Logs
    source_url: https://docs.docker.com/reference/cli/docker/container/logs/
    confidence: medium
completeness: 0.84
known_gaps:
  - Container failure analysis also depends on image pull events, OOM kills, probes, node pressure, runtime-specific exit statuses, sidecars, and log retention settings.
disputed_statements: []
primary_sources:
  - title: Kubernetes Pod Lifecycle
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
    institution: Kubernetes
  - title: Kubernetes Logging Architecture
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/cluster-administration/logging/
    institution: Kubernetes
  - title: Docker Container Logs
    type: documentation
    year: 2026
    url: https://docs.docker.com/reference/cli/docker/container/logs/
    institution: Docker
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Container logs, exit codes, and restart counters tell agents whether a service is failing before it accepts traffic, during startup, or after runtime health checks.

## Core Explanation

When an application is unavailable inside Kubernetes or Docker, agents should inspect runtime evidence before editing code. Logs show stdout and stderr, restart counters show repeated failure, and lifecycle state fields show whether a container is waiting, running, or terminated.

Good triage names the container, image, command, exit code, last termination reason, restart count, probe result, and the time window covered by the logs.

## Source-Mapped Facts

- Kubernetes documentation describes Pod lifecycle fields that report container state, lastState, ready, and restartCount. ([source](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/))
- Kubernetes logging documentation describes container logs as application output written to standard output and standard error. ([source](https://kubernetes.io/docs/concepts/cluster-administration/logging/))
- Docker CLI documentation describes docker container logs as fetching logs from a container. ([source](https://docs.docker.com/reference/cli/docker/container/logs/))

## Further Reading

- [Kubernetes Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)
- [Kubernetes Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
- [Docker Container Logs](https://docs.docker.com/reference/cli/docker/container/logs/)
