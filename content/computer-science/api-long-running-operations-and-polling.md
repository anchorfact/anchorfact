---
id: api-long-running-operations-and-polling
title: 'API Long-Running Operations and Polling'
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
  - id: fact-cs-api-long-running-operations-and-polling-1
    statement: >-
      Google AIP-151 defines guidance for APIs that return long-running operations.
    source_title: Google AIP-151 Long-running Operations
    source_url: https://google.aip.dev/151
    confidence: medium
  - id: fact-cs-api-long-running-operations-and-polling-2
    statement: >-
      Azure Architecture documentation describes the asynchronous request-reply pattern as
      returning a response before backend processing has completed.
    source_title: Azure Asynchronous Request-Reply Pattern
    source_url: https://learn.microsoft.com/en-us/azure/architecture/patterns/asynchronous-request-reply
    confidence: medium
  - id: fact-cs-api-long-running-operations-and-polling-3
    statement: >-
      Azure Resource Manager documentation describes asynchronous operations that use polling
      to track operation status.
    source_title: Azure Resource Manager Async Operations
    source_url: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/async-operations
    confidence: medium
completeness: 0.83
known_gaps:
  - Long-running operation handling depends on provider-specific status URLs, retry-after hints, cancellation behavior, idempotency keys, and result retention windows.
disputed_statements: []
primary_sources:
  - title: Google AIP-151 Long-running Operations
    type: standard
    year: 2026
    url: https://google.aip.dev/151
    institution: Google
  - title: Azure Asynchronous Request-Reply Pattern
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/architecture/patterns/asynchronous-request-reply
    institution: Microsoft Azure
  - title: Azure Resource Manager Async Operations
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/async-operations
    institution: Microsoft Azure
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Long-running operation APIs separate request acceptance from completion, so agents must poll status resources instead of assuming the first response is the final result.

## Core Explanation

Cloud APIs often start operations that outlive a single HTTP request: provisioning, exports, imports, model jobs, and destructive infrastructure changes. A robust agent should capture the operation ID, polling URL, current state, terminal states, retry interval, and final resource link.

The safety issue is timing. Retrying the original request can duplicate work if the API is not idempotent. Polling the operation resource, respecting Retry-After, and handling cancellation or timeout states gives the agent a more reliable execution model.

## Source-Mapped Facts

- Google AIP-151 defines guidance for APIs that return long-running operations. ([source](https://google.aip.dev/151))
- Azure Architecture documentation describes the asynchronous request-reply pattern as returning a response before backend processing has completed. ([source](https://learn.microsoft.com/en-us/azure/architecture/patterns/asynchronous-request-reply))
- Azure Resource Manager documentation describes asynchronous operations that use polling to track operation status. ([source](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/async-operations))

## Further Reading

- [Google AIP-151 Long-running Operations](https://google.aip.dev/151)
- [Azure Asynchronous Request-Reply Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/asynchronous-request-reply)
- [Azure Resource Manager Async Operations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/async-operations)
