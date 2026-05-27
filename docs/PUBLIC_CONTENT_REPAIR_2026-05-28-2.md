# AnchorFact Public Content Repair - 2026-05-28 Batch 2

## Summary

This repair pass addressed the 16 `repair_sources` entries from the refreshed public audit sample generated after `fix: repair second public evidence sample`. The goal was to keep reducing weak public evidence exposure through bounded, source-backed content repair without changing publication rules or editing unsampled content.

- Scope: 16 sampled public articles only.
- Public/draft count after repair: 554 public / 446 draft.
- Public claim count after repair: 1564.
- Verification report: 16 edited articles received targeted manual-review entries; total manual-reviewed articles is now 50.
- Overall source verification rate in the trusted snapshot is now 44.3%.

## Repair Actions

| slug | action |
|---|---|
| `history/renaissance-science` | Removed fabricated 2025 source metadata, generic dispute text, and duplicate claims; retained source-mapped claims for Copernicus, Vesalius, and Galileo. |
| `history/silk-road` | Removed fabricated book and website sources, generic dispute text, and duplicate route claims; retained source-mapped trade, coinage, and transfer claims. |
| `history/viking-age` | Removed fabricated archaeology sources and generic dispute text; retained British Museum, Jorvik, and National Museum of Denmark evidence. |
| `business/financial-literacy` | Replaced generic finance books with CFPB, myFICO, and Investor.gov sources; aligned FICO, credit-report, and compound-interest claims to those sources. |
| `ai/explainable-ai-xai` | Removed unsupported saliency and governance claims; retained LIME, SHAP, and XAI survey evidence with normalized medium confidence. |
| `game-development/game-testing-methodology` | Rewrote mojibake content, removed broken atomic facts, and aligned claims to Unity Test Framework, Unity Build Automation, and Unreal Automation System documentation. |
| `history/french-revolution` | Removed fabricated 2025 sources and generic dispute text; retained Britannica and National Archives evidence for revolution timeline and rights claims. |
| `ai/recurrent-neural-networks-rnn` | Removed weak Mamba and AI-safety material; retained LSTM, GRU, and Transformer transition sources with clean source-mapped claims. |
| `ai/transformer-architecture-variants` | Removed mismatched state-space-model evidence, normalized confidence to medium, and retained Transformer, ViT, Swin, and Efficient Transformers sources. |
| `computer-science/c-language` | Replaced fabricated language sources with ISO C23, Bell Labs, and K&R evidence; removed unsupported broad foundation claims. |
| `ai/activation-functions` | Replaced weak generic sources with Deep Learning, ReLU, GELU, and Swish evidence; normalized confidence to medium. |
| `ai/3d-generation-gaussian-splatting` | Removed weak survey and paradigm-shift claims; retained 3D Gaussian Splatting, NeRF, and DreamFusion sources with medium confidence. |
| `computer-science/php-language` | Replaced unrelated programming-language sources with PHP manual, history, release-notes, and FPM documentation; lowered article confidence to medium. |
| `computer-science/playwright` | Replaced homepage/book sources with specific Playwright docs for browsers, auto-waiting, tracing, codegen, and API testing; normalized confidence to medium. |
| `computer-science/react` | Replaced volatile popularity/origin claims with React official docs and React 19 / Server Components sources; normalized confidence to medium. |
| `game-development/community-management` | Rewrote mojibake content, removed broken atomic facts, and aligned claims to Steam moderation, Discord policy, Unity Cloud Content Delivery, and Unity community documentation. |

## Audit Result

After rebuilding and rerunning `npm run audit-public-sample`, the refreshed sample reports:

- `keep_public`: 4
- `repair_sources`: 16
- `move_to_draft`: 0
- `downgrade_confidence`: 0

The remaining `repair_sources` entries are a new risk-weighted sample and should be handled in a separate repair pass.
