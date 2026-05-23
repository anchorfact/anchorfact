---
id:"kb-2026-00261"
title:"Systemd"
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

systemd is the init system and service manager for most Linux distributions (since ~2015). It manages services, sockets, timers, mounts, and devices via unit files. `systemctl start/stop/enable/disable service`. systemd unified Linux service management across distributions, replacing SysV init and Upstart.

## Core Explanation

Unit types: service (.service), socket (.socket), timer (.timer, replaces cron), mount, target (group). `systemctl status service` shows state, logs. `journalctl -u service` views logs. Service unit example: `[Service] ExecStart=/usr/bin/app` with `Restart=always`. systemd starts services in parallel (not sequentially like SysV) — faster boot. Controversy: monolithic design, PID 1 complexity.

## Further Reading

- [systemd Documentation](undefined)
