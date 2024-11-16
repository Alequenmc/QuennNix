particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.json', function () {
    console.log('particles.js loaded');
});

function pageRedirect(e, url) {
    e.preventDefault();
    const transition = document.getElementById('page-transition');
    transition.style.opacity = 1;
    setTimeout(() => {
        window.location.href = url;
    }, 900);
}


const contactSection = document.querySelector('.contact-section');
contactSection.style.opacity = '0';
setTimeout(() => {
contactSection.style.transition = 'opacity 1s ease-in-out';
contactSection.style.opacity = '1';
}, 100);
