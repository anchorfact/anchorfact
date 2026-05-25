---
atomic_facts:
  - confidence: medium
    id: fact-ai-001
    source_title: Speech and Language Processing (3rd Edition)
    source_url: https://web.stanford.edu/~jurafsky/slp3/
    statement: >-
      NLP enables computers to understand, interpret, and generate human language. Tasks: text classification, named entity recognition (NER), machine translation, summarization, question answering,
      sentiment analysis. Before Transformers (2017): rule-based → statistical → neural (RNN/LSTM). After Transformers: pre-trained language models dominate.
  - confidence: medium
    id: fact-ai-002
    source_title: Speech and Language Processing (3rd Edition)
    source_url: https://web.stanford.edu/~jurafsky/slp3/
    statement: "Pre-Transformer era: TF-IDF, Word2Vec (Mikolov 2013), GloVe (Pennington 2014) for word embeddings."
  - confidence: high
    id: fact-ai-003
    source_doi: 10.48550/arXiv.1706.03762
    source_title: Attention Is All You Need
    source_url: https://arxiv.org/abs/1706.03762
    statement: RNN/LSTM with attention (Bahdanau 2014) for translation.
  - confidence: medium
    id: fact-ai-004
    source_title: Speech and Language Processing (3rd Edition)
    source_url: https://web.stanford.edu/~jurafsky/slp3/
    statement: "Post-Transformer: BERT (2018), GPT series, T5 — pre-train on massive text, fine-tune for specific task."
  - confidence: medium
    id: fact-ai-005
    source_title: Speech and Language Processing (3rd Edition)
    source_url: https://web.stanford.edu/~jurafsky/slp3/
    statement: "Current SOTA: large language models (GPT-5, Claude, Gemini) achieve few-shot and zero-shot performance on many NLP tasks."
category: ai
completeness: 0.88
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: ai_structured
id: kb-2026-00274
is_live_document: false
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Devlin, Jacob
      - Chang, Ming-Wei
      - Lee, Kenton
      - Toutanova, Kristina
    institution: Google AI / NAACL
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    type: conference_paper
    url: https://arxiv.org/abs/1810.04805
    year: 2019
  - authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
      - et al.
    institution: Google Brain / NeurIPS
    title: Attention Is All You Need (Transformer)
    type: conference_paper
    url: https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf
    year: 2017
  - authors:
      - Jurafsky, Daniel
      - Martin, James H.
    institution: Pearson / Stanford
    title: Speech and Language Processing (Jurafsky & Martin, 3rd Edition)
    type: textbook
    url: https://web.stanford.edu/~jurafsky/slp3/
    year: 2024
schema_type: TechArticle
secondary_sources:
  - authors:
      - Vaswani, Ashish
      - Shazeer, Noam
      - Parmar, Niki
      - Uszkoreit, Jakob
      - Jones, Llion
      - Gomez, Aidan N.
      - Kaiser, Lukasz
      - Polosukhin, Illia
    doi: 10.48550/arXiv.1706.03762
    institution: NeurIPS
    title: Attention Is All You Need
    type: academic_paper
    url: https://arxiv.org/abs/1706.03762
    year: 2017
title: Natural Language Processing (NLP)
updated: "2026-05-24"
---
## TL;DR

NLP enables computers to understand, interpret, and generate human language. Tasks: text classification, named entity recognition (NER), machine translation, summarization, question answering, sentiment analysis. Before Transformers (2017): rule-based → statistical → neural (RNN/LSTM). After Transformers: pre-trained language models dominate.

## Core Explanation

Pre-Transformer era: TF-IDF, Word2Vec (Mikolov 2013), GloVe (Pennington 2014) for word embeddings. RNN/LSTM with attention (Bahdanau 2014) for translation. Post-Transformer: BERT (2018), GPT series, T5 — pre-train on massive text, fine-tune for specific task. Current SOTA: large language models (GPT-5, Claude, Gemini) achieve few-shot and zero-shot performance on many NLP tasks.

## Further Reading

- [Speech and Language Processing (3rd Ed, Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/)
