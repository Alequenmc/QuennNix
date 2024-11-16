document.addEventListener("DOMContentLoaded", () => {
    const mobileMenu = document.getElementById("mobileMenu");
    const openMenuButton = document.getElementById("openMobileMenu");
    const closeMenuButton = document.getElementById("closeMobileMenu");
    function openMobileMenu() {
        mobileMenu.style.display = "block";
        mobileMenu.classList.remove("-translate-x-full");
        mobileMenu.classList.add("translate-x-0", "shadow-xl");
        document.body.style.overflow = "hidden";
    }
    function closeMobileMenu() {
        mobileMenu.classList.add("-translate-x-full");
        mobileMenu.classList.remove("translate-x-0", "shadow-xl");
        document.body.style.overflow = "";
    }

    openMenuButton.addEventListener("click", openMobileMenu);
    closeMenuButton.addEventListener("click", closeMobileMenu);

    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !openMenuButton.contains(e.target)) {
            closeMobileMenu();
        }
    });

    mobileMenu.addEventListener("transitionend", (e) => {
        if (e.propertyName === "transform" && !mobileMenu.classList.contains("translate-x-0")) {
            mobileMenu.style.display = "none";
        }
    });
});
