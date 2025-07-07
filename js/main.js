document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav__link');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const footerText = document.getElementById('footer-text');

    // função pra evitar que eventos disparem várias vezes seguidas (performance)
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // animação de entrada quando os elementos aparecem na tela
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        fadeInElements.forEach(element => {
            if (!element.closest('.stagger-container')) {
                if (element.getBoundingClientRect().top < triggerBottom) {
                    element.classList.add('visible');
                }
            }
        });
        document.querySelectorAll('.stagger-container').forEach(container => {
            if (container.getBoundingClientRect().top < triggerBottom) {
                const elements = container.querySelectorAll('.fade-in');
                elements.forEach((element, index) => {
                    element.style.transitionDelay = `${index * 150}ms`;
                    element.classList.add('visible');
                });
            }
        });
    };

    // muda o tema do menu e destaca o item certo conforme rola a página
    const handleScroll = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 85) {
                currentSectionId = section.getAttribute('id');
            }
        });
        nav.className = 'nav';
        switch (currentSectionId) {
            case 'home':
                nav.classList.add('nav--theme-orange');
                break;
            case 'about':
                nav.classList.add('nav--theme-light');
                break;
            case 'education':
                nav.classList.add('nav--theme-green');
                break;
            case 'work':
                nav.classList.add('nav--theme-dark');
                break;
            case 'contact':
                nav.classList.add('nav--theme-pink');
                break;
            default:
                nav.classList.add('nav--theme-dark');
                break;
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    // escuta o scroll com uma pausa (throttle) pra não pesar
    const throttledScrollHandler = throttle(() => {
        animateOnScroll();
        handleScroll();
    }, 150);

    window.addEventListener('scroll', throttledScrollHandler);

    animateOnScroll();
    handleScroll();

    // dados dos projetos pro modal
const projectData = {
    '1': {
        title: '<h3> e-commerce de moda – Portugal </h3>',
        imgSrc: 'images/CELA.png',
        description: 'Projeto completo de e-commerce desenvolvido para uma marca de roupas com produção artesanal em Portugal.',
        modalContent: `
            <img src="images/cela2.png" alt="Imagem do projeto Loja de Roupas" style="max-width:100%; border-radius:8px; margin-bottom:1rem;">
            <p>Projeto completo de e-commerce desenvolvido para uma marca de roupas com produção artesanal em Portugal. Atuei em todas as etapas, desde a concepção da identidade visual até a estruturação da loja na plataforma Shopify.</p>
            <p>A proposta foi criar uma experiência de navegação fluida, com foco em destacar a confecção local, os valores de sustentabilidade e o design autoral das peças. O layout responsivo foi pensado para funcionar perfeitamente em qualquer dispositivo, com visual limpo, organizado e alinhado com a proposta da marca.</p>
            <p>A loja foi totalmente configurada para vendas, com integração de métodos de pagamento, frete, SEO e redes sociais.</p>
            <h4>tech stack</h4>
            <ul>
              <li><strong>plataforma:</strong> Shopify</li>
              <li><strong>linguagens:</strong> HTML, CSS, Liquid</li>
              <li><strong>design responsivo:</strong> Flexbox e Grid</li>
              <li><strong>design visual:</strong> Figma / Canva</li>
              <li><strong>integrações:</strong> Shopify Payments, Instagram Shopping, Google Analytics</li>
              <li><strong>otimização:</strong> SEO on-page, performance</li>
              <li><strong>marketing:</strong> Newsletter, integração com redes sociais</li>
            </ul>
        `,
        tags: ['SHOPIFY', 'HTML', 'CSS', 'LIQUID']
    },
    '2': {
        imgSrc: 'images/D4R.png',
        title: '<h3> Consultoria de Transformação Digital </h3>',
        description: 'Consultoria especializada em Transformação Digital em Lagos, Portugal.',
        modalContent: `
            <img src="images/D4R-LOGO.png" alt="Consultoria de Transformação Digital" style="max-width:50%; border-radius:8px; margin-bottom:1rem;">
            <p>Consultoria especializada em Transformação Digital sediada em Lagos, Portugal, dedicada a ajudar empresas a modernizar seus processos e estratégias por meio da adoção de tecnologias digitais inovadoras.</p>
            <p>Oferecemos diagnóstico detalhado das necessidades digitais do cliente, planejamento estratégico personalizado e suporte na implementação de soluções tecnológicas que promovem eficiência operacional, experiência do cliente aprimorada e vantagem competitiva sustentável.</p>
            <p>Nosso foco é guiar as organizações em jornadas digitais que envolvem desde a digitalização de processos internos até a integração de canais de vendas online e ferramentas de análise de dados.</p>
        `,
        tags: ['ADS', 'CONSULTORIA', 'SEO', 'SHOPIFY']
    },
    '3': {
        title: 'Goodreads to Obsidian',
        imgSrc: 'images/goodreadstoobsidian.png',
        description: 'Programa em python para organizar todos os livros do Goodreads em pastas no Obsidian.',
        modalContent: `
            <h3>Goodreads to Obsidian</h3>
            <p>Ferramenta desenvolvida em Python para extrair e organizar automaticamente os dados da sua conta Goodreads, estruturando-os em pastas e arquivos compatíveis com o Obsidian, um popular aplicativo de notas baseado em Markdown.</p>
            <p>O programa permite a catalogação detalhada de livros lidos, em leitura ou desejados, incluindo metadados como autor, avaliações, tags e notas pessoais, facilitando a gestão e análise do seu acervo literário.</p>
            <p>Ideal para leitores ávidos e pesquisadores que desejam integrar suas bibliotecas digitais a um ambiente de notas interligadas, promovendo organização, acessibilidade e facilidade na recuperação de informações.</p>
            <h4>tech stack</h4>
            <ul>
              <li><strong>linguagem:</strong> Python</li>
            </ul>
        `,
        tags: ['PYTHON']
    }
};

    // pega os elementos do modal
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalContentDiv = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.section--work .card');

    // abre o modal com o conteúdo do projeto clicado
    const openModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        // espaço entre as tags pra não ficarem grudadas
        const tagsHtml = data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join(' ');
        // aplicar css na
        modalContentDiv.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.imgSrc}" alt="imagem do projeto ${data.title}" style="max-width:75%; border-radius:8px; margin-bottom:1rem; align-itens:center">
            <div class="tech-tags">${tagsHtml}</div>
            ${data.modalContent ? data.modalContent : `<p>${data.description}</p>`}
        `;
        modalOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // trava a rolagem da página
    };

    // fecha o modal e libera a rolagem
    const closeModal = () => {
        modalOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    // adiciona evento pra abrir modal quando clica no card
    projectCards.forEach(card =>
        card.addEventListener('click', () => openModal(card.dataset.projectId))
    );

    // fecha o modal ao clicar no botão "X"
    closeModalBtn.addEventListener('click', closeModal);

    // fecha o modal se clicar fora do conteúdo
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });

    // fecha o modal com a tecla esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('visible')) {
            closeModal();
        }
    });

    // adiciona o ano atual no rodapé automaticamente
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} huds barreira. todos os direitos reservados.`;
});

// função do formulário
function handleSubmit(event) {
    event.preventDefault(); // evita recarregar a página
    const form = event.target;
    const name = form.querySelector('#name').value;
    const messageDiv = document.getElementById('form-message');

    // mostra a mensagem personalizada com nome da pessoa
    messageDiv.textContent = `mensagem enviada! obrigado, ${name}! em breve entrarei em contato.`;
    messageDiv.style.display = 'block';

    // limpa o formulário
    form.reset();

    // esconde a mensagem depois de 6 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 6000);
}
