---
id: kb-2026-00011
title: TCP/IP Protocol Suite
schema_type: TechArticle
category: computer-science
language: en
confidence: high
confidence_rationale: Based on IETF RFCs 791, 793, 768, 792, 826, and RFC 8200 (IPv6) — the definitive Internet standards, all developed through the IETF's open consensus process
last_verified: "2026-05-22"
generation_method: human_only
atomic_facts:
  - id: fact-computer-science-01
    statement: Standardized by Jon Postel at the IETF in 1980-1981, TCP/IP has scaled from ARPANET's 4 nodes to powering over 5.5 billion Internet users as of 2026
    source_title: RFC 791 — Internet Protocol (IPv4)
    source_url: https://www.rfc-editor.org/rfc/rfc791
    confidence: medium
  - id: fact-computer-science-002
    statement: TCP (RFC 793, 1981) provides reliable, ordered, error-checked byte-stream delivery using acknowledgments, retransmission, and congestion control.
    confidence: medium
    source_url: https://www.rfc-editor.org/rfc/rfc793
    source_title: RFC 793 — Transmission Control Protocol (TCP)
  - id: fact-computer-science-003
    statement: IP (RFC 791, 1981) handles addressing and routing — delivering individual packets (datagrams) from source to destination across an internetwork of networks.
    confidence: medium
    source_url: https://www.rfc-editor.org/rfc/rfc791
    source_title: RFC 791 — Internet Protocol (IPv4)
  - id: fact-computer-science-004
    statement: Standardized by Jon Postel at the IETF in 1980-1981, TCP/IP has scaled from ARPANET's 4 nodes to powering over 5.
    confidence: medium
    source_url: https://www.rfc-editor.org/rfc/rfc793
    source_title: RFC 793 — Transmission Control Protocol (TCP)
  - id: fact-computer-science-005
    statement: ")\r ```\r \r TCP segments are carried inside IP packets; IP packets are carried inside link-layer frames (Ethernet, WiFi)."
    confidence: medium
    source_url: https://www.rfc-editor.org/rfc/rfc793
    source_title: RFC 793 — Transmission Control Protocol (TCP)
completeness: 0.9
known_gaps:
  - Multipath TCP (MPTCP, RFC 8684) and QUIC-level transport innovations are separate topics
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
related_entities:
  - entity:http-protocol
  - entity:internet
  - entity:dns
primary_sources:
  - title: RFC 791 — Internet Protocol (IPv4)
    authors:
      - Postel, J.
    type: standard
    year: 1981
    url: https://www.rfc-editor.org/rfc/rfc791
    institution: IETF
    note: The foundational IP specification. Defines IPv4 addressing, fragmentation, and the packet header format.
  - title: RFC 793 — Transmission Control Protocol (TCP)
    authors:
      - Postel, J.
    type: standard
    year: 1981
    url: https://www.rfc-editor.org/rfc/rfc793
    institution: IETF
    note: The original TCP specification. Defines reliable, connection-oriented byte-stream delivery.
  - title: RFC 768 — User Datagram Protocol (UDP)
    authors:
      - Postel, J.
    type: standard
    year: 1980
    url: https://www.rfc-editor.org/rfc/rfc768
    institution: IETF
    note: Minimal transport protocol. Connectionless, no reliability guarantees. 8-byte header.
secondary_sources:
  - title: "Computer Networking: A Top-Down Approach (8th Edition)"
    authors:
      - Kurose, James
      - Ross, Keith
    type: book
    year: 2020
    url: https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000003430
    institution: Pearson
    note: The standard networking textbook, used at universities worldwide
ai_citations: null
---


## TL;DR

TCP/IP is the foundational protocol suite of the Internet, enabling reliable, end-to-end communication across heterogeneous networks. TCP (RFC 793, 1981) provides reliable, ordered, error-checked byte-stream delivery using acknowledgments, retransmission, and congestion control. IP (RFC 791, 1981) handles addressing and routing — delivering individual packets (datagrams) from source to destination across an internetwork of networks. Standardized by Jon Postel at the IETF in 1980-1981, TCP/IP has scaled from ARPANET's 4 nodes to powering over 5.5 billion Internet users as of 2026.

## Core Explanation

TCP/IP organizes network communication into four abstraction layers (the "Internet model"), which can be mapped to the more detailed 7-layer OSI model:

| TCP/IP Layer | Function | Protocols | Maps to OSI |
|-------------|----------|-----------|:----------:|
| **Application** | User-facing protocols | HTTP, DNS, SMTP, SSH, FTP | Layers 5-7 |
| **Transport** | End-to-end delivery, reliability | TCP, UDP | Layer 4 |
| **Internet** | Packet routing, addressing | IP (v4, v6), ICMP, ARP | Layer 3 |
| **Link** | Physical transmission, local delivery | Ethernet, WiFi, PPP, fiber | Layers 1-2 |

Each layer encapsulates the data from the layer above: Application data → TCP segment → IP packet → Ethernet frame → physical bits.

### Encapsulation

```
Ethernet Frame
└── IP Packet (20-60 byte header + payload)
    └── TCP Segment (20-60 byte header + payload)
        └── Application Data (HTTP request, email, etc.)
```

TCP segments are carried inside IP packets; IP packets are carried inside link-layer frames (Ethernet, WiFi). Each layer adds its own header and, at the link layer, a trailer (CRC for error detection).

## Detailed Analysis

