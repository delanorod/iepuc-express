const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const VIEWS = path.join(ROOT, 'views');
const FALLBACK = path.join(ROOT, 'tests', 'routes.json');

const ignored = new Set(['partials', 'includes', 'node_modules', 'tests']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ejs|html)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function normalize(file, base) {
  let rel = path.relative(base, file).replace(/\\/g, '/');
  rel = rel.replace(/\.ejs$/i, '.html');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

function getRoutes() {
  let routes = [];
  if (fs.existsSync(VIEWS)) routes = walk(VIEWS).map(f => normalize(f, VIEWS));
  if (!routes.length && fs.existsSync(FALLBACK)) {
    routes = JSON.parse(fs.readFileSync(FALLBACK, 'utf8'));
  }
  routes = [...new Set(routes)].sort();
  if (!routes.length) throw new Error('Nenhuma rota encontrada. Crie views/ com .ejs ou preencha tests/routes.json.');
  return routes;
}

module.exports = { getRoutes };
