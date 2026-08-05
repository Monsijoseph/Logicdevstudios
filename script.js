// Navbar gets a solid background + shadow once the page is scrolled,
// and stays translucent over the hero at the top.
const siteNavbar = document.querySelector('.navbar');
if (siteNavbar) {
    const toggleNavbarState = () => {
        siteNavbar.classList.toggle('is-scrolled', window.scrollY > 50);
    };
    toggleNavbarState();
    window.addEventListener('scroll', toggleNavbarState, { passive: true });
}

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

// Fade + slide elements in as they scroll into view. Any element with the
// `.reveal` class (see styles.css) is picked up automatically, so new
// sections/cards get the effect without extra JS.
const revealTargets = document.querySelectorAll(
    '.reveal, .skill-item, .feature-card, .devlog-card, .lore-card, .press-asset, .stat-card, .team-member'
);

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Small stagger so grids of cards don't all pop in at once.
            const delay = (entry.target.dataset.revealIndex || 0) * 60;
            setTimeout(() => entry.target.classList.add('is-visible'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

revealTargets.forEach((item, index) => {
    item.classList.add('reveal');
    item.dataset.revealIndex = index % 6; // stagger resets every 6 for grid rows
    if (revealObserver) {
        revealObserver.observe(item);
    } else {
        item.classList.add('is-visible');
    }
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

