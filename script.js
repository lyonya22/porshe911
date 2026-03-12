document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Вступление
    gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out' });
    gsap.from('.reveal-subtext', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 });

    // Появление всех блоков при скролле
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

    // Анимация чисел в статистике
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
            ease: 'power1.out'
        });
    });
});
