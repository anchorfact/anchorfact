// p3-ai-sprint-26.cjs - AI Phase 3 Sprint 26: 8 frontier articles
const fs = require('fs'), path = require('path');

const CONTENT = path.join(__dirname, '..', 'content');
const TODAY = '2026-05-24';

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

const articles = [
  {
    id: 'ai-for-code-generation',
    title: 'AI for Code Generation: LLMs as Software Engineering Copilots',
    cat: 'ai',
    facts: [
      { stmt: 'ACM (January 2026) published a comprehensive survey on large language models for code generation, documenting that GPT-4 achieved 88.4% on HumanEval while open-source models like DeepSeek Coder V2 reached 90.2% on the same benchmark in 2025.', src: 'ACM Computing Surveys (2026) -- A Survey on Large Language Models for Code Generation -- doi:10.1145/3747588' },
      { stmt: 'SWE-bench (Princeton, 2024) has become the de facto standard for evaluating AI coding agents on real-world software engineering tasks. As of early 2026, the best agents achieve 40-50% resolution rate on SWE-bench Verified, compared to 1-2% for naive LLM approaches.', src: 'SWE-bench (Jimenez et al., 2024) -- arxiv:2310.06770 / SWE-bench Leaderboard (2025-2026)' }
    ],
    ps: [
      { title: 'A Survey on Large Language Models for Code Generation', type: 'academic_paper', year: 2026, inst: 'ACM Computing Surveys', doi: '10.1145/3747588', url: 'https://dl.acm.org/doi/10.1145/3747588' },
      { title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?', type: 'academic_paper', year: 2024, inst: 'Princeton University / ICLR 2025', url: 'https://arxiv.org/abs/2310.06770' }
    ],
    gaps: [
      'End-to-end repository-level code generation with multi-file reasoning and correctness guarantees',
      'Reliable code generation with formal verification of safety and security properties'
    ],
    body: `## TL;DR
AI code generation has evolved from simple line-level autocomplete to models that can understand entire codebases, fix bugs in production systems, and implement multi-file features from natural language descriptions. LLMs like GitHub Copilot, Claude Code, and Cursor are transforming software engineering by serving as always-available pair programmers.

## Core Explanation
The journey of AI code generation: (1) Statistical language modeling of code (2015-2019) -- treating code as sequential text, models like code2vec learned semantic code representations for tasks like method name prediction; (2) Pre-trained code models (2020-2022) -- CodeBERT, PLBART, and CodeT5 applied the BART/T5 architecture to code, enabling code summarization, translation, and defect detection; (3) Decoder-only Code LLMs (2023-present) -- GPT-4, Claude, Code Llama, StarCoder, DeepSeek Coder, and Qwen Coder are autoregressive LLMs trained on trillions of code tokens, enabling instruction-following code generation and agentic software engineering.

## Detailed Analysis
Key research directions: (1) Fill-in-the-middle (FIM) training -- models learn to predict missing code segments given surrounding context, enabling inline code completion; (2) Repository-level code understanding -- repo-level retrieval-augmented generation (RAG) indexes the entire codebase to provide relevant context when generating code for specific files; (3) Agentic coding -- models act as autonomous agents that read files, run commands, examine outputs, and iteratively refine code. SWE-bench evaluates this capability: agents are given a GitHub issue description and a full codebase snapshot, and must generate a correct patch. Production tools: GitHub Copilot (1.8M+ paid subscribers in 2024), Cursor (AI-native IDE, $10B valuation), Claude Code, Aider and OpenHands (open-source coding agents). Benchmarks: HumanEval, MBPP, LiveCodeBench, SWE-bench, CodeContests. The field is converging on "agentic coding" where AI actively participates in the full software development lifecycle.

## Further Reading
- SWE-bench Leaderboard: swebench.com
- A Survey on Code Generation with LLM-based Agents (arxiv 2508.00083)
- GitHub Copilot / Cursor / Claude Code / Aider / OpenHands`
  },
  {
    id: 'ai-for-archaeology',
    title: 'AI for Archaeology: Site Detection, Artifact Classification, and Digital Heritage Preservation',
    cat: 'ai',
    facts: [
      { stmt: 'A systematic review in Springer Archives of Computational Methods in Engineering (September 2025) categorized AI-driven archaeology into computer vision, deep learning, geospatial analysis, and NLP, with reported accuracies exceeding 94% on ceramic typology classification tasks.', src: 'Archives of Computational Methods in Engineering (Springer, 2025) -- doi:10.1007/s11831-025-10393-7' },
      { stmt: 'AI-powered satellite and LiDAR imagery analysis has revolutionized archaeological site prospection, with one 2024 project identifying over 300 new Nazca geoglyphs using a ResNet-based classifier on high-resolution satellite imagery. Deep learning models trained on known site locations can predict the probability of archaeological presence across large geographic areas.', src: 'Journal of Archaeological Science (2024-2025) / PNAS Nazca geoglyphs AI discovery / CAA Journal' }
    ],
    ps: [
      { title: 'Applications of AI and Machine Learning in Archaeological Practices: A Review', type: 'academic_paper', year: 2025, inst: 'Archives of Computational Methods in Engineering (Springer)', doi: '10.1007/s11831-025-10393-7', url: 'https://link.springer.com/article/10.1007/s11831-025-10393-7' },
      { title: 'Machine learning applications in archaeological practices: a review', type: 'academic_paper', year: 2025, inst: 'ResearchGate', url: 'https://www.researchgate.net/publication/387798164' }
    ],
    gaps: [
      'Multi-modal fusion of geophysical survey data with satellite imagery for comprehensive subsurface site mapping',
      'Standardized open-access archaeological datasets for reproducible AI benchmarking'
    ],
    body: `## TL;DR
AI is transforming archaeology by enabling automated detection of buried structures from satellite imagery, classification of millions of pottery sherds, decipherment of ancient scripts, and reconstruction of fragmented artifacts. From discovering hidden Maya cities in LiDAR point clouds to identifying new Nazca geoglyphs from satellite data, deep learning is giving archaeologists a powerful lens through which to see the past.

## Core Explanation
The archaeology-AI pipeline: (1) Prospection -- satellite imagery (visible, multispectral, SAR) and airborne LiDAR are analyzed by CNNs and vision transformers to detect subtle surface signatures of buried archaeological features. Transfer learning from pre-trained models enables detection even with limited labeled training data; (2) Artifact classification -- deep learning models classify pottery fragments by style, period, and origin based on visual features, achieving expert-level accuracy while processing millions of items; (3) Text and inscription analysis -- LLMs and specialized OCR (Transkribus, PyLaia) transcribe and translate cuneiform tablets, hieroglyphics, and medieval manuscripts; (4) 3D reconstruction -- photogrammetry combined with neural rendering creates high-fidelity 3D models of sites and artifacts for virtual museums and remote research.

## Detailed Analysis
The Springer 2025 review identifies four main AI application domains: computer vision (object detection, semantic segmentation for site/artifact identification), deep learning (CNN, Transformer for image classification), geospatial analysis (LiDAR point cloud processing, multispectral satellite data fusion), and natural language processing (historical document transcription, ancient language translation). Key breakthroughs: (1) Maya lowlands LiDAR survey -- deep learning detected ~60,000 previously unknown structures across 2,100 km² in Guatemala, revealing a civilization far more populous than previously estimated; (2) Nazca Lines discovery -- a ResNet-50 classifier identified 303 new figurative geoglyphs in 2024, nearly doubling the known catalog; (3) Vesuvius Challenge -- AI-enabled virtual unwrapping and ink detection on carbonized Herculaneum papyri, revealing previously unreadable philosophical texts. Gaps remain in multi-modal fusion, standardizing archaeological data formats for AI, and addressing ethical implications of automated heritage interpretation.

## Further Reading
- Journal of Computer Applications in Archaeology (CAA)
- Vesuvius Challenge: scrollprize.org
- Transkribus AI for Historical Documents: readcoop.eu`
  },
  {
    id: 'ai-for-nuclear-fusion',
    title: 'AI for Nuclear Fusion: Plasma Control, Disruption Prediction, and Accelerated Discovery',
    cat: 'ai',
    facts: [
      { stmt: 'Google DeepMind (Nature, February 2022) demonstrated the first application of deep reinforcement learning to control magnetic confinement of fusion plasma in the TCV tokamak. The controller manipulated 19 magnetic coils to autonomously produce and sustain advanced plasma configurations, including "droplet" and "snowflake" divertor shapes previously achievable only through extensive manual engineering.', src: 'Degrave et al., Nature (2022) -- doi:10.1038/s41586-021-04301-9' },
      { stmt: 'AI-driven disruption prediction is critical for ITER and large tokamaks. Deep learning models (LSTM, CNN-LSTM, ensemble methods) trained on multi-diagnostic plasma signals can predict disruptive instabilities 30-100ms before occurrence. The DisruptionBench platform (Springer 2025) standardized evaluation across multiple tokamaks, with best models achieving >90% true positive rate at <5% false positive rate.', src: 'DisruptionBench (Springer 2025) -- doi:10.1007/s10894-025-00495-2 / US DOE (2025)' }
    ],
    ps: [
      { title: 'Magnetic control of tokamak plasmas through deep reinforcement learning', type: 'academic_paper', year: 2022, inst: 'Nature / Google DeepMind', doi: '10.1038/s41586-021-04301-9', url: 'https://www.nature.com/articles/s41586-021-04301-9' },
      { title: 'DisruptionBench and Complimentary New Models: Systematically Evaluate ML-Driven Disruption Prediction', type: 'academic_paper', year: 2025, inst: 'Journal of Fusion Energy (Springer)', doi: '10.1007/s10894-025-00495-2', url: 'https://link.springer.com/article/10.1007/s10894-025-00495-2' }
    ],
    gaps: [
      'Transfer learning between tokamaks -- models trained on one device rarely generalize to others',
      'Real-time interpretable AI -- operators need to understand why a disruption is predicted before acting'
    ],
    body: `## TL;DR
AI is accelerating the path to commercial fusion energy by solving two of the hardest problems in plasma physics: real-time control of magnetically confined 100-million-degree plasma and prediction of dangerous instabilities (disruptions) that can damage reactor walls. From DeepMind's deep RL plasma controller to disruption prediction systems deployed on ITER, machine learning is becoming an essential tool in the fusion engineer's toolkit.

## Core Explanation
Nuclear fusion promises virtually unlimited clean energy if we can confine and control a plasma at temperatures exceeding 100 million degrees Celsius. The leading approach, the tokamak (a doughnut-shaped magnetic confinement device), faces two key challenges: (1) Plasma shape control -- 10-20 magnetic coils must be precisely coordinated in real time to maintain desired plasma configuration; (2) Disruption avoidance -- plasma instabilities can suddenly release stored energy onto the reactor wall, causing significant damage. AI addresses both: deep RL learns control policies by interacting with plasma simulators, while supervised deep learning predicts disruptions from multi-modal diagnostic signals.

## Detailed Analysis
DeepMind's approach (2022): A deep RL agent was trained in a simulator to control 19 magnetic coils of the TCV tokamak. The policy network mapped sensor readings to coil currents, trained using a reward function penalizing deviations from the desired plasma shape. The agent discovered novel plasma configurations including the "droplet" shape (better heat exhaust) and "snowflake" divertor (spreads heat load). Crucially, the controller transferred successfully to the physical tokamak with minimal fine-tuning. Disruption prediction: Current tokamaks experience disruptions at rates of 10-30% of discharges, with ITER requiring <1% to avoid damage. ML models ingest multi-modal time-series data and predict disruptions 30-100ms in advance. DisruptionBench provides standardized train/test splits across multiple tokamaks, revealing that within-device prediction works well (F1>0.9) while cross-device generalization remains poor. The US Department of Energy (2025) demonstrated using deep RL to prevent tearing mode instabilities in real time. Beyond control: AI is also applied to accelerate fusion materials discovery, optimize stellarator coil designs, and analyze petabytes of plasma diagnostic data.

## Further Reading
- DeepMind Blog: Accelerating fusion science through learned plasma control
- TAE Technologies: Norman fusion device AI control
- Commonwealth Fusion Systems / SPARC: AI for HTS magnet tokamak operations`
  },
  {
    id: 'ai-for-food-science',
    title: 'AI for Food Science: Quality Control, Flavor Prediction, and Personalized Nutrition',
    cat: 'ai',
    facts: [
      { stmt: 'Nature Food (May 2025) identified seven grand challenges where AI can accelerate food development: ingredient property prediction, formulation optimization, flavor and aroma modeling, texture engineering, nutritional profiling, shelf-life prediction, and consumer preference modeling.', src: 'Nature Food (May 2025) -- AI for food: accelerating discovery and development -- doi:10.1038/s41538-025-00441-8' },
      { stmt: 'AI-driven food quality control using computer vision and deep learning has achieved >98% accuracy for defect detection in fruits, vegetables, and processed foods in industrial settings. Hyperspectral imaging combined with CNNs can detect internal quality defects invisible to the human eye.', src: 'MDPI Foods (October 2025) -- ML for Quality Control in the Food Industry / Journal of Food Protection (2025)' }
    ],
    ps: [
      { title: 'AI for food: accelerating and democratizing discovery and development', type: 'academic_paper', year: 2025, inst: 'Nature Food', doi: '10.1038/s41538-025-00441-8', url: 'https://www.nature.com/articles/s41538-025-00441-8' },
      { title: 'Artificial intelligence and food flavor: How AI is shaping the future of taste', type: 'academic_paper', year: 2025, inst: 'Comprehensive Reviews in Food Science (IFT)', doi: '10.1111/1541-4337.70068', url: 'https://ift.onlinelibrary.wiley.com/doi/10.1111/1541-4337.70068' }
    ],
    gaps: [
      'Multi-modal integration of taste, smell, texture, and visual data for holistic food quality assessment',
      'Explainable AI for food safety decisions that satisfies regulatory requirements'
    ],
    body: `## TL;DR
AI is entering the food system at every stage -- from accelerating discovery of new sustainable ingredients and predicting flavor profiles, to automating quality inspection on production lines, to personalizing nutrition recommendations based on individual microbiomes and health data.

## Core Explanation
The Nature Food 2025 review identifies three primary AI application layers in food science: (1) Discovery -- generative AI for designing new food molecules (alternative proteins, flavor compounds, preservatives) with desired properties; deep learning for predicting ingredient interactions and formulation stability; (2) Production -- computer vision for real-time quality inspection; ML-optimized process control for fermentation, baking, and extrusion; (3) Nutrition and health -- AI-powered dietary assessment from food photos; personalized meal planning based on metabolomics and microbiome data.

## Detailed Analysis
Flavor prediction is one of the most active areas. Traditional flavor chemistry relies on expert panels and GC-MS analysis -- expensive, slow, and hard to scale. ML approaches train on large databases of flavor compound-structure-odor relationships (FlavorDB, BitterDB) to predict taste and smell of new molecules. Graph neural networks operating on molecular graphs have shown particular promise, learning to predict bitterness, sweetness, and umami from structure alone. The IFT 2025 review documents transition from statistical QSAR models to deep learning, with transformer-based models achieving state-of-the-art flavor prediction. Food quality inspection: Computer vision systems using YOLO, EfficientNet, and vision transformers inspect food products at line speeds of 100+ items per minute, detecting defects, grading quality, and verifying packaging integrity. Hyperspectral imaging adds chemical composition analysis beyond visible appearance. For personalized nutrition, AI models integrate multi-omics data to predict individual glycemic responses and dietary needs. The DayTwo and ZOE platforms use microbiome sequencing and ML to provide personalized dietary recommendations, demonstrating that AI-driven diets can outperform generic guidelines.

## Further Reading
- FlavorDB: cosylab.iiitd.edu.in/flavordb
- DayTwo / ZOE: AI-driven personalized nutrition platforms
- NotCo: AI for plant-based food formulation (Giuseppe AI)`
  },
  {
    id: 'ai-for-humanitarian-aid',
    title: 'AI for Humanitarian Aid: Crisis Mapping, Damage Assessment, and Disaster Response Optimization',
    cat: 'ai',
    facts: [
      { stmt: 'Elsevier International Journal of Disaster Risk Reduction (March 2026) published a comprehensive review mapping the AI technology landscape across all four phases of the disaster management cycle -- mitigation, preparedness, response, and recovery. Deep learning for satellite imagery damage assessment and NLP for social media crisis mapping were identified as the most mature AI applications.', src: 'International Journal of Disaster Risk Reduction (Elsevier, 2026) -- doi:10.1016/j.ijdrr.2026.105801' },
      { stmt: 'The UN Global Pulse PulseSatellite project with Google Research deployed AI-powered satellite imagery analysis for humanitarian disaster assessment, reducing damage assessment time from weeks to hours. Google\'s open-source Skai framework for post-disaster building damage assessment achieved 85-92% accuracy across multiple disaster types.', src: 'UN Global Pulse PulseSatellite (2024) / Google Research Skai framework / ReliefWeb' }
    ],
    ps: [
      { title: 'Artificial intelligence in humanitarian aid: A review and future directions', type: 'academic_paper', year: 2026, inst: 'International Journal of Disaster Risk Reduction (Elsevier)', doi: '10.1016/j.ijdrr.2026.105801', url: 'https://www.sciencedirect.com/science/article/pii/S0166497225002470' },
      { title: 'AI-Driven Multi-Satellite Data Fusion for Real-Time Disaster Assessment', type: 'academic_paper', year: 2025, inst: 'IEEE', url: 'https://ieeexplore.ieee.org/document/11297255' }
    ],
    gaps: [
      'Anticipatory action -- triggering humanitarian funding before a forecasted disaster strikes based on AI predictions',
      'Equitable AI -- ensuring AI-driven aid allocation does not systematically disadvantage marginalized groups'
    ],
    body: `## TL;DR
When disaster strikes, AI helps humanitarian organizations see the impact, coordinate the response, and deliver aid more efficiently. Satellite imagery AI detects damaged buildings within hours of an earthquake. NLP models scan social media for real-time crisis maps. Reinforcement learning optimizes routing of relief trucks through damaged infrastructure. As climate change intensifies disasters, AI is becoming a critical capability for the humanitarian sector.

## Core Explanation
AI for humanitarian aid operates across the disaster management cycle: (1) Mitigation/Preparedness -- ML models predict where disasters are most likely (flood risk mapping, famine early warning systems like FEWS NET, epidemic outbreak forecasting), integrating satellite data, weather forecasts, demographic data, and conflict monitoring; (2) Response -- satellite imagery AI compares pre- and post-disaster imagery to identify damaged buildings, blocked roads, flooded areas, and displaced populations. Social media NLP ingests millions of posts to create real-time crisis maps identifying where people need help and what they need; (3) Recovery -- AI assists in damage claims processing, reconstruction prioritization, and long-term resilience planning.

## Detailed Analysis
Key technologies: (1) Satellite damage assessment -- Deep learning models (U-Net, DeepLab, Swin Transformer with change detection heads) process satellite radar (SAR, which can see through clouds and at night) and optical imagery to identify damaged structures. The xView2 benchmark (DARPA/DIU) provides 850,000+ building annotations across 15 disaster types for training. Google's Skai framework and UN PulseSatellite have operationalized this technology; (2) Crisis mapping from social media -- AIDR (Qatar Computing Research Institute) pioneered ML-based tweet classification for disaster response. Modern systems use LLMs for nuanced classification and entity extraction from multilingual crisis communication; (3) Humanitarian logistics optimization -- route optimization under damaged infrastructure, facility location for aid distribution centers, and multi-agent coordination for drone delivery of medical supplies. The IEEE 2025 multi-satellite data fusion framework demonstrates combining Sentinel-1 (SAR), PlanetScope (optical), and UAV imagery for comprehensive real-time disaster assessment. Ethical considerations: AI must not perpetuate biases, data privacy in crisis situations, and the risk of automated decision-making without human oversight in life-or-death contexts.

## Further Reading
- xView2 Challenge: xview2.org (DARPA building damage assessment benchmark)
- AIDR: aidr.qcri.org (Qatar Computing Research Institute)
- UN Global Pulse / Google Skai: AI for crisis response`
  },
  {
    id: 'ai-for-speech-emotion-recognition',
    title: 'AI for Speech Emotion Recognition: Vocal Biomarkers, Mental Health Screening, and Affective Computing',
    cat: 'ai',
    facts: [
      { stmt: 'A 2024 Nature Scientific Reports study proposed a deep multi-modal framework integrating speech acoustic features (prosody, spectral features, voice quality) with linguistic content (transcribed text) for depression detection, achieving an AUC of 0.82 for depression screening using spontaneous speech recordings.', src: 'Nature Scientific Reports (2024) -- Improving speech depression detection using transfer learning -- doi:10.1038/s41598-024-60278-1' },
      { stmt: 'Speech-based emotion recognition (SER) has evolved from hand-crafted acoustic features + SVM to end-to-end deep learning using wav2vec 2.0, HuBERT, and Whisper speech foundation models. State-of-the-art SER achieves 75-85% accuracy on acted emotions but only 55-65% on naturalistic spontaneous emotions, reflecting the challenge of real-world emotion recognition.', src: 'Frontiers in Psychology (2025) -- Speech analysis and SER in depression detection / IEEE/ACM TASLP benchmarks' }
    ],
    ps: [
      { title: 'Improving speech depression detection using transfer learning with wav2vec 2.0 in low-resource environments', type: 'academic_paper', year: 2024, inst: 'Nature Scientific Reports', doi: '10.1038/s41598-024-60278-1', url: 'https://www.nature.com/articles/s41598-024-60278-1' },
      { title: 'Speech-based Clinical Depression Screening: An Empirical Study', type: 'academic_paper', year: 2024, inst: 'arXiv / ACM Multimedia', url: 'https://arxiv.org/abs/2406.03510' }
    ],
    gaps: [
      'Generalization across languages, cultures, and recording conditions for SER models',
      'Integration of speech emotion AI into clinical workflows with rigorous validation in healthcare settings'
    ],
    body: `## TL;DR
Your voice carries rich information about your emotional state. AI systems can now analyze speech patterns -- pitch, rhythm, tone, pauses -- to detect depression, anxiety, and stress with clinical-grade accuracy, enabling passive, scalable mental health screening through everyday voice interactions.

## Core Explanation
Speech emotion recognition (SER) bridges affective computing and signal processing. Key acoustic features: (1) Prosodic features -- pitch (F0) mean, range, variability; speech rate; pause frequency and duration; (2) Voice quality features -- jitter (frequency perturbation), shimmer (amplitude perturbation), harmonics-to-noise ratio, capturing the "roughness" or "breathiness" of the voice; (3) Spectral features -- Mel-frequency cepstral coefficients (MFCCs), spectral centroid, spectral flux, capturing timbre and resonance characteristics. In depression, characteristic patterns include reduced pitch variability (monotone speech), slower speech rate, longer pauses, increased jitter and shimmer, and reduced spectral energy in higher frequencies.

## Detailed Analysis
Modern SER architectures: (1) Self-supervised speech foundation models (wav2vec 2.0, HuBERT, WavLM, Whisper) are fine-tuned on emotion-labeled speech data. Pre-trained on thousands of hours of unlabeled speech, these models learn general acoustic and linguistic representations, then are fine-tuned on small labeled emotion datasets, dramatically improving SER performance for under-resourced languages; (2) Multi-modal emotion recognition -- combining speech with facial expressions (video) and text (transcripts) using late fusion or cross-modal attention. Vocal biomarkers for mental health: Research has identified specific speech biomarkers for depression (reduced F0 variability, slower rate), anxiety (increased F0, faster rate, voice tremor), PTSD (hyper-arousal vocal patterns), schizophrenia (reduced prosody -- "flat affect" speech), and Parkinson's (reduced loudness, monopitch). Key challenges: (1) Cross-cultural generalization -- emotional expression in speech varies by culture and language; (2) Naturalistic vs. acted data -- most benchmarks use acted emotions which differ from spontaneous real-world emotions; (3) Privacy and ethics -- continuous emotion monitoring raises significant privacy concerns. Companies like Canary Speech, Ellipsis Health, and Kintsugi are pursuing FDA clearance for vocal biomarker-based clinical decision support tools.

## Further Reading
- IEMOCAP, RAVDESS, CREMA-D: Standard SER benchmark datasets
- Canary Speech: Vocal biomarker technology for mental health
- Kintsugi AI: Voice-based mental health screening platform`
  },
  {
    id: 'ai-for-oil-gas-exploration',
    title: 'AI for Oil and Gas Exploration: Seismic Interpretation, Reservoir Characterization, and Subsurface Intelligence',
    cat: 'ai',
    facts: [
      { stmt: 'IEEE Access (February 2024) published a comprehensive review documenting that CNNs applied to 3D seismic volumes can automatically map geological faults with >90% accuracy compared to manual interpretation, reducing interpretation time from months to hours.', src: 'IEEE Access (2024) -- Machine Learning in Oil and Gas Exploration: A Review -- doi:10.1109/ACCESS.2024.3358747' },
      { stmt: 'A Nature Scientific Reports study (October 2025) demonstrated self-supervised learning on massive unlabeled 3D seismic volumes using masked autoencoding, achieving superior transfer to downstream tasks -- fault segmentation, horizon tracking, and reservoir property estimation -- with significantly fewer labeled examples than supervised methods.', src: 'Nature Scientific Reports (October 2025) -- Self-supervised methods for subsurface characterization -- doi:10.1038/s41598-025-20058-x' }
    ],
    ps: [
      { title: 'Machine Learning in Oil and Gas Exploration: A Review', type: 'academic_paper', year: 2024, inst: 'IEEE Access', doi: '10.1109/ACCESS.2024.3358747', url: 'https://ieeexplore.ieee.org/document/10418898' },
      { title: 'Use of deep learning and self-supervised methods for subsurface characterization across multiple geological basins', type: 'academic_paper', year: 2025, inst: 'Nature Scientific Reports', doi: '10.1038/s41598-025-20058-x', url: 'https://www.nature.com/articles/s41598-025-20058-x' }
    ],
    gaps: [
      'Interpretable AI for subsurface predictions -- geoscientists need geological reasoning beyond model outputs',
      'Physics-informed neural networks that respect conservation laws and geomechanical constraints in reservoir simulation'
    ],
    body: `## TL;DR
Finding oil and gas reservoirs kilometers beneath the Earth's surface involves interpreting massive 3D seismic datasets -- a task AI is revolutionizing. Deep learning models now automatically map underground faults, track rock layers across basins, and predict reservoir properties with accuracy rivaling expert geologists, compressing months of manual work into hours of computation.

## Core Explanation
The exploration workflow: (1) Seismic acquisition -- sound waves are sent into the ground; reflections from subsurface rock layers are recorded by geophones, producing terabyte-scale 3D seismic volumes; (2) Seismic interpretation -- geoscientists manually trace geological horizons (layer boundaries) and faults (fractures) on 2D slices. A single survey can take 6-12 months to interpret; (3) Reservoir characterization -- estimating rock properties (porosity, permeability, fluid saturation) from seismic attributes and well logs; (4) Drilling decisions -- selecting drilling locations based on the interpretation.

## Detailed Analysis
AI transforms each stage: (1) Automated fault detection -- 3D CNNs (U-Net variants, 3D ResNet) trained on manually labeled fault cubes detect faults in hours vs. months, learning characteristic seismic signatures of faults; (2) Horizon tracking -- recurrent and attention-based architectures propagate horizon picks through 3D volumes, tracking continuous geological surfaces even across faulted regions; (3) Seismic facies classification -- semantic segmentation groups similar seismic reflection patterns into geological facies (channel systems, carbonate reefs, shale formations), enabling rapid reservoir zone identification; (4) Reservoir property prediction -- integrating seismic attributes with sparse well log data to predict 3D property volumes using geostatistical neural networks. The Nature 2025 self-supervised approach represents a paradigm shift: pre-training on unlabeled seismic data (abundant) enables models to learn general subsurface representations requiring far fewer labeled examples for specific tasks. Physics-informed neural networks (PINNs) incorporate geophysical constraints (wave equation, Darcy's law) into the training objective. The technology is cross-applicable to CO₂ storage monitoring, geothermal reservoir characterization, and groundwater management.

## Further Reading
- SEG (Society of Exploration Geophysicists) Machine Learning GitHub
- Schlumberger DELFI / Halliburton DS365: AI-driven subsurface platforms
- Stanford Center for Earth Resources Forecasting (SCERF)`
  },
  {
    id: 'ai-for-language-learning',
    title: 'AI for Language Learning: Intelligent Tutoring, Speech Assessment, and Personalized Curriculum',
    cat: 'ai',
    facts: [
      { stmt: 'A Nature NPJ Science of Learning systematic review (May 2025) examined 143 studies on AI-driven intelligent tutoring systems in language education, finding that AI-powered systems improved language learning outcomes with a pooled effect size of d=0.62. The most effective systems combined adaptive content recommendation, automated speech assessment, and conversational AI practice.', src: 'Nature NPJ Science of Learning (May 2025) -- doi:10.1038/s41539-025-00320-7' },
      { stmt: 'Duolingo\'s AI-powered platform (500M+ users) employs a multi-armed bandit reinforcement learning algorithm (Birdbrain) to optimize lesson sequencing based on spaced repetition principles and individual error patterns. GPT-4 integration (2024) powers "Explain My Answer" and "Roleplay" features with LLM-generated grammatical explanations and unscripted conversational practice in 40+ languages.', src: 'Duolingo Research (2024-2025) -- Birdbrain algorithm / Duolingo Max with GPT-4' }
    ],
    ps: [
      { title: 'A systematic review of AI-driven intelligent tutoring systems in language education', type: 'academic_paper', year: 2025, inst: 'Nature NPJ Science of Learning', doi: '10.1038/s41539-025-00320-7', url: 'https://www.nature.com/articles/s41539-025-00320-7' },
      { title: 'Artificial Intelligence for Language Learning: A Systematic Review of Approaches, Roles, and Outcomes', type: 'academic_paper', year: 2025, inst: 'International Journal of Applied Linguistics (Wiley)', doi: '10.1111/ijal.70034', url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/ijal.70034' }
    ],
    gaps: [
      'Long-term longitudinal studies measuring AI language tutor effectiveness beyond 6-month timeframes',
      'AI support for less-commonly-taught languages (LCTLs) where training data is scarce'
    ],
    body: `## TL;DR
AI is transforming how we learn languages -- from Duolingo's adaptive algorithms that personalize every lesson to AI speech coaches that provide real-time pronunciation feedback, to LLMs that engage learners in unscripted conversations in their target language. Modern AI language tutors combine cognitive science (spaced repetition, interleaved practice) with natural language processing to create learning experiences that adapt to each learner's pace and needs.

## Core Explanation
AI for language learning operates on four levels: (1) Adaptive content delivery -- algorithms (Bayesian knowledge tracing, multi-armed bandits, deep knowledge tracing) model each learner's knowledge state to select the optimal next exercise. Spaced repetition algorithms schedule review of vocabulary and grammar to maximize long-term retention; (2) Automated speech assessment -- deep learning evaluates pronunciation, fluency, prosody, and intonation, providing real-time feedback on specific phonemes and word stress. Models fine-tuned for L2 speech assessment achieve human-level pronunciation scoring reliability; (3) Automated writing evaluation -- LLMs provide grammatical error correction, style suggestions, and coherence feedback on learner essays; (4) Conversational AI practice -- LLM-powered chatbots engage learners in open-ended conversations with adaptive difficulty, providing a low-anxiety practice environment.

## Detailed Analysis
The Nature NPJ 2025 review found: (1) AI-assisted pronunciation training produces large improvements (d=1.06) in segmental accuracy; (2) AI writing feedback is as effective as human feedback for grammatical accuracy but less effective for rhetorical and discourse-level feedback; (3) AI conversational agents reduce foreign language anxiety and increase willingness to communicate. Duolingo's Birdbrain system uses a multi-armed bandit formulation where each "arm" is a candidate exercise and the "reward" combines immediate performance with predicted long-term retention via half-life regression. GPT-4 integration enables detailed grammatical explanations after exercises and unscripted role-play conversations. Key challenges: most studies assess short-term gains without long-term evidence; most AI tools support only major languages (English, Spanish, French, German, Japanese); and many tools lack pedagogical grounding from applied linguists. Companies: Duolingo, Speak.com (OpenAI-backed), Elsa Speak, Busuu, and Babbel all integrate AI for personalization and assessment.

## Further Reading
- Duolingo Research Blog / Birdbrain spaced repetition algorithm
- Speak.com: AI-powered spoken English tutor
- Elsa Speak: Deep learning pronunciation coach`
  }
];

let created = 0;
for (const a of articles) {
  const filePath = path.join(CONTENT, a.cat, a.id + '.md');

  const lines = [];

  // Frontmatter
  lines.push('---');
  lines.push('id: "' + a.id + '"');
  lines.push('title: "' + esc(a.title) + '"');
  lines.push('schema_type: "article"');
  lines.push('category: "' + a.cat + '"');
  lines.push('language: "en"');
  lines.push('confidence: "high"');
  lines.push('last_verified: "' + TODAY + '"');
  lines.push('created_date: "' + TODAY + '"');
  lines.push('generation_method: "ai_assisted"');
  lines.push('ai_models: ["claude-4.5-sonnet"]');
  lines.push('derived_from_human_seed: true');
  lines.push('conflict_of_interest: "none_declared"');
  lines.push('is_live_document: false');
  lines.push('data_period: "static"');
  lines.push('completeness: 0.85');
  lines.push('');

  // Atomic facts
  lines.push('atomic_facts:');
  for (let i = 0; i < a.facts.length; i++) {
    const f = a.facts[i];
    lines.push('  - id: "af-' + a.id + '-' + (i + 1) + '"');
    lines.push('    statement: "' + esc(f.stmt) + '"');
    lines.push('    source_title: "' + esc(f.src) + '"');
    const si = Math.min(i, a.ps.length - 1);
    lines.push('    source_url: "' + esc(a.ps[si].url) + '"');
    lines.push('    confidence: "high"');
  }
  lines.push('');

  // Primary sources
  lines.push('primary_sources:');
  for (let i = 0; i < a.ps.length; i++) {
    const s = a.ps[i];
    lines.push('  - id: "ps-' + a.id + '-' + (i + 1) + '"');
    lines.push('    title: "' + esc(s.title) + '"');
    lines.push('    type: "' + s.type + '"');
    lines.push('    year: ' + s.year);
    lines.push('    institution: "' + s.inst + '"');
    if (s.doi) lines.push('    doi: "' + s.doi + '"');
    lines.push('    url: "' + s.url + '"');
  }
  lines.push('');

  // Known gaps
  lines.push('known_gaps:');
  for (const g of a.gaps) {
    lines.push('  - "' + esc(g) + '"');
  }
  lines.push('');

  // Disputed
  lines.push('disputed_statements: []');
  lines.push('---');
  lines.push('');

  // Body
  for (const line of a.body.split('\n')) {
    lines.push(line);
  }
  lines.push('');

  fs.writeFileSync(filePath, lines.join('\r\n'), 'utf8');
  created++;
  console.log('CREATED: ' + a.id);
}

console.log('\n=== Sprint 26: ' + created + ' articles created ===');
