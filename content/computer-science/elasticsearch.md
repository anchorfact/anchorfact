---
id:"kb-2026-00248"
title:"Elasticsearch"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Elasticsearch Documentation"
    type:"undefined"
    url:"undefined"
    institution:"Elastic"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. Released in 2010, it is the 'E' in the ELK Stack (Elasticsearch, Logstash, Kibana). Near real-time search, full-text querying, aggregations, and geospatial queries across massive datasets.

## Core Explanation

Index: logical namespace (like database). Documents: JSON objects (like rows). Inverted index: maps terms to documents — enables sub-second full-text search. Relevance scoring: TF-IDF or BM25. Aggregations: group and calculate metrics (SQL GROUP BY + COUNT/AVG). Sharding for horizontal scaling, replication for HA. Used by: Wikipedia, GitHub, Stack Overflow, Uber for search and analytics.

## Further Reading

- [Elasticsearch Documentation](undefined)
