---
id: llm-evaluation-mle-bench-machine-learning-engineering
title: 'LLM Evaluation MLE-bench Machine Learning Engineering'
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
  - id: fact-ai-llm-evaluation-mle-bench-machine-learning-engineering-1
    statement: >-
      The OpenAI MLE-bench repository describes MLE-bench as a benchmark for
      measuring how well AI agents perform at machine learning engineering.
    source_title: OpenAI MLE-bench Repository
    source_url: https://github.com/openai/mle-bench
    confidence: medium
  - id: fact-ai-llm-evaluation-mle-bench-machine-learning-engineering-2
    statement: >-
      The OpenAI MLE-bench repository says it released code used to construct
      the dataset, evaluation logic, and evaluated agents.
    source_title: OpenAI MLE-bench Repository
    source_url: https://github.com/openai/mle-bench
    confidence: medium
  - id: fact-ai-llm-evaluation-mle-bench-machine-learning-engineering-3
    statement: >-
      The OpenReview page identifies the paper as MLE-bench: Evaluating Machine
      Learning Agents on Machine Learning Engineering.
    source_title: MLE-bench OpenReview Paper
    source_url: https://openreview.net/forum?id=6s5uXNWGIh
    confidence: medium
completeness: 0.82
known_gaps:
  - MLE-bench interpretation depends on competition selection, compute budgets, time limits, agent scaffolding, leakage controls, scoring scripts, submission comparability, and whether leaderboard submissions were produced under comparable conditions.
disputed_statements: []
primary_sources:
  - title: OpenAI MLE-bench Repository
    type: repository
    year: 2026
    url: https://github.com/openai/mle-bench
    institution: OpenAI
  - title: MLE-bench OpenReview Paper
    type: academic_paper
    year: 2025
    url: https://openreview.net/forum?id=6s5uXNWGIh
    institution: OpenReview
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

MLE-bench evaluates whether agents can do machine learning engineering work, not only answer static benchmark questions.

## Core Explanation

Machine learning engineering benchmarks need to exercise data handling, experimentation, model training, submission formatting, and score interpretation. MLE-bench is useful for agents because it connects performance to end-to-end competition-style engineering rather than isolated prompt responses.

Agents should report the competition split, runtime budget, environment, agent scaffold, code availability, grading report, and evaluation setup before comparing results.

## Source-Mapped Facts

- The OpenAI MLE-bench repository describes MLE-bench as a benchmark for measuring how well AI agents perform at machine learning engineering. ([source](https://github.com/openai/mle-bench))
- The OpenAI MLE-bench repository says it released code used to construct the dataset, evaluation logic, and evaluated agents. ([source](https://github.com/openai/mle-bench))
- The OpenReview page identifies the paper as MLE-bench: Evaluating Machine Learning Agents on Machine Learning Engineering. ([source](https://openreview.net/forum?id=6s5uXNWGIh))

## Further Reading

- [OpenAI MLE-bench Repository](https://github.com/openai/mle-bench)
- [MLE-bench OpenReview Paper](https://openreview.net/forum?id=6s5uXNWGIh)
