---
id: llm-evaluation-phoenix-datasets-and-experiments
title: 'LLM Evaluation Phoenix Datasets and Experiments'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-phoenix-datasets-and-experiments-1
    statement: >-
      Phoenix documentation says datasets are structured collections of
      representative examples used to systematically test an application.
    source_title: Phoenix Datasets and Experiments
    source_url: https://arize.com/docs/phoenix/datasets-and-experiments
    confidence: medium
  - id: fact-ai-llm-evaluation-phoenix-datasets-and-experiments-2
    statement: >-
      Phoenix documentation says each dataset example can capture application
      input, expected output, and metadata such as tags, error types, or model
      parameters.
    source_title: Phoenix Datasets and Experiments
    source_url: https://arize.com/docs/phoenix/datasets-and-experiments
    confidence: medium
  - id: fact-ai-llm-evaluation-phoenix-datasets-and-experiments-3
    statement: >-
      Phoenix experiment documentation says experiments execute a task across
      all dataset examples and collect evaluation results.
    source_title: Phoenix Experiments
    source_url: https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments
    confidence: medium
  - id: fact-ai-llm-evaluation-phoenix-datasets-and-experiments-4
    statement: >-
      Phoenix experiment documentation describes LLM evaluators and code
      evaluators as options for scoring task outputs.
    source_title: Phoenix Experiments
    source_url: https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments
    confidence: medium
  - id: fact-ai-llm-evaluation-phoenix-datasets-and-experiments-5
    statement: >-
      Phoenix experiment documentation says repetitions run tasks multiple
      times to measure variance and consistency.
    source_title: Phoenix Experiments
    source_url: https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments
    confidence: medium
completeness: 0.82
known_gaps:
  - Phoenix evaluation diagnosis depends on dataset version, example schema, reference outputs, evaluator prompt or code, model settings, repetitions, splits, trace linkage, metadata slices, human review policy, and whether scores are comparable across application versions.
disputed_statements: []
primary_sources:
  - title: Phoenix Datasets and Experiments
    type: documentation
    year: 2026
    url: https://arize.com/docs/phoenix/datasets-and-experiments
    institution: Arize Phoenix
  - title: Phoenix Experiments
    type: documentation
    year: 2026
    url: https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments
    institution: Arize Phoenix
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Phoenix datasets and experiments give LLM evaluation agents a concrete unit of comparison: examples, task outputs, evaluator scores, repetitions, and metadata slices.

## Core Explanation

LLM application changes are easy to misjudge from a handful of transcripts. Phoenix treats datasets as the test cases that matter and experiments as repeatable runs over those examples. That lets agents compare prompts, models, retrievers, and tool logic with structured scores instead of anecdotal impressions.

Agents should preserve dataset name, dataset version, example IDs, inputs, expected outputs, metadata, application version, evaluator configuration, repetitions, score distribution, and linked traces. Without those fields, a score change cannot be separated from dataset drift or evaluator drift.

## Source-Mapped Facts

- Phoenix documentation says datasets are structured collections of representative examples used to systematically test an application. ([source](https://arize.com/docs/phoenix/datasets-and-experiments))
- Phoenix documentation says each dataset example can capture application input, expected output, and metadata such as tags, error types, or model parameters. ([source](https://arize.com/docs/phoenix/datasets-and-experiments))
- Phoenix experiment documentation says experiments execute a task across all dataset examples and collect evaluation results. ([source](https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments))
- Phoenix experiment documentation describes LLM evaluators and code evaluators as options for scoring task outputs. ([source](https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments))
- Phoenix experiment documentation says repetitions run tasks multiple times to measure variance and consistency. ([source](https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments))

## Further Reading

- [Phoenix Datasets and Experiments](https://arize.com/docs/phoenix/datasets-and-experiments)
- [Phoenix Experiments](https://arize.com/docs/phoenix/datasets-and-experiments/how-to-experiments)
