---
id: text-classification
title: "Text Classification: Zero-Shot, Few-Shot, and LLM-Based Document Categorization"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-text-classification-1
    statement: >-
      arxiv (February 2025) compared text classification across 32 datasets spanning 8 languages in the LLM era -- evaluating zero-shot classification, few-shot fine-tuning, and synthetic data-based
      classifiers versus traditional fine-tuned models -- finding that zero-shot LLM classification (GPT-4) achieves 85-90% of fine-tuned BERT performance without any training data, while few-shot
      (8-16 examples) matches or exceeds it for most tasks.
    source_title: arxiv 2502.11830 (2025) -- Text Classification in the LLM Era -- Where do we stand?
    source_url: https://arxiv.org/abs/2502.11830
    confidence: high
  - id: af-text-classification-2
    statement: >-
      Springer (August 2025) published a comprehensive review of NLP zero-shot and few-shot learning methods -- covering text classification, NER, and sentiment analysis -- documenting that
      prompt-based zero-shot classification (natural language inference reformulation) and SetFit (few-shot sentence transformer fine-tuning) are the dominant paradigms, with SetFit achieving 90%+
      accuracy with just 8 labeled examples per class on standard benchmarks (AG News, DBpedia).
    source_title: "Springer Applied Sciences (2025) -- A review on NLP zero-shot and few-shot learning: methods and applications -- doi:10.1007/s42452-025-07225-5"
    source_url: https://link.springer.com/article/10.1007/s42452-025-07225-5
    confidence: high
primary_sources:
  - id: ps-text-classification-1
    title: Text Classification in the LLM Era -- Where do we stand?
    type: academic_paper
    year: 2025
    institution: arXiv
    url: https://arxiv.org/abs/2502.11830
  - id: ps-text-classification-2
    title: "A review on NLP zero-shot and few-shot learning: methods and applications"
    type: academic_paper
    year: 2025
    institution: Springer Applied Sciences
    url: https://link.springer.com/article/10.1007/s42452-025-07225-5
known_gaps:
  - Hierarchical multi-label classification with 1000+ classes
  - Domain adaptation for text classification in specialized fields (legal, medical)
disputed_statements: []
secondary_sources:
  - title: "A Survey of Text Classification With Transformers: How Wide? How Large? How Long? How Accurate? How Different?"
    type: survey_paper
    year: 2024
    authors:
      - Chovanec, Marek
      - Fields, Eric
      - et al.
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2023.3347856
  - title: "A Survey on Text Classification Algorithms: From Traditional to Deep Learning"
    type: survey_paper
    year: 2022
    authors:
      - multiple
    institution: Information (MDPI)
    url: https://doi.org/10.3390/info13020083
  - title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    type: conference_paper
    year: 2019
    authors:
      - Devlin, Jacob
      - Chang, Ming-Wei
      - Lee, Kenton
      - Toutanova, Kristina
    institution: Google AI / NAACL
    url: https://arxiv.org/abs/1810.04805
  - title: "Trends in Natural Language Processing for Text Classification: A Comprehensive Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ResearchGate / SN Computer Science
    url: https://doi.org/10.1007/s42979-025-03474-8
updated: "2026-05-24"
---
## TL;DR
Text classification -- assigning categories to documents -- is one of NLP's oldest and most practical tasks. The LLM era has transformed it: zero-shot classification eliminates the need for labeled data, few-shot approaches match traditional fine-tuning with 8 examples, and LLMs can classify documents based on natural language instructions rather than fixed category sets.

## Core Explanation
Text classification tasks: (1) Topic classification -- what is this about? (sports, politics, technology); (2) Sentiment analysis -- positive/negative/neutral; (3) Intent classification -- what does the user want? (booking, complaint, information); (4) Spam detection; (5) Language identification. Traditional approach: fine-tune BERT/RoBERTa on labeled dataset (1K-100K examples per class). Problem: labeling is expensive and categories change (new product categories, emerging topics). LLM approach: (A) Zero-shot -- prompt LLM with "Classify: [text] 
 Categories: [list]" + natural language inference reformulation (does this text entail the category description?); (B) Few-shot -- provide 2-8 labeled examples in the prompt; (C) SetFit -- fine-tune SentenceTransformer with contrastive learning on few examples, train lightweight classifier on top.

## Detailed Analysis
arxiv 2025 LLM-era benchmark: 32 datasets, 8 languages. Key findings: (1) Zero-shot GPT-4 achieves 85-90% of fine-tuned BERT accuracy on English text classification; (2) Few-shot (16 examples) matches or exceeds fine-tuned BERT for simpler tasks (topic classification, sentiment), lags by 5-10% on fine-grained classification; (3) Synthetic data generation (LLM creates training examples) bridges the gap to within 2-5% of fully supervised training. Springer 2025 review: SetFit (Tunstall et al., 2022) -- two-stage: contrastive fine-tuning of sentence transformer on few-shot pairs, then train logistic regression classifier on embeddings. Matches GPT-3 few-shot with 1600x smaller model. WC-SBERT (ACM 2024): zero-shot topic classification using SBERT embeddings + Wikipedia category hierarchy as label space. Nature 2026 zero-shot military text classification: prompt engineering with chain-of-thought reasoning for domain-specific fine-grained categories.

## Related Articles

- [Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization](../text-summarization.md)
- [AI for Mental Health: LLM-Based Therapy, Digital Interventions, and Clinical Trials](../ai-for-mental-health.md)
- [AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation](../ai-language-translation-interpretation.md)
