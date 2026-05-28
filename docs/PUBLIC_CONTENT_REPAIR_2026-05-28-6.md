# AnchorFact Public Content Repair - 2026-05-28 Batch 6

## Summary

This repair pass addressed the next 16 `repair_sources` articles from the refreshed public content audit after `fix: repair sixth public evidence sample`.

Scope was intentionally limited to the sampled public articles. No site-wide quality rule was tightened, no generated `dist/` output was committed, and no full verifier run was performed locally. The bounded `verification-report.json` update records targeted manual review for the repaired primary sources only.

Post-repair local build counts:

- Public articles: 555
- Draft articles: 445
- Public claims: 1532
- Source verification rate in snapshot: 49.8%
- Manual-reviewed verification entries: 98

## Repaired Articles

| Canonical slug | Repair summary | Result |
| --- | --- | --- |
| `history/cold-war` | Removed future Cold War source metadata and aligned overview claims to Britannica, Gaddis, and Westad. | Keep public |
| `science/molecular-biology-central-dogma` | Removed unrelated MCP/CRISPR evidence and aligned claims to Crick, Watson-Crick, and Nirenberg sources. | Keep public |
| `science/neuroscience-brain-plasticity` | Removed 2025 fake review sources and narrowed claims to Kandel, Hebb, and Eriksson evidence. | Keep public |
| `ai/autoencoders` | Removed future survey and AI-governance dispute text; aligned VAE, dimensionality-reduction, and denoising facts. | Keep public |
| `ai/backpropagation` | Replaced unsupported optimization-survey evidence with Rumelhart backprop, Baydin autodiff, and ResNet sources. | Keep public |
| `ai/llm-inference-optimization` | Aligned serving claims to PagedAttention, FlashAttention, and LLM.int8 sources. | Keep public |
| `ai/world-models-video-prediction` | Removed a 2026 future source and aligned claims to World Models, DreamerV3, and OpenAI Sora. | Keep public |
| `arts/aesthetics` | Replaced future book metadata and separated aesthetics, Kant, and art-definition claims across Britannica and SEP sources. | Keep public |
| `ai/contrastive-learning` | Removed duplicate source metadata and aligned claims to SimCLR, MoCo, and CLIP. | Keep public |
| `ai/distributed-training-systems` | Removed the unsupported GPT-4 training claim and aligned facts to Megatron-LM, ZeRO, and GPipe. | Keep public |
| `ai/dropout-and-regularization` | Removed generic homepage/duplicate evidence and aligned claims to Dropout, Elastic Net, and BatchNorm. | Keep public |
| `ai/edge-ai-and-tinyml` | Removed duplicate/future survey evidence and aligned claims to TinyML, MobileNets, and federated learning. | Keep public |
| `history/mayan-civilization` | Removed duplicate broad facts and future book metadata; aligned claims to Britannica, UNESCO, and Smithsonian sources. | Keep public |
| `history/meiji-restoration` | Removed fabricated 2025 DOI metadata and aligned claims to Britannica and National Diet Library sources. | Keep public |
| `history/napoleonic-era` | Reduced broad bundled biography claims to Britannica Napoleonic Wars, Britannica Napoleonic era, and Roberts biography evidence. | Keep public |
| `history/renaissance` | Removed unrelated AI-safety dispute text and aligned Renaissance, humanism, and printing-press claims to Britannica sources. | Keep public |

## Audit Result

After rebuilding and rerunning `npm run audit-public-sample`, the repaired 16 articles no longer appear in the refreshed sample. The new sample reports:

- `keep_public`: 4
- `repair_sources`: 16
- `downgrade_confidence`: 0
- `move_to_draft`: 0

The remaining `repair_sources` entries are a new risk-weighted sample and should be handled in a separate repair pass.
