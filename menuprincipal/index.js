

// Cards 
class Spotlight {
  constructor(containerElement) {
      this.container = containerElement;
      this.cards = Array.from(this.container.children);
      this.mouse = { x: 0, y: 0 };
      this.containerSize = { w: 0, h: 0 };
      this.activeCardIndex = 0;
      this.intervalId = null; 
      this.initContainer = this.initContainer.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.updateCardStyles = this.updateCardStyles.bind(this);
      this.startAutoChange = this.startAutoChange.bind(this);
      this.init();
  }

  initContainer() {
      this.containerSize.w = this.container.offsetWidth;
      this.containerSize.h = this.container.offsetHeight;
  }

  onMouseMove(event) {
      const rect = this.container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (this.isMouseInside(x, y)) {
          this.mouse.x = x;
          this.mouse.y = y;
          this.updateCardStyles();
      }
  }

  isMouseInside(x, y) {
      return x >= 0 && x <= this.containerSize.w && y >= 0 && y <= this.containerSize.h;
  }

  updateCardStyles() {
      this.cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const cardX = -(cardRect.left - this.container.getBoundingClientRect().left) + this.mouse.x;
          const cardY = -(cardRect.top - this.container.getBoundingClientRect().top) + this.mouse.y;

          card.style.setProperty('--mouse-x', `${cardX}px`);
          card.style.setProperty('--mouse-y', `${cardY}px`);

          if (index === this.activeCardIndex) {
              card.classList.add('active'); 
              gsap.to(card, {
                  scale: 1.05, 
                  rotation: 5, 
                  duration: 0.5, 
                  ease: "power2.out"
              });
          } else {
              card.classList.remove('active');
              gsap.to(card, {
                  scale: 1,
                  rotation: 0, 
                  duration: 0.5, 
                  ease: "power2.out"
              });
          }
      });
  }

  changeActiveCard() {
      this.activeCardIndex = (this.activeCardIndex + 1) % this.cards.length;
      this.updateCardStyles();
  }

  startAutoChange() {
      this.intervalId = setInterval(this.changeActiveCard.bind(this), 5000);
  }

  init() {
      this.initContainer();
      window.addEventListener('resize', this.initContainer);
      window.addEventListener('mousemove', this.onMouseMove);
      this.startAutoChange(); 
  }

  stopAutoChange() {
      clearInterval(this.intervalId);
  }
}





// animation for card interactive, zoom, efx parallax
document.querySelectorAll('[data-spotlight]').forEach((spotlightContainer) => {
  spotlightContainer.addEventListener('mousemove', (e) => {
    const cards = spotlightContainer.querySelectorAll('.relative');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Aplicar las coordenadas del mouse en las variables CSS personalizadas
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Efecto de animación cuando el mouse sale de la card
  spotlightContainer.addEventListener('mouseleave', (e) => {
    const cards = spotlightContainer.querySelectorAll('.relative');
    cards.forEach(card => {
      card.style.setProperty('--mouse-x', `50%`);
      card.style.setProperty('--mouse-y', `50%`);
    });
  });
});












 // Evento que se ejecuta cuando toda la página ha cargado
 window.addEventListener('load', () => {
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.display = 'none';
    const content = document.getElementById('content');
    content.style.opacity = '1';
});









