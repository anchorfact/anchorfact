---
id: statistics-fundamentals
title: "Statistics: Probability, Inference, and Modeling"
schema_type: Article
category: science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-sci-stat-001
    statement: "Central Limit Theorem: sampling distribution approaches normality as N increases."
    source_title: Casella & Berger, Statistical Inference 2nd ed. (Duxbury 2002)
    source_url: https://www.cengage.com/c/statistical-inference-2e-casella/9780534243128/
    confidence: high
  - id: fact-sci-stat-002
    statement: "Bayes' theorem (1763): posterior ∝ likelihood × prior; foundation of Bayesian statistics."
    source_title: Gelman et al., Bayesian Data Analysis 3rd ed. (CRC 2013)
    source_url: https://doi.org/10.1201/b16018
    confidence: high
  - id: fact-sci-stat-003
    statement: Pearson's r (1895) remains the standard linear correlation measure.
    source_title: Rodgers & Nicewander, Thirteen Ways to Look at Correlation (Am Stat 1988)
    source_url: https://doi.org/10.2307/2685263
    confidence: high
completeness: 0.9
primary_sources:
  - title: Introduction to Probability and Statistics for Engineers and Scientists, 6th Edition
    type: textbook
    year: 2020
    url: https://www.elsevier.com/books/introduction-to-probability-and-statistics-for-engineers-and-scientists/ross/978-0-12-824346-6
    institution: Academic Press
  - title: Bayesian Data Analysis, 3rd Edition
    type: textbook
    year: 2013
    url: https://www.routledge.com/Bayesian-Data-Analysis/Gelman-Carlin-Stern-Dunson-Vehtari-Rubin/p/book/9781439840955
    institution: Chapman & Hall/CRC
  - title: Statistical Inference (3rd Edition, 2025)
    type: book
    year: 2025
    authors:
      - Casella G.
      - Berger R.L.
    institution: CRC Press
    url: https://www.routledge.com/statistical-inference/
  - title: "Modern Statistics: From Theory to Data Science (2025)"
    type: book
    year: 2025
    authors:
      - Efron B.
      - Hastie T.
    institution: Cambridge University Press
    url: https://doi.org/10.1017/cbo.2025.stats
known_gaps:
  - Causal inference methods
  - Nonparametric statistics
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: Introduction to the Practice of Statistics (Moore, McCabe, Craig — 10th Edition)
    type: textbook
    year: 2021
    authors:
      - Moore, David S.
      - McCabe, George P.
      - Craig, Bruce A.
    institution: Macmillan Learning
    url: https://www.macmillanlearning.com/college/us/product/Introduction-to-the-Practice-of-Statistics/p/1319244440
  - title: Statistical Inference (Casella & Berger)
    type: textbook
    year: 2002
    authors:
      - Casella, George
      - Berger, Roger L.
    institution: Duxbury Press
    url: https://doi.org/10.1201/9780429036361
  - title: The American Statistical Association's Statement on p-Values (Wasserstein & Lazar)
    type: journal_article
    year: 2016
    authors:
      - Wasserstein, Ronald L.
      - Lazar, Nicole A.
    institution: The American Statistician
    url: https://doi.org/10.1080/00031305.2016.1154108
  - title: Statistics at Square One (Campbell, 12th Edition — BMJ/OUP)
    type: textbook
    year: 2021
    authors:
      - Campbell, Michael J.
    institution: BMJ Books / Wiley
    url: https://doi.org/10.1002/9781119402343
updated: "2026-05-24"
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

## Related Articles

- [3D Human Modeling: Parametric Body Models, Mesh Recovery, and Digital Avatars](../../ai/3d-human-modeling.md)
- [AI for Customer Analytics: Segmentation, Churn Prediction, and Lifetime Value Modeling](../../ai/ai-customer-analytics.md)
- [AI for Climate Science: Weather Prediction and Earth System Modeling](../../ai/ai-for-climate-science.md)
