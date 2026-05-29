---
id: "kb-2026-00123"
title: "SSH Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ssh-1"
    statement: "RFC 4251 describes SSH as a protocol suite consisting of the transport layer protocol, user authentication protocol, and connection protocol."
    source_title: "RFC 4251: The Secure Shell (SSH) Protocol Architecture"
    source_url: "https://www.rfc-editor.org/rfc/rfc4251.html"
    confidence: "medium"
  - id: "fact-ssh-2"
    statement: "RFC 4253 specifies the SSH transport layer protocol, which provides server authentication, confidentiality, and integrity."
    source_title: "RFC 4253: The Secure Shell (SSH) Transport Layer Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc4253.html"
    confidence: "medium"
  - id: "fact-ssh-3"
    statement: "RFC 4254 specifies the SSH connection protocol, which multiplexes several logical channels over an authenticated and encrypted tunnel."
    source_title: "RFC 4254: The Secure Shell (SSH) Connection Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc4254.html"
    confidence: "medium"

completeness: 0.8

known_gaps:
  - "This compact repair explains the standardized protocol architecture and avoids operational key-management advice."

disputed_statements: []

primary_sources:
  - title: "RFC 4251: The Secure Shell (SSH) Protocol Architecture"
    authors: ["Ylonen, T.", "Lonvick, C."]
    type: "rfc"
    year: 2006
    url: "https://www.rfc-editor.org/rfc/rfc4251.html"
    institution: "IETF"
  - title: "RFC 4253: The Secure Shell (SSH) Transport Layer Protocol"
    authors: ["Ylonen, T.", "Lonvick, C."]
    type: "rfc"
    year: 2006
    url: "https://www.rfc-editor.org/rfc/rfc4253.html"
    institution: "IETF"
  - title: "RFC 4254: The Secure Shell (SSH) Connection Protocol"
    authors: ["Ylonen, T.", "Lonvick, C."]
    type: "rfc"
    year: 2006
    url: "https://www.rfc-editor.org/rfc/rfc4254.html"
    institution: "IETF"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

SSH is a secure protocol suite for remote login and other secure network services over an insecure network. Its standards separate transport security, user authentication, and multiplexed connections.

## Core Explanation

The SSH transport layer creates the protected channel, including server authentication, confidentiality, and integrity. User authentication then establishes the client's identity to the server.

Above that protected channel, the SSH connection protocol multiplexes logical channels. This is why one SSH connection can carry an interactive session, command execution, or forwarding-style uses without treating each channel as a separate transport connection.

## Further Reading

- [RFC 4251: The Secure Shell (SSH) Protocol Architecture](https://www.rfc-editor.org/rfc/rfc4251.html)
- [RFC 4253: The Secure Shell (SSH) Transport Layer Protocol](https://www.rfc-editor.org/rfc/rfc4253.html)
- [RFC 4254: The Secure Shell (SSH) Connection Protocol](https://www.rfc-editor.org/rfc/rfc4254.html)

## Related Articles

- [HTTPS / TLS](../https-tls.md)
- [TCP/IP Protocol Suite](../tcp-ip.md)
- [Authentication vs Authorization](../authentication-vs-authorization.md)
