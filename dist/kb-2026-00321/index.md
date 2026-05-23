---
id:"kb-2026-00321"
title:"Nomad (HashiCorp)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Nomad Documentation"
    type: "documentation"
    year: 2026
    url: "https://developer.hashicorp.com/nomad/docs"
    institution: "HashiCorp"
    note: "Flexible orchestrator: batch, service, system jobs; multi-cloud; single binary"
secondary_sources:
  - title: "Nomad vs Kubernetes (HashiCorp)"
    type: "comparison"
    year: 2024
    url: "https://developer.hashicorp.com/nomad/docs/nomad-vs-kubernetes"
    institution: "HashiCorp"
    note: "Official comparison: simpler architecture, no dedicated scheduler"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

HashiCorp Nomad (2015) is a flexible workload orchestrator — a simpler alternative to Kubernetes. Schedules and manages containers, VMs, and standalone applications across infrastructure. Single binary, no external dependencies. Nomad excels at non-containerized workloads (Java JARs, raw binaries) alongside containers.

## Core Explanation

Job specification (HCL): task group → tasks with resources, constraints, services. Schedulers: service (long-running), batch (short-lived), system (one per node). Nomad + Consul + Vault: the 'HashiStack' for orchestration + service mesh + secrets. Multi-region: federation across datacenters. Comparison to K8s: simpler, more versatile, smaller community.

## Further Reading

- [Nomad Documentation](https://developer.hashicorp.com/nomad/docs)
