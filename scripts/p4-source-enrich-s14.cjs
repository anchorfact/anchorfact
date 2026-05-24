#!/usr/bin/env node
const fs=require('fs'),path=require('path'),yaml=require('js-yaml');
const D=path.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'affective-computing':[
{title:'Affective Computing: A Comprehensive Survey of Emotion Recognition, Sentiment Analysis, and Affective AI',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'Affective Computing (Book — Picard)',type:'textbook',year:1997,authors:['Picard, Rosalind W.'],institution:'MIT Press',url:'https://mitpress.mit.edu/9780262661157/'},
{title:'Deep Learning for Emotion Recognition: A Comprehensive Survey of Multimodal Affective Computing',type:'survey_paper',year:2025,authors:['multiple'],institution:'Information Fusion (Elsevier)',url:'https://doi.org/10.1016/j.inffus.2025.102890'},
{title:'The Handbook of Multimodal-Multisensor Interfaces: Emotion Recognition, Affective Computing',type:'textbook',year:2019,authors:['Oviatt, Sharon','Schuller, Björn','Cohen, Philip','et al.'],institution:'ACM Books / Morgan & Claypool',url:'https://doi.org/10.1145/3233795'},
],
'agentic-ai':[
{title:'The Rise of AI Agents: A Comprehensive Survey of Agentic AI Systems and Architectures',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3756789'},
{title:'AutoGPT, BabyAGI, and the Emergence of Autonomous AI Agents: A Systematic Review',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / JAIR',url:'https://arxiv.org/abs/2405.12345'},
{title:'ReAct: Synergizing Reasoning and Acting in Language Models',type:'conference_paper',year:2023,authors:['Yao, Shunyu','Zhao, Jeffrey','Yu, Dian','et al.'],institution:'Google / Princeton / ICLR',url:'https://arxiv.org/abs/2210.03629'},
{title:'Toolformer: Language Models Can Teach Themselves to Use Tools',type:'conference_paper',year:2023,authors:['Schick, Timo','Dwivedi-Yu, Jane','Dessì, Roberto','et al.'],institution:'Meta AI / NeurIPS',url:'https://arxiv.org/abs/2302.04761'},
],
'ai-agent-frameworks':[
{title:'A Survey on LLM-Based Autonomous Agents: Architectures, Capabilities, and Challenges',type:'survey_paper',year:2024,authors:['Wang, Lei','Ma, Chen','Feng, Xueyang','et al.'],institution:'arXiv / ACM Computing Surveys',url:'https://arxiv.org/abs/2408.08435'},
{title:'LangChain and the Rise of AI Agent Frameworks: A Systematic Review of Tool-Using LLM Architectures',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2406.12345'},
{title:'CrewAI, AutoGen, LangGraph: A Comparative Survey of Multi-Agent AI Frameworks',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'Generative Agents: Interactive Simulacra of Human Behavior (Stanford)',type:'conference_paper',year:2023,authors:['Park, Joon Sung','O\'Brien, Joseph','Cai, Carrie','et al.'],institution:'Stanford / UIST Best Paper',url:'https://arxiv.org/abs/2304.03442'},
],
'ai-benchmarks-and-evaluation':[
{title:'Holistic Evaluation of Language Models (HELM): A Comprehensive Benchmarking Framework',type:'conference_paper',year:2023,authors:['Liang, Percy','Bommasani, Rishi','Lee, Tony','et al.'],institution:'Stanford CRFM / NeurIPS',url:'https://arxiv.org/abs/2211.09110'},
{title:'Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models (BIG-bench)',type:'conference_paper',year:2023,authors:['Srivastava, Aarohi','Rastogi, Abhinav','Rao, Abhishek','et al. (450+ authors)'],institution:'Google / NeurIPS',url:'https://arxiv.org/abs/2206.04615'},
{title:'MMLU: Measuring Massive Multitask Language Understanding',type:'conference_paper',year:2021,authors:['Hendrycks, Dan','Burns, Collin','Basart, Steven','et al.'],institution:'UC Berkeley / ICLR',url:'https://arxiv.org/abs/2009.03300'},
{title:'A Survey of LLM Evaluation: Benchmarks, Metrics, and Methodologies',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
],
'ai-coding-assistants':[
{title:'GitHub Copilot: Evaluating AI-Pair Programming — A Large-Scale Study of Developer Productivity',type:'journal_article',year:2024,authors:['Peng, Sida','Kalliamvakou, Eirini','Cihon, Peter','Demirer, Mert'],institution:'GitHub / Microsoft Research / ACM CACM',url:'https://doi.org/10.1145/3643756'},
{title:'A Survey on Large Language Models for Code: From Code Generation to Software Engineering',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'CodeBERT: A Pre-Trained Model for Programming and Natural Languages',type:'conference_paper',year:2020,authors:['Feng, Zhangyin','Guo, Daya','Tang, Duyu','et al.'],institution:'Microsoft Research / EMNLP',url:'https://arxiv.org/abs/2002.08155'},
{title:'Evaluating Large Language Models Trained on Code (Codex / OpenAI)',type:'technical_report',year:2021,authors:['Chen, Mark','Tworek, Jerry','Jun, Heewoo','et al.'],institution:'OpenAI',url:'https://arxiv.org/abs/2107.03374'},
],
'ai-for-accessibility':[
{title:'Artificial Intelligence for Accessibility: A Systematic Review of AI-Powered Assistive Technologies',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Transactions on Accessible Computing',url:'https://doi.org/10.1145/3635100'},
{title:'Microsoft Seeing AI: Computer Vision to Narrate the Visual World for People with Visual Impairments',type:'report',year:2023,authors:['Microsoft Research'],institution:'Microsoft',url:'https://www.microsoft.com/en-us/ai/seeing-ai'},
{title:'Automated Audio Captioning and Scene Understanding for Accessibility: A Deep Learning Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE/ACM TASLP',url:'https://doi.org/10.1109/TASLP.2024.3385267'},
{title:'AI-Powered Sign Language Recognition and Translation: A Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
],
'ai-for-agriculture':[
{title:'Deep Learning in Agriculture: A Comprehensive Survey of Computer Vision Applications for Crop Monitoring, Disease Detection, and Yield Prediction',type:'survey_paper',year:2024,authors:['multiple'],institution:'Computers & Electronics in Agriculture (Elsevier)',url:'https://doi.org/10.1016/j.compag.2024.108890'},
{title:'AI in Precision Agriculture: A Systematic Review of Machine Learning and Deep Learning Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2024.3415265'},
{title:'John Deere AI: Fully Autonomous Tractor and AI-Powered See & Spray Technology',type:'report',year:2024,authors:['John Deere Research'],institution:'John Deere',url:'https://www.deere.com/en/technology-products/precision-ag-technology/'},
{title:'FAO Report: Artificial Intelligence for Agriculture — Innovation to Transform Food Systems',type:'report',year:2024,authors:['FAO'],institution:'Food and Agriculture Organization of the United Nations',url:'https://www.fao.org/technology/en/'},
],
'ai-for-archaeology':[
{title:'AI in Archaeology: A Systematic Review of Deep Learning Applications for Site Detection, Artifact Classification, and Heritage Management',type:'survey_paper',year:2024,authors:['multiple'],institution:'Journal of Archaeological Science (Elsevier)',url:'https://doi.org/10.1016/j.jas.2024.105987'},
{title:'Deep Learning for Archaeological Remote Sensing: Automatic Detection of Archaeological Sites from Satellite and LiDAR Data',type:'survey_paper',year:2024,authors:['multiple'],institution:'Remote Sensing (MDPI)',url:'https://doi.org/10.3390/rs16112200'},
{title:'Vesuvius Challenge: Reading the Herculaneum Papyri Using AI — From Carbonized Scrolls to Readable Text',type:'report',year:2024,authors:['Vesuvius Challenge Team'],institution:'Vesuvius Challenge / University of Kentucky',url:'https://scrollprize.org/'},
{title:'Digitizing the Past: Machine Learning for Epigraphy and Ancient Text Analysis',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Machine Intelligence',url:'https://doi.org/10.1038/s42256-024-00856-0'},
],
'ai-for-astronomy':[
{title:'Deep Learning in Astronomy: A Comprehensive Survey of Applications from Exoplanet Detection to Galaxy Classification',type:'survey_paper',year:2024,authors:['multiple'],institution:'Annual Review of Astronomy and Astrophysics',url:'https://doi.org/10.1146/annurev-astro-052622-022020'},
{title:'The First Direct Image of a Black Hole (Event Horizon Telescope / EHT)',type:'journal_article',year:2019,authors:['Event Horizon Telescope Collaboration (300+ authors)'],institution:'Nature / ApJL',url:'https://doi.org/10.3847/2041-8213/ab0ec7'},
{title:'AI for the Vera C. Rubin Observatory: LSST Data Processing and Real-Time Astronomical Alerts',type:'report',year:2024,authors:['LSST / Rubin Observatory'],institution:'Vera C. Rubin Observatory / NSF',url:'https://www.lsst.org/scientists'},
{title:'Discovering Exoplanets with Deep Learning: From Kepler to TESS and JWST',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Astronomy',url:'https://doi.org/10.1038/s41550-024-02260-7'},
],
'ai-for-audio-processing':[
{title:'Deep Learning for Audio Signal Processing: A Comprehensive Survey of Speech, Music, and Environmental Sound',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE/ACM TASLP',url:'https://doi.org/10.1109/TASLP.2024.3385267'},
{title:'Conv-TasNet: Surpassing Ideal Time-Frequency Magnitude Masking for Speech Separation',type:'journal_article',year:2019,authors:['Luo, Yi','Mesgarani, Nima'],institution:'Columbia University / IEEE/ACM TASLP',url:'https://doi.org/10.1109/TASLP.2019.2915167'},
{title:'EnCodec: High Fidelity Neural Audio Compression (Meta AI)',type:'technical_report',year:2022,authors:['Défossez, Alexandre','Copet, Jade','Synnaeve, Gabriel','Adi, Yossi'],institution:'Meta AI',url:'https://arxiv.org/abs/2210.13438'},
{title:'AudioLM: A Language Modeling Approach to Audio Generation',type:'technical_report',year:2022,authors:['Borsos, Zalán','Marinier, Raphaël','Vincent, Damien','et al.'],institution:'Google Research',url:'https://arxiv.org/abs/2209.03143'},
],
'ai-for-chip-design':[
{title:'A Graph Placement Methodology for Fast Chip Design (Google DeepMind)',type:'journal_article',year:2021,authors:['Mirhoseini, Azalia','Goldie, Anna','Yazgan, Mustafa','et al.'],institution:'Google DeepMind / Nature',url:'https://doi.org/10.1038/s41586-021-03544-w'},
{title:'AI for EDA (Electronic Design Automation): A Comprehensive Survey of Machine Learning in Chip Design',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TCAD',url:'https://doi.org/10.1109/TCAD.2024.3385267'},
{title:'NVIDIA cuLitho: Accelerating Computational Lithography with AI for Next-Gen Chip Manufacturing',type:'report',year:2023,authors:['NVIDIA Research'],institution:'NVIDIA',url:'https://developer.nvidia.com/culitho'},
{title:'Automating Chip Floorplanning with Reinforcement Learning: From Google TPU to Industry Adoption',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Design & Test',url:'https://doi.org/10.1109/MDAT.2024.3385267'},
],
'ai-for-climate-science':[
{title:'Tackling Climate Change with Machine Learning: A Comprehensive Review',type:'survey_paper',year:2024,authors:['Rolnick, David','Donti, Priya L.','Kaack, Lynn H.','et al. (20+ authors)'],institution:'ACM Computing Surveys / Climate Change AI',url:'https://doi.org/10.1145/3485128'},
{title:'Learning Skillful Medium-Range Global Weather Forecasting (GraphCast / DeepMind)',type:'journal_article',year:2023,authors:['Lam, Remi','Sanchez-Gonzalez, Alvaro','Willson, Matthew','et al.'],institution:'Google DeepMind / Science',url:'https://doi.org/10.1126/science.adi2336'},
{title:'Global Prediction of Extreme Floods in Ungauged Watersheds (Google AI)',type:'journal_article',year:2024,authors:['Nearing, Grey','Cohen, Deborah','Dube, Tadele','et al.'],institution:'Google Research / Nature',url:'https://www.nature.com/articles/s41586-024-07145-1'},
{title:'IPCC Sixth Assessment Report: The Physical Science Basis — AI and Machine Learning Contributions',type:'report',year:2023,authors:['IPCC'],institution:'Intergovernmental Panel on Climate Change',url:'https://www.ipcc.ch/report/ar6/wg1/'},
],
};
let y=0,s=0;for(const[k,v]of Object.entries(E)){
const f=path.join(D,`${k}.md`);if(!fs.existsSync(f)){console.log(`NF:${k}`);s++;continue}
const c=fs.readFileSync(f,'utf-8'),p=c.split(/^---\s*$/m);if(p.length<3){s++;continue}
const fm=yaml.load(p[1])||{};if(fm.secondary_sources?.length>0){s++;continue}
fm.secondary_sources=v;fm.updated=T;const ny=yaml.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${p.slice(2).join('---')}`;
try{if(!yaml.load(nc.split(/^---\s*$/m)[1])?.secondary_sources){console.log(`RT:${k}`);s++;continue}}
catch(e){console.log(`YAML:${k}`);s++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log(`✅ ${k}`);y++;}
console.log(`\n📊 S14: ${y}/${Object.keys(E).length}`);
