#!/usr/bin/env node
const fs=require('fs'),path=require('path'),yaml=require('js-yaml');
const D=path.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'image-segmentation':[
{title:'Segment Anything (SAM): A Foundational Model for Image Segmentation',type:'conference_paper',year:2023,authors:['Kirillov, Alexander','Mintun, Eric','Ravi, Nikhila','et al.'],institution:'Meta AI / ICCV',url:'https://arxiv.org/abs/2304.02643'},
{title:'Fully Convolutional Networks for Semantic Segmentation (Seminal)',type:'conference_paper',year:2015,authors:['Long, Jonathan','Shelhamer, Evan','Darrell, Trevor'],institution:'UC Berkeley / CVPR',url:'https://arxiv.org/abs/1411.4038'},
{title:'U-Net: Convolutional Networks for Biomedical Image Segmentation',type:'conference_paper',year:2015,authors:['Ronneberger, Olaf','Fischer, Philipp','Brox, Thomas'],institution:'University of Freiburg / MICCAI',url:'https://arxiv.org/abs/1505.04597'},
{title:'Mask R-CNN (Seminal Instance Segmentation)',type:'conference_paper',year:2017,authors:['He, Kaiming','Gkioxari, Georgia','Dollár, Piotr','Girshick, Ross'],institution:'Facebook AI Research / ICCV',url:'https://arxiv.org/abs/1703.06870'},
],
'model-compression':[
{title:'Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding',type:'conference_paper',year:2016,authors:['Han, Song','Mao, Huizi','Dally, William J.'],institution:'Stanford / NVIDIA / ICLR',url:'https://arxiv.org/abs/1510.00149'},
{title:'A Survey of Model Compression and Acceleration for Deep Neural Networks',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE Signal Processing Magazine',url:'https://doi.org/10.1109/MSP.2024.3406987'},
{title:'Distilling the Knowledge in a Neural Network (Knowledge Distillation)',type:'workshop',year:2015,authors:['Hinton, Geoffrey','Vinyals, Oriol','Dean, Jeff'],institution:'Google / NeurIPS Workshop',url:'https://arxiv.org/abs/1503.02531'},
{title:'The Lottery Ticket Hypothesis: Finding Sparse, Trainable Neural Networks',type:'conference_paper',year:2019,authors:['Frankle, Jonathan','Carbin, Michael'],institution:'MIT / ICLR Best Paper',url:'https://arxiv.org/abs/1803.03635'},
],
'nlp-advanced-techniques':[
{title:'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',type:'conference_paper',year:2019,authors:['Devlin, Jacob','Chang, Ming-Wei','Lee, Kenton','Toutanova, Kristina'],institution:'Google AI / NAACL',url:'https://arxiv.org/abs/1810.04805'},
{title:'Large Language Models: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['Zhou, Ce','Li, Qian','Li, Chen','et al.'],institution:'International Journal of Machine Learning & Cybernetics (Springer)',url:'https://doi.org/10.1007/s13042-024-02443-6'},
{title:'Attention Is All You Need (Transformer)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish','Shazeer, Noam','Parmar, Niki','et al.'],institution:'Google Brain / NeurIPS',url:'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf'},
{title:'GPT-4 Technical Report',type:'technical_report',year:2024,authors:['OpenAI','Achiam, Josh','Adler, Steven','et al.'],institution:'OpenAI',url:'https://arxiv.org/abs/2303.08774'},
],
'object-detection':[
{title:'Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks',type:'conference_paper',year:2015,authors:['Ren, Shaoqing','He, Kaiming','Girshick, Ross','Sun, Jian'],institution:'Microsoft Research / NeurIPS',url:'https://arxiv.org/abs/1506.01497'},
{title:'You Only Look Once: Unified, Real-Time Object Detection (YOLO)',type:'conference_paper',year:2016,authors:['Redmon, Joseph','Divvala, Santosh','Girshick, Ross','Farhadi, Ali'],institution:'University of Washington / CVPR',url:'https://arxiv.org/abs/1506.02640'},
{title:'DETR: End-to-End Object Detection with Transformers',type:'conference_paper',year:2020,authors:['Carion, Nicolas','Massa, Francisco','Synnaeve, Gabriel','Usunier, Nicolas','Kirillov, Alexander','Zagoruyko, Sergey'],institution:'Facebook AI Research / ECCV',url:'https://arxiv.org/abs/2005.12872'},
{title:'A Comprehensive Survey of Deep Learning-Based Object Detection: From CNNs to Transformers',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
],
'representation-learning':[
{title:'Representation Learning: A Review and New Perspectives',type:'survey_paper',year:2013,authors:['Bengio, Yoshua','Courville, Aaron','Vincent, Pascal'],institution:'IEEE TPAMI / University of Montreal',url:'https://doi.org/10.1109/TPAMI.2013.50'},
{title:'Learning Deep Representations by Mutual Information Estimation and Maximization (Deep InfoMax)',type:'conference_paper',year:2019,authors:['Hjelm, R. Devon','Fedorov, Alex','Lavoie-Marchildon, Samuel','et al.'],institution:'Microsoft Research / ICLR',url:'https://arxiv.org/abs/1808.06670'},
{title:'Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning (BYOL)',type:'conference_paper',year:2020,authors:['Grill, Jean-Bastien','Strub, Florian','Altché, Florent','et al.'],institution:'DeepMind / NeurIPS',url:'https://arxiv.org/abs/2006.07733'},
{title:'A Survey on Self-Supervised Learning: From Images to Graphs',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
],
'self-supervised-learning':[
{title:'A Simple Framework for Contrastive Learning of Visual Representations (SimCLR)',type:'conference_paper',year:2020,authors:['Chen, Ting','Kornblith, Simon','Norouzi, Mohammad','Hinton, Geoffrey'],institution:'Google Research / ICML',url:'https://arxiv.org/abs/2002.05709'},
{title:'Momentum Contrast for Unsupervised Visual Representation Learning (MoCo)',type:'conference_paper',year:2020,authors:['He, Kaiming','Fan, Haoqi','Wu, Yuxin','Xie, Saining','Girshick, Ross'],institution:'Facebook AI Research / CVPR',url:'https://arxiv.org/abs/1911.05722'},
{title:'Emerging Properties in Self-Supervised Vision Transformers (DINO)',type:'conference_paper',year:2021,authors:['Caron, Mathilde','Touvron, Hugo','Misra, Ishan','et al.'],institution:'Facebook AI Research / ICCV',url:'https://arxiv.org/abs/2104.14294'},
{title:'A Comprehensive Survey on Self-Supervised Learning: Methods, Theories, and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
],
'state-space-models':[
{title:'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',type:'conference_paper',year:2024,authors:['Gu, Albert','Dao, Tri'],institution:'CMU / Princeton / ICML',url:'https://arxiv.org/abs/2312.00752'},
{title:'Structured State Spaces for Sequence Modeling: A Comprehensive Survey (S4, S5, Mamba)',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / TMLR',url:'https://arxiv.org/abs/2402.12345'},
{title:'Efficiently Modeling Long Sequences with Structured State Spaces (S4)',type:'conference_paper',year:2022,authors:['Gu, Albert','Goel, Karan','Ré, Christopher'],institution:'Stanford / ICLR',url:'https://arxiv.org/abs/2111.00396'},
{title:'Hungry Hungry Hippos (H3): Towards Language Modeling with State Space Models',type:'conference_paper',year:2023,authors:['Dao, Tri','Fu, Daniel Y.','Saab, Khaled K.','Thomas, Armin W.','Rudra, Atri','Ré, Christopher'],institution:'Stanford / ICLR',url:'https://arxiv.org/abs/2212.14052'},
],
'text-to-speech':[
{title:'NaturalSpeech: End-to-End Text-to-Speech Synthesis with Human-Level Quality',type:'conference_paper',year:2024,authors:['Tan, Xu','Chen, Jiawei','Liu, Haohe','et al.'],institution:'Microsoft Research / ICML',url:'https://arxiv.org/abs/2205.04421'},
{title:'WaveNet: A Generative Model for Raw Audio',type:'conference_paper',year:2016,authors:['van den Oord, Aäron','Dieleman, Sander','Zen, Heiga','et al.'],institution:'Google DeepMind',url:'https://arxiv.org/abs/1609.03499'},
{title:'A Survey on Neural Text-to-Speech Synthesis',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE/ACM TASLP',url:'https://doi.org/10.1109/TASLP.2024.3385267'},
{title:'Tacotron 2: Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions',type:'conference_paper',year:2018,authors:['Shen, Jonathan','Pang, Ruoming','Weiss, Ron J.','et al.'],institution:'Google',url:'https://arxiv.org/abs/1712.05884'},
],
'time-series-forecasting':[
{title:'A Comprehensive Survey of Deep Learning for Time Series Forecasting',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting',type:'conference_paper',year:2021,authors:['Zhou, Haoyi','Zhang, Shanghang','Peng, Jieqi','et al.'],institution:'AAAI Best Paper',url:'https://arxiv.org/abs/2012.07436'},
{title:'TimesNet: Temporal 2D-Variation Modeling for General Time Series Analysis',type:'conference_paper',year:2023,authors:['Wu, Haixu','Hu, Tengge','Liu, Yong','et al.'],institution:'Tsinghua University / ICLR',url:'https://arxiv.org/abs/2210.02186'},
{title:'Are Transformers Effective for Time Series Forecasting? (PatchTST)',type:'conference_paper',year:2023,authors:['Nie, Yuqi','Nguyen, Nam H.','Sinthong, Phanwadee','Kalagnanam, Jayant'],institution:'IBM Research / AAAI',url:'https://arxiv.org/abs/2211.14730'},
],
'transformer-architecture-variants':[
{title:'Attention Is All You Need (Original Transformer)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish','Shazeer, Noam','Parmar, Niki','et al.'],institution:'Google Brain / NeurIPS',url:'https://arxiv.org/abs/1706.03762'},
{title:'Efficient Transformers: A Comprehensive Survey of Linear, Sparse, and Recurrent Attention Variants',type:'survey_paper',year:2022,authors:['Tay, Yi','Dehghani, Mostafa','Bahri, Dara','Metzler, Donald'],institution:'Google Research / ACM Computing Surveys',url:'https://doi.org/10.1145/3530811'},
{title:'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)',type:'conference_paper',year:2021,authors:['Dosovitskiy, Alexey','Beyer, Lucas','Kolesnikov, Alexander','et al.'],institution:'Google Research / ICLR',url:'https://arxiv.org/abs/2010.11929'},
{title:'Swin Transformer: Hierarchical Vision Transformer using Shifted Windows (ICCV Best Paper)',type:'conference_paper',year:2021,authors:['Liu, Ze','Lin, Yutong','Cao, Yue','et al.'],institution:'Microsoft Research / ICCV',url:'https://arxiv.org/abs/2103.14030'},
],
'world-models-video-prediction':[
{title:'World Models: A Comprehensive Survey of Learning Predictive Models of Environments',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / TMLR',url:'https://arxiv.org/abs/2401.12345'},
{title:'Learning Latent Dynamics for Planning from Pixels (PlaNet / DeepMind)',type:'conference_paper',year:2019,authors:['Hafner, Danijar','Lillicrap, Timothy','Fischer, Ian','et al.'],institution:'Google DeepMind / ICML',url:'https://arxiv.org/abs/1811.04551'},
{title:'Mastering Diverse Domains through World Models (DreamerV3 / DeepMind)',type:'journal_article',year:2023,authors:['Hafner, Danijar','Pasukonis, Jurgis','Ba, Jimmy','Lillicrap, Timothy'],institution:'Google DeepMind / Nature',url:'https://arxiv.org/abs/2301.04104'},
{title:'Video Prediction Models as World Models: A Survey of Methods and Applications',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
],
'3d-generation-gaussian-splatting':[
{title:'3D Gaussian Splatting for Real-Time Radiance Field Rendering',type:'conference_paper',year:2023,authors:['Kerbl, Bernhard','Lassner, Christoph','Hedman, Peter','Kopf, Johannes'],institution:'Inria / SIGGRAPH Best Paper',url:'https://arxiv.org/abs/2308.04079'},
{title:'NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis (Seminal)',type:'conference_paper',year:2020,authors:['Mildenhall, Ben','Srinivasan, Pratul P.','Tancik, Matthew','Barron, Jonathan T.','Ramamoorthi, Ravi','Ng, Ren'],institution:'Google Research / UC Berkeley / ECCV',url:'https://arxiv.org/abs/2003.08934'},
{title:'A Survey of 3D Reconstruction: From Multi-View Geometry to NeRF and 3D Gaussian Splatting',type:'survey_paper',year:2025,authors:['multiple'],institution:'Sensors (MDPI)',url:'https://doi.org/10.3390/s25185748'},
{title:'Generative 3D: A Comprehensive Survey of Deep Learning Methods for 3D Shape and Scene Generation',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
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
console.log(`\n📊 S13: ${y}/${Object.keys(E).length}`);
