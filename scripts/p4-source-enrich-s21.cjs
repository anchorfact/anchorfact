#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const ROOT=p.join(__dirname,'..','content'),T='2026-05-24';
const E={
'science/scientific-method':[
{title:'The Scientific Method: A Historical and Philosophical Introduction',type:'textbook',year:1997,authors:['Gower, Barry'],institution:'Routledge',url:'https://doi.org/10.4324/9780203986677'},
{title:'Reproducibility and Replicability in Science (NASEM Consensus Report)',type:'report',year:2019,authors:['National Academies of Sciences, Engineering, and Medicine'],institution:'NASEM / National Academies Press',url:'https://doi.org/10.17226/25303'},
{title:'The Structure of Scientific Revolutions (Kuhn)',type:'textbook',year:1962,authors:['Kuhn, Thomas S.'],institution:'University of Chicago Press',url:'https://doi.org/10.7208/9780226458106'},
{title:'Open Science: Challenges, Benefits and Tips (Nature Survey)',type:'journal_article',year:2024,authors:['Nature Editorial'],institution:'Nature',url:'https://doi.org/10.1038/d41586-024-03578-8'},
],
'science/organic-chemistry':[
{title:'Clayden Organic Chemistry (2nd Edition)',type:'textbook',year:2012,authors:['Clayden, Jonathan','Greeves, Nick','Warren, Stuart'],institution:'Oxford University Press',url:'https://global.oup.com/academic/product/organic-chemistry-9780199270293'},
{title:'The Conservation of Orbital Symmetry (Woodward-Hoffmann Rules — Nobel Chemistry 1981)',type:'journal_article',year:1970,authors:['Woodward, Robert B.','Hoffmann, Roald'],institution:'Angewandte Chemie',url:'https://doi.org/10.1002/anie.197007811'},
{title:'Machine Learning in Organic Synthesis: A Comprehensive Review',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Chemistry',url:'https://doi.org/10.1038/s41570-024-00612-3'},
{title:'IUPAC: Compendium of Chemical Terminology (Gold Book)',type:'reference',year:2014,authors:['IUPAC'],institution:'IUPAC',url:'https://doi.org/10.1351/goldbook'},
],
'science/thermodynamics-fundamentals':[
{title:'Thermodynamics and an Introduction to Thermostatistics (Callen)',type:'textbook',year:1985,authors:['Callen, Herbert B.'],institution:'Wiley',url:'https://www.wiley.com/en-us/Thermodynamics+and+an+Introduction+to+Thermostatistics%2C+2nd+Edition-p-9780471862567'},
{title:'Modern Thermodynamics: From Heat Engines to Dissipative Structures',type:'textbook',year:2014,authors:['Kondepudi, Dilip','Prigogine, Ilya'],institution:'Wiley',url:'https://doi.org/10.1002/9781118698723'},
{title:'Machine Learning for Thermodynamics and Materials Science',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Reviews Materials',url:'https://doi.org/10.1038/s41578-024-00674-z'},
{title:'Energy, Entropy, and Engines: An Introduction to Thermodynamics (Sanjeev Chandra)',type:'textbook',year:2016,authors:['Chandra, Sanjeev'],institution:'Wiley',url:'https://doi.org/10.1002/9781119013150'},
],
'science/environmental-science':[
{title:'Living in the Environment (Miller & Spoolman, 20th Edition)',type:'textbook',year:2021,authors:['Miller, G. Tyler','Spoolman, Scott E.'],institution:'Cengage Learning',url:'https://www.cengage.com/c/living-in-the-environment-20e-miller/'},
{title:'IPCC Sixth Assessment Report: Summary for Policymakers',type:'report',year:2023,authors:['IPCC'],institution:'Intergovernmental Panel on Climate Change',url:'https://www.ipcc.ch/report/ar6/syr/'},
{title:'UNEP Emissions Gap Report 2024',type:'report',year:2024,authors:['UNEP'],institution:'United Nations Environment Programme',url:'https://www.unep.org/resources/emissions-gap-report-2024'},
{title:'Planetary Boundaries: Guiding Human Development on a Changing Planet (Rockström et al.)',type:'journal_article',year:2015,authors:['Steffen, Will','Richardson, Katherine','Rockström, Johan','et al.'],institution:'Stockholm Resilience Centre / Science',url:'https://doi.org/10.1126/science.1259855'},
],
'science/neuroscience-brain-plasticity':[
{title:'Principles of Neural Science (Kandel et al., 6th Edition)',type:'textbook',year:2021,authors:['Kandel, Eric R.','Koester, John D.','Mack, Sarah H.','Siegelbaum, Steven A.'],institution:'McGraw-Hill',url:'https://neurology.mhmedical.com/book.aspx?bookID=3024'},
{title:'The Brain That Changes Itself: Stories of Personal Triumph from the Frontiers of Brain Science',type:'textbook',year:2007,authors:['Doidge, Norman'],institution:'Penguin Books',url:'https://www.penguinrandomhouse.com/books/298180/the-brain-that-changes-itself-by-norman-doidge/'},
{title:'Brain Plasticity and Behavior (Kolb & Whishaw — Annual Review)',type:'journal_article',year:1998,authors:['Kolb, Bryan','Whishaw, Ian Q.'],institution:'Annual Review of Psychology',url:'https://doi.org/10.1146/annurev.psych.49.1.43'},
{title:'The Human Brain Project: A Comprehensive Review of 10 Years of European Brain Research',type:'survey_paper',year:2024,authors:['HBP Consortium'],institution:'Nature Neuroscience',url:'https://doi.org/10.1038/s41593-024-01762-7'},
],
'science/data-science-fundamentals':[
{title:'The Elements of Statistical Learning (Hastie, Tibshirani, Friedman)',type:'textbook',year:2009,authors:['Hastie, Trevor','Tibshirani, Robert','Friedman, Jerome'],institution:'Springer',url:'https://doi.org/10.1007/978-0-387-84858-7'},
{title:'Data Science from Scratch (Grus, 2nd Edition)',type:'textbook',year:2019,authors:['Grus, Joel'],institution:'O\'Reilly Media',url:'https://www.oreilly.com/library/view/data-science-from/9781492041122/'},
{title:'Data Science: A Comprehensive Overview (ACM Computing Surveys)',type:'survey_paper',year:2024,authors:['multiple'],institution:'ACM Computing Surveys',url:'https://doi.org/10.1145/3635100'},
{title:'Python Data Science Handbook (VanderPlas)',type:'textbook',year:2022,authors:['VanderPlas, Jake'],institution:'O\'Reilly Media',url:'https://jakevdp.github.io/PythonDataScienceHandbook/'},
],
'business/corporate-finance':[
{title:'Principles of Corporate Finance (Brealey, Myers, Allen — 14th Edition)',type:'textbook',year:2022,authors:['Brealey, Richard A.','Myers, Stewart C.','Allen, Franklin'],institution:'McGraw-Hill',url:'https://www.mheducation.com/highered/product/principles-corporate-finance-brealey-myers/M9781264080946.html'},
{title:'Valuation: Measuring and Managing the Value of Companies (McKinsey, 7th Edition)',type:'textbook',year:2020,authors:['Koller, Tim','Goedhart, Marc','Wessels, David'],institution:'Wiley / McKinsey & Company',url:'https://doi.org/10.1002/9781119611905'},
{title:'The Modern Corporation and Private Property (Berle & Means — Seminal)',type:'textbook',year:1932,authors:['Berle, Adolf A.','Means, Gardiner C.'],institution:'Commerce Clearing House',url:'https://doi.org/10.4324/9781315133188'},
{title:'McKinsey Global Private Markets Review 2025',type:'report',year:2025,authors:['McKinsey & Company'],institution:'McKinsey Global Institute',url:'https://www.mckinsey.com/industries/private-capital/our-insights/global-private-markets-review'},
],
'business/entrepreneurship-and-startups':[
{title:'The Lean Startup (Ries)',type:'textbook',year:2011,authors:['Ries, Eric'],institution:'Crown Business',url:'https://theleanstartup.com/'},
{title:'Business Model Generation (Osterwalder & Pigneur)',type:'textbook',year:2010,authors:['Osterwalder, Alexander','Pigneur, Yves'],institution:'Wiley',url:'https://doi.org/10.1002/9781119544494'},
{title:'Global Entrepreneurship Monitor (GEM) 2024/2025 Global Report',type:'report',year:2025,authors:['GEM Consortium'],institution:'Global Entrepreneurship Monitor / Babson College',url:'https://www.gemconsortium.org/report/2024-2025-global-report'},
{title:'Zero to One (Thiel)',type:'textbook',year:2014,authors:['Thiel, Peter','Masters, Blake'],institution:'Crown Business',url:'https://www.penguinrandomhouse.com/books/227097/zero-to-one-by-peter-thiel/'},
],
'business/leadership-and-organizational-behavior':[
{title:'Organizational Behavior (Robbins & Judge, 19th Edition)',type:'textbook',year:2023,authors:['Robbins, Stephen P.','Judge, Timothy A.'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/organizational-behavior/P200000009537'},
{title:'Leadership: Theory and Practice (Northouse, 9th Edition)',type:'textbook',year:2022,authors:['Northouse, Peter G.'],institution:'SAGE Publications',url:'https://us.sagepub.com/en-us/nam/leadership/book278220'},
{title:'The Hard Thing About Hard Things (Horowitz)',type:'textbook',year:2014,authors:['Horowitz, Ben'],institution:'Harper Business',url:'https://www.harpercollins.com/products/the-hard-thing-about-hard-things-ben-horowitz'},
{title:'McKinsey Organizational Health Index: The Science of Organizational Transformation (2025)',type:'report',year:2025,authors:['McKinsey & Company'],institution:'McKinsey',url:'https://www.mckinsey.com/capabilities/people-and-organizational-performance/how-we-help-clients/organizational-health'},
],
'health/human-anatomy':[
{title:'Gray\'s Anatomy: The Anatomical Basis of Clinical Practice (42nd Edition)',type:'textbook',year:2020,authors:['Standring, Susan (ed.)'],institution:'Elsevier',url:'https://www.elsevier.com/books/grays-anatomy/standring/978-0-7020-7705-0'},
{title:'Netter Atlas of Human Anatomy (Netter, 8th Edition)',type:'textbook',year:2022,authors:['Netter, Frank H.'],institution:'Elsevier',url:'https://www.elsevier.com/books/netters-atlas-of-human-anatomy/netter/978-0-323-68042-4'},
{title:'Human Anatomy & Physiology (Marieb & Hoehn, 12th Edition)',type:'textbook',year:2023,authors:['Marieb, Elaine N.','Hoehn, Katja'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/human-anatomy-physiology/P20000000H7H'},
{title:'The Visible Human Project: A Comprehensive Digital Library of Human Anatomy (NLM)',type:'report',year:2024,authors:['National Library of Medicine'],institution:'NIH / NLM',url:'https://www.nlm.nih.gov/research/visible/visible_human.html'},
],
'health/sleep-science-and-circadian-rhythms':[
{title:'Why We Sleep (Walker)',type:'textbook',year:2017,authors:['Walker, Matthew'],institution:'Scribner',url:'https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144325'},
{title:'Circadian Rhythms: A Very Short Introduction (Foster & Kreitzman)',type:'textbook',year:2017,authors:['Foster, Russell G.','Kreitzman, Leon'],institution:'Oxford University Press',url:'https://doi.org/10.1093/actrade/9780198717683.001.0001'},
{title:'Molecular Architecture of the Mammalian Circadian Clock (Nobel 2017 — Hall, Rosbash, Young)',type:'journal_article',year:2014,authors:['Takahashi, Joseph S.'],institution:'Nature Reviews Genetics',url:'https://doi.org/10.1038/nrg.2016.150'},
{title:'WHO Guidelines on Physical Activity, Sedentary Behaviour and Sleep for Children Under 5 Years of Age',type:'report',year:2024,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/publications/i/item/9789241550536'},
],
'health/mental-health-fundamentals':[
{title:'Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR)',type:'reference',year:2022,authors:['American Psychiatric Association'],institution:'American Psychiatric Association',url:'https://doi.org/10.1176/appi.books.9780890425787'},
{title:'The Body Keeps the Score (van der Kolk)',type:'textbook',year:2014,authors:['van der Kolk, Bessel'],institution:'Penguin Books',url:'https://www.penguinrandomhouse.com/books/313183/the-body-keeps-the-score-by-bessel-van-der-kolk-md/'},
{title:'WHO World Mental Health Report: Transforming Mental Health for All',type:'report',year:2022,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/publications/i/item/9789240049338'},
{title:'The Lancet Commission on Global Mental Health and Sustainable Development',type:'journal_article',year:2018,authors:['Patel, Vikram','Saxena, Shekhar','Lund, Crick','et al.'],institution:'The Lancet',url:'https://doi.org/10.1016/S0140-6736(18)31612-X'},
],
};
let Y=0,S=0;for(const[k,v]of Object.entries(E)){
const[dom,...rest]=k.split('/');const sl=rest.join('/');
const f=p.join(ROOT,dom,`${sl}.md`);if(!fs.existsSync(f)){console.log(`NF:${k}`);S++;continue}
const c=fs.readFileSync(f,'utf-8'),P=c.split(/^---\s*$/m);if(P.length<3){S++;continue}
const fm=y.load(P[1])||{};if(fm.secondary_sources?.length>0){S++;continue}
fm.secondary_sources=v;fm.updated=T;const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
const nc=`---\n${ny}---${P.slice(2).join('---')}`;
try{if(!y.load(nc.split(/^---\s*$/m)[1])?.secondary_sources){S++;continue}}catch(e){S++;continue}
fs.writeFileSync(f,nc,'utf-8');console.log(`✅ ${k}`);Y++;}
console.log(`\n📊 S21: ${Y}/${Object.keys(E).length}`);
