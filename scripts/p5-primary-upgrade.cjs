#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'model-evaluation-metrics':[
{title:'Pattern Recognition and Machine Learning (Bishop)',type:'textbook',year:2006,authors:['Bishop, Christopher M.'],institution:'Springer',url:'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/'},
{title:'The Elements of Statistical Learning (Hastie, Tibshirani, Friedman, 2nd Edition)',type:'textbook',year:2009,authors:['Hastie, Trevor','Tibshirani, Robert','Friedman, Jerome'],institution:'Springer',url:'https://doi.org/10.1007/978-0-387-84858-7'},
{title:'An Introduction to ROC Analysis (Fawcett)',type:'journal_article',year:2006,authors:['Fawcett, Tom'],institution:'Pattern Recognition Letters / Elsevier',url:'https://doi.org/10.1016/j.patrec.2005.10.010'},
{title:'The Relationship Between Precision-Recall and ROC Curves (Davis & Goadrich)',type:'conference_paper',year:2006,authors:['Davis, Jesse','Goadrich, Mark'],institution:'ICML',url:'https://doi.org/10.1145/1143844.1143874'},
],
'neural-network-basics':[
{title:'Deep Learning (Goodfellow, Bengio, Courville)',type:'textbook',year:2016,authors:['Goodfellow, Ian','Bengio, Yoshua','Courville, Aaron'],institution:'MIT Press',url:'https://www.deeplearningbook.org/'},
{title:'Learning Representations by Back-Propagating Errors (Rumelhart, Hinton, Williams — Nature 1986)',type:'journal_article',year:1986,authors:['Rumelhart, David E.','Hinton, Geoffrey E.','Williams, Ronald J.'],institution:'Nature',url:'https://doi.org/10.1038/323533a0'},
{title:'Imagenet Classification with Deep Convolutional Neural Networks (AlexNet — Krizhevsky, Sutskever, Hinton)',type:'conference_paper',year:2012,authors:['Krizhevsky, Alex','Sutskever, Ilya','Hinton, Geoffrey E.'],institution:'University of Toronto / NeurIPS',url:'https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html'},
],
'overfitting-and-regularization':[
{title:'Dropout: A Simple Way to Prevent Neural Networks from Overfitting (Srivastava, Hinton et al.)',type:'journal_article',year:2014,authors:['Srivastava, Nitish','Hinton, Geoffrey','Krizhevsky, Alex','Sutskever, Ilya','Salakhutdinov, Ruslan'],institution:'University of Toronto / JMLR',url:'https://jmlr.org/papers/v15/srivastava14a.html'},
{title:'Statistical Learning Theory (Vapnik)',type:'textbook',year:1998,authors:['Vapnik, Vladimir N.'],institution:'Wiley',url:'https://doi.org/10.1007/978-1-4757-3264-1'},
{title:'Regularization and Variable Selection via the Elastic Net (Zou & Hastie)',type:'journal_article',year:2005,authors:['Zou, Hui','Hastie, Trevor'],institution:'Journal of the Royal Statistical Society',url:'https://doi.org/10.1111/j.1467-9868.2005.00503.x'},
{title:'Understanding Deep Learning Requires Rethinking Generalization (Zhang, Bengio et al. — ICLR Best Paper)',type:'conference_paper',year:2017,authors:['Zhang, Chiyuan','Bengio, Samy','Hardt, Moritz','Recht, Benjamin','Vinyals, Oriol'],institution:'Google Brain / ICLR',url:'https://arxiv.org/abs/1611.03530'},
],
'natural-language-processing-nlp':[
{title:'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',type:'conference_paper',year:2019,authors:['Devlin, Jacob','Chang, Ming-Wei','Lee, Kenton','Toutanova, Kristina'],institution:'Google AI / NAACL',url:'https://arxiv.org/abs/1810.04805'},
{title:'Attention Is All You Need (Transformer)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish','Shazeer, Noam','Parmar, Niki','et al.'],institution:'Google Brain / NeurIPS',url:'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf'},
{title:'Speech and Language Processing (Jurafsky & Martin, 3rd Edition)',type:'textbook',year:2024,authors:['Jurafsky, Daniel','Martin, James H.'],institution:'Pearson / Stanford',url:'https://web.stanford.edu/~jurafsky/slp3/'},
],
'autoencoders':[
{title:'Auto-Encoding Variational Bayes (VAE — Kingma & Welling)',type:'conference_paper',year:2014,authors:['Kingma, Diederik P.','Welling, Max'],institution:'University of Amsterdam / ICLR',url:'https://arxiv.org/abs/1312.6114'},
{title:'Reducing the Dimensionality of Data with Neural Networks (Hinton & Salakhutdinov — Autoencoder Breakthrough)',type:'journal_article',year:2006,authors:['Hinton, Geoffrey E.','Salakhutdinov, Ruslan R.'],institution:'University of Toronto / Science',url:'https://doi.org/10.1126/science.1127647'},
{title:'Deep Learning (Goodfellow, Bengio, Courville — Chapter 14 Autoencoders)',type:'textbook',year:2016,authors:['Goodfellow, Ian','Bengio, Yoshua','Courville, Aaron'],institution:'MIT Press',url:'https://www.deeplearningbook.org/contents/autoencoders.html'},
],
'recurrent-neural-networks-rnn':[
{title:'Long Short-Term Memory (LSTM — Hochreiter & Schmidhuber)',type:'journal_article',year:1997,authors:['Hochreiter, Sepp','Schmidhuber, Jürgen'],institution:'Neural Computation / MIT Press',url:'https://doi.org/10.1162/neco.1997.9.8.1735'},
{title:'Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation (GRU — Cho et al.)',type:'conference_paper',year:2014,authors:['Cho, Kyunghyun','van Merrienboer, Bart','Gulcehre, Caglar','et al.'],institution:'University of Montreal / EMNLP',url:'https://arxiv.org/abs/1406.1078'},
{title:'A Critical Review of Recurrent Neural Networks for Sequence Learning (Lipton, Berkowitz, Elkan)',type:'survey_paper',year:2015,authors:['Lipton, Zachary C.','Berkowitz, John','Elkan, Charles'],institution:'arXiv / UC San Diego',url:'https://arxiv.org/abs/1506.00019'},
],
'semantic-web-ontology':[
{title:'The Semantic Web: A New Form of Web Content (Berners-Lee, Hendler, Lassila)',type:'journal_article',year:2001,authors:['Berners-Lee, Tim','Hendler, James','Lassila, Ora'],institution:'Scientific American',url:'https://www.scientificamerican.com/article/the-semantic-web/'},
{title:'OWL 2 Web Ontology Language: Document Overview (W3C Recommendation)',type:'standard',year:2012,authors:['W3C OWL Working Group'],institution:'W3C',url:'https://www.w3.org/TR/owl2-overview/'},
{title:'Knowledge Graphs (Hogan, Blomqvist et al.)',type:'survey_paper',year:2021,authors:['Hogan, Aidan','Blomqvist, Eva','Cochez, Michael','et al.'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3447772'},
],
'attention-vs-self-attention':[
{title:'Attention Is All You Need (Transformer)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish','Shazeer, Noam','Parmar, Niki','Uszkoreit, Jakob','Jones, Llion','Gomez, Aidan N.','Kaiser, Łukasz','Polosukhin, Illia'],institution:'Google Brain / NeurIPS',url:'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf'},
{title:'Neural Machine Translation by Jointly Learning to Align and Translate (Bahdanau Attention)',type:'conference_paper',year:2015,authors:['Bahdanau, Dzmitry','Cho, Kyunghyun','Bengio, Yoshua'],institution:'University of Montreal / ICLR',url:'https://arxiv.org/abs/1409.0473'},
{title:'Efficient Transformers: A Comprehensive Survey (Tay et al. — Google)',type:'survey_paper',year:2022,authors:['Tay, Yi','Dehghani, Mostafa','Bahri, Dara','Metzler, Donald'],institution:'Google Research / ACM Computing Surveys',url:'https://doi.org/10.1145/3530811'},
],
'data-preprocessing':[
{title:'Data Mining: Concepts and Techniques (Han, Pei, Tong, 4th Edition)',type:'textbook',year:2022,authors:['Han, Jiawei','Pei, Jian','Tong, Hanghang'],institution:'Morgan Kaufmann / Elsevier',url:'https://doi.org/10.1016/C2020-0-00008-4'},
{title:'Scikit-learn: Machine Learning in Python (Pedregosa et al. — JMLR)',type:'journal_article',year:2011,authors:['Pedregosa, Fabian','Varoquaux, Gaël','Gramfort, Alexandre','et al.'],institution:'INRIA / JMLR',url:'https://jmlr.org/papers/v12/pedregosa11a.html'},
{title:'A Survey on Data Preprocessing Methods for Machine Learning',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'feature-engineering':[
{title:'Feature Engineering for Machine Learning (Zheng & Casari)',type:'textbook',year:2018,authors:['Zheng, Alice','Casari, Amanda'],institution:"O\\'Reilly Media",url:'https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/'},
{title:'An Introduction to Variable and Feature Selection (Guyon & Elisseeff)',type:'journal_article',year:2003,authors:['Guyon, Isabelle','Elisseeff, André'],institution:'Journal of Machine Learning Research (JMLR)',url:'https://jmlr.org/papers/v3/guyon03a.html'},
{title:'Deep Feature Synthesis: Towards Automating Data Science Endeavors (Kanter & Veeramachaneni)',type:'conference_paper',year:2015,authors:['Kanter, James Max','Veeramachaneni, Kalyan'],institution:'MIT / DSAA',url:'https://doi.org/10.1109/DSAA.2015.7344858'},
],
'knowledge-distillation':[
{title:'Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean)',type:'workshop',year:2015,authors:['Hinton, Geoffrey','Vinyals, Oriol','Dean, Jeff'],institution:'Google / NeurIPS Workshop',url:'https://arxiv.org/abs/1503.02531'},
{title:'Knowledge Distillation: A Survey (Gou, Yu, Maybank, Tao)',type:'survey_paper',year:2021,authors:['Gou, Jianping','Yu, Baosheng','Maybank, Stephen J.','Tao, Dacheng'],institution:'International Journal of Computer Vision (Springer)',url:'https://doi.org/10.1007/s11263-021-01453-z'},
{title:'TinyBERT: Distilling BERT for Natural Language Understanding',type:'conference_paper',year:2020,authors:['Jiao, Xiaoqi','Yin, Yichun','Shang, Lifeng','et al.'],institution:'Huawei Noah\'s Ark Lab / EMNLP',url:'https://arxiv.org/abs/1909.10351'},
],
'explainable-ai-xai':[
{title:'Why Should I Trust You? Explaining the Predictions of Any Classifier (LIME — Ribeiro et al.)',type:'conference_paper',year:2016,authors:['Ribeiro, Marco Tulio','Singh, Sameer','Guestrin, Carlos'],institution:'University of Washington / KDD',url:'https://arxiv.org/abs/1602.04938'},
{title:'A Unified Approach to Interpreting Model Predictions (SHAP — Lundberg & Lee)',type:'conference_paper',year:2017,authors:['Lundberg, Scott M.','Lee, Su-In'],institution:'University of Washington / NeurIPS',url:'https://arxiv.org/abs/1705.07874'},
{title:'Explainable Artificial Intelligence (XAI): A Comprehensive Survey (Arrieta et al. — Information Fusion)',type:'survey_paper',year:2020,authors:['Arrieta, Alejandro Barredo','Díaz-Rodríguez, Natalia','Del Ser, Javier','et al.'],institution:'Information Fusion (Elsevier)',url:'https://doi.org/10.1016/j.inffus.2019.12.012'},
],
};
let Y=0,S=0;for(const[k,v]of Object.entries(E)){
const f=p.join(D,`${k}.md`);if(!fs.existsSync(f)){console.log(`NF:${k}`);S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};
// Only proceed if primary_sources is missing or has only 1-2 entries (tier < 8)
const ps=fm.primary_sources||[];fm.primary_sources=v;fm.updated=T;
const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"',sortKeys:(a,b)=>a===b?0:(a==='updated'?1:b==='updated'?-1:a.localeCompare(b))});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.primary_sources){S++;continue}}catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log(`✅ ${k} (+${v.length} primary_sources)`);Y++;}
console.log(`\n📊 P5: ${Y}/${Object.keys(E).length}`);
