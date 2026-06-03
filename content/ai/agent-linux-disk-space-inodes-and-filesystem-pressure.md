---
id: agent-linux-disk-space-inodes-and-filesystem-pressure
title: 'Agent Linux Disk Space, Inodes, and Filesystem Pressure'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-linux-disk-space-inodes-and-filesystem-pressure-1
    statement: >-
      The GNU df manual page describes df as reporting file system space usage.
    source_title: df Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man1/df.1.html
    confidence: medium
  - id: fact-ai-agent-linux-disk-space-inodes-and-filesystem-pressure-2
    statement: >-
      The GNU df manual page says df --inodes lists inode information instead
      of block usage.
    source_title: df Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man1/df.1.html
    confidence: medium
  - id: fact-ai-agent-linux-disk-space-inodes-and-filesystem-pressure-3
    statement: >-
      The GNU du manual page describes du as estimating file space usage.
    source_title: du Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man1/du.1.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Linux filesystem pressure diagnosis depends on mount namespaces, container overlay layers, reserved blocks, deleted-but-open files, quota policy, tmpfs memory pressure, filesystem type, remote mounts, sparse files, and whether the agent is observing the host or a container view.
disputed_statements: []
primary_sources:
  - title: df Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man1/df.1.html
    institution: man7.org Linux manual pages
  - title: du Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man1/du.1.html
    institution: man7.org Linux manual pages
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Disk pressure is not only about bytes. Agents need both block usage and inode usage before deleting files, expanding volumes, or blaming an application.

## Core Explanation

Operational agents often see failures as "no space left on device" even when the visible directory looks small. The useful evidence includes mounted filesystem, used and available blocks, inode totals, directory-level usage, container mount namespace, quotas, and whether large files have already been unlinked while still held open.

The safe workflow is to identify the mount point, compare block pressure with inode pressure, localize growth with directory-level measurements, then decide whether cleanup, log rotation, retention changes, or capacity expansion is appropriate.

## Source-Mapped Facts

- The GNU df manual page describes df as reporting file system space usage. ([source](https://man7.org/linux/man-pages/man1/df.1.html))
- The GNU df manual page says df --inodes lists inode information instead of block usage. ([source](https://man7.org/linux/man-pages/man1/df.1.html))
- The GNU du manual page describes du as estimating file space usage. ([source](https://man7.org/linux/man-pages/man1/du.1.html))

## Further Reading

- [df Linux Manual Page](https://man7.org/linux/man-pages/man1/df.1.html)
- [du Linux Manual Page](https://man7.org/linux/man-pages/man1/du.1.html)
