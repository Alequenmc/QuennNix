gsap.from('.floating-card', {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        const speed = 1 + (index * 0.1);
        const yPos = -(window.pageYOffset * speed * 0.05);
        gsap.to(card, {
            y: yPos,
            duration: 0.5,
            ease: "power1.out"
        });
    });
    const title = document.querySelector('h1');
    const titleOffset = -(window.pageYOffset * 0.3);
    gsap.to(title, {
        y: titleOffset,
        duration: 0.5,
        ease: "power1.out"
    });
});
const createMouseTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(122, 93, 161, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s;
    `;
    document.body.appendChild(trail);
    return trail;
};

const trails = Array.from({ length: 10 }, createMouseTrail);
let currentTrail = 0;

document.addEventListener('mousemove', (e) => {
    const trail = trails[currentTrail];
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.transform = 'scale(1)';
    
    setTimeout(() => {
        trail.style.transform = 'scale(0)';
    }, 100);

    currentTrail = (currentTrail + 1) % trails.length;
});
const cards = document.querySelectorAll('.card-bg');
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });

        const glow = document.createElement('div');
        glow.className = 'card-glow';
        glow.style.cssText = `
            position: absolute;
            inset: -20px;
            background: radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, 
                                     rgba(122, 93, 161, 0.2), 
                                     transparent 50%);
            pointer-events: none;
            opacity: 0;
        `;
        card.style.position = 'relative';
        card.appendChild(glow);

        gsap.to(glow, {
            opacity: 1,
            duration: 0.3
        });
    });

    card.addEventListener('mousemove', (e) => {
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, 
                                   rgba(122, 93, 161, 0.2), 
                                   transparent 50%)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        const glow = card.querySelector('.card-glow');
        if (glow) {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => glow.remove()
            });
        }
    });
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';
document.body.prepend(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x7a5da1,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 3;


const animate = () => {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    renderer.render(scene, camera);
};

animate();
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});