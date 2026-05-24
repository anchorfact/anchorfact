#!/usr/bin/env node
const fs=require('fs'),p=require('path'),y=require('js-yaml');
const D=p.join(__dirname,'..','content','ai');
fs.readdirSync(D).filter(f=>f.endsWith('.md')).forEach(f=>{
  const fp=p.join(D,f),c=fs.readFileSync(fp,'utf-8');
  const parts=c.split(/^---\s*$/m);if(parts.length<3)return;
  const fm=y.load(parts[1]);if(!fm?.atomic_facts||!Array.isArray(fm.atomic_facts))return;
  const af=fm.atomic_facts;
  if(af.length===0)return;
  // Check if using short keys (i/s/t/u/c) by checking first fact
  if(!af[0].source_title && !af[0].source_url){
    fm.atomic_facts=af.map(fa=>({
      id:fa.i||fa.id,statement:fa.s||fa.statement,
      source_title:fa.t||fa.source_title,source_url:fa.u||fa.source_url,
      confidence:fa.c||fa.confidence
    }));
    fm.updated='2026-05-24';
    const ny=y.dump(fm,{lineWidth:200,noRefs:true,quotingType:'"'});
    fs.writeFileSync(fp,'---\n'+ny+'---'+parts.slice(2).join('---'),'utf-8');
    console.log('FIX:',f);
  }
});
console.log('Done');
