---
id: agent-tool-timeouts-and-cancellation
title: 'Agent Tool Timeouts and Cancellation'
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
  - id: fact-ai-agent-tool-timeouts-and-cancellation-1
    statement: >-
      Model Context Protocol cancellation documentation says MCP supports optional cancellation of
      in-progress requests through notification messages.
    source_title: MCP Cancellation
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation
    confidence: medium
  - id: fact-ai-agent-tool-timeouts-and-cancellation-2
    statement: >-
      MDN documentation says the AbortController interface lets developers abort one or more web
      requests as and when desired.
    source_title: AbortController
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    confidence: medium
  - id: fact-ai-agent-tool-timeouts-and-cancellation-3
    statement: >-
      AWS Lambda documentation says a Lambda function runs until it returns a response, exits, or
      times out.
    source_title: AWS Lambda Timeout
    source_url: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
    confidence: medium
completeness: 0.84
known_gaps:
  - Cancellation support depends on the tool implementation; some operations can only stop future work, not undo completed side effects.
disputed_statements: []
primary_sources:
  - title: MCP Cancellation
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation
    institution: Model Context Protocol
  - title: AbortController
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    institution: MDN Web Docs
  - title: AWS Lambda Timeout
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Tool timeouts and cancellation prevent an agent run from hanging indefinitely and give users a way to stop long-running work.

## Core Explanation

An agent tool call should have a bounded lifetime. A timeout protects the caller from a slow or stuck dependency; cancellation lets a user or orchestrator request that ongoing work stop. Both mechanisms are especially important for browser automation, shell commands, network calls, and background jobs.

Engineering teams should treat cancellation as cooperative. The runtime can send a cancellation signal, but each tool must decide whether it can stop cleanly, free resources, avoid sending stale results, and report whether any side effects already happened.

## Source-Mapped Facts

- Model Context Protocol cancellation documentation says MCP supports optional cancellation of in-progress requests through notification messages. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation))
- MDN documentation says the AbortController interface lets developers abort one or more web requests as and when desired. ([source](https://developer.mozilla.org/en-US/docs/Web/API/AbortController))
- AWS Lambda documentation says a Lambda function runs until it returns a response, exits, or times out. ([source](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html))

## Further Reading

- [MCP Cancellation](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/cancellation)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [AWS Lambda Timeout](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html)
