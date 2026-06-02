---
id: agent-kubernetes-probes-and-readiness-gates
title: 'Agent Kubernetes Probes and Readiness Gates'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-kubernetes-probes-and-readiness-gates-1
    statement: >-
      Kubernetes documentation says failed startup or liveness probes can make
      Kubernetes treat a container as unhealthy and restart that container.
    source_title: Kubernetes Liveness, Readiness, and Startup Probes
    source_url: https://kubernetes.io/docs/concepts/workloads/pods/probes/
    confidence: medium
  - id: fact-ai-agent-kubernetes-probes-and-readiness-gates-2
    statement: >-
      Kubernetes documentation says a failed readiness probe keeps the
      container running but sets the Pod Ready condition to false.
    source_title: Kubernetes Liveness, Readiness, and Startup Probes
    source_url: https://kubernetes.io/docs/concepts/workloads/pods/probes/
    confidence: medium
  - id: fact-ai-agent-kubernetes-probes-and-readiness-gates-3
    statement: >-
      Kubernetes documentation says readinessGates add custom status conditions
      that the kubelet evaluates when deciding whether a Pod is ready.
    source_title: Kubernetes Pod Conditions
    source_url: https://kubernetes.io/docs/concepts/workloads/pods/pod-condition/
    confidence: medium
completeness: 0.82
known_gaps:
  - Probe diagnosis depends on probe type, handler, timing thresholds, startup behavior, application dependency health, readiness gate controller behavior, service endpoints, rollout strategy, and termination grace periods.
disputed_statements: []
primary_sources:
  - title: Kubernetes Liveness, Readiness, and Startup Probes
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/workloads/pods/probes/
    institution: Kubernetes
  - title: Kubernetes Pod Conditions
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/workloads/pods/pod-condition/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kubernetes probe and readiness gate evidence helps agents distinguish crash recovery, traffic removal, startup delay, and external readiness conditions.

## Core Explanation

Agents often see a failing rollout as a generic Pod health problem. The remediation differs depending on whether a liveness probe restarts the container, a readiness probe removes the Pod from service endpoints, or a readiness gate waits for an external controller condition.

Useful evidence includes the probe type, probe handler, timing thresholds, recent probe failures, Pod conditions, service endpoints, deployment rollout state, and any controller that writes custom readiness conditions. Agents should avoid increasing probe timeouts blindly until they know whether the issue is slow startup, dependency failure, or an incorrect health check.

## Source-Mapped Facts

- Kubernetes documentation says failed startup or liveness probes can make Kubernetes treat a container as unhealthy and restart that container. ([source](https://kubernetes.io/docs/concepts/workloads/pods/probes/))
- Kubernetes documentation says a failed readiness probe keeps the container running but sets the Pod Ready condition to false. ([source](https://kubernetes.io/docs/concepts/workloads/pods/probes/))
- Kubernetes documentation says readinessGates add custom status conditions that the kubelet evaluates when deciding whether a Pod is ready. ([source](https://kubernetes.io/docs/concepts/workloads/pods/pod-condition/))

## Further Reading

- [Kubernetes Liveness, Readiness, and Startup Probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)
- [Kubernetes Pod Conditions](https://kubernetes.io/docs/concepts/workloads/pods/pod-condition/)
