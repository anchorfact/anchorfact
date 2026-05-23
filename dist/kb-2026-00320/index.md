---
id:"kb-2026-00320"
title:"Consul (HashiCorp)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Consul Documentation"
    type: "documentation"
    year: 2026
    url: "https://developer.hashicorp.com/consul/docs"
    institution: "HashiCorp"
    note: "Service mesh, service discovery, KV store, health checking, multi-DC federation"
secondary_sources:
  - title: "DNS and BIND (5th Edition)"
    authors: ["Liu, Cricket", "Albitz, Paul"]
    type: "book"
    year: 2006
    url: "https://www.oreilly.com/library/view/dns-and-bind/0596100574/"
    institution: "O'Reilly"
    note: "Consul provides DNS-based service discovery — DNS fundamentals are essential context"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

HashiCorp Consul (2014) is a service mesh and service discovery tool. It provides: service registration + health checking, key-value store, secure service-to-service communication (mTLS + authorization), and multi-datacenter support. Service mesh: sidecar proxy (Envoy) routes and secures traffic.

## Core Explanation

Service discovery: DNS or HTTP API — `my-service.service.consul`. Health checks: HTTP, TCP, script, TTL. KV store: consistent (raft), used for feature flags, dynamic config. Connect: service mesh with intentions (access control policies). Consul KV integrates with Vault for secret storage. Multi-datacenter: WAN federation via gossip protocol.

## Further Reading

- [Consul Documentation](https://developer.hashicorp.com/consul/docs)
