---
id:"kb-2026-00258"
title:"Linux Process Management"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

Process management in Linux: `ps aux` (list processes), `top/htop` (interactive monitor), `kill PID` (send signal), `nice/renice` (adjust priority). Each process has PID, PPID (parent), state (Running/Sleeping/Zombie), priority (nice value: -20 highest, 19 lowest). Background: `command &`, `bg/fg` to manage.

## Core Explanation

Signals: SIGTERM (15, graceful), SIGKILL (9, cannot be caught), SIGSTOP (19, suspend), SIGINT (2, Ctrl+C). Process states: R (running), S (sleeping interruptible), D (uninterruptible sleep, I/O), Z (zombie, terminated but not reaped). /proc filesystem: `ls /proc/PID/` shows process info. `strace` traces system calls. `lsof` lists open files.

## Further Reading

- [Linux Manual Pages — ps, top, kill, nice](undefined)
