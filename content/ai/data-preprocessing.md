---
id:"kb-2026-00281"
title:"Data Preprocessing"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Python Data Science Handbook (Jake VanderPlas)"
    type:"book"
    year:2022
    url:"https://jakevdp.github.io/PythonDataScienceHandbook/"
    institution:"O'Reilly"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    institution: "Apress"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Data preprocessing cleans and prepares raw data for ML. Steps: handling missing values (drop, impute), outlier detection and treatment, encoding categorical variables, feature scaling, train/test splitting. Real-world data is messy — preprocessing typically consumes 60-80% of a data scientist's time.

## Core Explanation

Missing data: MCAR (completely random), MAR (random given observed), MNAR (not random). Imputation: mean/median (simple), KNN (neighbor values), MICE (multiple imputation). Outliers: IQR method (Q1-1.5IQR, Q3+1.5IQR), Z-score (|z|>3). Data leakage: when training data contains information about test set — must prevent (e.g., scale AFTER splitting, not before).

## Further Reading

- [Python Data Science Handbook (Jake VanderPlas)](https://jakevdp.github.io/PythonDataScienceHandbook/)
