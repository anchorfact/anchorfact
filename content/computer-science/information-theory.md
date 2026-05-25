---
id: "kb-2026-00195"
title: "Information Theory"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Shannon invented the bit as a unit of information"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Information theory (Claude Shannon, 1948) quantifies information, establishing the theoretical limits of data compression and reliable communication. Entropy H = -Σ p(x) log p(x) measures uncertainty. Mutual information measures shared information between variables."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Applications: data compression (Huffman coding, LZ77/ZIP), error-correcting codes (Reed-Solomon, LDPC, Turbo), cryptography (entropy of keys)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"

secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Information theory (Claude Shannon, 1948) quantifies information, establishing the theoretical limits of data compression and reliable communication. Entropy H = -Σ p(x) log p(x) measures uncertainty. Mutual information measures shared information between variables.

## Core Explanation

Shannon's source coding theorem: data can be compressed to entropy bits per symbol (lossless limit). Channel capacity: maximum rate of reliable communication over a noisy channel. Applications: data compression (Huffman coding, LZ77/ZIP), error-correcting codes (Reed-Solomon, LDPC, Turbo), cryptography (entropy of keys). Shannon invented the bit as a unit of information.

## Further Reading

-

## Related Articles

- [AI for Game Theory: Computational Game Playing, Nash Equilibrium, and Multi-Agent Strategy](../../ai/ai-for-gaming-theory.md)
- [Information Extraction: NER, Relation Extraction, and LLM-Powered IE](../../ai/information-extraction.md)
- [Language Modeling: From N-grams to Scaling Laws and Information-Theoretic Foundations](../../ai/language-modeling-theory.md)
