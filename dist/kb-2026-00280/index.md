---
atomic_facts:
  - confidence: high
    id: fact-ai-01
    source_title: Feature Engineering for Machine Learning (Zheng & Casari)
    source_url: https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/
    statement: It's often the most impactful step in ML pipelines — good features beat complex models
  - confidence: medium
    id: fact-ai-001
    source_title: Feature Engineering for Machine Learning (Zheng & Casari)
    source_url: https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/
    statement: >-
      Feature engineering transforms raw data into informative representations that improve model performance. It's often the most impactful step in ML pipelines — good features beat complex models.
      Deep learning reduces but doesn't eliminate the need for feature engineering. Techniques: scaling, encoding, binning, interaction features, domain-specific t
  - confidence: medium
    id: fact-ai-002
    source_title: Feature Engineering for Machine Learning (Zheng & Casari)
    source_url: https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/
    statement: "Scaling: StandardScaler (mean=0, std=1), MinMaxScaler (0 to 1)."
  - confidence: medium
    id: fact-ai-003
    source_title: Feature Engineering for Machine Learning (Zheng & Casari)
    source_url: https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/
    statement: "Feature selection: filter (correlation), wrapper (greedy search), embedded (L1 regularization, tree importance)."
category: ai
completeness: 0.88
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: human_only
id: kb-2026-00280
is_live_document: false
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Zheng, Alice
      - Casari, Amanda
    institution: O\'Reilly Media
    title: Feature Engineering for Machine Learning (Zheng & Casari)
    type: textbook
    url: https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/
    year: 2018
  - authors:
      - Guyon, Isabelle
      - Elisseeff, André
    institution: Journal of Machine Learning Research (JMLR)
    title: An Introduction to Variable and Feature Selection (Guyon & Elisseeff)
    type: journal_article
    url: https://jmlr.org/papers/v3/guyon03a.html
    year: 2003
  - authors:
      - Kanter, James Max
      - Veeramachaneni, Kalyan
    institution: MIT / DSAA
    title: "Deep Feature Synthesis: Towards Automating Data Science Endeavors (Kanter & Veeramachaneni)"
    type: conference_paper
    url: https://doi.org/10.1109/DSAA.2015.7344858
    year: 2015
schema_type: TechArticle
secondary_sources:
  - institution: Inria
    title: Scikit-learn Preprocessing Documentation
    type: documentation
    url: https://scikit-learn.org/stable/modules/preprocessing.html
    year: 2026
  - title: "Automated Feature Engineering: A Systematic Review and Benchmark"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3712345
title: Feature Engineering
updated: "2026-05-24"
---
## TL;DR

Feature engineering transforms raw data into informative representations that improve model performance. It's often the most impactful step in ML pipelines — good features beat complex models. Deep learning reduces but doesn't eliminate the need for feature engineering. Techniques: scaling, encoding, binning, interaction features, domain-specific transformations.

## Core Explanation

Scaling: StandardScaler (mean=0, std=1), MinMaxScaler (0 to 1). Encoding: one-hot (categorical), label, target encoding. Temporal features: hour/day/month/weekend flag from timestamps. Text features: TF-IDF, word embeddings. Feature selection: filter (correlation), wrapper (greedy search), embedded (L1 regularization, tree importance). Domain knowledge is the best source of good features.

## Further Reading

- [Feature Engineering for Machine Learning (Zheng & Casari)](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)
