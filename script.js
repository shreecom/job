// Image Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
const slideCount = slides.length;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Go to specific slide
function goToSlide(slideIndex) {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    updateDots();
}

// Update dots
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Responsive Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && !authButtons.contains(e.target)) {
        navLinks.classList.remove('active');
        authButtons.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .category-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation state
document.querySelectorAll('.feature-card, .category-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Trigger initial animation
animateOnScroll();

// Popup Window Functionality
const applyButtons = document.querySelectorAll('.job-card .btn');
const popupOverlay = document.querySelector('.popup-overlay');
const closePopup = document.querySelector('.close-popup');

// Show popup when Apply Now button is clicked
applyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });
});

// Close popup when close button is clicked
closePopup.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close popup when clicking outside the popup content
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Close popup when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// View More Jobs Button Functionality
const viewMoreBtn = document.querySelector('.view-more-btn');
viewMoreBtn.addEventListener('click', () => {
    alert('More jobs will be loaded soon! Stay tuned for updates.');
}); 
