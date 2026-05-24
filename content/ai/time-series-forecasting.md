---
id: time-series-forecasting
title: Time Series Forecasting with Machine Learning
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ts-1
    statement: Informer (Zhou et al. 2021, AAAI Best Paper) introduced ProbSparse self-attention and a generative-style decoder, achieving O(L log L) complexity for long sequence time-series forecasting.
    source_title: "Zhou, Haoyi, et al. Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting. AAAI 2021"
    source_url: https://arxiv.org/abs/2012.07436
    confidence: high
  - id: fact-ts-2
    statement: >-
      TimesNet (Wu et al. 2023, Tsinghua) transforms 1D time series into 2D tensors by capturing intra-period and inter-period variations, then applies inception blocks for multi-scale temporal
      modeling.
    source_title: "Wu, Haixu, et al. TimesNet: Temporal 2D-Variation Modeling for General Time Series Analysis. ICLR 2023"
    source_url: https://arxiv.org/abs/2210.02186
    confidence: high
  - id: fact-ts-3
    statement: >-
      GraphCast (Lam et al. 2023, Google DeepMind) applies graph neural networks to global weather forecasting, outperforming ECMWF's operational system on 90% of test variables while running in under
      1 minute.
    source_title: Lam, Remi, et al. Learning Skillful Medium-Range Global Weather Forecasting. Science 2023
    source_url: https://doi.org/10.1126/science.adi2336
    confidence: high
completeness: 0.9
known_gaps:
  - Probabilistic forecasting with prediction intervals
  - Multivariate causal discovery in time series
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: "N-BEATS: Neural basis expansion analysis for interpretable time series forecasting"
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/1905.10437
    institution: ICLR
  - title: "Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting"
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2012.07436
    institution: AAAI
secondary_sources:
  - title: A Comprehensive Survey of Deep Learning for Time Series Forecasting
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TKDE
    url: https://doi.org/10.1109/TKDE.2024.3361474
  - title: "Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting"
    type: conference_paper
    year: 2021
    authors:
      - Zhou, Haoyi
      - Zhang, Shanghang
      - Peng, Jieqi
      - et al.
    institution: AAAI Best Paper
    url: https://arxiv.org/abs/2012.07436
  - title: "TimesNet: Temporal 2D-Variation Modeling for General Time Series Analysis"
    type: conference_paper
    year: 2023
    authors:
      - Wu, Haixu
      - Hu, Tengge
      - Liu, Yong
      - et al.
    institution: Tsinghua University / ICLR
    url: https://arxiv.org/abs/2210.02186
  - title: Are Transformers Effective for Time Series Forecasting? (PatchTST)
    type: conference_paper
    year: 2023
    authors:
      - Nie, Yuqi
      - Nguyen, Nam H.
      - Sinthong, Phanwadee
      - Kalagnanam, Jayant
    institution: IBM Research / AAAI
    url: https://arxiv.org/abs/2211.14730
updated: "2026-05-24"
---
## TL;DR
Time series forecasting predicts future values from historical sequences. Traditional statistical methods (ARIMA, ETS) compete with deep learning approaches (LSTM, Transformer variants) depending on data volume and pattern complexity.

## Core Explanation
Classical decomposition: trend (long-term direction), seasonality (periodic patterns), and residuals (noise). ARIMA models capture auto-regressive and moving-average dynamics. Prophet (Facebook) decomposes time series into trend + seasonality + holiday effects with interpretable parameters.

## Detailed Analysis
Deep learning for time series: LSTMs handle long-term dependencies; Transformers capture global patterns but require positional encoding modifications. PatchTST segments series into patches, treating each patch as a token — significantly improving transformer efficiency for long sequences.

## Further Reading
- Nixtla: StatsForecast & NeuralForecast Libraries
- Kaggle: Time Series Competitions
- Hyndman: Forecasting: Principles and Practice