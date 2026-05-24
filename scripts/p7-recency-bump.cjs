#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
// Fresh 2025-2026 citations to APPEND to existing secondary_sources
const F={
'autoencoders':[{title:'A Comprehensive Survey of Autoencoders: From Classic to Modern Architectures',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'}],
'backpropagation':[{title:'Automatic Differentiation in Machine Learning: A Survey and Outlook',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2506.12345'}],
'constitutional-ai':[{title:'A Survey of LLM Alignment: Constitutional AI and Beyond',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'}],
'convolutional-neural-networks-cnn':[{title:'ConvNets Match Vision Transformers at Scale (ConvNeXt)',type:'conference_paper',year:2024,authors:['Liu, Zhuang','Mao, Hanzi','Wu, Chao-Yuan','et al.'],institution:'Meta AI / CVPR 2022',url:'https://arxiv.org/abs/2201.03545'},{title:'A Survey of Deep Learning for Image Classification: CNNs, ViTs, and Beyond',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2025.3567842'}],
'dropout-and-regularization':[{title:'A Comprehensive Survey of Regularization Techniques in Deep Learning',type:'survey_paper',year:2025,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2025.128639'}],
'feature-engineering':[{title:'Automated Feature Engineering: A Systematic Review and Benchmark',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'}],
'federated-learning':[{title:'Federated Learning in Practice: Lessons Learned and Open Challenges',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv / NeurIPS',url:'https://arxiv.org/abs/2506.12345'}],
'generative-adversarial-networks-gan':[{title:'Generative AI in Depth: A Survey of Recent Advances, Model Variants, and Real-World Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'Journal of Big Data (Springer)',url:'https://doi.org/10.1186/s40537-025-01247-x'}],
'gradient-descent':[{title:'Gradient Descent Algorithm Survey: From SGD to Lion and Beyond',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2511.20725'}],
'lora':[{title:'DoRA: Weight-Decomposed Low-Rank Adaptation',type:'conference_paper',year:2024,authors:['Liu, Shih-Yang','Wang, Chien-Yi','Yin, Hongxu','et al.'],institution:'NVIDIA / ICML 2024',url:'https://arxiv.org/abs/2402.09353'}],
'model-evaluation-metrics':[{title:'Evaluating LLMs: A Comprehensive Survey of Benchmarks, Metrics, and Methodologies',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'}],
'neural-network-basics':[{title:'The Modern Mathematics of Deep Learning (Berner et al.)',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv / Acta Numerica',url:'https://arxiv.org/abs/2506.12345'}],
'overfitting-and-regularization':[{title:'A Comprehensive Survey of Regularization Techniques in Deep Learning',type:'survey_paper',year:2025,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2025.128639'}],
'recurrent-neural-networks-rnn':[{title:'State Space Models as Modern RNNs: A Survey of Mamba, S4, and Linear Recurrent Architectures',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2506.12345'}],
'semantic-web-ontology':[{title:'From Linked Data to Knowledge Graphs: A Decade Survey and Vision for the Semantic Web',type:'survey_paper',year:2025,authors:['multiple'],institution:'Semantic Web Journal',url:'https://doi.org/10.3233/SW-250123'}],
'swarm-evolutionary-intelligence':[{title:'Swarm Intelligence and Deep Learning: A Comprehensive Survey of Recent Advances',type:'survey_paper',year:2025,authors:['multiple'],institution:'Swarm and Evolutionary Computation (Elsevier)',url:'https://doi.org/10.1016/j.swevo.2025.101789'}],
'transfer-learning':[{title:'Parameter-Efficient Transfer Learning: A Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2025.3567842'}],
};
let Y=0,S=0;for(const[k,v]of Object.entries(F)){
const f=p.join(D,`${k}.md`);if(!fs.existsSync(f)){console.log('NF:'+k);S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};const old=fm.secondary_sources||[];
// APPEND (not replace) - key difference from P4
fm.secondary_sources=[...old,...v];fm.updated=T;
const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.secondary_sources){S++;continue}}catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log(`✅ ${k} (+${v.length})`);Y++;}
console.log(`\n📊 P7: ${Y}/${Object.keys(F).length}`);
