---
id: "game-networking"
title: "Game Networking Architecture"
schema_type: "TechArticle"
category: "game-development"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true

atomic_facts:
  - id: "af-game-networking-1"
    statement: "Game networking uses authoritative server model where the server validates all player actions to prevent cheating."
    source_title: "Multiplayer Game Networking"
    confidence: "high"
  - id: "af-game-networking-2"
    statement: "Client-side prediction and server reconciliation smooth out network latency by predicting player movement locally and correcting on server confirmation."
    source_title: "Valve Developer Community"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Multiplayer Game Programming"
    type: "textbook"
    year: 2015
    url: "https://www.pearson.com/en-us/subject-catalog/p/multiplayer-game-programming/P200000009344"
    institution: "Addison-Wesley"
  - title: "Source Multiplayer Networking"
    type: "official_documentation"
    year: 2020
    url: "https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking"
    institution: "Valve"

secondary_sources:
  - title: "Gaffer on Games — Networked Physics"
    type: "blog_post"
    url: "https://gafferongames.com/post/introduction_to_networked_physics/"
    institution: "Gaffer on Games"

known_gaps:
  - "Quantum networking for games"
  - "WebRTC vs WebSocket tradeoffs for browser games"

disputed_statements:
  - statement: "UDP vs TCP for game networking is debate-dependent on game genre"

---

## TL;DR
Multiplayer game networking delivers responsive real-time interaction over unreliable networks. The core challenges are latency compensation, state synchronization, and cheat prevention — solved through authoritative servers and client-side prediction.

## Core Architecture

### Authoritative Server Model
The server is the sole authority on game state. Clients send input commands; the server processes them and broadcasts results. This prevents client-side cheating (speed hacks, wallhacks) because the server validates every action.

### Client-Side Prediction
Players would experience unacceptable input lag (100-200ms) waiting for server confirmation. Instead, clients predict their own movement immediately and reconcile when the server's version arrives. Mispredictions cause rubber-banding — the visual snapback when correction occurs.

### Interpolation and Lag Compensation
Other players' positions are interpolated between the last two known states, displayed slightly behind real-time (typically 100ms). This creates smooth movement at the cost of slight delay. Lag compensation rewinds server state to the client's perceived time for hit detection.

### State Synchronization Strategies
- **Full state sync**: Send entire world state each tick (expensive, simple)
- **Delta compression**: Send only changed fields (efficient, complex)
- **Interest management**: Send only entities relevant to each player

## Transport Layer
UDP dominates game networking because:
- No head-of-line blocking (lost packets don't stall the stream)
- Application-level reliability control (resend only what matters)
- Lower latency than TCP (no connection handshake per packet)
