# Bateria automatizada — IEPUC Express

## Instalação
npm install -D @playwright/test
npx playwright install chromium

## Executar
npm test

## Testes separados
npx playwright test tests/routes.spec.js
npx playwright test tests/javascript.spec.js
npx playwright test tests/images.spec.js
npx playwright test tests/links.spec.js

## Ver navegador
set HEADED=1 && npm test

## Relatório
npx playwright show-report

## URL
Padrão: https://www.iepuc.local
Alternativa:
set BASE_URL=https://www.iepuc.local && npm test

## Rotas
O arquivo tests/helpers/routes.js descobre automaticamente arquivos .ejs/.html em views/ e converte para URLs. Isso evita manter manualmente a lista das páginas migradas.

## Pré-condições
- Apache/XAMPP iniciado
- VirtualHost HTTP/HTTPS funcionando
- Express iniciado em localhost:3000
- www.iepuc.local apontando para 127.0.0.1
