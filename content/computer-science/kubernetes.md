---
id: kb-2026-00014
title: Kubernetes (K8s)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-kubernetes-001
    statement: >-
      Kubernetes is an open source system for running distributed systems resiliently, including scaling, failover,
      deployment patterns, and related operations.
    source_title: Overview | Kubernetes
    source_url: https://kubernetes.io/docs/concepts/overview/
    confidence: medium
  - id: fact-computer-science-kubernetes-002
    statement: The Kubernetes documentation describes a cluster as consisting of a control plane and one or more worker nodes.
    source_title: Kubernetes Components | Kubernetes
    source_url: https://kubernetes.io/docs/concepts/overview/components/
    confidence: medium
  - id: fact-computer-science-kubernetes-003
    statement: >-
      The ACM Queue article Borg, Omega, and Kubernetes describes Kubernetes as the third container-management system
      developed at Google and notes that it is open source.
    source_title: Borg, Omega, and Kubernetes
    source_url: https://queue.acm.org/detail.cfm?id=2898444
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: Overview | Kubernetes
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/overview/
    institution: Kubernetes
  - title: Kubernetes Components | Kubernetes
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/overview/components/
    institution: Kubernetes
  - title: Borg, Omega, and Kubernetes
    authors:
      - Burns, Brendan
      - Grant, Brian
      - Oppenheimer, David
      - Brewer, Eric
      - Wilkes, John
    type: article
    year: 2016
    url: https://queue.acm.org/detail.cfm?id=2898444
    doi: 10.1145/2898442.2898444
    institution: ACM Queue
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Kubernetes is an open source platform for operating containerized and distributed systems. This repair removes broad adoption claims and keeps the article grounded in Kubernetes documentation and the ACM Queue history of Borg, Omega, and Kubernetes.

## Core Explanation

The core model is a cluster with a control plane and worker nodes. Kubernetes manages desired state through API objects and controllers, while its design history draws from Google's earlier Borg and Omega systems.

## Further Reading

- [Overview | Kubernetes](https://kubernetes.io/docs/concepts/overview/)
- [Kubernetes Components | Kubernetes](https://kubernetes.io/docs/concepts/overview/components/)
- [Borg, Omega, and Kubernetes](https://queue.acm.org/detail.cfm?id=2898444)
