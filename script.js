document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Супер-плавное вступление
    const tl = gsap.timeline();
    tl.from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out' });
    tl.from('.reveal-subtext', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8');

    // 2. Появление всех блоков при скролле (тот самый "парящий" эффект)
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

    // 3. Анимация счетчиков статистики
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
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText);
            }
        });
    });

    // 4. ТА САМАЯ 3D-СФЕРА ИЗ ТОЧЕК (Three.js)
    const initThreeJS = () => {
        const sphereContainer = document.querySelector('.interactive-sphere');
        if (!sphereContainer) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, sphereContainer.clientWidth / sphereContainer.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(sphereContainer.clientWidth, sphereContainer.clientHeight);
        sphereContainer.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(2, 4); 
        const material = new THREE.PointsMaterial({
            color: '#E30613', // Красный Guards Red
            size: 0.03,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending, // Неоновое свечение
        });
        const sphere = new THREE.Points(geometry, material);
        scene.add(sphere);

        // Анимация вращения
        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.003;
            sphere.rotation.y += 0.003;
            renderer.render(scene, camera);
        }
        animate();

        // Параллакс эффект за мышкой
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            gsap.to(sphere.rotation, {
                x: y * 0.5,
                y: x * 0.5,
                duration: 0.5,
                ease: 'power2.out',
            });
        });
    };
    initThreeJS();
});
