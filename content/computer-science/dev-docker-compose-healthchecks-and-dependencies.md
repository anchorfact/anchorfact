---
id: dev-docker-compose-healthchecks-and-dependencies
title: 'Dev Docker Compose Healthchecks and Dependencies'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-dev-docker-compose-healthchecks-and-dependencies-1
    statement: >-
      Docker Compose documentation says depends_on controls service startup and
      shutdown order.
    source_title: Docker Compose Startup Order
    source_url: https://docs.docker.com/compose/how-tos/startup-order/
    confidence: medium
  - id: fact-cs-dev-docker-compose-healthchecks-and-dependencies-2
    statement: >-
      Docker Compose documentation says Compose waits for a container to be
      running on startup, not for it to be ready.
    source_title: Docker Compose Startup Order
    source_url: https://docs.docker.com/compose/how-tos/startup-order/
    confidence: medium
  - id: fact-cs-dev-docker-compose-healthchecks-and-dependencies-3
    statement: >-
      Docker Compose documentation says service_healthy expects a dependency to
      be healthy as defined by healthcheck before starting a dependent service.
    source_title: Docker Compose Startup Order
    source_url: https://docs.docker.com/compose/how-tos/startup-order/
    confidence: medium
  - id: fact-cs-dev-docker-compose-healthchecks-and-dependencies-4
    statement: >-
      The Compose Specification says depends_on condition service_healthy is
      satisfied when a dependency is healthy as indicated by healthcheck.
    source_title: Compose Specification
    source_url: https://compose-spec.github.io/compose-spec/spec.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Local dependency diagnosis depends on the Compose implementation version, container healthcheck command, start_period, interval, retries, service restart policy, dependent service retry behavior, mounted configuration, network aliases, profiles, and whether the failing service is running in CI or a local developer workspace.
disputed_statements: []
primary_sources:
  - title: Docker Compose Startup Order
    type: documentation
    year: 2026
    url: https://docs.docker.com/compose/how-tos/startup-order/
    institution: Docker
  - title: Compose Specification
    type: documentation
    year: 2026
    url: https://compose-spec.github.io/compose-spec/spec.html
    institution: Compose Specification
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Docker Compose healthcheck evidence tells agents whether a local stack failed because a dependency was merely running, actually healthy, or never ready before the dependent service started.

## Core Explanation

Compose files often encode the developer services an agent needs: databases, queues, caches, browsers, and mock APIs. Startup order alone is not readiness. A database container can be running while it is still applying initialization scripts, starting listeners, or rejecting connections. That distinction is why `healthcheck` and `depends_on` conditions matter for reproducible agent workspaces.

Agents should inspect `depends_on`, dependency conditions, `healthcheck` commands, intervals, retries, start periods, service logs, container health status, exposed ports, network aliases, profiles, and restart behavior before adding sleeps or changing application retry logic.

## Source-Mapped Facts

- Docker Compose documentation says depends_on controls service startup and shutdown order. ([source](https://docs.docker.com/compose/how-tos/startup-order/))
- Docker Compose documentation says Compose waits for a container to be running on startup, not for it to be ready. ([source](https://docs.docker.com/compose/how-tos/startup-order/))
- Docker Compose documentation says service_healthy expects a dependency to be healthy as defined by healthcheck before starting a dependent service. ([source](https://docs.docker.com/compose/how-tos/startup-order/))
- The Compose Specification says depends_on condition service_healthy is satisfied when a dependency is healthy as indicated by healthcheck. ([source](https://compose-spec.github.io/compose-spec/spec.html))

## Further Reading

- [Docker Compose Startup Order](https://docs.docker.com/compose/how-tos/startup-order/)
- [Compose Specification](https://compose-spec.github.io/compose-spec/spec.html)
