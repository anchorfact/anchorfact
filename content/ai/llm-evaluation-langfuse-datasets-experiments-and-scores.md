---
id: llm-evaluation-langfuse-datasets-experiments-and-scores
title: 'LLM Evaluation Langfuse Datasets Experiments and Scores'
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
  - id: fact-ai-llm-evaluation-langfuse-datasets-experiments-and-scores-1
    statement: >-
      Langfuse evaluation documentation describes datasets, dataset items,
      tasks, scores, and experiments as core building blocks for evaluation.
    source_title: Langfuse Evaluation Concepts
    source_url: https://langfuse.com/docs/evaluation/concepts
    confidence: medium
  - id: fact-ai-llm-evaluation-langfuse-datasets-experiments-and-scores-2
    statement: >-
      Langfuse evaluation documentation says evaluation methods can use dataset
      items and task outputs to produce scores based on user-defined criteria.
    source_title: Langfuse Evaluation Concepts
    source_url: https://langfuse.com/docs/evaluation/concepts
    confidence: medium
  - id: fact-ai-llm-evaluation-langfuse-datasets-experiments-and-scores-3
    statement: >-
      Langfuse evaluation documentation describes scores as the universal data
      object for storing evaluation results.
    source_title: Langfuse Scores Overview
    source_url: https://langfuse.com/docs/evaluation/scores/overview
    confidence: medium
  - id: fact-ai-llm-evaluation-langfuse-datasets-experiments-and-scores-4
    statement: >-
      Langfuse scores documentation says scores can be attached to traces,
      sessions, observations, or dataset runs.
    source_title: Langfuse Scores Overview
    source_url: https://langfuse.com/docs/evaluation/scores/overview
    confidence: medium
  - id: fact-ai-llm-evaluation-langfuse-datasets-experiments-and-scores-5
    statement: >-
      Langfuse experiments documentation says scores from dataset experiments
      are attached to the full dataset run for tracking overall experiment
      performance.
    source_title: Langfuse Experiments via SDK
    source_url: https://langfuse.com/docs/evaluation/experiments/experiments-via-sdk
    confidence: medium
completeness: 0.82
known_gaps:
  - Langfuse evaluation diagnosis depends on dataset version, dataset run identity, task function code, score configuration, evaluator implementation, trace linkage, prompt or model version, sampling, human annotation policy, and whether online trace scores are comparable to offline experiment scores.
disputed_statements: []
primary_sources:
  - title: Langfuse Evaluation Concepts
    type: documentation
    year: 2026
    url: https://langfuse.com/docs/evaluation/concepts
    institution: Langfuse
  - title: Langfuse Scores Overview
    type: documentation
    year: 2026
    url: https://langfuse.com/docs/evaluation/scores/overview
    institution: Langfuse
  - title: Langfuse Experiments via SDK
    type: documentation
    year: 2026
    url: https://langfuse.com/docs/evaluation/experiments/experiments-via-sdk
    institution: Langfuse
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Langfuse evaluation evidence lets agents connect datasets, dataset runs, tasks, traces, scores, and experiments before treating a score as a regression signal.

## Core Explanation

LLM evaluation systems often mix offline datasets with production traces. In Langfuse, agents should preserve whether a score came from a dataset experiment, a trace, a session, an observation, or a human annotation workflow.

Useful evidence includes dataset name and version, dataset item ID, experiment or run name, task code version, score name, score value, evaluator implementation, trace ID, prompt version, model version, and whether the result was produced offline or online.

## Source-Mapped Facts

- Langfuse evaluation documentation describes datasets, dataset items, tasks, scores, and experiments as core building blocks for evaluation. ([source](https://langfuse.com/docs/evaluation/concepts))
- Langfuse evaluation documentation says evaluation methods can use dataset items and task outputs to produce scores based on user-defined criteria. ([source](https://langfuse.com/docs/evaluation/concepts))
- Langfuse evaluation documentation describes scores as the universal data object for storing evaluation results. ([source](https://langfuse.com/docs/evaluation/scores/overview))
- Langfuse scores documentation says scores can be attached to traces, sessions, observations, or dataset runs. ([source](https://langfuse.com/docs/evaluation/scores/overview))
- Langfuse experiments documentation says scores from dataset experiments are attached to the full dataset run for tracking overall experiment performance. ([source](https://langfuse.com/docs/evaluation/experiments/experiments-via-sdk))

## Further Reading

- [Langfuse Evaluation Concepts](https://langfuse.com/docs/evaluation/concepts)
- [Langfuse Scores Overview](https://langfuse.com/docs/evaluation/scores/overview)
- [Langfuse Experiments via SDK](https://langfuse.com/docs/evaluation/experiments/experiments-via-sdk)
