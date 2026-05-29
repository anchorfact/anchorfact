---
id: model-compression
title: 'Model Compression: Pruning, Quantization, and Distillation'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.79
known_gaps:
  - This article explains core compression methods and does not benchmark current LLM quantizers.
  - Compression tradeoffs depend on architecture, task, calibration data, hardware kernels, and acceptable quality loss.
disputed_statements:
  - statement: Compression ratios from one model family or benchmark should not be generalized to all deployment settings.
atomic_facts:
  - id: f-model-compression-1
    statement: Knowledge distillation trains a smaller student model to match information from a larger or ensemble teacher model.
    source_title: Distilling the Knowledge in a Neural Network
    source_url: https://arxiv.org/abs/1503.02531
    confidence: medium
  - id: f-model-compression-2
    statement: Deep Compression combines pruning, trained quantization, and Huffman coding to compress neural networks.
    source_title: 'Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding'
    source_url: https://arxiv.org/abs/1510.00149
    confidence: medium
  - id: f-model-compression-3
    statement: The Lottery Ticket Hypothesis studies sparse subnetworks that can train to comparable accuracy when initialized with their original dense-network initialization.
    source_title: 'The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks'
    source_url: https://arxiv.org/abs/1803.03635
    confidence: medium
  - id: f-model-compression-4
    statement: Neural network quantization reduces numerical precision for weights or activations and can be applied during or after training.
    source_title: A White Paper on Neural Network Quantization
    source_url: https://arxiv.org/abs/2106.08295
    confidence: medium
primary_sources:
  - title: Distilling the Knowledge in a Neural Network
    authors:
      - Hinton, Geoffrey
      - Vinyals, Oriol
      - Dean, Jeff
    type: academic_paper
    year: 2015
    url: https://arxiv.org/abs/1503.02531
    institution: Google
  - title: 'Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding'
    authors:
      - Han, Song
      - Mao, Huizi
      - Dally, William J.
    type: conference_paper
    year: 2016
    url: https://arxiv.org/abs/1510.00149
    institution: ICLR
  - title: 'The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks'
    authors:
      - Frankle, Jonathan
      - Carbin, Michael
    type: conference_paper
    year: 2019
    url: https://arxiv.org/abs/1803.03635
    institution: ICLR
  - title: A White Paper on Neural Network Quantization
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2106.08295
    institution: arXiv
secondary_sources:
  - title: A Survey of Model Compression and Acceleration for Deep Neural Networks
    type: survey_paper
    year: 2017
    url: https://arxiv.org/abs/1710.09282
    institution: arXiv
---

## TL;DR

Model compression makes neural networks cheaper to store and run. The classic toolkit is distillation, pruning, and quantization, usually combined with task-specific validation because each method can trade accuracy, latency, memory, and hardware efficiency differently.

## Core Explanation

Distillation transfers behavior from a larger teacher to a smaller student. Pruning removes weights or structures that appear less important. Quantization lowers numeric precision for weights or activations. These methods are deployment tools, so the right question is not only "how small is the model?" but also "does it preserve task quality on the intended hardware?"

For AI answers, avoid generic claims that compression is lossless. Some papers report little accuracy loss in specific experiments, but production compression must be validated against the workload, model family, and runtime.

## Further Reading

- [Knowledge Distillation](https://arxiv.org/abs/1503.02531)
- [Deep Compression](https://arxiv.org/abs/1510.00149)
- [Lottery Ticket Hypothesis](https://arxiv.org/abs/1803.03635)
- [Neural Network Quantization](https://arxiv.org/abs/2106.08295)

## Related Articles

- [Knowledge Distillation](./knowledge-distillation.md)
- [Large Language Model Training](./large-language-model-training-scaling-laws-data-curation-and-compute.md)
- [AI Hardware Accelerators](./ai-hardware-accelerators.md)
