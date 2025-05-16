document.getElementById("lang").addEventListener("change", function () {
    const selectedLanguage = this.value;
    if (selectedLanguage === "ar") {
        window.location.href = "index_ar.html";
    } else if (selectedLanguage === "en") {
        window.location.href = "index.html";
    }
});