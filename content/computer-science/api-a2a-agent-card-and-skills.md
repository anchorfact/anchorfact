---
id: api-a2a-agent-card-and-skills
title: 'API A2A Agent Card and Skills'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-api-a2a-agent-card-and-skills-1
    statement: >-
      The A2A specification describes Agent2Agent as an open standard for
      communication and interoperability between independent AI agent systems.
    source_title: Agent2Agent Protocol Specification
    source_url: https://github.com/a2aproject/A2A/blob/main/docs/specification.md
    confidence: medium
  - id: fact-cs-api-a2a-agent-card-and-skills-2
    statement: >-
      The A2A specification defines an Agent Card as a JSON metadata document
      published by an A2A server describing identity, capabilities, skills,
      service endpoint, and authentication requirements.
    source_title: Agent2Agent Protocol Specification
    source_url: https://github.com/a2aproject/A2A/blob/main/docs/specification.md
    confidence: medium
  - id: fact-cs-api-a2a-agent-card-and-skills-3
    statement: >-
      A2A tutorial documentation says an AgentSkill describes a specific
      capability or function an agent can perform.
    source_title: A2A Agent Skills and Agent Card Tutorial
    source_url: https://a2a-protocol.org/dev/tutorials/python/3-agent-skills-and-card/
    confidence: medium
completeness: 0.82
known_gaps:
  - A2A implementations depend on protocol version, transport binding, authentication model, supported modalities, server discovery policy, task lifecycle behavior, and whether a deployment exposes public or authenticated extended cards.
disputed_statements: []
primary_sources:
  - title: Agent2Agent Protocol Specification
    type: specification
    year: 2026
    url: https://github.com/a2aproject/A2A/blob/main/docs/specification.md
    institution: A2A Protocol
  - title: A2A Agent Skills and Agent Card Tutorial
    type: documentation
    year: 2026
    url: https://a2a-protocol.org/dev/tutorials/python/3-agent-skills-and-card/
    institution: A2A Protocol
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

A2A Agent Cards and AgentSkill objects give agents a discoverable contract for what another agent can do and how to contact it.

## Core Explanation

Agent-to-agent workflows need a discovery surface that is narrower than arbitrary web search but richer than a single endpoint. An A2A Agent Card exposes identity, service URL, capabilities, skills, modalities, and authentication expectations so a client can decide whether a remote agent is suitable before sending work.

For infrastructure agents, the useful evidence is the exact card URL, protocol version, service endpoint, skill IDs, descriptions, tags, examples, input and output modes, auth requirements, and whether the card is public or extended behind authentication. This keeps delegation grounded in declared capability instead of natural-language guesswork.

## Source-Mapped Facts

- The A2A specification describes Agent2Agent as an open standard for communication and interoperability between independent AI agent systems. ([source](https://github.com/a2aproject/A2A/blob/main/docs/specification.md))
- The A2A specification defines an Agent Card as a JSON metadata document published by an A2A server describing identity, capabilities, skills, service endpoint, and authentication requirements. ([source](https://github.com/a2aproject/A2A/blob/main/docs/specification.md))
- A2A tutorial documentation says an AgentSkill describes a specific capability or function an agent can perform. ([source](https://a2a-protocol.org/dev/tutorials/python/3-agent-skills-and-card/))

## Further Reading

- [Agent2Agent Protocol Specification](https://github.com/a2aproject/A2A/blob/main/docs/specification.md)
- [A2A Agent Skills and Agent Card Tutorial](https://a2a-protocol.org/dev/tutorials/python/3-agent-skills-and-card/)
