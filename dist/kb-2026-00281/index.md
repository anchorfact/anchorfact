---
atomic_facts:
  - confidence: medium
    id: fact-ai-001
    source_title: Python Data Science Handbook (Jake VanderPlas)
    source_url: https://jakevdp.github.io/PythonDataScienceHandbook/
    statement: >-
      Data preprocessing cleans and prepares raw data for ML. Steps: handling missing values (drop, impute), outlier detection and treatment, encoding categorical variables, feature scaling,
      train/test splitting. Real-world data is messy — preprocessing typically consumes 60-80% of a data scientist's time.
  - confidence: medium
    id: fact-ai-002
    source_title: Python Data Science Handbook (Jake VanderPlas)
    source_url: https://jakevdp.github.io/PythonDataScienceHandbook/
    statement: "Outliers: IQR method (Q1-1.5IQR, Q3+1.5IQR), Z-score (|z|>3)."
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
id: kb-2026-00281
is_live_document: false
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Han, Jiawei
      - Pei, Jian
      - Tong, Hanghang
    institution: Morgan Kaufmann / Elsevier
    title: "Data Mining: Concepts and Techniques (Han, Pei, Tong, 4th Edition)"
    type: textbook
    url: https://doi.org/10.1016/C2020-0-00008-4
    year: 2022
  - authors:
      - Pedregosa, Fabian
      - Varoquaux, Gaël
      - Gramfort, Alexandre
      - et al.
    institution: INRIA / JMLR
    title: "Scikit-learn: Machine Learning in Python (Pedregosa et al. — JMLR)"
    type: journal_article
    url: https://jmlr.org/papers/v12/pedregosa11a.html
    year: 2011
  - authors:
      - multiple
    institution: ACM Computing Surveys
    title: A Survey on Data Preprocessing Methods for Machine Learning
    type: survey_paper
    url: https://doi.org/10.1145/3635100
    year: 2024
schema_type: TechArticle
secondary_sources:
  - institution: Inria
    title: Scikit-learn Documentation — Preprocessing
    type: documentation
    url: https://scikit-learn.org/stable/modules/preprocessing.html
    year: 2026
title: Data Preprocessing
updated: "2026-05-24"
---
## TL;DR

Data preprocessing cleans and prepares raw data for ML. Steps: handling missing values (drop, impute), outlier detection and treatment, encoding categorical variables, feature scaling, train/test splitting. Real-world data is messy — preprocessing typically consumes 60-80% of a data scientist's time.

## Core Explanation

Missing data: MCAR (completely random), MAR (random given observed), MNAR (not random). Imputation: mean/median (simple), KNN (neighbor values), MICE (multiple imputation). Outliers: IQR method (Q1-1.5IQR, Q3+1.5IQR), Z-score (|z|>3). Data leakage: when training data contains information about test set — must prevent (e.g., scale AFTER splitting, not before).

## Further Reading

- [Python Data Science Handbook (Jake VanderPlas)](https://jakevdp.github.io/PythonDataScienceHandbook/)
