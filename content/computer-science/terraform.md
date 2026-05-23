---
id: "kb-2026-00164"



title: "Terraform"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



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



atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      Terraform by HashiCorp is the dominant Infrastructure as Code tool, using HCL to declaratively define and provision
      cloud resources across 3000+ providers
    source_title: Terraform Documentation
    source_url: https://developer.hashicorp.com/terraform/docs
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

Terraform by HashiCorp is the dominant Infrastructure as Code tool, using HCL (HashiCorp Configuration Language) to declaratively define and provision cloud resources across 3000+ providers. State file tracks real-world resources; plan shows pending changes.

## Core Explanation

`terraform init` (download providers), `plan` (preview changes), `apply` (provision), `destroy` (teardown). Remote state (S3 + DynamoDB) for team collaboration and state locking. Modules enable reusable configuration. Workspaces isolate environments. Terraform Cloud/Enterprise adds VCS integration, policy as code (Sentinel), and cost estimation.

## Further Reading

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
