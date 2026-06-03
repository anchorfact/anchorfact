---
id: llm-evaluation-terminal-bench-command-line-agent-benchmarks
title: 'LLM Evaluation Terminal-Bench Command-Line Agent Benchmarks'
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
  - id: fact-ai-llm-evaluation-terminal-bench-command-line-agent-benchmarks-1
    statement: >-
      The Terminal-Bench repository describes Terminal-Bench as a benchmark for
      testing AI agents in real terminal environments.
    source_title: Terminal-Bench GitHub Repository
    source_url: https://github.com/harbor-framework/terminal-bench
    confidence: medium
  - id: fact-ai-llm-evaluation-terminal-bench-command-line-agent-benchmarks-2
    statement: >-
      The Terminal-Bench repository says Terminal-Bench consists of a task
      dataset and an execution harness that connects a language model to a
      terminal sandbox.
    source_title: Terminal-Bench GitHub Repository
    source_url: https://github.com/harbor-framework/terminal-bench
    confidence: medium
  - id: fact-ai-llm-evaluation-terminal-bench-command-line-agent-benchmarks-3
    statement: >-
      The Terminal-Bench arXiv paper says Terminal-Bench 2.0 contains 89 tasks
      in computer terminal environments.
    source_title: Terminal-Bench arXiv Paper
    source_url: https://arxiv.org/abs/2601.11868
    confidence: medium
completeness: 0.82
known_gaps:
  - Terminal-agent benchmark interpretation depends on dataset version, sandbox image, agent adapter, tool access, time limits, number of attempts, pass criteria, contamination checks, hardware, concurrency, and whether leaderboard submissions use the same harness and task registry.
disputed_statements: []
primary_sources:
  - title: Terminal-Bench GitHub Repository
    type: repository
    year: 2026
    url: https://github.com/harbor-framework/terminal-bench
    institution: Harbor Framework
  - title: Terminal-Bench arXiv Paper
    type: academic_paper
    year: 2026
    url: https://arxiv.org/abs/2601.11868
    institution: arXiv
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Terminal-Bench evaluates agents on executable terminal tasks, making it useful for measuring real command-line work rather than only text answers.

## Core Explanation

Many agent benchmarks test final answers, but command-line agents need to edit files, run commands, inspect failures, and satisfy automated tests inside an environment. Terminal-Bench is relevant because the harness, task dataset, sandbox, and verification scripts are part of the evaluation surface.

Agents and eval systems should record benchmark version, task IDs, sandbox image, adapter, model, allowed tools, pass/fail tests, logs, retries, and resource limits. Without that metadata, a score is hard to reproduce or compare.

## Source-Mapped Facts

- The Terminal-Bench repository describes Terminal-Bench as a benchmark for testing AI agents in real terminal environments. ([source](https://github.com/harbor-framework/terminal-bench))
- The Terminal-Bench repository says Terminal-Bench consists of a task dataset and an execution harness that connects a language model to a terminal sandbox. ([source](https://github.com/harbor-framework/terminal-bench))
- The Terminal-Bench arXiv paper says Terminal-Bench 2.0 contains 89 tasks in computer terminal environments. ([source](https://arxiv.org/abs/2601.11868))

## Further Reading

- [Terminal-Bench GitHub Repository](https://github.com/harbor-framework/terminal-bench)
- [Terminal-Bench arXiv Paper](https://arxiv.org/abs/2601.11868)
