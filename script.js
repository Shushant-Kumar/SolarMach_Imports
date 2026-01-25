/* =====================================================
   SOLARMACH WEBSITE - ENHANCED INTERACTIONS
   Dark Mode, Smooth Animations, and Modern Effects
   ===================================================== */

// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only handle internal links
        if (href && href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                });
                this.classList.add('active');
                this.setAttribute('aria-current', 'page');
            }
        }
    });
});

// ============================================
// ANIMATE ELEMENTS ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Only observe once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all testimonial cards
document.querySelectorAll('.animate-on-scroll').forEach(card => {
    observer.observe(card);
});

// Add staggered animation delay to testimonial cards
const testCards = document.querySelectorAll('.test-card');
testCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow and scrolled class on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// COUNTER ANIMATION FOR IMPACT NUMBERS
// ============================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const hasComma = element.textContent.includes(',');

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = hasComma ? target.toLocaleString() : target;
            clearInterval(timer);
        } else {
            const current = Math.floor(start);
            element.textContent = hasComma ? current.toLocaleString() : current;
        }
    }, 16);
}

// Observe impact section for counter animation
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');

            const counters = entry.target.querySelectorAll('.impact-number');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                counter.textContent = '0';
                setTimeout(() => {
                    animateCounter(counter, number, 2000);
                }, 300);
            });

            // Only observe once
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact');
if (impactSection) {
    impactObserver.observe(impactSection);
}

// ============================================
// BUTTON RIPPLE EFFECTS
// ============================================
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// LOGO CLICK - SCROLL TO TOP
// ============================================
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Make logo keyboard accessible
logo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ============================================
// IMPACT ICONS HOVER EFFECT
// ============================================
document.querySelectorAll('.impact-item').forEach(item => {
    const icon = item.querySelector('.icon');
    if (icon) {
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) rotate(360deg)';
            icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// ============================================
// PARALLAX EFFECT FOR HERO IMAGE (SUBTLE)
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroImg = document.querySelector('.hero-img-wrapper');

            if (heroImg && scrolled < 800) {
                // Reduced parallax effect for better performance
                heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
            }

            ticking = false;
        });

        ticking = true;
    }
});

// ============================================
// INTERSECTION OBSERVER FOR SECTIONS
// ============================================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe main sections
document.querySelectorAll('.impact, .testimonials, .footer').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content link (add this to HTML if needed)
document.addEventListener('keydown', (e) => {
    // Alt + M to skip to main content
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('.hero');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
            mainContent.focus();
        }
    }
});

// Announce theme changes to screen readers
themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const message = `Theme changed to ${theme} mode`;

    // Create live region for screen readers
    let announcement = document.getElementById('theme-announcement');
    if (!announcement) {
        announcement = document.createElement('div');
        announcement.id = 'theme-announcement';
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        document.body.appendChild(announcement);
    }

    announcement.textContent = message;
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', () => {
    // Log page load performance
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`🌞 SolarMach website loaded in ${pageLoadTime}ms`);
    }

    // Lazy load images if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('Error detected:', e.message);
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log(
    '%c🌞 Welcome to SolarMach Imports! %c',
    'background: #3D5C2E; color: #FAF5EB; font-size: 16px; padding: 10px; border-radius: 5px;',
    ''
);
console.log(
    '%cHarvesting sunlight for a sustainable tomorrow 🌱',
    'color: #5A8A3E; font-size: 14px; font-weight: bold;'
);
