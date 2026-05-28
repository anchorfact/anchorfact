---
id: kb-2026-00065
title: Linux
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-computer-science-linux-1
    statement: >-
      Linux kernel documentation states that the kernel is provided under GPL-2.0-only with an
      explicit Linux syscall exception.
    source_title: Linux kernel licensing rules
    source_url: https://docs.kernel.org/process/license-rules.html
    confidence: medium
  - id: af-computer-science-linux-2
    statement: >-
      The Linux kernel development process documentation describes a loosely time-based rolling
      release model.
    source_title: How the development process works
    source_url: https://docs.kernel.org/process/2.Process.html
    confidence: medium
  - id: af-computer-science-linux-3
    statement: >-
      Kernel.org publishes active kernel release categories including mainline, stable, and longterm
      releases.
    source_title: Active kernel releases
    source_url: https://www.kernel.org/category/releases.html
    confidence: medium
completeness: 0.85
known_gaps:
  - >-
    This field is under active research and rapid development; some conclusions may evolve with new
    evidence or technological advances
  - >-
    Certain sub-topics are covered at a general level; specialized edge cases and nuanced
    applications may not be fully addressed
disputed_statements: []
primary_sources:
  - id: ps-computer-science-linux-1
    title: Linux kernel licensing rules
    type: documentation
    year: 2026
    institution: The Linux Kernel documentation
    url: https://docs.kernel.org/process/license-rules.html
  - id: ps-computer-science-linux-2
    title: How the development process works
    type: documentation
    year: 2026
    institution: The Linux Kernel documentation
    url: https://docs.kernel.org/process/2.Process.html
  - id: ps-computer-science-linux-3
    title: Active kernel releases
    type: documentation
    year: 2026
    institution: The Linux Kernel Archives
    url: https://www.kernel.org/category/releases.html
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Linux is the open-source operating-system kernel used by many distributions, servers, embedded systems, phones, and cloud platforms. The kernel project is governed by its license, development process, and release model rather than by a single vendor product roadmap.

## Core Explanation
The Linux kernel is distributed under GPL-2.0-only with a documented syscall exception. Development is organized through maintainers, mailing lists, patch review, and a rolling release process. Kernel.org publishes release categories such as mainline, stable, and longterm, which downstream Linux distributions then package and support according to their own policies.

## Further Reading

- [Linux kernel licensing rules](https://docs.kernel.org/process/license-rules.html)
- [Linux kernel development process](https://docs.kernel.org/process/2.Process.html)
- [Kernel.org releases](https://www.kernel.org/category/releases.html)
