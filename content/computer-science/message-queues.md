---
id:"kb-2026-00246"
title:"Message Queues"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Enterprise Integration Patterns (Hohpe & Woolf)"
    type:"undefined"
    url:"undefined"
    institution:"Addison-Wesley"
secondary_sources:
  - title: "Redis in Action"
    authors: ["Carlson"]
    type: "book"
    year: 2013
    url: "https://www.manning.com/books/redis-in-action"
    institution: "Manning"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Message queues enable asynchronous, decoupled communication between services. Producer sends message to queue; consumer picks it up — no direct connection needed. Benefits: load leveling, fault tolerance, temporal decoupling. Popular MQs: RabbitMQ (AMQP), Apache Kafka (log-based), Amazon SQS (managed), Redis Streams.

## Core Explanation

Patterns: Point-to-Point (one consumer), Publish-Subscribe (many consumers), Competing Consumers (load balancing). Kafka: append-only distributed log, partitions for parallelism, consumer groups track offsets, replayable. RabbitMQ: exchanges route messages to queues (direct, topic, fanout, headers). Dead Letter Queue (DLQ): messages that fail processing go here for inspection.

## Further Reading

- [Enterprise Integration Patterns (Hohpe & Woolf)](undefined)
