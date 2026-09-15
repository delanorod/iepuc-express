const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const views = path.join(root, 'views');
let failures = 0, warnings = 0;
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
const files = walk(views).filter(f=>f.endsWith('.ejs'));
console.log(`Views EJS: ${files.length}`);
for (const f of files) {
  const s = fs.readFileSync(f,'utf8');
  if (/<!--#include/i.test(s)) { console.error('FAIL SSI restante:', path.relative(root,f)); failures++; }
  if (/<script[^>]+src=["'][^"']*\.php/i.test(s)) { console.error('FAIL PHP script:', path.relative(root,f)); failures++; }
  if (/src=["'](?:\.\.\/)?(?:src|css|imagens|efeitos|arquivos|videos)\//.test(s)) { console.warn('WARN caminho relativo:', path.relative(root,f)); warnings++; }
}
const header=fs.readFileSync(path.join(views,'partials/header.ejs'),'utf8');
const footer=fs.readFileSync(path.join(views,'partials/footer.ejs'),'utf8');
if (!header.includes('<html')) { console.error('FAIL header sem <html>'); failures++; }
if (!footer.includes('</html>')) { console.error('FAIL footer sem </html>'); failures++; }
const exposed = walk(path.join(root,'public')).filter(f=>f.endsWith('.php'));
if (exposed.length) { console.error('FAIL PHP exposto em public:', exposed); failures += exposed.length; }
console.log(`Warnings: ${warnings}`); console.log(`Failures: ${failures}`); process.exitCode=failures?1:0;
