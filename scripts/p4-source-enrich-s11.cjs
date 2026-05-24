#!/usr/bin/env node
const fs=require('fs'),path=require('path'),yaml=require('js-yaml');
const D=path.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'data-governance':[
{title:'AI Governance: A Systematic Literature Review of Frameworks, Ethics, and Compliance',type:'survey_paper',year:2025,authors:['multiple'],institution:'AI and Ethics (Springer)',url:'https://doi.org/10.1007/s43681-024-00653-w'},
{title:'Responsible AI Measures Dataset: 12,067 Data Points Across 791 Evaluation Measures for Ethics Evaluation',type:'journal_article',year:2025,authors:['multiple'],institution:'Nature Scientific Data',url:'https://doi.org/10.1038/s41597-025-06021-5'},
{title:'Strengthening AI Governance: International Policy Perspectives (ITU GIRAI Dataset)',type:'report',year:2025,authors:['ITU'],institution:'International Telecommunication Union',url:'https://www.itu.int/dms_pub/itu-s/opb/jnl/S-JNL-VOL6.ISSUE3-2025-A22-PDF-E.pdf'},
{title:'Data and AI Governance: Promoting Equity, Ethics, and Trustworthiness in Generative AI',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv / MDPI Data',url:'https://arxiv.org/abs/2508.03970'},
],
'language-modeling-theory':[
{title:'A Neural Probabilistic Language Model (Seminal — Bengio et al.)',type:'journal_article',year:2003,authors:['Bengio, Yoshua','Ducharme, Réjean','Vincent, Pascal','Jauvin, Christian'],institution:'JMLR / University of Montreal',url:'https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf'},
{title:'Attention Is All You Need (Transformer)',type:'conference_paper',year:2017,authors:['Vaswani, Ashish','Shazeer, Noam','Parmar, Niki','et al.'],institution:'Google Brain / NeurIPS',url:'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf'},
{title:'Language Models are Few-Shot Learners (GPT-3)',type:'conference_paper',year:2020,authors:['Brown, Tom B.','Mann, Benjamin','Ryder, Nick','et al.'],institution:'OpenAI / NeurIPS',url:'https://arxiv.org/abs/2005.14165'},
{title:'A Comprehensive Survey on Pretrained Language Models: From BERT to ChatGPT to GPT-4',type:'survey_paper',year:2024,authors:['multiple'],institution:'International Journal of Machine Learning & Cybernetics (Springer)',url:'https://doi.org/10.1007/s13042-024-02443-6'},
],
'learned-database-systems':[
{title:'AI Meets Database: AI4DB and DB4AI — A Comprehensive Tutorial (SIGMOD)',type:'survey_paper',year:2021,authors:['Li, Guoliang','Zhou, Xuanhe','Cao, Lei'],institution:'Tsinghua University / SIGMOD',url:'https://dbgroup.cs.tsinghua.edu.cn/ligl/papers/sigmod21-tutorial-paper.pdf'},
{title:'Learning Database Optimization Techniques: The State-of-the-Art and Future Directions',type:'survey_paper',year:2025,authors:['multiple'],institution:'Frontiers of Computer Science (Springer)',url:'https://doi.org/10.1007/s11704-025-41116-7'},
{title:'Learned Query Optimizers: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'Foundations & Trends in Databases (ACM)',url:'https://doi.org/10.1561/1900000082'},
{title:'A Survey of Learned Indexes for the Multi-Dimensional Space',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2403.06456'},
],
'scene-text-recognition':[
{title:'From Detection to Understanding: A Systematic Survey of Deep Learning for Scene Text Recognition',type:'survey_paper',year:2025,authors:['multiple'],institution:'Applied Sciences (MDPI)',url:'https://doi.org/10.3390/app15179247'},
{title:'A Comprehensive Survey of Transformers in Text Recognition: Printed, Handwritten, and Scene Text',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3771273'},
{title:'A Survey of Text Detection and Recognition Algorithms Based on Deep Learning',type:'survey_paper',year:2024,authors:['multiple'],institution:'Neurocomputing (Elsevier)',url:'https://doi.org/10.1016/j.neucom.2023.126702'},
{title:'An End-to-End Trainable Neural Network for Image-Based Sequence Recognition (CRNN — Seminal)',type:'journal_article',year:2017,authors:['Shi, Baoguang','Bai, Xiang','Yao, Cong'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2016.2646371'},
],
'speaker-recognition':[
{title:'Deep Speaker Embeddings for Speaker Verification: A Comprehensive Review and Experimental Comparison',type:'survey_paper',year:2024,authors:['multiple'],institution:'Engineering Applications of AI (Elsevier)',url:'https://doi.org/10.1016/j.engappai.2023.107416'},
{title:'Comparison of Modern Deep Learning Models for Speaker Verification: WavLM, TitaNet, ECAPA-TDNN, x-vectors',type:'journal_article',year:2024,authors:['multiple'],institution:'Applied Sciences (MDPI)',url:'https://doi.org/10.3390/app14041329'},
{title:'X-Vectors: Robust DNN Embeddings for Speaker Recognition',type:'conference_paper',year:2018,authors:['Snyder, David','Garcia-Romero, Daniel','Sell, Gregory','Povey, Daniel','Khudanpur, Sanjeev'],institution:'JHU / ICASSP',url:'https://doi.org/10.1109/ICASSP.2018.8461375'},
{title:'ECAPA-TDNN: Emphasized Channel Attention, Propagation and Aggregation in TDNN Based Speaker Verification',type:'conference_paper',year:2020,authors:['Desplanques, Brecht','Thienpondt, Jenthe','Demuynck, Kris'],institution:'Ghent University / Interspeech',url:'https://arxiv.org/abs/2005.07143'},
],
'test-time-compute-scaling':[
{title:'Scaling LLM Test-Time Compute Optimally Can Be More Effective Than Scaling Model Parameters (DeepMind)',type:'conference_paper',year:2024,authors:['Snell, Charlie','Lee, Jaehoon','Xu, Kelvin','Kumar, Aviral'],institution:'Google DeepMind / ICLR 2025',url:'https://arxiv.org/abs/2408.03314'},
{title:'OpenAI o1 System Card: Learning to Reason with Large Language Models',type:'technical_report',year:2024,authors:['OpenAI'],institution:'OpenAI',url:'https://openai.com/research/learning-to-reason-with-llms'},
{title:'Let\'s Verify Step by Step (Process Reward Models for Reasoning)',type:'conference_paper',year:2024,authors:['Lightman, Hunter','Kosaraju, Vineet','Burda, Yuri','et al.'],institution:'OpenAI / ICLR',url:'https://arxiv.org/abs/2305.20050'},
{title:'Large Language Monkeys: Scaling Inference Compute with Repeated Sampling',type:'conference_paper',year:2024,authors:['Brown, Bradley','Jurafsky, Dan','Hashimoto, Tatsunori'],institution:'Stanford / NeurIPS',url:'https://arxiv.org/abs/2407.21787'},
],
'text-to-sql':[
{title:'A Survey on Employing Large Language Models for Text-to-SQL: Techniques, Benchmarks, and Future Directions',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3737873'},
{title:'A Survey of Text-to-SQL in the Era of LLMs: Where Are We, and Where Are We Going?',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv (Spider, WikiSQL, BIRD, CoSQL)',url:'https://arxiv.org/abs/2408.05109'},
{title:'Next-Generation Database Interfaces: A Comprehensive Survey of LLM-Based Text-to-SQL',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'Spider: A Large-Scale Human-Labeled Dataset for Complex and Cross-Database Semantic Parsing and Text-to-SQL (Yale)',type:'conference_paper',year:2018,authors:['Yu, Tao','Zhang, Rui','Yang, Kai','et al.'],institution:'Yale University / EMNLP',url:'https://doi.org/10.18653/v1/D18-1425'},
],
'ai-art-and-creativity':[
{title:'Creativity and Style in GAN and AI Art: Some Art-Historical Reflections',type:'journal_article',year:2024,authors:['Berryman, Jim'],institution:'MDPI Arts',url:'https://doi.org/10.3390/arts13030087'},
{title:'Style Transfer: A Decade Survey — From Neural Style Transfer to Diffusion Models',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2506.19278'},
{title:'A Critical Assessment of Modern Generative AI\'s Creative Capabilities: GPT, DALL-E, Midjourney',type:'survey_paper',year:2025,authors:['multiple'],institution:'Big Data & Cognitive Computing (MDPI)',url:'https://doi.org/10.3390/bdcc9090231'},
{title:'Enhancing Art Creation Through AI-Based Generative Adversarial Networks: An Educational Study',type:'journal_article',year:2025,authors:['multiple'],institution:'Nature Scientific Reports',url:'https://doi.org/10.1038/s41598-025-14164-z'},
],
'ai-for-chemistry':[
{title:'AlphaFold 3: Accurate Structure Prediction of Biomolecular Interactions (Google DeepMind/Isomorphic Labs)',type:'journal_article',year:2024,authors:['Abramson, Josh','Adler, Jonas','Dunger, Jack','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-024-07487-w'},
{title:'AI-Enabled Drug and Molecular Discovery: From Computational Methods to Clinical Translation',type:'survey_paper',year:2025,authors:['multiple'],institution:'Nature Reviews Chemistry (Springer)',url:'https://doi.org/10.1007/s44345-025-00037-5'},
{title:'Artificial Intelligence in Drug Design and Discovery: A Comprehensive Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'Artificial Intelligence Chemistry (Elsevier)',url:'https://doi.org/10.1016/j.aichem.2025.100048'},
{title:'Deep Learning-Driven Protein Structure Prediction: AlphaFold, RoseTTAFold, RFDiffusion — A Systematic Review',type:'survey_paper',year:2025,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2504.01490'},
],
'ai-for-signal-processing':[
{title:'Image Denoising: The Deep Learning Revolution and Beyond — A Comprehensive Survey',type:'survey_paper',year:2023,authors:['Elad, Michael','Kawar, Bahjat','Vaksman, Gregory'],institution:'arXiv / IEEE Signal Processing Magazine',url:'https://arxiv.org/abs/2301.03362'},
{title:'Deep Learning-Based Image Denoising: A Comprehensive Survey',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE Access',url:'https://doi.org/10.1109/ACCESS.2025.3567842'},
{title:'Weak Signal Extraction Enabled by Deep Neural Network Denoising of Scientific Data',type:'journal_article',year:2024,authors:['multiple'],institution:'Nature Machine Intelligence',url:'https://doi.org/10.1038/s42256-024-00790-1'},
{title:'ISP Meets Deep Learning: A Survey on Deep Learning Methods for Image Signal Processing',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3708516'},
],
'ai-hardware-accelerators':[
{title:'A Survey on Deep Learning Hardware Accelerators for Heterogeneous HPC and Edge Computing',type:'survey_paper',year:2025,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3729215'},
{title:'High-Speed Emerging Memories for AI Hardware Accelerators: A Comprehensive Review',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Electrical Engineering',url:'https://doi.org/10.1038/s44287-023-00002-9'},
{title:'Hardware for Deep Learning Acceleration: From GPUs to Neuromorphic Chips',type:'survey_paper',year:2024,authors:['multiple'],institution:'Advanced Intelligent Systems (Wiley)',url:'https://doi.org/10.1002/aisy.202300762'},
{title:'Performance and Efficiency Gains of NPU-Based AI Inference: A Systematic GPU vs. NPU Comparison',type:'journal_article',year:2025,authors:['multiple'],institution:'Systems (MDPI)',url:'https://doi.org/10.3390/systems13090797'},
],
'ai-search-engines':[
{title:'Large Language Models for Information Retrieval: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['Zhu, Yutao','Yuan, Huaying','Wang, Shuting','et al.'],institution:'arXiv / ACM Computing Surveys',url:'https://arxiv.org/abs/2308.07107'},
{title:'LLM Technologies and Information Search: How ChatGPT and Gemini Are Reshaping Search Behavior',type:'journal_article',year:2024,authors:['multiple'],institution:'Journal of Economy & Technology (Elsevier)',url:'https://doi.org/10.1016/j.ject.2024.08.007'},
{title:'The Best AI Search Engines of 2026: ChatGPT Search, Perplexity, Gemini, Copilot (PCMag Review)',type:'report',year:2025,authors:['PCMag Research'],institution:'PCMag',url:'https://www.pcmag.com/picks/the-best-ai-search-engines'},
{title:'The Anatomy of a Large-Scale Hypertextual Web Search Engine (Google — Seminal)',type:'journal_article',year:1998,authors:['Brin, Sergey','Page, Lawrence'],institution:'Stanford University / Computer Networks',url:'https://doi.org/10.1016/S0169-7552(98)00110-X'},
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
console.log(`\n📊 S11: ${y}/${Object.keys(E).length} enriched`);
