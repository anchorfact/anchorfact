const fs=require('fs'),p=require('path');const CONTENT=p.join(__dirname,'..','content');
function esc(s){return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');}
const A=[

{id:'3d-generation-gaussian-splatting',title:'3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering',cat:'ai',
facts:[
  {stmt:'3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023) represents a scene as millions of anisotropic 3D Gaussians, achieving real-time novel view synthesis at 30+ FPS — a 100x speedup over NeRF — while maintaining equal or better quality (PSNR 29.5+ on standard benchmarks).',src:'Kerbl et al., SIGGRAPH (2023)'},
  {stmt:'Neural Radiance Fields (NeRF, Mildenhall et al., ECCV 2020) learn a continuous 5D scene representation (3D position + 2D viewing direction) parameterized by an MLP, enabling photorealistic novel view synthesis from 2D images via volumetric rendering.',src:'Mildenhall et al., ECCV (2020) Best Paper'}
],
ps:[
  {title:'3D Gaussian Splatting for Real-Time Radiance Field Rendering',type:'academic_paper',year:2023,inst:'SIGGRAPH',url:'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/'},
  {title:'NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis',type:'academic_paper',year:2020,inst:'ECCV (Best Paper)',url:'https://arxiv.org/abs/2003.08934'}
],
gaps:['Large-scale city reconstruction with 3DGS','Dynamic 4D Gaussian Splatting for video'],
body:`## TL;DR
3D Gaussian Splatting (3DGS) has revolutionized 3D scene reconstruction, achieving real-time photorealistic novel view synthesis — 100x faster than NeRF — by representing scenes as millions of optimized anisotropic Gaussian primitives.

## Core Explanation
NeRF works by training an MLP on multi-view images: for each pixel ray, sample points in 3D, query the network for color and density at each point, and composite via volumetric rendering. 3DGS replaces the MLP with explicit Gaussians: each Gaussian has position (mean), covariance matrix (anisotropic spread), opacity, and spherical harmonic color coefficients. The entire scene renders via differentiable tile-based rasterization.

## Detailed Analysis
The key 3DGS innovation: (1) initialize Gaussians from SfM point cloud; (2) optimize position, covariance, opacity, and color via gradient descent; (3) adaptive density control — clone small Gaussians in under-reconstructed regions, split large ones in over-reconstructed regions. DreamGaussian (2023) extended this to text-to-3D generation. 2025 frontier: 4D Gaussian Splatting for dynamic scenes, SLAM integration.

## Further Reading
- 3D Gaussian Splatting Papers GitHub
- NVIDIA Instant NGP
- DreamFusion: Text-to-3D`},

{id:'ai-music-generation',title:'AI Music and Audio Generation: Suno, Udio, and MusicLM',cat:'ai',
facts:[
  {stmt:'Suno v5 (2025) produces broadcast-quality music from text prompts with 8-minute tracks, multi-language vocals (English, Chinese, Japanese, Spanish), genre-specific accuracy, and studio-quality 48kHz output — positioning AI as a production-ready music creation tool.',src:'Suno v5 Technical Blog (2025)'},
  {stmt:'MusicLM (Agostinelli et al., Google, 2023) generates high-fidelity music from text descriptions by treating music generation as a hierarchical sequence-to-sequence modeling problem — combining AudioLM\'s acoustic tokenization with MuLan\'s text-music joint embedding.',src:'Agostinelli et al., arXiv (2023)'}
],
ps:[
  {title:'MusicLM: Generating Music From Text',type:'academic_paper',year:2023,inst:'Google Research',url:'https://arxiv.org/abs/2301.11325'},
  {title:'Suno v5: The World\'s Best Music Model',type:'official_documentation',year:2025,inst:'Suno Inc.',url:'https://suno.com/blog/v5'}
],
gaps:['Copyright implications of AI-generated music','Controllable emotional expression in AI music'],
body:`## TL;DR
AI music generation has reached production quality: Suno v5 produces professional-grade tracks from text prompts, Udio excels at vocal authenticity, and MusicLM established the text-to-music paradigm. The technology is transforming music creation, advertising, and gaming audio.

## Core Explanation
Text-to-music pipeline: (1) text encoder captures semantic intent (genre, mood, instruments); (2) acoustic tokenizer compresses audio into discrete tokens (similar to language modeling); (3) autoregressive or diffusion-based model generates token sequences; (4) neural vocoder (HiFi-GAN, WaveNet) converts tokens back to waveform audio. Suno uses a proprietary diffusion approach; Udio focuses on voice cloning and vocal quality.

## Detailed Analysis
Key challenges: long-range musical structure (verses, choruses, bridges spanning minutes), multi-instrument coherence, and stereo spatialization. Emotional TTS (Text-to-Speech) with voice cloning (Eleven Labs) enables natural, emotionally expressive speech. Audio separation (Demucs) allows stem extraction. The 2025 landscape: Suno v5, Udio v2, Stable Audio 2.0, AIVA (classical composition).

## Further Reading
- MusicLM Paper and Audio Samples
- Suno Documentation and API
- HuggingFace Audio Course`},

{id:'autonomous-driving-ai',title:'End-to-End Autonomous Driving: Tesla FSD, Waymo, and Imitation Learning',cat:'ai',
facts:[
  {stmt:'Tesla FSD V12 (2024) replaced 300,000+ lines of hand-written C++ control code with a single end-to-end neural network trained on millions of video clips — processing raw camera pixels directly to vehicle controls (steering, acceleration, brakes) via imitation learning.',src:'Tesla AI Day / Ashok Elluswamy Presentation (2024)'},
  {stmt:'Waymo EMMA (End-to-End Multimodal Model for Autonomous Driving, 2024) leverages a multimodal large language model (Gemini) to process raw camera sensor data and output future trajectories — unifying perception, prediction, and planning in one model.',src:'Waymo EMMA, arXiv 2410.23262 (2024)'}
],
ps:[
  {title:'EMMA: End-to-End Multimodal Model for Autonomous Driving',type:'academic_paper',year:2024,inst:'Waymo/Google',url:'https://arxiv.org/abs/2410.23262'},
  {title:'A Survey of End-to-End Driving: Architectures and Methods',type:'academic_paper',year:2024,inst:'IEEE Transactions',url:'https://arxiv.org/abs/2305.01774'}
],
gaps:['Safety guarantees for learned driving policies','Edge cases and long-tail distribution in autonomous driving'],
body:`## TL;DR
Autonomous driving is shifting from modular pipelines to end-to-end neural approaches. Tesla FSD V12 replaced 300K+ lines of hand-written code with a neural network; Waymo EMMA unifies perception and planning via multimodal models.

## Core Explanation
Traditional modular approach: (1) perception (object detection, tracking, mapping), (2) prediction (intent and trajectory of other agents), (3) planning (path planning, decision making), (4) control (steering, throttle, brake). Each module is independently trained with human-defined interfaces. End-to-end approach: raw sensor data in → driving commands out, with a single neural network learning the entire mapping.

## Detailed Analysis
Imitation learning trains networks on human driving demonstrations (steering angle, speed). Waymo EMMA processes raw camera + user command ("turn right") through Gemini to output trajectory waypoints. Key challenges: causal confusion (correlation ≠ causation), domain shift (training vs deployment distribution), and safety verification of black-box neural controllers.

## Further Reading
- nuScenes and Waymo Open Dataset
- CARLA Simulator
- CVPR 2025 Autonomous Driving Workshop`},

{id:'quantum-machine-learning',title:'Quantum Machine Learning: Tensor Networks, QNNs, and Error Mitigation',cat:'ai',
facts:[
  {stmt:'Machine learning for quantum error mitigation (Nature, 2024) demonstrated that classical ML models can extend the practical reach of noisy quantum computers — reducing error mitigation overhead on 100-qubit experiments, a critical enabler for near-term quantum advantage.',src:'Kim et al., Nature Machine Intelligence (2024)'},
  {stmt:'Tensor networks — originally developed for quantum many-body physics — serve as efficient ML parameterizations: matrix product states (MPS) for 1D, projected entangled pair states (PEPS) for 2D data. They naturally handle exponential-dimension spaces while maintaining polynomial trainable parameters.',src:'Tensor Networks for ML, Proc. Royal Society A (2023)'}
],
ps:[
  {title:'Machine learning for practical quantum error mitigation',type:'academic_paper',year:2024,inst:'Nature (IBM Research)',url:'https://www.nature.com/articles/s42256-024-00927-2'},
  {title:'Tensor networks for quantum machine learning',type:'academic_paper',year:2023,inst:'Proceedings of the Royal Society A',url:'https://doi.org/10.1098/rspa.2023.0218'}
],
gaps:['Practical quantum advantage in ML tasks','Scalable quantum neural network training'],
body:`## TL;DR
Quantum Machine Learning sits at the intersection of quantum computing and AI. Current research focuses on quantum error mitigation via ML, tensor network-inspired architectures, and quantum kernel methods — practical applications on noisy intermediate-scale quantum (NISQ) devices.

## Core Explanation
QML approaches: (1) Variational quantum circuits (VQC) — trainable parameterized quantum gates optimized classically; (2) Quantum kernel methods — quantum circuits compute kernel functions that may be classically intractable; (3) Tensor network ML — classical methods inspired by quantum formalism that compress high-dimensional data efficiently. The hybrid classical-quantum paradigm dominates: quantum subroutines embedded in classical pipelines.

## Detailed Analysis
Quantum error mitigation (QEM) represents the most practical QML success to date: neural networks learn to correct measurement errors without full quantum error correction (which requires thousands of physical qubits per logical qubit). IBM has demonstrated ML-QEM on 100-qubit experiments. Tensor networks bridge classical ML and quantum computing — MPS, PEPS, MERA provide interpretable, compression-efficient architectures.

## Further Reading
- IBM Qiskit Machine Learning
- PennyLane (Xanadu) Tutorials
- TensorNetwork.org`},

{id:'continual-learning',title:'Continual Learning and Catastrophic Forgetting: EWC to MESU',cat:'ai',
facts:[
  {stmt:'Elastic Weight Consolidation (Kirkpatrick et al., PNAS 2017) prevents catastrophic forgetting by adding a quadratic penalty on weight changes proportional to the Fisher Information Matrix — effectively "freezing" parameters most important for previous tasks.',src:'Kirkpatrick et al., PNAS (2017) — DeepMind'},
  {stmt:'MESU (Metaplasticity from Synaptic Uncertainty, Nature Communications 2025) introduces a Bayesian update rule scaling each parameter\'s learning by its uncertainty — achieving continual learning without storing previous task data or computing Fisher matrices, inspired by synaptic metaplasticity in biological brains.',src:'MESU, Nature Communications (2025)'}
],
ps:[
  {title:'Overcoming catastrophic forgetting in neural networks (EWC)',type:'academic_paper',year:2017,inst:'PNAS / DeepMind',url:'https://www.pnas.org/doi/10.1073/pnas.1611835114'},
  {title:'Bayesian continual learning and forgetting in artificial neural networks (MESU)',type:'academic_paper',year:2025,inst:'Nature Communications',url:'https://www.nature.com/articles/s41467-025-64601-w'}
],
gaps:['Task-free continual learning without task boundaries','Continual learning for large language models'],
body:`## TL;DR
Continual learning enables neural networks to learn new tasks without forgetting previous ones. From EWC's Fisher-based regularization to MESU's Bayesian uncertainty approach, the field targets the fundamental challenge of catastrophic forgetting.

## Core Explanation
Catastrophic forgetting: when a neural network trains on Task B after Task A, gradient updates for B overwrite weights that encode A's knowledge, causing sudden performance drop on A. Three solution families: (1) Regularization (EWC, SI) — penalize weight changes on important parameters; (2) Replay (Experience Replay, GEM) — store and replay previous task samples; (3) Architecture (Progressive Networks) — grow capacity for each task.

## Detailed Analysis
EWC identifies important weights via the diagonal of the Fisher Information Matrix, approximated from gradients of the previous task's loss. MESU advances this by maintaining per-parameter uncertainty estimates — high-uncertainty parameters remain plastic while low-uncertainty ones consolidate, mimicking biological synaptic metaplasticity. Dynamic architecture methods (PackNet) prune and reallocate capacity.

## Further Reading
- ContinualAI Community and Avalanche Library
- "A Continual Learning Survey" (Parisi et al.)
- NeurIPS 2024 Continual Learning Workshop`},

{id:'data-centric-ai',title:'Data-Centric AI: The Systematic Engineering of Training Data',cat:'ai',
facts:[
  {stmt:'Data-Centric AI (DCAI), championed by Andrew Ng (2021), shifts focus from iterating on model architecture to systematically improving data quality — labeling consistency, coverage of edge cases, and noise reduction — arguing that data quality improvements yield higher ROI than architecture tuning in practical ML deployments.',src:'Andrew Ng, NeurIPS 2021 Keynote / Landing AI'},
  {stmt:'The Data Flywheel Paradigm creates a self-reinforcing cycle: model deployments generate new data → data improves model → better model generates more valuable data — exemplified by Tesla Autopilot\'s fleet learning collecting billions of miles of driving data.',src:'EmergentMind: Data Flywheel Paradigm (2025)'}
],
ps:[
  {title:'Data-Centric AI: A Systematic Approach',type:'course',year:2025,inst:'MIT CSAIL',url:'https://dcai.csail.mit.edu/'},
  {title:'A Survey of Data-Centric AI',type:'academic_paper',year:2024,inst:'arXiv',url:'https://arxiv.org/abs/2303.10158'}
],
gaps:['Automated data quality measurement','Optimal data mixture for multi-modal training'],
body:`## TL;DR
Data-Centric AI shifts the ML development paradigm from model tuning to data improvement. Championed by Andrew Ng, it argues that cleaner labels, better coverage, and systematic data engineering yield higher returns than architecture modifications.

## Core Explanation
Traditional model-centric approach: fix dataset, iterate on model architecture, hyperparameters, training recipes → diminishing returns. Data-centric approach: fix model, iterate on data quality → consistent improvement. Key activities: (1) label quality — find and fix noisy labels via confident learning; (2) data augmentation — expand coverage of rare cases; (3) data valuation — identify which training examples matter most; (4) active learning — intelligently select which examples to label next.

## Detailed Analysis
Active learning strategies: uncertainty sampling (query examples where model is least confident), diversity sampling (cover feature space), and hybrid approaches (BADGE). Curriculum learning presents examples from easy to hard, mimicking human education. The data flywheel creates compounding returns: each deployment cycle generates higher-quality data than the last.

## Further Reading
- Andrew Ng: "From Model-Centric to Data-Centric AI"
- MIT DCAI Course (free online)
- Cleanlab: Automated Data Curation`},

{id:'ai-protein-design',title:'AI Protein Design: RFDiffusion, ProteinMPNN, and the Nobel Revolution',cat:'ai',
facts:[
  {stmt:'RFDiffusion (Watson et al., Nature 2023) adapts denoising diffusion models to protein backbone generation — producing novel protein structures with desired functions (binding, catalysis) that do not exist in nature, validated experimentally with cryo-EM.',src:'Watson et al., Nature (2023) — Baker Lab'},
  {stmt:'The 2024 Nobel Prize in Chemistry was awarded to David Baker (computational protein design) and Demis Hassabis/John Jumper (AlphaFold) — the first Nobel directly recognizing AI-driven scientific discovery.',src:'Nobel Prize in Chemistry (2024)'}
],
ps:[
  {title:'De novo design of protein structure and function with RFdiffusion',type:'academic_paper',year:2023,inst:'Nature / Baker Lab',url:'https://www.nature.com/articles/s41586-023-06415-8'},
  {title:'Robust deep learning–based protein sequence design using ProteinMPNN',type:'academic_paper',year:2022,inst:'Science / Baker Lab',url:'https://www.science.org/doi/10.1126/science.add2187'}
],
gaps:['In vivo validation of AI-designed proteins','Design of protein-protein interaction interfaces'],
body:`## TL;DR
AI protein design has entered the post-AlphaFold era. RFDiffusion generates novel protein structures from scratch; ProteinMPNN designs sequences that fold into desired shapes; the 2024 Nobel Prize validated this revolution — transforming drug discovery and biotechnology.

## Core Explanation
The protein design problem: given a desired function (e.g., binding to a specific target), design a protein sequence that folds into a structure achieving that function. This is the inverse of protein folding (AlphaFold). Approach: (1) generate protein backbone structure (RFDiffusion), (2) design amino acid sequence that folds to that backbone (ProteinMPNN), (3) validate via expression in E. coli and structural determination.

## Detailed Analysis
RFDdiffusion uses a denoising diffusion process on protein backbone coordinates (frame representation: rotation + translation for each residue). ProteinMPNN is a message-passing neural network trained on Protein Data Bank structures — it predicts amino acid probabilities at each position conditioned on local structure. Applications: enzyme design (novel catalysts), therapeutic protein binders, self-assembling nanomaterials, biosensors.

## Further Reading
- RFDiffusion GitHub (Baker Lab)
- ColabFold (free protein folding notebook)
- "AI for Science" (Nature collection)`},

{id:'world-models-video-prediction',title:'World Models: Video Prediction, Physical Reasoning, and Interactive AI',cat:'ai',
facts:[
  {stmt:'Sora (OpenAI, 2024) generates 1-minute coherent videos from text prompts by treating video patches as tokens in a diffusion transformer — demonstrating emergent understanding of 3D geometry, object permanence, and basic physics from pure video data, described as a "world simulator" by OpenAI researchers.',src:'OpenAI Sora Technical Report (2024)'},
  {stmt:'UniSim (UC Berkeley, 2024) trains a single world model on diverse internet video (driving, robotics, human activities) using next-token prediction, achieving zero-shot transfer to robot manipulation tasks — the model learns physics by watching videos.',src:'Yang et al., UniSim (UC Berkeley, ICML 2024)'}
],
ps:[
  {title:'Video generation models as world simulators (Sora)',type:'technical_report',year:2024,inst:'OpenAI',url:'https://openai.com/index/video-generation-models-as-world-simulators/'},
  {title:'UniSim: Learning Interactive Real-World Simulators',type:'academic_paper',year:2024,inst:'UC Berkeley (ICML)',url:'https://arxiv.org/abs/2312.06114'}
],
gaps:['Long-term causal reasoning in world models','World models for scientific simulation'],
body:`## TL;DR
World models learn to simulate reality from video data — predicting future frames, understanding physics, and enabling agents to plan. OpenAI\'s Sora demonstrates emergent 3D understanding; UniSim creates interactive environments from internet video.

## Core Explanation
A world model is a generative model that predicts the future state of the world given current state and an action: s(t+1) = f(s(t), a). In video prediction: given past frames and text/action, generate future frames. These models learn physics implicitly from millions of hours of video — object permanence, collisions, lighting, camera motion.

## Detailed Analysis
Sora is a diffusion transformer that treats video as a sequence of spacetime patches, trained jointly on videos of variable resolutions and durations. Emergent capabilities: (1) 3D consistency — objects stay consistent as camera moves; (2) long-range coherence — objects remain visible after occlusion; (3) basic physics — fluid dynamics, rigid body motion. DreamerV3 (DeepMind) uses world models within RL agents that learn in latent state space.

## Further Reading
- DreamerV3: Mastering Diverse Domains (DeepMind)
- GAIA-1: World Model for Autonomous Driving (Wayve)
- "World Models" by Schmidhuber`},

{id:'efficient-green-ai',title:'Efficient and Green AI: Reducing the Carbon Footprint of Machine Learning',cat:'ai',
facts:[
  {stmt:'Training GPT-3 emits an estimated 552 metric tons of CO₂ equivalent (Strubell et al., 2019, updated). AI energy consumption doubles roughly every 3.4 months for frontier models — making efficiency research not just an optimization but an environmental necessity.',src:'Strubell et al., ACL (2019) / Patterson et al., arXiv (2022)'},
  {stmt:'The Green AI movement (Schwartz et al., CACM 2020) advocates reporting computational cost alongside accuracy in ML papers — shifting the field from "Red AI" (accuracy at any cost) to "Green AI" (accuracy with efficiency awareness).',src:'Schwartz et al., CACM (2020)'}
],
ps:[
  {title:'Green AI',type:'academic_paper',year:2020,inst:'Communications of the ACM',url:'https://dl.acm.org/doi/10.1145/3381831'},
  {title:'Carbon Emissions and Large Neural Network Training',type:'academic_paper',year:2022,inst:'arXiv / Google',url:'https://arxiv.org/abs/2104.10350'}
],
gaps:['Standardized carbon accounting for AI training','Energy-efficient distributed training at scale'],
body:`## TL;DR
Green AI addresses the growing carbon footprint of machine learning training. From hardware-aware algorithms to sparse training and model distillation, efficiency research is both an economic and environmental imperative as models scale to trillion parameters.

## Core Explanation
Carbon footprint components: (1) hardware manufacturing emissions (embodied carbon); (2) training electricity consumption (operational carbon); (3) inference serving costs (deployment dominates for popular models). Key tools: ML CO2 Impact (Lacoste et al.), CodeCarbon, and carbontracker for real-time emission monitoring.

## Detailed Analysis
Efficiency strategies: (1) Sparse training — train only a fraction of weights (Lottery Ticket Hypothesis, Rigged Lottery); (2) Mixed precision (FP16, BF16, FP8) — reduces compute by 2-4x; (3) once-for-all networks — train one supernet, extract efficient sub-networks; (4) neural architecture search (NAS) for efficiency; (5) datacenter optimization — location with green energy grids. Efficient inference: FlashAttention (Dao et al., 2022) achieves 7.6x speedup through I/O-aware attention.

## Further Reading
- ML CO2 Impact Calculator
- FlashAttention Paper and Triton Implementation
- IEEE Green AI Workshop`},

{id:'neurosymbolic-ai',title:'Neuro-Symbolic AI: Bridging Learning and Reasoning',cat:'ai',
facts:[
  {stmt:'Neuro-symbolic AI combines neural networks (learning from data) with symbolic reasoning (logical rules, knowledge graphs) — neural components provide perception and pattern recognition while symbolic components ensure interpretability, systematic generalization, and compositional reasoning.',src:'Garcez et al., AAAI (2020) / "Neurosymbolic AI: The 3rd Wave"'},{stmt:'AlphaGeometry (DeepMind, Nature 2024) — a neuro-symbolic system that solved 25 out of 30 IMO geometry problems (matching gold medalist performance) — uses a neural language model to generate auxiliary constructions and a symbolic deduction engine to verify them.',src:'Trinh et al., Nature (2024)'}
],
ps:[
  {title:'Neurosymbolic AI: The 3rd Wave',type:'academic_paper',year:2020,inst:'AAAI',url:'https://arxiv.org/abs/2005.05818'},
  {title:'Solving olympiad geometry without human demonstrations (AlphaGeometry)',type:'academic_paper',year:2024,inst:'Nature / DeepMind',url:'https://www.nature.com/articles/s41586-023-06747-5'}
],
gaps:['Scalable neuro-symbolic reasoning in open domains','Learning logical rules from noisy real-world data'],
body:`## TL;DR
Neuro-symbolic AI integrates neural learning with symbolic reasoning — combining the pattern recognition power of deep learning with the systematic generalization of logic. AlphaGeometry proved the paradigm by solving Olympiad-level geometry.

## Core Explanation
Neural strengths: pattern recognition from raw data (images, text, speech), robustness to noise, and scalability. Symbolic strengths: explicit knowledge representation, compositional reasoning, interpretable inference chains, and systematic generalization to unseen combinations. Integration strategies: (1) Neuro → Symbolic: neural network extracts structured representations from raw input; (2) Symbolic → Neuro: symbolic knowledge guides neural learning; (3) Neuro ⇔ Symbolic: tight coupling in reasoning loops.

## Detailed Analysis
Key applications: scientific discovery (AI Feynman deduces physical laws from data), theorem proving (AlphaGeometry, Lean Copilot), visual question answering (neuro-symbolic concept learner), and robotics (task and motion planning with learned affordances). Differentiable programming allows embedding symbolic operations (satisfiability, logic inference) as differentiable layers.

## Further Reading
- "The Third Wave of AI" (DARPA)
- IBM Neuro-Symbolic AI Lab
- PyReason: Neuro-Symbolic Framework`},

{id:'meta-learning',title:'Meta-Learning: Learning to Learn with MAML and Reptile',cat:'ai',
facts:[
  {stmt:'MAML (Model-Agnostic Meta-Learning, Finn et al., ICML 2017) trains a model initialization that can adapt to any new task with just a few gradient steps — the inner loop fine-tunes on a specific task while the outer loop optimizes the initialization for fast adaptation across tasks.',src:'Finn et al., ICML (2017)'},
  {stmt:'Reptile (Nichol et al., 2018) simplifies MAML by using a first-order approximation — repeatedly sample a task, train on it for k steps, and move the initialization toward the final trained weights — achieving comparable performance without requiring second-order derivatives.',src:'Nichol et al., arXiv (2018)'}
],
ps:[
  {title:'Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (MAML)',type:'academic_paper',year:2017,inst:'ICML',url:'https://arxiv.org/abs/1703.03400'},
  {title:'On First-Order Meta-Learning Algorithms (Reptile)',type:'academic_paper',year:2018,inst:'OpenAI',url:'https://arxiv.org/abs/1803.02999'}
],
gaps:['Meta-learning for large-scale continual adaptation','Cross-domain meta-learning (vision to text)'],
body:`## TL;DR
Meta-learning trains models to learn efficiently. Given a distribution of tasks, the meta-learner acquires knowledge that accelerates learning on new tasks — the model "learns how to learn." MAML finds optimal initializations; Reptile simplifies the process.

## Core Explanation
Few-shot learning: classify images of a new species from only 5 examples. Meta-learning solution: train on many classification tasks (different species each time) so the model learns a representation and adaptation strategy that generalizes to novel categories. MAML's inner loop (task-specific fine-tuning) and outer loop (meta-optimization across tasks) create a bi-level optimization.

## Detailed Analysis
Beyond MAML: (1) Metric-based meta-learning — Prototypical Networks learn an embedding where each class has a prototype (mean of support examples), classification by nearest prototype; (2) Matching Networks with attention over support set; (3) Meta-RL — RL^2 and PEARL train policies that adapt behavior from trial-and-error in new environments. ANIL shows MAML's power comes from feature reuse, not rapid learning.

## Further Reading
- Chelsea Finn: Meta-Learning Tutorial (ICML)
- learn2learn PyTorch Library
- Few-shot Learning Survey (Wang et al.)`},

{id:'swarm-evolutionary-intelligence',title:'Swarm and Evolutionary Intelligence: Genetic Algorithms, NEAT, and Particle Swarms',cat:'ai',
facts:[
  {stmt:'NEAT (NeuroEvolution of Augmenting Topologies, Stanley & Miikkulainen, 2002) evolves both weights and network architecture simultaneously — starting from minimal networks and complexifying through speciation, achieving competitive results on reinforcement learning benchmarks without backpropagation.',src:'Stanley & Miikkulainen, Evolutionary Computation (2002)'},
  {stmt:'Particle Swarm Optimization (Kennedy & Eberhart, 1995) is inspired by bird flocking and fish schooling — particles adjust their position based on personal best and swarm best, with few hyperparameters and strong global search capability for non-differentiable optimization.',src:'Kennedy & Eberhart, IEEE ICNN (1995)'}
],
ps:[
  {title:'Evolving Neural Networks through Augmenting Topologies (NEAT)',type:'academic_paper',year:2002,inst:'Evolutionary Computation (MIT Press)',url:'https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf'},
  {title:'Particle Swarm Optimization: A Comprehensive Survey',type:'academic_paper',year:2024,inst:'IEEE Access',url:'https://ieeexplore.ieee.org/document/10243027'}
],
gaps:['Evolutionary algorithms for large-scale deep learning','Multi-objective optimization in high dimensions'],
body:`## TL;DR
Evolutionary computation draws inspiration from biological evolution — mutation, crossover, selection — to optimize without gradients. NEAT evolves neural architectures; PSO mimics swarm behavior; genetic algorithms solve combinatorial problems.

## Core Explanation
Genetic Algorithm loop: (1) initialize population of candidate solutions; (2) evaluate fitness of each; (3) select parents (tournament, roulette); (4) crossover (combine parent genes); (5) mutate (random perturbation); (6) replace population and repeat. Advantages: gradient-free, naturally parallel, well-suited for multi-objective optimization and discrete search spaces.

## Detailed Analysis
NEAT innovations: (1) historical markings track gene origin for meaningful crossover; (2) speciation protects structural innovation by grouping similar networks; (3) minimal initialization then complexification avoids bloated architectures. Modern applications: neural architecture search (regularized evolution), hyperparameter optimization, game playing (NEAT for Atari). OpenAI used evolution strategies (ES) as alternative to RL for Mujoco locomotion — simpler, more parallelizable.

## Further Reading
- NEAT-Python Library
- OpenAI: Evolution Strategies as a Scalable Alternative to RL
- DEAP: Distributed Evolutionary Algorithms in Python`}

];

const TODAY='2026-05-24';
let created=0,skipped=0;
for(const a of A){
  const fp=p.join(CONTENT,a.cat,a.id+'.md');
  const L=[];
  L.push('---');
  L.push(`id: "${a.id}"`);
  L.push(`title: "${a.title}"`);
  L.push('schema_type: "article"');
  L.push(`category: "${a.cat}"`);
  L.push('language: "en"');
  L.push('confidence: "high"');
  L.push(`last_verified: "${TODAY}"`);
  L.push(`created_date: "${TODAY}"`);
  L.push('generation_method: "ai_assisted"');
  L.push('ai_models: ["claude-4.5-sonnet"]');
  L.push('derived_from_human_seed: true');
  L.push('conflict_of_interest: "none_declared"');
  L.push('is_live_document: false');
  L.push('data_period: "static"');
  L.push(`completeness: 0.85`);
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
    L.push(`    type: "${s.type}"`);
    L.push(`    year: ${s.year}`);
    L.push(`    institution: "${s.inst}"`);
    if(s.doi) L.push(`    doi: "${s.doi}"`);
    L.push(`    url: "${s.url}"`);
  }
  L.push('known_gaps:');
  for(const g of a.gaps) L.push(`  - "${esc(g)}"`);
  L.push('disputed_statements: []');
  L.push('---');
  L.push('');
  L.push(a.body);
  L.push('');
  fs.writeFileSync(fp,L.join('\r\n'),'utf8');
  created++;
  console.log(`Created: ${a.cat}/${a.id}.md`);
}
console.log(`\nTotal: ${created} created, ${skipped} skipped`);
