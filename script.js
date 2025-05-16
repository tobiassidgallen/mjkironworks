// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;
let lastScroll = 0;

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) {
    console.error('Back to top button not found!');
    return;
  }

  // Show/hide back to top button based on scroll position
  const toggleBackToTop = () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  };

  // Initial check
  toggleBackToTop();

  // Add scroll event listener
  window.addEventListener('scroll', toggleBackToTop);

  // Smooth scroll to top when button is clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Slide Show Functions
function showNextSlide() {
  if (slides.length === 0) return;
  
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

// Mobile Menu Functions
function toggleMenu() {
  navbar.classList.toggle('active');
  navLinks.classList.toggle('show');
}

mobileMenuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mainNav.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Scroll Functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  
  lastScroll = currentScroll;
});

// Utility Functions
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

// Swiper Initialization
try {
  // Hero Slider
  const heroSwiper = new Swiper('.hero-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Services Slider
  const servicesSwiper = new Swiper('.servicesSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Testimonials Slider
  const testimonialsSwiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
} catch (error) {
  console.error("Error initializing Swiper:", error);
}

// Projects Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Contact Form Service Selection
const serviceSelect = document.getElementById('serviceSelect');
const otherServiceGroup = document.getElementById('otherServiceGroup');
const otherService = document.getElementById('otherService');

if (serviceSelect) {
  serviceSelect.addEventListener('change', function() {
    if (this.value === 'other') {
      otherServiceGroup.style.display = 'block';
      otherService.setAttribute('required', 'required');
    } else {
      otherServiceGroup.style.display = 'none';
      otherService.removeAttribute('required');
    }
  });
}

// Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const formData = new FormData(contactForm);
      
      // If "Other" is selected, combine the service value with the other service input
      if (formData.get('service') === 'other') {
        formData.set('service', `Other: ${formData.get('other_service')}`);
        formData.delete('other_service');
      }

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formFeedback.textContent = 'Message sent successfully!';
        formFeedback.className = 'form-feedback success';
        contactForm.reset();
        otherServiceGroup.style.display = 'none';
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      formFeedback.textContent = 'Failed to send message. Please try again.';
      formFeedback.className = 'form-feedback error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}

// Image Error Handling
document.querySelectorAll('.swiper-slide img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'assets/placeholder.jpg';
    console.error('Failed to load image:', img.src);
  });
});

// Scroll Animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').split('#')[1];
    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - navbarHeight,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      mainNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});

// Handle links with index.html#section
document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').split('#')[1];
    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition - navbarHeight,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      mainNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0) {
    showNextSlide();
    slideInterval = setInterval(showNextSlide, 5000);
  }
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
window.addEventListener('unload', stopSlideShow);

// Lightbox Functionality
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = imageSrc;
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close lightbox when clicking the close button or outside the image
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Performance Optimizations
// Debounce scroll event
const debouncedScroll = debounce(() => {
  // Your scroll event handlers here
  animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Optimize image loading
document.querySelectorAll('img').forEach(img => {
  img.loading = 'lazy';
});

// Optimize Swiper initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Swiper only when needed
  if (document.querySelector('.hero-slider')) {
    initializeSwiper();
  }
});