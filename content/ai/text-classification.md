---
id: text-classification
title: 'Text Classification: Zero-Shot, Few-Shot, and LLM-Based Document Categorization'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-text-classification-1
    statement: CNN sentence classifiers apply convolutional filters over word embeddings for sentence-level classification.
    source_title: Convolutional Neural Networks for Sentence Classification
    source_url: https://arxiv.org/abs/1408.5882
    confidence: medium
  - id: af-text-classification-2
    statement: fastText showed that simple linear models with bag-of-words and n-gram features can be efficient for text classification.
    source_title: Bag of Tricks for Efficient Text Classification
    source_url: https://arxiv.org/abs/1607.01759
    confidence: medium
  - id: af-text-classification-3
    statement: BERT introduced bidirectional Transformer pretraining that can be fine-tuned for downstream language tasks including classification.
    source_title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding'
    source_url: https://arxiv.org/abs/1810.04805
    confidence: medium
primary_sources:
  - id: ps-text-classification-1
    title: Convolutional Neural Networks for Sentence Classification
    type: academic_paper
    year: 2014
    institution: arXiv
    url: https://arxiv.org/abs/1408.5882
  - id: ps-text-classification-2
    title: Bag of Tricks for Efficient Text Classification
    type: academic_paper
    year: 2016
    institution: arXiv
    url: https://arxiv.org/abs/1607.01759
  - id: ps-text-classification-3
    title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding'
    type: academic_paper
    year: 2018
    institution: arXiv
    url: https://arxiv.org/abs/1810.04805
known_gaps:
  - Label drift and dataset imbalance in deployed classifiers
  - Calibration and explanation quality for high-stakes classification decisions
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Text classification assigns labels to documents, sentences, or messages. Durable evidence spans CNN sentence models, efficient bag-of-words baselines, and Transformer pretraining.

## Core Explanation
The task can include spam filtering, topic labeling, sentiment analysis, routing, and policy categorization. Model choice depends on data size, latency, label complexity, and tolerance for errors.

## Detailed Analysis
This repair keeps the article grounded in representative methods and avoids broad claims that one architecture is always best.

## Related Articles

- [Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization](../text-summarization.md)
- [AI for Mental Health: LLM-Based Therapy, Digital Interventions, and Clinical Trials](../ai-for-mental-health.md)
- [AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation](../ai-language-translation-interpretation.md)
