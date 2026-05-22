---
id:"kb-2026-00312"
title:"Jenkins"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Jenkins Documentation"
    type: "documentation"
    year: 2026
    url: "https://www.jenkins.io/doc/"
    institution: "Jenkins Project"
    note: "Open-source CI/CD: declarative/scripted pipelines, plugins, Blue Ocean, JCasC"
secondary_sources:
  - title: "Continuous Delivery (Humble & Farley)"
    authors: ["Humble, Jez", "Farley, David"]
    type: "book"
    year: 2010
    url: "https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/"
    institution: "Addison-Wesley"
    note: "The CI/CD book Jenkins was the reference implementation for"
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
