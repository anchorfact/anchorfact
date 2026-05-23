const fs=require('fs'),p=require('path');const CONTENT=p.join(__dirname,'..','content');
function esc(s){return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');}
const A=[

{id:'affective-computing',title:'Affective Computing: Multimodal Emotion Recognition, Sentiment Analysis, and Empathetic AI',cat:'ai',
facts:[
  {stmt:'IEEE (November 2025) published a comprehensive survey of multimodal emotion recognition covering four modalities — speech, facial expressions, physiological signals (EEG, ECG), and text — documenting that transformer-based cross-modal fusion architectures achieve 8-15% higher accuracy than unimodal baselines, with the MemoCMT model (Nature 2025) demonstrating cross-modal transformer attention to resolve modality conflicts (e.g., smiling face + angry voice).',src:'IEEE (2025) — Multimodal Emotion Recognition: A Comprehensive Survey / Nature (2025) — MemoCMT: Cross-modal transformer — doi:10.1038/s41598-025-89202-x'},
  {stmt:'ScienceDirect (October 2025) introduced EmoVerse — a framework enhancing multimodal LLMs for affective computing with a multitask dataset (AMT) supporting sentiment analysis, emotion recognition, and emotion cause detection — demonstrating that LLMs fine-tuned with affective reasoning prompts achieve human-level performance on dimensional emotion prediction (valence, arousal, dominance) and outperform task-specific models by 6-10% on emotion cause identification.',src:'ScienceDirect Neurocomputing (2025) — EmoVerse: Enhancing MLLMs for Affective Computing — doi:10.1016/j.neucom.2025.129953'}
],
ps:[
  {title:'Multimodal Emotion Recognition: A Comprehensive Survey of Methods, Modalities, and Applications',type:'academic_paper',year:2025,inst:'IEEE Access / ACM',url:'https://ieeexplore.ieee.org/document/11264591'},
  {title:'MemoCMT: multimodal emotion recognition using cross-modal transformer',type:'academic_paper',year:2025,inst:'Nature Scientific Reports',doi:'10.1038/s41598-025-89202-x',url:'https://www.nature.com/articles/s41598-025-89202-x'}
],
gaps:['Cultural variation in emotional expression — models trained on Western data fail on non-Western cultures','Continuous emotion tracking over long conversations (not just per-utterance classification)'],
body:`## TL;DR
Affective computing gives AI emotional intelligence — recognizing human emotions from voice, face, text, and physiology, and responding empathetically. From mental health monitoring to customer service and autonomous driving (detecting driver stress), emotion-aware AI is transitioning from academic research to production deployment.

## Core Explanation
Emotion models: (1) Categorical — emotions are discrete (Ekman's six: happiness, sadness, anger, fear, disgust, surprise) plus neutral. Used in most classification benchmarks; (2) Dimensional — emotions vary continuously along valence (positive-negative), arousal (calm-excited), and dominance (controlled-submissive). Captures nuanced states (nostalgia, frustration) that categorical models miss. Modalities: (A) Facial expression — CNNs/Vision Transformers process face images/video, detecting Action Units (AU) from Facial Action Coding System (FACS). Landmark detection → expression classification; (B) Speech — prosody (pitch, energy, rate), spectral features (MFCCs, spectrograms) processed by CNNs/LSTMs/Transformers. Cross-lingual emotion in speech is particularly challenging; (C) Text — sentiment analysis via fine-tuned transformers (BERT, RoBERTa, emotion-specific models); (D) Physiological — EEG (brain), ECG (heart rate variability), GSR (skin conductance), providing ground-truth emotional signals not subject to social masking.

## Detailed Analysis
Multimodal fusion strategies: (E) Early fusion — concatenate all modality features before classification; (L) Late fusion — classify each modality independently, ensemble predictions; (H) Hybrid/cross-modal — attention mechanisms learn which modality to trust when modalities conflict. MemoCMT (Nature 2025): cross-modal transformer processes speech and facial features simultaneously, learning to attend to the facial stream when speech is ambiguous and vice versa. Achieves 82% accuracy on IEMOCAP (4-class emotion), improving 8% over best unimodal. EmoVerse (ScienceDirect 2025): extends multimodal LLMs (LLaVA, GPT-4V) with affective reasoning — the model generates not just emotion labels but explanations ("The person appears sad because their speech rate slowed and they mentioned loss"). Applications: (1) Mental health — detecting depression/anxiety from speech and text patterns; (2) Education — detecting confusion and engagement in online learning; (3) Automotive — driver emotion/stress monitoring for safety; (4) Customer service — real-time agent coaching based on customer emotion; (5) Social robotics — empathetic response generation. Key challenge: cultural variability — a smile means different things across cultures; training data is overwhelmingly Western (IEMOCAP, RAVDESS are English-only). The 2025 IEEE survey calls for culturally-diverse benchmarks.

## Further Reading
- IEMOCAP, RAVDESS, MELD Emotion Datasets
- Dimensional Emotion Model (Russell's Circumplex)
- OpenFace: Facial Action Unit Detection`},

{id:'visual-question-answering',title:'Visual Question Answering: Vision-Language Models for Image Understanding and Reasoning',cat:'ai',
facts:[
  {stmt:'ACM Computing Surveys (2025) published a comprehensive review of VQA methods — tracing the evolution from CNN+LSTM architectures (2015-2018) to transformer-based vision-language models (ViLBERT, LXMERT, 2019-2021) to large multimodal models (GPT-4V, LLaVA, 2023-present) — finding that current LLM-based VQA systems achieve 82-88% accuracy on VQA v2 but only 45-55% on visual reasoning benchmarks (GQA, NLVR2) requiring compositional reasoning, spatial relationships, and counting.',src:'ACM Computing Surveys (2025) — Visual Question Answering: A Survey of Methods, Datasets, and Future Directions — doi:10.1145/3728635'},
  {stmt:'ScienceDirect Neurocomputing (2025) and IEEE (2025) established VQA as a core multimodal AI benchmark — covering four question types: object recognition ("what animal?"), spatial reasoning ("is the cup to the left of the plate?"), counting ("how many people?"), and commonsense reasoning ("why is the person running?") — with the frontier being VoQA (Visual-only QA) where models must answer questions purely from visual input without language in the training loop.',src:'ScienceDirect Neurocomputing (2025) — VQA and Visual Reasoning overview / IEEE (2025) — VQA In-Depth Analysis'}
],
ps:[
  {title:'Visual Question Answering: A Survey of Methods, Datasets, and Future Directions',type:'academic_paper',year:2025,inst:'ACM Computing Surveys',doi:'10.1145/3728635',url:'https://dl.acm.org/doi/full/10.1145/3728635'},
  {title:'VQA and Visual Reasoning: An Overview of Approaches, Datasets, and Future Challenges',type:'academic_paper',year:2025,inst:'Neurocomputing / Elsevier',url:'https://www.sciencedirect.com/science/article/pii/S0925231225000177'}
],
gaps:['Knowledge-based VQA requiring external knowledge beyond image content','Bias mitigation — VQA models exploit dataset biases (e.g., answering "tennis" whenever "racket" appears)'],
body:`## TL;DR
Visual Question Answering (VQA) tests whether AI truly understands images — given a photo and a natural language question, the model must provide the correct answer. This requires integrating computer vision (what objects are present, their spatial relationships) with language understanding (parsing the question, reasoning about its intent). VQA is the quintessential multimodal AI benchmark.

## Core Explanation
VQA pipeline: Image → visual encoder (CNN → ViT/CLIP) → visual features. Question → language encoder (LSTM → Transformer) → text features. Fusion → cross-modal attention between visual and linguistic representations → answer decoder (classification over frequent answers or generative). Architecture evolution: (1) CNN+LSTM — CNN encodes image to feature vector, LSTM encodes question, concatenate → MLP predicts answer (simple, struggles with spatial reasoning); (2) Bottom-up top-down attention (Anderson et al., 2018) — detect object regions (Faster R-CNN), attend to question-relevant regions; (3) Vision-Language pretrained models — ViLBERT, LXMERT, UNITER pretrain on image-text pairs with masked modeling and image-text matching; (4) Large multimodal models — GPT-4V, LLaVA, Gemini process interleaved image+text tokens, generating free-form answers.

## Detailed Analysis
VQA v2 dataset: 1.1M questions on 200K COCO images, balanced to remove language priors (for every image, each question has a complementary image with a different answer). Key finding: naive models achieve 54% by answering "yes" to "is there a...?" questions; the balanced dataset forces visual grounding. GQA: compositional questions requiring multi-step reasoning ("is the red object to the left of the blue cube made of metal?"). ScienceDirect 2025 overview identifies four reasoning types: (1) Object recognition — straightforward (SOTA: 95%+); (2) Spatial — above/below/left/right (SOTA: 65-75%); (3) Counting — how many objects (SOTA: 55-65%); (4) Commonsense — "why is this person wearing a helmet?" requires world knowledge (SOTA: 50-60%). VoQA (arxiv 2025): reformulates VQA as pure visual reasoning — the model receives only the image (no question text) and must infer what question is being asked from visual context, then answer it. This tests whether the model truly understands the scene or just pattern-matches question-answer pairs. Key limitations: (A) Language bias — models exploit spurious correlations in training data; (B) Knowledge grounding — questions like "what material is this building?" require knowledge not in the image; (C) Medical/domain-specific VQA requires specialized training.

## Further Reading
- VQA v2 Dataset: visualqa.org
- LLaVA: Large Language and Vision Assistant
- GQA: Compositional Visual Reasoning Benchmark`},

{id:'ai-for-agriculture',title:'AI for Agriculture: Precision Farming, Plant Disease Detection, and Crop Yield Prediction',cat:'ai',
facts:[
  {stmt:'Nature Scientific Reports (July 2025) demonstrated a hybrid Transformer-CNN architecture for plant disease detection — combining Vision Transformer global context with CNN local texture features — achieving 96.8% accuracy across 38 crop-disease classes from the PlantVillage dataset, and deploying the model on edge devices (Jetson Nano) for real-time in-field diagnosis, reducing the need for expert agronomist consultation by enabling farmers to photograph leaves and receive instant diagnosis.',src:'Nature Scientific Reports (2025) — Hybrid Transformer-CNN for plant disease detection — doi:10.1038/s41598-025-10537-6'},
  {stmt:'ScienceDirect (December 2025) published a systematic review of AI methodologies for precision agriculture — analyzing 150+ papers — documenting that deep learning-based crop disease detection achieves 90-97% accuracy, UAV-based multispectral imaging combined with CNNs enables early disease detection 7-14 days before visible symptoms, and multimodal approaches (satellite + drone + soil sensors) improve yield prediction accuracy by 15-25% over single-source methods.',src:'ScienceDirect Artificial Intelligence in Agriculture (2025) — Precision agriculture in the age of AI — doi:10.1016/j.aiia.2025.11.001'}
],
ps:[
  {title:'AI-driven smart agriculture using hybrid Transformer-CNN for high-precision plant disease detection',type:'academic_paper',year:2025,inst:'Nature Scientific Reports',doi:'10.1038/s41598-025-10537-6',url:'https://www.nature.com/articles/s41598-025-10537-6'},
  {title:'Precision agriculture in the age of AI: A systematic review of crop disease detection methodologies',type:'academic_paper',year:2025,inst:'Artificial Intelligence in Agriculture / Elsevier',url:'https://www.sciencedirect.com/science/article/pii/S2772375525007221'}
],
gaps:['Generalization across crop varieties, geographic regions, and lighting conditions','Integration of AI recommendations with farmers decision processes'],
body:`## TL;DR
AI is feeding the world — detecting crop diseases from smartphone photos, predicting harvest yields months in advance from satellite imagery, and optimizing irrigation down to individual plants. With global food demand projected to increase 60% by 2050 and 20-40% of crops lost to pests and diseases annually, AI-driven precision agriculture is becoming essential to food security.

## Core Explanation
Precision agriculture AI stack: (1) Sensing — satellites (Sentinel-2, Landsat, PlanetScope at 3-30m resolution), UAVs/drones (sub-cm resolution with multispectral cameras), ground sensors (soil moisture, weather stations), and smartphones (farmer-taken photos); (2) Crop disease detection — CNNs/Vision Transformers classify leaf images into healthy vs. specific disease (late blight, rust, bacterial spot). Training data: PlantVillage (54K images, 38 classes), PlantDoc, IP102 (102 pest classes); (3) Yield prediction — time-series models (LSTM, TFT) process multi-year satellite vegetation indices (NDVI, EVI), weather data (temperature, precipitation), and soil properties to predict crop yield 1-3 months before harvest; (4) Weed detection — CNN-based pixel-level weed/crop classification for precision herbicide spraying (reducing chemical use by 70-90%).

## Detailed Analysis
Nature 2025 Hybrid Transformer-CNN: the Vision Transformer branch captures global leaf structure (disease patterns often span the entire leaf), while the CNN branch captures local texture (lesion boundaries, color variations). Cross-attention fuses both. Deployed on Jetson Nano (edge device) for offline in-field use — critical for rural areas without internet. Springer 2025 DL plant disease review: transfer learning from ImageNet-pretrained models works well for disease classification because visual disease patterns (spots, discoloration) share features with general image textures. Challenges: (1) Domain shift — models trained on lab-condition PlantVillage images (uniform background, controlled lighting) degrade significantly on in-field photos (complex backgrounds, variable lighting, multiple diseases per leaf) — by 15-30% accuracy drop; (2) Early detection — infections are asymptomatic for days before visible symptoms; multispectral/hyperspectral imaging detects pre-visual changes in chlorophyll fluorescence; (3) Data scarcity for rare diseases and regional crop varieties. ScienceDirect 2025 review highlights IoT integration: soil sensors → cloud → AI → variable-rate irrigation/fertilization, closing the loop from sensing to action. UAV-mounted multispectral cameras (NIR, RedEdge) combined with 3D canopy reconstruction from photogrammetry enable per-plant monitoring. Economic impact: AI precision agriculture reduces water usage by 20-30%, fertilizer by 15-25%, and pesticide by 50-70%.

## Further Reading
- PlantVillage: Public Crop Disease Dataset (Penn State)
- FAO: AI for Agriculture (UN Food and Agriculture Organization)
- Microsoft FarmBeats: AI + IoT for Data-Driven Farming`},

{id:'ai-for-wildlife-conservation',title:'AI for Wildlife Conservation: Camera Trap Analysis, Species Classification, and Biodiversity Monitoring',cat:'ai',
facts:[
  {stmt:'Nature Scientific Reports (May 2025) identified key challenges in AI-based animal detection from camera trap images — class imbalance (empty images dominate 60-80% of captures), fine-grained species similarity (distinguishing jaguars from leopards, or 50+ bird species), and domain shift across geographic locations — and demonstrated that ensemble deep learning with hard negative mining and test-time augmentation improves detection F1 by 12-18% over standard fine-tuned CNNs on the Snapshot Serengeti and iWildCam benchmarks.',src:'Nature Scientific Reports (2025) — Addressing significant challenges for animal detection in camera trap images — doi:10.1038/s41598-025-90249-z'},
  {stmt:'Microsoft AI for Good Lab released PyTorch-Wildlife (2024-2025) — an open-source, unified AI framework for wildlife monitoring combining Megadetector (animal/empty/human/vehicle classification), species classification (30,000+ species supported), and bioacoustic analysis — deployed across 50+ conservation projects globally, including African elephant population monitoring, Amazon rainforest biodiversity assessment, and Arctic marine mammal tracking.',src:'Microsoft AI for Good Lab — PyTorch-Wildlife (2024-2025) / MDPI Sensors (2024) — Context-rich biodiversity assessments'}
],
ps:[
  {title:'Addressing significant challenges for animal detection in camera trap images through deep learning',type:'academic_paper',year:2025,inst:'Nature Scientific Reports',doi:'10.1038/s41598-025-90249-z',url:'https://www.nature.com/articles/s41598-025-90249-z'},
  {title:'PyTorch-Wildlife: A Collaborative Deep Learning Framework for Conservation',type:'software',year:2025,inst:'Microsoft AI for Good Lab / GitHub',url:'https://github.com/microsoft/pytorch-wildlife'}
],
gaps:['Individual animal identification (re-identification) for population counting without tagging','Real-time edge AI for anti-poaching — detecting poachers from camera traps and drones'],
body:`## TL;DR
AI is becoming conservation biology's most powerful tool — automatically classifying millions of camera trap images, identifying individual animals, and monitoring entire ecosystems through bioacoustic AI. With 1 million species at risk of extinction and limited human experts to monitor them, AI scales conservation from local studies to planetary biodiversity tracking.

## Core Explanation
Camera trap workflow: motion/heat-triggered cameras deployed in wilderness for months → millions of images (80% empty, 15% common species, 5% target species) → human experts classify (impossibly slow at scale) → AI automates. Pipeline: (1) Megadetector (Microsoft) — first-stage CNN classifies each image as animal/human/vehicle/empty, discarding 60-80% of images; (2) Species classifier — fine-grained classification (e.g., "Amur leopard" vs "Snow leopard"); (3) Individual identification — for species with unique markings (tiger stripes, whale flukes, zebra stripes), AI re-identifies specific individuals across time and location, enabling population estimation via capture-recapture statistics.

## Detailed Analysis
Biodiversity AI beyond camera traps: (A) Bioacoustics — passive acoustic monitoring (PAM) records ecosystem soundscapes. AI classifies species by calls (birds, frogs, bats, whales) — Rainforest Connection uses old smartphones as solar-powered acoustic sensors detecting chainsaw sounds (illegal logging) in real-time; (B) eDNA — environmental DNA from water/soil samples is sequenced → AI classifies species from DNA barcodes; (C) Satellite imagery — detecting deforestation in real-time (Global Forest Watch), mapping animal habitat, and counting large animals (whales, elephants) from sub-meter satellite imagery; (D) Citizen science — iNaturalist AI suggests species from user photos, generating millions of geotagged observations. Nature 2025 challenges: (1) Data imbalance — rare species have few (<100) training examples; few-shot learning and synthetic data augmentation address this; (2) Geographic domain shift — a model trained on Serengeti images performs poorly in the Amazon due to different vegetation, lighting, and species; (3) Open-set recognition — detecting novel species not in the training set. Microsoft PyTorch-Wildlife provides a unified framework addressing all these challenges, pre-trained on 30K+ species. Wildlife.ai develops open-source smart camera traps.

## Further Reading
- Wildlife Insights: Google's AI-Powered Camera Trap Platform
- iNaturalist: Citizen Science + AI Species Identification
- Rainforest Connection: AI for Anti-Logging`},

{id:'ai-for-recruiting',title:'AI for Recruiting: Resume Screening, Talent Matching, and Fairness in Hiring',cat:'ai',
facts:[
  {stmt:'A comprehensive fairness review (arxiv, updated May 2025) analyzed AI-driven recruitment systems — categorizing biases (historical — learning from past discriminatory hiring, representation — underrepresented groups in training data, measurement — features proxying protected attributes) — and evaluating countermeasures: adversarial debiasing reducing gender/race bias by 30-50%, counterfactual fairness constraints, and blind screening (removing name/gender/age), but noting that no single technique eliminates all bias, and AI can "launder" discrimination through seemingly neutral proxies (zip code, school name, hobby keywords).',src:'arxiv 2405.19699v3 (2025) — Fairness in AI-Driven Recruitment: Challenges, Metrics, Methods, and Future Directions'},
  {stmt:'Springer (September 2025) published a systematic literature review of AI in employee recruitment — analyzing 87 studies — finding that AI reduces time-to-hire by 40-60% and improves candidate-job matching quality (measured by retention at 12 months) by 15-25%, but that 42% of AI-screened candidates report lower trust in the process compared to human-screened, highlighting the transparency-explainability gap as the primary adoption barrier.',src:'Springer Discover Artificial Intelligence (2025) — Role of AI in employee recruitment: SLR — doi:10.1007/s44282-025-00246-w'}
],
ps:[
  {title:'Fairness in AI-Driven Recruitment: Challenges, Metrics, Methods, and Future Directions',type:'academic_paper',year:2025,inst:'arXiv / ACM FAccT',url:'https://arxiv.org/abs/2405.19699'},
  {title:'Role of artificial intelligence in employee recruitment: a systematic literature review',type:'academic_paper',year:2025,inst:'Springer Discover Artificial Intelligence',doi:'10.1007/s44282-025-00246-w',url:'https://link.springer.com/article/10.1007/s44282-025-00246-w'}
],
gaps:['Validating that AI-recommended candidates actually perform better on the job (long-term outcome measurement)','Global regulatory compliance — EU AI Act classifies hiring AI as high-risk, requiring conformity assessment'],
body:`## TL;DR
AI is reshaping hiring — screening thousands of resumes in seconds, matching candidates to jobs based on skills rather than keywords, and (ideally) reducing human bias. But the fairness challenge is profound: AI trained on historical hiring data can amplify discrimination through seemingly neutral features. Getting AI recruiting right is not just an engineering problem — it's a civil rights issue.

## Core Explanation
Recruiting AI applications: (1) Resume parsing — extract structured data (skills, experience, education, certifications) from unstructured PDFs/DOCXs. NLP models (spaCy, BERT-based NER) identify entities and normalize them (e.g., "MIT" → "Massachusetts Institute of Technology"); (2) Candidate screening — rank candidates by job fit. Traditional: keyword matching (brittle, misses synonyms). AI: semantic matching — embed job description and resumes in same vector space, compute cosine similarity. LLM-based: prompt "Rate this candidate for [role] on a scale of 1-10, explaining your reasoning"; (3) Skill extraction and matching — identify both explicit (listed) and inferred (from experience context) skills; (4) Interview scheduling and assessment — AI-conducted initial screening interviews analyzing speech patterns; (5) Bias detection — audit tool for disparities in pass rates across demographic groups.

## Detailed Analysis
Fairness in AI recruiting (arxiv 2025): biases manifest at every pipeline stage. Sourcing bias — job ads shown more to men via platform algorithms (LinkedIn, Facebook). Screening bias — resume ranking models downgrade candidates with employment gaps (disproportionately women) or non-traditional career paths. Interview bias — speech emotion recognition fails on non-native speakers, perceiving them as "less confident." Springer 2025 SLR: fairness techniques — (1) Pre-processing: reweight training data, generate synthetic minority candidates; (2) In-processing: adversarial debiasing (gradient reversal layer penalizes gender predictability), fairness constraints in loss function; (3) Post-processing: adjust decision thresholds per group to equalize opportunity. Key finding: no single technique works universally — the fairness definition matters. Demographic parity (equal selection rates) conflicts with equal opportunity (equal selection of qualified candidates across groups). HBR (Dec 2025) three-year study: AI reshapes fairness by locking in one definition — organizations using AI hiring tools standardize on a particular fairness metric, often without realizing alternative definitions exist. New York City Local Law 144 (2024-2025) requires bias audits for AI hiring tools — the first such law globally. EU AI Act classifies employment AI as high-risk. The transparency-explainability gap: candidates and hiring managers don't trust black-box scores they can't understand. XAI tools (SHAP, LIME) applied to resume screening show feature importance to build trust.

## Further Reading
- NYC Local Law 144: AI Hiring Bias Audit Law
- LinkedIn Fairness Toolkit (LiFT)
- EU AI Act: High-Risk AI in Employment`},

{id:'ai-document-understanding',title:'AI Document Understanding: Layout Parsing, Structured Extraction, and Intelligent Document Processing',cat:'ai',
facts:[
  {stmt:'arxiv (October 2024) published a comprehensive survey of document parsing — analyzing modular pipeline components (layout analysis via Mask R-CNN/DETR for detecting text blocks, tables, and figures; OCR; and structured extraction) and end-to-end approaches using vision-language models that process document images directly — finding that VLM-based approaches (Donut, Pix2Struct) achieve 85-92% accuracy on key information extraction (invoice fields, form fields) while reducing the engineering complexity of traditional modular pipelines by eliminating separate OCR and layout analysis models.',src:'arxiv 2410.21169 (2024) — Document Parsing Unveiled: Techniques, Challenges, and Prospects for Information Extraction'},
  {stmt:'Google Document AI, Amazon Textract/IDP, and Microsoft Azure Document Intelligence (2025-2026) represent the major cloud document AI platforms — processing billions of pages annually across invoices, receipts, contracts, insurance claims, and medical records — with LLM-augmented pipelines reducing manual data entry costs by 60-80% and processing time from hours per document to seconds, while maintaining human-in-the-loop for low-confidence extractions.',src:'Google Document AI (2025) / AWS Intelligent Document Processing / Azure Document Intelligence (2026) — cloud document AI platforms'}
],
ps:[
  {title:'Document Parsing Unveiled: Techniques, Challenges, and Prospects for Information Extraction',type:'academic_paper',year:2024,inst:'arXiv',url:'https://arxiv.org/abs/2410.21169'},
  {title:'Automate data extraction and analysis from documents with Generative AI (AWS IDP Guide)',type:'industry_report',year:2026,inst:'Amazon Web Services',url:'https://aws.amazon.com/ai/generative-ai/use-cases/document-processing/'}
],
gaps:['Handwritten document understanding — cursive handwriting remains challenging','Multi-page document reasoning spanning tables, text, and figures across pages'],
body:`## TL;DR
AI document understanding extracts structured data from unstructured documents — invoices, contracts, medical records, tax forms. From traditional OCR pipelines to end-to-end vision-language models, the field has evolved from optical character recognition to semantic comprehension. LLMs can now "read" documents like humans, understanding layout, extracting key fields, and reasoning across tables and text.

## Core Explanation
Document understanding pipeline (traditional): Document image/PDF → (1) Layout analysis — detect text blocks, tables, figures, headers (using object detection models like DETR, LayoutLMv3); (2) OCR — recognize text within each block (Tesseract, Google Vision OCR, TrOCR); (3) Reading order — reconstruct logical text flow from 2D layout; (4) Information extraction — NER (named entity recognition) to extract specific fields (invoice number, date, total amount); (5) Table extraction — detect table structure (rows, columns, merged cells) and extract cell contents; (6) Validation — business rules check extracted data consistency. Modern approaches: end-to-end document understanding using vision-language models — the model takes the document image as input and directly outputs extracted structured data (JSON/dictionary), learning all pipeline stages simultaneously.

## Detailed Analysis
Layout analysis: LayoutLMv3 (Microsoft, 2022) combines text, layout (2D position embeddings), and visual features in a unified transformer architecture. Donut (NAVER, 2022) introduced OCR-free document understanding — mapping document images directly to structured output without explicit text recognition, using a Swin Transformer encoder + BART decoder. Pix2Struct (Google, 2023) extends this to diverse document types including screenshots and figures. The arxiv 2024 survey identifies the key trade-off: modular pipelines are more interpretable and debuggable but require extensive engineering; end-to-end VLMs are simpler to deploy but harder to fix when they make systematic errors. Cloud platforms: Google Document AI offers specialized processors for invoices, receipts, W-2s, bank statements, and identity documents, plus Custom Extractor for novel document types. AWS IDP combines Textract (OCR + table extraction) with Comprehend (entity recognition) and Augmented AI (human review). Key applications: accounts payable automation (invoice → ERP), insurance claims processing, mortgage underwriting, medical record digitization, and contract analysis. LLM-augmented pipelines (2025-2026): GPT-4/Gemini as the final reasoning layer — OCR output + LLM prompt ("Extract the following fields from this invoice: vendor name, date, total, line items") → structured JSON. The 2026 OCR-to-VLM shift represents the next evolution — Gemini 3 Flash and Qwen3-VL processing documents natively as images.

## Further Reading
- LayoutLMv3: Unified Text, Layout, and Image Pretraining (Microsoft)
- Donut: Document Understanding Transformer (NAVER)
- Hugging Face Document AI Models`},

{id:'robot-manipulation',title:'Robot Manipulation: Dexterous Grasping, Sim-to-Real Transfer, and Tactile Sensing',cat:'ai',
facts:[
  {stmt:'arxiv (February 2025) demonstrated practical sim-to-real reinforcement learning for dexterous manipulation on humanoid robots — training RL policies in GPU-accelerated simulation (Isaac Gym) for three challenging tasks (grasp-and-reach, box lift, object reorientation) with domain randomization (randomizing friction, object mass, lighting, camera position) and successfully transferring policies zero-shot to a real humanoid robot achieving 85-92% task success rates across all three tasks.',src:'arxiv 2502.20396 (2025) — Sim-to-Real RL for Vision-Based Dexterous Manipulation on Humanoid Robots'},
  {stmt:'Springer AI Review (July 2025) published a comprehensive survey of learning-based dexterous grasping — reviewing 200+ papers across five categories: grasp detection (identifying stable grasp points from visual input), grasp planning (trajectory optimization), reinforcement learning for dexterous hands (training multi-fingered policies), sim-to-real transfer (bridging the simulation-reality gap), and tactile sensing integration (using fingertip force/torque sensors to adapt grasps in real-time).',src:'Springer AI Review (2025) — Learning-based dexterous grasping survey — doi:10.1007/s10462-025-11262-2'}
],
ps:[
  {title:'Sim-to-Real Reinforcement Learning for Vision-Based Dexterous Manipulation on Humanoid Robots',type:'academic_paper',year:2025,inst:'arXiv / Google DeepMind',url:'https://arxiv.org/abs/2502.20396'},
  {title:'An overview of learning-based dexterous grasping: recent advances, challenges, and future directions',type:'academic_paper',year:2025,inst:'Springer AI Review',doi:'10.1007/s10462-025-11262-2',url:'https://link.springer.com/article/10.1007/s10462-025-11262-2'}
],
gaps:['General-purpose manipulation across diverse objects without per-object training','Safe human-robot physical interaction during shared manipulation tasks'],
body:`## TL;DR
Robot manipulation — the ability to grasp, lift, and manipulate objects — remains one of AI's hardest physical challenges. While AI can write poetry and prove theorems, a robot still struggles to fold laundry or pick a specific grape without crushing it. The frontier combines sim-to-real reinforcement learning, dexterous multi-fingered hands, and tactile sensing to bridge the gap between simulation and the messy physical world.

## Core Explanation
Manipulation pipeline: Perception (RGB-D cameras → object pose/shape estimation) → Grasp detection (where to place fingers) → Motion planning (trajectory from current pose to grasp) → Execution (force control, compliance). Traditional approach: analytical grasp synthesis uses geometric models of object and hand to compute force-closure grasps. Limitations: requires accurate object models, struggles with deformable/unknown objects. AI approach: (1) Grasp detection — CNN predicts grasp rectangles from RGB-D images (GG-CNN, GR-ConvNet, Dex-Net 4.0); (2) Reinforcement learning — agent explores in simulation, learning policies that maximize grasp success; (3) Imitation learning — learn from human demonstrations (teleoperation, video); (4) Sim-to-real — policies trained entirely in simulation (Isaac Gym, MuJoCo) transfer to real robots through domain randomization.

## Detailed Analysis
Dexterous hands: multi-fingered hands (Shadow Hand: 24 DOF, Allegro: 16 DOF, LEAP: 16 DOF) enable human-like manipulation — in-hand reorientation, precision pinch grasping. The high-dimensional action space (20+ continuous joints) makes RL more challenging than parallel-jaw grippers. arxiv 2025 sim-to-real humanoid: trains in Isaac Gym with 4,096 parallel environments. Domain randomization: randomize lighting, textures, camera extrinsics, object mass/friction, and joint dynamics. After randomization → the policy learns to be robust to any specific setting → transfers zero-shot. MDPI 2025 human-like dexterous grasping RL: reward engineering for multi-fingered grasping — rewards for finger-object contact, object lift height, and grasp stability over time. Key techniques: (A) Curriculum learning — start with simple shapes, progress to complex objects; (B) Tactile sensing — GelSight, DIGIT optical tactile sensors provide high-resolution contact information, enabling reactive grasp adjustment; (C) Bimanual manipulation — two hands coordinating (Bi-Touch, Bristol 2023-2025). Springer 2025 survey: the sim-to-real gap remains the primary bottleneck — even with domain randomization, policies trained without tactile feedback transfer poorly (30-50% success drop vs. simulation). Frontiers 2025 interactive imitation learning survey combines human demonstrations with autonomous RL refinement. Applications: warehouse picking (Amazon, Ocado), surgical robotics, home assistance.

## Further Reading
- Dex-Net: Deep Grasping Dataset (UC Berkeley)
- NVIDIA Isaac Gym: GPU-Accelerated RL Simulation
- GelSight/DIGIT: Optical Tactile Sensors`},

{id:'ai-generated-content-detection',title:'AI-Generated Content Detection: Identifying Synthetic Text, Deepfake Images, and AI-Authored Media',cat:'ai',
facts:[
  {stmt:'A comprehensive 2025 survey of AI-generated text detection methods found that statistical detectors (GLTR, DetectGPT — analyzing token probability curvature) achieve 85-95% detection accuracy against GPT-3.5 outputs but degrade to 55-70% against GPT-4 and Claude outputs, and are easily defeated by paraphrasing (PEGASUS paraphrasing reduces detection to near-random). Watermarking techniques (Kirchenbauer et al., 2023 — biasing token sampling) provide cryptographic detection guarantees but can be removed through translation or heavy paraphrasing.',src:'AI text detection surveys (2024-2025) / Mitchell et al. (2023) — DetectGPT / Kirchenbauer et al. (2023) — Watermarking LLM outputs / Sadasivan et al. (2023) — detection-paraphrase evasion'},
  {stmt:'C2PA (Coalition for Content Provenance and Authenticity) — backed by Adobe, Microsoft, Google, OpenAI, and the BBC — published the 2.1 technical specification (2025) establishing a cryptographic chain of custody for digital media: capture devices sign content at creation, edits are recorded in a tamper-evident manifest. By 2026, flagship cameras (Leica M11-P, Sony A9 III) embed C2PA credentials at capture, and Google DeepMind\'s SynthID embeds imperceptible watermarks in AI-generated images, audio, and text.',src:'C2PA 2.1 Specification (2025) / Leica M11-P (2024) — first C2PA camera / Google DeepMind SynthID (2023-2025) — AI watermarking'}
],
ps:[
  {title:'DetectGPT: Zero-Shot Machine-Generated Text Detection using Probability Curvature (and follow-up surveys)',type:'academic_paper',year:2023,inst:'Stanford / UC Berkeley / arXiv / ICML',url:'https://arxiv.org/abs/2301.11305'},
  {title:'C2PA Content Credentials: Technical Specification v2.1',type:'industry_standard',year:2025,inst:'Coalition for Content Provenance and Authenticity (Adobe, Microsoft, Google, BBC)',url:'https://c2pa.org/specifications/'}
],
gaps:['Detecting AI-generated multimodal content (AI-generated video + AI-generated audio + AI-generated script)','Adversarial robustness — detection in the presence of deliberate evasion attacks'],
body:`## TL;DR
As AI-generated text, images, audio, and video become indistinguishable from human-created content, detecting what's real becomes a critical societal challenge — from identifying AI-written student essays and fake product reviews to detecting political deepfakes. Detection is an asymmetric arms race: generation improves faster than detection, and each detection method spawns evasion techniques.

## Core Explanation
AI-generated text detection approaches: (1) Statistical detectors — analyze token probability distributions. Human writing has natural variability (some words unexpected); AI-generated text has concentrated probability (model selects most likely tokens). GLTR (2019) visualizes this; DetectGPT (2023) perturbs text and measures probability curvature — AI text tends to be at local probability maxima, slight changes decrease probability; (2) Classifier-based — fine-tuned discriminators (RoBERTa, GPT-2 detector) trained on human vs. AI text pairs. Strong on specific models, poor generalization; (3) Watermarking — during generation, bias token selection toward a "green list" of tokens. Detector checks if text has disproportionately many green-list tokens — provides statistical guarantee. SynthID (Google, 2023-2025) embeds imperceptible watermarks in generated text, images, and audio; (4) Retrieval-based — store all generated text in a database, check if candidate text matches. Only works for known generators.

## Detailed Analysis
Deepfake detection: (A) Image — face artifacts (inconsistent eye reflections, asymmetric earrings, blending boundaries), frequency domain analysis (GAN fingerprints), and physiological signals (heart rate from facial color changes, inconsistent with real humans). SOTA detectors (XceptionNet, EfficientNet-based) achieve 95%+ on known generators, drop to 60-70% on unseen generators; (B) Video — temporal inconsistencies across frames (flickering, unnatural blinking patterns), audio-visual asynchrony (lip movements not matching speech); (C) Audio — vocoder artifacts, unnatural prosody patterns. The arms race: every detection method spawns evasion — paraphrasing defeats statistical text detection; adversarial noise defeats image detection; re-encoding defeats watermarking. C2PA represents a proactive approach — instead of detecting fakes, establish authenticity for real content. Cameras sign images at capture with device attestation; editing software (Photoshop) adds edit claims; social media platforms display "content credentials" showing provenance chain. SynthID embeds watermarks during generation rather than post-hoc. Key open problem: the asymmetry — detection must catch 100% of fakes (one missed deepfake can cause significant harm), while generation needs only one success. Regulatory landscape: EU AI Act requires AI-generated content labeling; China mandates watermarking of deep synthesis; US AI executive orders encourage provenance standards. The consensus: no single detection method suffices — defense-in-depth combining multiple orthogonal approaches is necessary.

## Further Reading
- SynthID: Google DeepMind Watermarking
- C2PA/Content Authenticity Initiative (Adobe)
- GLTR: Visual Forensic Tool for AI Text (Harvard/IBM)`}

];

const TODAY='2026-05-24';
let created=0,skipped=0;
for(const a of A){
  const fp=p.join(CONTENT,a.cat,a.id+'.md');
  if(fs.existsSync(fp)){skipped++;console.log(`Skipped: ${a.cat}/${a.id}.md`);continue;}
  const L=[];
  L.push('---');L.push(`id: "${a.id}"`);L.push(`title: "${a.title}"`);
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
    L.push(`  - id: "ps-${a.id}-${i+1}"`);L.push(`    title: "${esc(s.title)}"`);
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
  created++;console.log(`Created: ${a.cat}/${a.id}.md`);
}
console.log(`\nTotal: ${created} created, ${skipped} skipped`);
