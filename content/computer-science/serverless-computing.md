---
id:"kb-2026-00161"
title:"Serverless Computing"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"AWS Lambda Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.aws.amazon.com/lambda/"
    institution:"Amazon"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Serverless computing abstracts away server management — developers write and deploy functions; the cloud provider handles provisioning, scaling, and maintenance. Pay-per-request model (no idle cost). AWS Lambda (2014) pioneered the model; others: Azure Functions, Google Cloud Functions, Cloudflare Workers.

## Core Explanation

FaaS (Functions as a Service) is the core of serverless. Cold start: first invocation after idle period has latency penalty (provisioned concurrency mitigates). Stateless by design — state must be externalized (DynamoDB, S3). Event-driven: triggered by HTTP, S3 uploads, queue messages, cron schedules. Serverless is NOT 'no servers' — it's 'no servers YOU manage'.

## Further Reading

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
