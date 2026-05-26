---
id: game-networking
title: Game Networking Architecture
schema_type: TechArticle
category: game-development
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-gd-net-001
    statement: Client-side prediction + server reconciliation (Quake, Carmack 1996) are foundational netcode techniques.
    source_title: Bernier, Y.W. Latency Compensation (Valve Developer Community 2001)
    source_url: https://developer.valvesoftware.com/wiki/Latency_Compensating_Methods_in_Client/Server_In-game_Protocol_Design_and_Optimization
    confidence: high
  - id: fact-gd-net-002
    statement: Deterministic lockstep (Age of Empires 1997) syncs game state via command transmission for RTS.
    source_title: Glazer & Madhav, Multiplayer Game Programming (Addison-Wesley 2015)
    source_url: https://www.informit.com/store/multiplayer-game-programming-9780134034300
    confidence: high
  - id: fact-gd-net-003
    statement: Rollback netcode (GGPO 2009) revolutionized fighting game online play via input prediction + state rollback.
    source_title: "Cannon, T. GGPO: Rollback Networking (GDC 2019)"
    source_url: https://www.gdcvault.com/play/1025961/GGPO-s
    confidence: high
completeness: 0.9
known_gaps:
  - Quantum networking for games
  - WebRTC vs WebSocket tradeoffs for browser games
disputed_statements:
  - statement: UDP vs TCP for game networking is debate-dependent on game genre
primary_sources:
  - title: Multiplayer Game Programming
    type: textbook
    year: 2015
    url: https://www.pearson.com/en-us/subject-catalog/p/multiplayer-game-programming/P200000009344
    institution: Addison-Wesley
  - title: Source Multiplayer Networking
    type: official_documentation
    year: 2020
    url: https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking
    institution: Valve
secondary_sources:
  - title: Gaffer on Games — Networked Physics
    type: blog_post
    url: https://gafferongames.com/post/introduction_to_networked_physics/
    institution: Gaffer on Games
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

## Related Articles

- [AI for Game Theory: Computational Game Playing, Nash Equilibrium, and Multi-Agent Strategy](../../ai/ai-for-gaming-theory.md)
- [MLOps and LLMOps: Production AI Engineering, Observability, and Platform Architecture](../../ai/mlops-llmops.md)
- [Neural Architecture Search: Automated Design of Deep Neural Networks](../../ai/neural-architecture-search.md)