const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname,'index.html'), 'utf8');
const mobile = fs.readFileSync(require('node:path').join(__dirname,'mobile-explorer.js'), 'utf8');
let scripts = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (/\bsrc\s*=|\btype\s*=\s*["'](?:application\/ld\+json|importmap)/i.test(match[1]) || !match[2].trim()) continue;
  new vm.Script(match[2]); scripts++;
}
new vm.Script(mobile);
function element(id = '', tagName = 'DIV') {
  const attrs = {}, handlers = {}, classes = new Set();
  const e = { id, tagName, hidden: false, disabled: false, style: {}, dataset: {}, naturalWidth: 0, naturalHeight: 0, complete: false, textContent: '',
    classList: { add: n => classes.add(n), remove: n => classes.delete(n), contains: n => classes.has(n) },
    setAttribute: (k,v) => attrs[k] = String(v), getAttribute: k => attrs[k] ?? null,
    hasAttribute: k => Object.hasOwn(attrs,k) || (k === 'data-mx-missing' && Object.hasOwn(e.dataset,'mxMissing')),
    removeAttribute(k) { delete attrs[k]; if(k==='src'){this.naturalWidth=0;this.naturalHeight=0;} },
    addEventListener(k,fn) { (handlers[k] ||= []).push(fn); },
    emit(k) { for(const fn of handlers[k]||[]) fn({target:e}); },
    focus() { e.focused = true; }, closest() { return null; }
  };
  Object.defineProperty(e, 'src', {get:()=>attrs.src, set(value){attrs.src=value;e.complete=false;e.naturalWidth=0;e.naturalHeight=0;e.assignments=(e.assignments||0)+1;}});
  e.parentElement = { style: {}, dataset: {}, classList: e.classList, getAttribute:()=>null, removeAttribute:()=>{} };
  return e;
}
const ids=['photo','photoFallback','photoControls','prevPhoto','nextPhoto','photoCount','photoCaption','fallbackTitle','fallbackText','galleryLink','openLightbox','lightbox','lbPhoto','lbFallback','lbCount','lbCaption','lbPrev','lbNext','lbRetry','lbClose'];
const els=Object.fromEntries(ids.map(id=>[id,element(id,id==='photo'||id==='lbPhoto'?'IMG':'DIV')]));
els.lightbox.hidden=true;
const place={id:'test',short:'Test',category:'ski',area:'Test area',photos:['one.jpg','two.jpg'],photoCaptions:['One','Two']};
const context={ $, selected:'test',photoIndex:0,findItem:()=>place,categoryNames:{ski:'Ski'},morphing:false,live:()=>false,shThumbs:()=>{},getComputedStyle:()=>({paddingLeft:0,paddingRight:0,paddingTop:0,paddingBottom:0}) };
function $(id){return els[id];}
const ctx=vm.createContext(context);
const photoStart=html.indexOf('function renderPhoto(p,quiet)');
const photoEnd=html.indexOf("$('prevPhoto').addEventListener('click'",photoStart);
vm.runInContext(html.slice(photoStart,photoEnd),ctx);
const lbStart=html.indexOf("const lightbox=$('lightbox');");
const lbEnd=html.indexOf('// size the lightbox image box',lbStart);
const fitStart=html.indexOf('function fitLb()',lbEnd);
const fitEnd=html.indexOf("window.addEventListener('resize'",fitStart);
vm.runInContext(html.slice(lbStart,lbEnd)+html.slice(fitStart,fitEnd),ctx);
vm.runInContext('renderPhoto(findItem(selected));',ctx);
els.photo.emit('error');
assert.equal(els.photo.hidden,true); assert.equal(els.photoFallback.hidden,false);
assert.match(els.fallbackTitle.textContent,/unavailable/i);
els.photo.style.visibility='hidden';
vm.runInContext('stepPhoto(1);',ctx);
assert.equal(els.photo.src,'two.jpg'); assert.equal(els.photo.hidden,false); assert.equal(els.photo.style.visibility,'');
els.photo.naturalWidth=1200;els.photo.naturalHeight=800;els.photo.complete=true;els.photo.emit('load');
assert.equal(els.photoFallback.hidden,true);assert.equal(els.openLightbox.disabled,false);
els.lightbox.hidden=false;els.lightbox.clientWidth=390;els.lightbox.clientHeight=800;
vm.runInContext('syncLightbox(findItem(selected));',ctx);
els.lbPhoto.emit('error');assert.equal(els.lbPhoto.hidden,true);assert.equal(els.lbFallback.hidden,false);
vm.runInContext('stepPhoto(1);',ctx);
assert.equal(els.lbPhoto.src,'one.jpg');assert.equal(els.lbPhoto.hidden,false);assert.equal(els.lbFallback.hidden,true);
els.lbPhoto.naturalWidth=600;els.lbPhoto.naturalHeight=900;els.lbPhoto.emit('load');
assert.equal(els.lbPhoto.style.width,'390px');assert.equal(els.lbPhoto.style.height,'585px');
els.lbPhoto.emit('error');const count=els.lbPhoto.assignments;els.lbRetry.emit('click');
assert.ok(els.lbPhoto.assignments>count);assert.equal(els.lbFallback.hidden,true);assert.equal(els.lbClose.focused,true);
place.photos=[];els.lightbox.hidden=true;vm.runInContext('renderPhoto(findItem(selected));',ctx);
els.photo.emit('load');assert.equal(els.photo.hidden,true);assert.equal(els.photo.getAttribute('src'),null);assert.equal(els.openLightbox.disabled,true);
// Check mobile shell handlers cannot hide the shared detail photo and recover their own images.
const app=element('app');const mobileCtx=vm.createContext({app});
const mobileStart=mobile.indexOf("app.addEventListener('error'");
const mobileEnd=mobile.indexOf("window.addEventListener('storage'",mobileStart);
vm.runInContext(mobile.slice(mobileStart,mobileEnd),mobileCtx);
// Forward events using a stand-in target bound to the registered capture callbacks.
const capture={};const host={addEventListener:(type,fn)=>capture[type]=fn};
vm.runInNewContext(mobile.slice(mobileStart,mobileEnd),{app:host});
els.photo.hidden=false;els.photo.style.visibility='';capture.error({target:els.photo});
assert.equal(els.photo.style.visibility,'');assert.equal(els.photo.hidden,false);
const guide=element('guide','IMG'),box=element('box');guide.parentElement=box;box.setAttribute('aria-label','Village guide');
capture.error({target:guide});assert.equal(guide.style.visibility,'hidden');assert.equal(box.getAttribute('aria-label'),'Photo unavailable');
capture.load({target:guide});assert.equal(guide.style.visibility,'');assert.equal(box.getAttribute('aria-label'),'Village guide');assert.equal(Object.hasOwn(box.dataset,'mxMissing'),false);
const tile=element('tile'),card=element('card','IMG');card.closest=()=>tile;card.parentElement=tile;
capture.error({target:card});assert.equal(tile.classList.contains('is-missing'),true);
capture.load({target:card});assert.equal(tile.classList.contains('is-missing'),false);
console.log(`PASS: ${scripts} inline scripts and mobile source parse; failed-to-valid gallery recovery, empty-gallery isolation, lightbox navigation/retry/aspect fit, and mobile image ownership/recovery.`);
