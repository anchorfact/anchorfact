---
id: anomaly-detection
title: Anomaly Detection in Machine Learning
schema_type: TechArticle
category: ai
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
  - id: fact-ad-1
    statement: >-
      Anomaly detection identifies data points that deviate significantly from the majority. Deep learning methods include autoencoder-based reconstruction error, GAN-based novelty detection, and
      one-class classification.
    source_title: "Pang, Guansong, et al. Deep Learning for Anomaly Detection: A Comprehensive Review. ACM Computing Surveys 54(2):1-38, 2021"
    source_url: https://doi.org/10.1145/3439950
    confidence: high
  - id: fact-ad-2
    statement: >-
      Isolation Forest (Liu et al. 2008) isolates anomalies using random recursive partitioning — anomalies require fewer splits to isolate, making it efficient for high-dimensional data without
      density estimation.
    source_title: Liu, Fei Tony, Kai Ming Ting, and Zhi-Hua Zhou. Isolation Forest. ICDM 2008
    source_url: https://doi.org/10.1109/ICDM.2008.17
    confidence: high
  - id: fact-ad-3
    statement: Self-supervised anomaly detection uses pretext tasks (rotation prediction, jigsaw puzzles, contrastive learning) to learn normal representations; anomalies deviate in the learned feature space.
    source_title: "Tack, Jihoon, et al. CSI: Novelty Detection via Contrastive Learning on Distributionally Shifted Instances. NeurIPS 2020"
    source_url: https://arxiv.org/abs/2007.08176
    confidence: medium
completeness: 0.9
known_gaps:
  - Online anomaly detection in streaming data
  - Graph anomaly detection
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Isolation Forest
    type: academic_paper
    year: 2008
    url: https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf
    institution: ICDM
  - title: Variational Autoencoder based Anomaly Detection using Reconstruction Probability
    type: academic_paper
    year: 2015
    url: http://dm.snu.ac.kr/static/docs/TR/SNUDM-TR-2015-03.pdf
    institution: SNU DMC
secondary_sources:
  - title: "A Comprehensive Survey on Deep Learning for Anomaly Detection: From Images to Time Series to Graphs"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TKDE
    url: https://doi.org/10.1109/TKDE.2024.3361474
  - title: "Deep Learning for Anomaly Detection: A Comprehensive Review"
    type: survey_paper
    year: 2021
    authors:
      - Pang, Guansong
      - Shen, Chunhua
      - Cao, Longbing
      - Hengel, Anton van den
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3439950
  - title: "A Survey on Video Anomaly Detection via Deep Learning: Methods, Benchmarks, and Applications"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: arXiv
    url: https://arxiv.org/abs/2508.14203
  - title: "Self-Supervised Anomaly Detection: A Survey and Outlook"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TPAMI
    url: https://doi.org/10.1109/TPAMI.2024.3385267
updated: "2026-05-24"
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

## Related Articles

- [Adversarial Machine Learning: Attacks, Defenses, and Robustness Engineering](../adversarial-machine-learning.md)
- [AI for Drug Repurposing: Identifying New Uses for Existing Drugs Through Machine Learning](../ai-drug-repurposing.md)
- [AI Democratization: Open-Source Models, Low-Code AI, and Accessible Machine Learning](../ai-for-democratization.md)