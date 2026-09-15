//v27082026

  // Atualizar a cada 70 segundos
setTimeout(function() {
    location.reload();
}, 70000);

// Forçar atualização com parâmetro anti-cache
setInterval(function() {
    window.location.href = window.location.href.split('?')[0] + '?t=' + new Date().getTime();
}, 60000); // a cada 1 minuto

// Tailwind Configuration
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'puc-blue': '#42929d',
        'puc-light-blue': '#6ab7c2',
        'puc-gold': '#d2ab00',
        'puc-gray': '#666666',
        'puc-light-gray': '#F5F5F5'
      },
      fontFamily: {
        'puc': ['Arial', 'sans-serif']
      }
    }
  }
};

$(document).ready(function() {
  // ==========================================
  // CÓDIGO DO CARROSSEL
  // ==========================================

  // Dados dos slides
  const slides = [

  {
      image: "imagens/slider/boletin-nova-secao.jpg?v=20260826",
      title: "Boletim Biometano ",
      description: "O Instituto de Energia da PUC-Rio inaugura uma nova seção em seu site, dedicada ao Boletim Biometano, que visa fornecer informações atualizadas sobre o mercado de biometano no Brasil e no mundo.",
      buttonText: "Leia",
      slideUrl: "https://www.iepuc.puc-rio.br/publicacoes/boletim-biometano.html"
    },

      {
      image: "imagens/slider/23.jpg?v=20260620",
      title: "Usina híbrida da PUC-Rio inaugura nova fronteira em pesquisa energética no país - Patrocínio Petrogal",
      description: "O PUC URGENTE conversou com Eloi Fernández y Fernández, diretor do Instituto de Energia da PUC-Rio, sobre os diferenciais do projeto realizado com apoio da Petrogal Brasil e da ANP.",
      buttonText: "Leia",
      slideUrl: "https://pucurgente.com.puc-rio.br/usina-hibrida-da-puc-rio-inaugura-nova-fronteira-em-pesquisa-energetica-no-pais/"
    },
    

      /* {
      image: "imagens/slider/22.jpg?v=20260620",
      title: "Usina Híbrida Piloto é inaugurada em Xerém - Patrocínio Petrogal",
      description: "A PUC- Rio inaugurou, na última terça-feira, dia 28, no campus de Xerém, a Usina Híbrida Piloto (UHP).",
      buttonText: "Saiba mais",
      slideUrl: "https://pucurgente.com.puc-rio.br/usina-hibrida-piloto-e-inaugurada-em-xerem/"
    }, */
    
    {
      image: "imagens/slider/uhp-xerem-upscaled.jpg?v=20260620",
      title: "Usina Híbrida Piloto (UHP) - Patrocínio Petrogal",
      description: "Vídeo institucional",
      buttonText: "Assista",
      slideUrl: "https://youtu.be/ZRNJmAawGR0"
    },

    

    // {
    //   image: "imagens/slider/19.jpg",
    //   title: "Energias combinadas: PUC-Rio constrói inédita usina híbrida piloto voltada à segurança energética",
    //   description: "Unidade experimental inclui gás natural, diesel, bateria para armazenagem e laboratório que produz hidrogênio verde com a geração fotovoltaica",
    //   buttonText: "Leia ",
    //   slideUrl: "https://www.estadao.com.br/economia/energias-combinadas-puc-rio-constroi-inedita-usina-hibrida-piloto-voltada-a-seguranca-energetica/"
    // },

    //  {
    //   image: "imagens/slider/18.jpg",
    //   title: "Venezuela e a nova geopolítica do petróleo",
    //   description: "Especial",
    //   buttonText: "Acompanhe",
    //   slideUrl: "https://www.iepuc.puc-rio.br/venezuelageo.html"
    // },
  
    // {
    //   image: "imagens/slider/14.jpg",
    //   title: "Gás Natural no Amazonas: Estudo Socioeconômico e Ambiental",
    //   description: "Avaliação aponta redução de 37% nas emissões da geração elétrica e economia de R$ 7,7 bilhões em 2023, além de ganhos sociais com emprego e renda.",
    //   buttonText: "Baixe aqui",
    //   slideUrl: "http://iepuc.puc-rio.br/arquivos/GN-Amazonas-EstudoSocioeconomico-Ambiental.pdf"
    // },
    // {
    //   image: "imagens/slider/8.jpg",
    //   title: "Hybrid Power Plants In The Context Of The Energy Transition",
    //   description: "Artigo de autoria de Vinicius Santos Pereira, Edmar Luiz Fagundes Almeida, Marco Antonio Haikal Leite e Sergio Luiz Pinto Castiñeiras Filho",
    //   buttonText: "Leia aqui",
    //   slideUrl: "https://enerlac.olade.org/index.php/ENERLAC/article/view/297"
    // },
    // {
    //   image: "imagens/slider/9.jpg",
    //   title: "Ensaio Energético",
    //   description: "Uma plataforma de difusão de conhecimento no mundo da economia da energia",
    //   buttonText: "Descubra",
    //   slideUrl: "https://ensaioenergetico.com.br/"
    // },
    
  ];

  // Variáveis de controle do carrossel
  let currentSlide = 0;
  let slideInterval;

  // Inicializar o carrossel
  function initSlider() {
    const sliderContainer = $('.slider-container');
    const indicatorsContainer = $('.slider-indicators');

    // Limpar conteúdo existente
    sliderContainer.empty();
    indicatorsContainer.empty();

    // Adicionar slides
    slides.forEach((slide, index) => {
      const slideElement = `
        <div class="slider-item ${index === 0 ? 'active' : ''}">
          <div class="bg-cover bg-center h-full text-white flex items-center" style="background-image: url(${slide.image})">
            <div class="absolute inset-0 bg-black opacity-40"></div>
            <div class="container mx-auto px-10 relative z-10">
              <div class="md:w-1/2"> 
                <p class="font-bold text-sm uppercase text-yellow-400 mb-2">IEPUC</p>
                <h3 class="text-4xl font-bold mb-4">${slide.title}</h3>
                <p class="text-xl mb-8 leading-relaxed">${slide.description}</p>
                ${slide.slideUrl ? `<a target="_blank" href="${slide.slideUrl}" class="bg-blue-500 hover:bg-cyan-600 py-4 px-8 text-white font-bold uppercase text-sm rounded-lg transition-colors duration-300 inline-block">${slide.buttonText}</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
      sliderContainer.append(slideElement);

      // Adicionar indicadores
      const indicator = $(`<div class="slider-indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`);
      indicatorsContainer.append(indicator);
    });

    // Iniciar transição automática
    startSlideInterval();
  }

  // Iniciar intervalo para transição automática
  function startSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  // Avançar para o próximo slide
  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  // Voltar para o slide anterior
  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // Ir para um slide específico
  function goToSlide(index) {
    // Remover classe active do slide atual
    $(`.slider-item`).removeClass('active');
    $(`.slider-indicator`).removeClass('active');

    // Adicionar classe active ao novo slide
    $(`.slider-item:eq(${index})`).addClass('active');
    $(`.slider-indicator[data-index="${index}"]`).addClass('active');

    // Atualizar índice do slide atual
    currentSlide = index;

    // Reiniciar intervalo
    startSlideInterval();
  }

  // Event listeners para os controles do carrossel
  $('.slider-control.next').on('click', nextSlide);
  $('.slider-control.prev').on('click', prevSlide);

  // Event listener para os indicadores
  $(document).on('click', '.slider-indicator', function() {
    const index = $(this).data('index');
    goToSlide(index);
  });

  // Inicializar o slider
  initSlider();

  // ==========================================
// CÓDIGO DO MENU MOBILE - VERSÃO CORRIGIDA
// ==========================================

$('#mobile-menu-button').on('click', function(e) {
  e.stopPropagation(); // Impede propagação
  $('#mobile-menu').toggleClass('hidden');
});

// Toggle dos submenus mobile - VERSÃO CORRIGIDA
$('.mobile-menu-toggle').on('click', function(e) {
  e.stopPropagation(); // 🔥 IMPORTANTE: impede que o evento feche o menu
  e.preventDefault();  // 🔥 Evita comportamentos padrão indesejados
  
  const targetId = $(this).attr('data-target');
  const submenu = $('#' + targetId);
  const chevron = $(this).find('.mobile-menu-chevron');
  
  // Fecha outros submenus abertos (opcional)
  $('.mobile-submenu').not(submenu).removeClass('expanded');
  $('.mobile-menu-chevron').not(chevron).removeClass('rotated');
  
  // Toggle do submenu atual
  submenu.toggleClass('expanded');
  chevron.toggleClass('rotated');
});

// Fechar menu ao clicar fora - VERSÃO CORRIGIDA
$(document).on('click', function(event) {
  if (!$(event.target).closest('#mobile-menu').length && 
      !$(event.target).closest('#mobile-menu-button').length) {
    $('#mobile-menu').addClass('hidden');
    // Opcional: fecha todos os submenus ao fechar o menu
    $('.mobile-submenu').removeClass('expanded');
    $('.mobile-menu-chevron').removeClass('rotated');
  }
});

  // ==========================================
  // ANIMAÇÕES E EFEITOS
  // ==========================================

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).css({
          'opacity': '1',
          'transform': 'translateY(0)'
        });
      }
    });
  }, observerOptions);

  // Adicionar classes de animação
  $('.feature-card, .course-card, .news-card').each(function() {
    $(this).css({
      'opacity': '0',
      'transform': 'translateY(20px)',
      'transition': 'opacity 0.6s ease, transform 0.6s ease'
    });
    observer.observe(this);
  });

  // Adicionar animação fade-in ao hero
  const heroContent = $('.animate-fade-in');
  if (heroContent.length) {
    heroContent.css({
      'opacity': '0',
      'transform': 'translateY(30px)',
      'transition': 'opacity 1s ease, transform 1s ease'
    });

    setTimeout(() => {
      heroContent.css({
        'opacity': '1',
        'transform': 'translateY(0)'
      });
    }, 300);
  }
});

