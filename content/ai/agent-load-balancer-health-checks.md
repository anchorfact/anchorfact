---
id: agent-load-balancer-health-checks
title: 'Agent Load Balancer Health Checks'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-load-balancer-health-checks-1
    statement: >-
      AWS Elastic Load Balancing documentation describes target group health checks for Application
      Load Balancers.
    source_title: AWS ALB Target Health Checks
    source_url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
    confidence: medium
  - id: fact-ai-agent-load-balancer-health-checks-2
    statement: >-
      Google Cloud Load Balancing documentation describes health checks as probes used to determine
      backend health.
    source_title: Google Cloud Health Check Concepts
    source_url: https://cloud.google.com/load-balancing/docs/health-check-concepts
    confidence: medium
  - id: fact-ai-agent-load-balancer-health-checks-3
    statement: >-
      Azure Load Balancer documentation describes health probes used to detect backend endpoint
      health.
    source_title: Azure Load Balancer Health Probes
    source_url: https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview
    confidence: medium
completeness: 0.83
known_gaps:
  - Health-check behavior depends on probe path, protocol, thresholds, listener rules, security groups, and backend startup time.
disputed_statements: []
primary_sources:
  - title: AWS ALB Target Health Checks
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
    institution: Amazon Web Services
  - title: Google Cloud Health Check Concepts
    type: documentation
    year: 2026
    url: https://cloud.google.com/load-balancing/docs/health-check-concepts
    institution: Google Cloud
  - title: Azure Load Balancer Health Probes
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview
    institution: Microsoft Azure
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Load balancer health checks tell agents whether traffic is being removed from a target because the routing layer considers it unhealthy.

## Core Explanation

An application can be running but still fail a load balancer health check. The probe path may require authentication, the port may be wrong, the backend may be slow to start, or network rules may block the checker.

Agents should inspect health check configuration and target health reason codes before restarting instances or rolling back deployments. A useful remediation names the load balancer, target group or backend service, probe path, threshold, and observed failing reason.

## Source-Mapped Facts

- AWS Elastic Load Balancing documentation describes target group health checks for Application Load Balancers. ([source](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html))
- Google Cloud Load Balancing documentation describes health checks as probes used to determine backend health. ([source](https://cloud.google.com/load-balancing/docs/health-check-concepts))
- Azure Load Balancer documentation describes health probes used to detect backend endpoint health. ([source](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview))

## Further Reading

- [AWS ALB Target Health Checks](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html)
- [Google Cloud Health Check Concepts](https://cloud.google.com/load-balancing/docs/health-check-concepts)
- [Azure Load Balancer Health Probes](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview)
