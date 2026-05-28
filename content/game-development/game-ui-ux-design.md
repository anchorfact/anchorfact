---
id: game-ui-ux-design
title: Game User Interface and UX Design
schema_type: TechArticle
category: game-development
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-gd-ui-001
    statement: >-
      Fitts's 1954 paper models target selection as a function of movement amplitude and target
      tolerance, a basis for thinking about target size and distance in UI interaction.
    source_title: The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement
    source_url: https://doi.org/10.1037/h0055392
    confidence: medium
  - id: fact-gd-ui-002
    statement: >-
      Nielsen's 10 usability heuristics include visibility of system status, user control and
      freedom, consistency and standards, and error prevention.
    source_title: 10 Usability Heuristics for User Interface Design
    source_url: https://www.nngroup.com/articles/ten-usability-heuristics/
    confidence: medium
  - id: fact-gd-ui-003
    statement: Game Accessibility Guidelines recommend that essential text be readable by default.
    source_title: Ensure that essential text is readable by default
    source_url: https://gameaccessibilityguidelines.com/ensure-that-essential-text-is-readable-by-default/
    confidence: medium
completeness: 0.9
known_gaps:
  - Game-specific HUD patterns vary widely across genre and input device.
  - VR, AR, and couch-coop UI constraints are not covered in depth.
disputed_statements: []
primary_sources:
  - id: ps-game-ui-ux-design-1
    title: The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement
    type: academic_paper
    year: 1954
    authors:
      - Fitts, Paul M.
    institution: Journal of Experimental Psychology
    url: https://doi.org/10.1037/h0055392
    doi: 10.1037/h0055392
  - id: ps-game-ui-ux-design-2
    title: 10 Usability Heuristics for User Interface Design
    type: design_guideline
    year: 1994
    authors:
      - Nielsen, Jakob
    institution: Nielsen Norman Group
    url: https://www.nngroup.com/articles/ten-usability-heuristics/
  - id: ps-game-ui-ux-design-3
    title: Ensure that essential text is readable by default
    type: accessibility_guideline
    year: 2026
    institution: Game Accessibility Guidelines
    url: https://gameaccessibilityguidelines.com/ensure-that-essential-text-is-readable-by-default/
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Game UI and UX design adapts general human-computer interaction evidence to real-time play. This repaired entry uses Fitts's Law for target interaction, Nielsen heuristics for interface feedback and control, and game accessibility guidance for readable text.

## Core Explanation
In games, UI has to communicate state while players are acting under time pressure. Fitts's Law helps reason about targets that are easier or harder to select. Nielsen's heuristics provide a compact checklist for status, consistency, error prevention, and control. Accessibility guidance adds a practical baseline: essential text should be readable without requiring players to fix the interface first.

## Related Articles

- [Game Design Principles](../game-design-principles.md)
- [Input Systems and Accessibility](../input-systems-accessibility.md)
- [Human-Computer Interaction](../../ai/human-computer-interaction.md)
