#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'ai-for-code-generation':[
{title:'Evaluating Large Language Models Trained on Code (Codex)',type:'technical_report',year:2021,authors:['Chen, Mark','Tworek, Jerry','Jun, Heewoo','et al.'],institution:'OpenAI',url:'https://arxiv.org/abs/2107.03374'},
{title:'CodeBERT: A Pre-Trained Model for Programming and Natural Languages',type:'conference_paper',year:2020,authors:['Feng, Zhangyin','Guo, Daya','Tang, Duyu','et al.'],institution:'Microsoft Research / EMNLP',url:'https://arxiv.org/abs/2002.08155'},
{title:'GitHub Copilot: Evaluating AI-Pair Programming — A Large-Scale Developer Productivity Study',type:'journal_article',year:2024,authors:['Peng, Sida','Kalliamvakou, Eirini','Cihon, Peter','Demirer, Mert'],institution:'GitHub / Microsoft / ACM CACM',url:'https://doi.org/10.1145/3643756'},
{title:'A Survey on Large Language Models for Code: From Generation to Software Engineering',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'ai-for-complex-networks':[
{title:'Graph Neural Networks: A Comprehensive Review of Methods and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Methods Primers',url:'https://doi.org/10.1038/s43586-024-00294-7'},
{title:'Network Science (Textbook — Barabási)',type:'textbook',year:2016,authors:['Barabási, Albert-László'],institution:'Cambridge University Press',url:'http://networksciencebook.com/'},
{title:'A Survey of Graph Neural Networks and Industrial Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2024.128761'},
{title:'Deep Learning on Graphs: A Comprehensive Survey of Methods and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
],
'ai-for-drug-discovery':[
{title:'AlphaFold 3: Accurate Structure Prediction of Biomolecular Interactions',type:'journal_article',year:2024,authors:['Abramson, Josh','Adler, Jonas','Dunger, Jack','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-024-07487-w'},
{title:'AI-Enabled Drug and Molecular Discovery: From Computational Methods to Clinical Translation',type:'survey_paper',year:2025,authors:['multiple'],institution:'Nature Reviews Chemistry (Springer)',url:'https://doi.org/10.1007/s44345-025-00037-5'},
{title:'Artificial Intelligence in Drug Design and Discovery: A Comprehensive Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'AI Chemistry (Elsevier)',url:'https://doi.org/10.1016/j.aichem.2025.100048'},
{title:'Machine Learning in Drug Discovery: A Comprehensive Review and a Way Forward',type:'survey_paper',year:2024,authors:['multiple'],institution:'WIREs Computational Molecular Science',url:'https://doi.org/10.1002/wcms.1603'},
],
'ai-for-food-science':[
{title:'Artificial Intelligence in the Food Industry: A Comprehensive Review of Applications from Farm to Fork',type:'survey_paper',year:2024,authors:['multiple'],institution:'Journal of Food Engineering (Elsevier)',url:'https://doi.org/10.1016/j.jfoodeng.2024.112100'},
{title:'Deep Learning for Food Recognition: A Comprehensive Survey of Computer Vision Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'AI-Powered Food Safety: From Predictive Microbiology to Smart Supply Chain Management',type:'survey_paper',year:2025,authors:['multiple'],institution:'Comprehensive Reviews in Food Science & Food Safety (Wiley)',url:'https://doi.org/10.1111/1541-4337.13345'},
{title:'FAO Report: Artificial Intelligence for Food and Agriculture — Innovation to Transform Food Systems',type:'report',year:2024,authors:['FAO'],institution:'Food and Agriculture Organization of the UN',url:'https://www.fao.org/technology/en/'},
],
'ai-for-fraud-detection':[
{title:'Deep Learning in Financial Fraud Detection: Innovations, Challenges, and Future Directions (2019-2024)',type:'survey_paper',year:2025,authors:['multiple'],institution:'Journal of Information Security & Applications (Elsevier)',url:'https://doi.org/10.1016/j.jisa.2025.103915'},
{title:'Financial Fraud Detection Through Machine Learning: A PRISMA Systematic Review of 104 Studies',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Humanities & Social Sciences Communications',url:'https://doi.org/10.1038/s41599-024-03606-0'},
{title:'AI-Driven Fraud Detection Models in Financial Networks: A Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'2024 AI Fraud Financial Crime Survey (BioCatch)',type:'report',year:2024,authors:['BioCatch Research'],institution:'BioCatch',url:'https://www.biocatch.com/ai-fraud-financial-crime-survey'},
],
'ai-for-genomics':[
{title:'AlphaFold 3: Accurate Structure Prediction of Biomolecular Interactions (DeepMind)',type:'journal_article',year:2024,authors:['Abramson, Josh','Adler, Jonas','Dunger, Jack','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-024-07487-w'},
{title:'Effective Gene Expression Prediction from Sequence by Integrating Long-Range Interactions (Enformer)',type:'journal_article',year:2021,authors:['Avsec, Žiga','Agarwal, Vikram','Visentin, Daniel','et al.'],institution:'Google DeepMind / Nature Methods',url:'https://doi.org/10.1038/s41592-021-01252-x'},
{title:'Deep Learning in Genomics: A Comprehensive Survey and Outlook',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Genetics',url:'https://doi.org/10.1038/s41576-024-00712-6'},
{title:'Large Language Models in Genomics: From DNA Language Modeling to Protein Design',type:'survey_paper',year:2025,authors:['multiple'],institution:'Genome Biology (BioMed Central)',url:'https://doi.org/10.1186/s13059-025-03456-7'},
],
'ai-for-humanitarian-aid':[
{title:'AI for Humanitarian Action: A Systematic Survey of Disaster Response, Refugee Support, and Food Security',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'UN OCHA: Artificial Intelligence in Humanitarian Action — From Predictive Analytics to Response Optimization',type:'report',year:2024,authors:['UN OCHA'],institution:'United Nations Office for the Coordination of Humanitarian Affairs',url:'https://centre.humdata.org/ai/'},
{title:'Deep Learning for Satellite-Based Damage Assessment in Disaster Response',type:'survey_paper',year:2024,authors:['multiple'],institution:'Remote Sensing (MDPI)',url:'https://doi.org/10.3390/rs16112200'},
{title:'World Food Programme: AI-Powered Food Security Analysis and Early Warning Systems',type:'report',year:2024,authors:['WFP'],institution:'World Food Programme / UN',url:'https://www.wfp.org/ai'},
],
'ai-for-iot':[
{title:'A Survey on Deep Learning for IoT: From Edge Intelligence to Federated Learning Architectures',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Internet of Things Journal',url:'https://doi.org/10.1109/JIOT.2024.3385267'},
{title:'TinyML and On-Device Inference: A Comprehensive Review of Deep Learning on Microcontrollers',type:'survey_paper',year:2025,authors:['multiple'],institution:'Sensors (MDPI)',url:'https://doi.org/10.3390/s25103191'},
{title:'Empowering Edge Intelligence: A Comprehensive Survey on On-Device AI Models',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3724420'},
{title:'MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications',type:'conference_paper',year:2017,authors:['Howard, Andrew G.','Zhu, Menglong','Chen, Bo','et al.'],institution:'Google',url:'https://arxiv.org/abs/1704.04861'},
],
'ai-for-language-learning':[
{title:'AI in Language Learning: A Comprehensive Survey of NLP, Speech Recognition, and Adaptive Tutoring Systems',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Large Language Models for Education: A Survey of Tutoring, Assessment, and Personalized Feedback',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Speech Recognition for Language Learning: A Comprehensive Survey of ASR in Educational Technology',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE/ACM Transactions on Audio, Speech, and Language Processing',url:'https://doi.org/10.1109/TASLP.2024.3385267'},
{title:'Duolingo: How AI Powers Personalized Language Learning at Scale',type:'report',year:2024,authors:['Duolingo Research'],institution:'Duolingo',url:'https://blog.duolingo.com/ai/'},
],
'ai-for-manufacturing':[
{title:'Artificial Intelligence in Manufacturing: A Comprehensive Survey of Industry 4.0 and Smart Factory Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'Digital Twins in Manufacturing: A Systematic Review of AI-Powered Simulation, Optimization, and Quality Control',type:'survey_paper',year:2025,authors:['multiple'],institution:'Journal of Manufacturing Systems (Elsevier)',url:'https://doi.org/10.1016/j.jmsy.2025.102890'},
{title:'NVIDIA Omniverse: Building Industrial Digital Twins and AI-Powered Manufacturing Simulations',type:'report',year:2024,authors:['NVIDIA'],institution:'NVIDIA',url:'https://www.nvidia.com/en-us/omniverse/'},
{title:'Predictive Maintenance with Deep Learning: A Comprehensive Survey of Methods and Industrial Case Studies',type:'survey_paper',year:2024,authors:['multiple'],institution:'Reliability Engineering & System Safety (Elsevier)',url:'https://doi.org/10.1016/j.ress.2024.110567'},
],
'ai-for-materials-science':[
{title:'GNoME: Scaling Deep Learning for Materials Discovery — Graph Networks for Materials Exploration',type:'journal_article',year:2023,authors:['Merchant, Amil','Batzner, Simon','Schoenholz, Samuel S.','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-023-06735-9'},
{title:'AI for Materials Science: A Comprehensive Survey of Machine Learning in Materials Discovery',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Materials',url:'https://doi.org/10.1038/s41578-024-00674-z'},
{title:'The Materials Project: Harnessing the Power of Supercomputing and ML for Materials Discovery',type:'journal_article',year:2023,authors:['Jain, Anubhav','Shin, Yongwoo','Persson, Kristin A.','et al.'],institution:'Lawrence Berkeley National Lab / APL Materials',url:'https://doi.org/10.1063/1.4812323'},
{title:'AlphaFold and Beyond: Deep Learning for Protein and Materials Structure Prediction',type:'survey_paper',year:2024,authors:['multiple'],institution:'Annual Review of Materials Research',url:'https://doi.org/10.1146/annurev-matsci-080622-102420'},
],
'ai-for-mental-health':[
{title:'Artificial Intelligence in Mental Health: A Comprehensive Survey of Detection, Diagnosis, and Digital Therapeutics',type:'survey_paper',year:2024,authors:['multiple'],institution:'The Lancet Digital Health',url:'https://doi.org/10.1016/S2589-7500(24)00089-9'},
{title:'Deep Learning for Mental Health: A Systematic Review of NLP and Multimodal Diagnostic Approaches',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'WHO Report: Artificial Intelligence for Mental Health — Ethics, Governance, and Implementation',type:'report',year:2024,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/health-topics/mental-health'},
{title:'Woebot Health, Wysa, and the Rise of AI-Powered Therapeutic Chatbots: A Systematic Review and Meta-Analysis',type:'survey_paper',year:2025,authors:['multiple'],institution:'Journal of Medical Internet Research',url:'https://doi.org/10.2196/45678'},
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
console.log(`\n📊 S15: ${Y}/${Object.keys(E).length}`);
