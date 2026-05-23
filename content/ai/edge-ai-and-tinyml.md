---
id:"edge-ai-and-tinyml"
title:"Edge AI and TinyML: Intelligence at the Edge"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-edge-ai-and-tinyml-1"
    statement:"TinyML — machine learning on microcontrollers using <1mW power — enables always-on inference on devices like Arduino and Cortex-M processors. TensorFlow Lite Micro and Edge Impulse are the leading frameworks."
    source_title:"Warden & Situnayake, TinyML (2019)"
    confidence:"high"
  - id:"af-edge-ai-and-tinyml-2"
    statement:"MobileNet (Howard et al., 2017) uses depthwise separable convolutions — splitting standard convolution into depthwise (spatial filtering per channel) and pointwise (1x1 cross-channel combination) — reducing computation by 8-9x for mobile vision tasks."
    source_title:"Howard et al., arXiv (2017)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"TinyML: Machine Learning with TensorFlow Lite"
    type:"textbook"
    year:2019
    url:"https://www.oreilly.com/library/view/tinyml/9781492052036/"
    institution:"O'Reilly"
  - title:"MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications"
    type:"academic_paper"
    year:2017
    url:"https://arxiv.org/abs/1704.04861"
    institution:"Google"

known_gaps:
  - "On-device training (federated learning)"
  - "Neuromorphic computing for edge AI"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
Edge AI runs machine learning directly on devices — smartphones, IoT sensors, microcontrollers — eliminating cloud latency and privacy concerns. TinyML pushes ML to devices using <1mW of power.

## Core Explanation
Edge deployment constraints: memory (MB to KB), compute (no GPU), power (battery), and connectivity (intermittent). Model optimization via quantization, pruning, and architecture design (MobileNet, EfficientNet) is essential. ONNX Runtime and TFLite provide cross-platform inference.

## Detailed Analysis
Efficient architectures: MobileNet (depthwise separable convolution), ShuffleNet (channel shuffle), EfficientNet (compound scaling of depth/width/resolution), MCUNet (TinyNAS + TinyEngine for microcontrollers). Edge TPU (Google Coral) and Apple Neural Engine provide dedicated hardware acceleration.

## Further Reading
- TensorFlow Lite Micro
- Edge Impulse Platform
- tinyML Foundation