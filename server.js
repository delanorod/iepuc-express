require('dotenv').config();
const express = require('express');
const path = require('path');
const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || 'localhost';

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: false }));
app.use('/api', apiRouter);
app.use(pagesRouter);

app.use((req, res) => res.status(404).send('Página não encontrada'));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Erro interno do servidor');
});

if (require.main === module) app.listen(PORT, HOST, () => console.log(`IEPUC Express em http://${HOST}:${PORT}`));
module.exports = app;
