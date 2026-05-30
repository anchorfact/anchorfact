# Public Content Repair - 2026-05-30 Batch 67

## Scope
This batch followed the signed content-health guidance to repair a small, low-complexity draft batch rather than adding another engineering surface. It promoted five AI-first draft articles selected from the automatic repair queue:
- `ai/ai-content-creation`
- `ai/ai-digital-marketing`
- `ai/ai-land-use-classification`
- `ai/ai-satellite-imagery`
- `ai/ai-supply-chain-risk`

## Changes
- Rewrote each article as a compact, source-mapped evidence card.
- Removed arXiv search-page sources, unsupported market-size claims, vendor adoption counts, future-dated generalizations, and broad product claims.
- Lowered article and fact confidence to `medium`.
- Updated only the five targeted `verification-report.json` entries with manual-review metadata.
- Updated current production-count references and monitor baselines to the rebuilt corpus size.

## Verification Notes
- Local rebuilt counts: 607 public / 393 draft / 1866 claims.
- Draft automatic repair candidates reduced from 180 to 175.
- Public source coverage after rebuild: 607 full, 0 partial, 0 zero.
- Public atomic facts mapped to sources: 1866/1866.
- Local `verify-full` was not run.
- `dist/` remains generated output and is not committed.

## Source URLs
- https://arxiv.org/abs/2303.04226
- https://arxiv.org/abs/2005.14165
- https://openaccess.thecvf.com/content/CVPR2022/html/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.html
- https://commons.clarku.edu/faculty_computer_sciences/241/
- https://arxiv.org/abs/1707.07435
- https://arxiv.org/abs/1003.0146
- https://arxiv.org/abs/2009.08949
- https://esa-worldcover.org/en
- https://www.nature.com/articles/s41597-022-01307-4
- https://arxiv.org/abs/1802.07856
- https://arxiv.org/abs/2009.04857
- https://huggingface.co/ibm-nasa-geospatial/Prithvi-100M
- https://arxiv.org/abs/2401.10895
- https://arxiv.org/abs/2107.09485
