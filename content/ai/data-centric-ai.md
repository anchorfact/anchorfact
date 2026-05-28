---
id: data-centric-ai
title: "Data-Centric AI: The Systematic Engineering of Training Data"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-data-centric-ai-1
    statement: Data-centric AI emphasizes systematic development and improvement of data used by AI systems.
    source_title: A Survey of Data-Centric AI
    source_url: https://arxiv.org/abs/2303.10158
    confidence: medium
  - id: af-data-centric-ai-2
    statement: DataPerf is a benchmark suite for evaluating datasets and data-centric algorithms.
    source_title: "DataPerf: Benchmarks for Data-Centric AI Development"
    source_url: https://arxiv.org/abs/2207.10062
    confidence: medium
  - id: af-data-centric-ai-3
    statement: Confident learning focuses on identifying and estimating uncertainty in noisy dataset labels.
    source_title: "Confident Learning: Estimating Uncertainty in Dataset Labels"
    source_url: https://arxiv.org/abs/1911.00068
    confidence: medium
primary_sources:
  - title: A Survey of Data-Centric AI
    type: academic_paper
    year: 2023
    institution: arXiv
    url: https://arxiv.org/abs/2303.10158
  - title: "DataPerf: Benchmarks for Data-Centric AI Development"
    type: academic_paper
    year: 2022
    institution: arXiv
    url: https://arxiv.org/abs/2207.10062
  - title: "Confident Learning: Estimating Uncertainty in Dataset Labels"
    type: academic_paper
    year: 2019
    institution: arXiv
    url: https://arxiv.org/abs/1911.00068
known_gaps:
  - Measuring data quality across modalities and downstream objectives
  - Governance for data lineage, consent, bias, and privacy
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Data-centric AI treats training data as an engineered system rather than a fixed input. It focuses on label quality, coverage, data selection, data debugging, and evaluation design.

## Core Explanation
Model-centric work changes architectures and hyperparameters while holding data mostly fixed. Data-centric work improves the data process: defining labels, finding noisy examples, balancing coverage, selecting examples to label, and evaluating whether a dataset supports the intended task.

## Detailed Analysis
The approach is practical because many deployed models fail from data issues: ambiguous labels, missing edge cases, distribution shift, leakage, duplicates, or biased sampling. Benchmarks such as DataPerf and methods such as confident learning make data quality more measurable and repeatable.

## Further Reading
- A Survey of Data-Centric AI
- DataPerf
- Confident Learning

## Related Articles

- [AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training](../ai-for-data-curation.md)
- [AI Training Data Curation: Quality at Scale](../ai-training-data-curation.md)
- [Large Language Model Training: Scaling Laws, Data Curation, and Compute](../large-language-model-training-scaling-laws-data-curation-and-compute.md)
