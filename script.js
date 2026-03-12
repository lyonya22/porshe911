document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавный скролл (Lenis) - база для дорогих сайтов
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Кастомный курсор
    const cursor = document.querySelector('.cursor');
    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    // 3. Анимация появления текста
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.hero-title h1', {
        y: 200, opacity: 0, duration: 2, ease: 'expo.out'
    });

    // 4. 3D ИЛЛЮСТРАЦИЯ (Three.js - Сфера из данных)
    const init3D = () => {
        const container = document.getElementById('three-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(2, 64, 64);
        const material = new THREE.PointsMaterial({ color: '#E30613', size: 0.01 });
        const sphere = new THREE.Points(geometry, material);
        scene.add(sphere);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.002;
            renderer.render(scene, camera);
        }
        animate();

        // Связываем вращение со скроллом
        gsap.to(sphere.rotation, {
            y: Math.PI * 2,
            scrollTrigger: {
                trigger: '.canvas-wrap',
                scrub: 2
            }
        });
    };
    init3D();

    // 5. Анимация карточек при скролле
    gsap.utils.toArray('.t-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            },
            y: 100, opacity: 0, duration: 1, ease: 'power2.out'
        });
    });
});
