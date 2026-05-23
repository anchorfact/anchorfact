---
id: "kb-2026-00274"



title: "Natural Language Processing (NLP)"
schema_type: "TechArticle"



category: "ai"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Speech and Language Processing (3rd Edition)"
    authors: ["Jurafsky, Daniel", "Martin, James H."]
    type: "book"



    year: 2024
    url: "https://web.stanford.edu/~jurafsky/slp3/"


    institution: "Stanford University"
    note: "The definitive NLP textbook, continuously updated. Covers pre-Transformer and Transformer-era NLP."



secondary_sources:
  - title: "Attention Is All You Need"
    authors: ["Vaswani, Ashish", "Shazeer, Noam", "Parmar, Niki", "Uszkoreit, Jakob", "Jones, Llion", "Gomez, Aidan N.", "Kaiser, Lukasz", "Polosukhin, Illia"]
    type: "academic_paper"



    year: 2017
    doi: "10.48550/arXiv.1706.03762"



    url: "https://arxiv.org/abs/1706.03762"
    institution: "NeurIPS"



    note: "The paper that transformed NLP — 140,000+ citations"
completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"


known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
ai_citations:
---

## TL;DR

NLP enables computers to understand, interpret, and generate human language. Tasks: text classification, named entity recognition (NER), machine translation, summarization, question answering, sentiment analysis. Before Transformers (2017): rule-based → statistical → neural (RNN/LSTM). After Transformers: pre-trained language models dominate.

## Core Explanation

Pre-Transformer era: TF-IDF, Word2Vec (Mikolov 2013), GloVe (Pennington 2014) for word embeddings. RNN/LSTM with attention (Bahdanau 2014) for translation. Post-Transformer: BERT (2018), GPT series, T5 — pre-train on massive text, fine-tune for specific task. Current SOTA: large language models (GPT-5, Claude, Gemini) achieve few-shot and zero-shot performance on many NLP tasks.

## Further Reading

- [Speech and Language Processing (3rd Ed, Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/)
