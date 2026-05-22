---
id:"kb-2026-00163"
title:"GitHub Actions"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"GitHub Actions Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.github.com/en/actions"
    institution:"GitHub"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

GitHub Actions is a CI/CD platform integrated into GitHub repositories. Workflows (YAML files in `.github/workflows/`) trigger on events (push, PR, schedule) and execute jobs on runners (Ubuntu, Windows, macOS). Free for public repositories.

## Core Explanation

Workflow syntax: `on:` defines triggers, `jobs:` defines steps. Runners: GitHub-hosted (2-core, 7GB RAM, free for public) or self-hosted. Marketplace: community-built actions (checkout, setup-node, deploy). Matrix builds: test across multiple versions/OS combinations. Secrets: encrypted environment variables (`${{ secrets.TOKEN }}`).

## Further Reading

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
