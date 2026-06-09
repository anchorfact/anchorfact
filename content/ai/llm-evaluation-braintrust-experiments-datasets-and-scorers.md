---
id: llm-evaluation-braintrust-experiments-datasets-and-scorers
title: 'LLM Evaluation Braintrust Experiments Datasets and Scorers'
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
  - id: fact-ai-llm-evaluation-braintrust-experiments-datasets-and-scorers-1
    statement: >-
      Braintrust evaluation documentation describes creating experiments by
      selecting prompts, workflows, or scorers to evaluate.
    source_title: Braintrust Create Experiments
    source_url: https://www.braintrust.dev/docs/evaluate/run-evaluations
    confidence: medium
  - id: fact-ai-llm-evaluation-braintrust-experiments-datasets-and-scorers-2
    statement: >-
      Braintrust evaluation documentation describes selecting an existing dataset
      from an organization when creating an experiment.
    source_title: Braintrust Create Experiments
    source_url: https://www.braintrust.dev/docs/evaluate/run-evaluations
    confidence: medium
  - id: fact-ai-llm-evaluation-braintrust-experiments-datasets-and-scorers-3
    statement: >-
      Braintrust evaluation documentation says local evaluations can be run
      without creating an experiment in Braintrust.
    source_title: Braintrust Create Experiments
    source_url: https://www.braintrust.dev/docs/evaluate/run-evaluations
    confidence: medium
  - id: fact-ai-llm-evaluation-braintrust-experiments-datasets-and-scorers-4
    statement: >-
      Braintrust scorer documentation describes LLM-as-a-judge and custom code
      scorers.
    source_title: Braintrust Scorers
    source_url: https://www.braintrust.dev/docs/evaluate/write-scorers
    confidence: medium
  - id: fact-ai-llm-evaluation-braintrust-experiments-datasets-and-scorers-5
    statement: >-
      Braintrust scorer documentation says scorers and classifiers are used to
      measure output quality.
    source_title: Braintrust Scorers
    source_url: https://www.braintrust.dev/docs/evaluate/write-scorers
    confidence: medium
completeness: 0.82
known_gaps:
  - Braintrust evaluation diagnosis depends on dataset version, prompt or workflow version, scorer implementation, judge model, local versus hosted run mode, sampling, authentication context, and whether failures were manually reviewed.
disputed_statements: []
primary_sources:
  - title: Braintrust Create Experiments
    type: documentation
    year: 2026
    url: https://www.braintrust.dev/docs/evaluate/run-evaluations
    institution: Braintrust
  - title: Braintrust Scorers
    type: documentation
    year: 2026
    url: https://www.braintrust.dev/docs/evaluate/write-scorers
    institution: Braintrust
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Braintrust evaluation evidence gives agents a way to connect datasets, experiments, prompts or workflows, and scorers before treating a pass rate as a regression signal.

## Core Explanation

LLM evaluation is only useful when the run is reproducible. In Braintrust-style workflows, agents should preserve the dataset, experiment name, evaluated prompt or workflow, scorer definitions, judge model, run mode, score outputs, and reviewed examples.

A failed score can come from the application, the dataset, the scorer, or the judge. Agents should compare experiment metadata and scorer configuration before changing prompts or retrieval code.

## Source-Mapped Facts

- Braintrust evaluation documentation describes creating experiments by selecting prompts, workflows, or scorers to evaluate. ([source](https://www.braintrust.dev/docs/evaluate/run-evaluations))
- Braintrust evaluation documentation describes selecting an existing dataset from an organization when creating an experiment. ([source](https://www.braintrust.dev/docs/evaluate/run-evaluations))
- Braintrust evaluation documentation says local evaluations can be run without creating an experiment in Braintrust. ([source](https://www.braintrust.dev/docs/evaluate/run-evaluations))
- Braintrust scorer documentation describes LLM-as-a-judge and custom code scorers. ([source](https://www.braintrust.dev/docs/evaluate/write-scorers))
- Braintrust scorer documentation says scorers and classifiers are used to measure output quality. ([source](https://www.braintrust.dev/docs/evaluate/write-scorers))

## Further Reading

- [Braintrust Create Experiments](https://www.braintrust.dev/docs/evaluate/run-evaluations)
- [Braintrust Scorers](https://www.braintrust.dev/docs/evaluate/write-scorers)
