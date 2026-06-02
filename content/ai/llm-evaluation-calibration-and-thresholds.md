---
id: llm-evaluation-calibration-and-thresholds
title: 'LLM Evaluation Calibration and Thresholds'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-calibration-and-thresholds-1
    statement: >-
      scikit-learn documentation says well-calibrated classifiers output probabilities that match
      observed event frequencies.
    source_title: scikit-learn Probability Calibration
    source_url: https://scikit-learn.org/stable/modules/calibration.html
    confidence: medium
  - id: fact-ai-llm-evaluation-calibration-and-thresholds-2
    statement: >-
      Promptfoo documentation says eval returns exit code 100 when at least one test fails or when
      pass rate is below a configured threshold.
    source_title: Promptfoo Command Line
    source_url: https://www.promptfoo.dev/docs/usage/command-line/
    confidence: medium
  - id: fact-ai-llm-evaluation-calibration-and-thresholds-3
    statement: >-
      LangSmith documentation describes evaluators as functions that score application outputs.
    source_title: LangSmith Evaluation Concepts
    source_url: https://docs.langchain.com/langsmith/evaluation-concepts
    confidence: medium
completeness: 0.82
known_gaps:
  - LLM evaluation thresholds need task-specific cost, risk, sample size, and human review policy.
disputed_statements: []
primary_sources:
  - title: scikit-learn Probability Calibration
    type: documentation
    year: 2026
    url: https://scikit-learn.org/stable/modules/calibration.html
    institution: scikit-learn
  - title: Promptfoo Command Line
    type: documentation
    year: 2026
    url: https://www.promptfoo.dev/docs/usage/command-line/
    institution: Promptfoo
  - title: LangSmith Evaluation Concepts
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation-concepts
    institution: LangSmith
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Calibration and thresholds turn raw evaluation scores into release decisions that can be audited.

## Core Explanation

LLM evaluations often produce scores, labels, pass rates, or judge outputs. Those numbers are only useful when the team knows what threshold means "ship," "block," or "send to human review." Calibration asks whether a score behaves like its intended confidence or risk signal.

Agents should not treat a single aggregate score as universal truth. They should report the threshold, metric definition, sample size, failure examples, and whether the threshold was chosen before or after seeing the current results.

## Source-Mapped Facts

- scikit-learn documentation says well-calibrated classifiers output probabilities that match observed event frequencies. ([source](https://scikit-learn.org/stable/modules/calibration.html))
- Promptfoo documentation says eval returns exit code 100 when at least one test fails or when pass rate is below a configured threshold. ([source](https://www.promptfoo.dev/docs/usage/command-line/))
- LangSmith documentation describes evaluators as functions that score application outputs. ([source](https://docs.langchain.com/langsmith/evaluation-concepts))

## Further Reading

- [scikit-learn Probability Calibration](https://scikit-learn.org/stable/modules/calibration.html)
- [Promptfoo Command Line](https://www.promptfoo.dev/docs/usage/command-line/)
- [LangSmith Evaluation Concepts](https://docs.langchain.com/langsmith/evaluation-concepts)
