const CONFIG = {
    apiKey: '274d83bd',
    apiUrl: 'https://www.omdbapi.com/',
    searchInput: document.getElementById('searchInput'),
    movieResults: document.getElementById('movieResults'),
    chatInput: document.getElementById('chatInput'),
    chatMessages: document.getElementById('chatMessages'),
    chatForm: document.getElementById('chatForm')
};

class ChatSystem {
    constructor(container, form, input) {
        this.container = container;
        this.form = form;
        this.input = input;
        this.setupEvents();
    }

    setupEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (message) {
            this.addMessage('Usuario', message);
            this.input.value = '';
            setTimeout(() => {
                this.addMessage('Sistema', '¡Mensaje recibido! ¿En qué puedo ayudarte?', true);
            }, 1000);
        }
    }

    addMessage(user, text, isSystem = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-3 animate-fade-in';
        
        messageDiv.innerHTML = `
            <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full ${isSystem ? 'bg-blue-600' : 'bg-purple-600'} 
                          flex items-center justify-center">
                    <i class="fas ${isSystem ? 'fa-robot' : 'fa-user'}"></i>
                </div>
            </div>
            <div class="bg-gray-800/50 rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">${text}</p>
                <span class="text-xs text-gray-400">${new Date().toLocaleTimeString()}</span>
            </div>
        `;

        this.container.appendChild(messageDiv);
        this.container.scrollTop = this.container.scrollHeight;
    }
}
class MovieSearch {
    constructor(apiKey, apiUrl) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.setupSearch();
    }

    setupSearch() {
        let searchTimeout;
        CONFIG.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    this.searchMovies(query);
                }, 500);
            }
        });
    }

    async searchMovies(query) {
        try {
            const response = await fetch(
                `${this.apiUrl}?s=${encodeURIComponent(query)}&apikey=${this.apiKey}`
            );
            const data = await response.json();

            if (data.Response === "True") {
                this.displayMovies(data.Search);
            } else {
                this.displayError(`No se encontraron resultados para "${query}"`);
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            this.displayError("Error al buscar películas");
        }
    }

    displayMovies(movies) {
        CONFIG.movieResults.innerHTML = movies.map(movie => `
            <div class="glass-effect rounded-xl overflow-hidden group hover:scale-105 
                      transition-transform duration-300">
                <div class="relative aspect-[2/3]">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'}" 
                         alt="${movie.Title}"
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent">
                        <div class="absolute bottom-0 p-4 w-full">
                            <h3 class="text-lg font-bold mb-2">${movie.Title}</h3>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-2 py-1 rounded-full bg-blue-600/50 text-sm">
                                    ${movie.Year}
                                </span>
                                <span class="px-2 py-1 rounded-full bg-purple-600/50 text-sm">
                                    ${movie.Type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayError(message) {
        CONFIG.movieResults.innerHTML = `
            <div class="col-span-full glass-effect rounded-xl p-8 text-center">
                <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                <p class="text-xl text-red-400">${message}</p>
            </div>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const chatSystem = new ChatSystem(
        CONFIG.chatMessages,
        CONFIG.chatForm,
        CONFIG.chatInput
    );
    const movieSearch = new MovieSearch(CONFIG.apiKey, CONFIG.apiUrl);
    chatSystem.addMessage('Sistema', '¡Bienvenido a AleChatVid! ¿Qué te gustaría ver hoy?', true);
});


function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}


function toggleQuickSearch() {
    const quickSearch = document.getElementById('quickSearch');
    quickSearch.classList.toggle('hidden');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Hide header on scroll down, show on scroll up
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('-translate-y-full');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('-translate-y-full')) {
        // Scroll Down
        header.classList.add('-translate-y-full');
    } else if (currentScroll < lastScroll && header.classList.contains('-translate-y-full')) {
        // Scroll Up
        header.classList.remove('-translate-y-full');
    }
    lastScroll = currentScroll;
});
