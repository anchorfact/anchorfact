---
id:"kb-2026-00320"
title:"Consul (HashiCorp)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Consul Documentation"
    type:"documentation"
    year:2026
    url:"https://developer.hashicorp.com/consul/docs"
    institution:"HashiCorp"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "DNS and BIND (5th Ed)"
    authors: ["Liu", "Albitz"]
    type: "book"
    year: 2006
    url: "https://www.oreilly.com/library/view/dns-and-bind/0596100574/"
    institution: "O'Reilly"
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
