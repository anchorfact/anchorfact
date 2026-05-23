---
id: kb-2026-00258
title: Linux Process Management
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Process management in Linux: `ps aux` (list processes), `top/htop` (interactive monitor), `kill PID` (send signal), `nice/renice` (adjust priority). Each process has PID, PPID (parent), state
      (Running/Sleeping/Zombie), priority (nice value: -20 highest, 19 lowest). Background: `command &`, `bg/fg` to manage.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Signals: SIGTERM (15, graceful), SIGKILL (9, cannot be caught), SIGSTOP (19, suspend), SIGINT (2, Ctrl+C)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: "/proc filesystem: `ls /proc/PID/` shows process info."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

Process management in Linux: `ps aux` (list processes), `top/htop` (interactive monitor), `kill PID` (send signal), `nice/renice` (adjust priority). Each process has PID, PPID (parent), state (Running/Sleeping/Zombie), priority (nice value: -20 highest, 19 lowest). Background: `command &`, `bg/fg` to manage.

## Core Explanation

Signals: SIGTERM (15, graceful), SIGKILL (9, cannot be caught), SIGSTOP (19, suspend), SIGINT (2, Ctrl+C). Process states: R (running), S (sleeping interruptible), D (uninterruptible sleep, I/O), Z (zombie, terminated but not reaped). /proc filesystem: `ls /proc/PID/` shows process info. `strace` traces system calls. `lsof` lists open files.

## Further Reading

- [Linux Manual Pages — ps, top, kill, nice](undefined)
