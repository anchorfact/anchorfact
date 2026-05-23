---
id: "kb-2026-00260"


title: "Cron Jobs"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:

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

Cron is a time-based job scheduler in Unix-like systems. `crontab -e` edits user jobs. Format: `minute hour day month weekday command`. Example: `0 2 * * * /backup.sh` runs daily at 2 AM. Cron is ideal for periodic maintenance: backups, log rotation, report generation.

## Core Explanation

Special strings: @reboot (at startup), @daily (0 0 * * *), @hourly, @weekly, @monthly. Output: cron emails job output to user (redirect to file: `>/dev/null 2>&1` to suppress). `/etc/crontab` for system-wide jobs. `/etc/cron.d/` for package-managed cron files. Alternatives: systemd timers (more features, better logging), anacron (runs missed jobs after downtime).

## Further Reading

- [crontab(5) Linux Manual Page](undefined)
