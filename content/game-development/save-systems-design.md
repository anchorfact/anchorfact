---
id: kb-gd-031
title: Save Systems Design
schema_type: TechArticle
category: game-development
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-04-28'
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-gd-save-001
    statement: Unity JsonUtility provides functions for converting objects to and from JSON and can be useful when saving game state.
    source_title: JsonUtility - Unity Scripting API
    source_url: https://docs.unity3d.com/ScriptReference/JsonUtility.html
    confidence: medium
  - id: fact-gd-save-002
    statement: Unity PlayerPrefs stores player preferences between sessions and Unity warns not to use it for sensitive data because it is stored without encryption.
    source_title: PlayerPrefs - Unity Scripting API
    source_url: https://docs.unity3d.com/ScriptReference/PlayerPrefs.html
    confidence: medium
  - id: fact-gd-save-003
    statement: Game Programming Patterns describes the Dirty Flag pattern as a way to avoid unnecessary recalculation until derived data is needed.
    source_title: Dirty Flag - Game Programming Patterns
    source_url: https://gameprogrammingpatterns.com/dirty-flag.html
    confidence: medium
primary_sources:
  - title: JsonUtility - Unity Scripting API
    type: official_documentation
    year: 2026
    institution: Unity
    url: https://docs.unity3d.com/ScriptReference/JsonUtility.html
  - title: PlayerPrefs - Unity Scripting API
    type: official_documentation
    year: 2026
    institution: Unity
    url: https://docs.unity3d.com/ScriptReference/PlayerPrefs.html
  - title: Dirty Flag - Game Programming Patterns
    type: book
    year: 2014
    authors:
      - Nystrom, Robert
    institution: Game Programming Patterns
    url: https://gameprogrammingpatterns.com/dirty-flag.html
completeness: 0.80
known_gaps:
  - This article covers save-system building blocks and does not provide a full engine-specific implementation.
---

## TL;DR

Save systems turn game state into durable data and restore it safely later. In Unity contexts, JSON serialization, preferences storage, and dirty-state tracking are separate concerns that should not be conflated.

## Core Explanation

The previous version exported fragments of C# code as facts. This repaired article replaces those fragments with source-mapped claims about Unity JsonUtility, PlayerPrefs, and the Dirty Flag pattern.

## Further Reading

- [JsonUtility - Unity Scripting API](https://docs.unity3d.com/ScriptReference/JsonUtility.html)
- [PlayerPrefs - Unity Scripting API](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html)
- [Dirty Flag - Game Programming Patterns](https://gameprogrammingpatterns.com/dirty-flag.html)

## Related Articles

- [Game Data Architecture](../game-data-architecture.md)
- [Game Testing Methodology](../game-testing-methodology.md)
- [Game Engine Architecture](../game-engine-architecture.md)
