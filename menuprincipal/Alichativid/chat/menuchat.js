
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeAnimations();
    initializeChat();
    initializeSearchFeatures();
    initializeNotifications();
    initializeUserSystem();
    initializeThemeSystem();
    initializeVideoPlayer();
});

const initializeParticles = () => {
    const particlesContainer = document.querySelector('.fixed.inset-0.pointer-events-none');
    const numberOfParticles = 15;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-cyan-500/20 rounded-full';
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        const duration = Math.random() * 4 + 3;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        
        particlesContainer.appendChild(particle);
    }
};
const initializeAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.tech-card, .feature-card, section > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
};
const initializeChat = () => {
    const chatContainer = document.querySelector('.mock-chat-interface');
    if (!chatContainer) return;

    const chatMessages = [];
    const messageInput = chatContainer.querySelector('input');
    const addMessage = (message, isUser = true) => {
        const messageElement = document.createElement('div');
        messageElement.className = `flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`;
        
        const messageContent = `
            ${!isUser ? '<div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>' : ''}
            <div class="bg-${isUser ? 'purple' : 'cyan'}-500/10 rounded-lg p-3">
                <p class="text-${isUser ? 'purple' : 'cyan'}-300">${message}</p>
            </div>
            ${isUser ? '<div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>' : ''}
        `;
        
        messageElement.innerHTML = messageContent;
        chatContainer.querySelector('.overflow-y-auto').appendChild(messageElement);
        chatContainer.querySelector('.overflow-y-auto').scrollTop = chatContainer.querySelector('.overflow-y-auto').scrollHeight;
    };
    messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && messageInput.value.trim()) {
            addMessage(messageInput.value);
            setTimeout(() => {
                const responses = [
                    "¡Increíble observación! 🎬",
                    "Totalmente de acuerdo contigo 🚀",
                    "¿Qué opinas de la siguiente escena? 🎥",
                    "La cinematografía es espectacular 🌟"
                ];
                addMessage(responses[Math.floor(Math.random() * responses.length)], false);
            }, 1000);

            messageInput.value = '';
        }
    });
};
    document.body.appendChild(searchModal);

    searchButton.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        searchModal.querySelector('input').focus();
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.add('hidden');
        }
    });

    let searchTimeout;
    searchModal.querySelector('input').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const results = simulateSearch(e.target.value);
            displaySearchResults(results);
        }, 300);
    });


const simulateSearch = (query) => {
    const dummyResults = [
        { title: 'Película 1', type: 'movie', rating: 4.5 },
        { title: 'Serie 2', type: 'series', rating: 4.8 },
        { title: 'Documental 3', type: 'documentary', rating: 4.2 }
    ];
    
    return dummyResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
};
const initializeNotifications = () => {
    const notificationBtn = document.querySelector('.fa-bell')?.parentElement;
    if (!notificationBtn) return;
    const notificationPanel = document.createElement('div');
    notificationPanel.className = 'absolute top-full right-0 mt-4 w-80 bg-black/90 border border-cyan-500/30 rounded-xl p-4 hidden';
    notificationPanel.innerHTML = `
        <div class="space-y-4">
            <h3 class="text-cyan-300 font-semibold">Notificaciones</h3>
            <div class="space-y-2" id="notificationList"></div>
        </div>
    `;

    notificationBtn.parentElement.style.position = 'relative';
    notificationBtn.parentElement.appendChild(notificationPanel);

    // Eventos de notificaciones
    notificationBtn.addEventListener('click', () => {
        notificationPanel.classList.toggle('hidden');
        updateNotifications();
    });

    setInterval(() => {
        if (Math.random() > 0.7) {
            addNotification({
                title: '¡Bienvenido a Alechatvid!',
message: 'Inicia sesión para disfrutar al máximo: accede a la visualización compartida de películas, interactúa con amigos en tiempo real y explora más contenido exclusivo.',

                time: new Date()
            });
        }
    }, 30000);
};


