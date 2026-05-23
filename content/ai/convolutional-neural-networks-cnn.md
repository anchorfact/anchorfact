---
id: kb-2026-00269
title: Convolutional Neural Networks (CNN)
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    authors:
      - Krizhevsky, Alex
      - Sutskever, Ilya
      - Hinton, Geoffrey
    type: academic_paper
    year: 2012
    doi: 10.1145/3065386
    url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    institution: NeurIPS
    note: The paper that launched the deep learning revolution. 140,000+ citations.
secondary_sources:
  - title: Deep Learning (Goodfellow, Bengio, Courville)
    type: book
    year: 2016
    url: https://www.deeplearningbook.org/
    institution: MIT Press
    note: "Chapter 9: Convolutional Networks — comprehensive technical reference"
completeness: 0.88
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
    confidence: medium
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
ai_citations:
  - title: ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)
    authors:
      - Krizhevsky, Alex
      - Sutskever, Ilya
      - Hinton, Geoffrey E.
    type: academic_paper
    year: 2012
    doi: 10.1145/3065386
    url: https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html
    institution: University of Toronto
    note: The paper that ignited the deep learning revolution in computer vision. Published at NeurIPS 2012.
  - title: "CS231n: CNN Course Notes"
    authors:
      - Karpathy, Andrej
    type: course_material
    year: 2016
    url: https://cs231n.github.io/convolutional-networks/
    institution: Stanford University
  - title: "CS231n: CNN Course Notes"
    authors:
      - Karpathy, Andrej
    type: course_material
    year: 2016
    url: https://cs231n.github.io/convolutional-networks/
    institution: Stanford University
  - title: ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)
    authors:
      - Krizhevsky, Alex
      - Sutskever, Ilya
      - Hinton, Geoffrey E.
    type: academic_paper
    year: 2012
    doi: 10.1145/3065386
    url: https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html
    institution: University of Toronto
    note: The paper that ignited the deep learning revolution in computer vision. Published at NeurIPS 2012.
atomic_facts:
  - id: fact-ai-001
    statement: >-
      CNNs are specialized neural networks for grid-structured data (images, video). Key operations: convolution (slide filters over input, detect patterns), pooling (downsample, reduce parameters),
      fully connected layers (classification). AlexNet (2012) won ImageNet by 10%+ margin, launching the deep learning revolution.
    confidence: high
    source_title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    source_url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    source_doi: 10.1145/3065386
  - id: fact-ai-002
    statement: "Key architectures: VGG (deep, simple), ResNet (skip connections, enable 152+ layers), Inception (multi-scale), EfficientNet (neural architecture search)."
    confidence: high
    source_title: ImageNet Classification with Deep Convolutional Networks (AlexNet)
    source_url: https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks
    source_doi: 10.1145/3065386
---


## TL;DR

CNNs are specialized neural networks for grid-structured data (images, video). Key operations: convolution (slide filters over input, detect patterns), pooling (downsample, reduce parameters), fully connected layers (classification). AlexNet (2012) won ImageNet by 10%+ margin, launching the deep learning revolution.

## Core Explanation

Convolution: filter/kernel learns spatial hierarchies — early layers detect edges, later layers detect objects. Pooling: max pooling (take max in window), average pooling. Key architectures: VGG (deep, simple), ResNet (skip connections, enable 152+ layers), Inception (multi-scale), EfficientNet (neural architecture search). Transfer learning: use pre-trained CNN, fine-tune on new task.

## Further Reading

- [ImageNet Classification with Deep Convolutional Networks (AlexNet, Krizhevsky et al., 2012)](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)
