---
id:"time-series-forecasting"
title:"Time Series Forecasting with Machine Learning"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-time-series-forecasting-1"
    statement:"Transformers adapted for time series — Informer (Zhou et al., 2021), Autoformer, PatchTST — address the quadratic attention complexity for long sequences, enabling forecasting horizons of 720+ time steps."
    source_title:"Zhou et al., AAAI (2021)"
    confidence:"high"
  - id:"af-time-series-forecasting-2"
    statement:"N-BEATS (Oreshkin et al., 2020) achieves state-of-the-art univariate forecasting without any time-series-specific feature engineering, using a pure deep learning architecture with doubly residual stacking of fully connected blocks."
    source_title:"Oreshkin et al., ICLR (2020)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"N-BEATS: Neural basis expansion analysis for interpretable time series forecasting"
    type:"academic_paper"
    year:2020
    url:"https://arxiv.org/abs/1905.10437"
    institution:"ICLR"
  - title:"Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting"
    type:"academic_paper"
    year:2021
    url:"https://arxiv.org/abs/2012.07436"
    institution:"AAAI"

known_gaps:
  - "Probabilistic forecasting with prediction intervals"
  - "Multivariate causal discovery in time series"

disputed_statements:
  - statement:"No major disputed statements identified"

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