// script.js

// Initialize AOS animations
AOS.init();

// Initialize Swiper for each project category
const swiperClasses = [
  '.gates-swiper',
  '.fences-swiper',
  '.furniture-swiper',
  '.railings-swiper',
  '.roofs-swiper',
  '.stairs-swiper',
  '.grills-swiper'
];

swiperClasses.forEach(className => {
  new Swiper(className, {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: `${className} + .swiper-button-next`,
      prevEl: `${className} + .swiper-button-prev`,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    }
  });
});

// Initialize Swiper for Featured Works
new Swiper('.featured-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById("backToTop");

  window.onscroll = function () {
    if (!backToTopBtn) return;
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});