---
id: "kb-2026-00068"
title: "Ethereum"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on Ethereum Foundation documentation and go-ethereum repository (51,052 stars)"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Ethereum Documentation"
    type: "documentation"
    year: 2026
    url: "https://ethereum.org/developers/docs/"
    institution: "Ethereum Foundation"
  - title: "go-ethereum GitHub"
    type: "repository"
    url: "https://github.com/ethereum/go-ethereum"
    institution: "Ethereum Foundation"
    stars: 51052
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    institution: "Apress"
completeness: 0.85
ai_citations: {last_citation_check: "2026-05-22"}
---

## TL;DR

Ethereum is a decentralized, open-source blockchain platform with smart contract functionality, proposed by Vitalik Buterin in 2013 and launched in July 2015. It enables developers to build decentralized applications (dApps) on a Turing-complete virtual machine (EVM). As of May 2026, Ethereum is the second-largest cryptocurrency by market capitalization and the dominant platform for DeFi, NFTs, and Web3 applications. Ethereum completed the transition from Proof-of-Work to Proof-of-Stake ("The Merge") in September 2022, reducing energy consumption by approximately 99.95%.

## Core Concepts

- **Smart Contracts**: Self-executing code stored on the blockchain (primarily written in Solidity)
- **EVM**: Ethereum Virtual Machine — deterministic, sandboxed execution environment
- **Gas**: Unit measuring computational effort; each operation costs gas
- **Accounts**: Externally Owned Accounts (user-controlled) and Contract Accounts (code-controlled)
- **ERC Standards**: Token standards (ERC-20 fungible, ERC-721 NFTs, ERC-1155 multi-token)
- **Consensus**: Proof-of-Stake (since The Merge, Sep 2022)

## Major Upgrades

- **The Merge** (Sep 2022): PoW → PoS transition
- **Shanghai/Capella** (Apr 2023): Staking withdrawals enabled
- **Dencun** (Mar 2024): EIP-4844 (proto-danksharding), drastically reducing L2 fees
- **Pectra** (2025): Validator improvements, account abstraction

## Further Reading

- [Ethereum Docs](https://ethereum.org/developers/docs/): Official documentation
- [go-ethereum](https://github.com/ethereum/go-ethereum): Main client implementation (51K+ stars)
