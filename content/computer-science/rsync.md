---
id: "kb-2026-00262"


title: "rsync"
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

atomic_facts:
  - id: fact-computer-science-01
    statement: Rsync is often faster than scp for large directory trees with small changes
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
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

rsync is a fast file synchronization tool using delta-transfer algorithm — only transfers differences between source and destination. `rsync -avz source/ user@host:/dest/`. Ideal for backups, mirroring, deployment. Bandwidth-efficient: only changed blocks, not entire files.

## Core Explanation

Flags: `-a` (archive mode = preserve permissions/ownership/timestamps), `-v` (verbose), `-z` (compress), `-P` (progress + partial), `--delete` (remove dest files not in source). Dry-run: `--dry-run` to preview. Exclude: `--exclude='*.tmp'`. Over SSH: `rsync -avz -e ssh ...`. Rsync is often faster than scp for large directory trees with small changes.

## Further Reading

- [rsync Documentation](undefined)
