document.addEventListener('DOMContentLoaded', () => {
    // Регистрируем плагин для работы анимаций при скролле
    gsap.registerPlugin(ScrollTrigger);

    // 1. Вступление (Hero секция)
    gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out' });
    gsap.from('.reveal-subtext', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 });

    // 2. Появление всех блоков при скролле
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // 3. Анимация бегущих чисел в статистике
    gsap.utils.toArray('.number').forEach((num) => {
        let endVal = parseInt(num.innerText);
        gsap.from(num, {
            scrollTrigger: {
                trigger: num,
                start: 'top 90%'
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out',
            onUpdate: function() {
                // Добавляем обновление текста, чтобы числа менялись красиво
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText);
            }
        });
    });

    // 4. Логика переключения темы (Луна / Солнце)
    const themeBtn = document.querySelector('.theme-toggle');
    const body = document.body;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'light') {
                body.setAttribute('data-theme', 'dark');
                themeBtn.innerHTML = '☀️'; // Показываем солнце, чтобы включить свет
            } else {
                body.setAttribute('data-theme', 'light');
                themeBtn.innerHTML = '🌙'; // Показываем луну, чтобы включить тьму
            }
        });
    }

    // 5. Плавный параллакс фона (движение за мышкой)
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to('body', {
            duration: 2,
            backgroundPosition: `${x * 20}px ${y * 20}px`,
            ease: 'power2.out'
        });
    });
});
