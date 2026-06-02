---
id: agent-kubernetes-resource-requests-limits-and-oomkills
title: 'Agent Kubernetes Resource Requests, Limits, and OOMKills'
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
  - id: fact-ai-agent-kubernetes-resource-requests-limits-and-oomkills-1
    statement: >-
      Kubernetes documentation says containers can specify resource requests and limits for CPU,
      memory, ephemeral storage, and huge pages.
    source_title: Kubernetes Resource Management for Pods and Containers
    source_url: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
    confidence: medium
  - id: fact-ai-agent-kubernetes-resource-requests-limits-and-oomkills-2
    statement: >-
      Kubernetes documentation says the scheduler checks that the sum of scheduled container
      resource requests is less than node capacity.
    source_title: Kubernetes Resource Management for Pods and Containers
    source_url: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
    confidence: medium
  - id: fact-ai-agent-kubernetes-resource-requests-limits-and-oomkills-3
    statement: >-
      Kubernetes documentation on memory assignment shows that a container can be terminated
      when it tries to use more memory than its configured limit.
    source_title: Kubernetes Assign Memory Resources
    source_url: https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/
    confidence: medium
completeness: 0.84
known_gaps:
  - OOM diagnosis depends on container state history, node pressure, cgroup version, eviction thresholds, QoS class, kernel logs, sidecars, and whether memory was killed by the kubelet or the node OOM killer.
disputed_statements: []
primary_sources:
  - title: Kubernetes Resource Management for Pods and Containers
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
    institution: Kubernetes
  - title: Kubernetes Assign Memory Resources
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/
    institution: Kubernetes
  - title: Kubernetes Node-Pressure Eviction
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kubernetes requests, limits, QoS, and OOMKilled events are core evidence when agents debug pods that restart, fail scheduling, or degrade under memory pressure.

## Core Explanation

Requests drive scheduling and capacity placement; limits define enforcement boundaries. A pod can be unschedulable when requests exceed available node capacity, or it can start successfully and later restart because runtime memory exceeds the container limit.

Agents should inspect pod specs, recent events, container last state, restart count, node allocatable resources, QoS class, cgroup memory metrics, and deployment history before deciding whether to increase limits, reduce concurrency, or fix a leak.

## Source-Mapped Facts

- Kubernetes documentation says containers can specify resource requests and limits for CPU, memory, ephemeral storage, and huge pages. ([source](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/))
- Kubernetes documentation says the scheduler checks that the sum of scheduled container resource requests is less than node capacity. ([source](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/))
- Kubernetes documentation on memory assignment shows that a container can be terminated when it tries to use more memory than its configured limit. ([source](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/))

## Further Reading

- [Kubernetes Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Kubernetes Assign Memory Resources](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/)
- [Kubernetes Node-Pressure Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/)
