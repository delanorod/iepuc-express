
        // Função para animar os números com efeitos visuais
        function animateCounter(element, target, duration = 2500) {
            const start = parseInt(element.textContent) || 0;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Curva de ease-out para animação mais suave
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easedProgress);
                
                element.textContent = current.toLocaleString('pt-BR');
                
                // Adicionar classe de highlight durante a animação
                if (progress < 1) {
                    element.classList.add('counting', 'number-highlight');
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target.toLocaleString('pt-BR');
                    element.classList.remove('counting', 'number-highlight');
                }
            }
            
            requestAnimationFrame(updateNumber);
        }
        
        // Função melhorada para detectar visibilidade
        function isElementInViewport(el, threshold = 0.3) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const elementHeight = rect.bottom - rect.top;
            
            return (
                rect.top < windowHeight - (elementHeight * threshold) &&
                rect.bottom > elementHeight * threshold
            );
        }
        
        // Função principal de animação
        function handleScrollAnimation() {
            const statsSection = document.querySelector('.iepuc-stats-section');
            
            if (!statsSection) {
                console.log('Seção de estatísticas não encontrada');
                return;
            }
            
            if (isElementInViewport(statsSection) && !statsSection.classList.contains('animated')) {
                console.log('Iniciando animação do contador...');
                statsSection.classList.add('animated');
                
                const statItems = document.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    const delay = parseInt(item.dataset.delay) || (index * 200);
                    
                    setTimeout(() => {
                        item.classList.add('animate');
                        
                        // Iniciar animação do número após a entrada do card
                        setTimeout(() => {
                            const numberElement = item.querySelector('.stat-number');
                            const target = parseInt(numberElement.dataset.target);
                            animateCounter(numberElement, target);
                        }, 600);
                    }, delay);
                });
            }
        }
        
        // Event listeners
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScrollAnimation, 10);
        });
        
        window.addEventListener('resize', handleScrollAnimation);
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM carregado, verificando animações...');
            setTimeout(handleScrollAnimation, 200);
            
            // Adicionar efeitos de hover
            document.querySelectorAll('.stat-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const icon = item.querySelector('.stat-icon');
                    const number = item.querySelector('.stat-number');
                    
                    icon.style.transform = 'scale(1.2) rotate(15deg)';
                    number.style.transform = 'scale(1.05)';
                });
                
                item.addEventListener('mouseleave', () => {
                    const icon = item.querySelector('.stat-icon');
                    const number = item.querySelector('.stat-number');
                    
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    number.style.transform = 'scale(1)';
                });
            });
        });
        
        // Debug: Verificar se os elementos existem
        window.addEventListener('load', () => {
            const statsSection = document.querySelector('.iepuc-stats-section');
            const statItems = document.querySelectorAll('.stat-item');
            
            console.log('Elementos encontrados:');
            console.log('Stats section:', statsSection);
            console.log('Stat items:', statItems.length);
        });
    