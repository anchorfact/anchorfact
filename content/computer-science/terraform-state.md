---
id: kb-2026-00315
title: Terraform State
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      Terraform stores state about a workspace managed infrastructure and configuration so it can map real-world
      resources to Terraform configuration.
    source_title: State | Terraform | HashiCorp Developer
    source_url: https://developer.hashicorp.com/terraform/language/state
    confidence: medium
  - id: fact-computer-science-02
    statement: >-
      Terraform state snapshots are stored in JSON format, and Terraform advises using CLI commands rather than directly
      editing the state file.
    source_title: State | Terraform | HashiCorp Developer
    source_url: https://developer.hashicorp.com/terraform/language/state
    confidence: medium
  - id: fact-computer-science-03
    statement: >-
      HashiCorp recommends remote state storage for collaboration because local state limits teamwork and can be lost
      with the local file.
    source_title: "State: Remote Storage | Terraform | HashiCorp Developer"
    source_url: https://developer.hashicorp.com/terraform/language/state/remote
    confidence: medium
completeness: 0.88
known_gaps:
  - This public article was narrowed to source-mapped claims during a targeted evidence repair pass.
disputed_statements: []
primary_sources:
  - title: State | Terraform | HashiCorp Developer
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/language/state
    institution: HashiCorp
  - title: "State: Purpose | Terraform | HashiCorp Developer"
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/language/state/purpose
    institution: HashiCorp
  - title: "State: Remote Storage | Terraform | HashiCorp Developer"
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/language/state/remote
    institution: HashiCorp
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Terraform state records how Terraform maps configured resource instances to real infrastructure. HashiCorp documents local state as JSON and recommends remote storage for team collaboration and resilience.

## Evidence Notes

- HashiCorp's state overview explains why Terraform stores state.
- The same documentation describes state snapshots as JSON and discourages direct edits.
- HashiCorp's remote-state guidance narrows the collaboration claim.

## Further Reading

- [State | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/language/state)
- [State: Purpose | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/language/state/purpose)
- [State: Remote Storage | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/language/state/remote)
