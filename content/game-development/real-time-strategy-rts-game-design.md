---
id: kb-2026-00222
title: Real-Time Strategy (RTS) Game Design
schema_type: TechArticle
category: game-development
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      Narrative-versus-systems-driven game design is a fundamental debate: story-focused games emphasize authored emotional arcs, while systems-driven games prioritize emergent player-driven
      experiences
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: GDC Vault
    type: conference
    year: 2026
    url: https://www.gdconf.com/
    institution: GDC
secondary_sources:
  - title: GDC Vault
    type: conference
    year: 2026
    url: https://www.gdconf.com/
    institution: GDC
  - title: Game Engine Architecture (Jason Gregory, 3rd Ed)
    type: textbook
    year: 2018
    url: https://www.gameenginebook.com/
    institution: CRC Press
atomic_facts:
  - id: fact-game-development-001
    statement: >-
      RTS games combine resource management, base building, and real-time tactical combat. Players gather resources → build structures → produce units → control battles — all simultaneously. Classic
      examples: StarCraft, Age of Empires, Command & Conquer. Key design: fog of war, tech trees, unit counters, macro vs. micro management.
    confidence: medium
    source_title: GDC Vault
    source_url: https://www.gdconf.com/
  - id: fact-game-development-002
    statement: "APM (Actions Per Minute): measure of player speed — pros average 200-400 APM in StarCraft."
    confidence: medium
    source_title: GDC Vault
    source_url: https://www.gdconf.com/
---


## TL;DR

RTS games combine resource management, base building, and real-time tactical combat. Players gather resources → build structures → produce units → control battles — all simultaneously. Classic examples: StarCraft, Age of Empires, Command & Conquer. Key design: fog of war, tech trees, unit counters, macro vs. micro management.

## Core Explanation

Fog of war: unexplored (black), explored but not visible (dim), currently visible (clear). Tech tree: prerequisite-based technology advancement (barracks → blacksmith → academy). Counter system: archer beats spearman, cavalry beats archer, spearman beats cavalry. APM (Actions Per Minute): measure of player speed — pros average 200-400 APM in StarCraft.

## Further Reading

- 