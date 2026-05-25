---
id: "kb-2026-00014"
title: "Kubernetes (K8s)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Kubernetes is an open-source container orchestration platform originally designed by Google, based on their internal Borg system"
    source_title: "Borg, Omega, and Kubernetes"
    source_url: "https://queue.acm.org/detail.cfm?id=2898444"
    source_doi: "10.1145/2898442.2898444"
    confidence: "high"
  - id: "fact-computer-science-02"
    statement: "Donated to the CNCF in 2015, it automates deployment, scaling, and management of containerized applications across clusters of machines"
    source_title: "Kubernetes Documentation"
    source_url: "https://kubernetes.io/docs/"
    confidence: "medium"

completeness: 0.85

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
    url: "https://queue.acm.org/detail.cfm?id=2898444"
    doi: "10.1145/2898442.2898444"
    institution: "ACM"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"

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
