---
id: ai-ethics-and-bias
title: AI Ethics and Algorithmic Bias
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
  - id: fact-eth-1
    statement: >-
      Gender Shades (Buolamwini & Gebru 2018, MIT Media Lab) demonstrated that commercial facial analysis systems had significantly higher error rates for darker-skinned women, catalyzing algorithmic
      fairness research.
    source_title: "Buolamwini, Joy, and Timnit Gebru. Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification. FAT* 2018"
    source_url: https://proceedings.mlr.press/v81/buolamwini18a.html
    confidence: high
  - id: fact-eth-2
    statement: >-
      Fairness definitions include demographic parity (equal positive rates), equalized odds (equal TPR & FPR), and individual fairness (similar individuals treated similarly). No single definition
      works for all contexts.
    source_title: Mehrabi, Ninareh, et al. A Survey on Bias and Fairness in Machine Learning. ACM Computing Surveys 54(6):1-35, 2021
    source_url: https://dl.acm.org/doi/10.1145/3457607
    confidence: high
  - id: fact-eth-3
    statement: >-
      The EU AI Act (2024/1689) classifies AI systems by risk level — unacceptable (banned), high-risk (strict compliance), limited risk (transparency), minimal risk (no regulation) — creating the
      first comprehensive AI regulatory framework.
    source_title: "European Commission. Regulation (EU) 2024/1689: The Artificial Intelligence Act. 2024"
    source_url: https://artificialintelligenceact.eu/
    confidence: high
completeness: 0.9
known_gaps:
  - Fairness-accuracy trade-off formal characterization
  - Cultural bias in multilingual models
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Weapons of Math Destruction (O'Neil)
    type: textbook
    year: 2016
    url: https://www.penguinrandomhouse.com/books/316277/weapons-of-math-destruction-by-cathy-oneil/
    institution: Crown
  - title: EU AI Act
    type: standard
    year: 2024
    url: https://artificialintelligenceact.eu/
    institution: European Commission
secondary_sources:
  - title: "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification"
    type: conference_paper
    year: 2018
    authors:
      - Buolamwini, Joy
      - Gebru, Timnit
    institution: MIT Media Lab / FAT*
    url: https://proceedings.mlr.press/v81/buolamwini18a.html
  - title: Datasheets for Datasets
    type: journal_article
    year: 2021
    authors:
      - Gebru, Timnit
      - Morgenstern, Jamie
      - Vecchione, Briana
      - Vaughan, Jennifer Wortman
      - Wallach, Hanna
      - Daumé III, Hal
      - Crawford, Kate
    institution: Communications of the ACM
    url: https://doi.org/10.1145/3458723
  - title: A Survey on Bias and Fairness in Machine Learning
    type: survey_paper
    year: 2021
    authors:
      - Mehrabi, Ninareh
      - Morstatter, Fred
      - Saxena, Nripsuta
      - Lerman, Kristina
      - Galstyan, Aram
    institution: ACM Computing Surveys
    url: https://dl.acm.org/doi/10.1145/3457607
  - title: International AI Safety Report 2026
    type: report
    year: 2026
    authors:
      - Bengio, Yoshua
      - et al. (100+ experts)
    institution: International AI Safety (30+ nations)
    url: https://internationalaisafetyreport.org/
updated: "2026-05-24"
---
## TL;DR
AI systems can amplify societal biases present in training data. Fairness is not a single metric — it requires choosing between competing mathematical definitions that may be mutually exclusive.

## Core Explanation
Fairness definitions: demographic parity (equal positive rates across groups), equalized odds (equal TPR and FPR across groups), individual fairness (similar individuals treated similarly). These cannot all be simultaneously satisfied (Kleinberg et al., 2017 impossibility theorem).

## Detailed Analysis
Bias mitigation strategies span the ML pipeline: pre-processing (reweighting/resampling training data), in-processing (fairness constraints in training objective), post-processing (calibrating decision thresholds per group). Model cards (Google, 2019) and datasheets (Gebru et al., 2018) document model characteristics and limitations.

## Further Reading
- ACM FAccT Conference
- AI Now Institute
- Partnership on AI