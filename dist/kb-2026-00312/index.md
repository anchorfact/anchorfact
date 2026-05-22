---
id:"kb-2026-00312"
title:"Jenkins"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Jenkins Documentation"
    type:"documentation"
    year:2026
    url:"https://www.jenkins.io/doc/"
    institution:"Jenkins Project"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    institution: "Apress"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Jenkins (Kohsuke Kawaguchi, 2011, forked from Hudson) is the most established open-source CI/CD automation server. Jenkins Pipeline (Jenkinsfile, Groovy DSL) defines build/deploy as code. Over 1800 plugins. Jenkins is Java-based, highly extensible but complex to maintain.

## Core Explanation

Pipeline: `pipeline { agent any; stages { stage('Build') { steps { sh 'make' } } } }`. Declarative vs. Scripted pipeline. Jenkinsfile stored in repository (Pipeline as Code). Plugins: Git, Docker, Slack, Blue Ocean (modern UI). Master-Agent architecture for distributed builds. Modern alternatives: GitHub Actions (simpler, cloud-native), GitLab CI.

## Further Reading

- [Jenkins Documentation](https://www.jenkins.io/doc/)
