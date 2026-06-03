---
id: agent-linux-cgroups-and-pressure-stall-information
title: 'Agent Linux Cgroups and Pressure Stall Information'
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
  - id: fact-ai-agent-linux-cgroups-and-pressure-stall-information-1
    statement: >-
      The Linux kernel cgroup v2 documentation describes itself as the
      authoritative documentation for the design, interface, and conventions of
      cgroup v2.
    source_title: Linux Kernel Control Group v2 Documentation
    source_url: https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html
    confidence: medium
  - id: fact-ai-agent-linux-cgroups-and-pressure-stall-information-2
    statement: >-
      The Linux kernel PSI documentation says pressure information for CPU,
      memory, and IO is exported through files under /proc/pressure.
    source_title: Linux Kernel Pressure Stall Information Documentation
    source_url: https://www.kernel.org/doc/html/v6.10/accounting/psi.html
    confidence: medium
  - id: fact-ai-agent-linux-cgroups-and-pressure-stall-information-3
    statement: >-
      The Linux kernel PSI documentation says pressure stall information is
      also tracked for tasks grouped into cgroups when cgroup2 is mounted.
    source_title: Linux Kernel Pressure Stall Information Documentation
    source_url: https://www.kernel.org/doc/html/v6.10/accounting/psi.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Cgroup and PSI diagnosis depends on kernel configuration, cgroup v1 versus v2, container runtime paths, delegated hierarchy permissions, CPU and memory controller availability, pressure window interpretation, orchestrator QoS classes, and whether host-level or container-level cgroup paths are being inspected.
disputed_statements: []
primary_sources:
  - title: Linux Kernel Control Group v2 Documentation
    type: documentation
    year: 2026
    url: https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html
    institution: Linux kernel documentation
  - title: Linux Kernel Pressure Stall Information Documentation
    type: documentation
    year: 2024
    url: https://www.kernel.org/doc/html/v6.10/accounting/psi.html
    institution: Linux kernel documentation
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Cgroups and PSI help agents diagnose resource contention by connecting process groups to CPU, memory, and IO pressure signals.

## Core Explanation

Agents investigating throttling, noisy neighbors, or stalled jobs need evidence that goes beyond process CPU percentages. Cgroups define the resource hierarchy and limits that a process group lives under, while PSI exposes whether tasks are waiting on CPU, memory, or IO resources.

Before changing limits or restarting workloads, an agent should record the cgroup path, mounted hierarchy, active controllers, relevant pressure files, current limits, orchestrator metadata, and the time window over which pressure was observed. This keeps remediation tied to the actual resource domain rather than a misleading host-wide average.

## Source-Mapped Facts

- The Linux kernel cgroup v2 documentation describes itself as the authoritative documentation for the design, interface, and conventions of cgroup v2. ([source](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html))
- The Linux kernel PSI documentation says pressure information for CPU, memory, and IO is exported through files under /proc/pressure. ([source](https://www.kernel.org/doc/html/v6.10/accounting/psi.html))
- The Linux kernel PSI documentation says pressure stall information is also tracked for tasks grouped into cgroups when cgroup2 is mounted. ([source](https://www.kernel.org/doc/html/v6.10/accounting/psi.html))

## Further Reading

- [Linux Kernel Control Group v2 Documentation](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)
- [Linux Kernel Pressure Stall Information Documentation](https://www.kernel.org/doc/html/v6.10/accounting/psi.html)
