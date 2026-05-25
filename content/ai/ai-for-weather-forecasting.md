---
id: ai-for-weather-forecasting
title: 'AI for Weather Forecasting: Data-Driven Numerical Weather Prediction and Nowcasting'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-26'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-for-weather-forecasting-1
    statement: >-
      Google DeepMind's GraphCast (Science, November 2023) demonstrated that a graph neural network trained on 39 years of ERA5 reanalysis data can produce 10-day global weather forecasts in under 1
      minute on a single TPU -- matching or exceeding the ECMWF Integrated Forecasting System (IFS) on 90% of 1,380 verification targets, while being 1,000x computationally cheaper. This represents a
      paradigm shift from physics-based numerical weather prediction (NWP) to data-driven forecasting.
    source_title: GraphCast, Lam et al., Science (2023) -- doi:10.1126/science.adi2336 / ECMWF ERA5 reanalysis / Google DeepMind
    source_url: https://www.science.org/doi/10.1126/science.adi2336
    confidence: high
  - id: af-ai-for-weather-forecasting-2
    statement: >-
      Huawei's Pangu-Weather (Nature, July 2023, Bi et al.) and NVIDIA's FourCastNet (2022) demonstrated similar capabilities using 3D transformer and Fourier neural operator architectures
      respectively. By 2025-2026, ECMWF has integrated AI models (AIFS -- Artificial Intelligence Forecasting System) into operational ensemble forecasting, running alongside traditional physics-based
      IFS to produce calibrated, probabilistic forecasts that combine the strengths of both approaches.
    source_title: Pangu-Weather, Bi et al., Nature (2023) / NVIDIA FourCastNet (2022) / ECMWF AIFS (2024-2026) -- operational AI weather forecasting
    source_url: https://www.nature.com/articles/s41586-023-06185-3
    confidence: high
primary_sources:
  - id: ps-ai-for-weather-forecasting-1
    title: Learning skillful medium-range global weather forecasting (GraphCast)
    type: academic_paper
    year: 2023
    institution: Science / Google DeepMind
    doi: 10.1126/science.adi2336
    url: https://www.science.org/doi/10.1126/science.adi2336
  - id: ps-ai-for-weather-forecasting-2
    title: Accurate medium-range global weather forecasting with 3D neural networks (Pangu-Weather)
    type: academic_paper
    year: 2023
    institution: Nature / Huawei Cloud
    doi: 10.1038/s41586-023-06185-3
    url: https://www.nature.com/articles/s41586-023-06185-3
  - title: Probabilistic Weather Forecasting with Machine Learning (GenCast)
    authors:
      - Price,I.
      - Sanchez-Gonzalez,A.
      - Alet,F.
      - Ewalds,T.
      - El-Kadi,A.
      - Stott,J.
      - Mohamed,S.
      - Battaglia,P.
      - Lam,R.
      - Willson,M.
    type: academic_paper
    year: 2024
    doi: 10.1038/s41586-024-08252-9
    institution: Google DeepMind/Nature
  - title: 'FuXi: A Cascade Machine Learning Forecasting System'
    authors:
      - Chen,L.
      - Zhong,X.
      - Zhang,F.
      - Cheng,Y.
      - Xu,Y.
      - Qi,Y.
      - Li,H.
    type: academic_paper
    year: 2023
    doi: 10.1038/s41597-023-02712-7
    institution: Nature Scientific Data
known_gaps:
  - Extreme weather event prediction -- hurricanes, tornadoes, flash floods with sufficient lead time
  - Probabilistic AI weather forecasting with well-calibrated uncertainty estimates
