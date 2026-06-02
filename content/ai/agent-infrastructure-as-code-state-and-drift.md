---
id: agent-infrastructure-as-code-state-and-drift
title: 'Agent Infrastructure-as-Code State and Drift'
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
  - id: fact-ai-agent-infrastructure-as-code-state-and-drift-1
    statement: >-
      Terraform state documentation says Terraform stores information about real infrastructure in state and uses it to map resources in configuration to remote objects.
    source_title: Terraform State
    source_url: https://developer.hashicorp.com/terraform/language/state
    confidence: medium
  - id: fact-ai-agent-infrastructure-as-code-state-and-drift-2
    statement: >-
      AWS CloudFormation documentation describes drift detection as detecting whether actual resource configurations differ from expected template configurations.
    source_title: AWS CloudFormation Drift Detection
    source_url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html
    confidence: medium
  - id: fact-ai-agent-infrastructure-as-code-state-and-drift-3
    statement: >-
      Pulumi drift documentation says drift is the gap between actual state and Pulumi's recorded view of the world.
    source_title: Pulumi Detecting and Reconciling Drift
    source_url: https://www.pulumi.com/docs/iac/operations/stack-management/drift/
    confidence: medium
completeness: 0.83
known_gaps:
  - Drift detection coverage depends on provider support, permissions, unmanaged resources, refresh timing, and state-locking behavior.
disputed_statements: []
primary_sources:
  - title: Terraform State
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/language/state
    institution: HashiCorp
  - title: AWS CloudFormation Drift Detection
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html
    institution: Amazon Web Services
  - title: Pulumi Detecting and Reconciling Drift
    type: documentation
    year: 2026
    url: https://www.pulumi.com/docs/iac/operations/stack-management/drift/
    institution: Pulumi
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Infrastructure-as-code state and drift reports are high-value agent context because they reveal whether the deployed cloud environment still matches the declared configuration.

## Core Explanation

Agents planning infrastructure changes need to inspect both configuration files and the state or drift layer. A repository may say one thing while the cloud account has manually edited, deleted, or partially updated resources.

The safe workflow is to read state, plan output, and drift reports before proposing changes. Agents should not repair state, import resources, or reconcile drift without human review because those operations can change ownership and deletion behavior.

## Source-Mapped Facts

- Terraform state documentation says Terraform stores information about real infrastructure in state and uses it to map resources in configuration to remote objects. ([source](https://developer.hashicorp.com/terraform/language/state))
- AWS CloudFormation documentation describes drift detection as detecting whether actual resource configurations differ from expected template configurations. ([source](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html))
- Pulumi drift documentation says drift is the gap between actual state and Pulumi's recorded view of the world. ([source](https://www.pulumi.com/docs/iac/operations/stack-management/drift/))

## Further Reading

- [Terraform State](https://developer.hashicorp.com/terraform/language/state)
- [AWS CloudFormation Drift Detection](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html)
- [Pulumi Detecting and Reconciling Drift](https://www.pulumi.com/docs/iac/operations/stack-management/drift/)
