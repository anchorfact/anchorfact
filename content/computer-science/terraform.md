---
id:"kb-2026-00164"
title:"Terraform"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Terraform Documentation"
    type: "documentation"
    year: 2026
    url: "https://developer.hashicorp.com/terraform/docs"
    institution: "HashiCorp"
    note: "IaC: HCL, providers, resources, modules, plan/apply, OpenTofu fork"
secondary_sources:
  - title: "Terraform: Up & Running (3rd Edition)"
    authors: ["Brikman, Yevgeniy"]
    type: "book"
    year: 2022
    url: "https://www.oreilly.com/library/view/terraform-up/9781098116736/"
    institution: "O'Reilly"
    note: "Production Terraform: remote state, team workflows, Terragrunt, CI/CD"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Terraform by HashiCorp is the dominant Infrastructure as Code tool, using HCL (HashiCorp Configuration Language) to declaratively define and provision cloud resources across 3000+ providers. State file tracks real-world resources; plan shows pending changes.

## Core Explanation

`terraform init` (download providers), `plan` (preview changes), `apply` (provision), `destroy` (teardown). Remote state (S3 + DynamoDB) for team collaboration and state locking. Modules enable reusable configuration. Workspaces isolate environments. Terraform Cloud/Enterprise adds VCS integration, policy as code (Sentinel), and cost estimation.

## Further Reading

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