/* 
// Função principal para carregar artigos
function loadMaterias() {
    const container = document.getElementById('materias-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');

    // Mostra o indicador de carregamento e esconde o conteúdo anterior
    loadingIndicator.style.display = 'block';
    container.style.display = 'none';
    errorMessage.classList.add('hidden');

    fetchMySQLData();
}

// Busca as 3 primeiras matérias da API MySQL (api-prod.php)
async function fetchMySQLData() {
    // Ajuste o caminho conforme a localização do api-prod.php no servidor
    //const apiUrl = '../src/api-prod.php';
    

    try {
        const response = await fetch(`${apiUrl}?action=getAll&limit=3&offset=0`);

        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Erro desconhecido ao buscar dados');
        }

        if (!result.data || result.data.length === 0) {
            showSampleData();
            return;
        }

        displayMaterias(result.data);

    } catch (error) {
        console.error('Falha ao carregar dados da API:', error);
        showSampleData();
    }
}

// Formata e exibe os dados na página
function displayMaterias(rows) {

    // Formata data no padrão DD/MM/YYYY (a API já retorna nesse formato)
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        // Se já vier no formato DD/MM/YYYY ou DD.MM.YYYY, garante separador ponto
        const parts = dateStr.split(/[\/\.\-]/);
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        }
        return dateStr;
    };

    const bgPatterns = [
        'https://www.puc-rio.br/imagens/bkg_grafismo_amareloasa.svg',
        'https://www.puc-rio.br/imagens/bkg_grafismo_amareloasainvertida.svg',
        'https://www.puc-rio.br/imagens/bkg_grafismo_amarelocurva.svg'
    ].sort(() => Math.random() - 0.5);

    const html = rows.map((materia, index) => {
        const pattern = bgPatterns[index % bgPatterns.length];
        const imageHTML = `<div class="materia-img" style="background-image: url('${pattern}'), linear-gradient(45deg, #003366, #0066CC); background-size: cover; background-position: center; background-blend-mode: normal;"></div>`;

        return `
            <article class="materia-card">
                ${imageHTML}
                <div class="materia-content">
                    <h3>${materia.titulo}</h3>
                    <p class="materia-meta">
                        <i class="fas fa-newspaper mr-2"></i>
                        ${materia.veiculo} • ${formatDate(materia.data)}
                    </p>
                    <p class="materia-resumo">${materia.resumo}</p>
                    <a href="${materia.url}" target="_blank" rel="noopener noreferrer" class="materia-link">
                        Saiba mais <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </article>`;
    }).join("");

    const container = document.getElementById("materias-container");
    container.innerHTML = html;
    container.style.display = 'grid';

    document.getElementById('loading-indicator').style.display = 'none';
}

function showSampleData() {
    console.log('Exibindo dados de exemplo');
    document.getElementById('loading-indicator').style.display = 'none';

    const sampleData = [
        { data: "10/08/2025", titulo: "IEPUC participa de conferência internacional sobre energias renováveis", veiculo: "Jornal do Brasil", resumo: "Instituto apresenta pesquisas sobre eficiência energética e sustentabilidade em evento global.", url: "#", imagem: "" },
        { data: "05/08/2025", titulo: "Nova parceria com empresa do setor elétrico brasileiro", veiculo: "Valor Econômico", resumo: "Acordo visa desenvolvimento de tecnologias inovadoras para o mercado nacional de energia.", url: "#", imagem: "" },
        { data: "01/08/2025", titulo: "Pesquisador do IEPUC recebe prêmio de inovação", veiculo: "O Globo", resumo: "Reconhecimento internacional por desenvolvimento de soluções em energia limpa.", url: "#", imagem: "" }
    ];

    displayMaterias(sampleData);
} */



// Inicia o carregamento quando a página está pronta
//document.addEventListener('DOMContentLoaded', loadMaterias);



