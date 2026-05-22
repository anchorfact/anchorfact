---
id:"kb-2026-00269"
title:"Convolutional Neural Networks (CNN)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"ImageNet Classification with Deep Convolutional Networks (AlexNet, Krizhevsky et al., 2012)"
    type:"paper"
    year:2012
    url:"https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks"
    institution:"NIPS"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

CNNs are specialized neural networks for grid-structured data (images, video). Key operations: convolution (slide filters over input, detect patterns), pooling (downsample, reduce parameters), fully connected layers (classification). AlexNet (2012) won ImageNet by 10%+ margin, launching the deep learning revolution.

## Core Explanation

Convolution: filter/kernel learns spatial hierarchies — early layers detect edges, later layers detect objects. Pooling: max pooling (take max in window), average pooling. Key architectures: VGG (deep, simple), ResNet (skip connections, enable 152+ layers), Inception (multi-scale), EfficientNet (neural architecture search). Transfer learning: use pre-trained CNN, fine-tune on new task.

## Further Reading

- [ImageNet Classification with Deep Convolutional Networks (AlexNet, Krizhevsky et al., 2012)](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks)