disputed_statements: []
secondary_sources:
  - title: Learning Skillful Medium-Range Global Weather Forecasting (GraphCast)
    type: journal_article
    year: 2023
    authors:
      - Lam, Remi
      - Sanchez-Gonzalez, Alvaro
      - Willson, Matthew
      - Wirnsberger, Peter
      - Fortunato, Meire
      - et al.
    institution: Google DeepMind / Science
    url: https://doi.org/10.1126/science.adi2336
  - title: Probabilistic Weather Forecasting with Machine Learning (GenCast)
    type: journal_article
    year: 2024
    authors:
      - Price, Ilan
      - Sanchez-Gonzalez, Alvaro
      - Alet, Ferran
      - et al.
    institution: Google DeepMind / Nature
    url: https://www.nature.com/articles/s41586-024-08252-9
  - title: Accurate Medium-Range Global Weather Forecasting with 3D Neural Networks (Pangu-Weather)
    type: journal_article
    year: 2023
    authors:
      - Bi, Kaifeng
      - Xie, Lingxi
      - Zhang, Hengheng
      - Chen, Xin
      - Gu, Xiaotao
      - Tian, Qi
    institution: Huawei Cloud / Nature
    url: https://www.nature.com/articles/s41586-023-06185-3
  - title: 'AI for Climate and Weather: A Comprehensive Survey on Deep Learning Methods'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv / WIREs Climate Change
    url: https://doi.org/10.1002/wcc.890
updated: '2026-05-24'
---


## TL;DR
AI is revolutionizing weather forecasting -- models like GraphCast, Pangu-Weather, and FourCastNet can produce 10-day global forecasts in seconds that rival the accuracy of traditional supercomputer-based physics simulations that took hours. By 2025, the European Centre for Medium-Range Weather Forecasts is running AI forecasts operationally alongside classical models, marking the beginning of the data-driven weather prediction era.

## Core Explanation
Traditional Numerical Weather Prediction (NWP): solve the Navier-Stokes equations and atmospheric physics PDEs on a 3D grid covering the Earth using finite-difference or spectral methods. ECMWF IFS runs on ~1 million CPU cores, producing a 10-day forecast in 1-2 hours. It works well but is computationally expensive and limited by our incomplete understanding of sub-grid physics (cloud formation, turbulence). Data-driven approach: train a neural network on decades of historical weather data (ERA5 reanalysis -- 39 years, 0.25-degree resolution, hourly). The model learns the mapping from current atmospheric state to future state directly from data, bypassing explicit physics. Key architectural insight (GraphCast): the Earth is represented as a multi-scale icosahedral mesh (graph), with nodes at 0.25-degree resolution. The processor applies learned message-passing across edges to simulate atmospheric dynamics. Training: multi-step -- predict 6-hour steps, backpropagate through 6 steps to learn longer-range dynamics. Inference: autoregressive rollout.

## Detailed Analysis
Architecture comparison: GraphCast (Google) -- GNN on icosahedral mesh, 36.7M parameters, 1-minute forecast on TPUv4. Pangu-Weather (Huawei) -- 3D Earth-Specific Transformer (3DEST), processes atmosphere as 3D grid with 13 pressure levels, 64M parameters. FourCastNet (NVIDIA) -- Adaptive Fourier Neural Operator (AFNO), learns in frequency domain via FFT, 74M parameters. Performance: GraphCast outperforms IFS on 90% of targets for deterministic forecasts. For extreme events: GraphCast predicted Hurricane Lee making landfall in Nova Scotia 9 days in advance (vs. 6 days for IFS). ECMWF AIFS (2024-2026): the operational transition. ECMWF now runs GraphCast and other AI models as part of its ensemble prediction system, producing 50 perturbed forecasts for probabilistic prediction. AI models excel at medium-range (1-10 day) deterministic forecasts; physics-based models remain essential for ensembles, uncertainty quantification, and rare events. The future is hybrid -- AI for fast, accurate deterministic prediction + physics for calibration and extremes.

## Related Articles

- [AI for Disaster Prediction: Earthquake Forecasting, Flood Detection, and Early Warning Systems](../ai-disaster-prediction.md)
- [AI for Climate Science: Weather Prediction and Earth System Modeling](../ai-for-climate-science.md)
- [Protein Structure Prediction: AlphaFold, RoseTTAFold, and AI-Driven Structural Biology](../protein-structure-prediction.md)
