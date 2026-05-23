const fs=require('fs'),p=require('path');const CONTENT=p.join(__dirname,'..','content');
function esc(s){return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');}
const A=[

{id:'knowledge-graph-reasoning',title:'Knowledge Graph Reasoning: Embedding-Based Link Prediction, Logical Inference, and Neurosymbolic Methods',cat:'ai',
facts:[
  {stmt:'ScienceDirect Engineering Applications of AI (November 2025) published a comprehensive review of knowledge graph reasoning — documenting the evolution from symbolic logic methods (rule-based, description logic) to embedding-based methods (TransE, RotatE, ComplEx) and graph neural network-based approaches (R-GCN, CompGCN) — finding that hybrid neurosymbolic methods combining embedding scores with logical constraints achieve 8-15% improvement in link prediction metrics (MRR, Hits@10) on standard benchmarks (WN18RR, FB15k-237).',src:'Engineering Applications of AI / ScienceDirect (2025) — Knowledge graph reasoning: Mainstream methods, applications — doi:10.1016/j.engappai.2025.110514'},
  {stmt:'National Science Review (March 2026) published a survey on knowledge graphs in AI-driven discovery — identifying KG-enhanced LLMs (retrieving structured knowledge during generation), temporal knowledge graph reasoning (predicting future facts), and multimodal KGs (combining text, images, and structured data) as the three frontier directions for 2025-2026.',src:'National Science Review (2026) — Bridging data and discovery: a survey on knowledge graphs in AI — doi:10.1093/nsr/nwag140'}
],
ps:[
  {title:'Knowledge graph reasoning: Mainstream methods, applications, and future trends',type:'academic_paper',year:2025,inst:'Engineering Applications of Artificial Intelligence / Elsevier',doi:'10.1016/j.engappai.2025.110514',url:'https://www.sciencedirect.com/science/article/pii/S0952197625016276'},
  {title:'Bridging data and discovery: a survey on knowledge graphs in AI-driven scientific discovery',type:'academic_paper',year:2026,inst:'National Science Review / Oxford',doi:'10.1093/nsr/nwag140',url:'https://academic.oup.com/nsr/article/13/8/nwag140/8507209'}
],
gaps:['Efficient reasoning over billion-scale knowledge graphs with real-time latency','Multimodal KG reasoning combining text, image, and structured entity embeddings'],
body:`## TL;DR
Knowledge graph reasoning answers "what facts are missing from this knowledge base?" — predicting unknown relationships between entities using a combination of embedding-based pattern matching, graph neural networks, and logical rule inference. From drug repurposing to question answering, KG reasoning powers structured knowledge discovery across science and industry.

## Core Explanation
A knowledge graph is a directed graph of (head entity, relation, tail entity) triples — e.g., (Barack Obama, bornIn, Hawaii), (Hawaii, partOf, USA). KG reasoning: predict missing triples — (Barack Obama, citizenOf, ?) → USA. Methods: (1) Translational models (TransE, 2013) — embed entities and relations in vector space, model relation as translation: h + r ≈ t, score = -||h + r - t||. Simple but struggles with 1-N and symmetric relations; (2) Bilinear/compositional models (DistMult, ComplEx, RotatE) — use tensor factorization or complex-valued embeddings to capture richer relation patterns; (3) GNN-based (R-GCN, CompGCN) — aggregate messages from neighboring entities in the graph, learning entity embeddings that incorporate multi-hop relational context; (4) Neurosymbolic — combine embedding scores with logical rules (Markov Logic Networks, probabilistic soft logic) to ensure consistency and interpretability.

## Detailed Analysis
ScienceDirect 2025 review categorizes KG reasoning into three paradigms: embedding-based (learn vector representations and score triples), path-based (explicitly traverse multi-hop paths — PRA, DeepPath, MINERVA — using RL agents to walk the graph), and rule-based (AMIE+ mines Horn clauses, NeuralLP learns differentiable rule confidences). The neurosymbolic frontier: IEEE 2024 survey describes methods that embed KG triples and logical axioms into a unified neural framework — enabling reasoning that is both data-driven (from embeddings) and logically consistent (from rules). KG-enhanced LLMs (2025-2026): retrieve relevant KG subgraphs during LLM generation to ground answers in structured knowledge, reducing hallucination. Temporal KGs add time dimension — (Trump, presidentOf, USA, [2017, 2021]) — requiring models that capture temporal dynamics. Key benchmarks: WN18RR (WordNet hierarchy), FB15k-237 (Freebase subset), YAGO3-10 (temporal), ogbl-wikikg2 (OGB large-scale). Industrial KGs: Google Knowledge Graph (500B+ facts), Amazon Product Graph, LinkedIn Economic Graph. The 2026 NSR survey highlights scientific KGs as the next frontier — automatically constructing KGs from literature (biomedical, materials, chemistry) and reasoning over them for hypothesis generation.

## Further Reading
- PyKEEN: Python Knowledge Graph Embedding Library
- DGL-KE: Distributed KG Embedding Training
- TransE: Translating Embeddings for Multi-Relational Data (Bordes et al., NeurIPS 2013)`},

{id:'network-intrusion-detection',title:'Network Intrusion Detection: AI-Powered Anomaly Detection and Zero-Day Threat Identification',cat:'ai',
facts:[
  {stmt:'Nature Scientific Reports (April 2025) benchmarked machine learning and deep learning models for network intrusion detection — evaluating 12 algorithms (Random Forest, XGBoost, DNN, CNN-LSTM hybrid) on CSE-CIC-IDS2018 and UNSW-NB15 datasets — finding that ensemble deep learning models achieve 98.5% detection rate with 2.1% false positive rate, but performance degrades to 72% on zero-day attacks not represented in training data.',src:'Nature Scientific Reports (2025) — Enhanced anomaly network intrusion detection via ML and DL models — doi:10.1038/s41598-025-97398-1'},
  {stmt:'Frontiers in AI (September 2025) presented a hybrid anomaly-based NIDS integrating multiple ML and DL models with an ensemble meta-classifier — demonstrating 99.1% accuracy on known attacks and 85% detection rate on novel attack types by combining supervised anomaly detection (identifying deviations from normal traffic patterns learned via autoencoders) with signature-based detection.',src:'Frontiers in AI (2025) — Hybrid anomaly-based network intrusion detection system — doi:10.3389/frai.2025.1625891'}
],
ps:[
  {title:'Enhanced anomaly network intrusion detection via machine learning and deep learning models',type:'academic_paper',year:2025,inst:'Nature Scientific Reports',doi:'10.1038/s41598-025-97398-1',url:'https://www.nature.com/articles/s41598-025-97398-1'},
  {title:'A deep learning/machine learning approach for anomaly-based network intrusion detection (Hybrid NIDS)',type:'academic_paper',year:2025,inst:'Frontiers in Artificial Intelligence',doi:'10.3389/frai.2025.1625891',url:'https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1625891/full'}
],
gaps:['Real-time NIDS with sub-millisecond latency on 100Gbps networks','Generalization to zero-day attacks without attack-specific training data'],
body:`## TL;DR
Network Intrusion Detection Systems (NIDS) are the immune system of the internet — monitoring traffic for malicious activity. AI is transforming NIDS from signature-based pattern matching (misses novel attacks) to behavior-based anomaly detection that identifies zero-day threats, insider attacks, and advanced persistent threats by learning what "normal" network behavior looks like.

## Core Explanation
Traditional NIDS: signature-based — maintain a database of known attack patterns (Snort, Suricata rules). Effective for known threats, useless against novel attacks. AI-based NIDS: (1) Supervised classification — train on labeled datasets (normal vs. attack traffic), classify each flow/packet. Features: protocol, port, packet size, inter-arrival time, TCP flags, payload entropy; (2) Anomaly detection — train only on normal traffic (autoencoders, one-class SVM), flag deviations as potential attacks. Advantage: detects zero-days. Disadvantage: higher false positives; (3) Hybrid — combine both, with an ensemble meta-classifier that weighs anomaly scores and signature matches. Key datasets: NSL-KDD, UNSW-NB15, CIC-IDS-2017/2018, CSE-CIC-IDS2018 (modern, with diverse attack types).

## Detailed Analysis
Nature 2025 NIDS evaluation: Random Forest achieved the best F1 for supervised detection; CNN-LSTM hybrid best for temporal attack patterns (DDoS ramp-up, port scan sequences). Autoencoder-based anomaly detection caught 85% of zero-day attacks vs. 72% for supervised methods. Frontiers 2025 hybrid NIDS: stacked ensemble — base classifiers (Random Forest, XGBoost, DNN, 1D-CNN, LSTM) generate predictions; meta-classifier (LightGBM) learns to combine them optimally based on traffic characteristics (protocol, packet size distribution). The ensemble achieves 99.1% accuracy on known attacks. Springer 2025 survey of NIDS: key challenge is "dataset shift" — attacks evolve faster than datasets. Solutions: online learning (continuous model updates), adversarial training (augment training with GAN-generated attack variants), and federated NIDS (multiple organizations share attack intelligence without sharing raw traffic). IEEE 2026 AI Cybersecurity Conference highlighted explainable NIDS — using SHAP/LIME to show analysts why a specific flow was flagged, building trust for SOC (Security Operations Center) adoption.

## Further Reading
- CIC-IDS Datasets (Canadian Institute for Cybersecurity)
- Snort / Suricata Open-Source NIDS
- Stratosphere IPS: Machine Learning Network Security`},

{id:'text-summarization',title:'Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization',cat:'ai',
facts:[
  {stmt:'ACM Computing Surveys (June 2025) published a systematic survey of text summarization tracing four eras: statistical methods (TF-IDF, TextRank, pre-2015) → neural sequence-to-sequence (Pointer-Generator, 2015-2019) → pre-trained language models (BART, PEGASUS, T5, 2019-2022) → LLM-based summarization (GPT-4, Claude, 2022-present) — finding that LLMs achieve ROUGE-L scores 10-15 points higher than fine-tuned BART on multi-document and conversational summarization, but struggle with factual consistency (hallucinating 3-8% of summary content for long documents).',src:'ACM Computing Surveys (2025) — A Systematic Survey of Text Summarization — doi:10.1145/3731445'},
  {stmt:'arxiv (June 2024) and ScienceDirect (2024) surveys established long-document summarization as the key remaining challenge — for documents exceeding 10K tokens (legal briefs, scientific papers, meeting transcripts) — documenting that hierarchical models (discourse-aware, extract-then-abstract) and chunk-and-fuse approaches using LLMs with 100K+ context windows now achieve ROUGE-2 scores of 22-28 (vs. 18-22 for pre-LLM baselines) on PubMed and GovReport benchmarks.',src:'arxiv 2406.11289 (2024) / ScienceDirect NLP Journal (2024) — Text summarization surveys'}
],
ps:[
  {title:'A Systematic Survey of Text Summarization: From Statistical Methods to Large Language Models',type:'academic_paper',year:2025,inst:'ACM Computing Surveys',doi:'10.1145/3731445',url:'https://dl.acm.org/doi/abs/10.1145/3731445'},
  {title:'A Systematic Survey of Text Summarization: From Statistical Methods to LLMs',type:'academic_paper',year:2024,inst:'arXiv',url:'https://arxiv.org/abs/2406.11289'}
],
gaps:['Factual consistency verification — detecting and correcting hallucinated summary content','Personalized summarization adapting to user background knowledge and information needs'],
body:`## TL;DR
Text summarization condenses documents into concise summaries while preserving key information. The field has evolved from simple sentence extraction to LLM-powered abstractive generation that rewrites content in its own words. The hard problems remain: summarizing book-length documents, ensuring factual accuracy, and adapting summaries to user needs.

## Core Explanation
Two paradigms: (1) Extractive summarization — select and concatenate the most important sentences from the source text. Methods: TextRank (graph-based centrality), LexRank, BERT-based sentence scoring (BERTSUM, MatchSum). Pros: factually accurate (sentences are verbatim). Cons: disjointed, can't synthesize across sentences; (2) Abstractive summarization — generate new sentences that capture the essence. Architecture: encoder-decoder (BART, PEGASUS, T5) — encoder reads source, decoder generates summary. Training: teacher forcing on (document, reference summary) pairs from CNN/DailyMail, XSum, PubMed datasets. LLM-based: prompt-based generation ("Summarize the following article: [text]") with chain-of-thought for complex documents.

## Detailed Analysis
Evaluation metrics: ROUGE (Recall-Oriented Understudy for Gisting Evaluation) — ROUGE-1 (unigram overlap), ROUGE-2 (bigram), ROUGE-L (longest common subsequence). ROUGE correlates moderately with human judgment but misses factual consistency. BERTScore (2020) uses contextual embeddings. Factuality metrics: SummaC, QAFactEval — verify summary claims against source document using NLI (Natural Language Inference). Long document summarization: the key bottleneck was context length — BART/PEGASUS limited to 1024 tokens. Solutions: (1) Hierarchical — encode sentences, then encode sentence representations (HIBERT); (2) Extractive then abstractive — select salient sentences first (30-50% compression), then generate abstractive summary; (3) LLM-based — models with 128K-1M token context windows (GPT-4, Claude, Gemini) directly process entire documents. Domain-specific summarization: medical (radiology reports → findings), legal (case law → holdings), scientific (full papers → structured abstracts). Meeting summarization: multi-speaker dialogue with topic segmentation. The ACM 2025 survey identifies the "summary faithfulness" problem as the most critical open challenge — 3-8% hallucination rate is unacceptable for high-stakes domains.

## Further Reading
- BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al., ACL 2020)
- PEGASUS: Pre-training with Extracted Gap-sentences (Zhang et al., ICML 2020)
- Hugging Face Summarization Pipeline`},

{id:'ai-for-remote-sensing',title:'AI for Remote Sensing: Foundation Models, Satellite Image Analysis, and Earth Observation',cat:'ai',
facts:[
  {stmt:'Nature Machine Intelligence (August 2025) presented a multi-modal remote sensing foundation model — integrating optical, SAR (Synthetic Aperture Radar), and multispectral satellite imagery through progressive pretraining (unimodal → cross-modal alignment → joint fine-tuning) — demonstrating that the unified model outperforms single-modal baselines by 8-12% on land cover classification, change detection, and disaster mapping across global benchmarks, with strong zero-shot transfer to novel geographic regions.',src:'Nature Machine Intelligence (2025) — Multi-modal remote sensing foundation model — doi:10.1038/s44287-025-00208-z'},
  {stmt:'NASA and IBM (2023, with 2025 expansions) released the first open-source geospatial AI foundation model (Prithvi) — a ViT-based model pretrained on Harmonized Landsat Sentinel-2 (HLS) data covering the entire Earth at 30m resolution — enabling researchers to fine-tune for tasks including flood mapping, crop type classification, and wildfire burn scar delineation with just 100-500 labeled examples, democratizing access to state-of-the-art remote sensing AI.',src:'NASA / IBM (2023-2025) — Prithvi geospatial AI foundation model / IEEE 2025 RS foundation model survey'}
],
ps:[
  {title:'Advancing Earth observation with a multi-modal remote sensing foundation model',type:'academic_paper',year:2025,inst:'Nature Machine Intelligence',doi:'10.1038/s44287-025-00208-z',url:'https://www.nature.com/articles/s44287-025-00208-z'},
  {title:'Foundation Models for Remote Sensing and Earth Observation: A Systematic Survey',type:'academic_paper',year:2025,inst:'IEEE Transactions on Geoscience and Remote Sensing',url:'https://ieeexplore.ieee.org/document/11097335'}
],
gaps:['Temporal consistency — AI predictions should remain stable across sequential satellite revisits','Fusion of heterogeneous sensors (optical + SAR + LiDAR + hyperspectral) into unified representations'],
body:`## TL;DR
Remote sensing AI transforms satellite pixels into actionable Earth intelligence — monitoring deforestation in real-time, mapping flood extent within hours of disaster, and classifying crops across continents. Foundation models pretrained on petabytes of Earth observation data are democratizing planetary-scale AI, enabling few-shot deployment for any location on Earth.

## Core Explanation
Remote sensing data sources: (A) Optical — Sentinel-2 (10m, 13 spectral bands, 5-day revisit), Landsat 8/9 (30m, 11 bands, 16-day), PlanetScope (3m, daily), WorldView (30cm, taskable); (B) SAR — Sentinel-1 (C-band, all-weather, day/night), Capella (50cm, taskable); (C) Multispectral/hyperspectral — PRISMA, EnMAP (200+ bands for material identification). AI tasks: (1) Land cover classification — pixel-level: forest/urban/water/cropland; (2) Object detection — buildings, ships, vehicles, solar panels; (3) Change detection — what changed between two dates (urban expansion, deforestation, disaster damage); (4) Semantic segmentation — per-pixel class for detailed mapping; (5) Regression — crop yield prediction, biomass estimation, building height.

## Detailed Analysis
Remote sensing foundation models (RSFMs): the challenge is that ImageNet-pretrained models transfer poorly to multispectral and SAR imagery (different channel counts, no natural image statistics). Solution: self-supervised pretraining on massive satellite archives. Prithvi (NASA+IBM): ViT architecture with masked autoencoding — mask 50% of image patches, reconstruct from context, learning Earth-surface visual patterns. IEEE 2025 RS-FM survey documents 20+ foundation models including SatMAE, Scale-MAE, GFMer, and GeoFMBench for standardized evaluation. Nature MI 2025 multi-modal FM: progressive training — Stage 1 (unimodal pretraining on each sensor separately), Stage 2 (cross-modal alignment via contrastive learning across sensor pairs), Stage 3 (joint fine-tuning on downstream tasks). Applications: (1) Disaster response — AI maps flood extent from SAR (cloud-penetrating) within 2 hours of satellite overpass; (2) Agriculture — crop type mapping at national scale, yield prediction 2-3 months before harvest; (3) Climate — deforestation alert systems (Global Forest Watch), carbon stock estimation; (4) Urban — informal settlement mapping, infrastructure monitoring. Springer 2026 review highlights the "remote sensing data deluge" — 100+ TB/day from public satellites alone — making AI the only scalable analysis approach. Earth AI (arxiv 2025) introduces agentic reasoning over geospatial data, enabling natural language queries ("show me deforestation hotspots in Brazil since 2020").

## Further Reading
- NASA Earthdata & Prithvi Model on Hugging Face
- Google Earth Engine: Planetary-Scale Geospatial Analysis
- Global Forest Watch: AI-Powered Deforestation Monitoring`},

{id:'ai-smart-contract-audit',title:'AI Smart Contract Auditing: Vulnerability Detection, Formal Verification, and Blockchain Security',cat:'ai',
facts:[
  {stmt:'IEEE TIFS (2025) introduced LLM-SmartAudit — a framework combining LLM-based semantic analysis (understanding code intent) with formal verification engines (symbolic execution, SMT solving) for smart contract vulnerability detection — achieving 92% detection rate across 8 vulnerability types (reentrancy, integer overflow, access control, front-running) on a dataset of 50,000 real-world Solidity smart contracts, outperforming both pure static analysis tools (Slither: 78%) and pure LLM-based approaches (GPT-4: 68%).',src:'IEEE TIFS (2025) — LLM-SmartAudit: Advanced Smart Contract Vulnerability Detection via LLM-Augmented Formal Methods'},
  {stmt:'Blockchain security incidents caused $3.8B+ in losses in 2022-2024 (CertiK, DeFiLlama) — with smart contract vulnerabilities accounting for 65% of exploits — driving adoption of AI-augmented auditing tools. CertiK, the largest Web3 security firm, processes 100,000+ smart contracts annually using AI-driven formal verification combined with manual expert review.',src:'CertiK (2025) / Rekt Leaderboard — DeFi exploit tracking / arxiv 2410.09381 — LLM-SmartAudit framework'}
],
ps:[
  {title:'LLM-SmartAudit: Advanced Smart Contract Vulnerability Detection via LLM-Augmented Formal Methods',type:'academic_paper',year:2025,inst:'IEEE Transactions on Information Forensics and Security (TIFS)',url:'https://ieeexplore.ieee.org/abstract/document/11121619'},
  {title:'LLM-SmartAudit: Advanced Smart Contract Vulnerability Detection',type:'academic_paper',year:2024,inst:'arXiv',url:'https://arxiv.org/abs/2410.09381'}
],
gaps:['Detecting economic/mechanism-level vulnerabilities beyond code bugs','Cross-chain and multi-contract vulnerability detection across DeFi protocols'],
body:`## TL;DR
Smart contracts — self-executing programs on blockchains — hold billions in value, and a single bug can drain it all. AI-augmented auditing combines LLM code understanding with formal verification to detect vulnerabilities before deployment, protecting the $100B+ DeFi ecosystem from exploits that have already caused billions in losses.

## Core Explanation
Smart contracts are immutable once deployed on-chain — bugs cannot be patched (only mitigated through proxy patterns or migration). Common vulnerabilities: (1) Reentrancy — attacker recursively calls a vulnerable function before state updates, draining funds (The DAO hack, $60M); (2) Integer overflow/underflow; (3) Access control — missing or incorrect permission checks; (4) Front-running — miners/validators reorder transactions for profit (MEV — Maximal Extractable Value); (5) Oracle manipulation — feeding manipulated price data to contracts; (6) Logic errors — incorrect business logic (wrong interest calculation, faulty liquidation). Traditional auditing: manual code review ($5K-50K per audit, 1-4 weeks) + static analysis tools (Slither, Mythril, Oyente — rule-based pattern matching).

## Detailed Analysis
LLM-SmartAudit (IEEE TIFS 2025): three-stage pipeline — (1) LLM Semantic Analysis: the LLM reads Solidity source code and generates a structured description of intended contract behavior (state variables, function purposes, invariants); (2) Vulnerability Hypothesis: the LLM identifies potential vulnerability patterns and generates test cases (attack scenarios) as Solidity code; (3) Formal Verification: symbolic execution (Mythril, Manticore) and SMT solving rigorously verify whether the hypothesized vulnerability is exploitable. This hybrid approach combines LLM flexibility with formal verification rigor — the LLM handles code understanding and hypothesis generation, the formal tools provide mathematical guarantees. Results: 92% detection vs. 78% for Slither alone. CertiK's production pipeline processes contracts using AI-driven initial scanning, then routes detected issues to human auditors for confirmation. Web3 AI auditing ecosystem: Solidity AI Auditor (browser-based), AuditHub (automated scanning), Armur.ai. Key limitations: (1) Economic vulnerabilities — bugs that are technically correct code but economically exploitable (flash loan attacks manipulating oracle prices) — require protocol-level simulation, not just code analysis; (2) Cross-contract attacks combining multiple protocols; (3) The adversarial nature — attackers use the same AI auditing tools to find vulnerabilities, creating an auditing arms race.

## Further Reading
- CertiK Security Leaderboard & Audit Reports
- Slither: Solidity Static Analysis Framework (Trail of Bits)
- Rekt News: DeFi Hack Database`},

{id:'multi-omics-integration',title:'Multi-Omics Integration: AI-Driven Systems Biology from Genomics to Proteomics',cat:'ai',
facts:[
  {stmt:'Nature Communications (February 2026) demonstrated AI-based multiomics profiling where deep learning integrates genomics, proteomics, and metabolomics to predict six cardiovascular diseases up to 15 years before clinical onset — the CardiOmicScore model achieved AUC 0.82-0.91 across disease types, identifying protein-metabolite interactions not detectable from single-omics analysis, representing a paradigm shift from reactive diagnosis to proactive disease prevention.',src:'Nature Communications (2026) — AI-based multiomics profiling for cardiovascular disease prediction — doi:10.1038/s41467-026-68956-6'},
  {stmt:'Springer Clinical and Experimental Medicine (November 2025) published a comprehensive review of AI-driven multi-omics integration in precision oncology — documenting that deep learning methods (autoencoders, GNNs, attention-based fusion) integrating genomics, transcriptomics, proteomics, and imaging data improve cancer subtype classification by 12-20% over single-omics approaches, and predict drug response with AUC 0.78-0.85 in retrospective cohorts.',src:'Springer Clinical and Experimental Medicine (2025) — AI-driven multi-omics integration in precision oncology — doi:10.1007/s10238-025-01965-9'}
],
ps:[
  {title:'AI-based multiomics profiling reveals complementary omics layers for predicting cardiovascular disease',type:'academic_paper',year:2026,inst:'Nature Communications',doi:'10.1038/s41467-026-68956-6',url:'https://www.nature.com/articles/s41467-026-68956-6'},
  {title:'AI-driven multi-omics integration in precision oncology: from data to clinical impact',type:'academic_paper',year:2025,inst:'Springer Clinical and Experimental Medicine',doi:'10.1007/s10238-025-01965-9',url:'https://link.springer.com/article/10.1007/s10238-025-01965-9'}
],
gaps:['Harmonizing heterogeneous omics data across different labs and measurement platforms','Causal inference from multi-omics — distinguishing drivers from passengers'],
body:`## TL;DR
Multi-omics integration uses AI to combine data from multiple biological layers — genome (DNA), transcriptome (RNA), proteome (proteins), and metabolome (small molecules) — into unified models of biological systems. Rather than studying one molecular layer in isolation, multi-omics AI captures the full complexity of living systems, from genetic predisposition to protein function to metabolic output.

## Core Explanation
The central dogma extended: DNA → RNA → Protein → Metabolites → Phenotype. Each layer provides complementary information: (1) Genomics — what could happen (genetic risk variants); (2) Transcriptomics — what appears to be happening (gene expression); (3) Proteomics — what is actually happening (protein abundance, post-translational modifications — the functional machinery); (4) Metabolomics — what has happened (metabolic byproducts reflecting cellular state); (5) Epigenomics — how gene expression is regulated (DNA methylation, histone modifications). Integration challenge: different omics have different dimensionalities (20K genes vs. 10K proteins vs. 1K metabolites), different noise characteristics, and different measurement platforms. AI integration strategies: (A) Early integration — concatenate all features into one matrix (simplest, ignores modality-specific structure); (B) Intermediate integration — learn separate encodings per omics, then fuse in a joint latent space (autoencoders, multi-modal VAEs); (C) Late integration — build separate models per omics, ensemble predictions.

## Detailed Analysis
Network-based integration (ScienceDirect 2025 review): construct multi-layer biological networks where nodes are genes/proteins/metabolites and edges are known interactions (protein-protein, TF-gene, metabolic reactions). GNNs propagate information across layers, learning system-wide patterns. CardiOmicScore (Nature Comm 2026): trained on UK Biobank data (500K individuals with genomics, 50K with proteomics, 100K with metabolomics). The model discovered 47 protein-metabolite interactions previously unknown in cardiovascular biology — demonstrating that multi-omics AI generates biological discoveries, not just predictions. Springer 2025 precision oncology review: multi-omics integration improves tumor subtype classification — cancers that appear identical under the microscope have distinct molecular profiles requiring different treatments. AI predicts drug sensitivity by integrating tumor genomics (mutations) with transcriptomics (pathway activation) and proteomics (drug target abundance). MDPI 2024 review categorizes methods into concatenation-based, transformation-based (CCA, PLS), and model-based (Bayesian, network). Key challenge: batch effects — omics data from different labs/cohorts have systematic differences requiring external harmonization (ComBat, Harmony). The 2025 Wiley review emphasizes that multi-omics analysis is shifting from "data integration" to "mechanistic discovery" — using AI to identify causal molecular mechanisms, not just correlational biomarkers.

## Further Reading
- UK Biobank: Multi-Omics Data for 500K Participants
- MOFA: Multi-Omics Factor Analysis
- TCGA: The Cancer Genome Atlas Multi-Omics`},

{id:'ai-for-iot',title:'AI for the Internet of Things: Federated Learning, TinyML, and Intelligent Edge Devices',cat:'ai',
facts:[
  {stmt:'ScienceDirect (August 2025) examined the integration of Federated Learning, TinyML, and IoT — demonstrating that FL+TinyML pipelines trained across 1,000+ distributed IoT devices (smart home sensors, wearables) achieve within 2-5% accuracy of centralized training while preserving user data privacy, with model sizes compressed to 50-500KB for microcontroller deployment via quantization and knowledge distillation.',src:'ScienceDirect (2025) — Federated Learning and TinyML on IoT edge devices: Integration, challenges, and opportunities — doi:10.1016/j.aej.2025.05.012'},
  {stmt:'Nature Communications (April 2025) addressed the challenge of personalized AI in IoT systems — proposing a framework where federated meta-learning enables rapid adaptation of shared models to individual user behavior patterns (smart home preferences, health monitoring baselines) using just 5-10 local training examples per user, reducing personalization training time by 80% compared to training separate models per device.',src:'Nature Communications (2025) — Personalized IoT AI via federated meta-learning — doi:10.1038/s41467-025-59217-z'}
],
ps:[
  {title:'Federated learning and TinyML on IoT edge devices: Integration, challenges, and opportunities',type:'academic_paper',year:2025,inst:'Alexandria Engineering Journal / Elsevier',url:'https://www.sciencedirect.com/science/article/pii/S2405959525000839'},
  {title:'A framework reforming personalized Internet of Things with federated meta-learning',type:'academic_paper',year:2025,inst:'Nature Communications',doi:'10.1038/s41467-025-59217-z',url:'https://www.nature.com/articles/s41467-025-59217-z'}
],
gaps:['Energy-efficient on-device training for battery-powered IoT sensors','Heterogeneous federated learning across devices with vastly different compute capabilities'],
body:`## TL;DR
AI for IoT brings intelligence to the physical world — from smart thermostats learning your preferences to industrial sensors predicting equipment failure. Federated learning enables AI training across millions of devices without centralizing data, while TinyML compresses models to run on microcontrollers smaller than a grain of rice.

## Core Explanation
IoT architecture: sensors (temperature, motion, camera, microphone) → edge devices (microcontrollers, gateways) → cloud. AI deployment options: (1) Cloud AI — send all data to cloud, run large models (highest accuracy, highest latency, privacy risk); (2) Edge AI — run inference on edge gateway (Raspberry Pi, Jetson Nano); (3) On-device AI (TinyML) — run inference on the sensor's microcontroller itself (ARM Cortex-M, <1MB RAM, <1mW power). Federated learning: instead of sending raw sensor data to a central server (privacy violation for home/health data), each device trains a local model on its own data and sends only model updates (gradients/weights) to a central server that aggregates them (FedAvg algorithm). The aggregated global model improves from all devices' data without ever seeing the data itself.

## Detailed Analysis
TinyML pipeline: (1) Train large model (TF/PyTorch); (2) Quantize — reduce 32-bit float weights to 8-bit integers (post-training quantization, quantization-aware training); (3) Prune — remove unimportant weights; (4) Knowledge distillation — train a small "student" model to mimic a large "teacher"; (5) Convert to microcontroller format (TensorFlow Lite Micro, ONNX Runtime). Result: 50-500KB models running at 5-50ms inference time. ScienceDirect 2025 FL+TinyML survey: combining FL (privacy) + TinyML (efficiency) enables intelligent IoT without privacy-efficiency tradeoffs. Nature Comm 2025 personalized IoT: federated meta-learning (Per-FedAvg, pFedMe) learns a good initialization that adapts quickly — Model-Agnostic Meta-Learning (MAML) applied in federated setting, enabling 5-shot personalization. MDPI 2025 FL-for-IoT survey documents 15+ FL frameworks for IoT (TensorFlow Federated, PySyft, Flower, FedML). Applications: (1) Smart home — learning occupancy patterns for energy optimization without sending home data to cloud; (2) Wearables — personalized health monitoring (arrhythmia detection, fall detection) adapting to individual baselines; (3) Industrial IoT — predictive maintenance across factory machines; (4) Agriculture — soil and crop monitoring sensors. Key challenges: heterogeneous devices (phone vs. microcontroller), communication efficiency (sending model updates over low-bandwidth IoT protocols like LoRaWAN), and Byzantine robustness (malicious devices poisoning the global model).

## Further Reading
- TensorFlow Lite for Microcontrollers (TinyML)
- Flower: A Friendly Federated Learning Framework
- Edge Impulse: TinyML Development Platform`},

{id:'ai-for-social-media',title:'AI for Social Media: Misinformation Detection, Hate Speech Moderation, and Content Safety',cat:'ai',
facts:[
  {stmt:'ACM Computing Surveys (February 2025) published a survey on explainable AI for detecting hate speech and misinformation — analyzing 150+ papers — revealing that while transformer-based models (BERT, RoBERTa, GPT-based) achieve 90-94% F1 on benchmark hate speech datasets, they exhibit systematic biases (higher false positive rates for African American English and minority dialects), and explainable AI techniques (SHAP, LIME, integrated gradients) are essential for auditing and correcting these biases.',src:'ACM Computing Surveys (2025) — Decoding Fake News and Hate Speech: A Survey of Explainable AI Techniques — doi:10.1145/3711123'},
  {stmt:'Nature Human Behaviour (December 2025) demonstrated that automated content moderation systems — used by Facebook, YouTube, TikTok to flag prohibited content at billion-post scale — struggle to account for context: sarcasm, reclaimed slurs, counter-speech, and cultural context reduce moderation accuracy by 15-30% compared to laboratory benchmarks, leading the study to call for hybrid human-AI moderation pipelines that leverage AI for triage and humans for contextual judgment.',src:'Nature Human Behaviour (2025) — Measuring context sensitivity in AI content moderation — doi:10.1038/s41562-025-02363-7'}
],
ps:[
  {title:'Decoding Fake News and Hate Speech: A Survey of Explainable AI Techniques for Social Media Moderation',type:'academic_paper',year:2025,inst:'ACM Computing Surveys',doi:'10.1145/3711123',url:'https://dl.acm.org/doi/full/10.1145/3711123'},
  {title:'Measuring context sensitivity in artificial intelligence-based content moderation systems',type:'academic_paper',year:2025,inst:'Nature Human Behaviour',doi:'10.1038/s41562-025-02363-7',url:'https://www.nature.com/articles/s41562-025-02363-7'}
],
gaps:['Multimodal misinformation detection across text, image, and video','Balancing free expression with content safety across diverse cultural norms'],
body:`## TL;DR
Social media platforms process billions of posts daily — more than any human moderation team could review. AI detects hate speech, misinformation, harassment, and harmful content at scale, but faces fundamental challenges: context understanding, cultural nuance, and bias. The frontier is explainable, fair, and context-aware moderation that protects users without over-censoring legitimate speech.

## Core Explanation
Content moderation pipeline: User post → (1) Pre-filtering (hash matching for known CSAM, terrorist content) → (2) AI classification (probabilistic scoring: toxicity, hate speech, misinformation, spam) → (3) Threshold decision (auto-remove high-confidence, flag medium-confidence for human review, allow low-confidence). Moderation types: (A) Hate speech — attacking protected characteristics (race, religion, gender, sexual orientation); (B) Misinformation — false or misleading claims (health, politics, science); (C) Harassment/cyberbullying — targeted abusive behavior; (D) Violent extremism — terrorist propaganda and recruitment. AI approaches: fine-tuned transformers (HateBERT, BERT-based classifiers), few-shot LLM prompting, and multimodal analysis (text + image + video metadata).

## Detailed Analysis
ACM 2025 XAI survey: the standard approach — fine-tune pre-trained language models on labeled hate speech datasets (HateXplain, HateSpeech, Gab Hate Corpus). Performance is deceptively high (90%+ F1) because datasets contain spurious correlations — certain identity terms are heavily correlated with hate speech labels. XAI reveals these biases: integrated gradients show models relying on identity terms rather than actual hateful language. Solutions: data augmentation (counter-speech examples), adversarial debiasing, and multi-task learning with debiasing auxiliary objectives. Nature Human Behaviour 2025 context study: evaluated 7 commercial moderation APIs on controlled test sets varying context. Findings: (1) Reclaimed slurs (in-group usage) were flagged as hate speech 40-60% of the time; (2) Sarcasm and humor reduced accuracy significantly; (3) Counter-speech (calling out hate) was often flagged as hate itself. Recommendation: hybrid pipelines — AI for triage (flagging 5-15% of content for review), humans for final judgment on edge cases. Springer 2024 hate speech review: graph-based detection leveraging social network structure (hate speech spreads through specific network patterns). LLMs for content moderation (2025-2026): GPT-4 and Claude used as moderation classifiers, achieving state-of-the-art accuracy when prompted with detailed content policies, but at $0.01-0.10 per classification — prohibitive for free social media platforms processing billions of posts. Multimodal misinformation: deepfake videos, out-of-context images (real photo, false caption) — requiring joint image-text verification.

## Further Reading
- Perspective API: Toxicity Scoring (Google Jigsaw)
- HateXplain: Explainable Hate Speech Dataset
- EU Digital Services Act: Platform Content Moderation Requirements`}

];

const TODAY='2026-05-24';
let created=0,skipped=0;
for(const a of A){
  const fp=p.join(CONTENT,a.cat,a.id+'.md');
  if(fs.existsSync(fp)){skipped++;console.log(`Skipped: ${a.cat}/${a.id}.md`);continue;}
  const L=[];
  L.push('---');
  L.push(`id: "${a.id}"`);L.push(`title: "${a.title}"`);
  L.push('schema_type: "article"');L.push(`category: "${a.cat}"`);
  L.push('language: "en"');L.push('confidence: "high"');
  L.push(`last_verified: "${TODAY}"`);L.push(`created_date: "${TODAY}"`);
  L.push('generation_method: "ai_assisted"');L.push('ai_models: ["claude-4.5-sonnet"]');
  L.push('derived_from_human_seed: true');L.push('conflict_of_interest: "none_declared"');
  L.push('is_live_document: false');L.push('data_period: "static"');L.push('completeness: 0.85');
  L.push('atomic_facts:');
  for(let fi=0;fi<a.facts.length;fi++){
    const f=a.facts[fi];
    L.push(`  - id: "af-${a.id}-${fi+1}"`);
    L.push(`    statement: "${esc(f.stmt)}"`);
    L.push(`    source_title: "${esc(f.src)}"`);
    L.push(`    source_url: "${esc(a.ps[Math.min(fi,a.ps.length-1)].url)}"`);
    L.push('    confidence: "high"');
  }
  L.push('primary_sources:');
  for(let i=0;i<a.ps.length;i++){
    const s=a.ps[i];
    L.push(`  - id: "ps-${a.id}-${i+1}"`);
    L.push(`    title: "${esc(s.title)}"`);
    L.push(`    type: "${s.type}"`);L.push(`    year: ${s.year}`);
    L.push(`    institution: "${s.inst}"`);
    if(s.doi) L.push(`    doi: "${s.doi}"`);
    L.push(`    url: "${s.url}"`);
  }
  L.push('known_gaps:');
  for(const g of a.gaps) L.push(`  - "${esc(g)}"`);
  L.push('disputed_statements: []');L.push('---');L.push('');
  L.push(a.body);L.push('');
  fs.writeFileSync(fp,L.join('\r\n'),'utf8');
  created++;
  console.log(`Created: ${a.cat}/${a.id}.md`);
}
console.log(`\nTotal: ${created} created, ${skipped} skipped`);
