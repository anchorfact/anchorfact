---
id: agent-linux-routing-tables-and-ip-route-lookup
title: 'Agent Linux Routing Tables and ip route Lookup'
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
  - id: fact-ai-agent-linux-routing-tables-and-ip-route-lookup-1
    statement: >-
      The ip-route manual says ip route is used to manipulate entries in the
      kernel routing tables.
    source_title: ip-route Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man8/ip-route.8.html
    confidence: medium
  - id: fact-ai-agent-linux-routing-tables-and-ip-route-lookup-2
    statement: >-
      The ip-route manual documents route types including unicast,
      unreachable, blackhole, prohibit, local, broadcast, throw, nat, and
      anycast.
    source_title: ip-route Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man8/ip-route.8.html
    confidence: medium
  - id: fact-ai-agent-linux-routing-tables-and-ip-route-lookup-3
    statement: >-
      The ip manual describes ip as a tool for showing or manipulating routing,
      network devices, interfaces, and tunnels.
    source_title: ip Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man8/ip.8.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Route lookup evidence depends on policy routing rules, source address selection, VRFs, namespaces, tunnels, firewall marks, container CNIs, dynamic routing daemons, and cloud route tables outside the host.
disputed_statements: []
primary_sources:
  - title: ip-route Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man8/ip-route.8.html
    institution: man7.org Linux manual pages
  - title: ip Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man8/ip.8.html
    institution: man7.org Linux manual pages
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Linux route evidence lets agents explain where packets would go before they edit DNS, service bindings, firewall rules, or cloud networking.

## Core Explanation

For connectivity incidents, an agent needs route lookup evidence from the same network namespace and source context as the failing process. Interface status, default routes, policy routes, route type, source address selection, and next hop are often more useful than static configuration files.

Route entries also encode failure semantics. An unreachable or blackhole route means the kernel is intentionally rejecting or discarding traffic, while a unicast route points toward forwarding. Safe remediation starts by naming the route table and rule that matched the destination.

## Source-Mapped Facts

- The ip-route manual says ip route is used to manipulate entries in the kernel routing tables. ([source](https://man7.org/linux/man-pages/man8/ip-route.8.html))
- The ip-route manual documents route types including unicast, unreachable, blackhole, prohibit, local, broadcast, throw, nat, and anycast. ([source](https://man7.org/linux/man-pages/man8/ip-route.8.html))
- The ip manual describes ip as a tool for showing or manipulating routing, network devices, interfaces, and tunnels. ([source](https://man7.org/linux/man-pages/man8/ip.8.html))

## Further Reading

- [ip-route Linux Manual Page](https://man7.org/linux/man-pages/man8/ip-route.8.html)
- [ip Linux Manual Page](https://man7.org/linux/man-pages/man8/ip.8.html)
