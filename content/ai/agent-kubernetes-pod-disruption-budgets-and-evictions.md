---
id: agent-kubernetes-pod-disruption-budgets-and-evictions
title: 'Agent Kubernetes PodDisruptionBudgets and Evictions'
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
  - id: fact-ai-agent-kubernetes-pod-disruption-budgets-and-evictions-1
    statement: >-
      Kubernetes documentation distinguishes voluntary disruptions from
      involuntary disruptions when explaining pod availability.
    source_title: Kubernetes Disruptions
    source_url: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
    confidence: medium
  - id: fact-ai-agent-kubernetes-pod-disruption-budgets-and-evictions-2
    statement: >-
      Kubernetes documentation says a PodDisruptionBudget can limit how many
      Pods of a replicated application are down simultaneously from voluntary
      disruptions.
    source_title: Kubernetes Disruptions
    source_url: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
    confidence: medium
  - id: fact-ai-agent-kubernetes-pod-disruption-budgets-and-evictions-3
    statement: >-
      Kubernetes documentation says PodDisruptionBudgets use minAvailable or
      maxUnavailable to describe availability requirements.
    source_title: Kubernetes Configure a PodDisruptionBudget
    source_url: https://kubernetes.io/docs/tasks/run-application/configure-pdb/
    confidence: medium
completeness: 0.82
known_gaps:
  - PDB diagnosis depends on controller ownership, selectors, desired replicas, unhealthyPodEvictionPolicy, drain commands, eviction API responses, node maintenance windows, and whether disruptions are voluntary or node-pressure driven.
disputed_statements: []
primary_sources:
  - title: Kubernetes Disruptions
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/workloads/pods/disruptions/
    institution: Kubernetes
  - title: Kubernetes Configure a PodDisruptionBudget
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/tasks/run-application/configure-pdb/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

PodDisruptionBudgets tell agents whether planned Kubernetes maintenance is allowed to evict pods without violating application availability rules.

## Core Explanation

Agents troubleshooting a stalled drain or a failed rollout need to distinguish application bugs from disruption policy. A healthy deployment can still block voluntary evictions when its PodDisruptionBudget says too few replicas would remain available.

The evidence set should include the PDB spec, selector match, current allowed disruptions, owning controller, desired replica count, pod readiness, eviction responses, and drain command output. Without that context, scaling or deleting pods can reduce availability or fight cluster policy.

## Source-Mapped Facts

- Kubernetes documentation distinguishes voluntary disruptions from involuntary disruptions when explaining pod availability. ([source](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/))
- Kubernetes documentation says a PodDisruptionBudget can limit how many Pods of a replicated application are down simultaneously from voluntary disruptions. ([source](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/))
- Kubernetes documentation says PodDisruptionBudgets use minAvailable or maxUnavailable to describe availability requirements. ([source](https://kubernetes.io/docs/tasks/run-application/configure-pdb/))

## Further Reading

- [Kubernetes Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)
- [Kubernetes Configure a PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
