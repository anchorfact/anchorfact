---
id: llm-evaluation-ab-tests-and-online-experiments
title: 'LLM Evaluation A/B Tests and Online Experiments'
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
  - id: fact-ai-llm-evaluation-ab-tests-and-online-experiments-1
    statement: >-
      statsmodels proportions_ztest documentation describes a test for proportions based on the
      normal z test.
    source_title: statsmodels proportions_ztest
    source_url: https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportions_ztest.html
    confidence: medium
  - id: fact-ai-llm-evaluation-ab-tests-and-online-experiments-2
    statement: >-
      statsmodels TTestIndPower.solve_power documentation describes solving one parameter for power
      of a two-sample t-test.
    source_title: statsmodels TTestIndPower.solve_power
    source_url: https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestIndPower.solve_power.html
    confidence: medium
  - id: fact-ai-llm-evaluation-ab-tests-and-online-experiments-3
    statement: >-
      SciPy false_discovery_control documentation says the function adjusts p-values to control the
      false discovery rate.
    source_title: SciPy false_discovery_control
    source_url: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.false_discovery_control.html
    confidence: medium
completeness: 0.81
known_gaps:
  - Online LLM experiments depend on traffic assignment, guardrail metrics, novelty effects, interference between users, repeated measures, metric latency, privacy filtering, and whether model changes affect only one treatment.
disputed_statements: []
primary_sources:
  - title: statsmodels proportions_ztest
    type: documentation
    year: 2026
    url: https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportions_ztest.html
    institution: statsmodels
  - title: statsmodels TTestIndPower.solve_power
    type: documentation
    year: 2026
    url: https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestIndPower.solve_power.html
    institution: statsmodels
  - title: SciPy false_discovery_control
    type: documentation
    year: 2026
    url: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.false_discovery_control.html
    institution: SciPy
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM A/B tests should report assignment, metric definitions, sample size, power, and multiple-testing policy before a model or prompt variant is declared better.

## Core Explanation

Offline evaluations are controlled but incomplete. Online experiments show how a model behaves with real users, traffic, latency, costs, and guardrails. The same experiment can be misleading if the sample is underpowered, the metric is delayed, or many slices are checked without controlling false discoveries.

Agents reviewing an online LLM experiment should collect treatment labels, model and prompt versions, exposure counts, primary metric, guardrail metrics, exclusion rules, statistical test, power assumption, and rollback thresholds.

## Source-Mapped Facts

- statsmodels proportions_ztest documentation describes a test for proportions based on the normal z test. ([source](https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportions_ztest.html))
- statsmodels TTestIndPower.solve_power documentation describes solving one parameter for power of a two-sample t-test. ([source](https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestIndPower.solve_power.html))
- SciPy false_discovery_control documentation says the function adjusts p-values to control the false discovery rate. ([source](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.false_discovery_control.html))

## Further Reading

- [statsmodels proportions_ztest](https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportions_ztest.html)
- [statsmodels TTestIndPower.solve_power](https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestIndPower.solve_power.html)
- [SciPy false_discovery_control](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.false_discovery_control.html)
