---
id: llm-evaluation-benchmark-harnesses-and-task-registries
title: 'LLM Evaluation Benchmark Harnesses and Task Registries'
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
  - id: fact-ai-llm-evaluation-benchmark-harnesses-and-task-registries-1
    statement: >-
      Hugging Face Evaluate documentation says evaluation modules are split into metrics,
      comparisons, and measurements.
    source_title: Hugging Face Evaluate Quick Tour
    source_url: https://huggingface.co/docs/evaluate/en/a_quick_tour
    confidence: medium
  - id: fact-ai-llm-evaluation-benchmark-harnesses-and-task-registries-2
    statement: >-
      LM Evaluation Harness documentation says aggregate metric configuration can use
      weight_by_size true for micro-averaging or false for macro-averaging.
    source_title: LM Evaluation Harness Groups and Benchmarks
    source_url: https://lm-evaluation-harness.readthedocs.io/writing_tasks/groups_and_benchmarks/
    confidence: medium
  - id: fact-ai-llm-evaluation-benchmark-harnesses-and-task-registries-3
    statement: >-
      HELM documentation says a run specification can include a scenario specification, adapter
      specification, metric specifications, and groups.
    source_title: CRFM HELM Code Structure
    source_url: https://crfm-helm.readthedocs.io/en/latest/code/
    confidence: medium
completeness: 0.83
known_gaps:
  - Benchmark harness results depend on task versions, prompt templates, model adapter, sampling parameters, dataset splits, metric aggregation, cached outputs, and whether the task registry commit is pinned.
disputed_statements: []
primary_sources:
  - title: Hugging Face Evaluate Quick Tour
    type: documentation
    year: 2026
    url: https://huggingface.co/docs/evaluate/en/a_quick_tour
    institution: Hugging Face
  - title: LM Evaluation Harness Groups and Benchmarks
    type: documentation
    year: 2026
    url: https://lm-evaluation-harness.readthedocs.io/writing_tasks/groups_and_benchmarks/
    institution: EleutherAI
  - title: CRFM HELM Code Structure
    type: documentation
    year: 2026
    url: https://crfm-helm.readthedocs.io/en/latest/code/
    institution: Stanford CRFM
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM benchmark results are only comparable when the harness, task registry, prompt format, adapter, split, and aggregation rule are part of the evidence.

## Core Explanation

Evaluation harnesses turn model outputs into metrics, but the harness configuration is part of the result. A leaderboard number without task version, prompt template, adapter, and aggregation policy is hard to reproduce and easy to misread.

Agents should capture the exact task identifier, harness version or commit, dataset split, metric module, macro versus micro aggregation, model adapter, decoding parameters, and any filtering pipeline applied before scoring.

## Source-Mapped Facts

- Hugging Face Evaluate documentation says evaluation modules are split into metrics, comparisons, and measurements. ([source](https://huggingface.co/docs/evaluate/en/a_quick_tour))
- LM Evaluation Harness documentation says aggregate metric configuration can use weight_by_size true for micro-averaging or false for macro-averaging. ([source](https://lm-evaluation-harness.readthedocs.io/writing_tasks/groups_and_benchmarks/))
- HELM documentation says a run specification can include a scenario specification, adapter specification, metric specifications, and groups. ([source](https://crfm-helm.readthedocs.io/en/latest/code/))

## Further Reading

- [Hugging Face Evaluate Quick Tour](https://huggingface.co/docs/evaluate/en/a_quick_tour)
- [LM Evaluation Harness Groups and Benchmarks](https://lm-evaluation-harness.readthedocs.io/writing_tasks/groups_and_benchmarks/)
- [CRFM HELM Code Structure](https://crfm-helm.readthedocs.io/en/latest/code/)
