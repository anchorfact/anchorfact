---
id: "anomaly-detection"
title: "Anomaly Detection in Machine Learning"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-anomaly-detection-1"
    statement: "Isolation Forest (Liu et al., 2008) detects anomalies by randomly partitioning data — anomalies require fewer splits to isolate than normal points, achieving linear time complexity O(n) unlike distance-based methods."
    source_title: "Liu et al., ICDM (2008)"
    confidence: "high"
  - id: "af-anomaly-detection-2"
    statement: "Autoencoder-based anomaly detection uses reconstruction error as the anomaly score: normal patterns are reconstructed well (low error); anomalies deviate from learned manifold (high error)."
    source_title: "An & Cho, SDM (2015)"
    confidence: "high"

completeness: 0.9

known_gaps:
  - "Online anomaly detection in streaming data"
  - "Graph anomaly detection"

disputed_statements:
  - statement: "No major disputed statements identified"

primary_sources:
  - title: "Isolation Forest"
    type: "academic_paper"
    year: 2008
    url: "https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf"
    institution: "ICDM"
  - title: "Variational Autoencoder based Anomaly Detection using Reconstruction Probability"
    type: "academic_paper"
    year: 2015
    url: "http://dm.snu.ac.kr/static/docs/TR/SNUDM-TR-2015-03.pdf"
    institution: "SNU DMC"

---


## TL;DR
Anomaly detection identifies data points that deviate significantly from expected patterns — critical for fraud detection, industrial monitoring, and cybersecurity.

## Core Explanation
Three paradigms: supervised (labeled anomalies, rare class problem), semi-supervised (labeled normal data only, one-class classification), unsupervised (no labels, assumes anomalies are rare and different). Key methods include statistical (z-score, IQR), distance-based (kNN, LOF), and deep learning approaches (autoencoders, GANs).

## Detailed Analysis
One-class SVM learns a decision boundary enclosing normal data with maximum margin to origin. Deep SVDD finds the smallest hypersphere enclosing normal representations. In time series, LSTM-based predictors flag points with unexpectedly high prediction error as anomalies.

## Further Reading
- PyOD: Python Outlier Detection Toolkit
- scikit-learn: Novelty and Outlier Detection
- Papers With Code: Anomaly Detection