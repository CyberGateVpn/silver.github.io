// Эффект печатания текста
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Кто-то пишет прямо сейчас...',
    'Discord снова работает!',
    'Обходим блокировку вместе!',
    'Топ 1 в России!',
    'Скачай и пользуйся!'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Запускаем эффект печатания
typeEffect();

// Плавная прокрутка при клике на индикатор скролла
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    const downloadSection = document.querySelector('.download-section');
    downloadSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами в синей секции
document.querySelectorAll('.discord-image-container, .blocked-info, .download-button, .extra-links').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Обработчик ошибки загрузки изображения
const discordImage = document.querySelector('.discord-image');
discordImage.addEventListener('error', function() {
    this.style.display = 'none';
    document.querySelector('.image-fallback').style.display = 'block';
});

// Эффект частиц на фоне (простая версия)
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(88, 101, 242, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        heroSection.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// Отслеживание клика по кнопке скачивания
document.querySelector('.download-button').addEventListener('click', function(e) {
    console.log('Скачивание Discord начато...');
    
    // Показываем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #43B581;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-size: 1.1rem;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        font-family: 'Segoe UI', sans-serif;
    `;
    notification.textContent = '✅ Загрузка Discord началась!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Добавляем стили для анимации
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});

// Добавляем эффект при наведении на фото
discordImage.addEventListener('mouseenter', function() {
    this.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(88, 101, 242, 0.8))';
});

discordImage.addEventListener('mouseleave', function() {
    this.style.filter = '';
});

// Консольное сообщение для тестирования
console.log('Discord Обход - сайт загружен и готов к использованию!');
console.log('Версия: Топ 1 в России');
