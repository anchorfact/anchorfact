---
id: agent-terraform-plan-output-and-resource-addresses
title: 'Agent Terraform Plan Output and Resource Addresses'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-terraform-plan-output-and-resource-addresses-1
    statement: >-
      HashiCorp Terraform documentation says terraform plan creates an execution
      plan that previews changes Terraform will make to infrastructure.
    source_title: Terraform Plan Command
    source_url: https://developer.hashicorp.com/terraform/cli/commands/plan
    confidence: medium
  - id: fact-ai-agent-terraform-plan-output-and-resource-addresses-2
    statement: >-
      HashiCorp Terraform documentation says the plan command reports whether
      Terraform will create, update, or destroy resources.
    source_title: Terraform Plan Command
    source_url: https://developer.hashicorp.com/terraform/cli/commands/plan
    confidence: medium
  - id: fact-ai-agent-terraform-plan-output-and-resource-addresses-3
    statement: >-
      HashiCorp Terraform documentation says resource addresses reference
      specific resource instances elsewhere in configuration.
    source_title: Terraform Resource Address Reference
    source_url: https://developer.hashicorp.com/terraform/cli/state/resource-addressing
    confidence: medium
completeness: 0.82
known_gaps:
  - Terraform diagnosis depends on provider versions, module paths, moved blocks, import state, drift, workspaces, backend locks, sensitive values, generated plans, and whether the plan is stale relative to current state.
disputed_statements: []
primary_sources:
  - title: Terraform Plan Command
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/cli/commands/plan
    institution: HashiCorp
  - title: Terraform Resource Address Reference
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/cli/state/resource-addressing
    institution: HashiCorp
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Terraform plan output and resource addresses are the evidence agents need before changing infrastructure-as-code.

## Core Explanation

Infrastructure changes are not just file diffs. The useful operational evidence is the planned action, the resource address, the module path, provider behavior, and whether state agrees with configuration. A single address can point to the exact instance an agent must inspect.

Agents should record the command, workspace, backend, provider lockfile, plan summary, resource addresses, replacement reasons, unknown values, sensitive fields, and whether the plan was generated from the current state. They should not infer infrastructure impact from HCL edits alone.

## Source-Mapped Facts

- HashiCorp Terraform documentation says terraform plan creates an execution plan that previews changes Terraform will make to infrastructure. ([source](https://developer.hashicorp.com/terraform/cli/commands/plan))
- HashiCorp Terraform documentation says the plan command reports whether Terraform will create, update, or destroy resources. ([source](https://developer.hashicorp.com/terraform/cli/commands/plan))
- HashiCorp Terraform documentation says resource addresses reference specific resource instances elsewhere in configuration. ([source](https://developer.hashicorp.com/terraform/cli/state/resource-addressing))

## Further Reading

- [Terraform Plan Command](https://developer.hashicorp.com/terraform/cli/commands/plan)
- [Terraform Resource Address Reference](https://developer.hashicorp.com/terraform/cli/state/resource-addressing)
