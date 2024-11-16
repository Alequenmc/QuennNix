
const apkData = [
    {
        name: "Spotify Premium",
        description: "Música sin anuncios y descarga ilimitada.",
        version: "8.6.32",
        image: "https://img.icons8.com/?size=100&id=G9XXzb9XaEKX&format=png&color=000000",
        downloadLink: "../404.html"
    },
    // se añadira la logica automaticamente de las aplicaciones 
];

let hasSubscribed = false;
let currentDownloadLink = '';

function createApkCard(apk) {
    return `
        <div class="futuristic-card rounded-lg overflow-hidden">
            <img src="${apk.image}" alt="${apk.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-alimod-primary font-orbitron">${apk.name}</h3>
                <p class="text-gray-400 text-sm mb-4">${apk.description}</p>
                <p class="text-alimod-accent text-sm mb-4"><strong>Versión:</strong> ${apk.version}</p>
                <button class="w-full px-4 py-2 bg-alimod-secondary text-black font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300 text-sm hover-scale download-btn" data-apk-name="${apk.name}" data-download-link="${apk.downloadLink}">
                    <i class="fas fa-download mr-2"></i>Descargar
                </button>
            </div>
        </div>
    `;
}

function populateApkList() {
    const apkList = document.getElementById('apk-list');
    apkData.forEach(apk => {
        apkList.innerHTML += createApkCard(apk);
    });

    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showDownloadBox(this.dataset.apkName, this.dataset.downloadLink);
        });
    });
}

function showDownloadBox(apkName, downloadLink) {
    document.getElementById('download-box').classList.remove('hidden');
    document.getElementById('apk-name').textContent = apkName;
    currentDownloadLink = downloadLink;

    if (hasSubscribed) {
        showCaptchaAndDownload();
    } else {
        document.getElementById('subscribe-youtube').classList.remove('hidden');
        document.getElementById('captcha-container').classList.add('hidden');
        document.getElementById('confirm-download').classList.add('hidden');
    }
}

function closeDownloadBox() {
    document.getElementById('download-box').classList.add('hidden');
    if (hasSubscribed) {
        grecaptcha.reset();
    }
}

function confirmDownload() {
    if (grecaptcha.getResponse()) {
        window.location.href = currentDownloadLink;
        closeDownloadBox();
    } else {
        alert('Por favor, completa el captcha antes de descargar.');
    }
}

function simulateSubscription() {
    const subscribeLink = document.getElementById('subscribe-link');
    subscribeLink.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Suscribiendo...';
    subscribeLink.classList.remove('bg-red-600', 'hover:bg-red-700');
    subscribeLink.classList.add('bg-yellow-600', 'hover:bg-yellow-700');
    
    // Redirect to YouTube
    const youtubeWindow = window.open('https://www.youtube.com/@AlequenMC', '_blank');
    
    setTimeout(() => {
        youtubeWindow.close();
        hasSubscribed = true;
        subscribeLink.innerHTML = '<i class="fas fa-check-circle mr-2"></i>¡Suscrito!';
        subscribeLink.classList.remove('bg-yellow-600', 'hover:bg-yellow-700');
        subscribeLink.classList.add('bg-green-600', 'hover:bg-green-700', 'pulse-animation');
        
        setTimeout(showCaptchaAndDownload, 8000);
    }, 5000);  // Simulate 5 seconds for subscription process
}

function showCaptchaAndDownload() {
    document.getElementById('subscribe-youtube').classList.add('hidden');
    document.getElementById('captcha-container').classList.remove('hidden');
    document.getElementById('confirm-download').classList.remove('hidden');
}

document.getElementById('subscribe-link').addEventListener('click', function(e) {
    e.preventDefault();
    simulateSubscription();
});

document.getElementById('confirm-download').addEventListener('click', confirmDownload);
document.getElementById('close-download-box').addEventListener('click', closeDownloadBox);

document.addEventListener('DOMContentLoaded', populateApkList);

