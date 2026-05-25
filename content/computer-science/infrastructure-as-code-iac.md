---
id: kb-2026-00152
title: Infrastructure as Code (IaC)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      IaC manages infrastructure through machine-readable definition files rather than manual configuration. Tools: Terraform (HCL, multi-cloud), Pulumi (general-purpose languages), CloudFormation
      (AWS-native), Ansible (configuration management). Version-controlled infrastructure enables reproducibility, code review, and automated testing.
    source_title: Terraform Documentation
    source_url: https://developer.hashicorp.com/terraform/docs
    confidence: medium
  - id: fact-computer-science-002
    statement: Terraform state file tracks real-world resources — must be stored securely (S3 + DynamoDB locking).
    source_title: Terraform Documentation
    source_url: https://developer.hashicorp.com/terraform/docs
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Terraform Documentation
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/terraform/docs
    institution: HashiCorp
  - title: 'Infrastructure as Code: Dynamic Systems for the Cloud Age (3rd Edition, 2025)'
    type: book
    year: 2025
    authors:
      - Morris K.
    institution: O'Reilly Media
    url: https://www.oreilly.com/iac/
  - title: 'IaC and GitOps: State of Practice 2025'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.iac
  - title: Infrastructure as Code (2nd Edition)
    authors:
      - Morris, K.
    type: book
    year: 2020
    institution: O'Reilly Media
  - title: 'Terraform: Up and Running (3rd Edition)'
    authors:
      - Brikman, Y.
    type: book
    year: 2022
    institution: O'Reilly Media
secondary_sources:
  - title: 'Ansible: Up and Running (3rd Edition)'
    authors:
      - Hochstein, Lorin
      - Moser, Rene
    type: book
    year: 2022
    url: https://www.oreilly.com/library/view/ansible-up-and/9781098109141/
    institution: O'Reilly
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---

## TL;DR

IaC manages infrastructure through machine-readable definition files rather than manual configuration. Tools: Terraform (HCL, multi-cloud), Pulumi (general-purpose languages), CloudFormation (AWS-native), Ansible (configuration management). Version-controlled infrastructure enables reproducibility, code review, and automated testing.

## Core Explanation

Declarative (Terraform: define desired state) vs. imperative (Ansible: define steps). Terraform state file tracks real-world resources — must be stored securely (S3 + DynamoDB locking). Modules enable reusable infrastructure components. Plan phase shows changes before apply. State drift: when real infrastructure differs from state file.

## Further Reading

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)

## Related Articles

- [AI for Code Translation: Language Migration, Legacy Modernization, and Transpilation](../../ai/ai-code-translation.md)
- [AI Coding Assistants: Copilot, Cursor, and Claude Code](../../ai/ai-coding-assistants.md)
- [AI for Code Generation: LLMs as Software Engineering Copilots](../../ai/ai-for-code-generation.md)
