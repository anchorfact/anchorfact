---
id: llm-evaluation-inspect-ai-tasks-and-scorers
title: 'LLM Evaluation Inspect AI Tasks and Scorers'
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
  - id: fact-ai-llm-evaluation-inspect-ai-tasks-and-scorers-1
    statement: >-
      Inspect AI documentation says tasks provide a recipe for an evaluation
      consisting minimally of a dataset, a solver, and a scorer.
    source_title: Inspect AI Tasks
    source_url: https://inspect.aisi.org.uk/tasks.html
    confidence: medium
  - id: fact-ai-llm-evaluation-inspect-ai-tasks-and-scorers-2
    statement: >-
      Inspect AI documentation says tasks are returned from functions decorated
      with @task.
    source_title: Inspect AI Tasks
    source_url: https://inspect.aisi.org.uk/tasks.html
    confidence: medium
  - id: fact-ai-llm-evaluation-inspect-ai-tasks-and-scorers-3
    statement: >-
      Inspect AI documentation says the Sample data type has a required input
      field and optional fields such as choices, target, id, and metadata.
    source_title: Inspect AI Datasets
    source_url: https://inspect.aisi.org.uk/datasets.html
    confidence: medium
  - id: fact-ai-llm-evaluation-inspect-ai-tasks-and-scorers-4
    statement: >-
      Inspect AI documentation says Inspect includes both text matching scorers
      and model graded scorers.
    source_title: Inspect AI Standard Scorers
    source_url: https://inspect.aisi.org.uk/standard-scorers.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Inspect AI result diagnosis depends on task version, dataset sample IDs, solver chain, model provider, sandbox configuration, scorer choice, model grader prompt, metadata, trace logs, retries, and whether samples require tools or external environments.
disputed_statements: []
primary_sources:
  - title: Inspect AI Tasks
    type: documentation
    year: 2026
    url: https://inspect.aisi.org.uk/tasks.html
    institution: UK AI Security Institute
  - title: Inspect AI Datasets
    type: documentation
    year: 2026
    url: https://inspect.aisi.org.uk/datasets.html
    institution: UK AI Security Institute
  - title: Inspect AI Standard Scorers
    type: documentation
    year: 2026
    url: https://inspect.aisi.org.uk/standard-scorers.html
    institution: UK AI Security Institute
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Inspect AI task evidence tells agents how an LLM evaluation is assembled: what samples were run, which solver generated answers, and which scorer judged them.

## Core Explanation

An LLM evaluation is hard to debug when the result is just a pass rate. Inspect AI makes the operational pieces explicit: task, dataset, sample fields, solver, scorer, model, and logs. That structure helps agents distinguish prompt failures, solver failures, grading failures, and dataset coverage gaps.

Agents should inspect task code, sample IDs, input and target fields, solver chain, scorer type, model grader configuration, sandbox settings, run logs, and per-sample scores before changing prompts or declaring a model regression.

## Source-Mapped Facts

- Inspect AI documentation says tasks provide a recipe for an evaluation consisting minimally of a dataset, a solver, and a scorer. ([source](https://inspect.aisi.org.uk/tasks.html))
- Inspect AI documentation says tasks are returned from functions decorated with @task. ([source](https://inspect.aisi.org.uk/tasks.html))
- Inspect AI documentation says the Sample data type has a required input field and optional fields such as choices, target, id, and metadata. ([source](https://inspect.aisi.org.uk/datasets.html))
- Inspect AI documentation says Inspect includes both text matching scorers and model graded scorers. ([source](https://inspect.aisi.org.uk/standard-scorers.html))

## Further Reading

- [Inspect AI Tasks](https://inspect.aisi.org.uk/tasks.html)
- [Inspect AI Datasets](https://inspect.aisi.org.uk/datasets.html)
- [Inspect AI Standard Scorers](https://inspect.aisi.org.uk/standard-scorers.html)
