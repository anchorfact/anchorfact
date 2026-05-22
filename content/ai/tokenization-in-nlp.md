---
id:"kb-2026-00285"
title:"Tokenization in NLP"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)"
    type:"paper"
    year:2016
    url:"https://arxiv.org/abs/1508.07909"
    institution:"ACL"
secondary_sources:
  - title: "BERT: Pre-training of Deep Bidirectional Transformers"
    authors: ["Devlin", "Chang", "Lee", "Toutanova"]
    type: "academic_paper"
    year: 2019
    doi: "10.48550/arXiv.1810.04805"
    url: "https://arxiv.org/abs/1810.04805"
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Tokenization splits text into units (tokens) that the model processes. Methods: word-level (large vocabulary, OOV problem), character-level (tiny vocabulary, long sequences), subword (balanced: BPE, WordPiece, SentencePiece — standard for modern LLMs). Subword tokenization handles rare and unseen words by decomposing into known subword units.

## Core Explanation

BPE (Byte-Pair Encoding): iteratively merge most frequent adjacent token pairs. WordPiece (BERT): merges tokens that maximize likelihood — difference: BPE merges by frequency, WordPiece by language model probability. SentencePiece (T5, LLaMA): treats input as raw text, language-agnostic (no pre-tokenization). Token vocabulary size: typical LLMs use 30K-250K tokens.

## Further Reading

- [Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)](https://arxiv.org/abs/1508.07909)
