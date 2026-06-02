---
id: code-debug-adapter-protocol-for-agents
title: 'Code Debug Adapter Protocol for Agents'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-code-debug-adapter-protocol-for-agents-1
    statement: >-
      The Debug Adapter Protocol project describes DAP as an abstraction for communication
      between development tools and debuggers.
    source_title: Debug Adapter Protocol Overview
    source_url: https://microsoft.github.io/debug-adapter-protocol/
    confidence: medium
  - id: fact-cs-code-debug-adapter-protocol-for-agents-2
    statement: >-
      The Debug Adapter Protocol specification defines protocol messages including requests,
      responses, and events.
    source_title: Debug Adapter Protocol Specification
    source_url: https://microsoft.github.io/debug-adapter-protocol/specification
    confidence: medium
  - id: fact-cs-code-debug-adapter-protocol-for-agents-3
    statement: >-
      The Debug Adapter Protocol repository publishes a JSON schema for protocol messages.
    source_title: Debug Adapter Protocol JSON Schema
    source_url: https://raw.githubusercontent.com/microsoft/debug-adapter-protocol/main/debugAdapterProtocol.json
    confidence: medium
completeness: 0.83
known_gaps:
  - Debugging automation depends on language runtime support, launch configuration, source maps, breakpoint validation, thread model, and security restrictions around executing code.
disputed_statements: []
primary_sources:
  - title: Debug Adapter Protocol Overview
    type: standard
    year: 2026
    url: https://microsoft.github.io/debug-adapter-protocol/
    institution: Microsoft
  - title: Debug Adapter Protocol Specification
    type: standard
    year: 2026
    url: https://microsoft.github.io/debug-adapter-protocol/specification
    institution: Microsoft
  - title: Debug Adapter Protocol JSON Schema
    type: standard
    year: 2026
    url: https://raw.githubusercontent.com/microsoft/debug-adapter-protocol/main/debugAdapterProtocol.json
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

DAP gives code agents a structured debugger interface for breakpoints, stack frames, scopes, variables, stepping, and exception events.

## Core Explanation

Code agents often need runtime evidence, not only static code. The Debug Adapter Protocol lets tools speak a common protocol to language-specific debuggers. This can expose stack frames, variables, breakpoints, and program state in a way an agent can reason about.

The protocol boundary is also a safety boundary. Launching or attaching to a process can execute code, inspect secrets, or mutate state. Agents should treat debug sessions as privileged operations and capture approval, target process, configuration, and transcript evidence.

## Source-Mapped Facts

- The Debug Adapter Protocol project describes DAP as an abstraction for communication between development tools and debuggers. ([source](https://microsoft.github.io/debug-adapter-protocol/))
- The Debug Adapter Protocol specification defines protocol messages including requests, responses, and events. ([source](https://microsoft.github.io/debug-adapter-protocol/specification))
- The Debug Adapter Protocol repository publishes a JSON schema for protocol messages. ([source](https://raw.githubusercontent.com/microsoft/debug-adapter-protocol/main/debugAdapterProtocol.json))

## Further Reading

- [Debug Adapter Protocol Overview](https://microsoft.github.io/debug-adapter-protocol/)
- [Debug Adapter Protocol Specification](https://microsoft.github.io/debug-adapter-protocol/specification)
- [Debug Adapter Protocol JSON Schema](https://raw.githubusercontent.com/microsoft/debug-adapter-protocol/main/debugAdapterProtocol.json)
