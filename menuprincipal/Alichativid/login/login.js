
 const activities = [
    { type: 'login', user: 'neural.dev', time: '2 min ago', status: 'success' },
    { type: 'sync', user: 'QuennVix.user', time: '5 min ago', status: 'success' },
    { type: 'update', user: 'cyber.admin', time: '10 min ago', status: 'warning' }
];

function updateActivityFeed() {
    const feed = document.getElementById('activity-feed');
    feed.innerHTML = activities.map(activity => `
        <div class="flex items-center justify-between p-3 bg-black/40 rounded-lg">
            <div class="flex items-center space-x-3">
                <div class="w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-[#00fff2]' : 'bg-[#b829ff]'}"></div>
                <div>
                    <div class="text-sm">${activity.user}</div>
                    <div class="text-xs text-gray-400">${activity.type} - ${activity.time}</div>
                </div>
            </div>
            <div class="text-xs ${activity.status === 'success' ? 'text-[#00fff2]' : 'text-[#b829ff]'}">${activity.status}</div>
        </div>
    `).join('');
}

// Update metrics periodically
function updateMetrics() {
    document.getElementById('latency-bar').style.width = `${90 + Math.random() * 10}%`;
    document.getElementById('stability-bar').style.width = `${85 + Math.random() * 15}%`;
    document.getElementById('temp-bar').style.width = `${70 + Math.random() * 20}%`;
    
    // Update random metrics
    document.getElementById('active-nodes').textContent = Math.floor(1000 + Math.random() * 500);
    document.getElementById('network-load').textContent = `${Math.floor(30 + Math.random() * 30)}%`;
}

// Initialize
updateActivityFeed();
setInterval(updateMetrics, 3000);

// Tab switching logic
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-[#29b6ff]');
        btn.classList.add('border-transparent');
    });
    
    const selectedTab = document.getElementById(tabName);
    const selectedBtn = document.querySelector(`button[onclick="switchTab('${tabName}')"]`);
    
    selectedTab.classList.remove('hidden');
    selectedTab.classList.add('active');
    selectedBtn.classList.remove('border-transparent');
    selectedBtn.classList.add('border-[#29b6ff]');
}

// Password visibility toggle
function togglePassword(button) {
    const input = button.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
}