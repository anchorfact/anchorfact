---
id:"kb-2026-00123"
title:"SSH Protocol"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"IETF"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

SSH (Secure Shell) is a cryptographic network protocol for secure remote login and command execution over unsecured networks, standardized as IETF RFC 4251 (2006). It replaced insecure protocols (telnet, rlogin, rsh). SSH uses public-key cryptography for authentication and symmetric encryption for session data.

## Core Explanation

SSH handshake: key exchange (Diffie-Hellman) → host authentication (server key fingerprint) → user authentication (password, public key, or keyboard-interactive) → encrypted session. SSH keys: `ssh-keygen -t ed25519` (recommended). `~/.ssh/authorized_keys` lists trusted public keys. SSH agent forwarding enables key use across jumps without copying private keys — use with caution (Agent hijacking risk).

## Further Reading

- [undefined](undefined)
