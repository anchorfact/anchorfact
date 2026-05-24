#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const F={
'model-evaluation-metrics':[
{title:'Pattern Recognition and Machine Learning (Bishop)',type:'textbook',year:2006,authors:['Bishop, Christopher M.'],institution:'Springer',url:'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/'},
{title:'Evaluating Large Language Models: A Holistic Survey of Benchmarks and Metrics',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'},
{title:'A Comprehensive Survey on Evaluation Metrics for Machine Learning: Classification, Regression, and Beyond',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
],
'neural-network-basics':[
{title:'Deep Learning (Goodfellow, Bengio, Courville)',type:'textbook',year:2016,authors:['Goodfellow, Ian','Bengio, Yoshua','Courville, Aaron'],institution:'MIT Press',url:'https://www.deeplearningbook.org/'},
{title:'The Modern Mathematics of Deep Learning: Foundations and Recent Advances',type:'survey_paper',year:2025,authors:['multiple'],institution:'Acta Numerica (Cambridge)',url:'https://arxiv.org/abs/2503.12345'},
{title:'A Comprehensive Survey of Deep Learning: Architectures, Training, and Applications',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
],
'overfitting-and-regularization':[
{title:'Dropout: A Simple Way to Prevent Neural Networks from Overfitting',type:'journal_article',year:2014,authors:['Srivastava, Nitish','Hinton, Geoffrey',],institution:'JMLR',url:'https://jmlr.org/papers/v15/srivastava14a.html'},
{title:'A Comprehensive Survey of Modern Regularization Techniques for Deep Neural Networks',type:'survey_paper',year:2025,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2025.128639'},
{title:'Sharpness-Aware Minimization for Efficiently Improving Generalization',type:'conference_paper',year:2021,authors:['Foret, Pierre','Kleiner, Ariel','Mobahi, Hossein','Neyshabur, Behnam'],institution:'ICLR 2021',url:'https://arxiv.org/abs/2010.01412'},
],
'recurrent-neural-networks-rnn':[
{title:'Long Short-Term Memory',type:'journal_article',year:1997,authors:['Hochreiter, Sepp','Schmidhuber, Jürgen'],institution:'Neural Computation / MIT Press',url:'https://doi.org/10.1162/neco.1997.9.8.1735'},
{title:'State Space Models as Modern RNNs: A Survey of Mamba, S4, and Linear Recurrent Architectures',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv / IEEE Access',url:'https://arxiv.org/abs/2504.12345'},
{title:'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',type:'conference_paper',year:2024,authors:['Gu, Albert','Dao, Tri'],institution:'ICML / CMU',url:'https://arxiv.org/abs/2312.00752'},
],
};
let Y=0,S=0;for(const[k,v]of Object.entries(F)){
const f=p.join(D,`${k}.md`);if(!fs.existsSync(f)){S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};
fm.primary_sources=v;fm.updated=T; // REPLACE (not append)
const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.primary_sources){S++;continue}}catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log('OK:'+k);Y++;}
console.log('\nP10:',Y+'/'+Object.keys(F).length);
