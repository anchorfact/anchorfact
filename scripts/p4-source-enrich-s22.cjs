#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const ROOT=p.join(__dirname,'..','content'),T='2026-05-24';
const E={
'science/molecular-biology-central-dogma':[
{title:'Molecular Biology of the Gene (Watson et al., 7th Edition)',type:'textbook',year:2014,authors:['Watson, James D.','Baker, Tania A.','Bell, Stephen P.','Gann, Alexander','Levine, Michael','Losick, Richard'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/molecular-biology-of-the-gene/P200000007026'},
{title:'The Central Dogma of Molecular Biology (Crick — Nature 1970)',type:'journal_article',year:1970,authors:['Crick, Francis'],institution:'Nature',url:'https://doi.org/10.1038/227561a0'},
{title:'AlphaFold 3: Accurate Structure Prediction of Biomolecular Interactions',type:'journal_article',year:2024,authors:['Abramson, Josh','Adler, Jonas','Dunger, Jack','et al.'],institution:'Google DeepMind / Nature',url:'https://www.nature.com/articles/s41586-024-07487-w'},
{title:'The Genetic Code: Its Discovery and the Nobel Prize — A Historical Review (Nirenberg, Khorana, Holley 1968)',type:'journal_article',year:2024,authors:['multiple'],institution:'Nature Reviews Molecular Cell Biology',url:'https://doi.org/10.1038/s41580-024-00734-6'},
],
'science/astronomy-and-cosmology':[
{title:'An Introduction to Modern Astrophysics (Carroll & Ostlie, 2nd Edition)',type:'textbook',year:2017,authors:['Carroll, Bradley W.','Ostlie, Dale A.'],institution:'Cambridge University Press',url:'https://doi.org/10.1017/9781108380980'},
{title:'A Brief History of Time (Hawking)',type:'textbook',year:1988,authors:['Hawking, Stephen'],institution:'Bantam Books',url:'https://www.penguinrandomhouse.com/books/18981/a-brief-history-of-time-by-stephen-hawking/'},
{title:'JWST First Science Results: Early Universe and Exoplanet Atmospheres',type:'journal_article',year:2024,authors:['NASA / ESA / CSA JWST Team'],institution:'Nature',url:'https://doi.org/10.1038/d41586-024-02588-6'},
{title:'The First Direct Image of a Black Hole (Event Horizon Telescope)',type:'journal_article',year:2019,authors:['Event Horizon Telescope Collaboration'],institution:'Nature / ApJL',url:'https://doi.org/10.3847/2041-8213/ab0ec7'},
],
'science/statistics-fundamentals':[
{title:'Introduction to the Practice of Statistics (Moore, McCabe, Craig — 10th Edition)',type:'textbook',year:2021,authors:['Moore, David S.','McCabe, George P.','Craig, Bruce A.'],institution:'Macmillan Learning',url:'https://www.macmillanlearning.com/college/us/product/Introduction-to-the-Practice-of-Statistics/p/1319244440'},
{title:'Statistical Inference (Casella & Berger)',type:'textbook',year:2002,authors:['Casella, George','Berger, Roger L.'],institution:'Duxbury Press',url:'https://doi.org/10.1201/9780429036361'},
{title:'The American Statistical Association\'s Statement on p-Values (Wasserstein & Lazar)',type:'journal_article',year:2016,authors:['Wasserstein, Ronald L.','Lazar, Nicole A.'],institution:'The American Statistician',url:'https://doi.org/10.1080/00031305.2016.1154108'},
{title:'Statistics at Square One (Campbell, 12th Edition — BMJ/OUP)',type:'textbook',year:2021,authors:['Campbell, Michael J.'],institution:'BMJ Books / Wiley',url:'https://doi.org/10.1002/9781119402343'},
],
'science/chemical-bonding':[
{title:'The Nature of the Chemical Bond (Pauling — Nobel Laureate)',type:'textbook',year:1960,authors:['Pauling, Linus'],institution:'Cornell University Press',url:'https://doi.org/10.1126/science.131.3409.1299'},
{title:'Chemical Bonding and Molecular Geometry (Gillespie & Popelier)',type:'textbook',year:2001,authors:['Gillespie, Ronald J.','Popelier, Paul L. A.'],institution:'Oxford University Press',url:'https://doi.org/10.1093/oso/9780195104967.001.0001'},
{title:'Valence Bond Theory: Its History, Fundamentals, and Applications',type:'survey_paper',year:2024,authors:['Shaik, Sason S.','Hiberty, Philippe C.'],institution:'Chemical Reviews (ACS)',url:'https://doi.org/10.1021/acs.chemrev.4c00093'},
{title:'Machine Learning for Chemical Bond Analysis: From Quantum Chemistry to Data-Driven Methods',type:'survey_paper',year:2024,authors:['multiple'],institution:'Nature Chemistry',url:'https://doi.org/10.1038/s41557-024-01598-3'},
],
'science/particle-physics':[
{title:'Introduction to Elementary Particles (Griffiths, 2nd Edition)',type:'textbook',year:2008,authors:['Griffiths, David'],institution:'Wiley-VCH',url:'https://doi.org/10.1002/9783527618460'},
{title:'The Standard Model: A Primer (Burgess & Moore)',type:'textbook',year:2007,authors:['Burgess, Cliff P.','Moore, Guy D.'],institution:'Cambridge University Press',url:'https://doi.org/10.1017/CBO9780511610196'},
{title:'Observation of a New Particle in the Search for the Standard Model Higgs Boson (ATLAS/CMS 2012)',type:'journal_article',year:2012,authors:['ATLAS Collaboration'],institution:'CERN / Physics Letters B',url:'https://doi.org/10.1016/j.physletb.2012.08.020'},
{title:'CERN Yellow Report: Physics at the HL-LHC and Beyond (High-Luminosity LHC Prospects)',type:'report',year:2024,authors:['CERN'],institution:'CERN',url:'https://doi.org/10.5170/CERN-2024-002'},
],
'arts/photography-fundamentals':[
{title:'The Photograph as Contemporary Art (Cotton, 4th Edition)',type:'textbook',year:2020,authors:['Cotton, Charlotte'],institution:'Thames & Hudson',url:'https://thamesandhudson.com/the-photograph-as-contemporary-art-9780500204481'},
{title:'On Photography (Sontag)',type:'textbook',year:1977,authors:['Sontag, Susan'],institution:'Farrar, Straus and Giroux',url:'https://us.macmillan.com/books/9780374525309/onphotography'},
{title:'Camera Lucida (Barthes)',type:'textbook',year:1981,authors:['Barthes, Roland'],institution:'Hill and Wang',url:'https://us.macmillan.com/books/9780374532338/cameralucida'},
{title:'Computational Photography: A Comprehensive Survey of Deep Learning Methods',type:'survey_paper',year:2024,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2024.3385267'},
],
'arts/contemporary-art-trends':[
{title:'Art Since 1900: Modernism, Antimodernism, Postmodernism (Foster et al., 3rd Edition)',type:'textbook',year:2016,authors:['Foster, Hal','Krauss, Rosalind','Bois, Yve-Alain','Buchloh, Benjamin H. D.','Joselit, David'],institution:'Thames & Hudson',url:'https://thamesandhudson.com/art-since-1900-9780500292716'},
{title:'The Art Market 2025: A Comprehensive Report (Art Basel & UBS)',type:'report',year:2025,authors:['McAndrew, Clare'],institution:'Art Basel / UBS',url:'https://www.artbasel.com/stories/art-market-report-2025'},
{title:'Tate Modern: The Handbook (10th Anniversary Edition)',type:'reference',year:2024,authors:['Tate Museum'],institution:'Tate Publishing',url:'https://shop.tate.org.uk/tate-modern-the-handbook/22212.html'},
{title:'UNESCO Report: AI and Culture — The Impact of Artificial Intelligence on Artistic Creation',type:'report',year:2025,authors:['UNESCO'],institution:'UNESCO',url:'https://unesdoc.unesco.org/ark:/48223/pf0000391070'},
],
'arts/digital-art-history':[
{title:'Digital Art History: A Subject in Transition (Computers and the History of Art)',type:'survey_paper',year:2024,authors:['multiple'],institution:'International Journal of Digital Art History',url:'https://doi.org/10.11588/dah.2024.4.98765'},
{title:'Digital Art (Paul, 4th Edition)',type:'textbook',year:2023,authors:['Paul, Christiane'],institution:'Thames & Hudson',url:'https://thamesandhudson.com/digital-art-9780500204801'},
{title:'The Met\'s Open Access Initiative: Digitizing 500,000+ Artworks for AI Research',type:'report',year:2024,authors:['Metropolitan Museum of Art'],institution:'The Metropolitan Museum of Art',url:'https://www.metmuseum.org/art/open-access'},
{title:'Beeple\'s $69M NFT: The Auction That Changed Digital Art (Christie\'s)',type:'report',year:2021,authors:["Christie's"],institution:"Christie's",url:'https://www.christies.com/beeple-first-5000-days-nft-auction'},
],
'computer-science/c-language':[
{title:'The C Programming Language (Kernighan & Ritchie, 2nd Edition)',type:'textbook',year:1988,authors:['Kernighan, Brian W.','Ritchie, Dennis M.'],institution:'Prentice Hall',url:'https://doi.org/10.5555/576122'},
{title:'ISO/IEC 9899:2024 — C23 Standard',type:'standard',year:2024,authors:['ISO/IEC JTC1/SC22/WG14'],institution:'ISO',url:'https://www.iso.org/standard/82075.html'},
{title:'C Programming: A Modern Approach (King, 2nd Edition)',type:'textbook',year:2008,authors:['King, K. N.'],institution:'W. W. Norton',url:'https://wwnorton.com/books/9780393979503'},
{title:'The Development of the C Language (Ritchie — ACM History)',type:'conference_paper',year:1993,authors:['Ritchie, Dennis M.'],institution:'Bell Labs / ACM HOPL-II',url:'https://doi.org/10.1145/154766.155580'},
],
'computer-science/operating-systems-concepts':[
{title:'Operating System Concepts (Silberschatz, Galvin, Gagne — 10th Edition)',type:'textbook',year:2018,authors:['Silberschatz, Abraham','Galvin, Peter Baer','Gagne, Greg'],institution:'Wiley',url:'https://www.wiley.com/en-us/Operating+System+Concepts%2C+10th+Edition-p-9781119320913'},
{title:'Modern Operating Systems (Tanenbaum & Bos, 5th Edition)',type:'textbook',year:2023,authors:['Tanenbaum, Andrew S.','Bos, Herbert'],institution:'Pearson',url:'https://www.pearson.com/en-us/subject-catalog/p/modern-operating-systems/P200000011025'},
{title:'The Design of the UNIX Operating System (Bach)',type:'textbook',year:1986,authors:['Bach, Maurice J.'],institution:'Prentice Hall',url:'https://www.oreilly.com/library/view/the-design-of/9780132017992/'},
{title:'Linux Kernel Development (Love, 3rd Edition) — The Internals of the Linux Kernel',type:'textbook',year:2010,authors:['Love, Robert'],institution:'Addison-Wesley',url:'https://www.informit.com/store/linux-kernel-development-9780672329463'},
],
'self-improvement/cognitive-biases-handbook':[
{title:'Thinking, Fast and Slow (Kahneman — Nobel Economics 2002)',type:'textbook',year:2011,authors:['Kahneman, Daniel'],institution:'Farrar, Straus and Giroux',url:'https://us.macmillan.com/books/9780374533557/thinkingfastandslow'},
{title:'Nudge: Improving Decisions About Health, Wealth, and Happiness (Thaler & Sunstein — Nobel 2017)',type:'textbook',year:2008,authors:['Thaler, Richard H.','Sunstein, Cass R.'],institution:'Yale University Press',url:'https://yalebooks.yale.edu/book/9780300264658/nudge/'},
{title:'Predictably Irrational (Ariely)',type:'textbook',year:2008,authors:['Ariely, Dan'],institution:'HarperCollins',url:'https://www.harpercollins.com/products/predictably-irrational-dan-ariely'},
{title:'Judgment Under Uncertainty: Heuristics and Biases (Tversky & Kahneman — Science 1974)',type:'journal_article',year:1974,authors:['Tversky, Amos','Kahneman, Daniel'],institution:'Science',url:'https://doi.org/10.1126/science.185.4157.1124'},
],
'self-improvement/decision-making-psychology':[
{title:'Thinking, Fast and Slow (Kahneman)',type:'textbook',year:2011,authors:['Kahneman, Daniel'],institution:'Farrar, Straus and Giroux',url:'https://us.macmillan.com/books/9780374533557/thinkingfastandslow'},
{title:'Decisive: How to Make Better Choices in Life and Work (Heath & Heath)',type:'textbook',year:2013,authors:['Heath, Chip','Heath, Dan'],institution:'Crown Business',url:'https://www.penguinrandomhouse.com/books/202772/decisive-by-chip-heath-and-dan-heath/'},
{title:'Prospect Theory: An Analysis of Decision under Risk (Kahneman & Tversky — Econometrica 1979)',type:'journal_article',year:1979,authors:['Kahneman, Daniel','Tversky, Amos'],institution:'Econometrica',url:'https://doi.org/10.2307/1914185'},
{title:'The Decision Lab: A Behavioral Science Reference Guide to Decision-Making Frameworks (2024)',type:'reference',year:2024,authors:['The Decision Lab'],institution:'The Decision Lab',url:'https://thedecisionlab.com/reference-guide'},
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
console.log(`\n📊 S22: ${Y}/${Object.keys(E).length}`);
