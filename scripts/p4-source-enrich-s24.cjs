#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const ROOT=p.join(__dirname,'..','content'),T='2026-05-24';
const E={
'science/geological-time':[
{title:'A Geologic Time Scale 2020 (Gradstein, Ogg, Schmitz, Ogg — Elsevier)',type:'textbook',year:2020,authors:['Gradstein, Felix M.','Ogg, James G.','Schmitz, Mark D.','Ogg, Gabi'],institution:'Elsevier',url:'https://doi.org/10.1016/C2020-0-03823-2'},
{title:'The Geologic Time Spiral — A Path to the Past (USGS)',type:'reference',year:2024,authors:['USGS'],institution:'United States Geological Survey',url:'https://pubs.usgs.gov/gip/geotime/'},
{title:'International Chronostratigraphic Chart (ICS/IUGS 2024)',type:'reference',year:2024,authors:['International Commission on Stratigraphy'],institution:'IUGS',url:'https://stratigraphy.org/chart'},
{title:'Deep Time: An Illustrated History of Earth (Hazen)',type:'textbook',year:2024,authors:['Hazen, Robert M.'],institution:'W. W. Norton',url:'https://wwnorton.com/books/9780393608403'},
],
'business/economics-fundamentals':[
{title:'Economics (Samuelson & Nordhaus, 19th Edition)',type:'textbook',year:2009,authors:['Samuelson, Paul A.','Nordhaus, William D.'],institution:'McGraw-Hill',url:'https://www.mheducation.com/highered/product/economics-samuelson-nordhaus/M9780073511290.html'},
{title:'Principles of Economics (Mankiw, 9th Edition)',type:'textbook',year:2021,authors:['Mankiw, N. Gregory'],institution:'Cengage Learning',url:'https://www.cengage.com/c/principles-of-economics-9e-mankiw/'},
{title:'Capital in the Twenty-First Century (Piketty)',type:'textbook',year:2014,authors:['Piketty, Thomas'],institution:'Harvard University Press',url:'https://doi.org/10.4159/9780674369542'},
{title:'World Economic Outlook 2025 (IMF)',type:'report',year:2025,authors:['IMF'],institution:'International Monetary Fund',url:'https://www.imf.org/en/Publications/WEO'},
],
'business/strategic-management-theory':[
{title:'Competitive Strategy (Porter)',type:'textbook',year:1980,authors:['Porter, Michael E.'],institution:'Free Press',url:'https://www.simonandschuster.com/books/Competitive-Strategy/Michael-E-Porter/9780684005867'},
{title:'Good Strategy Bad Strategy (Rumelt)',type:'textbook',year:2011,authors:['Rumelt, Richard P.'],institution:'Crown Business',url:'https://www.penguinrandomhouse.com/books/202175/good-strategy-bad-strategy-by-richard-p-rumelt/'},
{title:'Playing to Win: How Strategy Really Works (Lafley & Martin)',type:'textbook',year:2013,authors:['Lafley, A. G.','Martin, Roger L.'],institution:'Harvard Business Review Press',url:'https://hbr.org/product/playing-to-win-how-strategy-really-works/11957-HBK-ENG'},
{title:'McKinsey Global Institute: The State of AI in Business Strategy 2025',type:'report',year:2025,authors:['McKinsey & Company'],institution:'McKinsey Global Institute',url:'https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/the-state-of-ai'},
],
'business/marketing-fundamentals':[
{title:'Marketing Management (Kotler, Keller, Chernev — 16th Edition)',type:'textbook',year:2022,authors:['Kotler, Philip','Keller, Kevin Lane','Chernev, Alexander'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/marketing-management/P20000000JBX'},
{title:'Influence: The Psychology of Persuasion (Cialdini)',type:'textbook',year:2021,authors:['Cialdini, Robert B.'],institution:'Harper Business',url:'https://www.harpercollins.com/products/influence-new-and-expanded-robert-b-cialdini'},
{title:'AI Marketing Benchmark Report 2025: Trends and Performance Metrics',type:'report',year:2025,authors:['Influencer Marketing Hub'],institution:'Influencer Marketing Hub',url:'https://influencermarketinghub.com/ai-marketing-benchmark-report/'},
{title:'Positioning: The Battle for Your Mind (Ries & Trout)',type:'textbook',year:2001,authors:['Ries, Al','Trout, Jack'],institution:'McGraw-Hill',url:'https://www.mheducation.com/highered/product/positioning-battle-your-mind-ries-trout/M9780071373586.html'},
],
'health/nutrition-science':[
{title:'Understanding Nutrition (Whitney & Rolfes, 16th Edition)',type:'textbook',year:2024,authors:['Whitney, Ellie','Rolfes, Sharon Rady'],institution:'Cengage Learning',url:'https://www.cengage.com/c/understanding-nutrition-16e-whitney/'},
{title:'Modern Nutrition in Health and Disease (Ross et al., 12th Edition)',type:'textbook',year:2024,authors:['Ross, A. Catharine','Caballero, Benjamin','Cousins, Robert J.','Tucker, Katherine L.','Ziegler, Thomas R.'],institution:'Wolters Kluwer',url:'https://www.lww.com/modern-nutrition-in-health-and-disease/p/9781284220315'},
{title:'WHO Fact Sheet: Healthy Diet (Updated 2024)',type:'report',year:2024,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/news-room/fact-sheets/detail/healthy-diet'},
{title:'FAO State of Food Security and Nutrition in the World 2024',type:'report',year:2024,authors:['FAO/IFAD/UNICEF/WFP/WHO'],institution:'FAO',url:'https://www.fao.org/publications/sofi/2024/en/'},
],
'health/chronic-disease-prevention':[
{title:'Global Burden of Disease Study 2021 (Lancet — IHME)',type:'journal_article',year:2024,authors:['GBD 2021 Collaborators (500+ authors)'],institution:'The Lancet / IHME',url:'https://doi.org/10.1016/S0140-6736(24)00753-6'},
{title:'WHO Global Action Plan for the Prevention and Control of NCDs 2013-2030',type:'report',year:2024,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/publications/i/item/9789241506236'},
{title:'The China Study (Campbell & Campbell — One of the Most Comprehensive Studies of Nutrition)',type:'textbook',year:2016,authors:['Campbell, T. Colin','Campbell, Thomas M.'],institution:'BenBella Books',url:'https://benbellabooks.com/shop/the-china-study/'},
{title:'CDC Chronic Disease Prevention: AI and Big Data Applications in Population Health Surveillance (2025)',type:'report',year:2025,authors:['CDC'],institution:'Centers for Disease Control and Prevention',url:'https://www.cdc.gov/chronicdisease/'},
],
'arts/western-ethics-tradition':[
{title:'A History of Western Philosophy (Russell)',type:'textbook',year:1945,authors:['Russell, Bertrand'],institution:'Simon & Schuster',url:'https://www.simonandschuster.com/books/A-History-of-Western-Philosophy/Bertrand-Russell/9780671201586'},
{title:'Nicomachean Ethics (Aristotle — trans. Irwin)',type:'textbook',year:-340,authors:['Aristotle'],institution:'Hackett Publishing',url:'https://hackettpublishing.com/nicomachean-ethics'},
{title:'The Righteous Mind (Haidt)',type:'textbook',year:2012,authors:['Haidt, Jonathan'],institution:'Vintage Books',url:'https://www.penguinrandomhouse.com/books/184495/the-righteous-mind-by-jonathan-haidt/'},
{title:'UNESCO World Commission on the Ethics of Scientific Knowledge and Technology (COMEST) 2024 Report',type:'report',year:2024,authors:['UNESCO COMEST'],institution:'UNESCO',url:'https://www.unesco.org/en/ethics-science-technology'},
],
'arts/political-philosophy':[
{title:'History of Political Philosophy (Strauss & Cropsey, 3rd Edition)',type:'textbook',year:1987,authors:['Strauss, Leo','Cropsey, Joseph (eds.)'],institution:'University of Chicago Press',url:'https://doi.org/10.7208/9780226777108'},
{title:'A Theory of Justice (Rawls)',type:'textbook',year:1971,authors:['Rawls, John'],institution:'Harvard University Press',url:'https://doi.org/10.4159/9780674042605'},
{title:'On Liberty (Mill)',type:'textbook',year:1859,authors:['Mill, John Stuart'],institution:'Penguin Classics',url:'https://www.penguinrandomhouse.com/books/292641/on-liberty-by-john-stuart-mill/'},
{title:'Freedom House: Freedom in the World 2025 — The Global State of Political Rights and Civil Liberties',type:'report',year:2025,authors:['Freedom House'],institution:'Freedom House',url:'https://freedomhouse.org/report/freedom-world'},
],
'computer-science/software-engineering-principles':[
{title:'Software Engineering (Sommerville, 10th Edition)',type:'textbook',year:2016,authors:['Sommerville, Ian'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/software-engineering/P200000003298'},
{title:'Clean Code: A Handbook of Agile Software Craftsmanship (Martin)',type:'textbook',year:2008,authors:['Martin, Robert C.'],institution:'Prentice Hall',url:'https://www.oreilly.com/library/view/clean-code-a/9780136083238/'},
{title:'The Mythical Man-Month (Brooks)',type:'textbook',year:1995,authors:['Brooks, Frederick P.'],institution:'Addison-Wesley',url:'https://www.informit.com/store/mythical-man-month-essays-on-software-engineering-9780201835953'},
{title:'ISO/IEC/IEEE 12207:2017 — Systems and Software Engineering — Software Life Cycle Processes',type:'standard',year:2017,authors:['ISO/IEC/IEEE'],institution:'ISO',url:'https://www.iso.org/standard/63712.html'},
],
'computer-science/cybersecurity-fundamentals':[
{title:'Computer Security: Principles and Practice (Stallings & Brown, 4th Edition)',type:'textbook',year:2018,authors:['Stallings, William','Brown, Lawrie'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/computer-security-principles-and-practice/P200000003327'},
{title:'Security Engineering (Anderson, 3rd Edition)',type:'textbook',year:2020,authors:['Anderson, Ross'],institution:'Wiley',url:'https://doi.org/10.1002/9781119642787'},
{title:'NIST Cybersecurity Framework 2.0 (2024)',type:'report',year:2024,authors:['NIST'],institution:'National Institute of Standards and Technology',url:'https://www.nist.gov/cyberframework'},
{title:'ENISA Threat Landscape 2024: Annual Cybersecurity Threats Report',type:'report',year:2024,authors:['ENISA'],institution:'European Union Agency for Cybersecurity',url:'https://www.enisa.europa.eu/topics/cyber-threats/etl'},
],
'game-development/shader-programming':[
{title:'Real-Time Rendering (Akenine-Möller, Haines, Hoffman, 4th Edition)',type:'textbook',year:2018,authors:['Akenine-Möller, Tomas','Haines, Eric','Hoffman, Naty'],institution:'CRC Press',url:'https://doi.org/10.1201/9781315365459'},
{title:'The Book of Shaders (Patricio Gonzalez Vivo — Open Source Interactive Textbook)',type:'reference',year:2024,authors:['Gonzalez Vivo, Patricio'],institution:'thebookofshaders.com',url:'https://thebookofshaders.com/'},
{title:'NVIDIA GPU Gems (Fernando et al.)',type:'textbook',year:2004,authors:['Fernando, Randima (ed.)'],institution:'NVIDIA / Addison-Wesley',url:'https://developer.nvidia.com/gpugems'},
{title:'Unreal Engine 5 Documentation: Material and Shader Programming Guide (Epic Games)',type:'reference',year:2024,authors:['Epic Games'],institution:'Epic Games',url:'https://docs.unrealengine.com/5.4/en-US/rendering-and-graphics/'},
],
'geography/plate-tectonics-theory':[
{title:'Plate Tectonics: An Insider\'s History of the Modern Theory of the Earth (Oreskes)',type:'textbook',year:2003,authors:['Oreskes, Naomi'],institution:'Westview Press',url:'https://doi.org/10.1080/0307102042000243058'},
{title:'Plate Tectonics: A Very Short Introduction (Molnar)',type:'textbook',year:2015,authors:['Molnar, Peter'],institution:'Oxford University Press',url:'https://doi.org/10.1093/actrade/9780198728269.001.0001'},
{title:'Geodynamics (Turcotte & Schubert, 3rd Edition)',type:'textbook',year:2014,authors:['Turcotte, Donald L.','Schubert, Gerald'],institution:'Cambridge University Press',url:'https://doi.org/10.1017/CBO9780511843877'},
{title:'USGS Earthquake Hazards Program: The Science of Earthquakes and Plate Tectonics (2024)',type:'report',year:2024,authors:['USGS'],institution:'United States Geological Survey',url:'https://earthquake.usgs.gov/learn/'},
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
console.log(`\n📊 S24: ${Y}/${Object.keys(E).length}`);
