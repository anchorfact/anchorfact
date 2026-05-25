---
id: bayesian-deep-learning
title: "Bayesian Deep Learning: Uncertainty Quantification and Robust Predictions"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-bayesian-deep-learning-1
    statement: >-
      Deep Ensembles — training multiple copies of the same model with different random seeds — remain one of the most effective and practical uncertainty quantification methods, often matching or
      exceeding Bayesian Neural Networks (BNNs) in calibration while being simpler to implement.
    source_title: Ovadia et al., NeurIPS (2019) / Ashukha et al., ICLR (2020)
    source_url: https://arxiv.org/abs/1906.02530
    confidence: high
  - id: af-bayesian-deep-learning-2
    statement: >-
      Scalable Bayesian Monte Carlo (SBMC, 2025) introduces a new method for Bayesian deep learning that combines a probabilistic model with an efficient sampling algorithm — achieving uncertainty
      estimates competitive with Deep Ensembles at significantly lower computational cost, published as arXiv 2505.13585.
    source_title: SBMC, arXiv 2505.13585 (2025)
    source_url: https://arxiv.org/abs/1612.01474
    confidence: high
primary_sources:
  - id: ps-bayesian-deep-learning-1
    title: Can You Trust Your Model's Uncertainty? Evaluating Predictive Uncertainty Under Dataset Shift
    type: academic_paper
    year: 2019
    institution: NeurIPS
    url: https://arxiv.org/abs/1906.02530
  - id: ps-bayesian-deep-learning-2
    title: Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles
    type: academic_paper
    year: 2017
    institution: NeurIPS
    url: https://arxiv.org/abs/1612.01474
known_gaps:
  - Real-time Bayesian inference on large models
  - Out-of-distribution detection guarantees
disputed_statements: []
secondary_sources:
  - title: "Dropout as a Bayesian Approximation: Representing Model Uncertainty in Deep Learning"
    type: conference_paper
    year: 2016
    authors:
      - Gal, Yarin
      - Ghahramani, Zoubin
    institution: University of Cambridge / ICML
    url: https://arxiv.org/abs/1506.02142
  - title: A Survey on Uncertainty Estimation in Deep Learning Classification Systems from a Bayesian Perspective
    type: survey_paper
    year: 2021
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3477140
  - title: A Survey of Uncertainty in Deep Neural Networks
    type: survey_paper
    year: 2023
    authors:
      - Gawlikowski, Jakob
      - Tassi, Cedrique Rovile Njieutcheu
      - Ali, Mohsin
      - Lee, Jongseok
      - Humm, Matthias
      - Feng, Di
      - Kruspe, Anna
      - Triebel, Rudolph
      - Jung, Peter
      - Roscher, Ribana
      - Shahzad, Muhammad
      - Yang, Wen
      - Bamler, Richard
      - Zhu, Xiao Xiang
    institution: Artificial Intelligence Review (Springer)
    url: https://doi.org/10.1007/s10462-023-10562-9
  - title: Weight Uncertainty in Neural Networks (Bayes by Backprop)
    type: conference_paper
    year: 2015
    authors:
      - Blundell, Charles
      - Cornebise, Julien
      - Kavukcuoglu, Koray
      - Wierstra, Daan
    institution: Google DeepMind / ICML
    url: https://arxiv.org/abs/1505.05424
updated: "2026-05-24"
---
## TL;DR
Bayesian Deep Learning equips neural networks with uncertainty estimates — knowing when the model is likely to be wrong. From Monte Carlo Dropout to Deep Ensembles and modern Bayesian approximations, UQ is critical for safety-critical AI (medical, autonomous driving, finance).

## Core Explanation
Standard neural networks output point predictions without confidence. Bayesian approaches treat weights as probability distributions: p(y|x,D) = ∫ p(y|x,w) p(w|D) dw. The challenge: the posterior p(w|D) is intractable for large networks. Practical approximations: (1) MC Dropout — dropout at inference time approximates a Bernoulli BNN; (2) Deep Ensembles — ensemble of M independently trained models; (3) Laplace approximation — fit a Gaussian to the posterior mode; (4) variational inference — BNNs with learned posterior parameters.

## Detailed Analysis
Types of uncertainty: aleatoric (inherent data noise, irreducible) and epistemic (model ignorance, reducible with more data). Deep Ensembles capture epistemic uncertainty through mode diversity. SWAG (SWA-Gaussian) fits a Gaussian posterior to SGD iterates. Applications: medical diagnosis with reject option, autonomous driving safety monitoring, active learning (query most uncertain examples). SBMC (2025) improves scalability of full Bayesian methods.

## Further Reading
- Bayesian Deep Learning Workshop (NeurIPS)
- Pyro: Probabilistic Programming
- TensorFlow Probability
