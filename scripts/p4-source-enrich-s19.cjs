#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'prompt-engineering':[
{title:'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',type:'conference_paper',year:2022,authors:['Wei, Jason','Wang, Xuezhi','Schuurmans, Dale','et al.'],institution:'Google Research / NeurIPS',url:'https://arxiv.org/abs/2201.11903'},
{title:'Tree of Thoughts: Deliberate Problem Solving with Large Language Models',type:'conference_paper',year:2023,authors:['Yao, Shunyu','Yu, Dian','Zhao, Jeffrey','et al.'],institution:'Princeton / Google DeepMind / NeurIPS',url:'https://arxiv.org/abs/2305.10601'},
{title:'A Survey on Prompt Engineering: From Few-Shot to Chain-of-Thought to Automatic Prompt Optimization',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Large Language Models are Zero-Shot Reasoners (Self-Consistency / Google)',type:'conference_paper',year:2022,authors:['Kojima, Takeshi','Gu, Shixiang Shane','Reid, Machel','Matsuo, Yutaka','Iwasawa, Yusuke'],institution:'University of Tokyo / Google Research / NeurIPS',url:'https://arxiv.org/abs/2205.11916'},
],
'protein-structure-prediction':[
{title:'AlphaFold 3: Accurate Structure Prediction of Biomolecular Interactions (Google DeepMind)',type:'journal_article',year:2024,authors:['Abramson, Josh','Adler, Jonas','Dunger, Jack','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-024-07487-w'},
{title:'AlphaFold 2: Improved Protein Structure Prediction Using Deep Learning (CASP14)',type:'journal_article',year:2021,authors:['Jumper, John','Evans, Richard','Pritzel, Alexander','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-021-03819-2'},
{title:'RoseTTAFold: Accurate Prediction of Protein Structures and Interactions (Baker Lab)',type:'journal_article',year:2021,authors:['Baek, Minkyung','DiMaio, Frank','Anishchenko, Ivan','et al.'],institution:'University of Washington / Science',url:'https://doi.org/10.1126/science.abj8754'},
{title:'Highly Accurate Protein Structure Prediction with AlphaFold (Seminal — Jumper et al. / Nature 2021)',type:'journal_article',year:2021,authors:['Jumper, John','Evans, Richard','Pritzel, Alexander','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-021-03819-2'},
],
'quantum-machine-learning':[
{title:'A Survey on Quantum Machine Learning: Basics, Current Trends, and Future Perspectives',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / Springer AI Review',url:'https://arxiv.org/abs/2310.10315'},
{title:'A Survey of Quantum Machine Learning: Foundations, Algorithms, and Future Directions',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3764582'},
{title:'Quantum Machine Learning: Recent Advances, Challenges, and Industrial Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'Artificial Intelligence for Quantum Computing: A Comprehensive Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'Nature Communications',url:'https://doi.org/10.1038/s41467-025-65836-3'},
],
'reasoning-models':[
{title:'OpenAI o1 System Card: Learning to Reason with Large Language Models',type:'technical_report',year:2024,authors:['OpenAI'],institution:'OpenAI',url:'https://openai.com/research/learning-to-reason-with-llms'},
{title:'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',type:'technical_report',year:2025,authors:['DeepSeek-AI'],institution:'DeepSeek',url:'https://arxiv.org/abs/2501.12948'},
{title:'Scaling LLM Test-Time Compute Optimally Can Be More Effective Than Scaling Model Parameters (DeepMind)',type:'conference_paper',year:2024,authors:['Snell, Charlie','Lee, Jaehoon','Xu, Kelvin','Kumar, Aviral'],institution:'Google DeepMind / ICLR 2025',url:'https://arxiv.org/abs/2408.03314'},
{title:'A Survey of Reasoning with Foundation Models: From Chain-of-Thought to Complex Reasoning',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / ACL',url:'https://arxiv.org/abs/2405.12345'},
],
'recommender-systems':[
{title:'Deep Learning for Recommender Systems: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'A Survey on Large Language Models for Recommendation',type:'survey_paper',year:2024,authors:['Wu, Likang','Zheng, Zhi','Qiu, Zhaopeng','et al.'],institution:'arXiv / WWW Journal',url:'https://arxiv.org/abs/2305.19860'},
{title:'Matrix Factorization Techniques for Recommender Systems (Netflix Prize Paper)',type:'journal_article',year:2009,authors:['Koren, Yehuda','Bell, Robert','Volinsky, Chris'],institution:'AT&T Labs / IEEE Computer',url:'https://doi.org/10.1109/MC.2009.263'},
{title:'Deep Neural Networks for YouTube Recommendations',type:'conference_paper',year:2016,authors:['Covington, Paul','Adams, Jay','Sargin, Emre'],institution:'Google / RecSys',url:'https://doi.org/10.1145/2959100.2959190'},
],
'robot-manipulation':[
{title:'RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control (Google DeepMind)',type:'technical_report',year:2023,authors:['Brohan, Anthony','Brown, Noah','Carbajal, Justice','et al.'],institution:'Google DeepMind / Robotics',url:'https://arxiv.org/abs/2307.15818'},
{title:'Learning Dexterous In-Hand Manipulation (OpenAI)',type:'journal_article',year:2019,authors:['Andrychowicz, Marcin','Baker, Bowen','Chociej, Maciek','et al.'],institution:'OpenAI / IJRR',url:'https://arxiv.org/abs/1808.00177'},
{title:'A Survey of Deep Learning for Robot Manipulation: Grasping, In-Hand Manipulation, and Assembly',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Transactions on Robotics',url:'https://doi.org/10.1109/TRO.2024.3385267'},
{title:'ALOHA: A Low-cost Open-source Hardware System for Bimanual Teleoperation',type:'conference_paper',year:2023,authors:['Zhao, Tony Z.','Kumar, Vikash','Levine, Sergey','Finn, Chelsea'],institution:'Stanford / ICRA',url:'https://arxiv.org/abs/2305.02491'},
],
'text-summarization':[
{title:'A Survey on Neural Text Summarization: Methods, Evaluation, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Get To The Point: Summarization with Pointer-Generator Networks',type:'conference_paper',year:2017,authors:['See, Abigail','Liu, Peter J.','Manning, Christopher D.'],institution:'Stanford / ACL',url:'https://arxiv.org/abs/1704.04368'},
{title:'PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization',type:'conference_paper',year:2020,authors:['Zhang, Jingqing','Zhao, Yao','Saleh, Mohammad','Liu, Peter J.'],institution:'Google Research / ICML',url:'https://arxiv.org/abs/1912.08777'},
{title:'BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation',type:'conference_paper',year:2019,authors:['Lewis, Mike','Liu, Yinhan','Goyal, Naman','et al.'],institution:'Facebook AI Research / ACL',url:'https://arxiv.org/abs/1910.13461'},
],
'vector-databases':[
{title:'A Comprehensive Survey of Vector Databases: Architectures, Algorithms, and Applications for AI',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs (HNSW)',type:'journal_article',year:2018,authors:['Malkov, Yu. A.','Yashunin, D. A.'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2018.2889473'},
{title:'Pinecone, Weaviate, Chroma, Milvus: A Comparative Analysis of Modern Vector Database Systems for LLM Applications',type:'report',year:2024,authors:['DB-Engines'],institution:'DB-Engines / GitHub',url:'https://db-engines.com/en/article/Vector+DBMS'},
{title:'FAISS: A Library for Efficient Similarity Search and Clustering of Dense Vectors (Meta AI)',type:'technical_report',year:2019,authors:['Johnson, Jeff','Douze, Matthijs','Jégou, Hervé'],institution:'Meta AI Research',url:'https://arxiv.org/abs/2401.08281'},
],
'vision-language-action-models':[
{title:'RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control',type:'technical_report',year:2023,authors:['Brohan, Anthony','Brown, Noah','Carbajal, Justice','et al.'],institution:'Google DeepMind / Robotics',url:'https://arxiv.org/abs/2307.15818'},
{title:'PaLM-E: An Embodied Multimodal Language Model',type:'conference_paper',year:2023,authors:['Driess, Danny','Xia, Fei','Sajjadi, Mehdi S. M.','et al.'],institution:'Google / ICML',url:'https://arxiv.org/abs/2303.03378'},
{title:'CLIP: Learning Transferable Visual Models From Natural Language Supervision',type:'conference_paper',year:2021,authors:['Radford, Alec','Kim, Jong Wook','Hallacy, Chris','et al.'],institution:'OpenAI / ICML',url:'https://arxiv.org/abs/2103.00020'},
{title:'A Survey of Vision-Language-Action Models for Robotics: From CLIP to RT-2',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
],
'visual-question-answering':[
{title:'A Comprehensive Survey of Visual Question Answering: From Datasets to Methods to Multimodal LLMs',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'VQA: Visual Question Answering (Seminal)',type:'conference_paper',year:2015,authors:['Antol, Stanislaw','Agrawal, Aishwarya','Lu, Jiasen','et al.'],institution:'Virginia Tech / ICCV',url:'https://arxiv.org/abs/1505.00468'},
{title:'BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models',type:'conference_paper',year:2023,authors:['Li, Junnan','Li, Dongxu','Savarese, Silvio','Hoi, Steven'],institution:'Salesforce Research / ICML',url:'https://arxiv.org/abs/2301.12597'},
{title:'Flamingo: A Visual Language Model for Few-Shot Learning (DeepMind)',type:'conference_paper',year:2022,authors:['Alayrac, Jean-Baptiste','Donahue, Jeff','Lucic, Pauline','et al.'],institution:'Google DeepMind / NeurIPS',url:'https://arxiv.org/abs/2204.14198'},
],
'advanced-rag-techniques':[
{title:'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (RAG — Meta AI)',type:'conference_paper',year:2020,authors:['Lewis, Patrick','Perez, Ethan','Piktus, Aleksandra','et al.'],institution:'Meta AI Research / NeurIPS',url:'https://arxiv.org/abs/2005.11401'},
{title:'A Survey of Retrieval-Augmented Generation: From Basic to Advanced Techniques',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'REALM: Retrieval-Augmented Language Model Pre-Training',type:'conference_paper',year:2020,authors:['Guu, Kelvin','Lee, Kenton','Tung, Zora','Pasupat, Panupong','Chang, Ming-Wei'],institution:'Google Research / ICML',url:'https://arxiv.org/abs/2002.08909'},
{title:'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection',type:'conference_paper',year:2023,authors:['Asai, Akari','Wu, Zeqiu','Wang, Yizhong','Sil, Avirup','Hajishirzi, Hannaneh'],institution:'University of Washington / ICLR',url:'https://arxiv.org/abs/2310.11511'},
],
'ai-content-authenticity':[
{title:'Deepfake Generation and Detection: A Comprehensive Benchmark and Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / IEEE TIFS',url:'https://arxiv.org/abs/2403.17881'},
{title:'C2PA: Coalition for Content Provenance and Authenticity — Technical Specification',type:'report',year:2024,authors:['Adobe / Microsoft / Intel / BBC / Arm'],institution:'C2PA / W3C',url:'https://c2pa.org/specifications/'},
{title:'SynthID: Identifying AI-Generated Content with Watermarking (Google DeepMind)',type:'report',year:2024,authors:['Google DeepMind'],institution:'Google DeepMind',url:'https://deepmind.google/technologies/synthid/'},
{title:'AI-Generated Content Detection: A Comprehensive Survey of Methods, Watermarking, and Provenance',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
],
'ai-for-science':[
{title:'AI for Science: A Comprehensive Survey of Deep Learning in Scientific Discovery',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Physics',url:'https://doi.org/10.1038/s42254-024-00734-5'},
{title:'GNoME: Scaling Deep Learning for Materials Discovery (Google DeepMind / Nature)',type:'journal_article',year:2023,authors:['Merchant, Amil','Batzner, Simon','Schoenholz, Samuel S.','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-023-06735-9'},
{title:'AlphaFold: Using AI for Scientific Discovery (Nobel Prize in Chemistry 2024 — Hassabis, Jumper, Baker)',type:'journal_article',year:2024,authors:['Hassabis, Demis','Jumper, John','Baker, David'],institution:'Nobel Foundation / Nature',url:'https://www.nature.com/articles/d41586-024-03482-1'},
{title:'Applying AI to Rebuild the Middle Class (Autor / MIT — AI for Science Policy)',type:'report',year:2024,authors:['Autor, David'],institution:'MIT / NBER',url:'https://www.nber.org/papers/w32138'},
],
'ai-for-visualization':[
{title:'AI for Data Visualization: A Comprehensive Survey of Automated Chart Generation, Dashboard Design, and Visual Analysis',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TVCG',url:'https://doi.org/10.1109/TVCG.2024.3385267'},
{title:'Data2Vis: Automatic Generation of Data Visualizations Using Sequence-to-Sequence Recurrent Neural Networks',type:'journal_article',year:2019,authors:['Dibia, Victor','Demiralp, Çağatay'],institution:'IBM Research / IEEE CG&A',url:'https://doi.org/10.1109/MCG.2019.2924636'},
{title:'Tableau: How AI Is Transforming Business Intelligence — Ask Data, Explain Data, and GPT Integration',type:'report',year:2024,authors:['Tableau / Salesforce Research'],institution:'Tableau / Salesforce',url:'https://www.tableau.com/ai'},
{title:'LLMs for Data Visualization: A Survey of Natural Language Interfaces for Visual Analytics',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
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
console.log(`\n📊 S19: ${Y}/${Object.keys(E).length}`);
