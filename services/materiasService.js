const mysql = require('mysql2/promise');

let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: process.env.DB_CHARSET || 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 5,
    });
  }
  return pool;
}

async function getAll(limit = 0, offset = 0) {
  let sql = `SELECT titulo, url, veiculo, data, resumo, categoria, imagem
             FROM materias
             WHERE titulo IS NOT NULL AND titulo != ''
             ORDER BY STR_TO_DATE(data, '%d/%m/%Y') DESC`;
  const params = [];
  if (limit > 0) { sql += ' LIMIT ? OFFSET ?'; params.push(limit, offset); }
  const [rows] = await getPool().execute(sql, params);
  return { success: true, data: rows, count: rows.length };
}

async function count() {
  const [rows] = await getPool().execute(`SELECT COUNT(*) AS total FROM materias WHERE titulo IS NOT NULL AND titulo != ''`);
  return Number(rows[0]?.total || 0);
}

async function getByCategory(categoria) {
  const [rows] = await getPool().execute(`SELECT titulo, url, veiculo, data, resumo, categoria, imagem
    FROM materias WHERE categoria LIKE ? AND titulo IS NOT NULL AND titulo != ''
    ORDER BY STR_TO_DATE(data, '%d/%m/%Y') DESC`, [`%${categoria}%`]);
  return { success: true, data: rows, count: rows.length };
}

module.exports = { getAll, count, getByCategory };
