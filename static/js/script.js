/* =====================================================
   SOLARMACH WEBSITE - ENHANCED INTERACTIONS
   Dark Mode, Smooth Animations, and Modern Effects
   ===================================================== */

// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcons = document.querySelectorAll('.theme-icon');
const themeModeText = document.querySelector('.theme-mode');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function handleThemeToggle(button) {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add rotation animation only for desktop toggle (circular button)
    if (!button.classList.contains('mobile-theme-btn')) {
        button.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            button.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => handleThemeToggle(themeToggle));
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => handleThemeToggle(mobileThemeToggle));
}

function updateThemeIcon(theme) {
    // Update all theme icons
    themeIcons.forEach(icon => {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
    });

    // Update mobile theme mode text
    if (themeModeText) {
        themeModeText.textContent = theme === 'light' ? 'Light' : 'Dark';
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

console.log('Mobile menu elements:', mobileMenuToggle, mobileNavOverlay);

if (mobileMenuToggle && mobileNavOverlay) {
    // Helper function to close mobile menu
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Helper function to toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Toggle menu on hamburger click
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on a link
    const mobileNavLinks = mobileNavOverlay.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking on overlay background (not content)
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
            }
        }
    });
});

// ============================================
// ANIMATE ELEMENTS ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
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

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Observe detail sections, about sections, contact elements, etc.
document.querySelectorAll('.detail-section, .about-section, .feature-card, .contact-info, .contact-form-wrapper, .faq-item, .panel-preview-card').forEach(element => {
    observer.observe(element);
});

// Add staggered animation delay
document.querySelectorAll('.test-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.panel-preview-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.faq-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.panel-type-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.detail-section').forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.15}s`;
});

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
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
}

// ============================================
// COUNTER ANIMATION FOR IMPACT NUMBERS
// ============================================
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;
    const suffix = originalText.replace(/[0-9,]/g, '').trim();

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (suffix ? ' ' + suffix : '');
            clearInterval(timer);
        } else {
            const current = Math.floor(start);
            element.textContent = current.toLocaleString() + (suffix ? ' ' + suffix : '');
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
                if (number) {
                    counter.textContent = '0';
                    setTimeout(() => {
                        animateCounter(counter, number, 2000);
                    }, 300);
                }
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
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
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
if (logo && !logo.hasAttribute('href')) {
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
}

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
document.querySelectorAll('.impact, .testimonials, .footer, .solar-preview, .comparison-section, .cta-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // Get form data for validation
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }

        // Allow the form to submit normally to the server
        // The form will POST to the Flask backend
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content link (add this to HTML if needed)
document.addEventListener('keydown', (e) => {
    // Alt + M to skip to main content
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
            mainContent.focus();
        }
    }
});

// Announce theme changes to screen readers
if (themeToggle) {
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
}

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
