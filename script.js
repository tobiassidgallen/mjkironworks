const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

function showNextSlide() {
  if (slides.length === 0) return;
  
  // Remove active class from current slide
  slides[currentSlide].classList.remove('active');
  
  // Move to next slide
  currentSlide = (currentSlide + 1) % slides.length;
  
  // Add active class to new slide
  slides[currentSlide].classList.add('active');
}

// Start slideshow
slideInterval = setInterval(showNextSlide, 5000);

function stopSlideShow() {
  clearInterval(slideInterval);
}

function toggleMenu() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  navbar.classList.toggle('active');
  navLinks.classList.toggle('show');
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    // Scroll Down
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
    // Scroll Up
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

try {
  const swiper = new Swiper(".servicesSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      init: function() {
        console.log('Swiper initialized successfully');
      },
      error: function(error) {
        console.error('Swiper initialization error:', error);
      }
    }
  });
} catch (error) {
  console.error("Error initializing Swiper:", error);
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
      });
      if (response.ok) {
        formFeedback.textContent = "Message sent successfully!";
        formFeedback.className = "form-feedback success";
        contactForm.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      formFeedback.textContent = "Error sending message. Please try again.";
      formFeedback.className = "form-feedback error";
    }
  });
}

document.querySelectorAll('.swiper-slide img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'assets/placeholder.jpg';
    console.error('Failed to load image:', img.src);
  });
});

function initializeComponents() {
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("navLinks");

  if (!contactForm || !formFeedback || !menuToggle || !navLinks) {
    console.error('Required DOM elements not found');
    return;
  }

  try {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  } catch (error) {
    console.error('Error adding event listeners:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Start slideshow
  if (slides.length > 0) {
    showNextSlide(); // Show first slide
    slideInterval = setInterval(showNextSlide, 5000);
  }
  
  initializeComponents();
});

window.addEventListener('unload', () => {
  stopSlideShow();
});

// Add smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  
  if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
    navbar.classList.remove('active');
    document.getElementById('navLinks').classList.remove('show');
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navbar').classList.remove('active');
    document.getElementById('navLinks').classList.remove('show');
  });
});