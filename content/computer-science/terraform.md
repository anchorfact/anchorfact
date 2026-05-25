---
id: "kb-2026-00164"
title: "Terraform"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Terraform by HashiCorp is the dominant Infrastructure as Code tool, using HCL to declaratively define and provision cloud resources across 3000+ providers"
    source_title: "Terraform Documentation"
    source_url: "https://developer.hashicorp.com/terraform/docs"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Terraform by HashiCorp is the dominant Infrastructure as Code tool, using HCL (HashiCorp Configuration Language) to declaratively define and provision cloud resources across 3000+ providers. State file tracks real-world resources; plan shows pending changes."
    source_title: "Terraform Documentation"
    source_url: "https://developer.hashicorp.com/terraform/docs"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Remote state (S3 + DynamoDB) for team collaboration and state locking."
    source_title: "Terraform Documentation"
    source_url: "https://developer.hashicorp.com/terraform/docs"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Terraform Cloud/Enterprise adds VCS integration, policy as code (Sentinel), and cost estimation."
    source_title: "Terraform Documentation"
    source_url: "https://developer.hashicorp.com/terraform/docs"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Terraform Documentation"
    type: "documentation"
    year: 2026
    url: "https://developer.hashicorp.com/terraform/docs"
    institution: "HashiCorp"

secondary_sources:
  - title: "Terraform: Up & Running (3rd Edition)"
    authors: ["Brikman, Yevgeniy"]
    type: "book"
    year: 2022
    url: "https://www.oreilly.com/library/view/terraform-up/9781098116736/"
    institution: "O'Reilly"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Terraform by HashiCorp is the dominant Infrastructure as Code tool, using HCL (HashiCorp Configuration Language) to declaratively define and provision cloud resources across 3000+ providers. State file tracks real-world resources; plan shows pending changes.

## Core Explanation

`terraform init` (download providers), `plan` (preview changes), `apply` (provision), `destroy` (teardown). Remote state (S3 + DynamoDB) for team collaboration and state locking. Modules enable reusable configuration. Workspaces isolate environments. Terraform Cloud/Enterprise adds VCS integration, policy as code (Sentinel), and cost estimation.

## Further Reading

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)

## Related Articles

- [Terraform State](../terraform-state.md)
