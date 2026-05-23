---
id:"kb-2026-00162"
title:"Kubernetes Pod & Service"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Kubernetes Documentation"
    type: "documentation"
    year: 2026
    url: "https://kubernetes.io/docs/"
    institution: "CNCF"
    note: "Core K8s: Pods (smallest deployable unit), Services (stable networking), labels/selectors"
secondary_sources:
  - title: "Kubernetes in Action (2nd Edition)"
    authors: ["Luksa, Marko"]
    type: "book"
    year: 2023
    url: "https://www.manning.com/books/kubernetes-in-action-second-edition"
    institution: "Manning"
    note: "Comprehensive guide: Pod lifecycle, Service types (ClusterIP, NodePort, LoadBalancer), ingress"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A Pod is the smallest deployable unit in Kubernetes — one or more containers sharing network namespace, IPC, and storage volumes. A Service provides stable networking — a virtual IP (ClusterIP) and DNS name that load-balances across Pod replicas, surviving Pod restarts.

## Core Explanation

Pod lifecycle: Pending → Running → Succeeded/Failed. Init containers run before app containers. Sidecar pattern: helper container alongside main (logging, proxying). Service types: ClusterIP (internal only), NodePort (exposes on node IP), LoadBalancer (cloud provider LB). Ingress routes external HTTP traffic to Services.

## Further Reading

- [Kubernetes Documentation](https://kubernetes.io/docs/)
