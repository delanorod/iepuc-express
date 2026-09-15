// ============================================================================
// MYSQL HOME MATÉRIAS - IEPUC
// Carrega as 3 matérias mais recentes do MySQL
// Mantém o layout antigo dos cards da página inicial
// ============================================================================

(function () {

    'use strict';

    // =========================================================================
    // CONFIGURAÇÃO
    // =========================================================================

    const API_URL = '/api/materias?action=getAll';

    // =========================================================================
    // OBJETO COMPATÍVEL COM O LOADER ANTIGO
    // =========================================================================

    const loader = {

        // ---------------------------------------------------------------------
        // Formata a data da matéria
        // Aceita:
        // DD/MM/YYYY
        // YYYY-MM-DD
        // YYYY-MM-DDTHH:mm:ss
        // ---------------------------------------------------------------------
        formatDate(dateString) {

            if (!dateString) {
                return '';
            }

            const value = String(dateString).trim();

            // Já está no formato brasileiro
            if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                return value;
            }

            // Formato YYYY-MM-DD ou ISO
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

            if (match) {
                return `${match[3]}/${match[2]}/${match[1]}`;
            }

            // Última tentativa
            const date = new Date(value);

            if (!Number.isNaN(date.getTime())) {

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                return `${day}/${month}/${year}`;
            }

            return value;
        }
    };


    // =========================================================================
    // ESCAPA HTML
    // Evita que conteúdo vindo do banco seja interpretado como HTML.
    // =========================================================================

    function escapeHtml(value) {

        if (value === null || value === undefined) {
            return '';
        }

        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }


    // =========================================================================
    // CARREGA MATÉRIAS DO MYSQL
    // =========================================================================

    async function loadMaterias() {

        const loadingIndicator =
            document.getElementById('loading-indicator');

        const errorMessage =
            document.getElementById('error-message');

        const container =
            document.getElementById('materias-container');


        if (!container) {

            console.error(
                'IEPUC na Mídia: #materias-container não encontrado.'
            );

            return;
        }


        try {

            console.log('📰 Carregando matérias do MySQL...');


            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                cache: 'no-store'
            });


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status} - ${response.statusText}`
                );
            }


            const result = await response.json();


            if (!result || result.success !== true) {

                throw new Error(
                    result?.error || 'Resposta inválida da API.'
                );
            }


            let materias = Array.isArray(result.data)
                ? result.data
                : [];


            // -----------------------------------------------------------------
            // A API já entrega ordenado por data.
            // Mesmo assim, limitamos aqui para garantir somente 3 matérias.
            // -----------------------------------------------------------------

            materias = materias.slice(0, 3);


            console.log(
                `📰 ${materias.length} matérias selecionadas para a Home.`
            );


            displayMaterias(materias);


        } catch (error) {

            console.error(
                '❌ Erro ao carregar matérias:',
                error
            );


            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }


            if (container) {
                container.classList.add('hidden');
            }


            if (errorMessage) {
                errorMessage.classList.remove('hidden');
                errorMessage.style.display = 'block';
            }
        }
    }


    // =========================================================================
    // EXIBE AS MATÉRIAS
    // Mantém o layout antigo dos cards da Home
    // =========================================================================

    function displayMaterias(rows) {

        const container =
            document.getElementById('materias-container');

        const loadingIndicator =
            document.getElementById('loading-indicator');

        const errorMessage =
            document.getElementById('error-message');


        if (!container) {
            return;
        }


        // ---------------------------------------------------------------------
        // Esconde loading
        // ---------------------------------------------------------------------

        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }


        // ---------------------------------------------------------------------
        // Nenhuma matéria
        // ---------------------------------------------------------------------

        if (!rows || rows.length === 0) {

            container.innerHTML = '';

            container.classList.add('hidden');

            if (errorMessage) {
                errorMessage.classList.remove('hidden');
                errorMessage.style.display = 'block';
            }

            return;
        }


        // ---------------------------------------------------------------------
        // Grafismos antigos da PUC-Rio
        // ---------------------------------------------------------------------

        const bgPatterns = [

            'https://www.puc-rio.br/imagens/bkg_grafismo_amareloasa.svg',

            'https://www.puc-rio.br/imagens/bkg_grafismo_amareloasainvertida.svg',

            'https://www.puc-rio.br/imagens/bkg_grafismo_amarelocurva.svg'

        ];


        // ---------------------------------------------------------------------
        // Gera os cards
        // ---------------------------------------------------------------------

        const html = rows.map((materia, index) => {

            const pattern =
                bgPatterns[index % bgPatterns.length];


            const titulo =
                escapeHtml(materia.titulo);

            const veiculo =
                escapeHtml(materia.veiculo);

            const resumo =
                escapeHtml(materia.resumo);

            const url =
                escapeHtml(materia.url);

            const data =
                loader.formatDate(materia.data);


            return `
                <article class="materia-card">

                    <div class="materia-img"
                        style="
                            background-image:url('${pattern}'),
                            linear-gradient(45deg,#003366,#0066CC);
                            background-size:cover;
                            background-position:center;">
                    </div>

                    <div class="materia-content">

                        <h3>${titulo}</h3>

                        <p class="materia-meta">
                            <i class="fas fa-newspaper mr-2"></i>
                            ${veiculo}
                            •
                            ${data}
                        </p>

                        <p class="materia-resumo">
                            ${resumo}
                        </p>

                        <a href="${url}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="materia-link">

                            Saiba mais
                            <i class="fas fa-external-link-alt"></i>

                        </a>

                    </div>

                </article>
            `;

        }).join('');


        // ---------------------------------------------------------------------
        // Insere no container
        // ---------------------------------------------------------------------

        container.innerHTML = html;

        container.classList.remove('hidden');

        container.style.display = 'grid';


        if (errorMessage) {
            errorMessage.classList.add('hidden');
            errorMessage.style.display = 'none';
        }


        console.log('✅ Cards de IEPUC na Mídia exibidos.');
    }


    // =========================================================================
    // INICIALIZAÇÃO
    // =========================================================================

    function init() {

        // Evita executar caso o container não exista.
        if (!document.getElementById('materias-container')) {
            return;
        }

        loadMaterias();
    }


    // Aguarda o HTML estar pronto
    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', init);

    } else {

        init();

    }


    // Disponibiliza o loader caso outro código antigo ainda utilize
    // loader.formatDate().
    window.loader = loader;

})();