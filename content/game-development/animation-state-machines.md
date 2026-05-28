---
id: kb-gd-005
title: Game Animation State Machines
schema_type: TechArticle
category: game-development
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-04-28'
generation_method: ai_assisted
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-animation-state-machines-1
    statement: >-
      Unity Animator Controllers manage animation states and transitions with animation state
      machines, blend trees, and parameters.
    source_title: 'Unity Manual: Animator Controllers'
    source_url: https://docs.unity3d.com/Manual/AnimatorControllers.html
    confidence: medium
  - id: fact-animation-state-machines-2
    statement: >-
      Unreal Engine documentation describes animation state machines as logic-based branching
      systems for choosing animations and transitions.
    source_title: 'Unreal Engine: State Machines'
    source_url: https://dev.epicgames.com/documentation/en-us/unreal-engine/state-machines-in-unreal-engine
    confidence: medium
  - id: fact-animation-state-machines-3
    statement: >-
      Game Programming Patterns presents the State pattern as a way for behavior to change when
      internal state changes.
    source_title: 'Game Programming Patterns: State'
    source_url: https://gameprogrammingpatterns.com/state.html
    confidence: medium
completeness: 0.82
known_gaps:
  - This compact article intentionally covers a small, source-mapped slice of a broader topic.
disputed_statements: []
primary_sources:
  - title: 'Unity Manual: Animator Controllers'
    type: documentation
    year: 2024
    url: https://docs.unity3d.com/Manual/AnimatorControllers.html
    institution: Unity Technologies
  - title: 'Unreal Engine: State Machines'
    type: documentation
    year: 2026
    url: https://dev.epicgames.com/documentation/en-us/unreal-engine/state-machines-in-unreal-engine
    institution: Epic Games
  - title: 'Game Programming Patterns: State'
    type: book
    year: 2014
    url: https://gameprogrammingpatterns.com/state.html
    institution: Game Programming Patterns
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

Animation state machines organize character animation into states, transitions, and rules that react to gameplay context.

## Core Explanation

Engine documentation agrees on the practical shape: states contain animation logic, transitions control when states change, and parameters or rules connect animation behavior to gameplay.

## Further Reading

- [Unity Manual: Animator Controllers](https://docs.unity3d.com/Manual/AnimatorControllers.html)
- [Unreal Engine: State Machines](https://dev.epicgames.com/documentation/en-us/unreal-engine/state-machines-in-unreal-engine)
- [Game Programming Patterns: State](https://gameprogrammingpatterns.com/state.html)
