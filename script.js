document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Анимация заголовка при загрузке
    gsap.from('.hero h1', {
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    });

    // Появление секций при скролле
    gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'expo.out'
        });
    });

    // Анимация чисел
    gsap.utils.toArray('.val').forEach((num) => {
        let value = parseFloat(num.innerText);
        gsap.from(num, {
            scrollTrigger: {
                trigger: num,
                start: 'top 90%'
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 0.1 },
            ease: 'power2.out'
        });
    });
});
