// ============================================================================
// CARREGADOR DE MATÉRIAS - MYSQL / EXPRESS
// Mantém o mesmo layout visual do antigo Google Sheets Loader
// ============================================================================

class MySQLLoader {

    constructor() {
        // Quantidade de matérias exibidas por página
        this.postsPerPage = 6;

        // Página atual
        this.currentPage = 0;

        // Todas as matérias recebidas da API
        this.allPosts = [];
    }

    // ========================================================================
    // MÉTODO PARA CARREGAR DADOS DO MYSQL ATRAVÉS DA API
    // ========================================================================

    async loadData() {

        console.log('🔄 Carregando matérias do MySQL...');

        const response = await fetch('/api/materias', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        const result = await response.json();

        console.log('📦 Resposta da API:', result);

        if (!result.success) {
            throw new Error(
                result.error || 'Erro ao carregar matérias'
            );
        }

        if (!Array.isArray(result.data)) {
            throw new Error('A API não retornou uma lista de matérias');
        }

        console.log(`✅ ${result.data.length} matérias recebidas do MySQL`);

        return result.data;
    }

    // ========================================================================
    // MÉTODO PARA FORMATAR DATAS
    // ========================================================================

    formatDate(dateString) {

        if (!dateString) return '';

        try {

            const texto = String(dateString).trim();

            // DD/MM/YYYY
            if (/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) {
                const parts = texto.split('/');

                return `${parts[0].padStart(2, '0')}.${parts[1].padStart(2, '0')}.${parts[2]}`;
            }

            // DD.MM.YYYY
            if (/^\d{2}\.\d{2}\.\d{4}$/.test(texto)) {
                const parts = texto.split('.');

                return `${parts[0].padStart(2, '0')}.${parts[1].padStart(2, '0')}.${parts[2]}`;
            }

            // DD-MM-YYYY
            if (/^\d{2}-\d{2}-\d{4}$/.test(texto)) {
                const parts = texto.split('-');

                return `${parts[0].padStart(2, '0')}.${parts[1].padStart(2, '0')}.${parts[2]}`;
            }

            // YYYY-MM-DD
            if (/^\d{4}-\d{2}-\d{2}/.test(texto)) {
                const parts = texto.substring(0, 10).split('-');

                return `${parts[2]}.${parts[1]}.${parts[0]}`;
            }

        } catch (error) {

            console.error(
                '❌ Erro ao formatar data:',
                error
            );
        }

        return dateString;
    }

    // ========================================================================
    // MÉTODO PARA DEFINIR CORES DAS CATEGORIAS
    // ========================================================================

    getCategoryBadge(category) {

        const categoryLower =
            (category || '').toLowerCase().trim();

        const categoryMap = {

            // Petróleo e Gás
            'petróleo':
                'bg-blue-100 text-blue-800',

            'petróleo & gás':
                'bg-blue-100 text-blue-800',

            'petroleo':
                'bg-blue-100 text-blue-800',

            'petroleo & gas':
                'bg-blue-100 text-blue-800',

            'gás':
                'bg-blue-100 text-blue-800',

            'gas':
                'bg-blue-100 text-blue-800',

            // Biocombustíveis
            'biocombustível':
                'bg-green-100 text-green-800',

            'biocombustiveis':
                'bg-green-100 text-green-800',

            'biocombustíveis':
                'bg-green-100 text-green-800',

            'etanol':
                'bg-green-100 text-green-800',

            'biodiesel':
                'bg-green-100 text-green-800',

            // Energia Renovável
            'energia renovável':
                'bg-yellow-100 text-yellow-800',

            'renovavel':
                'bg-yellow-100 text-yellow-800',

            'renovável':
                'bg-yellow-100 text-yellow-800',

            'solar':
                'bg-yellow-100 text-yellow-800',

            'eólica':
                'bg-yellow-100 text-yellow-800',

            'eolica':
                'bg-yellow-100 text-yellow-800',

            'hidrelétrica':
                'bg-yellow-100 text-yellow-800',

            // Energia Nuclear
            'nuclear':
                'bg-purple-100 text-purple-800',

            'uranio':
                'bg-purple-100 text-purple-800',

            'urânio':
                'bg-purple-100 text-purple-800'
        };

        const colorClass =
            categoryMap[categoryLower] ||
            'bg-gray-100 text-gray-800';

        return `
            <span class="${colorClass} text-xs px-2.5 py-0.5 rounded">
                ${category}
            </span>
        `;
    }

    // ========================================================================
    // MÉTODO PARA FORMATAR RESUMO
    // ========================================================================

    formatResumo(text) {

        if (!text) return '';

        let resultado = '';
        let dentroAspas = false;
        let aspaTipo = null;

        for (let i = 0; i < text.length; i++) {

            const char = text[i];
            const nextChar = text[i + 1];

            // Detecta abertura/fechamento de aspas
            if (char === '"' || char === "'") {

                if (!dentroAspas) {

                    dentroAspas = true;
                    aspaTipo = char;

                } else if (char === aspaTipo) {

                    dentroAspas = false;
                    aspaTipo = null;
                }

                resultado += char;
            }

            // Ponto seguido de espaço fora de aspas
            else if (
                char === '.' &&
                nextChar === ' ' &&
                !dentroAspas
            ) {

                resultado += '.<br>';

                // pula o espaço
                i++;
            }

            else {

                resultado += char;
            }
        }

        return resultado;
    }

    // ========================================================================
    // MÉTODO PARA CRIAR HTML DE UMA MATÉRIA
    // ========================================================================

    createPostHTML(post) {

        console.log(
            '🏗️ Criando HTML para matéria:',
            post.titulo
        );

        const {
            titulo = '',
            url = '',
            veiculo = '',
            data = '',
            resumo = '',
            categoria = '',
            imagem = ''
        } = post;

        // Formata a data
        const formattedDate =
            this.formatDate(data);

        // Cria badge da categoria
        const categoryBadge =
            this.getCategoryBadge(categoria);

        // Formata resumo
        const resumoFormatado =
            this.formatResumo(resumo);

        // Imagem padrão
        const imageUrl =
            imagem ||
            'imagens/iepuc-na-midia/default-news.jpg';

        const imageAlt =
            `Matéria ${veiculo}`;

        // ====================================================================
        // MESMO TEMPLATE VISUAL DO ARQUIVO ORIGINAL
        // ====================================================================

        return `
            <article class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl">

                <div class="md:flex">

                    <!-- Container da Imagem -->
                    <div class="md:flex-shrink-0 md:w-64">

                        <img
                            class="h-48 w-full object-contain bg-white md:h-full md:w-64"
                            src="${imageUrl}"
                            alt="${imageAlt}"
                            onerror="this.src='imagens/iepuc-na-midia/default-news.jpg'"
                        >

                    </div>

                    <!-- Container do Conteúdo -->
                    <div class="p-6">

                        <!-- Veículo e Data -->
                        <div class="flex items-center text-sm text-gray-500 mb-2">

                            <span class="mr-4">
                                ${veiculo}
                            </span>

                            <span>
                                <i class="far fa-calendar-alt mr-1"></i>
                                ${formattedDate}
                            </span>

                        </div>

                        <!-- Título -->
                        <h3 class="text-xl font-bold text-gray-900 mb-3">

                            <a
                                href="${url}"
                                class="hover:text-blue-700 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${titulo}
                            </a>

                        </h3>

                        <!-- Resumo -->
                        <p class="text-gray-600 mb-4">
                            ${resumoFormatado}
                        </p>

                        <!-- Categoria e Link -->
                        <div class="flex items-center justify-between">

                            ${categoryBadge}

                            <a
                                href="${url}"
                                class="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Matéria completa
                                <i class="ml-1 fas fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>

                </div>

            </article>
        `;
    }

    // ========================================================================
    // MÉTODO PARA EXIBIR MATÉRIAS
    // ========================================================================

    displayPosts(posts) {

        console.log(
            `📺 Exibindo ${posts.length} matérias`
        );

        const blogContainer =
            document.getElementById('blogue');

        const loadMoreContainer =
            document.getElementById('loadMoreContainer');

        if (!blogContainer) {

            console.error(
                '❌ Elemento #blogue não encontrado'
            );

            return;
        }

        if (posts.length === 0) {

            blogContainer.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-600">
                        Nenhuma matéria encontrada.
                    </p>
                </div>
            `;

        } else {

            blogContainer.innerHTML =
                posts
                    .map(post => this.createPostHTML(post))
                    .join('');
        }

        // Mostra o container
        blogContainer.classList.remove('hidden');

        // Verifica se ainda existem matérias
        const hasMorePosts =
            (this.currentPage + 1) * this.postsPerPage <
            this.allPosts.length;

        if (hasMorePosts) {

            loadMoreContainer.classList.remove(
                'hidden'
            );

        } else {

            loadMoreContainer.classList.add(
                'hidden'
            );
        }
    }

    // ========================================================================
    // MÉTODO PARA CARREGAR MAIS MATÉRIAS
    // ========================================================================

    loadMorePosts() {

        console.log(
            '➕ Carregando mais matérias...'
        );

        this.currentPage++;

        const startIndex =
            this.currentPage * this.postsPerPage;

        const endIndex =
            startIndex + this.postsPerPage;

        const newPosts =
            this.allPosts.slice(
                startIndex,
                endIndex
            );

        if (newPosts.length > 0) {

            const blogContainer =
                document.getElementById('blogue');

            const newPostsHTML =
                newPosts
                    .map(post =>
                        this.createPostHTML(post)
                    )
                    .join('');

            blogContainer.insertAdjacentHTML(
                'beforeend',
                newPostsHTML
            );

            console.log(
                `✅ Adicionadas ${newPosts.length} novas matérias`
            );
        }

        const hasMorePosts =
            (this.currentPage + 1) * this.postsPerPage <
            this.allPosts.length;

        if (!hasMorePosts) {

            document
                .getElementById('loadMoreContainer')
                .classList.add('hidden');

            console.log(
                '🏁 Todas as matérias foram carregadas'
            );
        }
    }

    // ========================================================================
    // CONTROLE DE ERRO
    // ========================================================================

    showError() {

        console.log(
            '❌ Exibindo mensagem de erro'
        );

        const loading =
            document.getElementById('loading');

        const error =
            document.getElementById('error');

        if (loading) {
            loading.classList.add('hidden');
        }

        if (error) {
            error.classList.remove('hidden');
        }
    }

    // ========================================================================
    // CONTROLE DO LOADING
    // ========================================================================

    hideLoading() {

        console.log(
            '✅ Removendo indicador de carregamento'
        );

        const loading =
            document.getElementById('loading');

        if (loading) {
            loading.classList.add('hidden');
        }
    }

    // ========================================================================
    // INICIALIZAÇÃO
    // ========================================================================

    async init() {

        console.log(
            '🚀 Inicializando carregador MySQL'
        );

        try {

            // ---------------------------------------------------------------
            // 1. Busca matérias na API
            // ---------------------------------------------------------------

            const data =
                await this.loadData();

            // ---------------------------------------------------------------
            // 2. Filtra e ordena
            // ---------------------------------------------------------------

            console.log(
                '🔄 Processando e ordenando dados...'
            );

            this.allPosts = data

                // Remove registros sem título
                .filter(post =>
                    post.titulo &&
                    post.titulo.trim()
                )

                // Ordena da mais recente para a mais antiga
                .sort((a, b) => {

                    const dateA =
                        a.data
                            ? String(a.data)
                                .split(/[\/\.\-]/)
                                .reverse()
                                .join('')
                            : '';

                    const dateB =
                        b.data
                            ? String(b.data)
                                .split(/[\/\.\-]/)
                                .reverse()
                                .join('')
                            : '';

                    return dateB.localeCompare(
                        dateA
                    );
                });

            console.log(
                `📊 Total de matérias processadas: ${this.allPosts.length}`
            );

            // ---------------------------------------------------------------
            // 3. Esconde loading
            // ---------------------------------------------------------------

            this.hideLoading();

            // ---------------------------------------------------------------
            // 4. Exibe as primeiras 6
            // ---------------------------------------------------------------

            const initialPosts =
                this.allPosts.slice(
                    0,
                    this.postsPerPage
                );

            this.displayPosts(
                initialPosts
            );

            console.log(
                '🎉 Inicialização concluída com sucesso!'
            );

        } catch (error) {

            console.error(
                '💥 Erro durante a inicialização:',
                error
            );

            this.showError();
        }
    }
}

// ============================================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        console.log(
            '📄 Página carregada, iniciando script...'
        );

        // Cria o carregador
        const loader =
            new MySQLLoader();

        // Inicializa
        loader.init();

        // Configura botão "Carregar mais"
        const loadMoreButton =
            document.getElementById('loadMore');

        if (loadMoreButton) {

            loadMoreButton.addEventListener(
                'click',
                () => {

                    console.log(
                        '🖱️ Botão "Carregar mais" clicado'
                    );

                    loader.loadMorePosts();
                }
            );
        }

        console.log(
            '⚙️ Event listeners configurados'
        );
    }
);

// ============================================================================
// FUNÇÃO AUXILIAR PARA RECARREGAR
// ============================================================================

function reloadPosts() {

    console.log(
        '🔄 Recarregando matérias...'
    );

    location.reload();
}