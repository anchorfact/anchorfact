---
id:"kb-2026-00276"
title:"Overfitting and Regularization"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
    note: "Chapter 7: Regularization — covers L1/L2, dropout, early stopping, data augmentation, batch normalization"
secondary_sources:
  - title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting"
    authors: ["Srivastava, Nitish", "Hinton, Geoffrey", "Krizhevsky, Alex", "Sutskever, Ilya", "Salakhutdinov, Ruslan"]
    type: "academic_paper"
    year: 2014
    url: "https://jmlr.org/papers/v15/srivastava14a.html"
    institution: "JMLR"
    note: "The dropout paper. Published in JMLR 2014. 50,000+ citations."
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Overfitting occurs when a model learns noise and patterns specific to training data, failing to generalize to unseen data. Signs: low training error, high validation error. Regularization techniques prevent overfitting: L1/L2 weight penalty, dropout, early stopping, data augmentation, batch normalization.

## Core Explanation

Dropout (Srivastava et al., 2014): randomly deactivate neurons during training — forces network to learn redundant representations. L2 regularization: add λ||w||² to loss — penalizes large weights. Early stopping: stop training when validation error stops improving. Data augmentation: create synthetic training data (rotate/crop images, synonym replacement for text). Bias-variance tradeoff: underfitting (high bias) vs. overfitting (high variance).

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
