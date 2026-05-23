---
id: kb-2026-00285
title: Tokenization in NLP
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Neural Machine Translation of Rare Words with Subword Units
    authors:
      - Sennrich, Rico
      - Haddow, Barry
      - Birch, Alexandra
    type: academic_paper
    year: 2016
    doi: 10.48550/arXiv.1508.07909
    url: https://arxiv.org/abs/1508.07909
    institution: ACL
    note: Introduced BPE (Byte-Pair Encoding) for NLP. 8,000+ citations. Published at ACL 2016.
secondary_sources:
  - title: "BERT: Pre-training of Deep Bidirectional Transformers"
    authors:
      - Devlin, Jacob
      - Chang, Ming-Wei
      - Lee, Kenton
      - Toutanova, Kristina
    type: academic_paper
    year: 2019
    doi: 10.48550/arXiv.1810.04805
    url: https://arxiv.org/abs/1810.04805
    institution: Google AI Language
    note: Introduced WordPiece tokenization. 100,000+ citations.
atomic_facts:
  - id: fact-ai-01
    statement: "BPE : iteratively merge most frequent adjacent token pairs"
    source_title: Neural Machine Translation of Rare Words with Subword Units
    source_url: https://arxiv.org/abs/1508.07909
    source_doi: 10.48550/arXiv.1508.07909
    confidence: high
  - id: fact-ai-001
    statement: >-
      Tokenization splits text into units (tokens) that the model processes. Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced:
      BPE, WordPiece, SentencePiece — standard for modern LLMs). Subword tokenization handles rare and unseen words by decomposing into known subword units.
    confidence: high
    source_title: Neural Machine Translation of Rare Words with Subword Units
    source_url: https://arxiv.org/abs/1508.07909
    source_doi: 10.48550/arXiv.1508.07909
  - id: fact-ai-002
    statement: "BPE (Byte-Pair Encoding): iteratively merge most frequent adjacent token pairs."
    confidence: high
    source_title: Neural Machine Translation of Rare Words with Subword Units
    source_url: https://arxiv.org/abs/1508.07909
    source_doi: 10.48550/arXiv.1508.07909
  - id: fact-ai-003
    statement: "SentencePiece (T5, LLaMA): treats input as raw text, language-agnostic (no pre-tokenization)."
    confidence: high
    source_title: Neural Machine Translation of Rare Words with Subword Units
    source_url: https://arxiv.org/abs/1508.07909
    source_doi: 10.48550/arXiv.1508.07909
  - id: fact-ai-004
    statement: "Token vocabulary size: typical LLMs use 30K-250K tokens."
    confidence: high
    source_title: Neural Machine Translation of Rare Words with Subword Units
    source_url: https://arxiv.org/abs/1508.07909
    source_doi: 10.48550/arXiv.1508.07909
completeness: 0.88
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
    confidence: medium
known_gaps:
  - Statistics and data cited are from 2019 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
ai_citations:
  - title: Let's build the GPT Tokenizer
    authors:
      - Karpathy, Andrej
    type: video_tutorial
    year: 2024
    url: https://www.youtube.com/watch?v=zduSFxRajkE
    institution: Youtube
    note: Andrej Karpathy's detailed walkthrough of BPE tokenization
  - title: Let's build the GPT Tokenizer
    authors:
      - Karpathy, Andrej
    type: video_tutorial
    year: 2024
    url: https://www.youtube.com/watch?v=zduSFxRajkE
    institution: Youtube
    note: Andrej Karpathy's detailed walkthrough of BPE tokenization
---



## TL;DR

Tokenization splits text into units (tokens) that the model processes. Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced: BPE, WordPiece, SentencePiece — standard for modern LLMs). Subword tokenization handles rare and unseen words by decomposing into known subword units.

## Core Explanation

BPE (Byte-Pair Encoding): iteratively merge most frequent adjacent token pairs. WordPiece (BERT): merges tokens that maximize likelihood — difference: BPE merges by frequency, WordPiece by language model probability. SentencePiece (T5, LLaMA): treats input as raw text, language-agnostic (no pre-tokenization). Token vocabulary size: typical LLMs use 30K-250K tokens.

## Further Reading

- [Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)](https://arxiv.org/abs/1508.07909)
