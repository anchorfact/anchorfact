---
id: "kb-2026-00153"


title: "CI/CD Pipeline"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Continuous Delivery (Jez Humble, David Farley)"
    authors: ["Humble, Jez", "Farley, David"]
    type: "book"


    year: 2010
    url: "https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/"

    institution: "Addison-Wesley"
    note: "The definitive CI/CD book. Defined the continuous delivery pipeline: build → test → deploy."


secondary_sources:
  - title: "The DevOps Handbook (2nd Edition)"
    authors: ["Kim, Gene", "Humble, Jez", "Debois, Patrick", "Willis, John"]
    type: "book"


    year: 2021
    url: "https://itrevolution.com/product/the-devops-handbook-second-edition/"

    institution: "IT Revolution"
    note: "CI/CD in the broader DevOps context: flow, feedback, and continuous learning"


completeness: 0.88
known_gaps:
  - "Statistics and data cited are from 2021 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
ai_citations:
---

## TL;DR

CI/CD automates software delivery: Continuous Integration (merge frequently, auto-test), Continuous Delivery (auto-deploy to staging), Continuous Deployment (auto-deploy to production). Core principle: every commit triggers pipeline → build → test → deploy. Reduces integration pain and speeds feedback loops.

## Core Explanation

CI: automated builds + tests on every commit. CD: automated deployment after tests pass. Pipeline stages: lint, build, unit test, integration test, security scan, deploy to staging, smoke test, deploy to production. Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI. Canary deployments: roll out to subset, monitor, expand. Blue-green: two identical environments, swap traffic.

## Further Reading

- [Continuous Delivery (Jez Humble, David Farley)](https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/)