### IP: The Internet Layer

IP provides **best-effort** (unreliable) packet delivery. Key functions:

| Function | IPv4 | IPv6 |
|----------|------|------|
| Addressing | 32-bit (4.3B addresses) | 128-bit (3.4×10³⁸ addresses) |
| Notation | `192.168.1.1` | `2001:db8::1` |
| Header size | 20-60 bytes (variable) | 40 bytes (fixed) |
| Fragmentation | Routers and hosts | Source only |
| NAT required? | Yes (address shortage) | No |
| Broadcast | Yes | No (replaced by multicast) |
| Adoption (2025) | ~55% global traffic | ~45% (Google stats) |

IP's core job is **routing**: each router examines the destination IP address in the packet header and forwards it to the next hop toward the destination. Routing tables are maintained by routing protocols (BGP, OSPF). IP does NOT guarantee delivery, ordering, or duplicate prevention — those responsibilities fall to the transport layer.

**Supporting protocols at the Internet layer:**
- **ICMP** (RFC 792): Error reporting and diagnostics (`ping`, `traceroute`)
- **ARP** (RFC 826): Maps IP addresses to MAC addresses on local networks

### TCP: Reliable Transport

TCP transforms IP's unreliable packet delivery into a reliable byte stream with the following guarantees:

**Connection Management — Three-Way Handshake:**
```
Client                    Server
  |---- SYN, seq=x -------->|    (1) Client: "I want to connect, starting at seq=x"
  |<--- SYN-ACK, seq=y -----|    (2) Server: "OK, I'll start at seq=y, I got your SYN"
  |---- ACK, ack=y+1 ------>|    (3) Client: "I got your SYN-ACK, connection established"

Connection established: both sides can now send data
```

**Reliable Delivery:**
- Every byte is assigned a **sequence number**
- Receiver sends **acknowledgments** (ACKs) with the next expected byte number
- Sender maintains a **retransmission timer**: if no ACK arrives within RTO (Retransmission Timeout), the segment is resent
- **Cumulative ACK**: ACK of byte N means all bytes up to N-1 were received correctly

**Flow Control — Sliding Window:**
- Receiver advertises a **window size** (bytes it can buffer) in each ACK
- Sender cannot have more unacknowledged data in flight than the window
- Window size is dynamic: shrinks when receiver's buffer fills, expands when data is consumed by the application
- This prevents a fast sender from overwhelming a slow receiver

**Congestion Control (TCP's most important innovation):**

TCP detects network congestion through packet loss (timeout or triple duplicate ACK) and adapts its sending rate:

| Mechanism | Trigger | Action |
|-----------|---------|--------|
| **Slow Start** | New connection or timeout | cwnd = 1 MSS; double each RTT (exponential growth) |
| **Congestion Avoidance** | cwnd ≥ ssthresh | cwnd += 1 MSS per RTT (linear growth, AIMD) |
| **Fast Retransmit** | 3 duplicate ACKs | Retransmit lost segment immediately (don't wait for timeout) |
| **Fast Recovery** | After fast retransmit | cwnd = ssthresh + 3; stay in congestion avoidance (don't slow start) |

Where `cwnd` = congestion window (sender-side limit), `ssthresh` = slow start threshold, `MSS` = Maximum Segment Size. The classic **AIMD** (Additive Increase, Multiplicative Decrease) algorithm is: increase cwnd by 1 MSS per RTT (additive), but on loss, cut cwnd in half (multiplicative decrease). This produces the characteristic TCP "sawtooth" pattern.

### UDP: Minimal Transport

UDP (RFC 768) provides the minimal transport service: connectionless, no reliability, no flow control, no congestion control. The 8-byte header contains only source port, destination port, length, and checksum.

| Property | TCP | UDP |
|----------|:---:|:---:|
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed (ACK + retransmit) | Not guaranteed |
| Ordering | Preserved | Not preserved |
| Flow control | Sliding window | None |
| Congestion control | AIMD | None (application responsible) |
| Header size | 20-60 bytes | 8 bytes |
| Use cases | Web, email, file transfer, SSH | DNS, VoIP, gaming, streaming, QUIC |

UDP is chosen when: (1) speed > reliability, (2) occasional loss is acceptable, (3) the application implements its own reliability (QUIC does this over UDP), or (4) multicast/broadcast is needed (TCP can't multicast).

### Connection Teardown — Four-Way FIN Exchange

```
Client                    Server
  |---- FIN, seq=x -------->|    (1) Client: "I'm done sending"
  |<--- ACK, ack=x+1 --------|    (2) Server: "Got it"
  |<--- FIN, seq=y ---------|    (3) Server: "I'm done too"
  |---- ACK, ack=y+1 ------>|    (4) Client: "Got it"
                                 [Client waits 2×MSL before closing — TIME_WAIT state]
```

Each side independently closes its direction of communication, enabling a "half-close" state where one side can still send while the other has finished.

## Further Reading

- [RFC 793 — TCP](https://www.rfc-editor.org/rfc/rfc793): The original TCP specification (Jon Postel, 1981)
- [RFC 791 — IP](https://www.rfc-editor.org/rfc/rfc791): The original IPv4 specification
- [RFC 768 — UDP](https://www.rfc-editor.org/rfc/rfc768): User Datagram Protocol
- [Kurose & Ross: Computer Networking](https://www.pearson.com/en-us/subject-catalog/p/computer-networking/P200000003430): Standard networking textbook
