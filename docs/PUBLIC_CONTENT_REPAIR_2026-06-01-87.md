# AnchorFact Public Content Repair - 2026-06-01 - Batch 87

## Scope

Focused content batch aligned to the AI-agent execution direction:

- AI model training concepts needed for model-capability planning.
- LoRA and parameter-efficient adaptation for repeatable model behavior changes.
- Multimodal AI foundations for visual, video, and game-production workflows.
- gRPC and Protocol Buffers as machine-readable service contracts for agents.
- Behavioral economics as a game/app psychology audit vocabulary.

## Repaired Articles

| Article | Outcome |
| --- | --- |
| `ai/large-language-model-training-scaling-laws-data-curation-and-compute` | Replaced placeholder text with source-mapped training, scaling-law, compute-optimal, and in-context-learning facts. |
| `ai/lora-low-rank-adaptation-of-large-language-models` | Replaced placeholder text with LoRA and PEFT source-mapped adaptation facts. |
| `ai/multimodal-ai-vision-language-models-from-clip-to-gpt-4v` | Replaced placeholder text with CLIP, Flamingo, and GPT-4V safety facts. |
| `computer-science/grpc-protocol-buffers-http-2-streaming-and-service-contracts` | Replaced placeholder text with gRPC service-definition, streaming, and Protocol Buffers facts. |
| `business/behavioral-economics-kahneman-tversky-and-the-psychology-of-irrational-decisions` | Replaced placeholder text with Kahneman/Tversky, prospect-theory, heuristics, and bias facts for game/app psychology review. |

## Source Handling

- All exported atomic facts now map to a specific source URL.
- Sources were manually reviewed from arXiv papers, official documentation, institutional pages, and publisher pages.
- `verification-report.json` was updated only for the targeted records with manual-review metadata.
- Local `verify-full` was not run.

## Local Results

- `npm.cmd test`: passed.
- `npm.cmd run quality`: passed.
- `npm.cmd run build`: passed.
- `npm.cmd run audit-public-sample`: passed.
- `npm.cmd run audit-public-full`: passed, `683 keep_public`, `0 actionable`.
- `npm.cmd run content:health`: passed, `683 public / 317 draft / 2176 claims`.
- `npm.cmd run benchmark:ai`: passed, `32/32`.
- `npm.cmd audit`: passed, `0 vulnerabilities`.

## Notes

- The batch increases public coverage without adding new endpoints or broad engineering surface.
- The next content batch should continue prioritizing AI-agent task knowledge, game production, video generation, and game/application psychology.
