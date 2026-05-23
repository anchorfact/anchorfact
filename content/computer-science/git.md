---
id: "kb-2026-00066"
title: "Git Version Control System"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on official Git documentation and Pro Git book"
last_verified: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Pro Git (2nd Edition)"
    authors: ["Chacon, Scott", "Straub, Ben"]
    type: "book"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
  - title: "Git Documentation"
    type: "documentation"
    year: 2026
    url: "https://git-scm.com/docs"
secondary_sources:
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    institution: "Apress"
completeness: 0.85
related_entities:
  - "entity:version-control"
  - "entity:linux"
ai_citations:
  last_citation_check: "2026-05-22"
  - title: "Pro Git (2nd ed.)"
    authors: ["Chacon, Scott", "Straub, Ben"]
    type: "textbook"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    isbn: "978-1484200773"
  - title: "Pro Git (2nd ed.)"
    authors: ["Chacon, Scott", "Straub, Ben"]
    type: "textbook"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    isbn: "978-1484200773"
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
