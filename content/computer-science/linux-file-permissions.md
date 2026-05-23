---
id: "kb-2026-00257"



title: "Linux File Permissions"
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

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

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

Linux file permissions use a 3-tier model: Owner, Group, Others — each with Read (r=4), Write (w=2), Execute (x=1) permissions. Permission bits: `rwxr-xr--` means owner can read/write/execute, group can read/execute, others can read. `chmod 755 file` sets these numerically.

## Core Explanation

Octal notation: `chmod 755` = rwxr-xr-x. Special bits: setuid (4000, run as file owner), setgid (2000, run as group), sticky bit (1000, only owner can delete — used on /tmp). `chown user:group file` changes ownership. Default permissions: umask (subtracted from 666 for files, 777 for dirs). ACL (setfacl/getfacl) provides per-user permissions beyond owner/group/other.

## Further Reading

- [Linux Documentation Project — File Permissions](undefined)
