---
id: "kb-2026-00065"


title: "Linux"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
confidence_rationale: "Based on Linux kernel documentation and official kernel.org sources"


last_verified: "2026-05-22"
generation_method: "human_only"


ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "The Linux Kernel Documentation"
    type: "documentation"


    year: 2026
    url: "https://www.kernel.org/doc/html/latest/"

    institution: "Linux Kernel Organization"
  - title: "Linux Kernel GitHub Mirror"
    type: "repository"


    url: "https://github.com/torvalds/linux"
    institution: "GitHub"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"


    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"

    institution: "Mozilla"
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"


    year: 2014
    url: "https://git-scm.com/book/en/v2"

    institution: "Apress"
atomic_facts:
  - id: fact-computer-science-01
    statement: Linux is an open-source, Unix-like operating system kernel created by Linus Torvalds in 1991
    source_title: The Linux Kernel Documentation
    source_url: https://www.kernel.org/doc/html/latest/
    confidence: medium
  - id: fact-computer-science-02
    statement: >-
      Combined with GNU utilities, it forms the GNU/Linux operating system that powers 100% of the TOP500 supercomputers,
      96.3% of the top 1 million web servers, all Android devices , and the majority of cloud infrastructure
    source_title: The Linux Kernel Documentation
    source_url: https://www.kernel.org/doc/html/latest/
    confidence: medium
  - id: fact-computer-science-03
    statement: >-
      Linux is licensed under GPLv2 and maintained by thousands of contributors worldwide, with Linus Torvalds remaining
      the principal maintainer as of 2026
    source_title: The Linux Kernel Documentation
    source_url: https://www.kernel.org/doc/html/latest/
    confidence: medium
  
completeness: 0.85
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
related_entities:
  - "entity:operating-systems"
ai_citations:
  - title: "The Linux Programming Interface"
    authors: ["Kerrisk, Michael"]
    type: "textbook"


    year: 2010
    isbn: "978-1593272203"


    institution: "No Starch Press"
  - title: "The Linux Programming Interface"
    authors: ["Kerrisk, Michael"]
    type: "textbook"


    year: 2010
    isbn: "978-1593272203"


    institution: "No Starch Press"
---

## TL;DR

Linux is an open-source, Unix-like operating system kernel created by Linus Torvalds in 1991. Combined with GNU utilities, it forms the GNU/Linux operating system that powers 100% of the TOP500 supercomputers, 96.3% of the top 1 million web servers, all Android devices (3+ billion), and the majority of cloud infrastructure (AWS, GCP, Azure). Linux is licensed under GPLv2 and maintained by thousands of contributors worldwide, with Linus Torvalds remaining the principal maintainer as of 2026.

## Core Concepts

- **Kernel**: Core OS component managing hardware, processes, memory, and I/O
- **Distributions**: Complete OS packages (Ubuntu, Debian, RHEL, Arch, Fedora) combining kernel + GNU tools + package manager
- **Shell**: Command-line interface (bash, zsh, fish)
- **Package Management**: apt (Debian/Ubuntu), dnf (Fedora/RHEL), pacman (Arch)
- **Filesystem Hierarchy Standard (FHS)** : Standardized directory structure (`/bin`, `/etc`, `/var`, `/home`)
- **Systemd**: Init system and service manager (default on most distros since ~2015)

## Linux in Production

- **Cloud**: 96%+ of cloud workloads run on Linux (AWS EC2 Linux, GCP, Azure Linux VMs)
- **Containers**: Docker runs on Linux kernel features (namespaces, cgroups)
- **Embedded**: Android (Linux kernel), IoT devices, routers, automotive (Automotive Grade Linux)
- **Supercomputing**: 100% of TOP500 since 2017

## Further Reading

- [Kernel.org Docs](https://www.kernel.org/doc/html/latest/): Official Linux kernel documentation
- [Linux Kernel Source](https://github.com/torvalds/linux): Torvalds' GitHub mirror
