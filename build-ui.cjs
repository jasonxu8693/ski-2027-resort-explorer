// Keep the deployable site self-contained while keeping the companion UI maintainable.
const fs=require('node:fs');
let html=fs.readFileSync('index.html','utf8');
html=html.replace(/<!-- COMPANION UI START -->[\s\S]*?<!-- COMPANION UI END -->/g,'');
const css=['mobile-explorer.css','mobile-trip.css','mobile-flow.css'].map(x=>fs.readFileSync(x,'utf8')).join('\n');
const js=['mobile-explorer.js','mobile-trip.js'].map(x=>fs.readFileSync(x,'utf8')).join('\n');
html=html.replace('</body>',`<!-- COMPANION UI START -->\n<style id="companion-ui">\n${css}\n</style>\n<script id="companion-script">\n${js}\n</script>\n<!-- COMPANION UI END -->\n</body>`);
fs.writeFileSync('index.html',html);
console.log('Companion UI embedded in index.html');
