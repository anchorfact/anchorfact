---
id: agent-kubernetes-custom-resources-and-finalizers
title: 'Agent Kubernetes Custom Resources and Finalizers'
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
  - id: fact-ai-agent-kubernetes-custom-resources-and-finalizers-1
    statement: >-
      Kubernetes documentation says a custom resource is an extension of the
      Kubernetes API that is not necessarily available in a default
      installation.
    source_title: Kubernetes Custom Resources
    source_url: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
    confidence: medium
  - id: fact-ai-agent-kubernetes-custom-resources-and-finalizers-2
    statement: >-
      Kubernetes documentation says users can create and access custom resource
      objects with kubectl after a custom resource is installed.
    source_title: Kubernetes Custom Resources
    source_url: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
    confidence: medium
  - id: fact-ai-agent-kubernetes-custom-resources-and-finalizers-3
    statement: >-
      Kubernetes documentation says finalizers tell Kubernetes to wait until
      specific conditions are met before fully deleting resources marked for
      deletion.
    source_title: Kubernetes Finalizers
    source_url: https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/
    confidence: medium
completeness: 0.82
known_gaps:
  - CRD and finalizer evidence depends on controller implementation, API version conversion, admission policy, status conditions, owner references, garbage collection, stuck deletion timestamps, and whether operators remove finalizers correctly.
disputed_statements: []
primary_sources:
  - title: Kubernetes Custom Resources
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
    institution: Kubernetes
  - title: Kubernetes Finalizers
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kubernetes CRDs and finalizers tell agents whether a resource is native, operator-owned, or blocked by cleanup logic.

## Core Explanation

Custom resources extend the Kubernetes API, so an agent cannot infer behavior from built-in Pods or Deployments alone. It should inspect the CRD, API version, schema, status fields, controller ownership, and conversion behavior before editing a custom resource.

Finalizers are a common reason resources remain in a terminating state. When an agent sees a deletion timestamp and non-empty finalizers, it should identify the responsible controller and cleanup condition instead of force-removing finalizers by default.

## Source-Mapped Facts

- Kubernetes documentation says a custom resource is an extension of the Kubernetes API that is not necessarily available in a default installation. ([source](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/))
- Kubernetes documentation says users can create and access custom resource objects with kubectl after a custom resource is installed. ([source](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/))
- Kubernetes documentation says finalizers tell Kubernetes to wait until specific conditions are met before fully deleting resources marked for deletion. ([source](https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/))

## Further Reading

- [Kubernetes Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
- [Kubernetes Finalizers](https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/)
