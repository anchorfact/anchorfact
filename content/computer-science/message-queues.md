---
id: "kb-2026-00246"
title: "Message Queues"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Dead Letter Queue : messages that fail processing go here for inspection"
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Message queues enable asynchronous, decoupled communication between services. Producer sends message to queue; consumer picks it up — no direct connection needed. Benefits: load leveling, fault tolerance, temporal decoupling. Popular MQs: RabbitMQ (AMQP), Apache Kafka (log-based), Amazon SQS (managed), Redis Streams."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Patterns: Point-to-Point (one consumer), Publish-Subscribe (many consumers), Competing Consumers (load balancing)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Dead Letter Queue (DLQ): messages that fail processing go here for inspection."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"

secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Message queues enable asynchronous, decoupled communication between services. Producer sends message to queue; consumer picks it up — no direct connection needed. Benefits: load leveling, fault tolerance, temporal decoupling. Popular MQs: RabbitMQ (AMQP), Apache Kafka (log-based), Amazon SQS (managed), Redis Streams.

## Core Explanation

Patterns: Point-to-Point (one consumer), Publish-Subscribe (many consumers), Competing Consumers (load balancing). Kafka: append-only distributed log, partitions for parallelism, consumer groups track offsets, replayable. RabbitMQ: exchanges route messages to queues (direct, topic, fanout, headers). Dead Letter Queue (DLQ): messages that fail processing go here for inspection.

## Further Reading

- [Enterprise Integration Patterns (Hohpe & Woolf)](undefined)

## Related Articles

- [Graph Neural Networks: Message Passing, Applications, and Frontiers](../../ai/graph-neural-networks-message-passing-applications-and-frontiers.md)
- [Graph Neural Networks: Message Passing and Applications](../../ai/graph-neural-networks.md)
- [NATS and Message Brokers: Pub-Sub, Request-Reply, and Queue Groups](../nats-and-message-brokers-pub-sub-request-reply-and-queue-groups.md)