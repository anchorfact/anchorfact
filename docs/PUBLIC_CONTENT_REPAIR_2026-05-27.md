# AnchorFact Public Content Repair - 2026-05-27

## Summary

This repair pass addressed the 18 `repair_sources` entries from the 2026-05-27 public audit sample. The goal was to reduce weak evidence exposure without broad rule changes or bulk rewriting.

- Scope: 18 sampled public articles only.
- Public/draft count after repair: 554 public / 446 draft.
- Public claim count after repair: 1584.
- Verification report: 18 edited articles received targeted manual-review entries because the local shell verifier could not reliably access the network in this environment.

## Repair Actions

| slug | action |
|---|---|
| `business/supply-chain-management` | Replaced generic HBR homepage evidence with ASCM and IBM source pages; removed duplicate/unsupported atomic facts and unrelated AI governance dispute. |
| `history/byzantine-empire` | Removed fabricated 2025 sources, unrelated colonialism dispute, and duplicate fact; aligned claims to the Princeton source. |
| `history/computer-history` | Removed generic Britannica homepage and duplicate Moore's Law claim; made Oxford VSI the primary verified source and kept Isaacson as supporting evidence. |
| `history/great-depression` | Removed generic dispute and unverified duplicate book entries; aligned New Deal claims to the Oxford VSI source. |
| `ai/gpt-models` | Repaired broken training-paradigm atomic facts, removed unrelated IoT source, added GPT-4 technical report metadata, and removed unrelated AI governance dispute. |
| `science/plate-tectonics` | Removed fake 2025 DOI-style sources, generic Nature homepage, and generic dispute; kept Oreskes and Springer evidence. |
| `arts/classical-music-periods` | Removed duplicate fact, unrelated art-definition dispute, fake 2025 sources, and irrelevant art-history source; kept Rosen and Ross sources. |
| `history/age-of-exploration` | Removed fake 2025 sources, unrelated QLoRA source, and generic dispute; kept the HarperCollins Magellan source. |
| `ai/agentic-ai` | Added exact secondary evidence for autonomous-agent survey, Chain-of-Thought, and Tree-of-Thought facts; removed fake secondary sources. |
| `ai/ai-for-food-science` | Removed unsupported NotCo valuation/platform claim; normalized FAO evidence title. |
| `ai/computer-vision` | Removed broken split atomic facts and lowered claim confidence to match article confidence. |
| `ai/gradient-descent` | Replaced generic Deep Learning homepage with the optimization chapter URL; removed speculative future survey source and lowered claim confidence. |
| `ai/graphrag` | Removed volatile GitHub-star/deployment claim and broken split facts; reduced primary sources to the two claims actually use. |
| `ai/reinforcement-learning` | Lowered atomic claim confidence to match the article's effective confidence. |
| `arts/film-genres` | Removed duplicate claim, unrelated art-definition dispute, and irrelevant art-history source; lowered claim confidence. |
| `arts/world-literature` | Removed duplicate claim/source, unrelated art-history source, and unrelated art-definition dispute; lowered claim confidence. |
| `business/product-listing-optimization-amazon` | Replaced HBR homepage evidence with Amazon Ads and Seller Central source pages; rewrote unsupported listing claims to match those sources. |
| `health/strength-training` | Removed duplicate and unsupported protein claim; added ACSM DOMS evidence and removed unrelated AI governance dispute. |

## Audit Result

After rebuilding and rerunning `npm run audit-public-sample`, the original repaired items no longer dominate the risk-weighted sample. The refreshed sample reports:

- `keep_public`: 4
- `repair_sources`: 16
- `move_to_draft`: 0
- `downgrade_confidence`: 0

The next repair pass should use the refreshed audit sample rather than continuing to edit outside this bounded set.
