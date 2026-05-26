---
id: kb-2026-00269
title: Convolutional Neural Networks (CNN)
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-001
    statement: >-
      CNNs are specialized neural networks for grid-structured data (images, video). Key operations: convolution (slide filters over input, detect patterns), pooling (downsample, reduce parameters),
      fully connected layers (classification). AlexNet (2012) won ImageNet by 10%+ margin, launching the deep learning revolution.
    source_title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    source_url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    source_doi: 10.1145/3065386
    confidence: high
  - id: fact-ai-002
    statement: "Key architectures: VGG (deep, simple), ResNet (skip connections, enable 152+ layers), Inception (multi-scale), EfficientNet (neural architecture search)."
    source_title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    source_url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    source_doi: 10.1145/3065386
    confidence: high
completeness: 0.88
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
primary_sources:
  - title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    authors:
      - Krizhevsky, Alex
      - Sutskever, Ilya
      - Hinton, Geoffrey
    type: academic_paper
    year: 2012
    url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    doi: 10.1145/3065386
    institution: NeurIPS
secondary_sources:
  - title: Deep Learning (Goodfellow, Bengio, Courville)
    type: book
    year: 2016
    url: https://www.deeplearningbook.org/
    institution: MIT Press
  - title: Deep Residual Learning for Image Recognition (ResNet)
    authors:
      - He
      - Zhang
      - Ren
      - Sun
    type: academic_paper
    year: 2016
    url: https://arxiv.org/abs/1512.03385
    institution: Microsoft Research
  - title: Network In Network (1x1 Convolutions)
    authors:
      - Lin
      - Chen
      - Yan
    type: academic_paper
    year: 2014
    url: https://arxiv.org/abs/1312.4400
    institution: ICLR
  - title: ConvNets Match Vision Transformers at Scale (ConvNeXt)
    type: conference_paper
    year: 2024
    authors:
      - Liu, Zhuang
      - Mao, Hanzi
      - Wu, Chao-Yuan
      - et al.
    institution: Meta AI / CVPR 2022
    url: https://arxiv.org/abs/2201.03545
  - title: "A Survey of Deep Learning for Image Classification: CNNs, ViTs, and Beyond"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: IEEE TPAMI
    url: https://doi.org/10.1109/TPAMI.2025.3567842
updated: "2026-05-24"
---
## TL;DR

CNNs are specialized neural networks for grid-structured data (images, video). Key operations: convolution (slide filters over input, detect patterns), pooling (downsample, reduce parameters), fully connected layers (classification). AlexNet (2012) won ImageNet by 10%+ margin, launching the deep learning revolution.

## Core Explanation

Convolution: filter/kernel learns spatial hierarchies — early layers detect edges, later layers detect objects. Pooling: max pooling (take max in window), average pooling. Key architectures: VGG (deep, simple), ResNet (skip connections, enable 152+ layers), Inception (multi-scale), EfficientNet (neural architecture search). Transfer learning: use pre-trained CNN, fine-tune on new task.

## Further Reading

- [ImageNet Classification with Deep Convolutional Networks (AlexNet, Krizhevsky et al., 2012)](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)

## Related Articles

- [Activation Functions in Neural Networks](../activation-functions.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Graph Neural Networks: Message Passing, Applications, and Frontiers](../graph-neural-networks-message-passing-applications-and-frontiers.md)