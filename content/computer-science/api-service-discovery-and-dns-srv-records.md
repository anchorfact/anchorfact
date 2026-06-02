---
id: api-service-discovery-and-dns-srv-records
title: 'API Service Discovery and DNS SRV Records'
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
  - id: fact-computer-science-api-service-discovery-and-dns-srv-records-1
    statement: >-
      RFC 2782 specifies a DNS RR for specifying the location of services.
    source_title: RFC 2782 DNS SRV
    source_url: https://www.rfc-editor.org/info/rfc2782/
    confidence: medium
  - id: fact-computer-science-api-service-discovery-and-dns-srv-records-2
    statement: >-
      Kubernetes DNS documentation describes DNS records for Services and Pods.
    source_title: Kubernetes DNS for Services and Pods
    source_url: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
    confidence: medium
  - id: fact-computer-science-api-service-discovery-and-dns-srv-records-3
    statement: >-
      Consul documentation describes DNS as one interface for discovering services.
    source_title: Consul DNS Interface
    source_url: https://developer.hashicorp.com/consul/docs/discover/dns
    confidence: medium
completeness: 0.84
known_gaps:
  - Service discovery depends on TTLs, health filtering, namespace rules, load balancing policy, split-horizon DNS, resolver cache behavior, and deployment platform conventions.
disputed_statements: []
primary_sources:
  - title: RFC 2782 DNS SRV
    type: rfc
    year: 2000
    url: https://www.rfc-editor.org/info/rfc2782/
    institution: IETF
  - title: Kubernetes DNS for Services and Pods
    type: documentation
    year: 2026
    url: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/
    institution: Kubernetes
  - title: Consul DNS Interface
    type: documentation
    year: 2026
    url: https://developer.hashicorp.com/consul/docs/discover/dns
    institution: HashiCorp
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Service discovery records let agents resolve which API endpoint should receive traffic without hard-coding hostnames in application logic.

## Core Explanation

When an API call fails because the target host is wrong, stale, or unhealthy, agents should inspect service discovery before changing client code. DNS SRV, platform DNS records, and service-discovery systems can encode host, port, priority, and service health.

The evidence to collect includes service name, namespace, DNS record type, TTL, returned targets, health status, resolver cache, and whether the client supports SRV or only A/AAAA lookup.

## Source-Mapped Facts

- RFC 2782 specifies a DNS RR for specifying the location of services. ([source](https://www.rfc-editor.org/info/rfc2782/))
- Kubernetes DNS documentation describes DNS records for Services and Pods. ([source](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/))
- Consul documentation describes DNS as one interface for discovering services. ([source](https://developer.hashicorp.com/consul/docs/discover/dns))

## Further Reading

- [RFC 2782 DNS SRV](https://www.rfc-editor.org/info/rfc2782/)
- [Kubernetes DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- [Consul DNS Interface](https://developer.hashicorp.com/consul/docs/discover/dns)
