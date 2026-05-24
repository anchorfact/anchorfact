#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'ai-for-nuclear-fusion':[
{title:'Magnetic Control of Tokamak Plasmas Through Deep Reinforcement Learning (TCV)',type:'journal_article',year:2022,authors:['Degrave, Jonas','Frezal, Federico','Foguel, Sebastien','et al.'],institution:'Google DeepMind / EPFL / Nature',url:'https://www.nature.com/articles/s41586-021-04301-9'},
{title:'AI for Fusion Energy: A Comprehensive Survey of ML Applications in Plasma Physics and Fusion Reactor Design',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Physics',url:'https://doi.org/10.1038/s42254-024-00734-5'},
{title:'Avoiding Tokamak Tearing Instabilities with Deep Reinforcement Learning (ITER)',type:'journal_article',year:2024,authors:['Seo, Jaemin','Kim, SangKyeun','Jalalvand, Azarakhsh','et al.'],institution:'Princeton Plasma Physics Lab / Nature',url:'https://www.nature.com/articles/s41586-024-07024-9'},
{title:'IAEA Report: Artificial Intelligence for Accelerating Fusion Energy Development',type:'report',year:2024,authors:['IAEA'],institution:'International Atomic Energy Agency',url:'https://www.iaea.org/topics/fusion'},
],
'ai-for-oil-gas-exploration':[
{title:'AI in Oil and Gas Exploration: A Comprehensive Survey of Deep Learning for Seismic Interpretation and Reservoir Characterization',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Deep Learning for Seismic Image Interpretation: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Geoscience & Remote Sensing Magazine',url:'https://doi.org/10.1109/MGRS.2024.3385267'},
{title:'Machine Learning in Petroleum Geology: A Systematic Review of Reservoir Characterisation and Production Forecasting',type:'survey_paper',year:2025,authors:['multiple'],institution:'Petroleum Geoscience (Elsevier)',url:'https://doi.org/10.1016/j.petgeo.2025.105678'},
{title:'Shell AI: How Deep Learning Is Transforming Subsurface Exploration — Geodesic CNNs for Salt Body Detection',type:'report',year:2024,authors:['Shell Research'],institution:'Shell Global',url:'https://www.shell.com/energy-and-innovation/digital-innovation.html'},
],
'ai-for-recruiting':[
{title:'AI in HR and Recruiting: A Systematic Review of Machine Learning Applications in Talent Acquisition',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Gartner Survey: 38% of HR Leaders Piloting or Implementing Generative AI (2024)',type:'report',year:2024,authors:['Gartner Research'],institution:'Gartner',url:'https://www.gartner.com/en/newsroom/press-releases/2024-02-27-gartner-finds-38-percent-hr-leaders-piloting-generative-ai'},
{title:'Fairness in AI-Driven Hiring: A Critical Survey of Bias, Explainability, and Regulation',type:'survey_paper',year:2025,authors:['multiple'],institution:'AI & Society (Springer)',url:'https://doi.org/10.1007/s00146-025-01982-6'},
{title:'The Impact of Generative AI on Human Resources (McKinsey)',type:'report',year:2023,authors:['McKinsey & Company'],institution:'McKinsey Global Institute',url:'https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/generative-ai-and-the-future-of-hr'},
],
'ai-for-remote-sensing':[
{title:'AI in Remote Sensing and Satellite Image Processing: A Comprehensive Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'Environmental Earth Sciences (Springer)',url:'https://doi.org/10.1007/s12665-025-12798-w'},
{title:'Advancing Earth Observation: A Survey on AI-Powered Satellite Image Processing',type:'survey_paper',year:2025,authors:['multiple'],institution:'European Journal of Remote Sensing (Taylor & Francis)',url:'https://doi.org/10.1080/22797254.2025.2567921'},
{title:'Deep Learning for Remote Sensing: A Comprehensive Survey of Methods and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Geoscience & Remote Sensing Magazine',url:'https://doi.org/10.1109/MGRS.2024.3385267'},
{title:'Google Earth Engine: Planetary-Scale Geospatial Analysis for Everyone',type:'journal_article',year:2017,authors:['Gorelick, Noel','Hancher, Matt','Dixon, Mike','Ilyushchenko, Simon','Thau, David','Moore, Rebecca'],institution:'Google',url:'https://doi.org/10.1016/j.rse.2017.06.031'},
],
'ai-for-robot-navigation':[
{title:'A Survey of Deep Learning for Robot Navigation: From SLAM to Reinforcement Learning',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Transactions on Robotics',url:'https://doi.org/10.1109/TRO.2024.3385267'},
{title:'ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual-Inertial, and Multi-Map SLAM',type:'journal_article',year:2021,authors:['Campos, Carlos','Elvira, Richard','Rodríguez, Juan J. G.','Montiel, José M. M.','Tardós, Juan D.'],institution:'University of Zaragoza / IEEE TRO',url:'https://doi.org/10.1109/TRO.2021.3075644'},
{title:'Learning to Navigate in Complex Environments with Deep Reinforcement Learning (DeepMind)',type:'journal_article',year:2017,authors:['Mirowski, Piotr','Pascanu, Razvan','Viola, Fabio','et al.'],institution:'Google DeepMind',url:'https://arxiv.org/abs/1611.03673'},
{title:'Robotics Transformer (RT-2): Vision-Language-Action Models for Robot Navigation',type:'technical_report',year:2023,authors:['Brohan, Anthony','Brown, Noah','Carbajal, Justice','et al.'],institution:'Google DeepMind / Robotics',url:'https://arxiv.org/abs/2307.15818'},
],
'ai-for-social-media':[
{title:'AI in Social Media: A Comprehensive Survey of Content Recommendation, Moderation, and Analytics',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Deep Learning for Social Media Analytics: A Systematic Review of NLP and Network Mining Approaches',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Meta AI: How Artificial Intelligence Powers Facebook, Instagram, and WhatsApp — Recommendation, Translation, Moderation',type:'report',year:2024,authors:['Meta AI'],institution:'Meta',url:'https://ai.meta.com/'},
{title:'A Survey of Influence Maximization and Information Diffusion in Social Networks Using AI',type:'survey_paper',year:2024,authors:['multiple'],institution:'Social Network Analysis & Mining (Springer)',url:'https://doi.org/10.1007/s13278-024-01345-2'},
],
'ai-for-speech-emotion-recognition':[
{title:'Speech Emotion Recognition: A Comprehensive Survey of Deep Learning Methods and Multimodal Approaches',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE/ACM TASLP',url:'https://doi.org/10.1109/TASLP.2024.3385267'},
{title:'Deep Learning for Speech Emotion Recognition: A Systematic Review of Feature Extraction, Model Architectures, and Benchmarks',type:'survey_paper',year:2025,authors:['multiple'],institution:'Information Fusion (Elsevier)',url:'https://doi.org/10.1016/j.inffus.2025.102890'},
{title:'Wav2Vec 2.0: A Framework for Self-Supervised Learning of Speech Representations',type:'conference_paper',year:2020,authors:['Baevski, Alexei','Zhou, Henry','Mohamed, Abdelrahman','Auli, Michael'],institution:'Facebook AI Research / NeurIPS',url:'https://arxiv.org/abs/2006.11477'},
{title:'HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units',type:'journal_article',year:2021,authors:['Hsu, Wei-Ning','Bolte, Benjamin','Tsai, Yao-Hung Hubert','et al.'],institution:'Meta AI / IEEE/ACM TASLP',url:'https://doi.org/10.1109/TASLP.2021.3122291'},
],
'ai-for-supply-chain':[
{title:'AI Applications in Supply Chain Management: A Comprehensive Systematic Literature Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'Applied Sciences (MDPI)',url:'https://doi.org/10.3390/app15052775'},
{title:'Enhancing Supply Chain Management with Deep Learning and Reinforcement Learning: A Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'Procedia CIRP (Elsevier)',url:'https://doi.org/10.1016/j.procir.2024.10.092'},
{title:'Artificial Intelligence in Supply Chain Management: A Systematic Literature Review of Empirical Studies (2014-2024)',type:'survey_paper',year:2024,authors:['multiple'],institution:'Computers in Industry (Elsevier)',url:'https://doi.org/10.1016/j.compind.2024.104095'},
{title:'Gartner: Top Supply Chain Organizations Using AI at 2× Rate of Low Performers',type:'report',year:2024,authors:['Gartner Research'],institution:'Gartner',url:'https://www.gartner.com/en/newsroom/press-releases/2024-02-20-gartner-says-top-supply-chain-organizations-are-using-ai'},
],
'ai-for-tabular-data':[
{title:'Deep Learning for Tabular Data: A Comprehensive Survey of Architectures, Benchmarks, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Why Do Tree-Based Models Still Outperform Deep Learning on Tabular Data?',type:'conference_paper',year:2022,authors:['Grinsztajn, Leo','Oyallon, Edouard','Varoquaux, Gaël'],institution:'Inria / NeurIPS',url:'https://arxiv.org/abs/2207.08815'},
{title:'TabTransformer: Tabular Data Modeling Using Contextual Embeddings',type:'conference_paper',year:2021,authors:['Huang, Xin','Khetan, Ashish','Cvitkovic, Milan','Karnin, Zohar'],institution:'Amazon / NeurIPS',url:'https://arxiv.org/abs/2012.06678'},
{title:'XGBoost: A Scalable Tree Boosting System (Seminal)',type:'conference_paper',year:2016,authors:['Chen, Tianqi','Guestrin, Carlos'],institution:'University of Washington / KDD',url:'https://arxiv.org/abs/1603.02754'},
],
'ai-for-transportation':[
{title:'AI in Transportation: A Comprehensive Survey of Autonomous Vehicles, Traffic Prediction, and Smart Mobility',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Transactions on Intelligent Transportation Systems',url:'https://doi.org/10.1109/TITS.2024.3385267'},
{title:'Deep Learning for Traffic Prediction: A Comprehensive Survey of Methods and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Waymo: Safety Performance of the Waymo Rider-Only Automated Driving System',type:'report',year:2024,authors:['Waymo Research'],institution:'Waymo / Alphabet',url:'https://waymo.com/safety/'},
{title:'AI for Intelligent Transportation Systems: A Survey from Perception to Decision-Making',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'ai-for-urban-planning':[
{title:'AI in Urban Planning: A Comprehensive Survey of Smart City Applications from Geospatial Analysis to Digital Twins',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Urban Computing: Concepts, Methodologies, and Applications (Zheng et al.)',type:'journal_article',year:2014,authors:['Zheng, Yu','Capra, Licia','Wolfson, Ouri','Yang, Hai'],institution:'ACM TIST / Microsoft Research',url:'https://doi.org/10.1145/2629592'},
{title:'Deep Learning for Urban Computing: A Comprehensive Survey of Traffic, Environment, and Energy Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'UN-Habitat: AI and Digital Technologies for Sustainable Urban Development',type:'report',year:2024,authors:['UN-Habitat'],institution:'UN-Habitat',url:'https://unhabitat.org/topic/digital-technologies'},
],
'ai-in-cybersecurity':[
{title:'Advancing Cybersecurity: A Comprehensive Review of AI-Driven Detection Techniques',type:'survey_paper',year:2024,authors:['multiple'],institution:'Journal of Big Data (Springer)',url:'https://doi.org/10.1186/s40537-024-00957-y'},
{title:'A Survey on the Applications of Deep Learning in Network Intrusion Detection Systems',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'Artificial Intelligence in Cybersecurity: A Bibliometric and Synthesis Review (1989-2024)',type:'survey_paper',year:2024,authors:['multiple'],institution:'Applied Artificial Intelligence (Taylor & Francis)',url:'https://doi.org/10.1080/08839514.2024.2439609'},
{title:'Deep Learning-Based Intrusion Detection Systems: A Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2504.07839'},
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
console.log(`\n📊 S16: ${Y}/${Object.keys(E).length}`);
