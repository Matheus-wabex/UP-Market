// Estado da aplicação
let activeTemplate = 'home';
let scrolled = false;
let openFAQ = null;

// Dados dos depoimentos
const testimonials = [
    {
        name: "Ana Silva - Doceria Ana",
        text: "Aumentei minhas vendas em 300% nos primeiros 30 dias. A UP Market transformou meu negócio!",
        rating: 5
    },
    {
        name: "Carlos Santos - Moda Express",
        text: "Excelente plataforma! Consegui alcançar clientes que nunca imaginaria. Super recomendo.",
        rating: 5
    },
    {
        name: "Mariana Costa - Salão Beleza Pura",
        text: "O suporte é incrível e os resultados superaram minhas expectativas. Vale cada centavo investido.",
        rating: 5
    }
];

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupScrollListener();
    setupAnimations();
    setupSmoothScroll();
    setupFAQ();
    initializeTemplateNavigation();
}

// Configurar listener de scroll
function setupScrollListener() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const header = document.getElementById('header');
    const shouldScroll = window.scrollY > 50;
    
    if (shouldScroll !== scrolled) {
        scrolled = shouldScroll;
        if (scrolled) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Configurar animações
function setupAnimations() {
    // Animação de fade-in para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature-card, .template-card, .testimonial-card, .step');
    animatedElements.forEach(el => observer.observe(el));
}

// Configurar rolagem suave
function setupSmoothScroll() {
    // Rolagem suave já está configurada no HTML com scroll-behavior: smooth
    // Esta função pode ser expandida para comportamentos mais complexos
}

// Função de rolagem para seção específica
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Se estiver em um template, voltar para home primeiro
        if (activeTemplate !== 'home') {
            showTemplate('home');
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '556391012971';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre a UP Market e divulgar meu negócio.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Configurar FAQ
function setupFAQ() {
    // FAQ interativo já configurado com eventos onclick no HTML
}

// Toggle FAQ item
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const clickedItem = faqItems[index];
    
    // Fecha todos os outros itens
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
    
    // Abre/fecha o item clicado
    clickedItem.classList.toggle('active');
    openFAQ = clickedItem.classList.contains('active') ? index : null;
}

// Mostrar template específico
function showTemplate(templateName) {
    // Esconder todos os templates
    const templates = document.querySelectorAll('.template');
    templates.forEach(template => {
        template.classList.remove('active');
    });
    
    // Mostrar o template selecionado
    const selectedTemplate = document.getElementById(`${templateName}-template`);
    if (selectedTemplate) {
        selectedTemplate.classList.add('active');
        activeTemplate = templateName;
        
        // Atualizar botão voltar
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            if (templateName === 'home') {
                backBtn.style.display = 'none';
            } else {
                backBtn.style.display = 'block';
            }
        }
        
        // Rolar para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Adicionar classe ao body para estilização específica do template
        document.body.className = '';
        if (templateName !== 'home') {
            document.body.classList.add(`${templateName}-template`);
        }
    }
}

// Inicializar navegação de templates
function initializeTemplateNavigation() {
    // Configurar botão voltar
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showTemplate('home');
        });
    }
}

// Função para adicionar efeitos hover em cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .template-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Função para animar contadores (se necessário no futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Função para validar formulários (se necessário no futuro)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Função para mostrar notificações (se necessário no futuro)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para preloading de imagens
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para otimizar performance
function optimizePerformance() {
    // Lazy loading de imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para acessibilidade
function setupAccessibility() {
    // Adicionar suporte a teclado para elementos interativos
    const interactiveElements = document.querySelectorAll('button, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        // Adicionar aria-label se não tiver
        if (!element.getAttribute('aria-label')) {
            const text = element.textContent.trim();
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }
    });
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    addCardHoverEffects();
    optimizePerformance();
    setupAccessibility();
    
    // Preload de imagens críticas
    preloadImages([
        'logo.png',
        'favicon.png'
    ]);
});

// Exportar funções para uso global
window.scrollToSection = scrollToSection;
window.openWhatsApp = openWhatsApp;
window.toggleFAQ = toggleFAQ;
window.showTemplate = showTemplate;