---
id:"kb-2026-00280"
title:"Feature Engineering"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Feature Engineering for Machine Learning (Zheng & Casari)"
    type:"book"
    year:2018
    url:"https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/"
    institution:"O'Reilly"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Feature engineering transforms raw data into informative representations that improve model performance. It's often the most impactful step in ML pipelines — good features beat complex models. Deep learning reduces but doesn't eliminate the need for feature engineering. Techniques: scaling, encoding, binning, interaction features, domain-specific transformations.

## Core Explanation

Scaling: StandardScaler (mean=0, std=1), MinMaxScaler (0 to 1). Encoding: one-hot (categorical), label, target encoding. Temporal features: hour/day/month/weekend flag from timestamps. Text features: TF-IDF, word embeddings. Feature selection: filter (correlation), wrapper (greedy search), embedded (L1 regularization, tree importance). Domain knowledge is the best source of good features.

## Further Reading

- [Feature Engineering for Machine Learning (Zheng & Casari)](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)
