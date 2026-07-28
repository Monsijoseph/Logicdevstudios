// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
});

// Initialize Bootstrap tooltips only when Bootstrap is available.
if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Activate a Bootstrap project tab when a CTA points to its panel.
            if (target.classList.contains('tab-pane')) {
                const tabButton = document.querySelector(`[data-bs-target="#${target.id}"]`);
                if (tabButton && typeof bootstrap !== 'undefined') {
                    new bootstrap.Tab(tabButton).show();
                }
            }
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Video card hover effect (only for cards that actually contain an iframe).
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const iframe = card.querySelector('iframe');
        if (iframe && !iframe.src.includes('autoplay=1')) iframe.src += '&autoplay=1';
    });
    card.addEventListener('mouseleave', () => {
        const iframe = card.querySelector('iframe');
        if (iframe) iframe.src = iframe.src.replace('&autoplay=1', '');
    });
});

// Add animation to skill items when they come into view
const skillItems = document.querySelectorAll('.skill-item');

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 }) : null;

skillItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    if (observer) observer.observe(item);
});

const year = document.getElementById('current-year');
if (year) year.textContent = new Date().getFullYear();

// Let visitors reduce motion and remember their preference between visits.
const motionToggle = document.querySelector('[data-accessibility-toggle]');
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const savedReducedMotion = localStorage.getItem('logicdev-reduced-motion') === 'true';
if (prefersReducedMotion || savedReducedMotion) document.body.classList.add('reduce-motion');
if (motionToggle) {
    motionToggle.setAttribute('aria-pressed', document.body.classList.contains('reduce-motion'));
    motionToggle.addEventListener('click', () => {
        const reduced = document.body.classList.toggle('reduce-motion');
        motionToggle.setAttribute('aria-pressed', reduced);
        localStorage.setItem('logicdev-reduced-motion', reduced);
    });
}

//  document.getElementById('year').textContent = new Date().getFullYear();

