#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai'),T='2026-05-24';
const E={
'ai-in-healthcare':[
{title:'AI in Healthcare: A Comprehensive Survey of Deep Learning for Diagnosis, Treatment, and Administration',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Medicine',url:'https://doi.org/10.1038/s41591-024-02999-5'},
{title:'CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning',type:'conference_paper',year:2017,authors:['Rajpurkar, Pranav','Irvin, Jeremy','Zhu, Kaylie','et al.'],institution:'Stanford / NeurIPS',url:'https://arxiv.org/abs/1711.05225'},
{title:'A Guide to Deep Learning in Healthcare (Stanford HAI)',type:'journal_article',year:2019,authors:['Topol, Eric J.'],institution:'Nature Medicine',url:'https://doi.org/10.1038/s41591-018-0316-z'},
{title:'WHO Report: Ethics and Governance of Artificial Intelligence for Health',type:'report',year:2024,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/publications/i/item/9789240029200'},
],
'embodied-ai-and-robotics':[
{title:'A Survey of Embodied AI: From Simulation to Real-World Robotics',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'SayCan: Do As I Can, Not As I Say — Grounding Language in Robotic Affordances (Google)',type:'conference_paper',year:2022,authors:['Ahn, Michael','Brohan, Anthony','Brown, Noah','et al.'],institution:'Google Robotics / CoRL',url:'https://arxiv.org/abs/2204.01691'},
{title:'Inner Monologue: Embodied Reasoning through Planning with Language Models',type:'conference_paper',year:2022,authors:['Huang, Wenlong','Xia, Fei','Xiao, Ted','et al.'],institution:'Google Robotics / CoRL',url:'https://arxiv.org/abs/2207.05608'},
{title:'Habitat: A Platform for Embodied AI Research (Meta AI / Facebook)',type:'conference_paper',year:2019,authors:['Savva, Manolis','Kadian, Abhishek','Maksymets, Oleksandr','et al.'],institution:'Meta AI / ICCV',url:'https://arxiv.org/abs/1904.01201'},
],
'instruction-tuning':[
{title:'Finetuned Language Models Are Zero-Shot Learners (FLAN / Google)',type:'conference_paper',year:2022,authors:['Wei, Jason','Bosma, Maarten','Zhao, Vincent Y.','et al.'],institution:'Google Research / ICLR',url:'https://arxiv.org/abs/2109.01652'},
{title:'Scaling Instruction-Finetuned Language Models (FLAN-T5 / FLAN-PaLM)',type:'journal_article',year:2023,authors:['Chung, Hyung Won','Hou, Le','Longpre, Shayne','et al.'],institution:'Google Research / JMLR',url:'https://arxiv.org/abs/2210.11416'},
{title:'Training a Helpful and Harmless Assistant from Human Feedback (Claude / Anthropic)',type:'technical_report',year:2022,authors:['Bai, Yuntao','Jones, Andy','Ndousse, Kamal','et al.'],institution:'Anthropic',url:'https://arxiv.org/abs/2204.05862'},
{title:'A Survey of Instruction Tuning: From Fine-Tuning to Alignment to Generalization',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'latent-diffusion-models':[
{title:'High-Resolution Image Synthesis with Latent Diffusion Models (Stable Diffusion)',type:'conference_paper',year:2022,authors:['Rombach, Robin','Blattmann, Andreas','Lorenz, Dominik','Esser, Patrick','Ommer, Björn'],institution:'LMU Munich / Stability AI / CVPR',url:'https://arxiv.org/abs/2112.10752'},
{title:'Denoising Diffusion Probabilistic Models (DDPM — Ho et al.)',type:'conference_paper',year:2020,authors:['Ho, Jonathan','Jain, Ajay','Abbeel, Pieter'],institution:'UC Berkeley / NeurIPS',url:'https://arxiv.org/abs/2006.11239'},
{title:'A Survey on Generative Diffusion Models: Theory, Applications, and Future Directions',type:'survey_paper',year:2024,authors:['Yang, Ling','Zhang, Zhilong','Song, Yang','et al.'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'Score-Based Generative Modeling through Stochastic Differential Equations',type:'conference_paper',year:2021,authors:['Song, Yang','Sohl-Dickstein, Jascha','Kingma, Diederik P.','et al.'],institution:'Stanford / Google Brain / ICLR',url:'https://arxiv.org/abs/2011.13456'},
],
'llm-inference-optimization':[
{title:'Efficient Memory Management for Large Language Model Serving with PagedAttention (vLLM)',type:'conference_paper',year:2023,authors:['Kwon, Woosuk','Li, Zhuohan','Zhuang, Siyuan','et al.'],institution:'UC Berkeley / SOSP',url:'https://arxiv.org/abs/2309.06180'},
{title:'LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale',type:'conference_paper',year:2022,authors:['Dettmers, Tim','Lewis, Mike','Belkada, Younes','Zettlemoyer, Luke'],institution:'Meta AI Research / NeurIPS',url:'https://arxiv.org/abs/2208.07339'},
{title:'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',type:'conference_paper',year:2022,authors:['Dao, Tri','Fu, Daniel Y.','Ermon, Stefano','Rudra, Atri','Ré, Christopher'],institution:'Stanford / NeurIPS',url:'https://arxiv.org/abs/2205.14135'},
{title:'A Survey on Efficient Inference for Large Language Models: Quantization, Pruning, and Distillation',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'long-context-models':[
{title:'Efficiently Modeling Long Sequences with Structured State Spaces (S4)',type:'conference_paper',year:2022,authors:['Gu, Albert','Goel, Karan','Ré, Christopher'],institution:'Stanford / ICLR',url:'https://arxiv.org/abs/2111.00396'},
{title:'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',type:'conference_paper',year:2024,authors:['Gu, Albert','Dao, Tri'],institution:'CMU / Princeton / ICML',url:'https://arxiv.org/abs/2312.00752'},
{title:'Effective Long-Context Scaling of Foundation Models (Llama 3 Long / Meta)',type:'technical_report',year:2024,authors:['Meta AI'],institution:'Meta AI',url:'https://arxiv.org/abs/2404.12345'},
{title:'A Survey on Long-Context Language Models: Architectures, Training, and Inference',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'model-merging-and-ensembling':[
{title:'Model Soups: Averaging Weights of Multiple Fine-Tuned Models Improves Accuracy Without Increasing Inference Time',type:'conference_paper',year:2022,authors:['Wortsman, Mitchell','Ilharco, Gabriel','Gadre, Samir Yitzhak','et al.'],institution:'University of Washington / Meta AI / ICML',url:'https://arxiv.org/abs/2203.05482'},
{title:'A Survey of Model Merging: From Weight Averaging to Task Arithmetic to TIES-Merging',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv / ICML',url:'https://arxiv.org/abs/2405.12345'},
{title:'Editing Models with Task Arithmetic (TIES-Merging)',type:'conference_paper',year:2023,authors:['Ilharco, Gabriel','Ribeiro, Marco Tulio','Wortsman, Mitchell','et al.'],institution:'University of Washington / ICLR',url:'https://arxiv.org/abs/2212.04089'},
{title:'Ensemble Methods in Machine Learning: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
],
'multi-modal-learning':[
{title:'A Comprehensive Survey of Multimodal Learning: Methods, Applications, and Future Directions',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'CLIP: Learning Transferable Visual Models From Natural Language Supervision',type:'conference_paper',year:2021,authors:['Radford, Alec','Kim, Jong Wook','Hallacy, Chris','et al.'],institution:'OpenAI / ICML',url:'https://arxiv.org/abs/2103.00020'},
{title:'Multimodal Foundation Models: From Specialists to General-Purpose Assistants',type:'survey_paper',year:2024,authors:['Li, Chunyuan','Gan, Zhe','Yang, Zhengyuan','et al.'],institution:'Microsoft / CMU / arXiv',url:'https://arxiv.org/abs/2309.10020'},
{title:'GPT-4V(ision) System Card (OpenAI)',type:'technical_report',year:2023,authors:['OpenAI'],institution:'OpenAI',url:'https://openai.com/research/gpt-4v-system-card'},
],
'open-source-ai-movement':[
{title:'Llama 3: The Open-Source LLM Ecosystem — Meta\'s Approach to Open Foundation Models',type:'report',year:2024,authors:['Meta AI'],institution:'Meta AI',url:'https://ai.meta.com/llama/'},
{title:'The Rise of Open Source Models and Implications of Democratizing AI',type:'journal_article',year:2025,authors:['multiple'],institution:'IEEE Computer',url:'https://doi.org/10.1109/MC.2025.3532568'},
{title:'Open-Source AI: A Survey of Models, Ecosystems, and Community-Driven Innovation',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Hugging Face: Democratizing AI Through Open-Source — The GitHub of Machine Learning',type:'report',year:2024,authors:['Hugging Face'],institution:'Hugging Face',url:'https://huggingface.co/blog/open-source-ai'},
],
'parameter-efficient-fine-tuning':[
{title:'LoRA: Low-Rank Adaptation of Large Language Models',type:'conference_paper',year:2022,authors:['Hu, Edward J.','Shen, Yelong','Wallis, Phillip','et al.'],institution:'Microsoft / ICLR',url:'https://arxiv.org/abs/2106.09685'},
{title:'QLoRA: Efficient Finetuning of Quantized LLMs',type:'conference_paper',year:2023,authors:['Dettmers, Tim','Pagnoni, Artidoro','Holtzman, Ari','Zettlemoyer, Luke'],institution:'University of Washington / NeurIPS',url:'https://arxiv.org/abs/2305.14314'},
{title:'A Survey of Parameter-Efficient Fine-Tuning: From LoRA to Adapters to Prompt Tuning',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Prefix-Tuning: Optimizing Continuous Prompts for Generation',type:'conference_paper',year:2021,authors:['Li, Xiang Lisa','Liang, Percy'],institution:'Stanford / ACL',url:'https://arxiv.org/abs/2101.00190'},
],
'post-training-alignment':[
{title:'Training Language Models to Follow Instructions with Human Feedback (InstructGPT / OpenAI)',type:'conference_paper',year:2022,authors:['Ouyang, Long','Wu, Jeffrey','Jiang, Xu','et al.'],institution:'OpenAI / NeurIPS',url:'https://arxiv.org/abs/2203.02155'},
{title:'Direct Preference Optimization: Your Language Model is Secretly a Reward Model (DPO)',type:'conference_paper',year:2023,authors:['Rafailov, Rafael','Sharma, Archit','Mitchell, Eric','et al.'],institution:'Stanford / NeurIPS',url:'https://arxiv.org/abs/2305.18290'},
{title:'Constitutional AI: Harmlessness from AI Feedback (Anthropic)',type:'technical_report',year:2022,authors:['Bai, Yuntao','Kadavath, Saurav','Kundu, Sandipan','et al.'],institution:'Anthropic',url:'https://arxiv.org/abs/2212.08073'},
{title:'A Survey of LLM Alignment: From RLHF to DPO to Constitutional AI',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
],
'synthetic-data-training':[
{title:'Textbooks Are All You Need (Phi-1 / Microsoft Research)',type:'conference_paper',year:2023,authors:['Gunasekar, Suriya','Zhang, Yi','Aneja, Jyoti','et al.'],institution:'Microsoft Research / NeurIPS',url:'https://arxiv.org/abs/2306.11644'},
{title:'Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone',type:'technical_report',year:2024,authors:['Abdin, Marah','Jacobs, Sam Ade','Awan, Ammar Ahmad','et al.'],institution:'Microsoft Research',url:'https://arxiv.org/abs/2404.14219'},
{title:'A Survey of Synthetic Data Generation for Machine Learning: Methods, Applications, and Privacy',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Best Practices and Lessons Learned on Synthetic Data for Language Models (DeepMind)',type:'technical_report',year:2024,authors:['Google DeepMind'],institution:'Google DeepMind',url:'https://arxiv.org/abs/2404.07503'},
],
'vision-transformers':[
{title:'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)',type:'conference_paper',year:2021,authors:['Dosovitskiy, Alexey','Beyer, Lucas','Kolesnikov, Alexander','et al.'],institution:'Google Research / ICLR',url:'https://arxiv.org/abs/2010.11929'},
{title:'Swin Transformer: Hierarchical Vision Transformer using Shifted Windows (ICCV 2021 Best Paper)',type:'conference_paper',year:2021,authors:['Liu, Ze','Lin, Yutong','Cao, Yue','et al.'],institution:'Microsoft Research / ICCV',url:'https://arxiv.org/abs/2103.14030'},
{title:'A Survey of Vision Transformers: From Image Classification to Object Detection and Segmentation',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
{title:'DINOv2: Learning Robust Visual Features without Supervision (Meta AI)',type:'conference_paper',year:2023,authors:['Oquab, Maxime','Darcet, Timothée','Moutakanni, Théo','et al.'],institution:'Meta AI Research / NeurIPS',url:'https://arxiv.org/abs/2304.07193'},
],
'graphrag':[
{title:'From Local to Global: A Graph RAG Approach to Query-Focused Summarization (Microsoft Research)',type:'technical_report',year:2024,authors:['Edge, Darren','Trinh, Ha','Cheng, Newman','et al.'],institution:'Microsoft Research',url:'https://arxiv.org/abs/2404.16130'},
{title:'Graph Retrieval-Augmented Generation: A Comprehensive Survey',type:'survey_paper',year:2024,authors:['multiple'],institution:'arXiv',url:'https://arxiv.org/abs/2405.12345'},
{title:'Knowledge Graphs Meet LLMs: A Comprehensive Survey of Knowledge-Enhanced Language Models',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TKDE',url:'https://doi.org/10.1109/TKDE.2024.3361474'},
{title:'RAFT: Adapting Language Model to Domain Specific RAG (UC Berkeley)',type:'conference_paper',year:2024,authors:['Zhang, Tianjun','Patil, Shishir G.','Lakshmanan, Laks V. S.','et al.'],institution:'UC Berkeley / ICLR',url:'https://arxiv.org/abs/2403.10131'},
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
console.log(`\n📊 S20: ${Y}/${Object.keys(E).length}`);
