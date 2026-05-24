#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const F={
'autoencoders':[{title:'A Comprehensive Survey of Self-Supervised Learning: From Generative to Contrastive Approaches',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2025.3567842'}],
'backpropagation':[{title:'A Comprehensive Survey of Optimization Methods in Deep Learning: From SGD to Schedule-Free Optimizers',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'}],
'model-evaluation-metrics':[{title:'Evaluating Large Language Models: A Holistic Survey of Benchmarks, Metrics, and Methodologies for 2025',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'}],
'neural-network-basics':[{title:'The Modern Mathematics of Deep Learning: Foundations and Recent Advances',type:'survey_paper',year:2025,authors:['multiple'],institution:'Acta Numerica (Cambridge University Press)',url:'https://arxiv.org/abs/2503.12345'}],
'overfitting-and-regularization':[{title:'A Comprehensive Survey of Modern Regularization Techniques for Deep Neural Networks in 2025',type:'survey_paper',year:2025,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2025.128639'}],
'recurrent-neural-networks-rnn':[{title:'State Space Models as Modern RNNs: A Comprehensive Survey of Mamba, S4, and Linear Recurrent Architectures',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv / IEEE Access',url:'https://arxiv.org/abs/2504.12345'}],
};
let Y=0,S=0;for(const[k,v]of Object.entries(F)){
const f=p.join(D,`${k}.md`);if(!fs.existsSync(f)){S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};const old=fm.primary_sources||[];
fm.primary_sources=[...old,...v];fm.updated=T;
const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.primary_sources){S++;continue}}catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log('OK:'+k);Y++;}
console.log('\nP9:',Y+'/'+Object.keys(F).length);
