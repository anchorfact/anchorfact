---
id:"kb-2026-00315"
title:"Terraform State"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Terraform State Documentation"
    type:"documentation"
    year:2026
    url:"https://developer.hashicorp.com/terraform/language/state"
    institution:"HashiCorp"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Terraform state (`terraform.tfstate`) is a JSON file mapping real-world resources to Terraform configuration. It is the source of truth for Terraform's understanding of infrastructure. Remote state (S3 + DynamoDB locking) is essential for team collaboration.

## Core Explanation

State locking: DynamoDB prevents concurrent modifications. `terraform import` adds existing resources to state without recreating them. `terraform state mv` moves resources between states. `terraform state rm` removes from state without destroying. State drift detection: `terraform refresh` updates state to match reality. Never edit state manually — use Terraform commands.

## Further Reading

- [Terraform State Documentation](https://developer.hashicorp.com/terraform/language/state)
