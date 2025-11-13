// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressFill = document.getElementById('progress-fill');

    let progress = 0;

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += 2;
        progressFill.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadingInterval);

            // Hide loading screen and show main content
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');

                    // Trigger animations for main content
                    animateOnLoad();
                }, 500);
            }, 500);
        }
    }, 50);
});


// Animate elements on load
function animateOnLoad() {
    const elementsToAnimate = document.querySelectorAll('.hero-content, .feature-card, .download-card, .gallery-item');

    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
window.addEventListener('load', () => {
    const elementsToObserve = document.querySelectorAll('.feature-card, .download-card, .gallery-item');

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Modal functionality
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImage.src = imageSrc;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';

    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Download button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('download-button')) {
        const isAndroid = e.target.closest('.android');
        const platform = isAndroid ? 'Android' : 'iOS';

        // Here you would normally redirect to the actual app store
        // For demo purposes, we'll show an alert
        alert(`Redirecionando para a loja do ${platform}...`);

        // Example of actual store links:
        if (isAndroid) {
            window.open('./apk/Igreja Elohim.apk', '_blank');
        } else {
            alert('Indisponivel no momento.')
            //window.open('Indisponivel', '_blank');
        }
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .download-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Animate stats counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseInt(target));

        if (isNumber) {
            const targetValue = parseInt(target);
            let current = 0;
            const increment = targetValue / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    current = targetValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 40);
        }
    });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
});

window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add loading animation to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const button = e.target;
        const originalText = button.innerHTML;

        // Add loading state
        button.style.opacity = '0.7';
        button.style.transform = 'scale(0.98)';

        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        }, 150);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);