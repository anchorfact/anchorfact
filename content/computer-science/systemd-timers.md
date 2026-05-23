---
id:"kb-2026-00263"
title:"systemd Timers"
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

systemd timers are the modern replacement for cron, providing calendar and monotonic event scheduling with better logging, randomization, and dependency management. Timer unit triggers a matching service unit. `systemctl list-timers` shows all active timers.

## Core Explanation

Timer types: OnCalendar (specific times, like cron: `*-*-* 02:00:00` = daily 2AM), OnBootSec (after boot), OnUnitActiveSec (after service last ran). `RandomizedDelaySec` spreads load (avoid thundering herd). Persistent: `Persistent=true` catches up missed runs (like anacron). Accuracy: `AccuracySec` trades precision for power saving (default 1min).

## Further Reading

- [systemd.timer Documentation](undefined)
