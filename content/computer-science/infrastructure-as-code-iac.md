---
id: kb-2026-00152
title: Infrastructure as Code (IaC)
schema_type: TechArticle
category: computer-science
language: en
confidence: low
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-iac-1
    statement: >-
      Terraform uses configuration files to define infrastructure resources and manage
      infrastructure as code.
    source_title: What is Terraform?
    source_url: https://developer.hashicorp.com/terraform/intro
    confidence: low
  - id: fact-iac-2
    statement: AWS CloudFormation uses templates to model and provision AWS resources.
    source_title: What is AWS CloudFormation?
    source_url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
    confidence: low
  - id: fact-iac-3
    statement: Pulumi lets infrastructure be defined with general-purpose programming languages.
    source_title: Pulumi IaC Concepts
    source_url: https://www.pulumi.com/docs/iac/concepts/
    confidence: low
completeness: 0.88
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
disputed_statements: []
primary_sources:
  - title: What is Terraform?
    type: course_material
    year: 2025
    url: https://developer.hashicorp.com/terraform/intro
    institution: HashiCorp
  - title: What is AWS CloudFormation?
    type: course_material
    year: 2025
    url: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
    institution: Amazon Web Services
  - title: Pulumi IaC Concepts
    type: course_material
    year: 2025
    url: https://www.pulumi.com/docs/iac/concepts/
    institution: Pulumi
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Infrastructure as Code manages cloud and infrastructure resources through versioned configuration and templates. This repair maps IaC claims to Terraform, CloudFormation, and Pulumi sources.

## Core Explanation

The sampled article had low source coverage and generic dispute text. This version keeps three bounded facts about declarative configuration, templates, and general-purpose IaC programs.

## Further Reading

- [What is Terraform?](https://developer.hashicorp.com/terraform/intro)
- [What is AWS CloudFormation?](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
- [Pulumi IaC Concepts](https://www.pulumi.com/docs/iac/concepts/)
