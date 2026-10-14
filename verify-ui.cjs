// Static integration checks. Never executes trip scripts or contacts the shared store.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process');
const source=fs.readFileSync('index.html','utf8');
const original=cp.execFileSync('git',['show','HEAD:index.html'],{encoding:'utf8',maxBuffer:3e6});
const scripts=[...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.filter(s=>s.trim()).forEach((s,i)=>new vm.Script(s,{filename:'inline-script-'+i}));
for(const name of ['PROPERTIES','POIS']){const extract=s=>new RegExp('const '+name+'\\s*=([\\s\\S]*?);</script>').exec(s)?.[1];assert.equal(typeof extract(source),'string',name+' extraction failed');assert.equal(extract(source),extract(original),name+' data changed');}
const shared=s=>{const start=s.indexOf('var SB_URL'),end=s.indexOf('})();</script><script>(function(){',start);assert.ok(start>0&&end>start,'Shared-state boundary not found');return s.slice(start,end);};
assert.equal(shared(source),shared(original),'Shared-state implementation changed');
for(const name of ['mobile-explorer.css','mobile-trip.css','mobile-flow.css','mobile-explorer.js','mobile-trip.js'])assert.ok(source.includes(fs.readFileSync(name,'utf8')),name+' is not embedded');
assert.equal((source.match(/<!-- COMPANION UI START -->/g)||[]).length,1);
assert.equal((source.match(/id="companion-script"/g)||[]).length,1);
assert.ok(!source.includes('review-fixture'),'Test fixture leaked into production');
console.log(scripts.length+' scripts parsed; original place data and shared state preserved; companion sources embedded once.');
