---
id: "kb-2026-00014"
title: "Kubernetes (K8s)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on Kubernetes documentation and Google's Borg paper"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Kubernetes Documentation"
    type: "documentation"
    year: 2026
    url: "https://kubernetes.io/docs/"
    institution: "CNCF"
  - title: "Borg, Omega, and Kubernetes"
    authors: ["Burns, Brendan", "Grant, Brian", "Oppenheimer, David", "Brewer, Eric", "Wilkes, John"]
    type: "academic_paper"
    year: 2016
    doi: "10.1145/2898442.2898444"
    url: "https://queue.acm.org/detail.cfm?id=2898444"
completeness: 0.85
related_entities:
  - "entity:docker"
  - "entity:cloud-computing"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Kubernetes (K8s) is an open-source container orchestration platform originally designed by Google, based on their internal Borg system. Donated to the CNCF in 2015, it automates deployment, scaling, and management of containerized applications across clusters of machines. As of 2026, Kubernetes is the de facto standard for cloud-native infrastructure, used by over 60% of organizations running containers in production according to the CNCF Annual Survey.

## Core Concepts

- **Pod**: Smallest deployable unit — one or more containers sharing network/storage
- **Service**: Stable network endpoint for a set of pods
- **Deployment**: Declarative pod management with rolling updates and rollbacks
- **ConfigMap/Secret**: Configuration and sensitive data management
- **Ingress**: HTTP routing to services

## Architectural Components

**Control Plane**: API server, etcd (state store), scheduler, controller manager
**Worker Nodes**: kubelet (node agent), kube-proxy (networking), container runtime

## Further Reading

- [Kubernetes Docs](https://kubernetes.io/docs/): Official documentation
- [Borg Paper](https://queue.acm.org/detail.cfm?id=2898444): The system that inspired K8s
