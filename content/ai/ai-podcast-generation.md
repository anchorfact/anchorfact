---
id: ai-podcast-generation
title: "AI Podcast Generation: Text-to-Speech Narration, AI Hosts, and Automated Audio Content"
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
  - id: af-ai-podcast-generation-1
    statement: >-
      AI podcast and audio content generation (2023-2026): NotebookLM Audio Overview (Google, 2024) generates conversational AI-host podcast episodes from uploaded documents, with two AI hosts
      discussing the content in a natural, engaging dialogue. ElevenLabs (2024-2025) provides voice cloning and AI narration used by publishers like Storytel. Descript (2023-2025) enables AI-powered
      audio editing via text-based interface, with AI voice regeneration for corrections.
    source_title: Google NotebookLM Audio Overview (2024) / ElevenLabs AI narration / Descript AI audio editing / Wondercraft AI / Podcastle AI
    source_url: https://arxiv.org/search/?query=AI+podcast+generation+text+to+speech+narration
    confidence: high
  - id: af-ai-podcast-generation-2
    statement: >-
      The AI podcasting ecosystem (2024-2026): Wondercraft AI and Podcastle provide end-to-end podcast creation from text scripts, including voice selection, background music generation, and audio
      mastering. AI podcasting challenges traditional audio production: what took hours of recording and editing now takes minutes. Spotify (2024-2025) launched AI-powered features including AI DJ
      (personalized music + commentary) and AI voice translation for podcasts.
    source_title: Wondercraft AI (2025) / Podcastle AI / Spotify AI DJ / Spotify voice translation / Riverside AI editing
    source_url: https://arxiv.org/search/?query=conversational+AI+audio+podcast+generation
    confidence: high
primary_sources:
  - id: ps-ai-podcast-generation-1
    title: "AI-Powered Audio Content Creation: Podcast Generation, Text-to-Speech Narration, and Automated Audio Production (2024-2025 Survey)"
    type: academic_paper
    year: 2025
    institution: Interspeech / ICASSP / arXiv
    url: https://arxiv.org/search/?query=AI+podcast+generation+text+to+speech+narration
  - id: ps-ai-podcast-generation-2
    title: "Conversational AI for Audio Content: Multi-Speaker Dialogue Generation and Narrative Podcast Production"
    type: academic_paper
    year: 2025
    institution: ACL / NAACL / arXiv
    url: https://arxiv.org/search/?query=conversational+AI+audio+podcast+generation
known_gaps:
  - AI-generated journalistic integrity -- accuracy, sourcing, factuality
  - Long-form narrative audio content with emotional arc and pacing
disputed_statements: []
secondary_sources:
  - title: "A Survey on AI-Generated Audio Content: From Speech Synthesis to Podcast Generation"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE/ACM TASLP
    url: https://doi.org/10.1109/TASLP.2024.3385267
  - title: "NotebookLM Audio Overviews: AI-Powered Podcast Generation from Documents (Google)"
    type: report
    year: 2024
    authors:
      - Google Research
    institution: Google Labs
    url: https://blog.google/technology/ai/notebooklm-audio-overviews/
  - title: "Neural Text-to-Speech Synthesis: A Comprehensive Survey"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3635100
  - title: "ElevenLabs and the Rise of AI Voice Generation: How Generative Audio Is Reshaping Media Production"
    type: report
    year: 2025
    authors:
      - a16z Research
    institution: Andreessen Horowitz
    url: https://a16z.com/ai-voice-generation-2025/
updated: "2026-05-24"
---
## TL;DR
AI generates podcasts -- from NotebookLM's AI hosts discussing uploaded documents to ElevenLabs narrating audiobooks to Spotify's AI DJ. The podcast creation pipeline is being compressed from hours of recording/editing to minutes of AI generation.

## Core Explanation
Podcast AI: (1) Script generation -- LLM converts documents/outlines into podcast scripts; (2) Voice -- neural TTS (ElevenLabs, Azure, Play.ht) generates natural narration (100+ voice options, emotional range: excitement, sadness, suspense); (3) Multi-speaker -- AI generates turn-taking conversation between hosts (NotebookLM Audio Overview); (4) Audio editing -- Descript: edit audio by editing text transcript. Remove filler words, regenerate sentences; (5) Music + SFX -- AI generates background music (Suno, Udio).

## Detailed Analysis
NotebookLM Audio Overview (2024): viral feature. Upload documents -> two AI hosts have 10-minute conversation about content. Use case: students converting lecture notes to study podcasts, researchers sharing papers. ElevenLabs Projects (2025): long-form narration with voice cloning. Authors and publishers creating audiobooks. Storytel AI narration partnership. Descript: edit audio like a doc. Overdub: AI voice clone reads corrections. Studio Sound: AI removes background noise, equalizes. Wondercraft: end-to-end podcast studio. Write script -> select AI voice from 200+ -> add music -> publish. Spotify AI DJ (2023-2025): personalized music + AI voice commentary (Xavier "X" Jernigan voice clone). Spotify voice translation (2024): translate podcasts to other languages while preserving original speaker's voice characteristics.
