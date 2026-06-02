---
id: evaluation-sampling-and-confidence-intervals
title: 'Evaluation Sampling and Confidence Intervals'
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
  - id: fact-ai-evaluation-sampling-and-confidence-intervals-1
    statement: >-
      SciPy bootstrap documentation describes a function that computes a two-sided bootstrap confidence interval for a statistic.
    source_title: SciPy Bootstrap
    source_url: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html
    confidence: medium
  - id: fact-ai-evaluation-sampling-and-confidence-intervals-2
    statement: >-
      statsmodels proportion_confint documentation describes methods for confidence intervals around a binomial proportion.
    source_title: statsmodels Proportion Confidence Interval
    source_url: https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportion_confint.html
    confidence: medium
  - id: fact-ai-evaluation-sampling-and-confidence-intervals-3
    statement: >-
      scikit-learn cross-validation documentation says cross-validation evaluates generalization performance by splitting data into training and testing subsets.
    source_title: scikit-learn Cross-Validation
    source_url: https://scikit-learn.org/stable/modules/cross_validation.html
    confidence: medium
completeness: 0.83
known_gaps:
  - Confidence intervals depend on sampling assumptions, independence, task stratification, metric choice, and grader noise.
disputed_statements: []
primary_sources:
  - title: SciPy Bootstrap
    type: documentation
    year: 2026
    url: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html
    institution: SciPy
  - title: statsmodels Proportion Confidence Interval
    type: documentation
    year: 2026
    url: https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportion_confint.html
    institution: statsmodels
  - title: scikit-learn Cross-Validation
    type: documentation
    year: 2026
    url: https://scikit-learn.org/stable/modules/cross_validation.html
    institution: scikit-learn
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Evaluation sampling and confidence intervals help teams avoid overreacting to noisy LLM benchmark differences.

## Core Explanation

An LLM evaluation score is an estimate based on a finite set of examples. Small score changes can be noise when the sample is small, the task mix changes, or the grader is unstable.

Agents should report the sample definition, metric, number of examples, and uncertainty method with evaluation results. Release decisions are stronger when they include confidence intervals or stratified analysis instead of a single point estimate.

## Source-Mapped Facts

- SciPy bootstrap documentation describes a function that computes a two-sided bootstrap confidence interval for a statistic. ([source](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html))
- statsmodels proportion_confint documentation describes methods for confidence intervals around a binomial proportion. ([source](https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportion_confint.html))
- scikit-learn cross-validation documentation says cross-validation evaluates generalization performance by splitting data into training and testing subsets. ([source](https://scikit-learn.org/stable/modules/cross_validation.html))

## Further Reading

- [SciPy Bootstrap](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html)
- [statsmodels Proportion Confidence Interval](https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.proportion_confint.html)
- [scikit-learn Cross-Validation](https://scikit-learn.org/stable/modules/cross_validation.html)
