---
id: kb-2026-00256
title: Blockchain Technology
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-13'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-blockchain-001
    statement: >-
      NIST describes a blockchain as a distributed ledger implemented as a list of blocks
      that are cryptographically linked using hash pointers, with copies maintained across
      participating network nodes.
    source_title: Blockchain Technology Overview
    source_url: https://nvlpubs.nist.gov/nistpubs/ir/2018/nist.ir.8202.pdf
    confidence: medium
  - id: fact-computer-science-blockchain-002
    statement: >-
      The Bitcoin white paper describes a peer-to-peer electronic cash system that
      timestamps transactions by hashing them into an ongoing chain of hash-based
      proof-of-work.
    source_title: "Bitcoin: A Peer-to-Peer Electronic Cash System"
    source_url: https://bitcoin.org/bitcoin.pdf
    confidence: medium
  - id: fact-computer-science-blockchain-003
    statement: >-
      The Bitcoin white paper's security argument assumes honest nodes collectively
      control more CPU power than any cooperating group of attacker nodes.
    source_title: "Bitcoin: A Peer-to-Peer Electronic Cash System"
    source_url: https://bitcoin.org/bitcoin.pdf
    confidence: medium
  - id: fact-computer-science-blockchain-004
    statement: >-
      Ethereum documentation defines smart contracts as programs stored on the blockchain
      that run when users send transactions to their addresses.
    source_title: Smart contracts
    source_url: https://ethereum.org/en/developers/docs/smart-contracts/
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Coverage is intentionally limited to stable architecture concepts and does not survey
    every consensus protocol, application domain, or regulatory issue.
disputed_statements: []
primary_sources:
  - title: Blockchain Technology Overview
    type: government_report
    year: 2018
    url: https://nvlpubs.nist.gov/nistpubs/ir/2018/nist.ir.8202.pdf
    institution: National Institute of Standards and Technology
  - title: "Bitcoin: A Peer-to-Peer Electronic Cash System"
    type: whitepaper
    year: 2008
    url: https://bitcoin.org/bitcoin.pdf
    institution: Bitcoin.org
  - title: Smart contracts
    type: documentation
    year: 2026
    url: https://ethereum.org/en/developers/docs/smart-contracts/
    institution: Ethereum Foundation
secondary_sources: []
updated: '2026-06-13'
---

## TL;DR

Blockchain systems organize shared ledger records into blocks that are linked with
cryptographic hashes. Bitcoin applies this pattern to peer-to-peer electronic cash using
hash-based proof-of-work, while Ethereum documentation describes smart contracts as
programs stored on-chain and triggered by transactions.

## Core Explanation

The repaired article focuses on the stable mechanics that are directly supported by primary
sources. NIST treats a blockchain as a distributed ledger whose blocks are linked by hash
pointers and replicated across participating nodes. The Bitcoin white paper explains the
proof-of-work chain and its security assumption that honest nodes control more CPU power than
cooperating attackers. Ethereum's smart-contract documentation covers the programmable
application layer: smart contracts are blockchain-resident programs executed through
transactions.

## Further Reading

- [Blockchain Technology Overview](https://nvlpubs.nist.gov/nistpubs/ir/2018/nist.ir.8202.pdf)
- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)
- [Smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/)

## Related Articles

- [Ethereum](ethereum.md)
- [Merkle Trees: Cryptographic Data Integrity and Blockchain Foundations](merkle-trees-cryptographic-data-integrity-and-blockchain-foundations.md)
- [AI and Blockchain: Decentralized Intelligence, Smart Contracts, and Crypto-Economic Systems](../ai/ai-blockchain.md)
