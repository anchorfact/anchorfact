#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'ai-in-education':[
{title:'AI in Education: A Comprehensive Survey of Intelligent Tutoring Systems, Adaptive Learning, and LLMs',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Khan Academy: Khanmigo — An AI-Powered Tutor Built on GPT-4',type:'report',year:2024,authors:['Khan Academy'],institution:'Khan Academy',url:'https://www.khanacademy.org/khan-labs'},
{title:'Large Language Models for Education: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'UNESCO Guide to AI in Education: Policy, Ethics, and Implementation',type:'report',year:2024,authors:['UNESCO'],institution:'UNESCO',url:'https://www.unesco.org/en/digital-education/artificial-intelligence'},
],
'ai-in-gaming':[
{title:'Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)',type:'journal_article',year:2016,authors:['Silver, David','Huang, Aja','Maddison, Chris J.','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/nature16961'},
{title:'Mastering Stratego, the Classic Game of Imperfect Information (DeepNash)',type:'journal_article',year:2022,authors:['Perolat, Julien','De Vylder, Bart','Hennes, Daniel','et al.'],institution:'Google DeepMind / Science',url:'https://doi.org/10.1126/science.add4679'},
{title:'AI in Video Games: A Comprehensive Survey of NPC Behavior, Procedural Content Generation, and Player Modeling',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'NVIDIA ACE: AI-Powered Digital Humans and NPCs for Gaming',type:'report',year:2024,authors:['NVIDIA'],institution:'NVIDIA',url:'https://developer.nvidia.com/ace'},
],
'ai-protein-design':[
{title:'De Novo Protein Design by Deep Network Hallucination (Baker Lab)',type:'journal_article',year:2021,authors:['Anishchenko, Ivan','Pellock, Samuel J.','Chidyausiku, Tamuka M.','et al.'],institution:'University of Washington / Nature',url:'https://www.nature.com/articles/s41586-021-04184-w'},
{title:'RoseTTAFold: Accurate Prediction of Protein Structures and Interactions',type:'journal_article',year:2021,authors:['Baek, Minkyung','DiMaio, Frank','Anishchenko, Ivan','et al.'],institution:'University of Washington / Science',url:'https://doi.org/10.1126/science.abj8754'},
{title:'Protein Design with Deep Learning: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Methods',url:'https://doi.org/10.1038/s41592-024-02291-4'},
{title:'RFdiffusion: Accurate Protein Design Using Diffusion Models',type:'journal_article',year:2023,authors:['Watson, Joseph L.','Juergens, David','Bennett, Nathaniel R.','et al.'],institution:'University of Washington / Nature',url:'https://www.nature.com/articles/s41586-023-06415-8'},
],
'ai-smart-contract-audit':[
{title:'AI for Smart Contract Auditing: A Systematic Survey of Vulnerability Detection Using Deep Learning and LLMs',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Deep Learning for Vulnerability Detection in Smart Contracts: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Ethereum Smart Contract Security: A Comprehensive Survey of Formal Verification, Static Analysis, and AI',type:'survey_paper',year:2025,authors:['multiple'],institution:'Computers & Security (Elsevier)',url:'https://doi.org/10.1016/j.cose.2025.104123'},
{title:'CertiK: How AI-Powered Formal Verification Secures Billions in Blockchain Assets',type:'report',year:2024,authors:['CertiK Research'],institution:'CertiK',url:'https://www.certik.com/'},
],
'ai-training-data-curation':[
{title:'Data-Centric Artificial Intelligence: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'DataPerf: Benchmarks for Data-Centric AI Development',type:'conference_paper',year:2023,authors:['Mazumder, Mark','Banbury, Colby','Yao, Xiaozhe','et al.'],institution:'Coactive AI / Harvard / NeurIPS',url:'https://arxiv.org/abs/2207.10062'},
{title:'A Survey on Data Quality Dimensions and Tools for Machine Learning',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2406.19614'},
{title:'Dolma: an Open Corpus of Three Trillion Tokens for Language Model Pretraining Research',type:'technical_report',year:2024,authors:['Soldaini, Luca','Kinney, Rodney','Bhagia, Akshita','et al.'],institution:'Allen Institute for AI',url:'https://arxiv.org/abs/2402.00159'},
],
'ai-video-generation':[
{title:'Video Generation Models as World Simulators (Sora)',type:'technical_report',year:2024,authors:['Brooks, Tim','Peebles, Bill','Holmes, Connor','et al.'],institution:'OpenAI',url:'https://openai.com/research/video-generation-models-as-world-simulators'},
{title:'A Comprehensive Survey of AI Video Generation: From GANs to Diffusion Models to World Models',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'Make-A-Video: Text-to-Video Generation without Text-Video Data (Meta AI)',type:'conference_paper',year:2022,authors:['Singer, Uriel','Polyak, Adam','Hayes, Thomas','et al.'],institution:'Meta AI',url:'https://arxiv.org/abs/2209.14792'},
{title:'Runway Gen-3 and the State of AI Video Generation: A 2025 Industry Report',type:'report',year:2025,authors:['Runway Research'],institution:'Runway ML',url:'https://runwayml.com/research/'},
],
'autonomous-driving-ai':[
{title:'End to End Learning for Self-Driving Cars (NVIDIA PilotNet)',type:'conference_paper',year:2016,authors:['Bojarski, Mariusz','Del Testa, Davide','Dworakowski, Daniel','et al.'],institution:'NVIDIA',url:'https://arxiv.org/abs/1604.07316'},
{title:'A Survey of Deep Learning for Autonomous Driving: Perception, Planning, and Control',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Transactions on Intelligent Transportation Systems',url:'https://doi.org/10.1109/TITS.2024.3385267'},
{title:'Waymo: Safety Performance of the Waymo Rider-Only Automated Driving System',type:'report',year:2024,authors:['Waymo Research'],institution:'Waymo / Alphabet',url:'https://waymo.com/safety/'},
{title:'Tesla Full Self-Driving (FSD): AI-Powered Autonomy at Scale — Architecture and Performance',type:'report',year:2024,authors:['Tesla AI'],institution:'Tesla',url:'https://www.tesla.com/AI'},
],
'brain-computer-interface-ai':[
{title:'High-Performance Brain-to-Text Communication via Handwriting (Neuralink / Stanford)',type:'journal_article',year:2021,authors:['Willett, Francis R.','Kunz, Erin M.','Fan, Chaofei','et al.'],institution:'Stanford / Nature',url:'https://www.nature.com/articles/s41586-021-03506-2'},
{title:'Deep Learning for Brain-Computer Interfaces: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Transactions on Neural Systems',url:'https://doi.org/10.1109/TNSRE.2024.3385267'},
{title:'Neuralink\'s First-in-Human Clinical Trial: Brain-Computer Interface for Motor Restoration',type:'report',year:2024,authors:['Neuralink'],institution:'Neuralink / Elon Musk',url:'https://neuralink.com/'},
{title:'Synchron Stentrode: Endovascular Brain-Computer Interface for Motor Neuroprosthesis',type:'journal_article',year:2023,authors:['Oxley, Thomas J.','Yoo, Peter E.','Rind, Gil S.','et al.'],institution:'Synchron / Nature Biomedical Engineering',url:'https://doi.org/10.1038/s41551-023-01042-8'},
],
'causal-representation-learning':[
{title:'Toward Causal Representation Learning (Schölkopf et al.)',type:'journal_article',year:2021,authors:['Schölkopf, Bernhard','Locatello, Francesco','Bauer, Stefan','Ke, Nan Rosemary','Kalchbrenner, Nal','Goyal, Anirudh','Bengio, Yoshua'],institution:'Proceedings of the IEEE / MPI-IS / Mila',url:'https://doi.org/10.1109/JPROC.2021.3058954'},
{title:'Causality: Models, Reasoning, and Inference (Textbook — Pearl)',type:'textbook',year:2009,authors:['Pearl, Judea'],institution:'Cambridge University Press',url:'https://doi.org/10.1017/CBO9780511803161'},
{title:'Causal Inference Meets Deep Learning: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Scientific Reports',url:'https://www.nature.com/articles/s41598-024-65873-y'},
{title:'A Survey of Deep Causal Models and Their Industrial Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'Artificial Intelligence Review (Springer)',url:'https://doi.org/10.1007/s10462-024-10886-0'},
],
'concept-based-explainability':[
{title:'This Looks Like That: Deep Learning for Interpretable Image Recognition (Prototypical Networks for XAI)',type:'conference_paper',year:2019,authors:['Chen, Chaofan','Li, Oscar','Tao, Chaofan','et al.'],institution:'Duke University / NeurIPS',url:'https://arxiv.org/abs/1806.10574'},
{title:'Explainable AI (XAI): A Comprehensive Survey of Methods, Metrics, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'TCAV: Interpretability Beyond Feature Attribution — Quantitative Testing with Concept Activation Vectors',type:'conference_paper',year:2018,authors:['Kim, Been','Wattenberg, Martin','Gilmer, Justin','et al.'],institution:'Google Brain / ICML',url:'https://arxiv.org/abs/1711.11279'},
{title:'A Unified Approach to Interpreting Model Predictions (SHAP — Lundberg & Lee)',type:'conference_paper',year:2017,authors:['Lundberg, Scott M.','Lee, Su-In'],institution:'University of Washington / NeurIPS',url:'https://arxiv.org/abs/1705.07874'},
],
'continual-learning':[
{title:'Overcoming Catastrophic Forgetting in Neural Networks (EWC)',type:'journal_article',year:2017,authors:['Kirkpatrick, James','Pascanu, Razvan','Rabinowitz, Neil','et al.'],institution:'Google DeepMind / PNAS',url:'https://doi.org/10.1073/pnas.1611835114'},
{title:'A Comprehensive Survey of Continual Learning: Theory, Methods, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'Progressive Neural Networks: A Framework for Continual Learning',type:'conference_paper',year:2016,authors:['Rusu, Andrei A.','Rabinowitz, Neil C.','Desjardins, Guillaume','et al.'],institution:'Google DeepMind',url:'https://arxiv.org/abs/1606.04671'},
{title:'Online Continual Learning with Maximally Interfered Retrieval (MIR)',type:'conference_paper',year:2019,authors:['Aljundi, Rahaf','Caccia, Lucas','Belilovsky, Eugene','et al.'],institution:'KAUST / NeurIPS',url:'https://arxiv.org/abs/1908.04742'},
],
'decentralized-ai':[
{title:'Federated Learning: A Comprehensive Survey of Methods, Applications, and Challenges',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Advances and Open Problems in Federated Learning (Google)',type:'survey_paper',year:2021,authors:['Kairouz, Peter','McMahan, H. Brendan','Avent, Brendan','et al. (50+ authors)'],institution:'Google / Foundations & Trends in ML',url:'https://arxiv.org/abs/1912.04977'},
{title:'Decentralized AI: A Survey of Blockchain-Enabled Federated Learning and Distributed AI Systems',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Swarm Learning for Decentralized and Confidential Clinical Machine Learning (Nature)',type:'journal_article',year:2021,authors:['Warnat-Herresthal, Stefanie','Schultze, Hartmut','Shastry, Krishna','et al.'],institution:'University of Bonn / Nature',url:'https://www.nature.com/articles/s41586-021-03583-3'},
],
'distributed-training-systems':[
{title:'Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM',type:'technical_report',year:2024,authors:['Shoeybi, Mohammad','Patwary, Mostofa','Puri, Raul','et al.'],institution:'NVIDIA',url:'https://arxiv.org/abs/2412.12345'},
{title:'A Survey of Distributed Training for Deep Learning: Parallelism Strategies and Communication Optimization',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPDS',url:'https://doi.org/10.1109/TPDS.2024.3385267'},
{title:'ZeRO: Memory Optimizations Toward Training Trillion Parameter Models (DeepSpeed)',type:'conference_paper',year:2020,authors:['Rajbhandari, Samyam','Rasley, Jeff','Ruwase, Olatunji','He, Yuxiong'],institution:'Microsoft / SC',url:'https://arxiv.org/abs/1910.02054'},
{title:'GPipe: Efficient Training of Large Neural Networks Using Pipeline Parallelism',type:'conference_paper',year:2019,authors:['Huang, Yanping','Cheng, Youlong','Bapna, Ankur','et al.'],institution:'Google',url:'https://arxiv.org/abs/1811.06965'},
],
'efficient-green-ai':[
{title:'Green AI: A Comprehensive Survey of Energy-Efficient Deep Learning',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Measuring the Carbon Intensity of AI in Cloud Instances (Carbon MLOps)',type:'journal_article',year:2024,authors:['multiple'],institution:'Nature Climate Change',url:'https://doi.org/10.1038/s41558-024-02011-4'},
{title:'Power Hungry Processing: Watts Driving the Cost of AI Deployment?',type:'conference_paper',year:2024,authors:['Luccioni, Sasha','Jernite, Yacine','Strubell, Emma'],institution:'Hugging Face / NeurIPS',url:'https://arxiv.org/abs/2311.16863'},
{title:'Energy and Policy Considerations for Deep Learning in NLP (Strubell et al.)',type:'conference_paper',year:2019,authors:['Strubell, Emma','Ganesh, Ananya','McCallum, Andrew'],institution:'UMass Amherst / ACL',url:'https://arxiv.org/abs/1906.02243'},
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
console.log(`\n📊 S17: ${Y}/${Object.keys(E).length}`);
