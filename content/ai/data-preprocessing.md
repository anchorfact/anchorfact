---
id: "kb-2026-00281"



title: "Data Preprocessing"
schema_type: "TechArticle"



category: "ai"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Python Data Science Handbook (Jake VanderPlas)"
    type: "book"



    year: 2022
    url: "https://jakevdp.github.io/PythonDataScienceHandbook/"


    institution: "O'Reilly"
    note: "Comprehensive guide to data preprocessing with pandas, NumPy, and scikit-learn"



secondary_sources:
  - title: "Scikit-learn Documentation — Preprocessing"
    type: "documentation"



    year: 2026
    url: "https://scikit-learn.org/stable/modules/preprocessing.html"


    institution: "Inria"
    note: "Industry-standard preprocessing library documentation"



completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"


known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

Data preprocessing cleans and prepares raw data for ML. Steps: handling missing values (drop, impute), outlier detection and treatment, encoding categorical variables, feature scaling, train/test splitting. Real-world data is messy — preprocessing typically consumes 60-80% of a data scientist's time.

## Core Explanation

Missing data: MCAR (completely random), MAR (random given observed), MNAR (not random). Imputation: mean/median (simple), KNN (neighbor values), MICE (multiple imputation). Outliers: IQR method (Q1-1.5IQR, Q3+1.5IQR), Z-score (|z|>3). Data leakage: when training data contains information about test set — must prevent (e.g., scale AFTER splitting, not before).

## Further Reading

- [Python Data Science Handbook (Jake VanderPlas)](https://jakevdp.github.io/PythonDataScienceHandbook/)
