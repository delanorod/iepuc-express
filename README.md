# IEPUC — migração Express

Migração inicial do site para Node.js + Express + EJS. O conteúdo visual foi preservado e os SSI do Apache foram convertidos em partials EJS.

## Instalação
1. Instale Node.js LTS.
2. `npm install`
3. Copie `.env.example` para `.env` e preencha somente no servidor.
4. `npm test`
5. `npm start`
6. Acesse `http://localhost:3000/`.

## API
`GET /api/materias?action=getAll`
`GET /api/materias?action=count`
`GET /api/materias?action=getByCategory&categoria=...`

## Segurança
Nenhuma credencial do PHP antigo foi migrada para o código. O banco usa variáveis de ambiente. O diretório `public/` não contém PHP.
