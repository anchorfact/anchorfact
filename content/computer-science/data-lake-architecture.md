---
id:"kb-2026-00254"
title:"Data Lake Architecture"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"The Data Lakehouse Platform (Databricks)"
    type:"undefined"
    url:"undefined"
    institution:"Databricks"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A Data Lake is a centralized repository storing raw data in native format (Parquet, Avro, JSON) on cheap object storage (S3, ADLS). Schema-on-read: apply schema when querying, not when storing. Used for big data analytics, ML training, and data science. The Lakehouse architecture (Databricks, 2021) adds ACID transactions and data warehouse features on top of the data lake.

## Core Explanation

Lakehouse (Delta Lake, Iceberg, Hudi): ACID transactions on Parquet files in S3 — combine data lake flexibility with warehouse reliability. Bronze-Silver-Gold medallion architecture: Bronze (raw ingested data), Silver (cleaned, deduplicated), Gold (aggregated, business-ready). Query engines: Spark, Presto/Trino, Dremio. Time travel: query data as it existed at any point in time.

## Further Reading

- [The Data Lakehouse Platform (Databricks)](undefined)
