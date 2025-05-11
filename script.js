// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
const scrollThreshold = 100;

// Toggle mobile menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuToggle && navLinks && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Handle navbar visibility on scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Always show navbar at the top of the page
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    // Only hide navbar when scrolling down and past threshold
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Ensure navbar is visible when hovering near the top of the page
document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 50) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }, 250);
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Handle touch events for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleTouchSwipe();
}, false);

function handleTouchSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartY - touchEndY;

    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0 && navLinks.classList.contains('active')) {
            // Swipe up - close menu
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}

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

// Password Toggle
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
}

// Login Form Submission
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        
        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password });
        
        // For demo purposes, show a success message
        alert('Login successful!');
    });
}

// Social Login Buttons
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
    button.addEventListener('click', () => {
        const provider = button.classList.contains('google') ? 'Google' : 'LinkedIn';
        console.log(`${provider} login clicked`);
        // Here you would implement the social login logic
    });
}); 