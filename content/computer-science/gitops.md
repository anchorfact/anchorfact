---
id: "kb-2026-00319"



title: "GitOps"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "GitOps Principles (Weaveworks)"
    type: "article"



    year: 2018
    url: "https://www.gitops.tech/"


    institution: "Weaveworks"
    note: "The original GitOps manifesto: declarative configuration, Git as single source of truth, automated reconciliation"



secondary_sources:
  - title: "Argo CD Documentation"
    type: "documentation"



    year: 2026
    url: "https://argo-cd.readthedocs.io/"


    institution: "CNCF"
    note: "CNCF-graduated GitOps tool: continuous deployment for Kubernetes via Git-based reconciliation"



completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

GitOps (Weaveworks, 2017) is an operational framework using Git as the single source of truth for declarative infrastructure and applications. Git commits trigger automated deployment. Tools: Argo CD, Flux CD. GitOps applies DevOps best practices (version control, code review, CI/CD) to infrastructure.

## Core Explanation

Principles: declarative (desired state in Git), versioned/immutable (history and rollback), pulled automatically (agent reconciles), continuously reconciled (drift detection). Argo CD: syncs Kubernetes manifests from Git to cluster. Flux: pulls Git repo, applies changes. Pull vs. Push: GitOps is pull-based (agent in cluster) — more secure than push-based CI/CD.

## Further Reading

- [GitOps Principles (Weaveworks)](https://www.gitops.tech/)
