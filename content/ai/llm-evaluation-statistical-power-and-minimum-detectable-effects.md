---
id: llm-evaluation-statistical-power-and-minimum-detectable-effects
title: 'LLM Evaluation Statistical Power and Minimum Detectable Effects'
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
  - id: fact-ai-llm-evaluation-statistical-power-and-minimum-detectable-effects-1
    statement: >-
      statsmodels documentation says the power module implements power and sample-size calculations
      for t-tests, normal-based tests, F-tests, and chi-square goodness-of-fit tests.
    source_title: statsmodels Statistics
    source_url: https://www.statsmodels.org/stable/stats.html
    confidence: medium
  - id: fact-ai-llm-evaluation-statistical-power-and-minimum-detectable-effects-2
    statement: >-
      statsmodels TTestPower.solve_power can solve for one parameter of the power of a one-sample
      t-test and can also be used for a paired t-test.
    source_title: statsmodels TTestPower.solve_power
    source_url: https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestPower.solve_power.html
    confidence: medium
  - id: fact-ai-llm-evaluation-statistical-power-and-minimum-detectable-effects-3
    statement: >-
      SciPy ttest_rel calculates a t-test for two related samples and tests whether their average
      expected values are identical.
    source_title: SciPy ttest_rel
    source_url: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_rel.html
    confidence: medium
completeness: 0.8
known_gaps:
  - LLM evaluation power analysis depends on metric distribution, paired versus unpaired design, stratification, multiple comparisons, flaky examples, judge variance, non-normal score distributions, and business-defined minimum meaningful change.
disputed_statements: []
primary_sources:
  - title: statsmodels Statistics
    type: documentation
    year: 2026
    url: https://www.statsmodels.org/stable/stats.html
    institution: statsmodels
  - title: statsmodels TTestPower.solve_power
    type: documentation
    year: 2026
    url: https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestPower.solve_power.html
    institution: statsmodels
  - title: SciPy ttest_rel
    type: documentation
    year: 2026
    url: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_rel.html
    institution: SciPy
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM eval reports should state whether the sample is large enough to detect the quality change the team actually cares about.

## Core Explanation

A small eval set can catch catastrophic regressions, but it may be too underpowered to distinguish a real improvement from noise. Statistical power connects effect size, sample size, significance threshold, and the probability of detecting a true effect.

For LLM systems, paired designs are often stronger because the same examples can be run through a baseline and candidate. Agents reviewing eval results should ask for the minimum detectable effect, sample count, metric definition, confidence interval, paired-test choice, and whether repeated judge calls or stochastic model outputs were averaged or controlled.

## Source-Mapped Facts

- statsmodels documentation says the power module implements power and sample-size calculations for t-tests, normal-based tests, F-tests, and chi-square goodness-of-fit tests. ([source](https://www.statsmodels.org/stable/stats.html))
- statsmodels TTestPower.solve_power can solve for one parameter of the power of a one-sample t-test and can also be used for a paired t-test. ([source](https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestPower.solve_power.html))
- SciPy ttest_rel calculates a t-test for two related samples and tests whether their average expected values are identical. ([source](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_rel.html))

## Further Reading

- [statsmodels Statistics](https://www.statsmodels.org/stable/stats.html)
- [statsmodels TTestPower.solve_power](https://www.statsmodels.org/stable/generated/statsmodels.stats.power.TTestPower.solve_power.html)
- [SciPy ttest_rel](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_rel.html)
