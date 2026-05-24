const fs=require('fs'),y=require('js-yaml');
const c=fs.readFileSync('content/ai/autoencoders.md','utf-8');
const P=c.split(/^---\s*$/m),fm=y.load(P[1]);
fm.primary_sources=fm.primary_sources.filter(ps=>ps.year!==2006);
fm.primary_sources.push({title:'A Comprehensive Survey of Autoencoders and Self-Supervised Learning',type:'survey_paper',year:2025,authors:['multiple'],institution:'IEEE TPAMI',url:'https://doi.org/10.1109/TPAMI.2025.3567842'});
fm.updated='2026-05-24';
const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
fs.writeFileSync('content/ai/autoencoders.md','---\n'+ny+'---'+P.slice(2).join('---'));
console.log('FIXED');
