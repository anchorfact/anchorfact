---
id: agent-linux-open-files-and-process-inspection
title: 'Agent Linux Open Files and Process Inspection'
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
  - id: fact-ai-agent-linux-open-files-and-process-inspection-1
    statement: >-
      The proc_pid_fd manual says /proc/pid/fd is a subdirectory containing one
      entry for each file a process has open.
    source_title: proc_pid_fd Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html
    confidence: medium
  - id: fact-ai-agent-linux-open-files-and-process-inspection-2
    statement: >-
      The proc_pid_fd manual says permission to dereference or read links in
      /proc/pid/fd is governed by a ptrace access-mode check.
    source_title: proc_pid_fd Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html
    confidence: medium
  - id: fact-ai-agent-linux-open-files-and-process-inspection-3
    statement: >-
      The ps manual describes ps as displaying information about a selection of
      active processes.
    source_title: ps Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man1/ps.1.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Linux process and open-file evidence depends on PID namespaces, ptrace permissions, procfs mount options, transient processes, threads, deleted file handles, sockets, pipes, systemd cgroups, container runtime metadata, and whether the agent has host-level or container-level visibility.
disputed_statements: []
primary_sources:
  - title: proc_pid_fd Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html
    institution: man7.org Linux manual pages
  - title: ps Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man1/ps.1.html
    institution: man7.org Linux manual pages
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Open-file and process evidence lets agents connect symptoms such as disk pressure, stuck sockets, and runaway work back to specific processes.

## Core Explanation

When an application leaks descriptors, keeps deleted log files open, or forks unexpected workers, logs alone are often insufficient. Linux exposes process snapshots through tools such as ps and file descriptor views through procfs. Agents should collect PID, command, owner, namespace, thread view, open descriptor targets, socket or pipe metadata, and permissions before killing a process or truncating files.

This evidence is especially important in containers, where the PID namespace and filesystem view may differ from the host. A safe agent reports the scope it observed and avoids assuming that a PID or path is globally unique.

## Source-Mapped Facts

- The proc_pid_fd manual says /proc/pid/fd is a subdirectory containing one entry for each file a process has open. ([source](https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html))
- The proc_pid_fd manual says permission to dereference or read links in /proc/pid/fd is governed by a ptrace access-mode check. ([source](https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html))
- The ps manual describes ps as displaying information about a selection of active processes. ([source](https://man7.org/linux/man-pages/man1/ps.1.html))

## Further Reading

- [proc_pid_fd Linux Manual Page](https://man7.org/linux/man-pages/man5/proc_pid_fd.5.html)
- [ps Linux Manual Page](https://man7.org/linux/man-pages/man1/ps.1.html)
