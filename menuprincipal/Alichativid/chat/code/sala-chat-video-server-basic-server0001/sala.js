const OMDB_API_KEY = '274d83bd';
        let currentSlide = 0;
        let movies = { upNext: [], trending: [] };
        let positions = { upNext: 0, trending: 0 };

        const popular_searches = [
            'action', 'adventure', 'comedy', 'drama', 'thriller',
            'sci-fi', 'horror', 'romance', 'animation', 'fantasy'
        ];

        function createMovieCard(movie) {
            const card = document.createElement('div');
            card.className = 'movie-card flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden';
            card.innerHTML = `
                <div class="relative group">
                    <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-72 object-cover rounded-xl">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end rounded-xl">
                        <h3 class="text-sm font-medium">${movie.Title}</h3>
                        <p class="text-xs text-gray-300 mb-2">${movie.Year}</p>
                        <div class="flex space-x-2">
                            <button class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Play">
                                <i class="fas fa-play text-xs"></i>
                            </button>
                            <button class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Add to Watchlist">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                            <button class="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="More Info">
                                <i class="fas fa-info text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return card;
        }

        function createHeroSlide(movie, details) {
            return `
                <div class="hero-slide absolute inset-0 transition-opacity duration-1000">
                    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url(${movie.Poster})"></div>
                    <div class="hero-overlay absolute inset-0 flex items-end">
                        <div class="max-w-7xl mx-auto w-full px-4 md:px-8 pb-48 pt-40">
                            <h1 class="text-4xl md:text-6xl font-bold mb-4">${movie.Title}</h1>
                            <p class="text-lg max-w-2xl mb-8">${details?.Plot || ''}</p>
                            <div class="flex flex-wrap gap-4">
                                <button class="movie-button flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-full hover:bg-white/90">
                                    <i class="fas fa-play"></i>
                                    <span>Watch Now</span>
                                </button>
                                <button class="movie-button flex items-center space-x-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/30">
                                    <i class="fas fa-film"></i>
                                    <span>Trailer</span>
                                </button>
                                <button class="movie-button flex items-center space-x-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/30">
                                    <i class="fas fa-plus"></i>
                                    <span>Add to Watchlist</span>
                                </button>
                                <button class="movie-button flex items-center space-x-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/30">
                                    <i class="fas fa-users"></i>
                                    <span>Cast & Crew</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function slideMovies(section, direction) {
            const container = document.getElementById(`${section}Container`);
            const cardWidth = 240; // Width + margin
            const visibleCards = Math.floor(container.parentElement.offsetWidth / cardWidth);
            const maxPosition = Math.max(0, movies[section].length - visibleCards);

            if (direction === 'right') {
                positions[section] = Math.min(positions[section] + visibleCards, maxPosition);
            } else {
                positions[section] = Math.max(positions[section] - visibleCards, 0);
            }

            container.style.transform = `translateX(-${positions[section] * cardWidth}px)`;
        }

        async function rotateHeroSlides() {
            const heroSlider = document.getElementById('heroSlider');
            const slides = heroSlider.children;
            
            if (slides.length > 1) {
                slides[currentSlide].style.opacity = '0';
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].style.opacity = '1';
            }
        }

        async function fetchMovieDetails(imdbID) {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
                return await response.json();
            } catch (error) {
                console.error('Error fetching movie details:', error);
                return null;
            }
        }

    
    // [Previous script content remains the same until fetchMovies function]

    async function fetchMovies(searchTerm) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}`);
            const data = await response.json();
            
            if (data.Search) {
                // Update hero section
                const heroMovie = data.Search[0];
                const heroDetails = await fetchMovieDetails(heroMovie.imdbID);
                const heroSlider = document.getElementById('heroSlider');
                
                heroSlider.innerHTML += createHeroSlide(heroMovie, heroDetails);
                if (heroSlider.children.length === 1) {
                    heroSlider.firstChild.style.opacity = '1';
                }

                // Update movie sections
                movies.upNext = [...movies.upNext, ...data.Search.slice(1, 7)];
                movies.trending = [...movies.trending, ...data.Search.slice(7)];

                // Update Up Next section
                const upNextContainer = document.getElementById('upNextContainer');
                upNextContainer.innerHTML = '';
                movies.upNext.forEach(movie => {
                    upNextContainer.appendChild(createMovieCard(movie));
                });

                // Update Trending section
                const trendingContainer = document.getElementById('trendingContainer');
                trendingContainer.innerHTML = '';
                movies.trending.forEach(movie => {
                    trendingContainer.appendChild(createMovieCard(movie));
                });

                // Reset positions
                positions.upNext = 0;
                positions.trending = 0;
                
                // Reset transforms
                upNextContainer.style.transform = 'translateX(0)';
                trendingContainer.style.transform = 'translateX(0)';
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    async function handleSearch(searchTerm) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${OMDB_API_KEY}`);
            const data = await response.json();
            
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';
            
            if (data.Search) {
                data.Search.forEach(movie => {
                    const result = document.createElement('div');
                    result.className = 'flex items-center space-x-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors duration-300';
                    result.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}" class="w-16 h-20 object-cover rounded-lg">
                        <div class="flex-1">
                            <h4 class="font-medium line-clamp-1">${movie.Title}</h4>
                            <p class="text-sm text-gray-400">${movie.Year}</p>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="text-xs px-2 py-1 bg-white/10 rounded-full">${movie.Type}</span>
                                <i class="fas fa-star text-yellow-500 text-xs"></i>
                            </div>
                        </div>
                    `;
                    result.addEventListener('click', () => fetchMovies(movie.Title));
                    searchResults.appendChild(result);
                });
            }
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }

    // Search input handling
    const setupSearchInput = () => {
        const searchInput = document.getElementById('searchInput');
        const searchButton = searchInput.nextElementSibling;
        
        searchButton.addEventListener('click', () => {
            searchInput.classList.toggle('hidden');
            searchInput.classList.toggle('block');
            if (!searchInput.classList.contains('hidden')) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener('input', debounce((e) => {
            if (e.target.value.length > 2) {
                handleSearch(e.target.value);
            }
        }, 500));
    };

    // Initialize carousel rotation
    const startCarousel = () => {
        setInterval(rotateHeroSlides, 5000);
    };

    // Load initial movies from different genres
    const loadInitialMovies = async () => {
        const genres = ['action', 'comedy', 'drama', 'thriller'];
        for (const genre of genres) {
            await fetchMovies(genre);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between requests
        }
    };

    // Scroll handling for movie sections
    const setupScrollHandlers = () => {
        const sections = ['upNext', 'trending'];
        sections.forEach(section => {
            const container = document.getElementById(`${section}Container`);
            let isDown = false;
            let startX;
            let scrollLeft;

            container.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });

            container.addEventListener('mouseleave', () => {
                isDown = false;
            });

            container.addEventListener('mouseup', () => {
                isDown = false;
            });

            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            });
        });
    };

    // Initialize animations
    const setupAnimations = () => {
        gsap.from('.nav-btn', {
            duration: 0.5,
            opacity: 0,
            y: -20,
            stagger: 0.1,
            ease: 'power2.out'
        });

        gsap.from('.movie-card', {
            duration: 0.6,
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: 'power2.out'
        });
    };

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        setupSearchInput();
        loadInitialMovies();
        setupScrollHandlers();
        setupAnimations();
        startCarousel();

        // Add responsive menu toggle for mobile
        const menuButton = document.createElement('button');
        menuButton.className = 'md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('nav .flex').prepend(menuButton);

        menuButton.addEventListener('click', () => {
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center';
            mobileMenu.innerHTML = `
                <div class="flex flex-col items-center space-y-6">
                    <button class="absolute top-4 right-4 text-2xl" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="nav-btn text-xl font-medium">Movies</button>
                    <button class="nav-btn text-xl font-medium">TV Shows</button>
                    <button class="nav-btn text-xl font-medium">Sports</button>
                    <button class="nav-btn text-xl font-medium">Kids</button>
                    <button class="nav-btn text-xl font-medium">Library</button>
                </div>
            `;
            document.body.appendChild(mobileMenu);
        });
    });

    // Helper function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }