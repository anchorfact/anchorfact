---
id: llm-evaluation-tau-bench-tool-agent-benchmarks
title: 'LLM Evaluation Tau-bench Tool-Agent Benchmarks'
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
  - id: fact-ai-llm-evaluation-tau-bench-tool-agent-benchmarks-1
    statement: >-
      The tau-bench paper describes tau-bench as a benchmark for tool-agent-user
      interaction in real-world domains.
    source_title: tau-bench Paper
    source_url: https://arxiv.org/abs/2406.12045
    confidence: medium
  - id: fact-ai-llm-evaluation-tau-bench-tool-agent-benchmarks-2
    statement: >-
      The tau-bench paper says tool agents must interact with both a user and
      tools to solve tasks.
    source_title: tau-bench Paper
    source_url: https://arxiv.org/abs/2406.12045
    confidence: medium
  - id: fact-ai-llm-evaluation-tau-bench-tool-agent-benchmarks-3
    statement: >-
      The tau-bench repository describes tau-bench as a benchmark for AI agents
      in dynamic conversations with users and tool calls.
    source_title: tau-bench Repository
    source_url: https://github.com/sierra-research/tau-bench
    confidence: medium
completeness: 0.82
known_gaps:
  - Tau-bench interpretation depends on environment version, tool schemas, user simulator behavior, task domains, pass criteria, random seeds, model tool-call format, retry policy, and whether evaluations use the same prompts as reported baselines.
disputed_statements: []
primary_sources:
  - title: tau-bench Paper
    type: paper
    year: 2024
    url: https://arxiv.org/abs/2406.12045
    institution: arXiv
  - title: tau-bench Repository
    type: repository
    year: 2026
    url: https://github.com/sierra-research/tau-bench
    institution: Sierra Research
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Tau-bench evaluates tool agents in interactive user conversations where success depends on both tool calls and dialogue state.

## Core Explanation

Many tool-use evaluations are single-turn function-call tests. Tau-bench is useful for agent readiness because it includes a user interaction loop and domain tools, so failures can come from policy interpretation, slot filling, tool arguments, or conversation recovery.

Agents should treat tau-bench scores as environment-specific evidence and preserve domain version, task ID, user simulator, tool schema, prompts, seeds, and grader configuration when comparing runs.

## Source-Mapped Facts

- The tau-bench paper describes tau-bench as a benchmark for tool-agent-user interaction in real-world domains. ([source](https://arxiv.org/abs/2406.12045))
- The tau-bench paper says tool agents must interact with both a user and tools to solve tasks. ([source](https://arxiv.org/abs/2406.12045))
- The tau-bench repository describes tau-bench as a benchmark for AI agents in dynamic conversations with users and tool calls. ([source](https://github.com/sierra-research/tau-bench))

## Further Reading

- [tau-bench Paper](https://arxiv.org/abs/2406.12045)
- [tau-bench Repository](https://github.com/sierra-research/tau-bench)
