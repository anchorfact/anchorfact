---
id: agent-execution-dry-runs-and-plan-previews
title: 'Agent Execution Dry Runs and Plan Previews'
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
  - id: fact-ai-agent-execution-dry-runs-and-plan-previews-1
    statement: >-
      Terraform plan documentation says the plan command creates an execution plan and shows changes needed to reach the desired state.
    source_title: Terraform Plan Command
    source_url: https://developer.hashicorp.com/terraform/cli/commands/plan
    confidence: medium
  - id: fact-ai-agent-execution-dry-runs-and-plan-previews-2
    statement: >-
      Kubernetes API documentation describes dry run as a request option whose effects are not persisted.
    source_title: Kubernetes API Concepts
    source_url: https://kubernetes.io/docs/reference/using-api/api-concepts/
    confidence: medium
  - id: fact-ai-agent-execution-dry-runs-and-plan-previews-3
    statement: >-
      Azure Resource Manager what-if documentation says the operation predicts how resources will change if a template is deployed.
    source_title: Azure ARM What-If
    source_url: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if
    confidence: medium
completeness: 0.84
known_gaps:
  - Dry runs can miss runtime effects, external side effects, provider bugs, or permission changes outside the previewed system.
disputed_statements: []
primary_sources:
  - title: Terraform Plan Command
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/cli/commands/plan
    institution: HashiCorp
  - title: Kubernetes API Concepts
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/reference/using-api/api-concepts/
    institution: Kubernetes
  - title: Azure ARM What-If
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Dry runs and plan previews are essential agent guardrails because they expose intended changes before the agent mutates production infrastructure or repository state.

## Core Explanation

An agent should prefer previewable operations when planning infrastructure, deployment, or configuration changes. A plan can reveal creates, updates, deletes, replacements, and validation errors before a human approves execution.

Preview output is not a guarantee. Agents should treat dry runs as decision support, preserve the output as evidence, and still require explicit approval for destructive or privileged operations.

## Source-Mapped Facts

- Terraform plan documentation says the plan command creates an execution plan and shows changes needed to reach the desired state. ([source](https://developer.hashicorp.com/terraform/cli/commands/plan))
- Kubernetes API documentation describes dry run as a request option whose effects are not persisted. ([source](https://kubernetes.io/docs/reference/using-api/api-concepts/))
- Azure Resource Manager what-if documentation says the operation predicts how resources will change if a template is deployed. ([source](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if))

## Further Reading

- [Terraform Plan Command](https://developer.hashicorp.com/terraform/cli/commands/plan)
- [Kubernetes API Concepts](https://kubernetes.io/docs/reference/using-api/api-concepts/)
- [Azure ARM What-If](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if)
