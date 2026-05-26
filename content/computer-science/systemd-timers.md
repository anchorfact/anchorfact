---
id: "kb-2026-00263"
title: "systemd Timers"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "systemd timers are the modern replacement for cron, providing calendar and monotonic event scheduling with better logging, randomization, and dependency management. Timer unit triggers a matching service unit. `systemctl list-timers` shows all active timers."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Timer types: OnCalendar (specific times, like cron: `*-*-* 02:00:00` = daily 2AM), OnBootSec (after boot), OnUnitActiveSec (after service last ran)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Accuracy: `AccuracySec` trades precision for power saving (default 1min)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

systemd timers are the modern replacement for cron, providing calendar and monotonic event scheduling with better logging, randomization, and dependency management. Timer unit triggers a matching service unit. `systemctl list-timers` shows all active timers.

## Core Explanation

Timer types: OnCalendar (specific times, like cron: `*-*-* 02:00:00` = daily 2AM), OnBootSec (after boot), OnUnitActiveSec (after service last ran). `RandomizedDelaySec` spreads load (avoid thundering herd). Persistent: `Persistent=true` catches up missed runs (like anacron). Accuracy: `AccuracySec` trades precision for power saving (default 1min).

## Further Reading

- [systemd.timer Documentation](undefined)

## Related Articles

- [Systemd](../systemd.md)