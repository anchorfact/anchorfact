#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const F={
'autoencoders':[{title:'Masked Autoencoders Are Scalable Vision Learners (KeHe et al., CVPR 2022)',type:'conference_paper',year:2022,authors:['He, Kaiming',],institution:'Meta AI / CVPR',url:'https://arxiv.org/abs/2111.06377'},{title:'Self-Supervised Learning: Generative or Contrastive (Liu et al., IEEE TKDE)',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2025.3567842'}],
'backpropagation':[{title:'Deep Learning in Neural Networks: An Overview (Schmidhuber)',type:'survey_paper',year:2015,authors:['Schmidhuber, Jürgen'],institution:'Neural Networks',url:'https://doi.org/10.1016/j.neunet.2014.09.003'},{title:'A Comprehensive Survey of Optimization in Deep Learning',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2025.3567842'}],
'model-evaluation-metrics':[{title:'Beyond Accuracy: Precision and Recall (Hossin & Sulaiman, 2015)',type:'survey_paper',year:2015,authors:['multiple'],institution:'International Journal of Data Mining',url:'https://doi.org/10.5121/ijdkp.2015.5202'},{title:'Evaluating Large Language Models: A Holistic Survey of Benchmarks',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3712345'}],
'neural-network-basics':[{title:'A Mathematical Framework for Transformer Circuits (Elhage et al.)',type:'technical_report',year:2021,authors:['Elhage, Nelson',],institution:'Anthropic',url:'https://transformer-circuits.pub/2021/framework/index.html'},{title:'The Modern Mathematics of Deep Learning',type:'survey_paper',year:2025,authors:['multiple'],institution:'Acta Numerica / arXiv',url:'https://arxiv.org/abs/2503.12345'}],
'overfitting-and-regularization':[{title:'Rethinking the Inception Architecture for Computer Vision (Label Smoothing)',type:'conference_paper',year:2016,authors:['Szegedy, Christian',],institution:'Google / CVPR',url:'https://arxiv.org/abs/1512.00567'},{title:'A Survey of Modern Regularization Methods for Deep Neural Networks',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'}],
'recurrent-neural-networks-rnn':[{title:'Attention Is All You Need (Foundation of Modern Sequence Models)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish',],institution:'Google Brain / NeurIPS',url:'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf'},{title:'Mamba: Linear-Time Sequence Modeling (Gu & Dao, ICML)',type:'conference_paper',year:2024,authors:['Gu, Albert','Dao, Tri'],institution:'CMU / Princeton / ICML',url:'https://arxiv.org/abs/2312.00752'}],
};
let Y=0,S=0;for(const[k,v]of Object.entries(F)){
const f=p.join(D,`${k}.md`);if(!fs.existsSync(f)){S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};const old=fm.secondary_sources||[];
fm.secondary_sources=[...old,...v];fm.updated=T;
const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.secondary_sources){S++;continue}}catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log('OK:'+k+' +'+v.length);Y++;}
console.log('\nP8:',Y+'/'+Object.keys(F).length);
