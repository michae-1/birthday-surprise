/**
 * Main JavaScript for Birthday Apology Website
 * Handles interactive elements, scroll animations, and countdown timer
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollReveal();
    initGiftBox();
    initCountdown();
    createSparkles();
    initSectionNavigation();
});

/**
 * Initialize section navigation with smooth transitions
 */
function initSectionNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const transitioningHeart = document.querySelector('.transitioning-heart');
    
    // Set up click events for navigation dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Get current active section
                const currentSection = document.querySelector('.section.active-section');
                
                // If same section, do nothing
                if (currentSection === targetSection) return;
                
                // Update active nav dot
                document.querySelector('.nav-dot.active').classList.remove('active');
                this.classList.add('active');
                
                // Animate heart transition
                animateHeartTransition(currentSection, targetSection);
                
                // Scroll to section
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 500);
                
                // Update active section
                currentSection.classList.remove('active-section');
                targetSection.classList.add('active-section');
            }
        });
    });
    
    // Update active section and nav dot on scroll
    window.addEventListener('scroll', function() {
        let currentSectionId = '';
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - window.innerHeight / 2 &&
                window.pageYOffset < sectionTop + sectionHeight - window.innerHeight / 2) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update active nav dot
        if (currentSectionId) {
            navDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === currentSectionId) {
                    dot.classList.add('active');
                }
            });
        }
    });
    
    /**
     * Animate heart transition between sections
     * @param {HTMLElement} fromSection - Section transitioning from
     * @param {HTMLElement} toSection - Section transitioning to
     */
    function animateHeartTransition(fromSection, toSection) {
        // Get hearts
        const fromHeart = fromSection.querySelector('.section-heart');
        const toHeart = toSection.querySelector('.section-heart');
        
        if (fromHeart && toHeart && transitioningHeart) {
            // Get positions
            const fromRect = fromHeart.getBoundingClientRect();
            const toRect = toHeart.getBoundingClientRect();
            
            // Set initial position
            transitioningHeart.style.left = fromRect.left + 'px';
            transitioningHeart.style.top = fromRect.top + 'px';
            transitioningHeart.style.color = window.getComputedStyle(fromHeart).color;
            
            // Start animation
            transitioningHeart.classList.add('active');
            
            // Animate to new position
            setTimeout(() => {
                transitioningHeart.style.transform = `translate(${toRect.left - fromRect.left}px, ${toRect.top - fromRect.top}px)`;
                transitioningHeart.style.color = window.getComputedStyle(toHeart).color;
            }, 50);
            
            // Hide after animation
            setTimeout(() => {
                transitioningHeart.classList.remove('active');
                transitioningHeart.style.transform = '';
            }, 1000);
        }
    }
    
    // Set initial active section
    const initialSection = document.getElementById('hero');
    if (initialSection) {
        initialSection.classList.add('active-section');
    }
}

/**
 * Initialize scroll reveal animations
 * Adds 'revealed' class to elements when they come into view
 */
function initScrollReveal() {
    // Get all elements with the scroll-reveal class
    const revealElements = document.querySelectorAll('.section');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'revealed' class when element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                entry.target.classList.add('revealed');
                
                // Add active-section class for section transitions
                if (entry.target.classList.contains('section')) {
                    // Don't remove active-section from all sections here to avoid conflicts with navigation
                    if (!entry.target.classList.contains('active-section')) {
                        entry.target.classList.add('active-section');
                    }
                    
                    // Animate section heart
                    const sectionHeart = entry.target.querySelector('.section-heart');
                    if (sectionHeart) {
                        sectionHeart.style.opacity = '0';
                        setTimeout(() => {
                            sectionHeart.style.opacity = '0.6';
                            sectionHeart.style.animation = 'none';
                            sectionHeart.offsetHeight; // Trigger reflow
                            sectionHeart.style.animation = 'floatHeart 6s infinite ease-in-out';
                        }, 300);
                    }
                }
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, {
        threshold: 0.3 // Trigger when at least 30% of the element is visible
    });
    
    // Observe each element
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll-reveal class to specific elements within sections
    const elementsToReveal = document.querySelectorAll('.message-card, .birthday-card, .gift-content, .closing-card');
    elementsToReveal.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

/**
 * Initialize gift box interaction
 * Handles the click event on the gift box to reveal the surprise
 */
