---
id:"kb-2026-00152"
title:"Infrastructure as Code (IaC)"
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
    note: "Declarative IaC: HCL language, state management, providers, modules, plan/apply workflow"
secondary_sources:
  - title: "Ansible: Up and Running (3rd Edition)"
    authors: ["Hochstein, Lorin", "Moser, Rene"]
    type: "book"
    year: 2022
    url: "https://www.oreilly.com/library/view/ansible-up-and/9781098109141/"
    institution: "O'Reilly"
    note: "Procedural IaC with Ansible: playbooks, roles, inventory — covers both configuration management and orchestration"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

IaC manages infrastructure through machine-readable definition files rather than manual configuration. Tools: Terraform (HCL, multi-cloud), Pulumi (general-purpose languages), CloudFormation (AWS-native), Ansible (configuration management). Version-controlled infrastructure enables reproducibility, code review, and automated testing.

## Core Explanation

Declarative (Terraform: define desired state) vs. imperative (Ansible: define steps). Terraform state file tracks real-world resources — must be stored securely (S3 + DynamoDB locking). Modules enable reusable infrastructure components. Plan phase shows changes before apply. State drift: when real infrastructure differs from state file.

## Further Reading

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
