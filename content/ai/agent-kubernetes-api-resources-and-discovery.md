---
id: agent-kubernetes-api-resources-and-discovery
title: 'Agent Kubernetes API Resources and Discovery'
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
  - id: fact-ai-agent-kubernetes-api-resources-and-discovery-1
    statement: >-
      Kubernetes API concepts documentation describes resource types as
      available API resources such as pods, deployments, and services.
    source_title: Kubernetes API Concepts
    source_url: https://kubernetes.io/docs/reference/using-api/api-concepts/
    confidence: medium
  - id: fact-ai-agent-kubernetes-api-resources-and-discovery-2
    statement: >-
      Kubernetes API concepts documentation says most Kubernetes API resource
      types are objects with a name, UID, namespace, and resource version.
    source_title: Kubernetes API Concepts
    source_url: https://kubernetes.io/docs/reference/using-api/api-concepts/
    confidence: medium
  - id: fact-ai-agent-kubernetes-api-resources-and-discovery-3
    statement: >-
      Kubernetes kubectl documentation describes kubectl api-resources as
      printing the supported API resources on the server.
    source_title: kubectl api-resources
    source_url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/
    confidence: medium
completeness: 0.82
known_gaps:
  - Kubernetes discovery evidence depends on cluster version, aggregated APIs, custom resources, admission webhooks, user authorization, namespace scope, API deprecations, discovery cache freshness, and whether kubectl or direct API calls were used.
disputed_statements: []
primary_sources:
  - title: Kubernetes API Concepts
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/reference/using-api/api-concepts/
    institution: Kubernetes
  - title: kubectl api-resources
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kubernetes API discovery tells agents which resource types, namespaced scopes, verbs, and API groups actually exist in a cluster.

## Core Explanation

Agents often fail Kubernetes tasks by assuming a resource kind, API group, or version from memory. Discovery data and API-resource listings show what the current API server supports, including custom resources and aggregated APIs.

Agents should capture the API group, version, resource name, short names, namespaced scope, supported verbs, object resourceVersion, and the requesting identity before editing manifests or claiming a resource is missing.

## Source-Mapped Facts

- Kubernetes API concepts documentation describes resource types as available API resources such as pods, deployments, and services. ([source](https://kubernetes.io/docs/reference/using-api/api-concepts/))
- Kubernetes API concepts documentation says most Kubernetes API resource types are objects with a name, UID, namespace, and resource version. ([source](https://kubernetes.io/docs/reference/using-api/api-concepts/))
- Kubernetes kubectl documentation describes kubectl api-resources as printing the supported API resources on the server. ([source](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/))

## Further Reading

- [Kubernetes API Concepts](https://kubernetes.io/docs/reference/using-api/api-concepts/)
- [kubectl api-resources](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_api-resources/)
