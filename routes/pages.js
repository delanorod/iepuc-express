const express = require('express');
const router = express.Router();

const pages = [
  {
    "source": "convite-uhp.html",
    "view": "views/convite-uhp.ejs",
    "url": "/convite-uhp.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "index.html",
    "view": "views/index.ejs",
    "url": "/",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "uhp.html",
    "view": "views/uhp.ejs",
    "url": "/uhp.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "carrossel.html",
    "view": "views/carrossel.ejs",
    "url": "/carrossel.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "venezuelageo.html",
    "view": "views/venezuelageo.ejs",
    "url": "/venezuelageo.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "institucional.html",
    "view": "views/institucional.ejs",
    "url": "/institucional.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "html_modal_demo.html",
    "view": "views/html_modal_demo.ejs",
    "url": "/html_modal_demo.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "panorama.html",
    "view": "views/panorama.ejs",
    "url": "/panorama.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "kpmg.html",
    "view": "views/kpmg.ejs",
    "url": "/kpmg.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "tail.html",
    "view": "views/tail.ejs",
    "url": "/tail.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "iepucnamidia/iepucnamidia.html",
    "view": "views/iepucnamidia/iepucnamidia.ejs",
    "url": "/iepucnamidia/iepucnamidia.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "iepucnamidia/iepuc-na-midia-gs.html",
    "view": "views/iepucnamidia/iepuc-na-midia-gs.ejs",
    "url": "/iepucnamidia/iepuc-na-midia-gs.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "iepucnamidia/iepucnamidia-2606.html",
    "view": "views/iepucnamidia/iepucnamidia-2606.ejs",
    "url": "/iepucnamidia/iepucnamidia-2606.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "envios/curso-extensao-iepuc.html",
    "view": "views/envios/curso-extensao-iepuc.ejs",
    "url": "/envios/curso-extensao-iepuc.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "ensino/pos_graduacao.html",
    "view": "views/ensino/pos_graduacao.ejs",
    "url": "/ensino/pos_graduacao.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "ensino/outros_cursos.html",
    "view": "views/ensino/outros_cursos.ejs",
    "url": "/ensino/outros_cursos.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "ensino/trilhatrad.html",
    "view": "views/ensino/trilhatrad.ejs",
    "url": "/ensino/trilhatrad.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "ensino/trilhas.html",
    "view": "views/ensino/trilhas.ejs",
    "url": "/ensino/trilhas.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "enercity/proposta.html",
    "view": "views/enercity/proposta.ejs",
    "url": "/enercity/proposta.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "enercity/quemsomos.html",
    "view": "views/enercity/quemsomos.ejs",
    "url": "/enercity/quemsomos.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "enercity/enercity.html",
    "view": "views/enercity/enercity.ejs",
    "url": "/enercity/enercity.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "enercity/atividades.html",
    "view": "views/enercity/atividades.ejs",
    "url": "/enercity/atividades.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "enercity/contexto.html",
    "view": "views/enercity/contexto.ejs",
    "url": "/enercity/contexto.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "publicacoes/relatorios.html",
    "view": "views/publicacoes/relatorios.ejs",
    "url": "/publicacoes/relatorios.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "publicacoes/boletim-biometano.html",
    "view": "views/publicacoes/boletim-biometano.ejs",
    "url": "/publicacoes/boletim-biometano.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "pesquisa/linha_de_pesquisa.html",
    "view": "views/pesquisa/linha_de_pesquisa.ejs",
    "url": "/pesquisa/linha_de_pesquisa.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "pesquisa/equipe.html",
    "view": "views/pesquisa/equipe.ejs",
    "url": "/pesquisa/equipe.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "pesquisa/projetos.html",
    "view": "views/pesquisa/projetos.ejs",
    "url": "/pesquisa/projetos.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "kpmg/quemsomos.html",
    "view": "views/kpmg/quemsomos.ejs",
    "url": "/kpmg/quemsomos.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "kpmg/publicacoes.html",
    "view": "views/kpmg/publicacoes.ejs",
    "url": "/kpmg/publicacoes.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "kpmg/professor.html",
    "view": "views/kpmg/professor.ejs",
    "url": "/kpmg/professor.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "kpmg/cursos.html",
    "view": "views/kpmg/cursos.ejs",
    "url": "/kpmg/cursos.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "node_modules/bignumber.js/doc/API.html",
    "view": "views/node_modules/bignumber.js/doc/API.ejs",
    "url": "/node_modules/bignumber.js/doc/API.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "imagens/includes/include_header_menu3_iepuc.html",
    "view": "views/imagens/includes/include_header_menu3_iepuc.ejs",
    "url": "/imagens/includes/include_header_menu3_iepuc.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "imagens/includes/include_header_geral_iepuc.html",
    "view": "views/imagens/includes/include_header_geral_iepuc.ejs",
    "url": "/imagens/includes/include_header_geral_iepuc.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "imagens/includes/include_footer_rodape_iepuc.html",
    "view": "views/imagens/includes/include_footer_rodape_iepuc.ejs",
    "url": "/imagens/includes/include_footer_rodape_iepuc.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "imagens/includes/include_header_geral3_iepuc.html",
    "view": "views/imagens/includes/include_header_geral3_iepuc.ejs",
    "url": "/imagens/includes/include_header_geral3_iepuc.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "imagens/includes/include_header_menu_iepuc.html",
    "view": "views/imagens/includes/include_header_menu_iepuc.ejs",
    "url": "/imagens/includes/include_header_menu_iepuc.html",
    "title": "Instituto de Energia PUC-Rio"
  },
  {
    "source": "imagens/newsletter/2024/call-to-paper/news-call-to-paper.html",
    "view": "views/imagens/newsletter/2024/call-to-paper/news-call-to-paper.ejs",
    "url": "/imagens/newsletter/2024/call-to-paper/news-call-to-paper.html",
    "title": "Instituto de Energia PUC-Rio"
  }
];
for (const page of pages) {
  router.get(page.url, (req, res) => res.render(page.view.replace(/^views\//, '').replace(/\.ejs$/, ''), { pageTitle: page.title }));
}

module.exports = router;
