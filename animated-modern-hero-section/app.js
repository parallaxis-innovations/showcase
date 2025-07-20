// DOM Elements
const heroContainer = document.querySelector('.hero-container');
const serviceCards = document.querySelectorAll('.service-card');
const ctaPrimary = document.getElementById('primaryCTA');
const ctaSecondary = document.getElementById('secondaryCTA');
const floatingShapes = document.querySelectorAll('.shape');
const featureItems = document.querySelectorAll('.feature-item');

// Mouse tracking for interactive effects
let mouseX = 0;
let mouseY = 0;

// Initialize all interactions
document.addEventListener('DOMContentLoaded', function () {
    initMouseTracking();
    initServiceCardInteractions();
    initCTAInteractions();
    initParallaxEffects();
    initScrollAnimations();
    createDynamicParticles();
});

// Mouse tracking for interactive elements
function initMouseTracking() {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update floating shapes based on mouse position
        updateFloatingShapes(e);

        // Update background gradient based on mouse position
        updateBackgroundGradient(e);
    });
}

// Update floating shapes to follow mouse subtly
function updateFloatingShapes(e) {
    const rect = heroContainer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    floatingShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const deltaX = (e.clientX - centerX) * speed;
        const deltaY = (e.clientY - centerY) * speed;

        shape.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
}

// Dynamic background gradient that follows mouse
function updateBackgroundGradient(e) {
    const rect = heroContainer.getBoundingClientRect();
    const x = (e.clientX / rect.width) * 100;
    const y = (e.clientY / rect.height) * 100;

    const particles = document.querySelector('.bg-particles');
    particles.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(31, 184, 205, 0.15) 0%, transparent 50%),
        radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
    `;
}

// Enhanced service card interactions
function initServiceCardInteractions() {
    serviceCards.forEach((card, index) => {
        const icon = card.querySelector('.service-icon');
        const label = card.querySelector('.service-label');

        card.addEventListener('mouseenter', () => {
            // Add ripple effect
            createRippleEffect(card);

            // Animate icon
            icon.style.transform = 'scale(1.2) rotateY(360deg)';
            icon.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

            // Animate label
            label.style.transform = 'translateY(-2px)';
            label.style.transition = 'all 0.3s ease-out';

            // Add glow effect to nearby cards
            animateNearbyCards(index);
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotateY(0deg)';
            label.style.transform = 'translateY(0)';

            // Reset nearby cards
            resetNearbyCards();
        });

        // Click animation
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            }, 150);
        });
    });
}

// Create ripple effect on service cards
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(31, 184, 205, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animate nearby service cards
function animateNearbyCards(activeIndex) {
    serviceCards.forEach((card, index) => {
        if (index !== activeIndex) {
            card.style.opacity = '0.7';
            card.style.transform = 'scale(0.95)';
            card.style.transition = 'all 0.3s ease-out';
        }
    });
}

// Reset nearby cards animation
function resetNearbyCards() {
    serviceCards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });
}

// Enhanced CTA button interactions
function initCTAInteractions() {
    // Primary CTA interactions
    ctaPrimary.addEventListener('mouseenter', () => {
        ctaPrimary.style.boxShadow = '0 20px 60px rgba(31, 184, 205, 0.5)';
        ctaPrimary.style.transform = 'translateY(-4px) scale(1.05)';
    });

    ctaPrimary.addEventListener('mouseleave', () => {
        ctaPrimary.style.boxShadow = '0 8px 32px rgba(31, 184, 205, 0.3)';
        ctaPrimary.style.transform = 'translateY(0) scale(1)';
    });

    ctaPrimary.addEventListener('click', () => {
        // Simulate loading state
        const originalText = ctaPrimary.querySelector('.btn-text').textContent;
        ctaPrimary.querySelector('.btn-text').textContent = 'Starting...';
        ctaPrimary.style.pointerEvents = 'none';

        // Create success animation
        setTimeout(() => {
            ctaPrimary.querySelector('.btn-text').textContent = '✓ Let\'s Go!';
            ctaPrimary.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        }, 800);

        // Reset after animation
        setTimeout(() => {
            ctaPrimary.querySelector('.btn-text').textContent = originalText;
            ctaPrimary.style.background = 'linear-gradient(135deg, #1fb8cd, #9333ea)';
            ctaPrimary.style.pointerEvents = 'auto';
        }, 2000);
    });

    // Secondary CTA interactions
    ctaSecondary.addEventListener('mouseenter', () => {
        ctaSecondary.style.background = 'rgba(31, 184, 205, 0.2)';
        ctaSecondary.style.borderColor = '#1fb8cd';
        ctaSecondary.style.transform = 'translateY(-2px)';
    });

    ctaSecondary.addEventListener('mouseleave', () => {
        ctaSecondary.style.background = 'transparent';
        ctaSecondary.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        ctaSecondary.style.transform = 'translateY(0)';
    });

    ctaSecondary.addEventListener('click', () => {
        // Portfolio view animation
        const originalText = ctaSecondary.querySelector('.btn-text').textContent;
        ctaSecondary.querySelector('.btn-text').textContent = 'Loading Portfolio...';

        setTimeout(() => {
            ctaSecondary.querySelector('.btn-text').textContent = originalText;
        }, 1500);
    });
}

// Parallax effects for depth
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Move background elements at different speeds
        const particles = document.querySelector('.bg-particles');
        particles.style.transform = `translateY(${rate}px)`;

        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe feature items for scroll animations
    featureItems.forEach(item => {
        observer.observe(item);
    });
}

// Create dynamic particle system
function createDynamicParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'dynamic-particles';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '2';

    heroContainer.appendChild(particleContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(31, 184, 205, ${Math.random() * 0.5 + 0.2})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    container.appendChild(particle);

    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 10000 + 5000;
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;

    particle.animate([
        {
            left: startX + '%',
            top: startY + '%',
            opacity: 0.2
        },
        {
            left: endX + '%',
            top: endY + '%',
            opacity: 0.8
        },
        {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: 0.2
        }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// Performance optimization: Throttle mouse events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Feature item hover effects
featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-8px) scale(1.1)';
        item.style.color = '#1fb8cd';

        // Add pulse effect to icon
        const icon = item.querySelector('.feature-icon');
        icon.style.animation = 'pulse 0.6s ease-in-out';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.color = 'rgba(255, 255, 255, 0.7)';
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn') ||
            focusedElement.classList.contains('service-card')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add loading completion event
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});