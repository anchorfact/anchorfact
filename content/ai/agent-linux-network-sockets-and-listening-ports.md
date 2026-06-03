---
id: agent-linux-network-sockets-and-listening-ports
title: 'Agent Linux Network Sockets and Listening Ports'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-linux-network-sockets-and-listening-ports-1
    statement: >-
      The ss manual describes ss as a utility for investigating sockets and
      dumping socket statistics.
    source_title: ss Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man8/ss.8.html
    confidence: medium
  - id: fact-ai-agent-linux-network-sockets-and-listening-ports-2
    statement: >-
      The ss manual says the -l or --listening option displays only listening
      sockets.
    source_title: ss Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man8/ss.8.html
    confidence: medium
  - id: fact-ai-agent-linux-network-sockets-and-listening-ports-3
    statement: >-
      The tcp manual describes TCP as a reliable, stream-oriented, full-duplex
      connection between two sockets.
    source_title: tcp Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man7/tcp.7.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Socket evidence depends on namespaces, container network mode, privileges, transient listeners, IPv4 versus IPv6 binding, Unix-domain sockets, NAT, service managers, and load balancer health checks.
disputed_statements: []
primary_sources:
  - title: ss Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man8/ss.8.html
    institution: man7.org Linux manual pages
  - title: tcp Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man7/tcp.7.html
    institution: man7.org Linux manual pages
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Listening socket evidence tells an agent which processes are accepting network traffic and which ports are actually bound in the observed namespace.

## Core Explanation

When a service is unreachable, an agent should not infer availability from configuration alone. It needs runtime evidence: listening sockets, local address binding, port numbers, protocol family, connection state, owning process, and the namespace from which the observation was made.

The operational distinction matters. A service can be configured for a port but not running, running but bound only to loopback, reachable inside a container but not on the host, or shadowed by firewall and routing rules. Socket inspection provides the first runtime check before changing service config, opening firewall rules, or restarting workloads.

## Source-Mapped Facts

- The ss manual describes ss as a utility for investigating sockets and dumping socket statistics. ([source](https://man7.org/linux/man-pages/man8/ss.8.html))
- The ss manual says the -l or --listening option displays only listening sockets. ([source](https://man7.org/linux/man-pages/man8/ss.8.html))
- The tcp manual describes TCP as a reliable, stream-oriented, full-duplex connection between two sockets. ([source](https://man7.org/linux/man-pages/man7/tcp.7.html))

## Further Reading

- [ss Linux Manual Page](https://man7.org/linux/man-pages/man8/ss.8.html)
- [tcp Linux Manual Page](https://man7.org/linux/man-pages/man7/tcp.7.html)
