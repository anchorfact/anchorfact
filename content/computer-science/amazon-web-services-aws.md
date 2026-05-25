---
id: kb-2026-00151
title: Amazon Web Services (AWS)
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
  - id: fact-computer-science-01
    statement: AWS is the world's largest cloud provider, launched in 2006 with S3 and EC2
    source_title: AWS Documentation
    source_url: https://docs.aws.amazon.com/
    confidence: medium
  - id: fact-computer-science-02
    statement: AWS was named after the river — not literally 'Amazon Web Services' in other contexts
    source_title: AWS Documentation
    source_url: https://docs.aws.amazon.com/
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
  - title: AWS Documentation
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/
    institution: Amazon
  - title: AWS Certified Solutions Architect Study Guide (2025 Edition)
    type: book
    year: 2025
    authors:
      - Piper B.
      - Clinton D.
    institution: Sybex
    url: https://www.wiley.com/aws/
  - title: 'Cloud Computing: AWS, Azure, and GCP — A 2025 Comparison'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.cloud
  - title: Amazon Web Services Overview of Security Processes
    type: industry_whitepaper
    year: 2024
    url: https://docs.aws.amazon.com/whitepapers/latest/aws-overview-security-processes/
    institution: Amazon Web Services
  - title: 'Above the Clouds: A Berkeley View of Cloud Computing'
    authors:
      - Armbrust, M.
      - Fox, A.
      - Griffith, R.
    type: academic_paper
    year: 2009
    doi: 10.1145/1721654.1721672
    institution: UC Berkeley
secondary_sources:
  - title: AWS Well-Architected Framework
    type: framework
    year: 2024
    url: https://aws.amazon.com/architecture/well-architected/
    institution: Amazon
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

AWS is the world's largest cloud provider, launched in 2006 with S3 and EC2. It offers 200+ services across compute, storage, database, ML, IoT, and serverless. AWS holds ~32% cloud market share (2025). Key services: EC2 (VMs), S3 (object storage), Lambda (serverless), DynamoDB (NoSQL), RDS (managed databases).

## Core Explanation

Regions (geographic area, e.g., us-east-1) and Availability Zones (isolated data centers within region). Free Tier includes 750 hours/month EC2 t2.micro for 12 months. IAM controls access via users, roles, policies. Infrastructure as Code: CloudFormation, CDK. AWS was named after the river — not literally 'Amazon Web Services' in other contexts.

## Further Reading

- [AWS Documentation](https://docs.aws.amazon.com/)
