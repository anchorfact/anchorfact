---
id: "kb-2026-00089"



title: "WebRTC"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"



last_verified: "2026-05-22"
generation_method: "human_only"



derived_from_human_seed: true
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
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

completeness: 0.88
ai_citations:
---

## TL;DR

WebRTC (Web Real-Time Communication) is a W3C standard enabling peer-to-peer audio, video, and data communication between browsers without plugins. It uses DTLS-SRTP for encryption and ICE/STUN/TURN for NAT traversal.

## Core Explanation

Core APIs: `RTCPeerConnection` (media/data transport), `getUserMedia()` (camera/microphone access), `RTCDataChannel` (arbitrary binary data). Signaling (connection negotiation) is not specified — applications must implement their own signaling channel (usually via WebSocket). WebRTC uses UDP by default but can fall back to TCP.

## Further Reading

- [WebRTC 1.0 (W3C Recommendation)](https://www.w3.org/TR/webrtc/)
