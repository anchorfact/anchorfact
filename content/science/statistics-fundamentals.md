---
id: "statistics-fundamentals"
title: "Statistics: Probability, Inference, and Modeling"
schema_type: "Article"
category: "science"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-statistics-fundamentals-1"
    statement: "The p-value (Fisher, 1925) represents the probability of observing data at least as extreme as the actual data, assuming the null hypothesis is true. The conventional significance threshold α=0.05 has been criticized in the replication crisis, leading to calls for α=0.005."
    source_title: "Fisher, Statistical Methods for Research Workers (1925)"
    confidence: "high"
  - id: "af-statistics-fundamentals-2"
    statement: "Bayes' theorem updates prior beliefs with observed evidence: P(H|E) = P(E|H)·P(H)/P(E). Bayesian inference directly quantifies uncertainty in parameters rather than relying on long-run frequency interpretations."
    source_title: "Gelman et al., Bayesian Data Analysis (2013)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Introduction to Probability and Statistics for Engineers and Scientists, 6th Edition"
    type: "textbook"
    year: 2020
    url: "https://www.elsevier.com/books/introduction-to-probability-and-statistics-for-engineers-and-scientists/ross/978-0-12-824346-6"
    institution: "Academic Press"
  - title: "Bayesian Data Analysis, 3rd Edition"
    type: "textbook"
    year: 2013
    url: "https://www.routledge.com/Bayesian-Data-Analysis/Gelman-Carlin-Stern-Dunson-Vehtari-Rubin/p/book/9781439840955"
    institution: "Chapman & Hall/CRC"

known_gaps:
  - "Causal inference methods"
  - "Nonparametric statistics"

disputed_statements:
  - statement: "No major disputed statements identified"

---

## TL;DR
Statistics provides the mathematical framework for drawing conclusions from data. Probability quantifies uncertainty; hypothesis testing evaluates evidence; regression models relationships. The Bayesian-frequentist debate reflects two valid philosophies of inference.

## Core Explanation
Descriptive statistics: mean, median, variance, correlation. Probability distributions: normal (Gaussian), binomial, Poisson, exponential. Central Limit Theorem: sample means approach normality as n increases. Hypothesis testing: null vs alternative, Type I (false positive) and Type II (false negative) errors.

## Detailed Analysis
Regression: linear (OLS), logistic (binary outcomes), multilevel/hierarchical. Multiple testing correction: Bonferroni, False Discovery Rate (Benjamini-Hochberg). Bayesian approach: prior → likelihood → posterior. Markov Chain Monte Carlo (MCMC) enables computation for complex models.

## Further Reading
- OpenIntro Statistics (free textbook)
- MIT 18.05: Probability and Statistics
- Statistical Rethinking (McElreath)