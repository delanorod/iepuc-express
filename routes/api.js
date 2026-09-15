const express = require('express');
const router = express.Router();
const materias = require('../services/materiasService');

router.get('/materias', async (req, res) => {
  try {
    const action = req.query.action || 'getAll';
    if (action === 'getAll') {
      const limit = Math.max(0, Number.parseInt(req.query.limit || '0', 10) || 0);
      const offset = Math.max(0, Number.parseInt(req.query.offset || '0', 10) || 0);
      return res.json(await materias.getAll(limit, offset));
    }
    if (action === 'count') return res.json({ success: true, total: await materias.count() });
    if (action === 'getByCategory') {
      const categoria = String(req.query.categoria || '').trim();
      if (!categoria) return res.status(400).json({ success: false, error: 'Categoria não informada' });
      return res.json(await materias.getByCategory(categoria));
    }
    return res.status(404).json({ success: false, error: 'Ação não encontrada' });
  } catch (err) {
    console.error('API /api/materias:', err.message);
    return res.status(500).json({ success: false, error: 'Erro interno ao buscar matérias' });
  }
});
router.all('/materias', (req,res,next)=> req.method==='GET' ? next() : res.status(405).json({success:false,error:'Método não permitido'}));
module.exports = router;
