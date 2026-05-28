---
id: kb-gd-011
title: 'Game Art Pipeline: Assets, Formats, and Interchange'
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
  - id: fact-game-development-game-art-pipeline-1
    statement: >-
      Unity documentation says model files can contain meshes, animation rigs and clips, materials,
      and textures, and identifies FBX as Unity primary support for model files.
    source_title: 'Unity Manual: Importing a Model'
    source_url: https://docs.unity3d.com/Manual/ImportingModelFiles.html
    confidence: medium
  - id: fact-game-development-game-art-pipeline-2
    statement: >-
      The glTF 2.0 specification describes glTF as an API-neutral runtime asset delivery format for
      efficient, interoperable transmission and loading of 3D content.
    source_title: glTF 2.0 Specification
    source_url: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
    confidence: medium
  - id: fact-game-development-game-art-pipeline-3
    statement: >-
      OpenUSD documentation describes USD as software for robustly and scalably interchanging and
      augmenting arbitrary 3D scenes composed from many assets.
    source_title: OpenUSD Introduction
    source_url: https://openusd.org/release/intro.html
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Specialized edge cases and platform-specific implementation details are outside this
    source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: 'Unity Manual: Importing a Model'
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/Manual/ImportingModelFiles.html
    institution: Unity Technologies
  - title: glTF 2.0 Specification
    type: technical_specification
    year: 2021
    url: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html
    institution: Khronos Group
  - title: OpenUSD Introduction
    type: documentation
    year: 2026
    url: https://openusd.org/release/intro.html
    institution: Alliance for OpenUSD
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

A game art pipeline turns authored models, materials, textures, and animation into engine-ready assets with predictable import and interchange rules.

## Core Explanation

Production pipelines need predictable engine import behavior plus interchange formats that let artists, tools, and runtime systems move 3D assets without losing structure.

## Source-Mapped Facts

- Unity documentation says model files can contain meshes, animation rigs and clips, materials, and textures, and identifies FBX as Unity primary support for model files. ([source](https://docs.unity3d.com/Manual/ImportingModelFiles.html))
- The glTF 2.0 specification describes glTF as an API-neutral runtime asset delivery format for efficient, interoperable transmission and loading of 3D content. ([source](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html))
- OpenUSD documentation describes USD as software for robustly and scalably interchanging and augmenting arbitrary 3D scenes composed from many assets. ([source](https://openusd.org/release/intro.html))

## Further Reading

- [Unity Manual: Importing a Model](https://docs.unity3d.com/Manual/ImportingModelFiles.html)
- [glTF 2.0 Specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
- [OpenUSD Introduction](https://openusd.org/release/intro.html)
