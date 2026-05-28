---
id: text-summarization
title: 'Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization'
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
  - id: af-text-summarization-1
    statement: Pointer-generator networks combine copying from the source text with generating new words for abstractive summarization.
    source_title: 'Get To The Point: Summarization with Pointer-Generator Networks'
    source_url: https://arxiv.org/abs/1704.04368
    confidence: medium
  - id: af-text-summarization-2
    statement: BART is a denoising sequence-to-sequence pretraining method used for natural-language generation tasks including summarization.
    source_title: 'BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension'
    source_url: https://arxiv.org/abs/1910.13461
    confidence: medium
  - id: af-text-summarization-3
    statement: PEGASUS pretrains summarization models by masking important sentences and training the model to generate the missing sentences.
    source_title: 'PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization'
    source_url: https://arxiv.org/abs/1912.08777
    confidence: medium
primary_sources:
  - id: ps-text-summarization-1
    title: 'Get To The Point: Summarization with Pointer-Generator Networks'
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1704.04368
  - id: ps-text-summarization-2
    title: 'BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension'
    type: academic_paper
    year: 2019
    institution: arXiv
    url: https://arxiv.org/abs/1910.13461
  - id: ps-text-summarization-3
    title: 'PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization'
    type: academic_paper
    year: 2019
    institution: arXiv
    url: https://arxiv.org/abs/1912.08777
known_gaps:
  - Faithfulness evaluation for abstractive summaries
  - Domain-specific summarization where hallucinated details can cause harm
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Text summarization condenses documents into shorter outputs. The evidence-backed story runs from pointer-generator models to pretrained sequence-to-sequence systems such as BART and PEGASUS.

## Core Explanation
Extractive summarization selects existing sentences or spans. Abstractive summarization may generate new wording, which can make summaries more fluent but also creates faithfulness risk.

## Detailed Analysis
For a public knowledge base, the safest claims describe documented model mechanisms and avoid broad claims that summaries are accurate by default. Faithfulness, attribution, and domain reliability remain the central quality issues for modern summarization systems.

## Related Articles

- [Text Classification: Zero-Shot, Few-Shot, and LLM-Based Document Categorization](../text-classification.md)
- [AI for Mental Health: LLM-Based Therapy, Digital Interventions, and Clinical Trials](../ai-for-mental-health.md)
- [AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation](../ai-language-translation-interpretation.md)
