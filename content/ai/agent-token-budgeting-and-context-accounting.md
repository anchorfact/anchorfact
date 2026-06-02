---
id: agent-token-budgeting-and-context-accounting
title: 'Agent Token Budgeting and Context Accounting'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-token-budgeting-and-context-accounting-1
    statement: >-
      OpenAI Cookbook documentation describes tiktoken as a fast BPE tokenizer for use with OpenAI
      models.
    source_title: OpenAI Cookbook Token Counting
    source_url: https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken
    confidence: medium
  - id: fact-ai-agent-token-budgeting-and-context-accounting-2
    statement: >-
      Anthropic documentation provides a token counting API for estimating token usage without
      creating a message.
    source_title: Anthropic Token Counting
    source_url: https://platform.claude.com/docs/en/build-with-claude/token-counting
    confidence: medium
  - id: fact-ai-agent-token-budgeting-and-context-accounting-3
    statement: >-
      Google Gemini API documentation says tokens can be single characters or whole words depending
      on the language and tokenization model.
    source_title: Gemini API Token Guide
    source_url: https://ai.google.dev/gemini-api/docs/tokens
    confidence: medium
completeness: 0.83
known_gaps:
  - Exact token counts depend on provider, model, tokenizer version, tool schema format, and hidden system or safety overhead.
disputed_statements: []
primary_sources:
  - title: OpenAI Cookbook Token Counting
    type: documentation
    year: 2026
    url: https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken
    institution: OpenAI
  - title: Anthropic Token Counting
    type: documentation
    year: 2026
    url: https://platform.claude.com/docs/en/build-with-claude/token-counting
    institution: Anthropic
  - title: Gemini API Token Guide
    type: documentation
    year: 2026
    url: https://ai.google.dev/gemini-api/docs/tokens
    institution: Google AI
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Token budgeting is the agent engineering practice of estimating prompt, context, tool schema, retrieval, and output size before a model call.

## Core Explanation

Agents need context accounting because model calls combine system prompts, conversation history, retrieved evidence, tool schemas, tool results, and generated output. Without a budget, an agent can silently truncate important context or spend too much on low-value tokens.

Good budgeting happens before the call. The agent estimates input and output size, reserves room for tool calls or citations, compresses or ranks context, and records which material was omitted. Provider-specific token counting remains necessary because tokenization differs by model family.

## Source-Mapped Facts

- OpenAI Cookbook documentation describes tiktoken as a fast BPE tokenizer for use with OpenAI models. ([source](https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken))
- Anthropic documentation provides a token counting API for estimating token usage without creating a message. ([source](https://platform.claude.com/docs/en/build-with-claude/token-counting))
- Google Gemini API documentation says tokens can be single characters or whole words depending on the language and tokenization model. ([source](https://ai.google.dev/gemini-api/docs/tokens))

## Further Reading

- [OpenAI Cookbook Token Counting](https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken)
- [Anthropic Token Counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)
- [Gemini API Token Guide](https://ai.google.dev/gemini-api/docs/tokens)
