---
id: api-json-rpc-request-ids-and-error-objects
title: 'API JSON-RPC Request IDs and Error Objects'
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
  - id: fact-cs-api-json-rpc-request-ids-and-error-objects-1
    statement: >-
      The JSON-RPC 2.0 specification says a Request object must contain a
      jsonrpc member with value 2.0 and a method member.
    source_title: JSON-RPC 2.0 Specification
    source_url: https://www.jsonrpc.org/specification
    confidence: medium
  - id: fact-cs-api-json-rpc-request-ids-and-error-objects-2
    statement: >-
      The JSON-RPC 2.0 specification defines a Notification as a Request object
      without an id member.
    source_title: JSON-RPC 2.0 Specification
    source_url: https://www.jsonrpc.org/specification
    confidence: medium
  - id: fact-cs-api-json-rpc-request-ids-and-error-objects-3
    statement: >-
      The Language Server Protocol specification states that LSP uses JSON-RPC
      2.0 messages for requests, responses, and notifications.
    source_title: Language Server Protocol 3.17 Specification
    source_url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    confidence: medium
completeness: 0.82
known_gaps:
  - JSON-RPC integration quality depends on transport framing, batching support, notification semantics, cancellation, id correlation, error-code taxonomy, schema validation, and provider-specific extensions.
disputed_statements: []
primary_sources:
  - title: JSON-RPC 2.0 Specification
    type: technical_specification
    year: 2013
    url: https://www.jsonrpc.org/specification
    institution: JSON-RPC Working Group
  - title: Language Server Protocol 3.17 Specification
    type: technical_specification
    year: 2022
    url: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
    institution: Microsoft
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

JSON-RPC request IDs let API agents correlate responses with requests, while notifications deliberately avoid response expectations.

## Core Explanation

Many tool protocols use JSON-RPC-like envelopes because they separate method names, parameters, request IDs, results, errors, and notifications. The ID field is operational evidence: it links a response or failure back to the exact request that produced it.

Agents should preserve the JSON-RPC version, method, params, id, transport envelope, error code, error message, and any provider-specific error data. A missing id can be intentional notification behavior, not a dropped response.

## Source-Mapped Facts

- The JSON-RPC 2.0 specification says a Request object must contain a jsonrpc member with value 2.0 and a method member. ([source](https://www.jsonrpc.org/specification))
- The JSON-RPC 2.0 specification defines a Notification as a Request object without an id member. ([source](https://www.jsonrpc.org/specification))
- The Language Server Protocol specification states that LSP uses JSON-RPC 2.0 messages for requests, responses, and notifications. ([source](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/))

## Further Reading

- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)
- [Language Server Protocol 3.17 Specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
