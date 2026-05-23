---
id: kb-2026-00278
title: Federated Learning
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Communication-Efficient Learning of Deep Networks from Decentralized Data
    authors:
      - McMahan, H. Brendan
      - Moore, Eider
      - Ramage, Daniel
      - Hampson, Seth
      - Aguera y Arcas, Blaise
    type: academic_paper
    year: 2017
    doi: 10.48550/arXiv.1602.05629
    url: https://arxiv.org/abs/1602.05629
    institution: Google
    note: The original Federated Learning paper (FedAvg). Published at AISTATS 2017. 15,000+ citations.
secondary_sources:
  - title: Advances and Open Problems in Federated Learning
    authors:
      - Kairouz, Peter
      - McMahan, H. Brendan
      - et al.
    type: survey_paper
    year: 2021
    doi: 10.48550/arXiv.1912.04977
    url: https://arxiv.org/abs/1912.04977
    institution: Foundations and Trends in ML
    note: Comprehensive survey. 5,000+ citations. Covers privacy, robustness, and fairness in FL.
completeness: 0.88
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
    confidence: medium
known_gaps:
  - Statistics and data cited are from 2021 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
ai_citations: null
atomic_facts:
  - id: fact-ai-001
    statement: >-
      Federated Learning (FL) trains ML models across decentralized devices holding local data, without centralizing the data. Devices train locally, share only model updates (not raw data) with a
      central server, which aggregates updates. Used by Google (Gboard keyboard) and Apple for privacy-preserving ML.
    confidence: high
    source_title: Communication-Efficient Learning of Deep Networks from Decentralized Data
    source_url: https://arxiv.org/abs/1602.05629
    source_doi: 10.48550/arXiv.1602.05629
  - id: fact-ai-002
    statement: "Federated Averaging (FedAvg): server averages model weights from devices."
    confidence: high
    source_title: Communication-Efficient Learning of Deep Networks from Decentralized Data
    source_url: https://arxiv.org/abs/1602.05629
    source_doi: 10.48550/arXiv.1602.05629
  - id: fact-ai-003
    statement: FL is a key enabler for privacy-respecting AI on sensitive data (healthcare, finance).
    confidence: high
    source_title: Communication-Efficient Learning of Deep Networks from Decentralized Data
    source_url: https://arxiv.org/abs/1602.05629
    source_doi: 10.48550/arXiv.1602.05629
---


## TL;DR

Federated Learning (FL) trains ML models across decentralized devices holding local data, without centralizing the data. Devices train locally, share only model updates (not raw data) with a central server, which aggregates updates. Used by Google (Gboard keyboard) and Apple for privacy-preserving ML.

## Core Explanation

Federated Averaging (FedAvg): server averages model weights from devices. Challenges: non-IID data (different users have different patterns), communication efficiency (devices on mobile networks), system heterogeneity (different hardware capabilities), privacy guarantees (differential privacy + secure aggregation). FL is a key enabler for privacy-respecting AI on sensitive data (healthcare, finance).

## Further Reading

- [Communication-Efficient Learning of Deep Networks from Decentralized Data (McMahan et al., 2017)](https://arxiv.org/abs/1602.05629)
