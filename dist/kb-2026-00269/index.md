---
id:"kb-2026-00269"
title:"Convolutional Neural Networks (CNN)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "ImageNet Classification with Deep Convolutional Networks (AlexNet)"
    authors: ["Krizhevsky, Alex", "Sutskever, Ilya", "Hinton, Geoffrey"]
    type: "academic_paper"
    year: 2012
    doi: "10.1145/3065386"
    url: "https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
    institution: "NeurIPS"
    note: "The paper that launched the deep learning revolution. 140,000+ citations."
secondary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
    note: "Chapter 9: Convolutional Networks — comprehensive technical reference"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

CNNs are specialized neural networks for grid-structured data (images, video). Key operations: convolution (slide filters over input, detect patterns), pooling (downsample, reduce parameters), fully connected layers (classification). AlexNet (2012) won ImageNet by 10%+ margin, launching the deep learning revolution.

## Core Explanation

Convolution: filter/kernel learns spatial hierarchies — early layers detect edges, later layers detect objects. Pooling: max pooling (take max in window), average pooling. Key architectures: VGG (deep, simple), ResNet (skip connections, enable 152+ layers), Inception (multi-scale), EfficientNet (neural architecture search). Transfer learning: use pre-trained CNN, fine-tune on new task.

## Further Reading

- [ImageNet Classification with Deep Convolutional Networks (AlexNet, Krizhevsky et al., 2012)](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)
