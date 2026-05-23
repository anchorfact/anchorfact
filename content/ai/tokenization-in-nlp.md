---
id: "kb-2026-00285"
title: "Tokenization in NLP"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true

atomic_facts:
  - id: "fact-ai-001"
    statement: "Tokenization splits text into units (tokens) that the model processes. Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced: BPE, WordPiece, SentencePiece — standard for modern LLMs). Subword tokenization handles rare and unseen words by decomposing into known subword units."
    source_title: "Neural Machine Translation of Rare Words with Subword Units (BPE)"
    source_url: "https://arxiv.org/abs/1508.07909"
    confidence: "high"

completeness: 0.85

disputed_statements:
  - statement: "The choice between BPE, WordPiece, Unigram, and SentencePiece tokenization affects downstream model performance; no single method is universally optimal across all languages"
    context: "See tokenization survey literature"

known_gaps:
  - "Statistics and data cited are from 2024 and earlier; more recent developments may have become available since publication"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

primary_sources:
  - title: "Neural Machine Translation of Rare Words with Subword Units (BPE)"
    authors: ["Sennrich", "Haddow", "Birch"]
    type: "academic_paper"
    year: 2016
    url: "https://arxiv.org/abs/1508.07909"
    institution: "ACL / University of Edinburgh"
  - title: "SentencePiece: A Simple and Language Independent Subword Tokenizer and Detokenizer"
    authors: ["Kudo", "Richardson"]
    type: "academic_paper"
    year: 2018
    url: "https://arxiv.org/abs/1808.06226"
    institution: "Google"

secondary_sources:
  - title: "Attention Is All You Need (Transformer)"
    authors: ["Vaswani", "Shazeer", "Parmar", "et al."]
    type: "academic_paper"
    year: 2017
    url: "https://arxiv.org/abs/1706.03762"
    institution: "NIPS / Google"

---


## TL;DR

Tokenization splits text into units (tokens) that the model processes. Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced: BPE, WordPiece, SentencePiece — standard for modern LLMs). Subword tokenization handles rare and unseen words by decomposing into known subword units.

## Core Explanation

BPE (Byte-Pair Encoding): iteratively merge most frequent adjacent token pairs. WordPiece (BERT): merges tokens that maximize likelihood — difference: BPE merges by frequency, WordPiece by language model probability. SentencePiece (T5, LLaMA): treats input as raw text, language-agnostic (no pre-tokenization). Token vocabulary size: typical LLMs use 30K-250K tokens.

## Further Reading

- [Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)](https://arxiv.org/abs/1508.07909)
