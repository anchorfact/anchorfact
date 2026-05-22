---
id:"kb-2026-00244"
title:"CAP Theorem"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)"
    type:"undefined"
    url:"undefined"
    institution:"ACM"
secondary_sources:
  - title: "BERT: Pre-training of Deep Bidirectional Transformers"
    authors: ["Devlin", "Chang", "Lee", "Toutanova"]
    type: "academic_paper"
    year: 2019
    doi: "10.48550/arXiv.1810.04805"
    url: "https://arxiv.org/abs/1810.04805"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

The CAP theorem (Eric Brewer, 2000; formally proven by Gilbert & Lynch, 2002) states: a distributed system can guarantee at most two of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network partitions). Since partitions are inevitable, you must choose between C and A.

## Core Explanation

CP systems (MongoDB, HBase, ZooKeeper): sacrifice availability during partition — some requests may timeout. AP systems (Cassandra, DynamoDB, CouchDB): sacrifice consistency — may serve stale data, resolve conflicts later. 'CA' systems are impossible in distributed context (partition is inevitable). PACELC extends CAP: if Partition, choose A or C; Else, choose Latency or Consistency.

## Further Reading

- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)](undefined)
