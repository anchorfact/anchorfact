---
id: evaluation-data-contamination
title: 'Evaluation Data Contamination'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-evaluation-data-contamination-1
    statement: >-
      The Microsoft MMLU-CF repository describes MMLU-CF as a contamination-free multi-task language understanding benchmark.
    source_title: MMLU-CF
    source_url: https://github.com/microsoft/MMLU-CF
  - id: fact-evaluation-data-contamination-2
    statement: >-
      The LiveBench repository describes LiveBench as a challenging, contamination-free LLM benchmark.
    source_title: LiveBench
    source_url: https://github.com/livebench/livebench
  - id: fact-evaluation-data-contamination-3
    statement: >-
      The CLEAN-EVAL paper page describes a method for clean evaluation on contaminated large language models.
    source_title: CLEAN-EVAL - ACL Anthology
    source_url: https://aclanthology.org/2024.findings-naacl.53/
completeness: 0.82
known_gaps:
  - Contamination detection is benchmark-specific and can miss paraphrased, translated, or indirectly leaked test items.
disputed_statements: []
primary_sources:
  - title: MMLU-CF
    type: code_repository
    year: 2025
    url: https://github.com/microsoft/MMLU-CF
    institution: Microsoft
  - title: LiveBench
    type: code_repository
    year: 2024
    url: https://github.com/livebench/livebench
    institution: LiveBench
  - title: CLEAN-EVAL - ACL Anthology
    type: research_paper
    year: 2024
    url: https://aclanthology.org/2024.findings-naacl.53/
    institution: Association for Computational Linguistics
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Evaluation data contamination occurs when benchmark questions, answers, or close variants appear in training or tuning data, making evaluation scores look better than real generalization.

## Core Explanation

LLM benchmarks are often public, copied, discussed, and reused. If test items leak into pretraining, fine-tuning, or prompt-selection loops, a model may memorize the benchmark instead of solving the task.

Mitigations include private test sets, time-split benchmarks, live or frequently refreshed questions, contamination scans, exact and near-duplicate filters, and reporting known exposure risks. Evaluation reports should separate clean benchmark evidence from metrics that may be contaminated.

## Source-Mapped Facts

- The Microsoft MMLU-CF repository describes MMLU-CF as a contamination-free multi-task language understanding benchmark. ([source](https://github.com/microsoft/MMLU-CF))
- The LiveBench repository describes LiveBench as a challenging, contamination-free LLM benchmark. ([source](https://github.com/livebench/livebench))
- The CLEAN-EVAL paper page describes a method for clean evaluation on contaminated large language models. ([source](https://aclanthology.org/2024.findings-naacl.53/))

## Further Reading

- [MMLU-CF](https://github.com/microsoft/MMLU-CF)
- [LiveBench](https://github.com/livebench/livebench)
- [CLEAN-EVAL](https://aclanthology.org/2024.findings-naacl.53/)
