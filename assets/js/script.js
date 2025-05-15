'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) { elem.classList.toggle("active"); };

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

document.addEventListener('DOMContentLoaded', () => {
  // Butterfly animation
  const butterfly = document.getElementById('flyingButterfly');
  if (!butterfly) {
    console.error('Kelebek elementi (#flyingButterfly) HTML\'de bulunamadı!');
    return;
  }

  let screenWidth, screenHeight, butterflyWidth, butterflyHeight;
  let currentX, currentY, targetX, targetY;
  let isLanded = true;
  let landTimer = null;

  function updateScreenDimensions() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
  }

  function initializeButterflyState() {
    butterflyWidth = butterfly.offsetWidth;
    butterflyHeight = butterfly.offsetHeight;

    if (!butterflyWidth || butterflyWidth === 0) {
      butterflyWidth = 80;
      console.warn("Kelebek genişliği alınamadı, varsayılan 80px kullanılıyor.");
    }
    if (!butterflyHeight || butterflyHeight === 0) {
      butterflyHeight = butterflyWidth * 0.75;
      console.warn("Kelebek yüksekliği alınamadı, varsayılan bir oran kullanılıyor.");
    }

    updateScreenDimensions();

    currentX = Math.random() * (screenWidth - butterflyWidth);
    currentY = Math.random() * (screenHeight - butterflyHeight);
    butterfly.style.left = currentX + 'px';
    butterfly.style.top = currentY + 'px';
    butterfly.style.transform = 'scaleX(1)';

    targetX = currentX;
    targetY = currentY;
  }

  function setNewTarget() {
    if (!screenWidth || !butterflyWidth) {
      setTimeout(setNewTarget, 100);
      return;
    }
    targetX = Math.random() * (screenWidth - butterflyWidth);
    targetY = Math.random() * (screenHeight - butterflyHeight);
    isLanded = false;

    if (targetX < currentX) {
      butterfly.style.transform = 'scaleX(-1)';
    } else {
      butterfly.style.transform = 'scaleX(1)';
    }
  }

  function fly() {
    if (isLanded) {
      if (!landTimer) {
        const landingTime = Math.random() * 5000 + 3000;
        landTimer = setTimeout(() => {
          setNewTarget();
          landTimer = null;
        }, landingTime);
      }
    } else {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.min(Math.max(1, distance / 70), 2.5);

      if (distance < speed * 1.5 || distance < 5) {
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

  function startButterflyEffect() {
    initializeButterflyState();
    setNewTarget();
    fly();
  }

  if (butterfly.complete && butterfly.naturalWidth > 0) {
    startButterflyEffect();
  } else {
    butterfly.onload = () => {
      startButterflyEffect();
    };
    setTimeout(() => {
      if (!(butterfly.complete && butterfly.naturalWidth > 0)) {
        startButterflyEffect();
      }
    }, 1500);
  }

  window.addEventListener('resize', () => {
    updateScreenDimensions();

    currentX = Math.min(Math.max(0, currentX), screenWidth - butterflyWidth);
    currentY = Math.min(Math.max(0, currentY), screenHeight - butterflyHeight);
    targetX = Math.min(Math.max(0, targetX), screenWidth - butterflyWidth);
    targetY = Math.min(Math.max(0, targetY), screenHeight - butterflyHeight);

    butterfly.style.left = currentX + 'px';
    butterfly.style.top = currentY + 'px';

    if (isLanded) {
      clearTimeout(landTimer);
      landTimer = null;
      setNewTarget();
    }
  });

  // Welcome effect
  const welcomeElement = document.getElementById("welcome-effect");
  if (welcomeElement) {
    const translations = ["Welcome", "Hoş Geldiniz", "Selamat Datang"];
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % translations.length;
      welcomeElement.textContent = translations[currentIndex];
    }, 3000);
  }
});
