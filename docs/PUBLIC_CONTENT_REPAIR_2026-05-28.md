# AnchorFact Public Content Repair - 2026-05-28

## Summary

This repair pass addressed the 16 `repair_sources` entries from the refreshed public audit sample generated after the 2026-05-27 repair release. The goal was to reduce weak evidence exposure in the next risk-weighted sample without changing publication rules or editing unsampled content.

- Scope: 16 sampled public articles only.
- Public/draft count after repair: 554 public / 446 draft.
- Public claim count after repair: 1574.
- Verification report: 16 edited articles received targeted manual-review entries; total manual-reviewed articles is now 34.
- Overall source verification rate in the trusted snapshot is now 43.1%.

## Repair Actions

| slug | action |
|---|---|
| `history/enlightenment-era` | Removed duplicate and unsupported facts, dropped fabricated or generic sources, and aligned the remaining claims to the verified Enlightenment source. |
| `history/leonardo-da-vinci` | Removed duplicate/fabricated source entries, softened the Mona Lisa claim, and aligned evidence to the retained Leonardo source. |
| `history/reformation` | Removed fabricated 2025 sources, duplicate facts, and generic dispute text; retained claims supported by the verified Reformation source. |
| `history/ancient-egypt` | Removed duplicate/fabricated sources and unsupported secondary entries; kept claims aligned to the verified Ancient Egypt source. |
| `sports/olympic-games-history` | Replaced stale book metadata, retained the Olympic Charter as current rule evidence, and removed unrelated or unsupported sources/disputes. |
| `arts/architecture-history` | Removed duplicate Fallingwater content, removed fake sources, and rewrote the Sagrada Familia fact to avoid outdated completion wording. |
| `science/immune-system` | Replaced inaccessible textbook metadata with OpenStax Biology 2e chapter pages and aligned all immune-system claims to those sources. |
| `arts/design-thinking` | Removed fake and unrelated art-history sources, added Stanford d.school, IDEO, and Design Council evidence, and aligned claims to those sources. |
| `ai/tokenization-in-nlp` | Added BERT evidence for the WordPiece claim, lowered unsupported high claim confidence, and aligned tokenization facts to concrete sources. |
| `ai/attention-mechanisms-deep-dive` | Added exact attention, alignment, and FlashAttention primary sources, removed weak secondary surveys, and normalized claim confidence. |
| `ai/constitutional-ai` | Removed the unsupported Claude-first claim, repaired a broken atomic fact, and narrowed claims to evidence in the CAI and Pareto-smoothed preference papers. |
| `ai/knowledge-distillation` | Removed duplicate and unrelated sources, added DistilBERT evidence, and aligned distillation claims to Hinton, DistilBERT, TinyBERT, and Model Compression sources. |
| `ai/natural-language-processing-nlp` | Removed volatile GPT-5/current-SOTA wording, aligned transformer claims to the primary Transformer paper, and removed unrelated disputes. |
| `arts/digital-art` | Replaced unsupported AI-art controversy wording with stable generative-art and digital-art claims, adding Christie, Blender, and Christiane Paul evidence. |
| `business/cryptocurrency` | Replaced broad cryptocurrency claims with Bitcoin whitepaper and SEC spot bitcoin ETP evidence, removing unsupported economics/dispute material. |
| `computer-science/angular` | Replaced the generic Angular homepage source with specific Angular docs for components, standalone migration, signals, and hydration; removed unsupported adoption claims. |

## Audit Result

After rebuilding and rerunning `npm run audit-public-sample`, the refreshed sample reports:

- `keep_public`: 4
- `repair_sources`: 16
- `move_to_draft`: 0
- `downgrade_confidence`: 0

The remaining `repair_sources` entries are a new risk-weighted sample and should be handled in a separate repair pass.
