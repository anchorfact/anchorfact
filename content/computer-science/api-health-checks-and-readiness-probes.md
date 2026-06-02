---
id: api-health-checks-and-readiness-probes
title: 'API Health Checks and Readiness Probes'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-api-health-checks-and-readiness-probes-1
    statement: >-
      Kubernetes documentation describes liveness, readiness, and startup probes for checking
      container health.
    source_title: Kubernetes Liveness, Readiness, and Startup Probes
    source_url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
    confidence: medium
  - id: fact-api-health-checks-and-readiness-probes-2
    statement: >-
      AWS Elastic Load Balancing documentation says target groups route requests only to registered
      targets that are healthy.
    source_title: AWS Target Group Health Checks
    source_url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
    confidence: medium
  - id: fact-api-health-checks-and-readiness-probes-3
    statement: >-
      Google Cloud Load Balancing documentation describes health checks as determining whether
      backend instances respond to traffic.
    source_title: Google Cloud Health Check Concepts
    source_url: https://docs.cloud.google.com/load-balancing/docs/health-check-concepts
    confidence: medium
completeness: 0.84
known_gaps:
  - A passing health check can still miss dependency saturation, partial data corruption, or customer-specific failures.
disputed_statements: []
primary_sources:
  - title: Kubernetes Liveness, Readiness, and Startup Probes
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
    institution: Kubernetes
  - title: AWS Target Group Health Checks
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
    institution: Amazon Web Services
  - title: Google Cloud Health Check Concepts
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/load-balancing/docs/health-check-concepts
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Health checks and readiness probes tell agents whether an API instance should receive traffic, restart, or stay out of rotation.

## Core Explanation

API health is not a single boolean. A liveness check can show whether a process should be restarted, while a readiness check can show whether it is ready to serve traffic. Load balancers use health checks to decide where traffic should go.

Agents should inspect health checks before proposing remediation. If a service is alive but not ready, restarting it may be worse than fixing its dependency. If a load balancer marks targets unhealthy, the agent should inspect probe path, status code, timeout, and dependency checks.

## Source-Mapped Facts

- Kubernetes documentation describes liveness, readiness, and startup probes for checking container health. ([source](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/))
- AWS Elastic Load Balancing documentation says target groups route requests only to registered targets that are healthy. ([source](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html))
- Google Cloud Load Balancing documentation describes health checks as determining whether backend instances respond to traffic. ([source](https://docs.cloud.google.com/load-balancing/docs/health-check-concepts))

## Further Reading

- [Kubernetes Liveness, Readiness, and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [AWS Target Group Health Checks](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html)
- [Google Cloud Health Check Concepts](https://docs.cloud.google.com/load-balancing/docs/health-check-concepts)
