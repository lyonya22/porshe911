document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Параллакс эффект для главной картинки
    gsap.to('.hero-bg img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-full',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Появление текста
    gsap.from('.reveal-text', { y: 150, opacity: 0, duration: 1.5, ease: 'power4.out' });

    // Появление блоков
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 90%',
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out'
        });
    });
});
