// Static integration checks. Never executes trip scripts or contacts the shared store.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process');
const source=fs.readFileSync('index.html','utf8');
const original=cp.execFileSync('git',['show','HEAD:index.html'],{encoding:'utf8',maxBuffer:3e6});
const scripts=[...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.filter(s=>s.trim()).forEach((s,i)=>new vm.Script(s,{filename:'inline-script-'+i}));
const readPlaces=html=>{const block=html.match(/const PROPERTIES=([\s\S]*?);<\/script>/)?.[0];assert.ok(block,'Place data extraction failed');return JSON.parse(JSON.stringify(vm.runInNewContext(block.replace(/;<\/script>$/,'')+';[...PROPERTIES,...POIS]')));};
const photoFields=new Set(['photos','photoSource','photoCredit','photoCaption','photoCaptions','galleryImported']);
const withoutPhotos=rows=>rows.map(p=>Object.fromEntries(Object.entries(p).filter(([key])=>!photoFields.has(key))));
const places=readPlaces(source);
assert.deepEqual(withoutPhotos(places),withoutPhotos(readPlaces(original)),'Non-photo place data changed');
const path=require('node:path');
for(const place of places){
  assert.ok(place.photos?.length,place.id+' has no photo');
  for(const photo of place.photos){
    assert.match(photo,/^images\/[\w-]+\.webp$/,place.id+' must use a local optimized photo');
    assert.ok(fs.readdirSync(path.dirname(photo)).includes(path.basename(photo)),photo+' missing or wrong case');
    const bytes=fs.readFileSync(photo);assert.equal(bytes.toString('ascii',0,4),'RIFF',photo+' is not WebP');assert.equal(bytes.toString('ascii',8,12),'WEBP',photo+' is not WebP');
  }
  if(place.photoCaptions) assert.equal(place.photoCaptions.length,place.photos.length,place.id+' captions do not match photos');
}
const shared=s=>{const start=s.indexOf('var SB_URL'),end=s.indexOf('})();</script><script>(function(){',start);assert.ok(start>0&&end>start,'Shared-state boundary not found');return s.slice(start,end);};
assert.equal(shared(source),shared(original),'Shared-state implementation changed');
for(const name of ['mobile-explorer.css','mobile-trip.css','mobile-flow.css','mobile-explorer.js','mobile-trip.js'])assert.ok(source.includes(fs.readFileSync(name,'utf8')),name+' is not embedded');
assert.equal((source.match(/<!-- COMPANION UI START -->/g)||[]).length,1);
assert.equal((source.match(/id="companion-script"/g)||[]).length,1);
assert.ok(!source.includes('review-fixture'),'Test fixture leaked into production');
console.log(scripts.length+' scripts parsed; non-photo place data and shared state preserved; all '+places.length+' places have local photos; companion sources embedded once.');
