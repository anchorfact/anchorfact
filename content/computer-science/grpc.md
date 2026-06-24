---
id: kb-2026-00189
title: gRPC
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-24'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - gpt-5-codex
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-grpc-001
    statement: >-
      gRPC documentation describes gRPC as a modern, open source, high-performance remote procedure call framework that can run in any environment.
    source_title: gRPC Introduction
    source_url: https://grpc.io/docs/what-is-grpc/introduction/
    confidence: medium
  - id: fact-grpc-002
    statement: >-
      gRPC lets a client application call a method on a server application on another machine as if it were a local object.
    source_title: gRPC Introduction
    source_url: https://grpc.io/docs/what-is-grpc/introduction/
    confidence: medium
  - id: fact-grpc-003
    statement: >-
      gRPC service definitions specify remotely callable methods with their parameters and return types.
    source_title: gRPC Core Concepts
    source_url: https://grpc.io/docs/what-is-grpc/core-concepts/
    confidence: medium
  - id: fact-grpc-004
    statement: >-
      gRPC supports unary RPC, server streaming RPC, client streaming RPC, and bidirectional streaming RPC.
    source_title: gRPC Core Concepts
    source_url: https://grpc.io/docs/what-is-grpc/core-concepts/
    confidence: medium
  - id: fact-grpc-005
    statement: >-
      gRPC uses Protocol Buffers as its default interface definition language and message interchange format.
    source_title: gRPC Core Concepts
    source_url: https://grpc.io/docs/what-is-grpc/core-concepts/
    confidence: medium
  - id: fact-grpc-006
    statement: >-
      Protocol Buffers documentation describes protobuf as a language-neutral, platform-neutral, extensible mechanism for serializing structured data.
    source_title: Protocol Buffers Overview
    source_url: https://protobuf.dev/overview/
    confidence: medium
completeness: 0.9
known_gaps: []
disputed_statements: []
primary_sources:
  - title: gRPC Introduction
    type: documentation
    year: 2026
    url: https://grpc.io/docs/what-is-grpc/introduction/
    institution: gRPC
  - title: gRPC Core Concepts
    type: documentation
    year: 2026
    url: https://grpc.io/docs/what-is-grpc/core-concepts/
    institution: gRPC
  - title: Protocol Buffers Overview
    type: documentation
    year: 2026
    url: https://protobuf.dev/overview/
    institution: Protocol Buffers
  - title: Protocol Buffers Proto3 Guide
    type: documentation
    year: 2026
    url: https://protobuf.dev/programming-guides/proto3/
    institution: Protocol Buffers
secondary_sources: []
updated: '2026-06-24'
---

## TL;DR

gRPC is an open-source remote procedure call framework for typed service-to-service APIs. A service contract defines callable methods and message types, and generated clients can invoke those methods across machines as if they were local methods.

## Core Explanation

gRPC is organized around service definitions. A `.proto` file describes messages and service methods; tooling then generates client and server code for supported languages. That contract-first workflow makes gRPC useful for internal APIs, microservices, and systems where both sides need a precise method and message shape.

The framework supports four call shapes: unary request/response, server streaming, client streaming, and bidirectional streaming. Unary calls are closest to a conventional request-response API. Streaming calls are useful when a service needs to send or receive a sequence of messages without opening a separate logical request for each item.

Protocol Buffers are gRPC's default interface definition language and message format. They give teams a compact schema for structured messages, but they also require compatibility discipline when fields, method names, or service contracts change.

## Source-Mapped Facts

- gRPC documentation describes gRPC as a modern, open source, high-performance remote procedure call framework that can run in any environment. ([source](https://grpc.io/docs/what-is-grpc/introduction/))
- gRPC lets a client application call a method on a server application on another machine as if it were a local object. ([source](https://grpc.io/docs/what-is-grpc/introduction/))
- gRPC service definitions specify remotely callable methods with their parameters and return types. ([source](https://grpc.io/docs/what-is-grpc/core-concepts/))
- gRPC supports unary RPC, server streaming RPC, client streaming RPC, and bidirectional streaming RPC. ([source](https://grpc.io/docs/what-is-grpc/core-concepts/))
- gRPC uses Protocol Buffers as its default interface definition language and message interchange format. ([source](https://grpc.io/docs/what-is-grpc/core-concepts/))
- Protocol Buffers documentation describes protobuf as a language-neutral, platform-neutral, extensible mechanism for serializing structured data. ([source](https://protobuf.dev/overview/))

## Further Reading

- [gRPC Introduction](https://grpc.io/docs/what-is-grpc/introduction/)
- [gRPC Core Concepts](https://grpc.io/docs/what-is-grpc/core-concepts/)
- [Protocol Buffers Overview](https://protobuf.dev/overview/)
- [Protocol Buffers Proto3 Guide](https://protobuf.dev/programming-guides/proto3/)

## Related Articles

- [API gRPC Reflection and Protobuf Schemas](api-grpc-reflection-and-protobuf-schemas.md)
- [API gRPC Deadlines and Cancellation](api-grpc-deadlines-and-cancellation.md)
- [API gRPC Status Codes and Error Details](api-grpc-status-codes-and-error-details.md)
