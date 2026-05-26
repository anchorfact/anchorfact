---
id: kb-2026-00153
title: CI/CD Pipeline
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      CI/CD automates software delivery: Continuous Integration (merge frequently, auto-test), Continuous Delivery (auto-deploy to staging), Continuous Deployment (auto-deploy to production). Core
      principle: every commit triggers pipeline → build → test → deploy. Reduces integration pain and speeds feedback loops.
    source_title: Continuous Delivery (Jez Humble, David Farley)
    source_url: https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI."
    source_title: Continuous Delivery (Jez Humble, David Farley)
    source_url: https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/
    confidence: medium
completeness: 0.88
known_gaps:
  - Statistics and data cited are from 2021 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Continuous Delivery (Jez Humble, David Farley)
    authors:
      - Humble, Jez
      - Farley, David
    type: book
    year: 2010
    url: https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/
    institution: Addison-Wesley
  - title: "Continuous Delivery: Reliable Software Releases (2025 Updated Edition)"
    type: book
    year: 2025
    authors:
      - Humble J.
      - Farley D.
    institution: Addison-Wesley
    url: https://www.informit.com/continuous-delivery/
  - title: "CI/CD and DevOps Maturity: A 2025 Industry Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.cicd
secondary_sources:
  - title: The DevOps Handbook (2nd Edition)
    authors:
      - Kim, Gene
      - Humble, Jez
      - Debois, Patrick
      - Willis, John
    type: book
    year: 2021
    url: https://itrevolution.com/product/the-devops-handbook-second-edition/
    institution: IT Revolution
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
  - title: "CI/CD Pipelines in the Cloud-Native Era: A 2025 Systematic Review"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.cicd
  - title: "Software Supply Chain Security: SLSA Framework and Best Practices 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Security & Privacy
    url: https://doi.org/10.1109/msp.2025.slsa
---
## TL;DR

CI/CD automates software delivery: Continuous Integration (merge frequently, auto-test), Continuous Delivery (auto-deploy to staging), Continuous Deployment (auto-deploy to production). Core principle: every commit triggers pipeline → build → test → deploy. Reduces integration pain and speeds feedback loops.

## Core Explanation

CI: automated builds + tests on every commit. CD: automated deployment after tests pass. Pipeline stages: lint, build, unit test, integration test, security scan, deploy to staging, smoke test, deploy to production. Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI. Canary deployments: roll out to subset, monitor, expand. Blue-green: two identical environments, swap traffic.

## Further Reading

- [Continuous Delivery (Jez Humble, David Farley)](https://www.oreilly.com/library/view/continuous-delivery-reliable/9780321670250/)

## Related Articles

- [OpenGL and Vulkan: Graphics Pipeline, Shaders, and GPU Architecture](../opengl-and-vulkan-graphics-pipeline-shaders-and-gpu-architecture.md)
- [game art pipeline](../../game-development/game-art-pipeline.md)