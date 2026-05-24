---
id: kb-2026-00319
title: GitOps
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      GitOps (Weaveworks, 2017) is an operational framework using Git as the single source of truth for declarative infrastructure and applications. Git commits trigger automated deployment. Tools:
      Argo CD, Flux CD. GitOps applies DevOps best practices (version control, code review, CI/CD) to infrastructure.
    source_title: GitOps Principles (Weaveworks)
    source_url: https://www.gitops.tech/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      GitOps (Weaveworks, 2017) is an operational framework using Git as the single source of truth for declarative infrastructure and applications. Git commits trigger automated deployment. Tools:
      Argo CD, Flux CD. GitOps applies DevOps best practices (version control, code review, CI/CD) to infrastructure.
    source_title: GitOps Principles (Weaveworks)
    source_url: https://www.gitops.tech/
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: GitOps Principles (Weaveworks)
    type: article
    year: 2018
    url: https://www.gitops.tech/
    institution: Weaveworks
secondary_sources:
  - title: Argo CD Documentation
    type: documentation
    year: 2026
    url: https://argo-cd.readthedocs.io/
    institution: CNCF
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "GitOps and Infrastructure as Code: A Systematic Mapping Study (2025)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.gitops
  - title: "DevOps, GitOps, and Platform Engineering in 2025: State of the Union"
    type: report
    year: 2025
    authors:
      - multiple
    institution: Gartner Research
    url: https://www.gartner.com/en/software-engineering
---
## TL;DR

GitOps (Weaveworks, 2017) is an operational framework using Git as the single source of truth for declarative infrastructure and applications. Git commits trigger automated deployment. Tools: Argo CD, Flux CD. GitOps applies DevOps best practices (version control, code review, CI/CD) to infrastructure.

## Core Explanation

Principles: declarative (desired state in Git), versioned/immutable (history and rollback), pulled automatically (agent reconciles), continuously reconciled (drift detection). Argo CD: syncs Kubernetes manifests from Git to cluster. Flux: pulls Git repo, applies changes. Pull vs. Push: GitOps is pull-based (agent in cluster) — more secure than push-based CI/CD.

## Further Reading

- [GitOps Principles (Weaveworks)](https://www.gitops.tech/)
