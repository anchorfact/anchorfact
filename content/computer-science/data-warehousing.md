---
id:"kb-2026-00249"
title:"Data Warehousing"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"The Data Warehouse Toolkit (3rd Ed, Kimball & Ross)"
    type:"undefined"
    url:"undefined"
    institution:"Wiley"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A data warehouse is a centralized repository optimized for analytical queries (OLAP) rather than transactional operations (OLTP). Kimball methodology: star schema (fact tables + dimension tables). ETL (Extract-Transform-Load) pipelines populate the warehouse from operational systems. Columnar storage (Parquet, ORC) optimizes for analytics.

## Core Explanation

Star schema: central fact table (sales transactions) surrounded by dimension tables (date, product, customer). Slowly Changing Dimensions (SCD): how to handle historical changes (Type 1: overwrite, Type 2: add new row). Modern stack: Snowflake, BigQuery, Redshift (cloud-native). Data Lake: store raw data first (S3), transform later (ELT) — Databricks + Delta Lake.

## Further Reading

- [The Data Warehouse Toolkit (3rd Ed, Kimball & Ross)](undefined)
