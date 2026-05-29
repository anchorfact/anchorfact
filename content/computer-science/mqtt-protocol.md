---
id: "kb-2026-00188"
title: "MQTT Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-mqtt-1"
    statement: "The OASIS MQTT 5.0 specification defines MQTT as a client-server publish/subscribe messaging transport protocol."
    source_title: "MQTT Version 5.0"
    source_url: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html"
    confidence: "medium"
  - id: "fact-mqtt-2"
    statement: "MQTT 5.0 defines three Quality of Service levels for application messages: at most once, at least once, and exactly once."
    source_title: "MQTT Version 5.0"
    source_url: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html"
    confidence: "medium"
  - id: "fact-mqtt-3"
    statement: "MQTT 3.1.1 is also an OASIS Standard for the MQTT protocol."
    source_title: "MQTT Version 3.1.1"
    source_url: "https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html"
    confidence: "medium"

completeness: 0.8

known_gaps:
  - "This compact repair focuses on the standardized publish/subscribe model and QoS semantics, not broker-specific implementation behavior."

disputed_statements: []

primary_sources:
  - title: "MQTT Version 5.0"
    authors: ["Banks, A.", "Briggs, E.", "Borgendale, K.", "Gupta, R."]
    type: "standard"
    year: 2019
    url: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html"
    institution: "OASIS"
  - title: "MQTT Version 3.1.1"
    authors: ["Banks, A.", "Gupta, R."]
    type: "standard"
    year: 2014
    url: "https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html"
    institution: "OASIS"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

MQTT is a client-server publish/subscribe messaging protocol standardized by OASIS. It is often used when applications need topic-based message exchange with explicit delivery-service levels.

## Core Explanation

MQTT clients publish messages to topic names and subscribe using topic filters. The server, often called a broker, receives publications and routes matching messages to subscribers.

The protocol defines Quality of Service levels for message delivery: at most once, at least once, and exactly once. Those levels describe protocol delivery guarantees, not whether an application has processed a message successfully.

## Further Reading

- [MQTT Version 5.0](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html)
- [MQTT Version 3.1.1](https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html)

## Related Articles

- [Message Queues](../message-queues.md)
- [Internet of Things (IoT)](../internet-of-things-iot.md)
- [TCP/IP Protocol Suite](../tcp-ip.md)
