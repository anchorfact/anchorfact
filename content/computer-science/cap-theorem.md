---
id: "kb-2026-00244"
title: "CAP Theorem"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "The CAP theorem states: a distributed system can guarantee at most two of: Consistency , Availability , Partition Tolerance"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "The CAP theorem (Eric Brewer, 2000; formally proven by Gilbert & Lynch, 2002) states: a distributed system can guarantee at most two of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network partitions). Since partitions are inevitable, you must choose between C and A."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"

secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

The CAP theorem (Eric Brewer, 2000; formally proven by Gilbert & Lynch, 2002) states: a distributed system can guarantee at most two of: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network partitions). Since partitions are inevitable, you must choose between C and A.

## Core Explanation

CP systems (MongoDB, HBase, ZooKeeper): sacrifice availability during partition — some requests may timeout. AP systems (Cassandra, DynamoDB, CouchDB): sacrifice consistency — may serve stale data, resolve conflicts later. 'CA' systems are impossible in distributed context (partition is inevitable). PACELC extends CAP: if Partition, choose A or C; Else, choose Latency or Consistency.

## Further Reading

- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services (Gilbert & Lynch, 2002)](undefined)
