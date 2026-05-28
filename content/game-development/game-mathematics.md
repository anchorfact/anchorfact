---
id: kb-gd-017
title: 'Game Mathematics: Vectors, Rotations, and Transforms'
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
  - id: fact-game-development-game-mathematics-1
    statement: >-
      Unity Vector3 represents 3D vectors and points, including common operations for positions,
      directions, and distances.
    source_title: 'Unity Scripting API: Vector3'
    source_url: https://docs.unity3d.com/ScriptReference/Vector3.html
    confidence: medium
  - id: fact-game-development-game-mathematics-2
    statement: Unity Quaternion represents rotations and is used to store and manipulate object orientation.
    source_title: 'Unity Scripting API: Quaternion'
    source_url: https://docs.unity3d.com/ScriptReference/Quaternion.html
    confidence: medium
  - id: fact-game-development-game-mathematics-3
    statement: >-
      Unity Matrix4x4 is a 4x4 transformation matrix for translation, rotation, scale, shear, and
      perspective transformations using homogeneous coordinates.
    source_title: 'Unity Scripting API: Matrix4x4'
    source_url: https://docs.unity3d.com/ScriptReference/Matrix4x4.html
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Specialized edge cases and platform-specific implementation details are outside this
    source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: 'Unity Scripting API: Vector3'
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/ScriptReference/Vector3.html
    institution: Unity Technologies
  - title: 'Unity Scripting API: Quaternion'
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/ScriptReference/Quaternion.html
    institution: Unity Technologies
  - title: 'Unity Scripting API: Matrix4x4'
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/ScriptReference/Matrix4x4.html
    institution: Unity Technologies
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

Game mathematics centers on vectors, rotations, and transformation matrices that express object positions and motion in game worlds.

## Core Explanation

Vectors, quaternions, and matrices give programmers a common vocabulary for position, direction, orientation, and coordinate-space transforms.

## Source-Mapped Facts

- Unity Vector3 represents 3D vectors and points, including common operations for positions, directions, and distances. ([source](https://docs.unity3d.com/ScriptReference/Vector3.html))
- Unity Quaternion represents rotations and is used to store and manipulate object orientation. ([source](https://docs.unity3d.com/ScriptReference/Quaternion.html))
- Unity Matrix4x4 is a 4x4 transformation matrix for translation, rotation, scale, shear, and perspective transformations using homogeneous coordinates. ([source](https://docs.unity3d.com/ScriptReference/Matrix4x4.html))

## Further Reading

- [Unity Scripting API: Vector3](https://docs.unity3d.com/ScriptReference/Vector3.html)
- [Unity Scripting API: Quaternion](https://docs.unity3d.com/ScriptReference/Quaternion.html)
- [Unity Scripting API: Matrix4x4](https://docs.unity3d.com/ScriptReference/Matrix4x4.html)