function initGiftBox() {
    const giftBox = document.querySelector('.gift-box');
    const giftReveal = document.querySelector('.gift-reveal');
    const cuteElements = document.querySelectorAll('.gift-cute-element');
    
    if (giftBox && giftReveal) {
        giftBox.addEventListener('click', function() {
            // Prevent multiple clicks
            if (this.classList.contains('open')) return;
            
            // Add open class to animate the gift box
            this.classList.add('open');
            
            // Play a soft sound effect (optional)
            // const openSound = new Audio('assets/audio/gift-open.mp3');
            // openSound.volume = 0.5;
            // openSound.play();
            
            // Create sparkle effect
            createSparkleEffect(this);
            
            // Animate cute elements with staggered timing
            cuteElements.forEach((element, index) => {
                setTimeout(() => {
                    // Random position around the gift box
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 100;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * -distance; // Negative to go upward
                    
                    // Apply animation
                    element.style.transform = `translate(${x}px, ${y}px) scale(1) rotate(${Math.random() * 360}deg)`;
                    element.style.opacity = '1';
                    
                    // Add floating animation
                    element.style.animation = `floatUp ${3 + Math.random() * 2}s ease-in-out infinite`;
                    element.style.animationDelay = `${index * 0.2}s`;
                }, 500 + index * 200);
            });
            
            // Create heart burst effect
            setTimeout(() => {
                createHeartBurst(this);
            }, 800);
            
            // Show the gift reveal content after a short delay
            setTimeout(() => {
                giftReveal.classList.remove('hidden');
                giftReveal.classList.add('slide-in-up');
                
                // Add a subtle shake animation to the countdown
                const countdown = document.getElementById('countdown');
                if (countdown) {
                    countdown.classList.add('pulse');
                }
                
                // Gradually fade out the gift box
                setTimeout(() => {
                    const fadeOut = setInterval(() => {
                        if (parseFloat(this.style.opacity) === 0 || this.style.opacity === '') {
                            this.style.opacity = '1';
                        }
                        this.style.opacity = parseFloat(this.style.opacity) - 0.1;
                        
                        if (parseFloat(this.style.opacity) <= 0) {
                            clearInterval(fadeOut);
                        }
                    }, 50);
                }, 1000);
            }, 1500);
        });
    }
}

/**
 * Create heart burst effect when gift is opened
 */
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const heartCount = 15;
    const colors = ['#FFD1DC', '#B76E79', '#ff4d6d', '#ff9eb5'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤';
        heart.style.position = 'absolute';
        heart.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.opacity = '0';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        
        // Random position from center of gift box
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        
        // Add to body
        document.body.appendChild(heart);
        
        // Animate
        setTimeout(() => {
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Set animation
            heart.style.transition = `transform ${1 + Math.random() * 1.5}s ease-out, opacity ${1 + Math.random() * 1.5}s ease-out`;
            heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0.8';
            
            // Fade out and remove
            setTimeout(() => {
                heart.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(heart)) {
                        document.body.removeChild(heart);
                    }
                }, 1000);
            }, 1000);
        }, i * 50);
    }
}

/**
 * Initialize countdown timer
 * Counts down to a specified date
 */
function initCountdown() {
    // Set the date we're counting down to (5 days from now)
    const now = new Date("2026-03-10T13:00:00");
    const countdownDate = new Date();
    countdownDate.setDate(now.getDate() + 5); // 5 days from now
    countdownDate.setHours(13); // 13:00 PM
    countdownDate.setMinutes(0);
    countdownDate.setSeconds(0);
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countdownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").textContent = formatTime(days);
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("minutes").textContent = formatTime(minutes);
        document.getElementById("seconds").textContent = formatTime(seconds);
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").innerHTML = "<p>It's time for our special date!</p>";
        }
    }, 1000);
}

/**
 * Format time values to always have two digits
 */
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

/**
 * Create sparkle effect when gift is opened
 */
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 30;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position around the gift box
        const posX = rect.left + Math.random() * rect.width;
        const posY = rect.top + Math.random() * (rect.height / 2);
        
        // Set sparkle position and animation
        sparkle.style.left = `${posX}px`;
        sparkle.style.top = `${posY}px`;
        sparkle.style.animation = `sparkle ${0.5 + Math.random() * 1}s forwards`;
        
        // Add to body and remove after animation
        document.body.appendChild(sparkle);
        setTimeout(() => {
            document.body.removeChild(sparkle);
        }, 2000);
    }
}

/**
 * Create floating sparkles throughout the page
 */
function createSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '-1';
    document.body.appendChild(sparkleContainer);
    
    // Create occasional sparkles
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to create a sparkle
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Random position on the screen
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            // Set sparkle position and animation
            sparkle.style.left = `${posX}px`;
            sparkle.style.top = `${posY}px`;
            sparkle.style.animation = `sparkle ${1 + Math.random() * 2}s forwards`;
            
            // Add to container and remove after animation
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => {
                sparkleContainer.removeChild(sparkle);
            }, 3000);
        }
    }, 300);
}

/**
 * Add phone number to the Call Me button
 * This function can be used to add the phone number dynamically
 * For privacy reasons, it's not included in the HTML
 */
function setPhoneNumber(phoneNumber) {
    const callButton = document.querySelector('.cta-button');
    if (callButton) {
        callButton.href = `tel:${phoneNumber}`;
    }
}

// Set the phone number
setPhoneNumber('7260889723');