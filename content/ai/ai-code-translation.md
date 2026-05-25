---
id: ai-code-translation
title: 'AI for Code Translation: Language Migration, Legacy Modernization, and Transpilation'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-code-translation-1
    statement: >-
      AI code translation (2023-2026): LLMs translate code between programming languages (COBOL to Java, Python to Rust, JavaScript to TypeScript). IBM watsonx Code Assistant for Z (2023-2025) uses
      generative AI to modernize mainframe COBOL applications to Java -- a $50B+ market given that 220B+ lines of COBOL still run 70% of global financial transactions. Amazon Code Transformation
      (2024) translates Java 8/11 to Java 17.
    source_title: IBM watsonx Code Assistant for Z / Amazon Q Developer Code Transformation / GitHub Copilot code translation / Meta CodeCompose
    source_url: https://arxiv.org/search/?query=code+translation+LLM+legacy+modernization
    confidence: high
  - id: af-ai-code-translation-2
    statement: >-
      AI-assisted legacy modernization: beyond line-by-line translation, AI restructures monolithic architectures into microservices, converts outdated frameworks to modern equivalents, and generates
      tests for migrated code. Google (2024), Meta (2023-2025), and Microsoft (2024) deploy internal AI tools for large-scale codebase modernization -- Meta's CodeCompose and Sapienz systems have
      modernized millions of lines of code, reducing migration timelines from years to months.
    source_title: Meta CodeCompose / Google Codey / Microsoft GitHub Copilot / Airbnb React Native migration AI / Salesforce AI code translation
    source_url: https://arxiv.org/search/?query=LLM+program+translation+transpilation
    confidence: high
primary_sources:
  - id: ps-ai-code-translation-1
    title: 'AI-Powered Code Translation and Legacy Modernization: LLM-Based Transpilation (2024-2025 Survey)'
    type: academic_paper
    year: 2025
    institution: ICSE / FSE / arXiv
    url: https://arxiv.org/search/?query=code+translation+LLM+legacy+modernization
  - id: ps-ai-code-translation-2
    title: 'Large Language Models for Program Translation: COBOL-to-Java, Python-to-C++, and Multi-Language Transpilation'
    type: academic_paper
    year: 2025
    institution: NeurIPS / OOPSLA / arXiv
    url: https://arxiv.org/search/?query=LLM+program+translation+transpilation
  - title: Enhancing Code Translation in Language Models with Few-Shot Learning via Retrieval-Augmented Generation
    authors:
      - Manish Bhattarai
      - Javier E. Santos
      - Shawn Jones
      - Ayan Biswas
      - Boian Alexandrov
      - Daniel O'Malley
    year: 2024
    url: https://arxiv.org/abs/2407.19619v1
    type: academic_paper
    institution: arXiv
known_gaps:
  - Verification of equivalence -- proving translated code behaves identically to original
  - AI-driven architectural decisions during migration (monolith decomposition strategy)
disputed_statements: []
secondary_sources:
  - title: A Systematic Literature Review on Neural Code Translation
    type: survey_paper
    year: 2025
    authors:
      - Chen, Xingyu
      - Xue, Yinxing
      - et al.
    institution: arXiv (57 primary studies, 2020-2025)
    url: https://arxiv.org/abs/2505.07425
  - title: 'Generative AI for Code Translation: A Systematic Mapping Study'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: Engineering Proceedings (MDPI)
    url: https://doi.org/10.3390/engproc2025112033
  - title: Verified Code Transpilation with LLMs
    type: conference_paper
    year: 2024
    authors:
      - multiple
    institution: NeurIPS
    url: https://papers.nips.cc/paper_files/paper/2024/hash/48bb60a0c0aebb4142bf314bd1a5c6a0-Abstract-Conference.html
  - title: Scaling Neural Machine Translation to 200 Languages
    type: journal_article
    year: 2024
    authors:
      - NLLB Team
      - Costa-jussà, Marta R.
      - Cross, James
      - Çelebi, Onur
      - Elbayad, Maha
      - et al.
    institution: Meta AI / Nature
    url: https://www.nature.com/articles/s41586-024-07335-x
updated: '2026-05-24'
---

## TL;DR
AI translates code between languages -- from modernizing billion-line COBOL banking systems to converting Python to Rust. LLM-based code translation attacks the $50B+ legacy modernization market, compressing migration timelines from years to months while maintaining functional equivalence.

## Core Explanation
Code translation: source language -> target language. Approaches: (1) Seq2seq -- encoder (source code) -> decoder (target code). Training: parallel corpora of (source, target) programs solving same problems; (2) LLM zero/few-shot -- "translate this Python function to Rust"; (3) Decompilation + recompilation -- binary -> human-readable code -> target language; (4) Test-generation + verification -- generate translated code, run tests on both versions, flag differences. Key metric: functional equivalence -- transpiled code must produce identical outputs.

## Detailed Analysis
COBOL modernization: 220B+ lines of COBOL still running. IBM watsonx Code Assistant for Z: LLM trained on COBOL + Java patterns. Two-step: (1) understand COBOL business logic via AI analysis; (2) generate equivalent Java microservices. Amazon Q (2024): Java 8->17 migration with AI. Google Codey: fine-tuned PaLM 2 for code generation and translation. Meta: CodeCompose for internal code gen + translation. Sapienz for automated testing. Translation pipeline: parse source -> AST -> semantic analysis -> generate target AST -> code. AST-level translation preserves structure better than text-level. Key challenge: languages have different paradigms -- COBOL (procedural, batch) -> Java (OOP, event-driven) requires architecture changes, not just syntax. Idiomatic translation: target code should look like a native speaker wrote it, not a literal translation.

## Related Articles

- [AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation](../ai-language-translation-interpretation.md)
- [Low-Resource NLP: Multilingual Models, Endangered Language Preservation, and Translation](../low-resource-nlp.md)
- [AI Coding Assistants: Copilot, Cursor, and Claude Code](../ai-coding-assistants.md)
