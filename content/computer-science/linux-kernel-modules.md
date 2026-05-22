---
id:"kb-2026-00264"
title:"Linux Kernel Modules"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Linux Kernel Module Programming Guide"
    type:"undefined"
    url:"undefined"
    institution:"Community"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Kernel modules extend Linux functionality without recompiling the kernel. `lsmod` lists loaded modules. `modprobe module` loads with dependencies. Kernel modules enable dynamic hardware support: load USB driver when device plugged, unload when removed. Modules run in kernel space (ring 0) — no safety net.

## Core Explanation

Commands: `lsmod` (list), `modprobe` (load with deps), `rmmod` (remove), `modinfo` (details). Module parameters: `modprobe module param=value`. Blacklisting: `/etc/modprobe.d/blacklist.conf` prevents auto-loading. DKMS (Dynamic Kernel Module Support): auto-rebuilds modules on kernel update. Writing kernel modules requires C and understanding of kernel APIs — crashes the whole system if buggy.

## Further Reading

- [Linux Kernel Module Programming Guide](undefined)
