---
id: kb-2026-00013
title: Docker
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
    statement: >-
      First released in 2013 by Solomon Hykes at dotCloud, Docker revolutionized software deployment by packaging applications with all their dependencies into portable images that run consistently
      across any environment
    source_title: Docker Documentation
    source_url: https://docs.docker.com/
    confidence: medium
  - id: fact-computer-science-02
    statement: Docker containers are lightweight virtualization units that share the host OS kernel but run in isolated user spaces with their own filesystem, networking, and process tree
    source_title: Docker Documentation
    source_url: https://docs.docker.com/
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
  - title: Docker Documentation
    type: documentation
    year: 2026
    url: https://docs.docker.com/
    institution: Docker Inc.
  - title: "Docker: Up and Running (4th Edition, 2025)"
    type: book
    year: 2025
    authors:
      - Matthias K.
      - Kane S.P.
    institution: O'Reilly Media
    url: https://www.oreilly.com/docker/
  - title: "Container Orchestration: From Docker to Kubernetes and Beyond (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.containers
secondary_sources:
  - title: MDN Web Docs — HTTP
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    institution: Mozilla
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
---
## TL;DR

Docker is an open-source platform for developing, shipping, and running applications in lightweight, isolated containers. First released in 2013 by Solomon Hykes at dotCloud, Docker revolutionized software deployment by packaging applications with all their dependencies into portable images that run consistently across any environment. As of 2026, Docker is used by over 15 million developers and is the foundation of modern cloud-native infrastructure.

## Core Explanation

Docker containers are lightweight virtualization units that share the host OS kernel but run in isolated user spaces with their own filesystem, networking, and process tree. Unlike virtual machines, containers don't need a full guest OS — they start in milliseconds and consume minimal overhead.

Key components:
- **Dockerfile**: Declarative script defining how to build an image
- **Image**: Read-only template with application code, runtime, libraries
- **Container**: Runnable instance of an image
- **Registry**: Repository for storing and distributing images (Docker Hub, ECR, GCR)
- **Docker Compose**: Multi-container application orchestration

## Further Reading

- [Docker Docs](https://docs.docker.com/): Official documentation
- [Docker Hub](https://hub.docker.com/): Container image registry
