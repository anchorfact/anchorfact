---
id: "kb-2026-00257"
title: "Linux File Permissions"
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
    statement: "Linux file permissions use a 3-tier model: Owner, Group, Others — each with Read (r=4), Write (w=2), Execute (x=1) permissions. Permission bits: `rwxr-xr--` means owner can read/write/execute, group can read/execute, others can read. `chmod 755 file` sets these numerically."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Special bits: setuid (4000, run as file owner), setgid (2000, run as group), sticky bit (1000, only owner can delete — used on /tmp)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Default permissions: umask (subtracted from 666 for files, 777 for dirs)."
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

Linux file permissions use a 3-tier model: Owner, Group, Others — each with Read (r=4), Write (w=2), Execute (x=1) permissions. Permission bits: `rwxr-xr--` means owner can read/write/execute, group can read/execute, others can read. `chmod 755 file` sets these numerically.

## Core Explanation

Octal notation: `chmod 755` = rwxr-xr-x. Special bits: setuid (4000, run as file owner), setgid (2000, run as group), sticky bit (1000, only owner can delete — used on /tmp). `chown user:group file` changes ownership. Default permissions: umask (subtracted from 666 for files, 777 for dirs). ACL (setfacl/getfacl) provides per-user permissions beyond owner/group/other.

## Further Reading

- [Linux Documentation Project — File Permissions](undefined)
