---
id: llm-evaluation-slice-based-regression-analysis
title: 'LLM Evaluation Slice-Based Regression Analysis'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-07'
created_date: '2026-06-07'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-slice-based-regression-analysis-1
    statement: >-
      OpenAI Evals API documentation describes an evaluation as testing criteria plus a data
      source configuration that defines the schema of data used in the evaluation.
    source_title: OpenAI Evals API Reference
    source_url: https://platform.openai.com/docs/api-reference/evals
    confidence: medium
  - id: fact-ai-llm-evaluation-slice-based-regression-analysis-2
    statement: >-
      TensorFlow Model Analysis documentation describes slicing metrics to analyze model
      performance on more granular segments of an evaluation dataset.
    source_title: Introducing TensorFlow Model Analysis
    source_url: https://blog.tensorflow.org/2018/03/introducing-tensorflow-model-analysis.html
    confidence: medium
  - id: fact-ai-llm-evaluation-slice-based-regression-analysis-3
    statement: >-
      OpenAI's SWE-bench Verified announcement says released human annotations enable
      slicing the dataset by difficulty.
    source_title: Introducing SWE-bench Verified
    source_url: https://openai.com/index/introducing-swe-bench-verified/
    confidence: medium
completeness: 0.82
known_gaps:
  - Slice definitions can be unstable if labels, domains, user intents, or product policies change.
  - Slice-level regressions need enough sample size to distinguish real quality changes from noise.
disputed_statements: []
primary_sources:
  - title: OpenAI Evals API Reference
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/api-reference/evals
    institution: OpenAI
  - title: Introducing TensorFlow Model Analysis
    type: documentation
    year: 2018
    url: https://blog.tensorflow.org/2018/03/introducing-tensorflow-model-analysis.html
    institution: TensorFlow
  - title: Introducing SWE-bench Verified
    type: blog
    year: 2024
    url: https://openai.com/index/introducing-swe-bench-verified/
    institution: OpenAI
secondary_sources: []
updated: '2026-06-07'
ai_models:
  - gpt-5-codex
---

## TL;DR

Slice-based regression analysis checks whether an LLM system got worse for a specific task segment even when the aggregate eval score looks stable.

## Core Explanation

Aggregate scores hide failures. A model can improve on easy examples while regressing on long-context tasks, tool calls, refusals, multilingual prompts, specific customers, or high-value workflows. Slice-based analysis tags evaluation rows with dimensions such as task type, difficulty, source domain, policy category, language, and tool path.

Agents and evaluation pipelines should report both global score and slice deltas. A release should be blocked when a critical slice regresses beyond an agreed tolerance, even if the total score still passes.

## Source-Mapped Facts

- OpenAI Evals API documentation describes an evaluation as testing criteria plus a data source configuration that defines the schema of data used in the evaluation. ([source](https://platform.openai.com/docs/api-reference/evals))
- TensorFlow Model Analysis documentation describes slicing metrics to analyze model performance on more granular segments of an evaluation dataset. ([source](https://blog.tensorflow.org/2018/03/introducing-tensorflow-model-analysis.html))
- OpenAI's SWE-bench Verified announcement says released human annotations enable slicing the dataset by difficulty. ([source](https://openai.com/index/introducing-swe-bench-verified/))

## Further Reading

- [OpenAI Evals API Reference](https://platform.openai.com/docs/api-reference/evals)
- [Introducing TensorFlow Model Analysis](https://blog.tensorflow.org/2018/03/introducing-tensorflow-model-analysis.html)
- [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
