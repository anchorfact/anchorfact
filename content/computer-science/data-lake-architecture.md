---
id: kb-2026-00254
title: Data Lake Architecture
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      A Data Lake is a centralized repository storing raw data in native format (Parquet, Avro, JSON) on cheap object storage (S3, ADLS). Schema-on-read: apply schema when querying, not when storing.
      Used for big data analytics, ML training, and data science. The Lakehouse architecture (Databricks, 2021) adds ACID transactions and data warehouse features
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Lakehouse (Delta Lake, Iceberg, Hudi): ACID transactions on Parquet files in S3 — combine data lake flexibility with warehouse reliability."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---


## TL;DR

A Data Lake is a centralized repository storing raw data in native format (Parquet, Avro, JSON) on cheap object storage (S3, ADLS). Schema-on-read: apply schema when querying, not when storing. Used for big data analytics, ML training, and data science. The Lakehouse architecture (Databricks, 2021) adds ACID transactions and data warehouse features on top of the data lake.

## Core Explanation

Lakehouse (Delta Lake, Iceberg, Hudi): ACID transactions on Parquet files in S3 — combine data lake flexibility with warehouse reliability. Bronze-Silver-Gold medallion architecture: Bronze (raw ingested data), Silver (cleaned, deduplicated), Gold (aggregated, business-ready). Query engines: Spark, Presto/Trino, Dremio. Time travel: query data as it existed at any point in time.

## Further Reading

- [The Data Lakehouse Platform (Databricks)](undefined)
