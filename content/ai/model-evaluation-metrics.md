---
atomic_facts:
  - confidence: medium
    id: fact-ai-001
    source_title: Pattern Recognition and Machine Learning (Bishop)
    source_url: https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/
    statement: >-
      Model evaluation metrics quantify performance. Classification: accuracy, precision, recall, F1-score, ROC-AUC. Regression: MSE, MAE, R². Confusion matrix: TP/FP/FN/TN. Choose metrics aligned
      with business goals: medical diagnosis needs high recall (miss fewer positives), spam detection needs high precision (fewer false alarms).
  - confidence: medium
    id: fact-ai-001
    source_title: Pattern Recognition and Machine Learning (Bishop)
    source_url: https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/
    statement: >-
      Model evaluation metrics quantify performance. Classification: accuracy, precision, recall, F1-score, ROC-AUC. Regression: MSE, MAE, R². Confusion matrix: TP/FP/FN/TN. Choose metrics aligned
      with business goals: medical diagnosis needs high recall (miss fewer positives), spam detection needs high precision (fewer false alarms).
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
id: kb-2026-00282
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2021 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Bishop, Christopher M.
    institution: Springer
    title: Pattern Recognition and Machine Learning (Bishop)
    type: textbook
    url: https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/
    year: 2006
  - authors:
      - Hastie, Trevor
      - Tibshirani, Robert
      - Friedman, Jerome
    institution: Springer
    title: The Elements of Statistical Learning (Hastie, Tibshirani, Friedman, 2nd Edition)
    type: textbook
    url: https://doi.org/10.1007/978-0-387-84858-7
    year: 2009
  - authors:
      - Fawcett, Tom
    institution: Pattern Recognition Letters / Elsevier
    title: An Introduction to ROC Analysis (Fawcett)
    type: journal_article
    url: https://doi.org/10.1016/j.patrec.2005.10.010
    year: 2006
  - authors:
      - Davis, Jesse
      - Goadrich, Mark
    institution: ICML
    title: The Relationship Between Precision-Recall and ROC Curves (Davis & Goadrich)
    type: conference_paper
    url: https://doi.org/10.1145/1143844.1143874
    year: 2006
schema_type: TechArticle
secondary_sources:
  - authors:
      - James, Gareth
      - Witten, Daniela
      - Hastie, Trevor
      - Tibshirani, Robert
    institution: Springer
    title: An Introduction to Statistical Learning (2nd Edition)
    type: book
    url: https://www.statlearning.com/
    year: 2021
  - title: "Evaluating LLMs: A Comprehensive Survey of Benchmarks, Metrics, and Methodologies"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3712345
  - title: "Beyond Accuracy: Precision and Recall (Hossin & Sulaiman, 2015)"
    type: survey_paper
    year: 2015
    authors:
      - multiple
    institution: International Journal of Data Mining
    url: https://doi.org/10.5121/ijdkp.2015.5202
  - title: "Evaluating Large Language Models: A Holistic Survey of Benchmarks"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3712345
title: Model Evaluation Metrics
updated: "2026-05-24"
---
## TL;DR

Model evaluation metrics quantify performance. Classification: accuracy, precision, recall, F1-score, ROC-AUC. Regression: MSE, MAE, R². Confusion matrix: TP/FP/FN/TN. Choose metrics aligned with business goals: medical diagnosis needs high recall (miss fewer positives), spam detection needs high precision (fewer false alarms).

## Core Explanation

Precision = TP/(TP+FP) — when model predicts positive, how often is it correct? Recall = TP/(TP+FN) — how many actual positives did model find? F1 = harmonic mean of precision/recall. ROC-AUC: area under receiver operating characteristic curve — probability that random positive ranks above random negative. Cross-validation: k-fold CV gives robust performance estimate.

## Further Reading

- [Pattern Recognition and Machine Learning (Bishop)](https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/)