const initializeThemeSystem = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = (isDark) => {
        const root = document.documentElement;
        const colors = isDark ? {
            primary: 'rgb(34, 211, 238)',
            secondary: 'rgb(79, 70, 229)',
            background: 'rgb(0, 0, 0)'
        } : {
            primary: 'rgb(6, 182, 212)',
            secondary: 'rgb(99, 102, 241)',
            background: 'rgb(15, 23, 42)'
        };

        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-background', colors.background);
    };


    updateTheme(prefersDark.matches);

  
    prefersDark.addEventListener('change', (e) => {
        updateTheme(e.matches);
    });
};

const initializeVideoPlayer = () => {
    const createVideoPlayer = (videoId) => {
        const player = document.createElement('div');
        player.className = 'fixed inset-0 bg-black/90 z-50 hidden flex items-center justify-center';
        player.innerHTML = `
            <div class="relative w-full max-w-4xl aspect-video bg-black">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-cyan-400 text-xl">
                        <i class="fas fa-play-circle text-6xl mb-4"></i>
                        <p>Cargando video ${videoId}...</p>
                    </div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <button class="text-white"><i class="fas fa-play"></i></button>
                            <div class="w-64 h-1 bg-white/20 rounded-full">
                                <div class="w-1/3 h-full bg-cyan-500 rounded-full"></div>
                            </div>
                            <span class="text-white">1:23 / 3:45</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <button class="text-white"><i class="fas fa-closed-captioning"></i></button>
                            <button class="text-white"><i class="fas fa-cog"></i></button>
                            <button class="text-white"><i class="fas fa-expand"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return player;
    };
    document.querySelectorAll('[data-video-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = link.dataset.videoId;
            const player = createVideoPlayer(videoId);
            document.body.appendChild(player);
            player.classList.remove('hidden');
            player.addEventListener('click', (e) => {
                if (e.target === player) {
                    player.remove();
                }
            });
        });
    });
};
const addNotification = (notification) => {
    const notificationList = document.getElementById('notificationList');
    if (!notificationList) return;

    const notificationElement = document.createElement('div');
    notificationElement.className = 'bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/30';
    notificationElement.innerHTML = `
        <h4 class="text-cyan-300 font-semibold">${notification.title}</h4>
        <p class="text-gray-400 text-sm">${notification.message}</p>
        <span class="text-gray-500 text-xs">${notification.time.toLocaleTimeString()}</span>
    `;

    notificationList.prepend(notificationElement);
    while (notificationList.children.length > 5) {
        notificationList.removeChild(notificationList.lastChild);
    }
};
const updateNotifications = () => {
    const notificationList = document.getElementById('notificationList');
    if (!notificationList) return;
    notificationList.querySelectorAll('.unread').forEach(notification => {
        notification.classList.remove('unread');
        notification.classList.add('read');
    });
};
const simulateLogin = async () => {
    const loginModal = document.querySelector('.fixed.inset-0.bg-black\\/90');
    const form = loginModal.querySelector('form');
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!email || !password) {
        showToast('Por favor, completa todos los campos', 'error');
        return;
    }
    const button = form.querySelector('button');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
    button.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
       
        showToast('¡Bienvenido de vuelta!', 'success');
        loginModal.classList.add('hidden');
        updateUIForLoggedUser(email);
    } catch (error) {
        showToast('Error al iniciar sesión', 'error');
    } finally {
        button.innerHTML = 'Entrar';
        button.disabled = false;
    }
};

const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 ease-out translate-y-full opacity-0
        ${type === 'error' ? 'bg-red-500/90' : type === 'success' ? 'bg-green-500/90' : 'bg-cyan-500/90'}`;
    
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <p class="text-white">${message}</p>
        </div>
    `;

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-full', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Sistema de gestión de contenido favorito
const initializeFavoriteSystem = () => {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const contentId = btn.dataset.contentId;
            const isFavorite = btn.classList.contains('favorite');

            // Animación de corazón
            btn.classList.add('scale-150');
            await new Promise(resolve => setTimeout(resolve, 150));
            btn.classList.remove('scale-150');

            if (isFavorite) {
                btn.classList.remove('favorite', 'text-red-500');
                btn.classList.add('text-gray-400');
                showToast('Eliminado de favoritos');
            } else {
                btn.classList.add('favorite', 'text-red-500');
                btn.classList.remove('text-gray-400');
                showToast('Añadido a favoritos');
            }
            updateFavoriteCount();
        });
    });
};

const initializeWatchProgress = () => {
    const progressBars = document.querySelectorAll('.watch-progress');
    
    progressBars.forEach(bar => {
        const progress = parseFloat(bar.dataset.progress || 0);
        const progressFill = bar.querySelector('.progress-fill');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
            const duration = parseInt(bar.dataset.duration || 0);
            const watched = (duration * progress) / 100;
            const remaining = duration - watched;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-xs hidden';
            tooltip.textContent = `${Math.round(remaining)}min restantes`;
            
            bar.appendChild(tooltip);
            
            bar.addEventListener('mouseenter', () => tooltip.classList.remove('hidden'));
            bar.addEventListener('mouseleave', () => tooltip.classList.add('hidden'));
        }
    });
};

// Sistema de recomendaciones personalizadas
const initializeRecommendationSystem = () => {
    const recommendationContainer = document.querySelector('.recommendations-container');
    if (!recommendationContainer) return;

    const generateRecommendations = () => {
        const userPreferences = {
            genres: ['action', 'sci-fi', 'drama'],
            ratings: { 'movie1': 5, 'movie2': 4, 'movie3': 3 },
            watchHistory: ['movie4', 'movie5', 'movie6']
        };

        return [
            { id: 'rec1', title: 'Película Recomendada 1', score: 0.95 },
            { id: 'rec2', title: 'Película Recomendada 2', score: 0.88 },
            { id: 'rec3', title: 'Película Recomendada 3', score: 0.82 }
        ];
    };

    const updateRecommendations = () => {
        const recommendations = generateRecommendations();
        recommendationContainer.innerHTML = recommendations
            .map(rec => `
                <div class="recommendation-card" data-score="${rec.score}">
                    <h3>${rec.title}</h3>
                    <div class="match-score">${Math.round(rec.score * 100)}% Match</div>
                </div>
            `)
            .join('');
    };

    updateRecommendations();
    setInterval(updateRecommendations, 300000); 
};
const initializeKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName.toLowerCase() === 'input') return;

        switch(e.key.toLowerCase()) {
            case 'f':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    toggleFullscreen();
                }
                break;
            case ' ':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'arrowleft':
                seekVideo(-10);
                break;
            case 'arrowright':
                seekVideo(10);
                break;
            case 'm':
                toggleMute();
                break;
        }
    });
};

const toggleFullscreen = () => {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const togglePlayPause = () => {
    const video = document.querySelector('video');
    if (!video) return;

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

const seekVideo = (seconds) => {
    const video = document.querySelector('video');
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration));
};

const toggleMute = () => {
    const video = document.querySelector('video');
    if (!video) return;

    video.muted = !video.muted;
};

document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeAnimations();
    initializeChat();
    initializeSearchFeatures();
    initializeNotifications();
    initializeUserSystem();
    initializeThemeSystem();
    initializeVideoPlayer();
    initializeFavoriteSystem();
    initializeWatchProgress();
    initializeRecommendationSystem();
    initializeKeyboardShortcuts();
});





function redirectToLogin() {
    window.location.href = '../login/login.html'; 
}

function handleSearch() {
    alert("Función de búsqueda en desarrollo.");
}
function handleNotifications() {
    alert("Aquí verás tus notificaciones pronto.");
}