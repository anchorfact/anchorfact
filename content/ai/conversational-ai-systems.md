---
id: "conversational-ai-systems"
title: "Conversational AI: Task-Oriented Dialogue and Open-Domain Chatbots"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-conversational-ai-systems-1"
    statement: "Rasa CALM (Conversational AI with Language Models, 2024) replaces traditional intent-classification + state-machine dialogue with an LLM-generated flow — business logic expressed as natural language descriptions, with the LLM deciding next actions based on conversation context."
    source_title: "Rasa CALM / Task-Oriented Dialogue with In-Context Learning (2024)"
    source_url: "https://link.springer.com/book/10.1007/978-3-031-02176-3"
    confidence: "high"
  - id: "af-conversational-ai-systems-2"
    statement: "Task-oriented dialogue systems follow a structured pipeline: natural language understanding (intent + slot filling), dialogue state tracking, dialogue policy, and natural language generation. Modern LLM-based approaches can collapse this pipeline into a single end-to-end model with tool calling for database access."
    source_title: "Stanford CS224 Dialogue Systems / Jurafsky & Martin (2024)"
    source_url: "https://arxiv.org/abs/2402.11115"
    confidence: "high"
primary_sources:
  - id: "ps-conversational-ai-systems-1"
    title: "Conversational AI: Dialogue Systems, Conversational Agents, and Chatbots (McTear)"
    type: "textbook"
    year: 2021
    institution: "Morgan & Claypool / Springer"
    url: "https://link.springer.com/book/10.1007/978-3-031-02176-3"
  - id: "ps-conversational-ai-systems-2"
    title: "Task-Oriented Dialogue with In-Context Learning (CALM)"
    type: "academic_paper"
    year: 2024
    institution: "Rasa / arXiv"
    url: "https://arxiv.org/abs/2402.11115"
known_gaps:
  - "Handling ambiguity and clarification in dialogue"
  - "Emotion-aware conversational systems"
disputed_statements: []
---

## TL;DR
Conversational AI spans from task-oriented bots that book flights to open-domain chatbots that discuss any topic. Modern LLMs have collapsed the traditional modular pipeline into end-to-end neural approaches, while frameworks like Rasa CALM bring enterprise-grade reliability.

## Core Explanation
Traditional task-oriented pipeline: NLU (intent classification + entity extraction), DST (dialogue state tracking — what has been said and confirmed), DP (dialogue policy — what to do next), NLG (generate response). Example: "Book a flight to Paris on Friday" → intent=book_flight, destination=Paris, date=Friday. LLM-based approaches use function calling to interact with APIs and databases within conversational flow.

## Detailed Analysis
Dialogue state tracking tracks slot values (confirmed/requested), dialogue acts (inform, request, confirm, greet). Modern LLM approaches use tool-augmented generation: the LLM decides when to call search, database, or booking APIs. Rasa CALM maps business logic to natural language flows with guardrails. Chatbot evaluation: task completion rate, user satisfaction, conversation length, and hallucination rate.

## Further Reading
- Rasa Open Source Documentation
- Google Dialogue Flow CX
- ParlAI (Facebook AI Research)
