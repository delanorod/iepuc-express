// ============================================================
// IMPORTANTE: este arquivo depende da classe GoogleSheetsLoader
// definida em google-sheets-loader.js. Inclua os dois scripts
// na página, nesta ordem:
//
//   <script src="google-sheets-loader.js"></script>
//   <script src="este-arquivo.js"></script>
//
// Ajuste o SHEET_ID / SHEET_NAME abaixo conforme a sua planilha.
// ============================================================

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const SHEET_ID = 
const SHEET_NAME = 

const loader = new GoogleSheetsLoader(SHEET_ID, SHEET_NAME);

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', loadMaterias);

// ============================================================================
// CARREGA AS MATÉRIAS
// ============================================================================

async function loadMaterias() {

    const container = document.getElementById('materias-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');

    loadingIndicator.style.display = 'block';
    container.style.display = 'none';

    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }

    try {

        let materias = await loader.loadData();

        materias = materias

            // remove linhas vazias
            .filter(m => m.titulo && m.titulo.trim())

            // ordena por data
            .sort((a, b) => {

                const da = a.data
                    ? a.data.split(/[\/\.]/).reverse().join('')
                    : '';

                const db = b.data
                    ? b.data.split(/[\/\.]/).reverse().join('')
                    : '';

                return db.localeCompare(da);

            })

            // apenas 3 matérias
            .slice(0, 3);

        displayMaterias(materias);

    }
    catch (error) {

        console.error(error);

        showSampleData();

    }

}

// ============================================================================
// EXIBE AS MATÉRIAS
// ============================================================================

function displayMaterias(rows) {

    const bgPatterns = [
        'https://www.puc-rio.br/imagens/bkg_grafismo_amareloasa.svg',
        'https://www.puc-rio.br/imagens/bkg_grafismo_amareloasainvertida.svg',
        'https://www.puc-rio.br/imagens/bkg_grafismo_amarelocurva.svg'
    ];

    const html = rows.map((materia, index) => {

        const pattern = bgPatterns[index % bgPatterns.length];

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

                    <h3>${materia.titulo}</h3>

                    <p class="materia-meta">
                        <i class="fas fa-newspaper mr-2"></i>
                        ${materia.veiculo}
                        •
                        ${loader.formatDate(materia.data)}
                    </p>

                    <p class="materia-resumo">
                        ${materia.resumo}
                    </p>

                    <a href="${materia.url}"
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

    const container = document.getElementById('materias-container');

    container.innerHTML = html;

    container.style.display = 'grid';

    document.getElementById('loading-indicator').style.display = 'none';

}

// ============================================================================
// DADOS DE EXEMPLO
// ============================================================================

function showSampleData() {

    document.getElementById('loading-indicator').style.display = 'none';

    const sampleData = [

        {
            data: "10/08/2025",
            titulo: "IEPUC participa de conferência internacional sobre energias renováveis",
            veiculo: "Jornal do Brasil",
            resumo: "Instituto apresenta pesquisas sobre eficiência energética e sustentabilidade em evento global.",
            url: "#"
        },

        {
            data: "05/08/2025",
            titulo: "Nova parceria com empresa do setor elétrico brasileiro",
            veiculo: "Valor Econômico",
            resumo: "Acordo visa desenvolvimento de tecnologias inovadoras para o mercado nacional de energia.",
            url: "#"
        },

        {
            data: "01/08/2025",
            titulo: "Pesquisador do IEPUC recebe prêmio de inovação",
            veiculo: "O Globo",
            resumo: "Reconhecimento internacional por desenvolvimento de soluções em energia limpa.",
            url: "#"
        }

    ];

    displayMaterias(sampleData);

}