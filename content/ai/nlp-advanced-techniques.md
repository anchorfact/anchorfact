---
id: "nlp-advanced-techniques"
title: "Advanced NLP: Tokenization, Embeddings, and Decoding"
schema_type: "Article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-nlp-advanced-techniques-1"
    statement: "Byte-Pair Encoding (BPE, Sennrich et al., 2016) iteratively merges the most frequent byte pairs to build a subword vocabulary — the dominant tokenization strategy used by GPT, BERT, and Llama models to handle open vocabulary."
    source_title: "Sennrich et al., ACL (2016)"
    confidence: "high"
  - id: "af-nlp-advanced-techniques-2"
    statement: "Top-p (nucleus) sampling (Holtzman et al., 2020) truncates the vocabulary to the smallest set whose cumulative probability exceeds threshold p, adaptively controlling diversity — the default decoding strategy for most modern LLMs."
    source_title: "Holtzman et al., ICLR (2020)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Neural Machine Translation of Rare Words with Subword Units (BPE)"
    type: "academic_paper"
    year: 2016
    url: "https://arxiv.org/abs/1508.07909"
    institution: "ACL"
  - title: "The Curious Case of Neural Text Degeneration"
    type: "academic_paper"
    year: 2020
    url: "https://arxiv.org/abs/1904.09751"
    institution: "ICLR"

known_gaps:
  - "SentencePiece and Unigram tokenization"
  - "Speculative decoding advances"

disputed_statements:
  - statement: "No major disputed statements identified"

---

## TL;DR
Modern NLP pipelines transform raw text to vector representations suitable for neural processing. Tokenization, embeddings, and decoding strategies are the critical infrastructure between human language and machine understanding.

## Core Explanation
Tokenization: splitting text into model-digestible units (subwords, words, characters). BPE trains a subword vocabulary from corpus statistics. WordPiece (BERT) uses likelihood-based merging. SentencePiece treats input as raw byte sequences, language-agnostic.

## Detailed Analysis
Embeddings: Word2Vec (static), GloVe (global co-occurrence), contextual (BERT, GPT — same word has different vectors depending on context). Decoding: greedy (argmax each step), beam search (maintains k hypotheses), sampling (temperature + top-k/p for diversity).

## Further Reading
- Hugging Face Tokenizers Library
- Jay Alammar: The Illustrated Word2Vec
- NLP Course (Hugging Face)