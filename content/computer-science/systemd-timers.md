---
id: kb-2026-00263
title: systemd Timers
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
      systemd timers are the modern replacement for cron, providing calendar and monotonic event scheduling with better logging, randomization, and dependency management. Timer unit triggers a
      matching service unit. `systemctl list-timers` shows all active timers.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Timer types: OnCalendar (specific times, like cron: `*-*-* 02:00:00` = daily 2AM), OnBootSec (after boot), OnUnitActiveSec (after service last ran)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: "Accuracy: `AccuracySec` trades precision for power saving (default 1min)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

systemd timers are the modern replacement for cron, providing calendar and monotonic event scheduling with better logging, randomization, and dependency management. Timer unit triggers a matching service unit. `systemctl list-timers` shows all active timers.

## Core Explanation

Timer types: OnCalendar (specific times, like cron: `*-*-* 02:00:00` = daily 2AM), OnBootSec (after boot), OnUnitActiveSec (after service last ran). `RandomizedDelaySec` spreads load (avoid thundering herd). Persistent: `Persistent=true` catches up missed runs (like anacron). Accuracy: `AccuracySec` trades precision for power saving (default 1min).

## Further Reading

- [systemd.timer Documentation](undefined)
