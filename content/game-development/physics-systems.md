---
id: kb-gd-027
title: Game Physics Systems
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
  - id: fact-game-development-physics-systems-1
    statement: >-
      Unity built-in 3D physics is documented as an integration of the NVIDIA PhysX engine for
      object-oriented 3D projects.
    source_title: 'Unity Manual: Built-in 3D Physics'
    source_url: https://docs.unity3d.com/Manual/PhysicsOverview.html
    confidence: medium
  - id: fact-game-development-physics-systems-2
    statement: >-
      Unity Rigidbody documentation says a Rigidbody lets the physics engine calculate movement from
      simulated forces, torque, collisions, and gravity.
    source_title: 'Unity Manual: Rigidbody Component Reference'
    source_url: https://docs.unity3d.com/Manual/class-Rigidbody.html
    confidence: medium
  - id: fact-game-development-physics-systems-3
    statement: Box2D documentation identifies Box2D as a 2D physics engine for games.
    source_title: Box2D Documentation
    source_url: https://box2d.org/documentation/
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Specialized edge cases and platform-specific implementation details are outside this
    source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: 'Unity Manual: Built-in 3D Physics'
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/Manual/PhysicsOverview.html
    institution: Unity Technologies
  - title: 'Unity Manual: Rigidbody Component Reference'
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/Manual/class-Rigidbody.html
    institution: Unity Technologies
  - title: Box2D Documentation
    type: documentation
    year: 2026
    url: https://box2d.org/documentation/
    institution: Box2D
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

Game physics systems simulate collisions, rigid bodies, forces, and constraints so objects move and interact believably.

## Core Explanation

Physics middleware gives designers reusable behavior for motion and collision, but game teams still tune parameters, constraints, and collision modes for feel and performance.

## Source-Mapped Facts

- Unity built-in 3D physics is documented as an integration of the NVIDIA PhysX engine for object-oriented 3D projects. ([source](https://docs.unity3d.com/Manual/PhysicsOverview.html))
- Unity Rigidbody documentation says a Rigidbody lets the physics engine calculate movement from simulated forces, torque, collisions, and gravity. ([source](https://docs.unity3d.com/Manual/class-Rigidbody.html))
- Box2D documentation identifies Box2D as a 2D physics engine for games. ([source](https://box2d.org/documentation/))

## Further Reading

- [Unity Manual: Built-in 3D Physics](https://docs.unity3d.com/Manual/PhysicsOverview.html)
- [Unity Manual: Rigidbody Component Reference](https://docs.unity3d.com/Manual/class-Rigidbody.html)
- [Box2D Documentation](https://box2d.org/documentation/)
