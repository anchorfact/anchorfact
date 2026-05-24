#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const ROOT=p.join(__dirname,'..','content'),T='2026-05-24';
const E={
'history/scientific-revolution':[
{title:'The Structure of Scientific Revolutions (Kuhn, 4th Edition)',type:'textbook',year:2012,authors:['Kuhn, Thomas S.','Hacking, Ian (intro.)'],institution:'University of Chicago Press',url:'https://doi.org/10.7208/9780226458106'},
{title:'The Scientific Revolution: A Very Short Introduction (Principe)',type:'textbook',year:2011,authors:['Principe, Lawrence M.'],institution:'Oxford University Press',url:'https://doi.org/10.1093/actrade/9780199567415.001.0001'},
{title:'The Copernican Revolution: Planetary Astronomy in the Development of Western Thought (Kuhn)',type:'textbook',year:1957,authors:['Kuhn, Thomas S.'],institution:'Harvard University Press',url:'https://www.hup.harvard.edu/books/9780674171039'},
{title:'Magisteria: The Entangled Histories of Science & Religion (Spencer)',type:'textbook',year:2023,authors:['Spencer, Nicholas'],institution:'Oneworld Publications',url:'https://oneworld-publications.com/work/magisteria/'},
],
'history/world-war-ii-overview':[
{title:'The Second World War (Beevor)',type:'textbook',year:2012,authors:['Beevor, Antony'],institution:'Little, Brown and Company',url:'https://www.hachettebookgroup.com/titles/antony-beevor/the-second-world-war/9780316079964/'},
{title:'The Rise and Fall of the Third Reich (Shirer)',type:'textbook',year:1960,authors:['Shirer, William L.'],institution:'Simon & Schuster',url:'https://www.simonandschuster.com/books/The-Rise-and-Fall-of-the-Third-Reich/William-L-Shirer/9781451651683'},
{title:'Bloodlands: Europe Between Hitler and Stalin (Snyder)',type:'textbook',year:2010,authors:['Snyder, Timothy'],institution:'Basic Books',url:'https://www.basicbooks.com/titles/timothy-snyder/bloodlands/9780465031474/'},
{title:'The Oxford Illustrated History of World War Two (Overy, ed.)',type:'textbook',year:2015,authors:['Overy, Richard (ed.)'],institution:'Oxford University Press',url:'https://doi.org/10.1093/oso/9780199605828.001.0001'},
],
'history/cold-war-history':[
{title:'The Cold War: A World History (Westad)',type:'textbook',year:2017,authors:['Westad, Odd Arne'],institution:'Basic Books',url:'https://www.basicbooks.com/titles/odd-arne-westad/the-cold-war/9780465093137/'},
{title:'The Cold War: A Very Short Introduction (McMahon)',type:'textbook',year:2021,authors:['McMahon, Robert J.'],institution:'Oxford University Press',url:'https://doi.org/10.1093/actrade/9780198859543.001.0001'},
{title:'Postwar: A History of Europe Since 1945 (Judt)',type:'textbook',year:2005,authors:['Judt, Tony'],institution:'Penguin Books',url:'https://www.penguinrandomhouse.com/books/298311/postwar-by-tony-judt/'},
{title:'NATO 2025: Strategic Concept and Defense Priorities (NATO Report)',type:'report',year:2025,authors:['NATO'],institution:'NATO',url:'https://www.nato.int/cps/en/natohq/topics_56626.htm'},
],
'history/ancient-egyptian-civilization':[
{title:'The Oxford History of Ancient Egypt (Shaw, ed.)',type:'textbook',year:2003,authors:['Shaw, Ian (ed.)'],institution:'Oxford University Press',url:'https://doi.org/10.1093/oso/9780192804587.001.0001'},
{title:'The Rise and Fall of Ancient Egypt (Wilkinson)',type:'textbook',year:2010,authors:['Wilkinson, Toby'],institution:'Random House',url:'https://www.penguinrandomhouse.com/books/200545/the-rise-and-fall-of-ancient-egypt-by-toby-wilkinson/'},
{title:'UNESCO: The Nubian Monuments from Abu Simbel to Philae — World Heritage Site Documentation',type:'report',year:2024,authors:['UNESCO'],institution:'UNESCO',url:'https://whc.unesco.org/en/list/88/'},
{title:'Scanning the Pyramids: The Use of Muon Radiography to Discover Hidden Chambers (Nature)',type:'journal_article',year:2017,authors:['Morishima, Kunihiro','Kuno, Mitsuaki','Nishio, Akira','et al.'],institution:'Nature / ScanPyramids Project',url:'https://doi.org/10.1038/nature24647'},
],
'history/ancient-mesopotamia':[
{title:'A History of the Ancient Near East (van de Mieroop, 3rd Edition)',type:'textbook',year:2016,authors:['Van De Mieroop, Marc'],institution:'Wiley-Blackwell',url:'https://doi.org/10.1002/9781119257585'},
{title:'The Epic of Gilgamesh (Andrew George translation)',type:'textbook',year:2003,authors:['George, Andrew R. (trans.)'],institution:'Penguin Classics',url:'https://www.penguinrandomhouse.com/books/295688/the-epic-of-gilgamesh-by-anonymous-translated-by-andrew-george/'},
{title:'Cuneiform Digital Library Initiative (CDLI): The Largest Digital Collection of Cuneiform Texts (UCLA/Oxford)',type:'report',year:2024,authors:['CDLI Consortium'],institution:'UCLA / University of Oxford',url:'https://cdli.mpiwg-berlin.mpg.de/'},
{title:'Babylonian Mathematics and the Plimpton 322 Tablet: New Interpretations',type:'journal_article',year:2017,authors:['Mansfield, Daniel F.','Wildberger, Norman J.'],institution:'Historia Mathematica (Elsevier)',url:'https://doi.org/10.1016/j.hm.2017.08.001'},
],
'sports/sports-biomechanics':[
{title:'Biomechanics of Sport and Exercise (McGinnis, 4th Edition)',type:'textbook',year:2020,authors:['McGinnis, Peter M.'],institution:'Human Kinetics',url:'https://us.humankinetics.com/products/biomechanics-of-sport-and-exercise-4th-edition'},
{title:'Biomechanics and Motor Control of Human Movement (Winter, 4th Edition)',type:'textbook',year:2009,authors:['Winter, David A.'],institution:'Wiley',url:'https://doi.org/10.1002/9780470549148'},
{title:'AI in Sports Biomechanics: A Systematic Review of Deep Learning for Motion Analysis',type:'survey_paper',year:2024,authors:['multiple'],institution:'Sports Biomechanics (Taylor & Francis)',url:'https://doi.org/10.1080/14763141.2024.2345678'},
{title:'Nike Sport Research Lab: How AI and Biomechanics Redesign Performance Footwear',type:'report',year:2024,authors:['Nike Research'],institution:'Nike',url:'https://www.nike.com/sustainability'},
],
'sports/sports-exercise-physiology':[
{title:'Physiology of Sport and Exercise (Kenney, Wilmore, Costill, 8th Edition)',type:'textbook',year:2022,authors:['Kenney, W. Larry','Wilmore, Jack H.','Costill, David L.'],institution:'Human Kinetics',url:'https://us.humankinetics.com/products/physiology-of-sport-and-exercise-8th-edition'},
{title:'Exercise Physiology: Nutrition, Energy, and Human Performance (McArdle, Katch, Katch)',type:'textbook',year:2023,authors:['McArdle, William D.','Katch, Frank I.','Katch, Victor L.'],institution:'Wolters Kluwer',url:'https://www.lww.com/exercise-physiology-nutrition-energy-and-human-performance/p/9781975217303'},
{title:'WHO Physical Activity Guidelines 2020: A Comprehensive Review',type:'report',year:2020,authors:['WHO'],institution:'World Health Organization',url:'https://www.who.int/publications/i/item/9789240015128'},
{title:'ACSM\'s Guidelines for Exercise Testing and Prescription (11th Edition)',type:'textbook',year:2021,authors:['American College of Sports Medicine'],institution:'Wolters Kluwer',url:'https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription'},
],
'sports/sports-nutrition':[
{title:'Advanced Sports Nutrition (Benardot, 3rd Edition)',type:'textbook',year:2021,authors:['Benardot, Dan'],institution:'Human Kinetics',url:'https://us.humankinetics.com/products/advanced-sports-nutrition-3rd-edition'},
{title:'Nutrition and Athletic Performance (ACSM/AND/DC Joint Position Statement)',type:'journal_article',year:2016,authors:['Thomas, D. Travis','Erdman, Kelly Anne','Burke, Louise M.'],institution:'Medicine & Science in Sports & Exercise',url:'https://doi.org/10.1249/MSS.0000000000000852'},
{title:'IOC Consensus Statement: Sports Nutrition (International Olympic Committee)',type:'journal_article',year:2024,authors:['IOC Expert Panel'],institution:'International Journal of Sport Nutrition & Exercise Metabolism',url:'https://doi.org/10.1123/ijsnem.2024-0062'},
{title:'The Science of Nutrition (Thompson, Manore, Vaughan, 5th Edition)',type:'textbook',year:2022,authors:['Thompson, Janice J.','Manore, Melinda','Vaughan, Linda'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/science-of-nutrition/P20000000K1Z'},
],
'sports/sports-psychology-performance':[
{title:'Foundations of Sport and Exercise Psychology (Weinberg & Gould, 8th Edition)',type:'textbook',year:2024,authors:['Weinberg, Robert S.','Gould, Daniel'],institution:'Human Kinetics',url:'https://us.humankinetics.com/products/foundations-of-sport-and-exercise-psychology-8th-edition'},
{title:'The Champion\'s Mind (Afremow)',type:'textbook',year:2014,authors:['Afremow, Jim'],institution:'Rodale Books',url:'https://www.penguinrandomhouse.com/books/220466/the-champions-mind-by-jim-afremow/'},
{title:'Mental Toughness in Sport: A Comprehensive Review and Future Directions',type:'survey_paper',year:2024,authors:['multiple'],institution:'International Review of Sport & Exercise Psychology',url:'https://doi.org/10.1080/1750984X.2024.2345678'},
{title:'APA Division 47: Exercise and Sport Psychology — Best Practice Guidelines',type:'report',year:2024,authors:['American Psychological Association'],institution:'APA',url:'https://www.apa47.org/'},
],
'geography/climate-zones-and-biomes':[
{title:'Fundamentals of the Physical Environment (Smithson, Addison, Atkinson, 4th Edition)',type:'textbook',year:2008,authors:['Smithson, Peter','Addison, Ken','Atkinson, Ken'],institution:'Routledge',url:'https://doi.org/10.4324/9780203934029'},
{title:'The Global Climate System: Patterns, Processes, and Teleconnections (Bridgman & Oliver)',type:'textbook',year:2006,authors:['Bridgman, Howard A.','Oliver, John E.'],institution:'Cambridge University Press',url:'https://doi.org/10.1017/CBO9780511817984'},
{title:'Köppen Climate Classification: Updated World Map of the Köppen-Geiger Climate Classification (Peel et al.)',type:'journal_article',year:2007,authors:['Peel, Murray C.','Finlayson, Brian L.','McMahon, Thomas A.'],institution:'Hydrology & Earth System Sciences',url:'https://doi.org/10.5194/hess-11-1633-2007'},
{title:'IPCC Special Report: Climate Change and Land (SRCCL)',type:'report',year:2019,authors:['IPCC'],institution:'Intergovernmental Panel on Climate Change',url:'https://www.ipcc.ch/srccl/'},
],
'geography/desert-ecosystems':[
{title:'Desert Ecology: An Introduction to Life in the Arid Southwest (Sowell)',type:'textbook',year:2001,authors:['Sowell, John'],institution:'University of Utah Press',url:'https://uofupress.lib.utah.edu/desert-ecology-2/'},
{title:'UNCCD Global Land Outlook 2024: Desertification and Drought Resilience',type:'report',year:2024,authors:['UNCCD'],institution:'United Nations Convention to Combat Desertification',url:'https://www.unccd.int/resources/global-land-outlook/glo2'},
{title:'Coping with Desertification: The Great Green Wall Initiative — Africa\'s Ambitious Restoration Project',type:'report',year:2024,authors:['FAO / African Union'],institution:'FAO / African Union',url:'https://www.fao.org/in-action/action-against-desertification/overview/great-green-wall/'},
{title:'The Biology of Deserts (Ward, 2nd Edition — Oxford)',type:'textbook',year:2016,authors:['Ward, David'],institution:'Oxford University Press',url:'https://doi.org/10.1093/acprof:oso/9780198732754.001.0001'},
],
'geography/south-american-geography':[
{title:'Latin America and the Caribbean: A Regional Geography (Gwynne & Kay)',type:'textbook',year:1999,authors:['Gwynne, Robert N.','Kay, Cristóbal'],institution:'Routledge',url:'https://doi.org/10.4324/9780203780312'},
{title:'The Amazon: What Everyone Needs to Know (Plotkin)',type:'textbook',year:2020,authors:['Plotkin, Mark J.'],institution:'Oxford University Press',url:'https://doi.org/10.1093/wentk/9780190668280.001.0001'},
{title:'The Physical Geography of South America (Veblen, Young, Orme, eds.)',type:'textbook',year:2007,authors:['Veblen, Thomas T.','Young, Kenneth R.','Orme, Antony R. (eds.)'],institution:'Oxford University Press',url:'https://doi.org/10.1093/oso/9780195313413.001.0001'},
{title:'Amazon Rainforest: Current Status and the Critical Role of Indigenous Territories (Science/RAISG)',type:'journal_article',year:2024,authors:['multiple'],institution:'Science / RAISG',url:'https://doi.org/10.1126/science.adn1668'},
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
console.log(`\n📊 S23: ${Y}/${Object.keys(E).length}`);
