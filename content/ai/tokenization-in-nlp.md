---
id: "kb-2026-00285"
title: "Tokenization in NLP"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-001"
    statement: "Tokenization splits text into units (tokens) that the model processes. Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced: BPE, WordPiece, SentencePiece — standard for modern LLMs). Subword tokenization handles rare and unseen words by decomposing into known subword units."
    source_title: "Neural Machine Translation of Rare Words with Subword Units (BPE)"
    source_url: "https://arxiv.org/abs/1508.07909"
    confidence: "medium"
  - id: "fact-ai-002"
    statement: "Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced: BPE, WordPiece, SentencePiece — standard for modern LLMs)."
    source_title: "Neural Machine Translation of Rare Words with Subword Units (BPE)"
    source_url: "https://arxiv.org/abs/1508.07909"
    confidence: "medium"
  - id: "fact-ai-003"
    statement: "Subword tokenization handles rare and unseen words by decomposing into known subword units."
    source_title: "Neural Machine Translation of Rare Words with Subword Units (BPE)"
    source_url: "https://arxiv.org/abs/1508.07909"
    confidence: "medium"
  - id: "fact-ai-004"
    statement: "BERT uses WordPiece tokenization for its input representation."
    source_title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    source_url: "https://arxiv.org/abs/1810.04805"
    confidence: "medium"
  - id: "fact-ai-005"
    statement: "SentencePiece (T5, LLaMA): treats input as raw text, language-agnostic (no pre-tokenization)."
    source_title: "SentencePiece: A Simple and Language Independent Subword Tokenizer and Detokenizer"
    source_url: "https://arxiv.org/abs/1808.06226"
    confidence: "medium"

completeness: 0.85

known_gaps:
  - "Statistics and data cited are from 2024 and earlier; more recent developments may have become available since publication"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The choice between BPE, WordPiece, Unigram, and SentencePiece tokenization affects downstream model performance; no single method is universally optimal across all languages"

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
  - title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    authors: ["Devlin", "Chang", "Lee", "Toutanova"]
    type: "academic_paper"
    year: 2019
    url: "https://arxiv.org/abs/1810.04805"
    institution: "Google AI Language"

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

## Related Articles

- [Advanced NLP: Tokenization, Embeddings, and Decoding](../nlp-advanced-techniques.md)
- [AI for Electronic Health Records: Clinical NLP, Coding Automation, and Physician Burnout Reduction](../ai-electronic-health-records.md)
- [Low-Resource NLP: Multilingual Models, Endangered Language Preservation, and Translation](../low-resource-nlp.md)
