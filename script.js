// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      document.getElementById('navMenu').classList.remove('active');
    }
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .pricing-card').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const stats = entry.target.querySelectorAll('.stat h3');
      stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
      });
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Form validation (if contact form is added)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add form submission logic here
  });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Console welcome message
console.log('%cFratience Tech Solutions', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cBuilding Digital Solutions | Chat with us on WhatsApp: +250 790 357 975', 'color: #25d366; font-size: 14px;');
console.log('%cLocated in Kamakis, Ruiru, Kenya', 'color: #0ea5e9; font-size: 12px;');

// Typing effect for headings (optional)
function typeEffect(element, speed = 50) {
  const text = element.textContent;
  element.textContent = '';
  let index = 0;

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };

  type();
}

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
