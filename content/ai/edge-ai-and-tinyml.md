---
id: edge-ai-and-tinyml
title: "Edge AI and TinyML: Intelligence at the Edge"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-edge-ai-1
    statement: >-
      TinyML focuses on running machine-learning inference on microcontrollers and other ultra-low-power
      devices.
    source_title: "TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers"
    source_url: https://www.oreilly.com/library/view/tinyml/9781492052036/
    confidence: medium
  - id: fact-edge-ai-2
    statement: >-
      MobileNets use depthwise separable convolutions to reduce computation for mobile and embedded vision
      models.
    source_title: "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications"
    source_url: https://arxiv.org/abs/1704.04861
    confidence: medium
  - id: fact-edge-ai-3
    statement: >-
      Federated learning trains models across decentralized devices while keeping raw training data local to
      those devices.
    source_title: Communication-Efficient Learning of Deep Networks from Decentralized Data
    source_url: https://arxiv.org/abs/1602.05629
    confidence: medium
completeness: 0.86
known_gaps:
  - On-device training hardware, accelerators, and neuromorphic systems are outside this compact repair.
disputed_statements: []
primary_sources:
  - title: "TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers"
    type: textbook
    year: 2020
    url: https://www.oreilly.com/library/view/tinyml/9781492052036/
    institution: O'Reilly
    authors:
      - Pete Warden
      - Daniel Situnayake
  - title: "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications"
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1704.04861
    institution: Google / arXiv
    authors:
      - Andrew G. Howard
      - Menglong Zhu
      - Bo Chen
  - title: Communication-Efficient Learning of Deep Networks from Decentralized Data
    type: conference_paper
    year: 2017
    url: https://arxiv.org/abs/1602.05629
    institution: AISTATS / Google
    authors:
      - Brendan McMahan
      - Eider Moore
      - Daniel Ramage
      - Seth Hampson
      - Blaise Aguera y Arcas
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Edge AI runs machine learning close to the data source, including phones, sensors, and microcontrollers. This repair aligns the evidence to TinyML, MobileNets, and federated learning rather than duplicate or future survey sources.

## Core Explanation

TinyML addresses ultra-low-power inference, MobileNets address efficient neural architectures, and federated learning addresses decentralized training without centralizing raw data.

## Further Reading

- [TinyML](https://www.oreilly.com/library/view/tinyml/9781492052036/)
- [MobileNets](https://arxiv.org/abs/1704.04861)
- [Federated Learning](https://arxiv.org/abs/1602.05629)

## Related Articles

- [AI for IoT](../ai-for-iot.md)
- [Model Compression](../model-compression.md)
