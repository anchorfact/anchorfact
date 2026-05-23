---
id: "learned-database-systems"
title: "Learned Database Systems: AI-Driven Query Optimization, Learned Indexes, and Cardinality Estimation"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-learned-database-systems-1"
    statement: "Springer Frontiers of Computer Science (June 2025) published a comprehensive survey of learned database optimization techniques -- reviewing 150+ papers across learned cardinality estimation (MSCN, NeuroCard, BayesCard), learned cost models, learned join order selection (ReJOIN, Balsa, Neo), learned index structures (RMI, PGM-Index, CDFShop), and learned query optimizers (Bao, Neo) -- documenting that learned cardinality estimation with multi-set convolutional networks (MSCN) reduces Q-error (ratio of estimated to actual row count) from 100-1000x in traditional DBMS to 1.5-3x, transforming query plan quality."
    source_title: "Springer FCS (2025) -- Learning database optimization techniques: state-of-the-art review -- doi:10.1007/s11704-025-41116-7"
    source_url: "https://link.springer.com/article/10.1007/s11704-025-41116-7"
    confidence: "high"
  - id: "af-learned-database-systems-2"
    statement: "The Recursive Model Index (RMI, Kraska et al., 2018) demonstrated that learned index structures -- replacing B-trees with a hierarchy of simple neural models predicting data positions -- achieve 3x faster lookup while using 100x less memory for read-only workloads, spawning the field of learned data structures (learned Bloom filters, learned hash functions, PGM-index) and challenging the assumption that general-purpose data structures are always optimal."
    source_title: "Kraska et al., SIGMOD 2018 -- The Case for Learned Index Structures / PGM-Index (VLDB 2020) -- optimal learned index with error bounds"
    source_url: "https://arxiv.org/abs/1712.01208"
    confidence: "high"
primary_sources:
  - id: "ps-learned-database-systems-1"
    title: "Learning database optimization techniques: the state-of-the-art and future directions"
    type: "academic_paper"
    year: 2025
    institution: "Springer Frontiers of Computer Science"
    doi: "10.1007/s11704-025-41116-7"
    url: "https://link.springer.com/article/10.1007/s11704-025-41116-7"
  - id: "ps-learned-database-systems-2"
    title: "The Case for Learned Index Structures"
    type: "academic_paper"
    year: 2018
    institution: "SIGMOD / Google / MIT"
    url: "https://arxiv.org/abs/1712.01208"
known_gaps:
  - "Learned database components under updates -- maintaining learned models as data changes"
  - "Integration of learned components into production DBMS (PostgreSQL, MySQL) without breaking ACID guarantees"
disputed_statements: []
---

## TL;DR
Learned database systems replace decades of hand-tuned heuristics in databases with machine learning models. From learned indexes that replace B-trees with tiny neural networks to learned query optimizers that beat expert-designed cost models, AI is challenging the assumption that classical data structures and algorithms are always optimal for specific data distributions.

## Core Explanation
The insight driving learned databases: classical data structures (B-trees, hash tables, Bloom filters) are general-purpose -- they make no assumptions about data distribution. But real data has structure: employee IDs are sequential, timestamps increase monotonically, and certain values are far more common than others. Learned components exploit this: (1) Learned index: instead of B-tree log(N) search through internal nodes, train a small neural network that maps key -> approximate position. Given key k, model predicts position f(k); correct within error bounds; binary search in error range. The CDF (Cumulative Distribution Function) model: P(X <= k) * N approximates index position; (2) Learned cardinality estimation: given query "age > 30 AND city = Boston", estimate how many rows match. Traditional: histograms + independence assumption (wrong for correlated attributes). Learned: deep sets or GNNs model joint distribution from query workload; (3) Learned query optimizer: replace cost model with neural network predicting query latency; learned join ordering beats genetic algorithm heuristics.

## Detailed Analysis
RMI (Recursive Model Index): hierarchy of simple models. Stage 1 model: broad positioning; Stage 2: refinement. Bottom-level models predict exact positions. 3x faster than B-tree for read-only, 100x less memory. PGM-Index: provides worst-case error bounds and supports inserts. Cardinality estimation: MSCN (Multi-Set Convolutional Network) represents query predicates as sets, preserving permutation invariance. NeuroCard uses autoregressive models (NARU) over single-table sample, extending to multi-table via joins. Q-error < 3x vs. >100x for PostgreSQL. Learned query optimizers: Bao (Marcus et al., SIGMOD 2021) -- uses Thompson sampling bandit to select among existing optimizer-generated plans; learns per-query which PostgreSQL optimizer hint works best. Neo (Marcus et al., VLDB 2019) -- fully learned query optimizer using DNN for cost estimation + value iteration for plan search. Springer 2025 survey: the "last mile" challenge -- learned components work in research prototypes, integration into production DBMS (PostgreSQL, MySQL, Oracle) requires solving concurrency, crash recovery, and ACID compatibility. Recent progress: PostgreSQL hooks for learned cardinality; DuckDB's extensible optimizer enabling ML integration.
