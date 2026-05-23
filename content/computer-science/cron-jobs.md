---
id: kb-2026-00260
title: Cron Jobs
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
      Cron is a time-based job scheduler in Unix-like systems. `crontab -e` edits user jobs. Format: `minute hour day month weekday command`. Example: `0 2 * * * /backup.sh` runs daily at 2 AM. Cron
      is ideal for periodic maintenance: backups, log rotation, report generation.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: "Special strings: @reboot (at startup), @daily (0 0 * * *), @hourly, @weekly, @monthly."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: "Output: cron emails job output to user (redirect to file: `>/dev/null 2>&1` to suppress)."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

Cron is a time-based job scheduler in Unix-like systems. `crontab -e` edits user jobs. Format: `minute hour day month weekday command`. Example: `0 2 * * * /backup.sh` runs daily at 2 AM. Cron is ideal for periodic maintenance: backups, log rotation, report generation.

## Core Explanation

Special strings: @reboot (at startup), @daily (0 0 * * *), @hourly, @weekly, @monthly. Output: cron emails job output to user (redirect to file: `>/dev/null 2>&1` to suppress). `/etc/crontab` for system-wide jobs. `/etc/cron.d/` for package-managed cron files. Alternatives: systemd timers (more features, better logging), anacron (runs missed jobs after downtime).

## Further Reading

- [crontab(5) Linux Manual Page](undefined)
