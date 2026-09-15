# Testes TD — primeira bateria

Data: 28/08/2026

## Executados neste ambiente

- Auditoria dos 39 arquivos/páginas migrados para EJS: OK.
- Auditoria de SSI `<!--#include ... -->` remanescente: OK, nenhum encontrado nas views.
- Auditoria de PHP exposto em `public/`: OK, nenhum PHP foi copiado para `public/`.
- Auditoria de rotas geradas: OK, 39 views de páginas identificadas.
- Auditoria de sintaxe JavaScript: os scripts migrados usados como assets foram revisados; `gs_loader.js` original foi excluído de `public/` porque o arquivo original contém erro de sintaxe e código experimental/incompleto.
- Auditoria de referências locais: 35 referências apontam para arquivos que **não existem no ZIP recebido**. Isso já estava faltando na origem; não foi criado pela migração.

## Arquivos ausentes referenciados

- 21 imagens de equipe/apoio em `/imagens/`.
- `/src/boletins/boletim_01.pdf`
- `/src/boletins/boletim_02.pdf`
- `/src/google-sheets-loadercards.js`
- `/src/google-sheets-loadercards2.js`
- `/src/images/boletim1.jpg`
- `/src/images/boletim2.jpg`
- `/videos/cop30/cop30-1minuto.mkv`
- `/videos/cop30/cop30-1minuto.mp4`

## Limitação importante

Não foi possível executar o servidor Express nesta sessão porque `express`/`ejs`/`mysql2` não estavam instalados no ambiente e o download via npm não concluiu. O projeto foi preparado com essas dependências no `package.json` para instalação no PC/servidor com `npm install`.

Portanto, os testes de **HTTP real, renderização EJS, conexão MySQL e integração Google Sheets** ainda precisam ser executados após a instalação das dependências.

## Segurança

O ZIP original contém código PHP com credenciais de banco embutidas. Essas credenciais **não foram copiadas** para o projeto Express. Recomenda-se trocar/rotacionar a senha do banco antes de colocar o novo ambiente em produção, porque a credencial já apareceu em um arquivo do projeto original.
