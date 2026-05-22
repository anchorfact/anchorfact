---
id: "kb-2026-00003"
title: "BERT (Bidirectional Encoder Representations from Transformers)"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
confidence_rationale: "Based on the original Devlin et al. (2019) paper, cross-validated with multiple independent benchmarks"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    authors: ["Devlin, Jacob", "Chang, Ming-Wei", "Lee, Kenton", "Toutanova, Kristina"]
    type: "academic_paper"
    year: 2019
    doi: "10.48550/arXiv.1810.04805"
    url: "https://arxiv.org/abs/1810.04805"
secondary_sources:
  - title: "The Illustrated BERT"
    type: "blog_post"
    author: "Jay Alammar"
    url: "https://jalammar.github.io/illustrated-bert/"
  - title: "HuggingFace BERT Documentation"
    type: "documentation"
    url: "https://huggingface.co/docs/transformers/model_doc/bert"
completeness: 0.88
related_entities:
  - "entity:transformer-architecture"
  - "entity:attention-mechanism"
  - "entity:natural-language-processing"
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model introduced by Google in 2018 that revolutionized NLP by reading text bidirectionally — considering both left and right context simultaneously. It achieved state-of-the-art results on 11 NLP benchmarks at launch, including GLUE (80.5% → 82.1% absolute improvement), SQuAD v1.1, and SWAG.

## Core Explanation

Unlike previous models (ELMo, GPT) that processed text left-to-right or concatenated separate left-to-right and right-to-left passes, BERT uses a masked language modeling (MLM) objective that allows truly bidirectional context. During pre-training, 15% of input tokens are randomly masked, and the model learns to predict them using context from both directions.

BERT's architecture is a multi-layer bidirectional Transformer encoder. The base model has 12 layers (Transformer blocks), 768 hidden dimensions, and 12 attention heads — totaling 110M parameters. The large model doubles layers, hidden size, and heads to 340M parameters. Pre-training used Wikipedia (2.5B words) and BookCorpus (0.8B words) on 16 Cloud TPUs for 4 days.

## Detailed Analysis

### Training Objectives

BERT uses two unsupervised pre-training tasks:

1. **Masked Language Modeling (MLM)** : Randomly mask 15% of tokens. Of those masked positions:
   - 80% replaced with `[MASK]`
   - 10% replaced with random token (adds noise for robustness)
   - 10% left unchanged (prevents model from ignoring unmasked tokens)
   The model predicts the original token at masked positions.

2. **Next Sentence Prediction (NSP)** : Given two sentences A and B, predict if B follows A. 50% of training pairs are consecutive, 50% are random. This was later found to be non-essential (RoBERTa removed it) but was part of the original design.

### Input Representation

BERT's input combines three embeddings:
- **Token embeddings**: WordPiece tokenization with 30,000 vocabulary
- **Segment embeddings**: Learned embedding indicating sentence A vs. B
- **Position embeddings**: Learned positional encoding (not fixed sinusoids)

Special tokens: `[CLS]` (classification token at start), `[SEP]` (sentence separator).

### Fine-Tuning Paradigm

BERT established the "pre-train then fine-tune" paradigm:
1. Pre-train on large unlabeled corpus (Wikipedia + BookCorpus)
2. Fine-tune on downstream task with labeled data (minutes to hours)
3. Minimal task-specific architecture changes (just add a classification layer)

### Key Benchmarks (at launch, 2018)

| Task | Previous SOTA | BERT Base | BERT Large |
|------|:-----------:|:---------:|:----------:|
| GLUE Score | 80.5 | — | 82.1 |
| SQuAD v1.1 | — | 88.5 F1 | 93.2 F1 |
| SQuAD v2.0 | — | 76.3 F1 | 83.1 F1 |
| SWAG | — | — | 86.3 |
| MultiNLI | 76.5 | 84.6 | 86.7 |

### Legacy

BERT's impact on NLP was profound. It established the Transformer encoder as the dominant architecture for language understanding, inspired a family of variants (RoBERTa, ALBERT, DistilBERT, DeBERTa), and demonstrated that large-scale pre-training with bidirectional context was the key to transfer learning in NLP. Google Scholar (2026) reports over 100,000 citations.

## Further Reading

- [BERT Paper](https://arxiv.org/abs/1810.04805): Original paper by Devlin et al.
- [The Illustrated BERT](https://jalammar.github.io/illustrated-bert/): Visual walkthrough
- [HuggingFace BERT](https://huggingface.co/docs/transformers/model_doc/bert): Implementation and usage
