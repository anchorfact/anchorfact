---
id: kb-gd-010
title: Game AI Systems
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
  - id: fact-gd-ai-001
    statement: Unreal Engine Behavior Trees can be used to create AI for non-player characters and rely on a Blackboard asset to store decision data.
    source_title: Behavior Trees in Unreal Engine
    source_url: https://dev.epicgames.com/documentation/en-us/unreal-engine/behavior-trees-in-unreal-engine
    confidence: medium
  - id: fact-gd-ai-002
    statement: Unity's NavMesh Agent component supports characters that move toward goals while avoiding one another and other moving obstacles.
    source_title: NavMesh Agent - Unity Manual
    source_url: https://docs.unity3d.com/cn/2022.3/Manual/class-NavMeshAgent.html
    confidence: medium
  - id: fact-gd-ai-003
    statement: Game Programming Patterns describes finite state machines as a common way to represent object behavior as discrete states and transitions.
    source_title: State - Game Programming Patterns
    source_url: https://gameprogrammingpatterns.com/state.html
    confidence: medium
primary_sources:
  - title: Behavior Trees in Unreal Engine
    type: official_documentation
    year: 2026
    institution: Epic Games
    url: https://dev.epicgames.com/documentation/en-us/unreal-engine/behavior-trees-in-unreal-engine
  - title: NavMesh Agent - Unity Manual
    type: official_documentation
    year: 2026
    institution: Unity
    url: https://docs.unity3d.com/cn/2022.3/Manual/class-NavMeshAgent.html
  - title: State - Game Programming Patterns
    type: book
    year: 2014
    authors:
      - Nystrom, Robert
    institution: Game Programming Patterns
    url: https://gameprogrammingpatterns.com/state.html
completeness: 0.80
known_gaps:
  - This repaired entry covers stable AI-system building blocks and does not prescribe a complete production AI architecture.
---

## TL;DR

Game AI systems usually combine behavior selection, world-state data, navigation, and authoring tools. The public claims here are limited to documented Unreal Behavior Trees, Unity NavMesh Agent behavior, and the finite state machine pattern.

## Core Explanation

The previous version contained mojibake and exported code fragments as atomic facts. This repaired version removes the corrupted text and keeps only concise claims that map to official engine documentation or a specific public book chapter.

## Further Reading

- [Behavior Trees in Unreal Engine](https://dev.epicgames.com/documentation/en-us/unreal-engine/behavior-trees-in-unreal-engine)
- [NavMesh Agent - Unity Manual](https://docs.unity3d.com/cn/2022.3/Manual/class-NavMeshAgent.html)
- [State - Game Programming Patterns](https://gameprogrammingpatterns.com/state.html)

## Related Articles

- [Unreal Engine 5](../unreal-engine-5.md)
- [Game Testing Methodology](../game-testing-methodology.md)
- [Game Engine Architecture](../game-engine-architecture.md)
