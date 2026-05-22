---
id:"kb-2026-00278"
title:"Federated Learning"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Communication-Efficient Learning of Deep Networks from Decentralized Data (McMahan et al., 2017)"
    type:"paper"
    year:2017
    url:"https://arxiv.org/abs/1602.05629"
    institution:"AISTATS"
secondary_sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    authors: ["Lewis", "Perez", "Piktus"]
    type: "academic_paper"
    year: 2020
    doi: "10.48550/arXiv.2005.11401"
    url: "https://arxiv.org/abs/2005.11401"
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Federated Learning (FL) trains ML models across decentralized devices holding local data, without centralizing the data. Devices train locally, share only model updates (not raw data) with a central server, which aggregates updates. Used by Google (Gboard keyboard) and Apple for privacy-preserving ML.

## Core Explanation

Federated Averaging (FedAvg): server averages model weights from devices. Challenges: non-IID data (different users have different patterns), communication efficiency (devices on mobile networks), system heterogeneity (different hardware capabilities), privacy guarantees (differential privacy + secure aggregation). FL is a key enabler for privacy-respecting AI on sensitive data (healthcare, finance).

## Further Reading

- [Communication-Efficient Learning of Deep Networks from Decentralized Data (McMahan et al., 2017)](https://arxiv.org/abs/1602.05629)
