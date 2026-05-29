---
id: kb-2026-00003
title: BERT (Bidirectional Encoder Representations from Transformers)
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-22'
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-bert-1
    statement: BERT is a bidirectional Transformer encoder model pretrained with masked language modeling and next sentence prediction objectives.
    source_title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding'
    source_url: https://arxiv.org/abs/1810.04805
    source_doi: 10.48550/arXiv.1810.04805
    confidence: medium
  - id: fact-ai-bert-2
    statement: Devlin et al. reported that BERT could be fine-tuned with one additional output layer for tasks such as question answering and language inference.
    source_title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding'
    source_url: https://arxiv.org/abs/1810.04805
    source_doi: 10.48550/arXiv.1810.04805
    confidence: medium
  - id: fact-ai-bert-3
    statement: RoBERTa revisited BERT pretraining choices and reported improved performance by training longer, using larger batches and more data, and removing next sentence prediction.
    source_title: 'RoBERTa: A Robustly Optimized BERT Pretraining Approach'
    source_url: https://arxiv.org/abs/1907.11692
    source_doi: 10.48550/arXiv.1907.11692
    confidence: medium
  - id: fact-ai-bert-4
    statement: ELECTRA replaces masked language modeling with a replaced-token detection pretraining task that trains a discriminator to detect tokens substituted by a generator.
    source_title: 'ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators'
    source_url: https://arxiv.org/abs/2003.10555
    source_doi: 10.48550/arXiv.2003.10555
    confidence: medium
completeness: 0.84
known_gaps:
  - This article covers BERT as a stable encoder-model concept, not live benchmark rankings.
  - BERT-family variants such as ALBERT, DeBERTa, and domain-specific BERT models deserve separate focused entries.
disputed_statements: []
primary_sources:
  - title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding'
    authors:
      - Devlin, Jacob
      - Chang, Ming-Wei
      - Lee, Kenton
      - Toutanova, Kristina
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1810.04805
    doi: 10.48550/arXiv.1810.04805
    institution: Google AI Language
  - title: 'RoBERTa: A Robustly Optimized BERT Pretraining Approach'
    authors:
      - Liu, Yinhan
      - Ott, Myle
      - Goyal, Naman
      - Du, Jingfei
      - Joshi, Mandar
      - Chen, Danqi
      - Levy, Omer
      - Lewis, Mike
      - Zettlemoyer, Luke
      - Stoyanov, Veselin
    type: academic_paper
    year: 2019
    url: https://arxiv.org/abs/1907.11692
    doi: 10.48550/arXiv.1907.11692
    institution: Facebook AI / University of Washington
  - title: 'ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators'
    authors:
      - Clark, Kevin
      - Luong, Minh-Thang
      - Le, Quoc V.
      - Manning, Christopher D.
    type: academic_paper
    year: 2020
    url: https://arxiv.org/abs/2003.10555
    doi: 10.48550/arXiv.2003.10555
    institution: Stanford University / Google Research
---

## TL;DR

BERT is an encoder-only Transformer language model designed for language understanding tasks. Its durable citation value is the pretrain-then-fine-tune pattern for bidirectional text encoders, especially masked language modeling and task-specific fine-tuning.

## Core Claims

BERT differs from autoregressive language models because it trains a bidirectional encoder. During pretraining, masked language modeling asks the model to recover masked tokens from both left and right context.

BERT also made a practical recipe popular: pretrain one general-purpose encoder, then fine-tune it for downstream tasks with small task-specific heads. This made the same pretrained model useful for classification, natural language inference, and extractive question answering.

RoBERTa and ELECTRA are useful boundaries around the original BERT recipe. RoBERTa showed that BERT's training setup could be improved by changing data, batch, and objective choices; ELECTRA showed a different discriminator-style pretraining objective for text encoders.

## Citation Boundaries

Use this article for stable BERT-family encoder concepts. Do not use it for current benchmark leaderboards, current model popularity, or claims that BERT remains state of the art on modern generative-model tasks.

## Further Reading

- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805)
- [RoBERTa: A Robustly Optimized BERT Pretraining Approach](https://arxiv.org/abs/1907.11692)
- [ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators](https://arxiv.org/abs/2003.10555)
