---
id:"kb-2026-00282"
title:"Model Evaluation Metrics"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Pattern Recognition and Machine Learning (Bishop)"
    authors: ["Bishop, Christopher M."]
    type: "book"
    year: 2006
    url: "https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/"
    institution: "Springer"
    note: "Chapter 1: Introduction — covers evaluation metrics, loss functions, and the bias-variance tradeoff"
secondary_sources:
  - title: "An Introduction to Statistical Learning (2nd Edition)"
    authors: ["James, Gareth", "Witten, Daniela", "Hastie, Trevor", "Tibshirani, Robert"]
    type: "book"
    year: 2021
    url: "https://www.statlearning.com/"
    institution: "Springer"
    note: "Chapter 2: Statistical Learning — covers training vs. test error, cross-validation, and the bias-variance decomposition"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Model evaluation metrics quantify performance. Classification: accuracy, precision, recall, F1-score, ROC-AUC. Regression: MSE, MAE, R². Confusion matrix: TP/FP/FN/TN. Choose metrics aligned with business goals: medical diagnosis needs high recall (miss fewer positives), spam detection needs high precision (fewer false alarms).

## Core Explanation

Precision = TP/(TP+FP) — when model predicts positive, how often is it correct? Recall = TP/(TP+FN) — how many actual positives did model find? F1 = harmonic mean of precision/recall. ROC-AUC: area under receiver operating characteristic curve — probability that random positive ranks above random negative. Cross-validation: k-fold CV gives robust performance estimate.

## Further Reading

- [Pattern Recognition and Machine Learning (Bishop)](https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/)
