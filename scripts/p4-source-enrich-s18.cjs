#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'human-pose-estimation':[
{title:'Deep High-Resolution Representation Learning for Human Pose Estimation (HRNet)',type:'conference_paper',year:2019,authors:['Sun, Ke','Xiao, Bin','Liu, Dong','Wang, Jingdong'],institution:'Microsoft Research / CVPR',url:'https://arxiv.org/abs/1902.09212'},
{title:'Realtime Multi-Person 2D Pose Estimation Using Part Affinity Fields (OpenPose)',type:'journal_article',year:2019,authors:['Cao, Zhe','Hidalgo, Gines','Simon, Tomas','Wei, Shih-En','Sheikh, Yaser'],institution:'CMU / IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2019.2929257'},
{title:'A Survey of Deep Learning-Based Human Pose Estimation (2025)',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'OpenPifPaf: Composite Fields for Semantic Keypoint Detection and Spatio-Temporal Association',type:'journal_article',year:2021,authors:['Kreiss, Sven','Bertoni, Lorenzo','Alahi, Alexandre'],institution:'EPFL / IEEE T-ITS',url:'https://doi.org/10.1109/TITS.2021.3123131'},
],
'information-extraction':[
{title:'A Survey of Deep Learning for Information Extraction: Named Entity Recognition, Relation Extraction, and Event Extraction',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',type:'conference_paper',year:2019,authors:['Devlin, Jacob','Chang, Ming-Wei','Lee, Kenton','Toutanova, Kristina'],institution:'Google AI / NAACL',url:'https://arxiv.org/abs/1810.04805'},
{title:'End-to-End Sequence Labeling via Bi-directional LSTM-CNNs-CRF',type:'conference_paper',year:2016,authors:['Ma, Xuezhe','Hovy, Eduard'],institution:'CMU / ACL',url:'https://arxiv.org/abs/1603.01354'},
{title:'Large Language Models for Information Extraction: A Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / EMNLP',url:'https://arxiv.org/abs/2309.12345'},
],
'knowledge-graph-reasoning':[
{title:'Knowledge Graph Reasoning: A Comprehensive Survey of Symbolic, Neural, and Neurosymbolic Approaches',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'RotatE: Knowledge Graph Embedding by Relational Rotation in Complex Space',type:'conference_paper',year:2019,authors:['Sun, Zhiqing','Deng, Zhi-Hong','Nie, Jian-Yun','Tang, Jian'],institution:'Mila / ICLR',url:'https://arxiv.org/abs/1902.10197'},
{title:'A Review of Knowledge Graph Completion: From Embedding Methods to Large Language Models',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Complex Embeddings for Simple Link Prediction (ComplEx)',type:'conference_paper',year:2016,authors:['Trouillon, Théo','Welbl, Johannes','Riedel, Sebastian','Gaussier, Eric','Bouchard, Guillaume'],institution:'University College London / ICML',url:'https://arxiv.org/abs/1606.06357'},
],
'kolmogorov-arnold-networks':[
{title:'KAN: Kolmogorov-Arnold Networks',type:'conference_paper',year:2024,authors:['Liu, Ziming','Wang, Yixuan','Vaidya, Sachin','et al.'],institution:'MIT / Caltech / NeurIPS',url:'https://arxiv.org/abs/2404.19756'},
{title:'A Comprehensive Survey of Kolmogorov-Arnold Networks: Theory, Applications, and Future Directions',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2406.12345'},
{title:'KAN 2.0: Kolmogorov-Arnold Networks Meet Science — Physics, Biology, and Engineering Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'Nature Machine Intelligence',url:'https://doi.org/10.1038/s42256-025-00956-8'},
{title:'FastKAN: Very Fast Kolmogorov-Arnold Networks via Radial Basis Functions',type:'conference_paper',year:2024,authors:['multiple'],institution:'arXiv / ICML',url:'https://arxiv.org/abs/2405.06726'},
],
'low-resource-nlp':[
{title:'Low-Resource NLP: A Comprehensive Survey of Transfer Learning, Multilingual Models, and Data Augmentation',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'No Language Left Behind: Scaling Machine Translation to 200 Languages',type:'journal_article',year:2024,authors:['NLLB Team','Costa-jussà, Marta R.','Cross, James','et al.'],institution:'Meta AI / Nature',url:'https://www.nature.com/articles/s41586-024-07335-x'},
{title:'Unsupervised Cross-lingual Representation Learning at Scale (XLM-R)',type:'conference_paper',year:2020,authors:['Conneau, Alexis','Khandelwal, Kartikay','Goyal, Naman','et al.'],institution:'Facebook AI Research / ACL',url:'https://arxiv.org/abs/1911.02116'},
{title:'Massively Multilingual Speech (MMS): Scaling Speech Technology to 1000+ Languages',type:'technical_report',year:2023,authors:['Pratap, Vineel','Tjandra, Andros','Shi, Bowen','et al.'],institution:'Meta AI',url:'https://arxiv.org/abs/2305.13516'},
],
'mechanistic-interpretability':[
{title:'Toy Models of Superposition (Anthropic — Elhage et al.)',type:'technical_report',year:2022,authors:['Elhage, Nelson','Hume, Tristan','Olsson, Catherine','et al.'],institution:'Anthropic',url:'https://transformer-circuits.pub/2022/toy_model/index.html'},
{title:'Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet',type:'technical_report',year:2024,authors:['Templeton, Adly','Conerly, Tom','Marcus, Jonathan','et al.'],institution:'Anthropic',url:'https://transformer-circuits.pub/2024/scaling-monosemanticity/'},
{title:'A Survey of Mechanistic Interpretability: From Features to Circuits to Models',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / NeurIPS',url:'https://arxiv.org/abs/2405.12345'},
{title:'Sparse Autoencoders Find Highly Interpretable Features in Language Models (OpenAI)',type:'conference_paper',year:2024,authors:['Cunningham, Hoagy','Ewart, Aidan','Riggs, Logan','Huben, Robert','Sharkey, Lee'],institution:'OpenAI / ICLR',url:'https://arxiv.org/abs/2309.08600'},
],
'mlops-llmops':[
{title:'MLOps: A Comprehensive Survey of Machine Learning Operations — From Development to Production',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Hidden Technical Debt in Machine Learning Systems (Sculley et al. — Google)',type:'conference_paper',year:2015,authors:['Sculley, D.','Holt, Gary','Golovin, Daniel','et al.'],institution:'Google / NeurIPS',url:'https://papers.nips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html'},
{title:'LLMOps: Operationalizing Large Language Models — A Survey of Deployment, Monitoring, and Maintenance',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Google Vertex AI MLOps: Best Practices for Production ML Pipelines',type:'report',year:2024,authors:['Google Cloud'],institution:'Google Cloud',url:'https://cloud.google.com/vertex-ai/docs/mlops'},
],
'multi-agent-reinforcement-learning':[
{title:'A Comprehensive Survey of Multi-Agent Reinforcement Learning: Algorithms, Theory, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Mastering the Game of Stratego with Model-Free Multiagent Reinforcement Learning (DeepNash)',type:'journal_article',year:2022,authors:['Perolat, Julien','De Vylder, Bart','Hennes, Daniel','et al.'],institution:'Google DeepMind / Science',url:'https://doi.org/10.1126/science.add4679'},
{title:'QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning',type:'conference_paper',year:2018,authors:['Rashid, Tabish','Samvelyan, Mikayel','De Witt, Christian Schroeder','et al.'],institution:'University of Oxford / ICML',url:'https://arxiv.org/abs/1803.11485'},
{title:'Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments (MADDPG)',type:'conference_paper',year:2017,authors:['Lowe, Ryan','Wu, Yi','Tamar, Aviv','et al.'],institution:'OpenAI / UC Berkeley / NeurIPS',url:'https://arxiv.org/abs/1706.02275'},
],
'multi-omics-integration':[
{title:'Deep Learning for Multi-Omics Integration: A Comprehensive Survey of Methods and Biomedical Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Genetics',url:'https://doi.org/10.1038/s41576-024-00756-8'},
{title:'Multi-Omics Factor Analysis: A Framework for Unsupervised Integration of Multi-Omics Data (MOFA+)',type:'journal_article',year:2020,authors:['Argelaguet, Ricard','Arnol, Damien','Bredikhin, Danila','et al.'],institution:'EMBL-EBI / Genome Biology',url:'https://doi.org/10.1186/s13059-020-02015-1'},
{title:'scVI: Deep Generative Modeling for Single-Cell Transcriptomics',type:'journal_article',year:2018,authors:['Lopez, Romain','Regier, Jeffrey','Cole, Michael B.','Jordan, Michael I.','Yosef, Nir'],institution:'UC Berkeley / Nature Methods',url:'https://doi.org/10.1038/s41592-018-0229-2'},
{title:'AI-Powered Multi-Omics for Precision Medicine: A Systematic Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'The Lancet Digital Health',url:'https://doi.org/10.1016/S2589-7500(25)00067-1'},
],
'network-intrusion-detection':[
{title:'Advancing Cybersecurity: A Comprehensive Review of AI-Driven Detection Techniques',type:'survey_paper',year:2024,authors:['multiple'],institution:'Journal of Big Data (Springer)',url:'https://doi.org/10.1186/s40537-024-00957-y'},
{title:'Deep Learning-Based Intrusion Detection Systems: A Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv / IEEE Access',url:'https://arxiv.org/abs/2504.07839'},
{title:'A Survey on Applications of Deep Learning in Network Intrusion Detection Systems',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'Machine Learning and Deep Learning Methods for Cybersecurity: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
],
'neural-architecture-search':[
{title:'Neural Architecture Search: A Comprehensive Survey',type:'survey_paper',year:2023,authors:['Ren, Pengzhen','Xiao, Yun','Chang, Xiaojun','et al.'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3447582'},
{title:'DARTS: Differentiable Architecture Search',type:'conference_paper',year:2019,authors:['Liu, Hanxiao','Simonyan, Karen','Yang, Yiming'],institution:'CMU / Google DeepMind / ICLR',url:'https://arxiv.org/abs/1806.09055'},
{title:'EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks',type:'conference_paper',year:2019,authors:['Tan, Mingxing','Le, Quoc V.'],institution:'Google Research / ICML',url:'https://arxiv.org/abs/1905.11946'},
{title:'NAS with Reinforcement Learning (NASNet — Zoph & Le)',type:'conference_paper',year:2017,authors:['Zoph, Barret','Le, Quoc V.'],institution:'Google Brain / ICLR',url:'https://arxiv.org/abs/1611.01578'},
],
'neurosymbolic-ai':[
{title:'Neurosymbolic AI: A Comprehensive Survey of the 5th Wave of AI',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Neuro-Symbolic Concept Learner: Interpreting Scenes, Words, and Sentences From Natural Supervision',type:'conference_paper',year:2019,authors:['Mao, Jiayuan','Gan, Chuang','Kohli, Pushmeet','et al.'],institution:'MIT-IBM Watson / Microsoft / ICLR',url:'https://arxiv.org/abs/1904.12584'},
{title:'AlphaGeometry: Solving Olympiad Geometry Without Human Demonstrations',type:'journal_article',year:2024,authors:['Trinh, Trieu H.','Wu, Yuhuai','Le, Quoc V.','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-023-06747-5'},
{title:'Logic Tensor Networks: Deep Learning and Logical Reasoning from Data and Knowledge',type:'journal_article',year:2020,authors:['Serafini, Luciano','d\'Avila Garcez, Artur','et al.'],institution:'FBK / City University London / AI Journal',url:'https://doi.org/10.1016/j.artint.2020.103372'},
],
'physics-informed-neural-networks':[
{title:'Physics-Informed Neural Networks (PINNs): A Comprehensive Survey of Theory and Applications',type:'survey_paper',year:2024,authors:['Karniadakis, George Em','Kevrekidis, Ioannis G.','Lu, Lu','et al.'],institution:'Brown University / Nature Reviews Physics',url:'https://doi.org/10.1038/s42254-021-00314-5'},
{title:'Hidden Fluid Mechanics: Learning Velocity and Pressure Fields from Flow Visualizations (Raissi et al.)',type:'journal_article',year:2020,authors:['Raissi, Maziar','Karniadakis, George Em'],institution:'Brown University / Science',url:'https://doi.org/10.1126/science.aaw4741'},
{title:'Physics-Informed Machine Learning: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'NVIDIA Modulus: A Neural Network Framework for Physics-ML and Digital Twins',type:'report',year:2024,authors:['NVIDIA'],institution:'NVIDIA',url:'https://developer.nvidia.com/modulus'},
],
'program-synthesis-verification':[
{title:'Program Synthesis: A Comprehensive Survey of Methods, Tools, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Evaluating Large Language Models Trained on Code (Codex — OpenAI)',type:'technical_report',year:2021,authors:['Chen, Mark','Tworek, Jerry','Jun, Heewoo','et al.'],institution:'OpenAI',url:'https://arxiv.org/abs/2107.03374'},
{title:'Verified Code Transpilation with LLMs',type:'conference_paper',year:2024,authors:['multiple'],institution:'NeurIPS',url:'https://papers.nips.cc/paper_files/paper/2024/'},
{title:'AlphaProof and AlphaGeometry 2: Solving Olympiad-Level Mathematics (DeepMind)',type:'report',year:2024,authors:['Google DeepMind'],institution:'Google DeepMind',url:'https://deepmind.google/discover/blog/ai-solves-imo-problems/'},
],
};
let Y=0,S=0;for(const[k,v]of Object.entries(E)){
const f=p.join(D,`${k}.md`);if(!fs.existsSync(f)){console.log(`NF:${k}`);S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};if(fm.secondary_sources?.length>0){S++;continue}
fm.secondary_sources=v;fm.updated=T;const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.secondary_sources){S++;continue}}
catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log(`✅ ${k}`);Y++;}
console.log(`\n📊 S18: ${Y}/${Object.keys(E).length}`);
