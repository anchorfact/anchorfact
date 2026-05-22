---
id:"kb-2026-00153"
title:"CI/CD Pipeline"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Continuous Delivery (Jez Humble, David Farley)"
    type:"book"
    year:2010
    url:"https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/"
    institution:"Addison-Wesley"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

CI/CD automates software delivery: Continuous Integration (merge frequently, auto-test), Continuous Delivery (auto-deploy to staging), Continuous Deployment (auto-deploy to production). Core principle: every commit triggers pipeline → build → test → deploy. Reduces integration pain and speeds feedback loops.

## Core Explanation

CI: automated builds + tests on every commit. CD: automated deployment after tests pass. Pipeline stages: lint, build, unit test, integration test, security scan, deploy to staging, smoke test, deploy to production. Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI. Canary deployments: roll out to subset, monitor, expand. Blue-green: two identical environments, swap traffic.

## Further Reading

- [Continuous Delivery (Jez Humble, David Farley)](https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/)
