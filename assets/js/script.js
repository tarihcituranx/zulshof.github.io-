'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

// Mevcut script.js içeriğiniz varsa, bu kodu onun altına veya uygun bir yere ekleyin.

document.addEventListener('DOMContentLoaded', () => {
  const butterfly = document.getElementById('flyingButterfly');
  if (!butterfly) {
    console.warn('Kelebek elementi bulunamadı. ID doğru mu? (#flyingButterfly)');
    return;
  }

  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let butterflyWidth = butterfly.offsetWidth;
  let butterflyHeight = butterfly.offsetHeight;

  // Kelebeğin boyutları ilk başta 0 olabilir, yüklenmesini bekleyelim biraz
  if (butterflyWidth === 0 || butterflyHeight === 0) {
    butterfly.onload = () => { // GIF yüklendiğinde boyutları al
        butterflyWidth = butterfly.offsetWidth;
        butterflyHeight = butterfly.offsetHeight;
        initializeButterflyPosition();
        fly(); // Boyutlar alındıktan sonra uçuşu başlat
    };
    // Eğer onload tetiklenmezse diye bir fallback (bazı tarayıcılar için)
    setTimeout(() => {
        if (butterflyWidth === 0 || butterflyHeight === 0) {
            butterflyWidth = 80; // CSS'deki genişliğe varsayılan olarak ayarla
            butterflyHeight = butterfly.offsetHeight || 60; // Ortalama bir yükseklik
        }
        initializeButterflyPosition();
        if (!butterfly.onload) fly(); // Eğer onload zaten çalışmadıysa uçuşu başlat
    }, 500);
  } else {
      initializeButterflyPosition();
      fly(); // Boyutlar zaten varsa direkt uçuşu başlat
  }


  let currentX, currentY, targetX, targetY;
  let isLanded = true;
  let landTimer = null;

  function initializeButterflyPosition() {
    currentX = Math.random() * (screenWidth - butterflyWidth);
    currentY = Math.random() * (screenHeight - butterflyHeight);
    butterfly.style.left = currentX + 'px';
    butterfly.style.top = currentY + 'px';
    targetX = currentX;
    targetY = currentY;
  }


  function setNewTarget() {
    targetX = Math.random() * (screenWidth - butterflyWidth);
    targetY = Math.random() * (screenHeight - butterflyHeight);
    isLanded = false;

    // Kelebeğin uçuş yönüne göre görselini çevir (sağa/sola bakması)
    if (targetX < currentX) {
      butterfly.style.transform = 'scaleX(-1)'; // Sola uçuyorsa yansıt
    } else {
      butterfly.style.transform = 'scaleX(1)';  // Sağa uçuyorsa normal
    }
  }

  function fly() {
    if (isLanded) {
      if (!landTimer) {
        const landingTime = Math.random() * 5000 + 3000; // 3-8 saniye konma süresi
        landTimer = setTimeout(() => {
          setNewTarget();
          landTimer = null;
        }, landingTime);
      }
    } else {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // Hızı mesafeye göre ayarlayabiliriz, ya da sabit bir hız kullanabiliriz.
      // Uzaksa daha hızlı, yakınsa daha yavaş gibi. Şimdilik sabit hız:
      const speed = Math.min(Math.max(1, distance / 50), 3); // Hız (min 1, max 3 piksel/frame)

      if (distance < speed * 1.5 || distance < 10) { // Hedefe yeterince yakınsa veya çok yakınsa kon
        currentX = targetX;
        currentY = targetY;
        isLanded = true;
      } else {
        currentX += (dx / distance) * speed;
        currentY += (dy / distance) * speed;
      }
      butterfly.style.left = currentX + 'px';
      butterfly.style.top = currentY + 'px';
    }
    requestAnimationFrame(fly);
  }

  window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    butterflyWidth = butterfly.offsetWidth; // Boyutlar değişmiş olabilir
    butterflyHeight = butterfly.offsetHeight;

    // Kelebeğin ekran dışına çıkmamasını sağla
    currentX = Math.min(Math.max(0, currentX), screenWidth - butterflyWidth);
    currentY = Math.min(Math.max(0, currentY), screenHeight - butterflyHeight);
    targetX = Math.min(Math.max(0, targetX), screenWidth - butterflyWidth); // Hedefi de güncelle
    targetY = Math.min(Math.max(0, targetY), screenHeight - butterflyHeight);

    butterfly.style.left = currentX + 'px';
    butterfly.style.top = currentY + 'px';

    if (isLanded) { // Ekran yeniden boyutlandığında konuyorsa, yeni hedef belirle
        clearTimeout(landTimer);
        landTimer = null;
        setNewTarget();
    }
  });

  // Uçuşu başlatmak için ilk hedefi belirle (boyutlar alındıktan sonra çağrılacak)
  // setTimeout(setNewTarget, 1000); // Sayfa yüklendikten 1 saniye sonra ilk hedef
  // fly(); // Uçuşu başlat
});
