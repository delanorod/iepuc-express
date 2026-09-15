const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..'); const pub=path.join(root,'public');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)])}
const files=walk(path.join(root,'views')).filter(f=>f.endsWith('.ejs'));
const refs=new Set();
for(const f of files){const s=fs.readFileSync(f,'utf8'); for(const m of s.matchAll(/(?:src|href)=["'](\/(?:css|dist|efeitos|imagens|arquivos|videos|src)\/[^"'#?\s>]+)/g)){refs.add(m[1]);}}
let miss=0;
for(const r of [...refs].sort()){const p=path.join(pub,r.slice(1)); if(!fs.existsSync(p)){console.log('MISSING',r);miss++;}}
console.log(`Local asset refs checked: ${refs.size}`); console.log(`Missing: ${miss}`); process.exitCode=miss?1:0;
