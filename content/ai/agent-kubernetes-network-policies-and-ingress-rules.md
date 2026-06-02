---
id: agent-kubernetes-network-policies-and-ingress-rules
title: 'Agent Kubernetes Network Policies and Ingress Rules'
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
  - id: fact-ai-agent-kubernetes-network-policies-and-ingress-rules-1
    statement: >-
      Kubernetes documentation describes NetworkPolicy as a specification for how groups of
      Pods are allowed to communicate with each other and other network endpoints.
    source_title: Kubernetes Network Policies
    source_url: https://kubernetes.io/docs/concepts/services-networking/network-policies/
    confidence: medium
  - id: fact-ai-agent-kubernetes-network-policies-and-ingress-rules-2
    statement: >-
      Kubernetes documentation describes Ingress as exposing HTTP and HTTPS routes from outside
      the cluster to services within the cluster.
    source_title: Kubernetes Ingress
    source_url: https://kubernetes.io/docs/concepts/services-networking/ingress/
    confidence: medium
  - id: fact-ai-agent-kubernetes-network-policies-and-ingress-rules-3
    statement: >-
      Kubernetes documentation describes Gateway API as a collection of resources that model
      service networking in Kubernetes.
    source_title: Kubernetes Gateway API
    source_url: https://kubernetes.io/docs/concepts/services-networking/gateway/
    confidence: medium
completeness: 0.83
known_gaps:
  - Effective traffic behavior also depends on CNI support, service mesh policy, DNS, load balancer configuration, namespace labels, and cloud firewall rules.
disputed_statements: []
primary_sources:
  - title: Kubernetes Network Policies
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/services-networking/network-policies/
    institution: Kubernetes
  - title: Kubernetes Ingress
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/services-networking/ingress/
    institution: Kubernetes
  - title: Kubernetes Gateway API
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/services-networking/gateway/
    institution: Kubernetes
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

NetworkPolicy, Ingress, and Gateway evidence lets agents debug whether traffic is blocked, routed, exposed, or sent to the wrong service.

## Core Explanation

Kubernetes connectivity failures need both routing and policy context. An agent should inspect selected Pods, namespace labels, NetworkPolicies, Services, Ingress or Gateway resources, controller status, and events before deciding whether an app or platform layer is at fault.

Ingress and Gateway rules describe how external traffic reaches services. NetworkPolicies describe allowed Pod communication when the CNI enforces them. These layers can disagree, so agents should correlate all of them.

## Source-Mapped Facts

- Kubernetes documentation describes NetworkPolicy as a specification for how groups of Pods are allowed to communicate with each other and other network endpoints. ([source](https://kubernetes.io/docs/concepts/services-networking/network-policies/))
- Kubernetes documentation describes Ingress as exposing HTTP and HTTPS routes from outside the cluster to services within the cluster. ([source](https://kubernetes.io/docs/concepts/services-networking/ingress/))
- Kubernetes documentation describes Gateway API as a collection of resources that model service networking in Kubernetes. ([source](https://kubernetes.io/docs/concepts/services-networking/gateway/))

## Further Reading

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Kubernetes Gateway API](https://kubernetes.io/docs/concepts/services-networking/gateway/)
