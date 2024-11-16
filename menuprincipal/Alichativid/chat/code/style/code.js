//  logica muy pero muy simple luego se añadira la verdadera logica 
        const createRoomBtn = document.getElementById('createRoomBtn');
        const joinRoomBtn = document.getElementById('joinRoomBtn');
        const createVIPRoomBtn = document.getElementById('createVIPRoomBtn');
        const joinCodeInput = document.getElementById('joinCodeInput');
        const roomInfo = document.getElementById('roomInfo');
        const roomCodeSpan = document.getElementById('roomCode');
        const copyCodeBtn = document.getElementById('copyCodeBtn');
        const enterRoomBtn = document.getElementById('enterRoomBtn');
        const createJoinOptions = document.getElementById('createJoinOptions');
        const authModal = document.getElementById('authModal');

        function generateRoomCode() {
            return Math.random().toString(36).substring(2, 8).toUpperCase();
        }

        function saveToLocalStorage(key, value) {
            localStorage.setItem(key, value);
        }

        function getFromLocalStorage(key) {
            return localStorage.getItem(key);
        }

        createRoomBtn.addEventListener('click', () => {
            const roomCode = generateRoomCode();
            saveToLocalStorage('roomCode', roomCode);
            roomCodeSpan.textContent = roomCode;
            createJoinOptions.classList.add('hidden');
            roomInfo.classList.remove('hidden');
        });

        createVIPRoomBtn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
        });

        copyCodeBtn.addEventListener('click', () => {
            const roomCode = roomCodeSpan.textContent;
            navigator.clipboard.writeText(roomCode);
            alert('Código copiado al portapapeles');
        });
        joinRoomBtn.addEventListener('click', () => {
            const roomCode = joinCodeInput.value.trim();
            if (roomCode) {
                saveToLocalStorage('roomCode', roomCode);
                window.location.href = `sala-chat-video-server-basic-server0001/sala.html?roomCode=${roomCode}`;
            }
        });
        enterRoomBtn.addEventListener('click', () => {
            const roomCode = getFromLocalStorage('roomCode');
            if (roomCode) {
                window.location.href = `sala-chat-video-server-basic-server0001/sala.html?roomCode=${roomCode}`;
            }
        });
        document.getElementById('authForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === 'Alex' && password === '60504559') {
                authModal.classList.add('hidden');
                const roomCode = generateRoomCode();
                saveToLocalStorage('roomCode', roomCode);
                roomCodeSpan.textContent = roomCode;
                createJoinOptions.classList.add('hidden');
                roomInfo.classList.remove('hidden');
            } else {
                alert('Credenciales incorrectas');
            }
        });

        const bgCanvas = document.getElementById('bgCanvas');
        const ctx = bgCanvas.getContext('2d');
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        const particles = [];

        class Particle {
            constructor(x, y, size, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 198, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < 100; i++) {
                const size = Math.random() * 5 + 1;
                const x = Math.random() * bgCanvas.width;
                const y = Math.random() * bgCanvas.height;
                const speedX = (Math.random() - 0.5) * 2;
                const speedY = (Math.random() - 0.5) * 2;
                particles.push(new Particle(x, y, size, speedX, speedY));
            }
        }

        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            handleParticles();
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();


        