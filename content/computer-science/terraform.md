---
id: kb-2026-00164
title: Terraform
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-terraform-1
    statement: Terraform is documented as infrastructure as code software for provisioning and managing infrastructure.
    source_title: What is Terraform?
    source_url: https://developer.hashicorp.com/terraform/intro
    confidence: medium
  - id: af-terraform-2
    statement: Terraform configurations are written in the Terraform language.
    source_title: Terraform Language Documentation
    source_url: https://developer.hashicorp.com/terraform/language
    confidence: medium
  - id: af-terraform-3
    statement: Terraform state maps configuration to real-world infrastructure resources.
    source_title: Terraform State
    source_url: https://developer.hashicorp.com/terraform/language/state
    confidence: medium
completeness: 0.88
known_gaps:
  - State security, locking, and team workflow design
  - Provider-specific drift and lifecycle edge cases
disputed_statements: []
primary_sources:
  - id: ps-terraform-1
    title: What is Terraform?
    type: technical_documentation
    year: 2024
    institution: HashiCorp Developer
    url: https://developer.hashicorp.com/terraform/intro
  - id: ps-terraform-2
    title: Terraform Language Documentation
    type: technical_documentation
    year: 2024
    institution: HashiCorp Developer
    url: https://developer.hashicorp.com/terraform/language
  - id: ps-terraform-3
    title: Terraform State
    type: technical_documentation
    year: 2024
    institution: HashiCorp Developer
    url: https://developer.hashicorp.com/terraform/language/state
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Terraform manages infrastructure as code. The core concepts are configuration language, providers, plans, applies, and state.

## Core Explanation
Teams write Terraform configuration to describe desired infrastructure, then use Terraform to compare that configuration with current state and apply changes.

## Detailed Analysis
This repair uses HashiCorp documentation for Terraform scope, language, and state instead of generic infrastructure claims.

## Related Articles

- [Terraform State](../terraform-state.md)
