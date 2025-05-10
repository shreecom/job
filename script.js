// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Image Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let isAnimating = false;
const slideInterval = 6000; // Change slide every 6 seconds

function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    updateDots(currentSlide);
    slides[currentSlide].classList.add('active');

    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 800); // Match this with the CSS transition time
}

// Next and Previous button functionality
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.hero-slider');

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swipe left
            showSlide(currentSlide + 1);
        } else {
            // Swipe right
            showSlide(currentSlide - 1);
        }
    }
}

// Automatic slider
let slideTimer;

function startSlider() {
    slideTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, slideInterval);
}

function resetSlideTimer() {
    clearInterval(slideTimer);
    startSlider();
}

// Reset timer when manually changing slides
[prevBtn, nextBtn, ...dots].forEach(control => {
    control.addEventListener('click', resetSlideTimer);
});

// Initialize slider
startSlider();

// Pause slider on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(slideTimer);
});

slider.addEventListener('mouseleave', startSlider);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Add scroll event listener for navbar
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
}); 