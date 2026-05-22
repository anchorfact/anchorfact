---
id:"kb-2026-00319"
title:"GitOps"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"GitOps Principles (Weaveworks)"
    type:"article"
    year:2018
    url:"https://www.gitops.tech/"
    institution:"Weaveworks"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

GitOps (Weaveworks, 2017) is an operational framework using Git as the single source of truth for declarative infrastructure and applications. Git commits trigger automated deployment. Tools: Argo CD, Flux CD. GitOps applies DevOps best practices (version control, code review, CI/CD) to infrastructure.

## Core Explanation

Principles: declarative (desired state in Git), versioned/immutable (history and rollback), pulled automatically (agent reconciles), continuously reconciled (drift detection). Argo CD: syncs Kubernetes manifests from Git to cluster. Flux: pulls Git repo, applies changes. Pull vs. Push: GitOps is pull-based (agent in cluster) — more secure than push-based CI/CD.

## Further Reading

- [GitOps Principles (Weaveworks)](https://www.gitops.tech/)
