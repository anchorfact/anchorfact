---
id: "game-ui-ux-design"
title: "Game User Interface and UX Design"
schema_type: "TechArticle"
category: "game-development"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true

atomic_facts:
  - id: "af-game-ui-ux-design-1"
    statement: "Diegetic UI elements exist within the game world (in-world screens, holograms) while non-diegetic UI exists outside it (health bars, minimaps)."
    source_title: "Game UI Design"
    confidence: "high"
  - id: "af-game-ui-ux-design-2"
    statement: "Fitts's Law predicts that selection time increases with distance and decreases with target size, fundamental to button placement in game interfaces."
    source_title: "Human-Computer Interaction"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "The Art of Game Design"
    type: "textbook"
    year: 2019
    url: "https://www.routledge.com/The-Art-of-Game-Design/Schell/p/book/9781138632059"
    institution: "CRC Press"
  - title: "Designing the User Interface, 6th Edition"
    type: "textbook"
    year: 2016
    url: "https://www.pearson.com/en-us/subject-catalog/p/designing-the-user-interface/P200000009530"
    institution: "Pearson"

secondary_sources:
  - title: "Game UI Database"
    type: "database"
    url: "https://www.gameuidatabase.com/"
    institution: "Game UI Database"

known_gaps:
  - "VR/AR UI paradigms"
  - "Cross-platform UI scaling strategies"

disputed_statements:
  - statement: "Minimalism vs information density debate in HUD design"

---

## TL;DR
Game UI bridges player intent and game mechanics. Good UI design communicates game state without breaking immersion, using principles from human-computer interaction adapted to real-time, controller-driven contexts.

## UI Classification

### Diegetic vs. Non-Diegetic
- **Diegetic UI**: Exists in the game world (Dead Space's spine health bar, Pip-Boy in Fallout). Characters can see it. Enhances immersion.
- **Non-diegetic UI**: Exists only for the player (health bar overlay, minimap). More readable but breaks fourth wall.
- **Meta UI**: Effects that represent game state visually (screen reddening for low health). Both player and character experience it.

## UX Principles for Games

### Information Hierarchy
Players need critical information at a glance. Health, ammo, objective markers should be near the screen center (the player's focal point). Secondary info (inventory, quest log) can be in peripheral vision.

### Controller Navigation
UI must be navigable with D-pad/joystick, not just mouse. Tab order matters. Radial menus reduce selection time for common actions. Button prompts should match controller layout.

### Feedback Loops
Every player action needs clear feedback: button press → animation change → UI update → sound cue. Missing feedback creates uncertainty and frustration.

## Accessibility
- Colorblind modes (deuteranopia, protanopia, tritanopia)
- Scalable UI text for low vision
- Remappable controls
- Audio cues for visual information
- Hold vs. toggle options for repetitive actions