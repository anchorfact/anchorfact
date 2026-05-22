---
id:"kb-2026-00276"
title:"Overfitting and Regularization"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Deep Learning (Goodfellow, Bengio, Courville)"
    type:"book"
    year:2016
    url:"https://www.deeplearningbook.org/"
    institution:"MIT Press"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Overfitting occurs when a model learns noise and patterns specific to training data, failing to generalize to unseen data. Signs: low training error, high validation error. Regularization techniques prevent overfitting: L1/L2 weight penalty, dropout, early stopping, data augmentation, batch normalization.

## Core Explanation

Dropout (Srivastava et al., 2014): randomly deactivate neurons during training — forces network to learn redundant representations. L2 regularization: add λ||w||² to loss — penalizes large weights. Early stopping: stop training when validation error stops improving. Data augmentation: create synthetic training data (rotate/crop images, synonym replacement for text). Bias-variance tradeoff: underfitting (high bias) vs. overfitting (high variance).

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
