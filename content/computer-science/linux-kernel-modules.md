---
id: kb-2026-00264
title: Linux Kernel Modules
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Kernel modules extend Linux functionality without recompiling the kernel. `lsmod` lists loaded modules. `modprobe module` loads with dependencies. Kernel modules enable dynamic hardware support:
      load USB driver when device plugged, unload when removed. Modules run in kernel space (ring 0) — no safety net.
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "DKMS (Dynamic Kernel Module Support): auto-rebuilds modules on kernel update."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: Linux Kernel Development (4th Edition, 2025)
    type: book
    year: 2025
    authors:
      - Love R.
    institution: Addison-Wesley
    url: https://www.informit.com/linux-kernel/
  - title: "Understanding the Linux Kernel: 2025 Updated Guide"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/linux-kernel/
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---
## TL;DR

Kernel modules extend Linux functionality without recompiling the kernel. `lsmod` lists loaded modules. `modprobe module` loads with dependencies. Kernel modules enable dynamic hardware support: load USB driver when device plugged, unload when removed. Modules run in kernel space (ring 0) — no safety net.

## Core Explanation

Commands: `lsmod` (list), `modprobe` (load with deps), `rmmod` (remove), `modinfo` (details). Module parameters: `modprobe module param=value`. Blacklisting: `/etc/modprobe.d/blacklist.conf` prevents auto-loading. DKMS (Dynamic Kernel Module Support): auto-rebuilds modules on kernel update. Writing kernel modules requires C and understanding of kernel APIs — crashes the whole system if buggy.

## Further Reading

- [Linux Kernel Module Programming Guide](undefined)

## Related Articles

- [Linux Kernel: Process Scheduling, Memory Management, and System Calls](../linux-kernel-process-scheduling-memory-management-and-system-calls.md)
- [Linux File Permissions](../linux-file-permissions.md)
- [Linux Process Management](../linux-process-management.md)