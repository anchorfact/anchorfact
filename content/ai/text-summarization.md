---
id: text-summarization
title: "Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization"
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
  - id: af-text-summarization-1
    statement: >-
      ACM Computing Surveys (June 2025) published a systematic survey of text summarization tracing four eras: statistical methods (TF-IDF, TextRank, pre-2015) → neural sequence-to-sequence
      (Pointer-Generator, 2015-2019) → pre-trained language models (BART, PEGASUS, T5, 2019-2022) → LLM-based summarization (GPT-4, Claude, 2022-present) — finding that LLMs achieve ROUGE-L scores
      10-15 points higher than fine-tuned BART on multi-document and conversational summarization, but struggle with factual consistency (hallucinating 3-8% of summary content for long documents).
    source_title: ACM Computing Surveys (2025) — A Systematic Survey of Text Summarization — doi:10.1145/3731445
    source_url: https://dl.acm.org/doi/abs/10.1145/3731445
    confidence: high
  - id: af-text-summarization-2
    statement: >-
      arxiv (June 2024) and ScienceDirect (2024) surveys established long-document summarization as the key remaining challenge — for documents exceeding 10K tokens (legal briefs, scientific papers,
      meeting transcripts) — documenting that hierarchical models (discourse-aware, extract-then-abstract) and chunk-and-fuse approaches using LLMs with 100K+ context windows now achieve ROUGE-2
      scores of 22-28 (vs. 18-22 for pre-LLM baselines) on PubMed and GovReport benchmarks.
    source_title: arxiv 2406.11289 (2024) / ScienceDirect NLP Journal (2024) — Text summarization surveys
    source_url: https://arxiv.org/abs/2406.11289
    confidence: high
primary_sources:
  - id: ps-text-summarization-1
    title: "A Systematic Survey of Text Summarization: From Statistical Methods to Large Language Models"
    type: academic_paper
    year: 2025
    institution: ACM Computing Surveys
    doi: 10.1145/3731445
    url: https://dl.acm.org/doi/abs/10.1145/3731445
  - id: ps-text-summarization-2
    title: "A Systematic Survey of Text Summarization: From Statistical Methods to LLMs"
    type: academic_paper
    year: 2024
    institution: arXiv
    url: https://arxiv.org/abs/2406.11289
known_gaps:
  - Factual consistency verification — detecting and correcting hallucinated summary content
  - Personalized summarization adapting to user background knowledge and information needs
disputed_statements: []
secondary_sources:
  - title: "A Survey on Neural Text Summarization: Methods, Evaluation, and Applications"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: "Get To The Point: Summarization with Pointer-Generator Networks"
    type: conference_paper
    year: 2017
    authors:
      - See, Abigail
      - Liu, Peter J.
      - Manning, Christopher D.
    institution: Stanford / ACL
    url: https://arxiv.org/abs/1704.04368
  - title: "PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization"
    type: conference_paper
    year: 2020
    authors:
      - Zhang, Jingqing
      - Zhao, Yao
      - Saleh, Mohammad
      - Liu, Peter J.
    institution: Google Research / ICML
    url: https://arxiv.org/abs/1912.08777
  - title: "BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation"
    type: conference_paper
    year: 2019
    authors:
      - Lewis, Mike
      - Liu, Yinhan
      - Goyal, Naman
      - et al.
    institution: Facebook AI Research / ACL
    url: https://arxiv.org/abs/1910.13461
updated: "2026-05-24"
---
## TL;DR
Text summarization condenses documents into concise summaries while preserving key information. The field has evolved from simple sentence extraction to LLM-powered abstractive generation that rewrites content in its own words. The hard problems remain: summarizing book-length documents, ensuring factual accuracy, and adapting summaries to user needs.

## Core Explanation
Two paradigms: (1) Extractive summarization — select and concatenate the most important sentences from the source text. Methods: TextRank (graph-based centrality), LexRank, BERT-based sentence scoring (BERTSUM, MatchSum). Pros: factually accurate (sentences are verbatim). Cons: disjointed, can't synthesize across sentences; (2) Abstractive summarization — generate new sentences that capture the essence. Architecture: encoder-decoder (BART, PEGASUS, T5) — encoder reads source, decoder generates summary. Training: teacher forcing on (document, reference summary) pairs from CNN/DailyMail, XSum, PubMed datasets. LLM-based: prompt-based generation ("Summarize the following article: [text]") with chain-of-thought for complex documents.

## Detailed Analysis
Evaluation metrics: ROUGE (Recall-Oriented Understudy for Gisting Evaluation) — ROUGE-1 (unigram overlap), ROUGE-2 (bigram), ROUGE-L (longest common subsequence). ROUGE correlates moderately with human judgment but misses factual consistency. BERTScore (2020) uses contextual embeddings. Factuality metrics: SummaC, QAFactEval — verify summary claims against source document using NLI (Natural Language Inference). Long document summarization: the key bottleneck was context length — BART/PEGASUS limited to 1024 tokens. Solutions: (1) Hierarchical — encode sentences, then encode sentence representations (HIBERT); (2) Extractive then abstractive — select salient sentences first (30-50% compression), then generate abstractive summary; (3) LLM-based — models with 128K-1M token context windows (GPT-4, Claude, Gemini) directly process entire documents. Domain-specific summarization: medical (radiology reports → findings), legal (case law → holdings), scientific (full papers → structured abstracts). Meeting summarization: multi-speaker dialogue with topic segmentation. The ACM 2025 survey identifies the "summary faithfulness" problem as the most critical open challenge — 3-8% hallucination rate is unacceptable for high-stakes domains.

## Further Reading
- BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al., ACL 2020)
- PEGASUS: Pre-training with Extracted Gap-sentences (Zhang et al., ICML 2020)
- Hugging Face Summarization Pipeline

## Related Articles

- [Text Classification: Zero-Shot, Few-Shot, and LLM-Based Document Categorization](../text-classification.md)
- [AI for Mental Health: LLM-Based Therapy, Digital Interventions, and Clinical Trials](../ai-for-mental-health.md)
- [AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation](../ai-language-translation-interpretation.md)
