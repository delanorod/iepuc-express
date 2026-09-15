const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name); if(e.isDirectory())walk(p); else if(e.name.endsWith('.ejs')&&!p.includes(`${path.sep}partials${path.sep}`))files.push(p)}}
walk(path.join(root,'views'));
let fail=0;
for(const f of files){const rel=path.relative(path.join(root,'views'),f).replace(/\\/g,'/').replace(/\.ejs$/,''); const url=rel==='index'?'/' : '/'+rel; if(!url.startsWith('/')){console.error('FAIL',url);fail++}}
console.log(`Route definitions verificáveis: ${files.length}`); console.log(`Failures: ${fail}`); process.exitCode=fail?1:0;
