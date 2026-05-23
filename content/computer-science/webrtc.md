---
id: "kb-2026-00089"
title: "WebRTC"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "WebRTC (Web Real-Time Communication) is a W3C standard enabling peer-to-peer audio, video, and data communication between browsers without plugins. It uses DTLS-SRTP for encryption and ICE/STUN/TURN for NAT traversal."
    source_title: "WebRTC 1.0 (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/webrtc/"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "WebRTC (Web Real-Time Communication) is a W3C standard enabling peer-to-peer audio, video, and data communication between browsers without plugins. It uses DTLS-SRTP for encryption and ICE/STUN/TURN for NAT traversal."
    source_title: "WebRTC 1.0 (W3C Recommendation)"
    source_url: "https://www.w3.org/TR/webrtc/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "WebRTC 1.0 (W3C Recommendation)"
    type: "standard"
    year: 2023
    url: "https://www.w3.org/TR/webrtc/"
    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---





## TL;DR

WebRTC (Web Real-Time Communication) is a W3C standard enabling peer-to-peer audio, video, and data communication between browsers without plugins. It uses DTLS-SRTP for encryption and ICE/STUN/TURN for NAT traversal.

## Core Explanation

Core APIs: `RTCPeerConnection` (media/data transport), `getUserMedia()` (camera/microphone access), `RTCDataChannel` (arbitrary binary data). Signaling (connection negotiation) is not specified — applications must implement their own signaling channel (usually via WebSocket). WebRTC uses UDP by default but can fall back to TCP.

## Further Reading

- [WebRTC 1.0 (W3C Recommendation)](https://www.w3.org/TR/webrtc/)
