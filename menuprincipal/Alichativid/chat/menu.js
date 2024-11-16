// Función que controla la apertura del panel de usuario
function userPanel() {
    return {
        isUserPanelOpen: false,
    };
}

// Configuración de Partículas
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { 
            type: "circle", 
            stroke: { width: 0, color: "#000000" }, 
            polygon: { nb_sides: 5 } 
        },
        opacity: { 
            value: 0.5, 
            random: false, 
            anim: { 
                enable: false, 
                speed: 1, 
                opacity_min: 0.1, 
                sync: false 
            } 
        },
        size: { 
            value: 3, 
            random: true, 
            anim: { 
                enable: false, 
                speed: 40, 
                size_min: 0.1, 
                sync: false 
            } 
        },
        line_linked: { 
            enable: true, 
            distance: 150, 
            color: "#ffffff", 
            opacity: 0.4, 
            width: 1 
        },
        move: { 
            enable: true, 
            speed: 6, 
            direction: "none", 
            random: false, 
            straight: false, 
            out_mode: "out", 
            bounce: false, 
            attract: { 
                enable: false, 
                rotateX: 600, 
                rotateY: 1200 
            } 
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: { 
            onhover: { enable: false, mode: "repulse" }, 
            onclick: { enable: false, mode: "push" }, 
            resize: false 
        },
        modes: { 
            grab: { 
                distance: 400, 
                line_linked: { opacity: 1 } 
            }, 
            bubble: { 
                distance: 400, 
                size: 40, 
                duration: 2, 
                opacity: 8, 
                speed: 3 
            }, 
            repulse: { distance: 200, duration: 0.4 }, 
            push: { particles_nb: 4 }, 
            remove: { particles_nb: 2 } 
        }
    },
    retina_detect: false
});

feather.replace();
const setup = () => {
const getTheme = () => {
    if (window.localStorage.getItem('dark')) {
    return JSON.parse(window.localStorage.getItem('dark'))
    }
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const setTheme = (value) => {
    window.localStorage.setItem('dark', value)
}

return {
    loading: true,
    isDark: getTheme(),
    toggleTheme() {
        this.isDark = !this.isDark
        setTheme(this.isDark)
    },
    setLightTheme() {
        this.isDark = false
        setTheme(this.isDark)
    },
    setDarkTheme() {
        this.isDark = true
        setTheme(this.isDark)
    },
    watchScreen() {
        if (window.innerWidth <= 768) {
            this.isSidebarOpen = false
            this.isUserPanelOpen = false
        } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            this.isSidebarOpen = true
            this.isUserPanelOpen = false
        } else if (window.innerWidth >= 1280) {
            this.isSidebarOpen = true
            this.isUserPanelOpen = true
        }
    },
    isSidebarOpen: window.innerWidth >= 768 ? true : false,
    toggleSidbarMenu() {
        this.isSidebarOpen = !this.isSidebarOpen
    },
    isUserPanelOpen: window.innerWidth >= 1280 ? true : false,
    openUserPanel() {
        this.isUserPanelOpen = true
        this.$nextTick(() => {
            this.$refs.userPanel.focus()
        })
    },
    isSettingsPanelOpen: false,
    openSettingsPanel() {
        this.isSettingsPanelOpen = true
        this.$nextTick(() => {
            this.$refs.settingsPanel.focus()
        })
    },
    isNotificationsPanelOpen: false,
    openNotificationsPanel() {
        this.isNotificationsPanelOpen = true
        this.$nextTick(() => {
            this.$refs.notificationsPanel.focus()
        })
    },
    isSearchPanelOpen: false,
    openSearchPanel() {
        this.isSearchPanelOpen = true
        this.$nextTick(() => {
            this.$refs.searchInput.focus()
        })
    },
}
}