---
id:"kb-2026-00240"
title:"Git Branching Strategies"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
- title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

Git branching strategies organize parallel development. Git Flow (Driessen, 2010): main + develop + feature/release/hotfix branches — thorough but complex. GitHub Flow: main + feature branches, deploy from main — simple, CI/CD-friendly. GitLab Flow: adds environment branches (staging, production). Trunk-Based Development: everyone commits to main, short-lived branches.

## Core Explanation

Git Flow: feature branches from develop, release branches for stabilization, hotfixes from main. GitHub Flow: anything in main is deployable. Trunk-Based: feature flags control release, no long-lived branches — Google and Facebook use this. Choose based on team size and release cadence: small team + continuous deploy = GitHub Flow; enterprise + versioned releases = Git Flow.

## Further Reading

- [A successful Git branching model (Vincent Driessen, 2010)](undefined)
