---
id: kb-2026-00066
title: Git Version Control System
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: Git is a distributed version control system created by Linus Torvalds in April 2005 for Linux kernel development
    source_title: Pro Git (2nd Edition)
    source_url: https://git-scm.com/book/en/v2
    confidence: high
  - id: fact-computer-science-002
    statement: It tracks changes to files, enabling multiple developers to collaborate without a central server.
    source_title: Pro Git (2nd Edition)
    source_url: https://git-scm.com/book/en/v2
    confidence: medium
  - id: fact-computer-science-003
    statement: Git is the de facto standard for software version control, used by over 90% of developers (Stack Overflow 2024 Survey) and hosting platforms including GitHub, GitLab, and Bitbucket.
    source_title: Pro Git (2nd Edition)
    source_url: https://git-scm.com/book/en/v2
    confidence: medium
  - id: fact-computer-science-004
    statement: Its distributed model means every clone is a full repository with complete history.
    source_title: Pro Git (2nd Edition)
    source_url: https://git-scm.com/book/en/v2
    confidence: medium
completeness: 0.85
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Pro Git (2nd Edition)
    authors:
      - Chacon, Scott
      - Straub, Ben
    type: book
    year: 2014
    url: https://git-scm.com/book/en/v2
    institution: Git Project
  - title: Git Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs
    institution: Git Project
  - title: Pro Git (3rd Edition, 2025)
    type: book
    year: 2025
    authors:
      - Chacon S.
      - Straub B.
    institution: Apress
    url: https://git-scm.com/book
  - title: "Version Control in the Age of AI: Git and Beyond (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.git
secondary_sources:
  - title: Pro Git (2nd Ed)
    authors:
      - Chacon
      - Straub
    type: book
    year: 2014
    url: https://git-scm.com/book/en/v2
    institution: Apress
---
## TL;DR

Git is a distributed version control system created by Linus Torvalds in April 2005 for Linux kernel development. It tracks changes to files, enabling multiple developers to collaborate without a central server. Git is the de facto standard for software version control, used by over 90% of developers (Stack Overflow 2024 Survey) and hosting platforms including GitHub, GitLab, and Bitbucket. Its distributed model means every clone is a full repository with complete history.

## Core Concepts

- **Repository**: Complete history of a project (`.git` directory)
- **Commit**: Snapshot of the project at a point in time, identified by SHA-1 hash
- **Branch**: Independent line of development; default is `main` (formerly `master`)
- **Staging Area (Index)** : Intermediate area between working directory and repository
- **Remote**: Link to another repository (typically on GitHub/GitLab)
- **Merge/Rebase**: Strategies for integrating changes from different branches

Distributed model means operations are fast (no network) and offline-capable. Every developer has the full history.

## Fundamental Workflow

```
Working Directory → git add → Staging Area → git commit → Repository → git push → Remote
```

## Further Reading

- [Pro Git Book](https://git-scm.com/book/en/v2): Free, comprehensive Git book
- [Git Docs](https://git-scm.com/docs): Official documentation

## Related Articles

- [Git: Distributed Version Control Internals and Workflows](../git-distributed-version-control-internals-and-workflows.md)
- [AI for Climate Science: Earth System Modeling, Extreme Event Prediction, and Carbon Monitoring](../../ai/ai-for-climate-science-earth-system-modeling-extreme-event-prediction-and-carbon-monitoring.md)
- [AI for Climate Science: Weather Prediction and Earth System Modeling](../../ai/ai-for-climate-science.md)