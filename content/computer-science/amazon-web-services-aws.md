---
id: "kb-2026-00151"



title: "Amazon Web Services (AWS)"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "AWS Documentation"
    type: "documentation"



    year: 2026
    url: "https://docs.aws.amazon.com/"


    institution: "Amazon"
    note: "Official AWS documentation covering 200+ services: EC2, S3, Lambda, DynamoDB, RDS, IAM"



secondary_sources:
  - title: "AWS Well-Architected Framework"
    type: "framework"



    year: 2024
    url: "https://aws.amazon.com/architecture/well-architected/"


    institution: "Amazon"
    note: "AWS's recommended architectural best practices: operational excellence, security, reliability, performance efficiency, cost optimization, sustainability"



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
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

AWS is the world's largest cloud provider, launched in 2006 with S3 and EC2. It offers 200+ services across compute, storage, database, ML, IoT, and serverless. AWS holds ~32% cloud market share (2025). Key services: EC2 (VMs), S3 (object storage), Lambda (serverless), DynamoDB (NoSQL), RDS (managed databases).

## Core Explanation

Regions (geographic area, e.g., us-east-1) and Availability Zones (isolated data centers within region). Free Tier includes 750 hours/month EC2 t2.micro for 12 months. IAM controls access via users, roles, policies. Infrastructure as Code: CloudFormation, CDK. AWS was named after the river — not literally 'Amazon Web Services' in other contexts.

## Further Reading

- [AWS Documentation](https://docs.aws.amazon.com/)
