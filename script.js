// Ждем загрузки контента
document.addEventListener('DOMContentLoaded', () => {
    
    // Регистрируем плагин ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Анимация главного экрана (при загрузке)
    const tl = gsap.timeline();

    tl.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    })
    .from('.reveal-subtext', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=1') // Запуск чуть раньше окончания первой анимации
    .from('.reveal-btn', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // 2. Анимация появления при скролле (для всех элементов .reveal)
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%', // Когда верх элемента доходит до 85% экрана
                toggleActions: 'play none none none' // Проигрывать только один раз
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    // 3. Параллакс эффект для фона (если добавишь картинку в hero-visual)
    gsap.to('.hero-visual', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true // Плавная привязка к скроллу
        },
        y: 200
    });
});
