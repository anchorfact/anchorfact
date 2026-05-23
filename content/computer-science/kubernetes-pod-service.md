---
id: "kb-2026-00162"
title: "Kubernetes Pod & Service"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "A Pod is the smallest deployable unit in Kubernetes — one or more containers sharing network namespace, IPC, and storage volumes"
    source_title: "Kubernetes Documentation"
    source_url: "https://kubernetes.io/docs/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "A Pod is the smallest deployable unit in Kubernetes — one or more containers sharing network namespace, IPC, and storage volumes. A Service provides stable networking — a virtual IP (ClusterIP) and DNS name that load-balances across Pod replicas, surviving Pod restarts."
    source_title: "Kubernetes Documentation"
    source_url: "https://kubernetes.io/docs/"
    confidence: "medium"

completeness: 0.88

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

secondary_sources:
  - title: "Kubernetes in Action (2nd Edition)"
    authors: ["Luksa, Marko"]
    type: "book"
    year: 2023
    url: "https://www.manning.com/books/kubernetes-in-action-second-edition"
    institution: "Manning"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

A Pod is the smallest deployable unit in Kubernetes — one or more containers sharing network namespace, IPC, and storage volumes. A Service provides stable networking — a virtual IP (ClusterIP) and DNS name that load-balances across Pod replicas, surviving Pod restarts.

## Core Explanation

Pod lifecycle: Pending → Running → Succeeded/Failed. Init containers run before app containers. Sidecar pattern: helper container alongside main (logging, proxying). Service types: ClusterIP (internal only), NodePort (exposes on node IP), LoadBalancer (cloud provider LB). Ingress routes external HTTP traffic to Services.

## Further Reading

- [Kubernetes Documentation](https://kubernetes.io/docs/)
