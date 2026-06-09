---
id: llm-evaluation-weave-evaluations-and-scorers
title: 'LLM Evaluation Weave Evaluations and Scorers'
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
  - id: fact-ai-llm-evaluation-weave-evaluations-and-scorers-1
    statement: >-
      Weights & Biases Weave documentation describes evaluations as a way to
      systematically assess AI application performance.
    source_title: Weave Evaluations
    source_url: https://docs.wandb.ai/weave/guides/core-types/evaluations
    confidence: medium
  - id: fact-ai-llm-evaluation-weave-evaluations-and-scorers-2
    statement: >-
      Weave evaluation documentation says an evaluation includes a dataset,
      scorers, and a model or function to evaluate.
    source_title: Weave Evaluations
    source_url: https://docs.wandb.ai/weave/guides/core-types/evaluations
    confidence: medium
  - id: fact-ai-llm-evaluation-weave-evaluations-and-scorers-3
    statement: >-
      Weave evaluation documentation says evaluation results can be inspected
      in the Weave UI.
    source_title: Weave Evaluations
    source_url: https://docs.wandb.ai/weave/guides/core-types/evaluations
    confidence: medium
  - id: fact-ai-llm-evaluation-weave-evaluations-and-scorers-4
    statement: >-
      Weave scorer documentation describes scorers as functions or classes that
      evaluate model outputs and return metrics.
    source_title: Weave Scorers
    source_url: https://docs.wandb.ai/weave/guides/evaluation/scorers
    confidence: medium
  - id: fact-ai-llm-evaluation-weave-evaluations-and-scorers-5
    statement: >-
      Weave scorer documentation says scorers can return dictionaries to log
      multiple metrics for one example.
    source_title: Weave Scorers
    source_url: https://docs.wandb.ai/weave/guides/evaluation/scorers
    confidence: medium
completeness: 0.82
known_gaps:
  - Weave evaluation diagnosis depends on dataset version, scorer implementation, model function version, trace capture, metric aggregation, UI run selection, async execution behavior, and whether human or model-graded scorers are calibrated against examples.
disputed_statements: []
primary_sources:
  - title: Weave Evaluations
    type: documentation
    year: 2026
    url: https://docs.wandb.ai/weave/guides/core-types/evaluations
    institution: Weights & Biases
  - title: Weave Scorers
    type: documentation
    year: 2026
    url: https://docs.wandb.ai/weave/guides/evaluation/scorers
    institution: Weights & Biases
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Weave evaluation evidence helps agents connect datasets, scorer definitions, model functions, traces, and metric outputs into a reproducible LLM evaluation run.

## Core Explanation

LLM evaluation can look like a single score, but the score is produced by a dataset, a model or application function, and one or more scorers. If any of those change, the result is not directly comparable to a prior run.

Agents should preserve dataset identifiers, scorer code, metric names, model function version, input and output columns, run URL, trace IDs, and UI result links. This makes it possible to tell whether a regression came from the model, prompt, scorer, dataset, or evaluation wiring.

## Source-Mapped Facts

- Weights & Biases Weave documentation describes evaluations as a way to systematically assess AI application performance. ([source](https://docs.wandb.ai/weave/guides/core-types/evaluations))
- Weave evaluation documentation says an evaluation includes a dataset, scorers, and a model or function to evaluate. ([source](https://docs.wandb.ai/weave/guides/core-types/evaluations))
- Weave evaluation documentation says evaluation results can be inspected in the Weave UI. ([source](https://docs.wandb.ai/weave/guides/core-types/evaluations))
- Weave scorer documentation describes scorers as functions or classes that evaluate model outputs and return metrics. ([source](https://docs.wandb.ai/weave/guides/evaluation/scorers))
- Weave scorer documentation says scorers can return dictionaries to log multiple metrics for one example. ([source](https://docs.wandb.ai/weave/guides/evaluation/scorers))

## Further Reading

- [Weave Evaluations](https://docs.wandb.ai/weave/guides/core-types/evaluations)
- [Weave Scorers](https://docs.wandb.ai/weave/guides/evaluation/scorers)
