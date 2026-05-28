---
id: kb-2026-00173
title: Package Managers (npm, yarn, pnpm)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: npm package.json files describe package metadata, dependencies, and scripts for JavaScript projects.
    source_title: npm package.json
    source_url: https://docs.npmjs.com/cli/configuring-npm/package-json
    confidence: medium
  - id: fact-computer-science-002
    statement: npm package-lock.json records an exact dependency tree for installed packages.
    source_title: npm package-lock.json
    source_url: https://docs.npmjs.com/cli/configuring-npm/package-lock-json
    confidence: medium
  - id: fact-computer-science-003
    statement: pnpm uses a symlinked node_modules structure backed by content-addressable package storage.
    source_title: "pnpm: Symlinked node_modules structure"
    source_url: https://pnpm.io/symlinked-node-modules-structure
    confidence: medium
completeness: 0.88
known_gaps:
  - Version-specific behavior across npm, Yarn, and pnpm releases
  - Supply-chain security policies beyond basic dependency installation
disputed_statements: []
primary_sources:
  - title: npm package.json
    type: documentation
    year: 2026
    institution: npm
    url: https://docs.npmjs.com/cli/configuring-npm/package-json
  - title: npm package-lock.json
    type: documentation
    year: 2026
    institution: npm
    url: https://docs.npmjs.com/cli/configuring-npm/package-lock-json
  - title: "pnpm: Symlinked node_modules structure"
    type: documentation
    year: 2026
    institution: pnpm
    url: https://pnpm.io/symlinked-node-modules-structure
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
JavaScript package managers install dependencies, run scripts, and record dependency graphs for projects. npm, Yarn, and pnpm share the same ecosystem but differ in lockfiles, installation strategy, workspace behavior, and performance tradeoffs.

## Core Explanation
package.json declares metadata, scripts, and dependency ranges. Lockfiles record resolved versions so installs are more reproducible. pnpm uses a content-addressable store and symlinked node_modules layout to reduce duplication.

## Detailed Analysis
Package managers are also part of the software supply chain. Reliable projects pin lockfiles, review dependency updates, run audits where appropriate, and avoid treating semver ranges as a security boundary.

## Further Reading
- npm package.json
- npm package-lock.json
- pnpm symlinked node_modules
