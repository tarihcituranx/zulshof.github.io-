// Cookie Banner & Google Analytics loader
document.addEventListener('DOMContentLoaded', function() {
  const COOKIE_CONSENT_VERSION = "20240526";
  const cookieConsentKey = "cookie-consent-v" + COOKIE_CONSENT_VERSION;
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = cookieBanner?.querySelector(".accept");
  const declineButton = cookieBanner?.querySelector(".decline");
  const privacyLinkSpan = cookieBanner?.querySelector('span.privacy-link');
  const settingsLink = document.getElementById("cookie-settings-link");
  const settingsLinkTextSpan = settingsLink?.querySelector('span');

  function getCurrentLang() {
    const siteLangStorage = localStorage.getItem("site-lang");
    const browserLang = navigator.language ? navigator.language.slice(0, 2).toLowerCase() : 'en';
    return siteLangStorage || (["en", "tr", "id"].includes(browserLang) ? browserLang : "en");
  }
  function getPrivacyPageHrefAndText(lang) {
    if (lang === "tr") return { href: "/kvkk.html", text: "KVKK Aydınlatma Metni" };
    if (lang === "id") return { href: "/kebijakan-privasi.html", text: "Kebijakan Privasi & Cookie" };
    return { href: "/privacy.html", text: "Privacy & Cookie Policy" };
  }
  function updateBannerTexts() {
    const lang = getCurrentLang();
    cookieBanner.querySelectorAll('[data-lang-en]').forEach(el => {
      el.textContent = el.getAttribute(`data-lang-${lang}`) || el.getAttribute("data-lang-en");
    });
    const privData = getPrivacyPageHrefAndText(lang);
    privacyLinkSpan.innerHTML = '';
    const newLink = document.createElement('a');
    newLink.href = privData.href;
    newLink.textContent = privData.text;
    newLink.target = "_blank";
    privacyLinkSpan.appendChild(newLink);
    if (settingsLinkTextSpan) {
      const settingsText = settingsLinkTextSpan.getAttribute(`data-lang-${lang}`) || settingsLinkTextSpan.getAttribute("data-lang-en");
      settingsLinkTextSpan.textContent = settingsText;
    }
  }
  function hasCookieConsent() {
    return !!localStorage.getItem(cookieConsentKey);
  }
  function getCookieConsent() {
    return localStorage.getItem(cookieConsentKey);
  }
  function setCookieConsent(accepted) {
    localStorage.setItem(cookieConsentKey, accepted ? "accepted" : "declined");
  }
  function showBanner() {
    updateBannerTexts();
    cookieBanner.classList.remove("hidden");
    if (settingsLink) settingsLink.style.display = "none";
  }
  function hideBanner() {
    cookieBanner.classList.add("hidden");
  }

  // Temizlik: Eski consent'ı sil
  Object.keys(localStorage)
    .filter(key => key.startsWith("cookie-consent-v") && key !== cookieConsentKey)
    .forEach(key => localStorage.removeItem(key));

  // Banner gösterimi/GA yükleme
  if (!hasCookieConsent()) {
    showBanner();
  } else {
    if (getCookieConsent() === "accepted") loadGoogleAnalytics();
    if (settingsLink) settingsLink.style.display = "block";
    updateBannerTexts();
  }

  // Butonlar
  acceptButton?.addEventListener("click", () => {
    setCookieConsent(true);
    hideBanner();
    loadGoogleAnalytics();
    if (settingsLink) settingsLink.style.display = "block";
  });
  declineButton?.addEventListener("click", () => {
    setCookieConsent(false);
    hideBanner();
    if (settingsLink) settingsLink.style.display = "block";
  });
  settingsLink?.addEventListener("click", function(e){
    e.preventDefault();
    localStorage.removeItem(cookieConsentKey);
    showBanner();
  });

  window.addEventListener("storage", function(e) {
    if (e.key === "site-lang") updateBannerTexts();
    if (e.key === cookieConsentKey && !hasCookieConsent() && cookieBanner.classList.contains("hidden")) {
      showBanner();
    }
  });

  updateBannerTexts();

  // GA4 yükleyici
  function loadGoogleAnalytics() {
    if (getCookieConsent() !== "accepted") return;
    if (window.GA4_LOADED) return;
    window.GA4_LOADED = true;
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    // Takip kodunu kendi GA4 ID’n ile değiştir!
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XE41DZ84HH';
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XE41DZ84HH');
  }
});
