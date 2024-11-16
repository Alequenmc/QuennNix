function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(particle);
    }
}

function startHyperspaceTransition(event, targetUrl) {
    event.preventDefault();
    const mainContainer = document.querySelector('.main-container');
    
    gsap.to(mainContainer, {
        scale: 1.2,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
    });

    gsap.to('.cyber-grid', {
        opacity: 0,
        duration: 0.5
    });

    setTimeout(() => {
        window.location.href = targetUrl;
    }, 1000);
}
function handleMouseMove(e) {
    const grid = document.querySelector('.cyber-grid');
    const xAxis = (window.innerWidth / 2 - (e.clientX || e.touches[0].clientX)) / 100;
    const yAxis = (window.innerHeight / 2 - (e.clientY || e.touches[0].clientY)) / 100;
    
    gsap.to(grid, {
        rotationX: 60 + yAxis,
        rotationY: xAxis,
        duration: 0.5,
        ease: "power1.out"
    });
}
document.addEventListener('DOMContentLoaded', createParticles);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('touchmove', handleMouseMove);
function adjustForScreenSize() {
    const container = document.querySelector('.main-container');
    if (window.innerWidth <= 640) {
        container.classList.add('mx-4');
    } else {
        container.classList.remove('mx-4');
    }
}

window.addEventListener('resize', adjustForScreenSize);
adjustForScreenSize();