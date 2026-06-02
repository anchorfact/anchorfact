---
id: llm-evaluation-lm-eval-harness-task-yaml
title: 'LLM Evaluation lm-eval Harness Task YAML'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-lm-eval-harness-task-yaml-1
    statement: >-
      EleutherAI lm-evaluation-harness documentation describes the project as a
      framework that supports a wide range of zero-shot and few-shot evaluation
      tasks on autoregressive language models.
    source_title: lm-evaluation-harness New Task Guide
    source_url: https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md
    confidence: medium
  - id: fact-ai-llm-evaluation-lm-eval-harness-task-yaml-2
    statement: >-
      EleutherAI lm-evaluation-harness task documentation says YAML
      configuration files and the current codebase commit hash are intended to
      be shareable for replicating evaluation setup.
    source_title: lm-evaluation-harness Task Guide
    source_url: https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/task_guide.md
    confidence: medium
  - id: fact-ai-llm-evaluation-lm-eval-harness-task-yaml-3
    statement: >-
      EleutherAI lm-evaluation-harness interface documentation lists
      --check_integrity as running task test suite validation before evaluation.
    source_title: lm-evaluation-harness Interface
    source_url: https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/interface.md
    confidence: medium
completeness: 0.82
known_gaps:
  - Harness results depend on model adapter, prompt template, few-shot count, task YAML version, dataset version, cache state, answer extraction, metric implementation, code commit, and whether integrity checks were run.
disputed_statements: []
primary_sources:
  - title: lm-evaluation-harness New Task Guide
    type: documentation
    year: 2026
    url: https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md
    institution: EleutherAI
  - title: lm-evaluation-harness Task Guide
    type: documentation
    year: 2026
    url: https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/task_guide.md
    institution: EleutherAI
  - title: lm-evaluation-harness Interface
    type: documentation
    year: 2026
    url: https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/interface.md
    institution: EleutherAI
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

lm-eval task YAML and integrity checks make LLM benchmark runs easier for agents to reproduce and audit.

## Core Explanation

LLM benchmark results are only comparable when the task definition, prompt, model adapter, dataset, and code version are explicit. A harness task YAML can package much of that setup, while integrity checks reduce the risk of silent task breakage.

Agents should capture the task YAML path, harness commit, model adapter, few-shot setting, prompt text, dataset revision, metric, cache settings, and integrity-check status before citing a harness score.

## Source-Mapped Facts

- EleutherAI lm-evaluation-harness documentation describes the project as a framework that supports a wide range of zero-shot and few-shot evaluation tasks on autoregressive language models. ([source](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md))
- EleutherAI lm-evaluation-harness task documentation says YAML configuration files and the current codebase commit hash are intended to be shareable for replicating evaluation setup. ([source](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/task_guide.md))
- EleutherAI lm-evaluation-harness interface documentation lists --check_integrity as running task test suite validation before evaluation. ([source](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/interface.md))

## Further Reading

- [lm-evaluation-harness New Task Guide](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md)
- [lm-evaluation-harness Task Guide](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/task_guide.md)
- [lm-evaluation-harness Interface](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/interface.md)
