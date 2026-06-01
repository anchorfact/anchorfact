---
id: "kb-gd-003"
title: "AI Dialogue Prompting for Game NPCs"
schema_type: "TechArticle"
category: "game-development"
language: "en"
confidence: "medium"
last_verified: "2026-06-01"
created_date: "2026-04-28"
updated: "2026-06-01"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-gd-dialogue-prompts-001"
    statement: "Anthropic's prompting best practices recommend clear, explicit instructions for controlling a model's behavior and output."
    source_title: "Prompting Best Practices - Claude API Docs"
    source_url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags"
    confidence: "medium"
  - id: "fact-gd-dialogue-prompts-002"
    statement: "Anthropic's prompting guidance recommends XML tags as a way to separate prompt sections such as instructions, examples, and formatting."
    source_title: "Prompting Best Practices - Claude API Docs"
    source_url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags"
    confidence: "medium"
  - id: "fact-gd-dialogue-prompts-003"
    statement: "OpenAI function calling documentation describes function calling as a way to connect models to external tools and systems."
    source_title: "Function Calling in the OpenAI API"
    source_url: "https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api"
    confidence: "medium"
  - id: "fact-gd-dialogue-prompts-004"
    statement: "OpenAI function calling documentation states that Structured Outputs with strict mode guarantee generated function arguments match the provided JSON Schema."
    source_title: "Function Calling in the OpenAI API"
    source_url: "https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api"
    confidence: "medium"
  - id: "fact-gd-dialogue-prompts-005"
    statement: "OpenAI moderation documentation describes a moderation endpoint for checking whether text or images are potentially harmful."
    source_title: "Moderation - OpenAI API"
    source_url: "https://platform.openai.com/docs/guides/moderation/"
    confidence: "medium"
completeness: 0.82
known_gaps:
  - "This entry covers prompt and runtime-control primitives, not full narrative design, localization, memory architecture, or live-ops policy."
  - "Specific model behavior changes over time, so production NPC systems should test prompts against the models and safety policies they actually deploy."
disputed_statements: []
primary_sources:
  - title: "Prompting Best Practices - Claude API Docs"
    type: "documentation"
    year: 2026
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags"
    institution: "Anthropic"
  - title: "Function Calling in the OpenAI API"
    type: "documentation"
    year: 2026
    url: "https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api"
    institution: "OpenAI"
  - title: "Moderation - OpenAI API"
    type: "documentation"
    year: 2026
    url: "https://platform.openai.com/docs/guides/moderation/"
    institution: "OpenAI"
secondary_sources: []
---

## TL;DR

Game NPC prompting should separate character rules, world context, player input, output format, and safety checks. The public evidence supports clear instructions, structured sections, tool calls, schema-bound outputs, and moderation checks.

## Core Explanation

An NPC dialogue prompt is an interface contract, not just flavor text. A production prompt should define the character role, allowed knowledge, forbidden behavior, memory inputs, response length, and machine-readable actions.

For game teams, the safest pattern is:

- put role, lore, and behavior limits in stable system or developer instructions;
- pass player input and current game state as separate context;
- use structured tags or fields so the model can distinguish instructions from dialogue;
- use function calling for gameplay actions such as quest updates, inventory checks, or reputation changes;
- validate structured outputs before applying state changes;
- run moderation or equivalent safety checks for user-generated dialogue surfaces.

## Source-Mapped Facts

- Anthropic's prompting best practices recommend clear, explicit instructions for controlling a model's behavior and output. ([source](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags))
- Anthropic's prompting guidance recommends XML tags as a way to separate prompt sections such as instructions, examples, and formatting. ([source](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags))
- OpenAI function calling documentation describes function calling as a way to connect models to external tools and systems. ([source](https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api))
- OpenAI function calling documentation states that Structured Outputs with strict mode guarantee generated function arguments match the provided JSON Schema. ([source](https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api))
- OpenAI moderation documentation describes a moderation endpoint for checking whether text or images are potentially harmful. ([source](https://platform.openai.com/docs/guides/moderation/))

## Further Reading

- [Prompting Best Practices - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags)
- [Function Calling in the OpenAI API](https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api)
- [Moderation - OpenAI API](https://platform.openai.com/docs/guides/moderation/)
