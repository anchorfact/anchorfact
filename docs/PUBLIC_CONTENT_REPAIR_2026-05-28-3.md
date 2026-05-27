# AnchorFact Public Content Repair - 2026-05-28 Batch 3

## Summary

This repair pass addressed the next 16 `repair_sources` articles from the refreshed public content audit after `fix: repair third public evidence sample`.

Scope was intentionally limited to the sampled public articles. No site-wide quality rule was tightened, no generated `dist/` output was committed, and no full verifier run was performed locally. The bounded `verification-report.json` update records targeted manual review for these 16 repaired articles.

Post-repair local build counts:

- Public articles: 554
- Draft articles: 446
- Public claims: 1553
- Manual-reviewed verification entries: 66
- Source verification rate in snapshot: 45.7%

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `history/polynesian-navigation` | Removed unsupported 2025 sources and generic dispute text; aligned claims to Polynesian Voyaging Society, Smithsonian Folklife, and PBS Wayfinders sources. | Keep public |
| `ai/neural-network-basics` | Removed fake or unrelated 2025/arXiv sources and duplicate universal-approximation claim; aligned claims to Deep Learning chapter 6, Cybenko, and AlexNet sources. | Keep public |
| `ai/overfitting-and-regularization` | Removed fake 2025 survey sources and SHAP mismatch; aligned claims to Deep Learning regularization, JMLR Dropout, and Inception label-smoothing sources. | Keep public |
| `science/dna-structure` | Removed weak memoir/book evidence for precise molecular and genome claims; aligned claims to Watson-Crick, NHGRI, and Britannica sources. | Keep public |
| `geography/world-religions` | Narrowed claims to Pew Research Center 2025 religious-landscape demographic evidence; removed doctrinal and broad book claims. | Keep public |
| `self-improvement/decision-making-psychology` | Aligned claims to Simon, Kahneman and Tversky, and Nudge; removed the unsupported Paradox of Choice claim. | Keep public |
| `ai/attention-mechanism` | Removed citation-count and unrelated mechanism sources; aligned facts to Bahdanau, Luong, and Transformer sources. | Keep public |
| `business/corporate-finance` | Removed future ESG/tokenization sources and unsupported evidence strings; aligned claims to Modigliani-Miller, Sharpe CAPM, and Brealey/Myers/Allen. | Keep public |
| `ai/advanced-rag-techniques` | Normalized facts to medium confidence and aligned claims to RAG, Self-RAG, and REALM sources. | Keep public |
| `ai/ai-art-and-creativity` | Replaced missing or weak AI-art sources with neural style transfer, DALL-E 2, and StyleGAN evidence. | Keep public |
| `ai/ai-benchmarks-and-evaluation` | Aligned benchmark claims to MMLU, HELM, BIG-bench, and SWE-bench; removed overbroad benchmark assertions. | Keep public |
| `ai/ai-content-authenticity` | Aligned claims to C2PA, SynthID, and Nature watermarking sources; removed weak survey and cat-and-mouse overgeneralization. | Keep public |
| `game-development/game-ai-systems` | Rewrote mojibake content and broken code-fragment facts; aligned claims to Unreal Behavior Trees, Unity NavMesh Agent, and Game Programming Patterns. | Keep public |
| `game-development/save-systems-design` | Rewrote mojibake save-system fragments; aligned claims to Unity JsonUtility, PlayerPrefs, and Game Programming Patterns Dirty Flag. | Keep public |
| `game-development/unreal-engine-5` | Removed GDC homepage and unsupported title claims; aligned claims to Epic UE5.0 release notes, Nanite, and Lumen documentation. | Keep public |
| `geography/african-geography` | Replaced broad textbook evidence with specific Britannica and UNESCO sources. | Keep public |

## Audit Result

The regenerated audit report still contains 16 `repair_sources` recommendations, but they are a new risk-weighted sample:

- `keep_public`: 4
- `repair_sources`: 16
- `downgrade_confidence`: 0
- `move_to_draft`: 0

Those remaining `repair_sources` should be handled in a separate repair pass rather than mixed into this release.
