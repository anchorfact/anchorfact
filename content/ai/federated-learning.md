---
id: kb-2026-00278
title: Federated Learning
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.78
known_gaps:
  - This article summarizes federated optimization concepts and does not evaluate production deployments.
  - Privacy guarantees depend on the full protocol, including aggregation, differential privacy, update security, and operational controls.
disputed_statements:
  - statement: Federated learning does not automatically make training private; model updates can still leak information without additional protections.
atomic_facts:
  - id: fact-ai-federated-learning-1
    statement: Federated learning trains a shared model from decentralized data held on client devices or organizations rather than first collecting all data in one place.
    source_title: 'Communication-Efficient Learning of Deep Networks from Decentralized Data'
    source_url: https://arxiv.org/abs/1602.05629
    source_doi: 10.48550/arXiv.1602.05629
    confidence: medium
  - id: fact-ai-federated-learning-2
    statement: Federated Averaging combines local stochastic-gradient training on clients with server-side averaging of client model updates.
    source_title: 'Communication-Efficient Learning of Deep Networks from Decentralized Data'
    source_url: https://arxiv.org/abs/1602.05629
    source_doi: 10.48550/arXiv.1602.05629
    confidence: medium
  - id: fact-ai-federated-learning-3
    statement: A major survey of federated learning identifies communication efficiency, systems heterogeneity, statistical heterogeneity, and privacy as central open problems.
    source_title: Advances and Open Problems in Federated Learning
    source_url: https://arxiv.org/abs/1912.04977
    source_doi: 10.48550/arXiv.1912.04977
    confidence: medium
  - id: fact-ai-federated-learning-4
    statement: Practical secure aggregation protocols let a server learn an aggregate of client updates without learning each individual client's update.
    source_title: Practical Secure Aggregation for Privacy-Preserving Machine Learning
    source_url: https://arxiv.org/abs/1611.04482
    confidence: medium
primary_sources:
  - title: 'Communication-Efficient Learning of Deep Networks from Decentralized Data'
    authors:
      - McMahan, H. Brendan
      - Moore, Eider
      - Ramage, Daniel
      - Hampson, Seth
      - Aguera y Arcas, Blaise
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1602.05629
    doi: 10.48550/arXiv.1602.05629
    institution: Google
  - title: Advances and Open Problems in Federated Learning
    authors:
      - Kairouz, Peter
      - McMahan, H. Brendan
      - et al.
    type: survey_paper
    year: 2021
    url: https://arxiv.org/abs/1912.04977
    doi: 10.48550/arXiv.1912.04977
    institution: Foundations and Trends in Machine Learning
  - title: Practical Secure Aggregation for Privacy-Preserving Machine Learning
    authors:
      - Bonawitz, Keith
      - Ivanov, Vladimir
      - Kreuter, Ben
      - Marcedone, Antonio
      - McMahan, H. Brendan
      - Patel, Sarvar
      - Ramage, Daniel
      - Segal, Aaron
      - Seth, Karn
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1611.04482
    institution: arXiv
secondary_sources:
  - title: Federated Learning for Mobile Keyboard Prediction
    type: academic_paper
    year: 2018
    url: https://arxiv.org/abs/1811.03604
    institution: arXiv
---

## TL;DR

Federated learning trains a shared model while data stays distributed across clients. It reduces the need to centralize raw data, but privacy is a protocol property, not a slogan: aggregation, update security, differential privacy, and deployment governance still matter.

## Core Explanation

The basic loop is simple. A server sends a model to clients, clients train locally on their own data, and the server aggregates model updates into a new global model. FedAvg is the canonical version of this loop: multiple local gradient steps happen on clients before their model updates are averaged.

The practical difficulty is that clients are not identical. Devices may be offline, slow, or resource-limited, and local data is often non-IID. Secure aggregation and privacy accounting are separate layers that can reduce leakage from updates.

## Further Reading

- [Federated Averaging](https://arxiv.org/abs/1602.05629)
- [Advances and Open Problems in Federated Learning](https://arxiv.org/abs/1912.04977)
- [Practical Secure Aggregation](https://arxiv.org/abs/1611.04482)

## Related Articles

- [AI for IoT](./ai-for-iot.md)
- [Adversarial Machine Learning](./adversarial-machine-learning.md)
- [Public-Key Cryptography](../computer-science/public-key-cryptography.md)
