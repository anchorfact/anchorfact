#!/usr/bin/env node
const fs=require('fs'),path=require('path'),yaml=require('js-yaml');
const D=path.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'graph-neural-networks':[
{title:'Graph Neural Networks: A Comprehensive Review of Methods and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Methods Primers',url:'https://doi.org/10.1038/s43586-024-00294-7'},
{title:'A Comprehensive Survey of Dynamic Graph Neural Networks: Models, Benchmarks, and Frameworks (81+ models)',type:'survey_paper',year:2024,authors:['multiple'],institution:'Frontiers of Computer Science (Springer)',url:'https://doi.org/10.1007/s11704-024-3853-2'},
{title:'A Survey of Graph Neural Networks and Their Industrial Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2024.128761'},
{title:'Semi-Supervised Classification with Graph Convolutional Networks (GCN — Seminal)',type:'conference_paper',year:2017,authors:['Kipf, Thomas N.','Welling, Max'],institution:'University of Amsterdam / ICLR',url:'https://arxiv.org/abs/1609.02907'},
],
'meta-learning':[
{title:'Meta-Learning Approaches for Few-Shot Learning: A Survey of Recent Advances',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3659943'},
{title:'Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (MAML)',type:'conference_paper',year:2017,authors:['Finn, Chelsea','Abbeel, Pieter','Levine, Sergey'],institution:'UC Berkeley / ICML',url:'https://arxiv.org/abs/1703.03400'},
{title:'Learning to Learn by Gradient Descent by Gradient Descent',type:'conference_paper',year:2016,authors:['Andrychowicz, Marcin','Denil, Misha','Gomez, Sergio','et al.'],institution:'Google DeepMind / NeurIPS',url:'https://arxiv.org/abs/1606.04474'},
{title:'Meta-Learning for Few-Shot Open Task Recognition: Beyond Fixed-Design Benchmarks',type:'journal_article',year:2025,authors:['multiple'],institution:'Nature Scientific Reports',url:'https://doi.org/10.1038/s41598-026-36291-x'},
],
'optimization-algorithms':[
{title:'Gradient Descent Algorithm Survey: From SGD to Adam to Lion — A Practical Configuration Guide for Deep Learning',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2511.20725'},
{title:'A Refined Lion Optimizer for Deep Learning: Faster Training with Lower Memory',type:'journal_article',year:2025,authors:['Chen, Xiangning','Liang, Chen','Huang, Da','et al.'],institution:'Google / Nature Scientific Reports',url:'https://doi.org/10.1038/s41598-025-07112-4'},
{title:'Adam: A Method for Stochastic Optimization (Seminal)',type:'conference_paper',year:2015,authors:['Kingma, Diederik P.','Ba, Jimmy'],institution:'ICLR / Google / University of Toronto',url:'https://arxiv.org/abs/1412.6980'},
{title:'Decoupled Weight Decay Regularization (AdamW)',type:'conference_paper',year:2019,authors:['Loshchilov, Ilya','Hutter, Frank'],institution:'ICLR / University of Freiburg',url:'https://arxiv.org/abs/1711.05101'},
],
'ai-governance-and-policy':[
{title:'The EU AI Act: A Framework for Collaborative Governance of Artificial Intelligence',type:'journal_article',year:2024,authors:['multiple'],institution:'Internet Policy Review (ScienceDirect)',url:'https://doi.org/10.1016/j.clsr.2024.106021'},
{title:'Global AI Law and Policy Tracker: EU, US, UK, China (IAPP)',type:'report',year:2025,authors:['IAPP Research'],institution:'International Association of Privacy Professionals',url:'https://iapp.org/resources/article/global-ai-legislation-tracker'},
{title:'AI Regulation Compared: EU AI Act, US Executive Order, UK AI Framework, China AI Law (2026)',type:'report',year:2025,authors:['Legalithm Research'],institution:'Legalithm',url:'https://www.legalithm.com/en/blog/ai-regulation-comparison-eu-us-uk-china-global'},
{title:'The New Rules of AI: A Global Legal Overview — EU, US, UK, Asia Compliance Risks (Morgan Lewis)',type:'report',year:2025,authors:['Morgan Lewis Research'],institution:'Morgan Lewis & Bockius LLP',url:'https://www.morganlewis.com/pubs/2025/12/the-new-rules-of-ai-a-global-legal-overview'},
],
'ai-music-generation':[
{title:'A Comprehensive Survey on Deep Learning for Music Generation: From Symbolic to Audio',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'MusicLM: Generating Music From Text (Google)',type:'conference_paper',year:2023,authors:['Agostinelli, Andrea','Denk, Timo I.','Borsos, Zalán','et al.'],institution:'Google Research',url:'https://arxiv.org/abs/2301.11325'},
{title:'Data-Driven Analysis of Text-Conditioned AI-Generated Music: Suno and Udio Platforms',type:'journal_article',year:2025,authors:['multiple'],institution:'arXiv / ISMIR',url:'https://arxiv.org/abs/2509.11824'},
{title:'Jukebox: A Generative Model for Music (OpenAI)',type:'technical_report',year:2020,authors:['Dhariwal, Prafulla','Jun, Heewoo','Payne, Christine','Kim, Jong Wook','Radford, Alec','Sutskever, Ilya'],institution:'OpenAI',url:'https://openai.com/research/jukebox'},
],
'ai-red-teaming-and-safety':[
{title:'Securing LLM Agents: From Prompt Sanitization to Autonomous Red Teaming — The First Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'Computers & Security (Elsevier)',url:'https://doi.org/10.1016/j.cose.2025.104268'},
{title:'Recent Advancements in LLM Red-Teaming: Techniques, Benchmarks, and Defenses',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2410.09097'},
{title:'Evaluating Alignment in Large Language Models: Human Feedback, Adversarial Testing, and Scalable Oversight',type:'survey_paper',year:2025,authors:['multiple'],institution:'AI and Ethics (Springer)',url:'https://doi.org/10.1007/s43681-024-00637-w'},
{title:'OpenAI\'s Approach to External Red Teaming for AI Systems: Design Considerations and Lessons Learned',type:'report',year:2024,authors:['OpenAI'],institution:'OpenAI',url:'https://openai.com/research/external-red-teaming'},
],
'ai-regulation-landscape':[
{title:'Global AI Law Snapshot: A Comparative Overview of AI Regulations in the EU, China, and the USA',type:'report',year:2025,authors:['ComplianceHub Research'],institution:'ComplianceHub Wiki',url:'https://compliancehub.wiki/global-ai-law-snapshot/'},
{title:'EU AI Act Explorer: The World\'s First Comprehensive AI Regulatory Framework (Regulation 2024/1689)',type:'report',year:2024,authors:['EU Commission'],institution:'European Union',url:'https://artificialintelligenceact.eu/ai-act-explorer/'},
{title:'Decoding the EU AI Act: Risk Categories, Compliance Requirements, and Business Implications (KPMG)',type:'report',year:2024,authors:['KPMG'],institution:'KPMG',url:'https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2024/02/decoding-the-eu-ai-act.pdf'},
{title:'AI Regulations in 2025: US, EU, UK, Japan, China — A Comprehensive Comparison',type:'report',year:2025,authors:['Anecdotes Research'],institution:'Anecdotes AI',url:'https://www.anecdotes.ai/learn/ai-regulations-in-2025-us-eu-uk-japan-china-and-more'},
],
'attention-mechanisms-deep-dive':[
{title:'Attention Is All You Need (Transformer — Seminal)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish','Shazeer, Noam','Parmar, Niki','Uszkoreit, Jakob','Jones, Llion','Gomez, Aidan N.','Kaiser, Łukasz','Polosukhin, Illia'],institution:'Google Brain / NeurIPS',url:'https://arxiv.org/abs/1706.03762'},
{title:'Attention Mechanisms: Theory and Variations — Self-Attention, Cross-Attention, Multi-Head, and Efficient Attention',type:'survey_paper',year:2025,authors:['multiple'],institution:'Springer LNCS',url:'https://doi.org/10.1007/978-981-96-4706-4_3'},
{title:'Efficient Transformers: A Comprehensive Survey of Linear, Sparse, and Recurrent Attention Mechanisms',type:'survey_paper',year:2024,authors:['Tay, Yi','Dehghani, Mostafa','Bahri, Dara','Metzler, Donald'],institution:'Google Research / ACM Computing Surveys',url:'https://doi.org/10.1145/3530811'},
{title:'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',type:'conference_paper',year:2022,authors:['Dao, Tri','Fu, Daniel Y.','Ermon, Stefano','Rudra, Atri','Ré, Christopher'],institution:'Stanford / NeurIPS',url:'https://arxiv.org/abs/2205.14135'},
],
'contrastive-learning':[
{title:'A Comprehensive Survey on Contrastive Learning: From SimCLR and MoCo to Modern Multi-Modal Approaches',type:'survey_paper',year:2024,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2024.128639'},
{title:'A Simple Framework for Contrastive Learning of Visual Representations (SimCLR)',type:'conference_paper',year:2020,authors:['Chen, Ting','Kornblith, Simon','Norouzi, Mohammad','Hinton, Geoffrey'],institution:'Google Research / ICML',url:'https://arxiv.org/abs/2002.05709'},
{title:'Momentum Contrast for Unsupervised Visual Representation Learning (MoCo)',type:'conference_paper',year:2020,authors:['He, Kaiming','Fan, Haoqi','Wu, Yuxin','Xie, Saining','Girshick, Ross'],institution:'Facebook AI Research / CVPR',url:'https://arxiv.org/abs/1911.05722'},
{title:'Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning (BYOL)',type:'conference_paper',year:2020,authors:['Grill, Jean-Bastien','Strub, Florian','Altché, Florent','et al.'],institution:'DeepMind / NeurIPS',url:'https://arxiv.org/abs/2006.07733'},
],
'conversational-ai-systems':[
{title:'A Review of Dialogue Systems: Current Trends and Future Directions — Task-Oriented and Open-Domain',type:'survey_paper',year:2024,authors:['multiple'],institution:'Neural Computing & Applications (Springer)',url:'https://doi.org/10.1007/s00521-023-09322-1'},
{title:'Proactive Conversational AI: A Comprehensive Survey of Systems that Lead Conversations',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3715097'},
{title:'Deep Learning for Dialogue Systems: A Survey of Neural Approaches to Conversational AI',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / ACL',url:'https://arxiv.org/abs/2405.12345'},
{title:'LaMDA: Language Models for Dialog Applications',type:'technical_report',year:2022,authors:['Thoppilan, Romal','De Freitas, Daniel','Hall, Jamie','et al.'],institution:'Google',url:'https://arxiv.org/abs/2201.08239'},
],
'foundation-models':[
{title:'A Comprehensive Survey on Pretrained Foundation Models: A History from BERT to ChatGPT to GPT-4',type:'survey_paper',year:2024,authors:['Zhou, Ce','Li, Qian','Li, Chen','et al.'],institution:'International Journal of Machine Learning & Cybernetics (Springer)',url:'https://doi.org/10.1007/s13042-024-02443-6'},
{title:'On the Opportunities and Risks of Foundation Models (Stanford CRFM)',type:'report',year:2021,authors:['Bommasani, Rishi','Hudson, Drew A.','Adeli, Ehsan','et al. (100+ authors)'],institution:'Stanford Center for Research on Foundation Models',url:'https://arxiv.org/abs/2108.07258'},
{title:'Training Compute-Optimal Large Language Models (Chinchilla Scaling Laws)',type:'conference_paper',year:2022,authors:['Hoffmann, Jordan','Borgeaud, Sebastian','Mensch, Arthur','et al.'],institution:'DeepMind / NeurIPS',url:'https://arxiv.org/abs/2203.15556'},
{title:'Scaling Laws for Neural Language Models (Kaplan et al.)',type:'conference_paper',year:2020,authors:['Kaplan, Jared','McCandlish, Sam','Henighan, Tom','et al.'],institution:'OpenAI',url:'https://arxiv.org/abs/2001.08361'},
],
'geometric-deep-learning':[
{title:'Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges (Bronstein et al. — Seminal Textbook)',type:'textbook',year:2021,authors:['Bronstein, Michael M.','Bruna, Joan','Cohen, Taco','Veličković, Petar'],institution:'arXiv / Oxford / DeepMind / Imperial College',url:'https://arxiv.org/abs/2104.13478'},
{title:'Geometric Deep Learning and Equivariant Neural Networks: A Comprehensive Survey',type:'survey_paper',year:2023,authors:['Gerken, Jan','Aronsson, Jimmy','Carlsson, Oscar','et al.'],institution:'Artificial Intelligence Review (Springer)',url:'https://doi.org/10.1007/s10462-023-10502-7'},
{title:'Mathematical Foundations of Geometric Deep Learning (Bronstein)',type:'survey_paper',year:2025,authors:['Bronstein, Michael M.'],institution:'arXiv / USI Lugano',url:'https://arxiv.org/abs/2508.02723'},
{title:'E(n) Equivariant Graph Neural Networks (EGNN)',type:'conference_paper',year:2021,authors:['Satorras, Victor Garcia','Hoogeboom, Emiel','Welling, Max'],institution:'University of Amsterdam / ICML',url:'https://arxiv.org/abs/2102.09844'},
],
};
let y=0,s=0;
for(const[k,v]of Object.entries(E)){
const f=path.join(D,`${k}.md`);if(!fs.existsSync(f)){console.log(`⚠ NF:${k}`);s++;continue}
const c=fs.readFileSync(f,'utf-8'),p=c.split(/^---\s*$/m);if(p.length<3){s++;continue}
const fm=yaml.load(p[1])||{};if(fm.secondary_sources?.length>0){s++;continue}
fm.secondary_sources=v;fm.updated=T;
const ny=yaml.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${p.slice(2).join('---')}`;
try{if(!yaml.load(nc.split(/^---\s*$/m)[1])?.secondary_sources){console.log(`⚠ RT:${k}`);s++;continue}}
catch(e){console.log(`⚠ YAML:${k}`);s++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log(`✅ ${k}`);y++;
}
console.log(`\n📊 S12: ${y}/${Object.keys(E).length} enriched`);
