const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('animated-bg').appendChild(renderer.domElement);

// Partículas
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: '#0066ff'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 5;

// Animación del fondo
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Captcha
let captchaCode = '';
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';

function generateCaptcha() {
    const ctx = document.getElementById('captcha-canvas').getContext('2d');
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
    captchaCode = Array(6).fill()
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    for(let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 102, 255, ${Math.random() * 0.2})`;
        ctx.lineWidth = Math.random() * 2;
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }
    ctx.font = 'bold 24px "Arial"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    [...captchaCode].forEach((char, i) => {
        const x = (width * 0.2) + (i * width * 0.1);
        const y = height / 2;
        const rotation = (Math.random() - 0.5) * 0.4;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Sombra
        ctx.shadowColor = 'rgba(0, 102, 255, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        
        ctx.fillText(char, 0, 0);
        ctx.restore();
    });
    
    // Ruido
    for(let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
        ctx.fillRect(
            Math.random() * width,
            Math.random() * height,
            1,
            1
        );
    }
}

const verifyButton = document.getElementById('verify-captcha');
const captchaInput = document.getElementById('captcha-input');
const captchaMessage = document.getElementById('captcha-message');
const loginButton = document.getElementById('login-button');

verifyButton.addEventListener('click', () => {
    if (captchaInput.value.toLowerCase() === captchaCode.toLowerCase()) {
        captchaMessage.classList.add('hidden');
        loginButton.classList.remove('hidden');
        loginButton.classList.add('animate-pulse-slow');
        captchaInput.disabled = true;
        captchaInput.classList.add('opacity-50');
    } else {
        captchaMessage.classList.remove('hidden');
        generateCaptcha();
        captchaInput.value = '';
        captchaInput.focus();
    }
});

const menuButton = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

window.onload = generateCaptcha;