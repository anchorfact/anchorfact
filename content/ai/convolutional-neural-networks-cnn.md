---
id: kb-2026-00269
title: Convolutional Neural Networks (CNN)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-001
    statement: LeCun and coauthors applied gradient-based convolutional neural networks to document recognition.
    source_title: Gradient-Based Learning Applied to Document Recognition
    source_url: https://doi.org/10.1109/5.726791
    confidence: medium
  - id: fact-ai-002
    statement: AlexNet used a deep convolutional neural network for ImageNet image classification.
    source_title: ImageNet Classification with Deep Convolutional Neural Networks
    source_url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    confidence: medium
  - id: fact-ai-003
    statement: ResNet introduced residual learning with shortcut connections for training very deep image-recognition networks.
    source_title: Deep Residual Learning for Image Recognition
    source_url: https://arxiv.org/abs/1512.03385
    confidence: medium
completeness: 0.88
known_gaps:
  - Modern vision-transformer and hybrid architectures
  - Deployment constraints for CNNs on edge hardware
disputed_statements: []
primary_sources:
  - title: Gradient-Based Learning Applied to Document Recognition
    type: academic_paper
    year: 1998
    institution: Proceedings of the IEEE
    url: https://doi.org/10.1109/5.726791
  - title: ImageNet Classification with Deep Convolutional Neural Networks
    type: academic_paper
    year: 2012
    institution: NeurIPS
    url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
  - title: Deep Residual Learning for Image Recognition
    type: academic_paper
    year: 2015
    institution: arXiv
    url: https://arxiv.org/abs/1512.03385
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Convolutional neural networks are neural networks designed for grid-like data such as images. They use local filters, shared weights, nonlinear layers, and often pooling or striding to learn visual features across spatial positions.

## Core Explanation
Early layers often detect local patterns, while deeper layers combine them into more task-specific features. CNN history includes document-recognition systems, ImageNet-scale classifiers, biomedical segmentation networks, and residual architectures that made very deep networks easier to train.

## Detailed Analysis
CNNs are still widely used because convolution builds in useful assumptions about locality and translation. Modern systems may combine CNNs with attention, transformers, pretraining, or task-specific heads, so claims should specify the architecture and task rather than treating all visual AI as one model family.

## Further Reading
- LeCun et al. on document recognition
- AlexNet
- ResNet

## Related Articles

- [Activation Functions in Neural Networks](../activation-functions.md)
- [AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime](../ai-for-fraud-detection.md)
- [Graph Neural Networks: Message Passing, Applications, and Frontiers](../graph-neural-networks-message-passing-applications-and-frontiers.md)
