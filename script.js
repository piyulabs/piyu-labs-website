// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Logo fallback if image fails to load
    const logo = document.getElementById('companyLogo');
    if (logo) {
        logo.onerror = function() {
            this.style.display = 'none';
            const fallbackSpan = document.createElement('span');
            fallbackSpan.className = 'logo-fallback';
            fallbackSpan.textContent = 'Piyu Labs';
            this.parentElement.appendChild(fallbackSpan);
        };
    }

    // Check if returning from Formspree success
    if (document.referrer.includes('formspree.io')) {
        const modal = document.getElementById('demoModal');
        if (modal) modal.classList.remove('active');
        showToast('Thank you! We\'ll be in touch soon to schedule your demo.');
    }
    
    // Check for newsletter success hash
    if (window.location.hash === '#newsletter-success') {
        showToast('Thanks for subscribing! Check your inbox for updates.');
        // Remove hash from URL
        history.replaceState(null, null, ' ');
    }

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#6366f1' },
                shape: { type: 'circle' },
                opacity: { value: 0.2, random: true },
                size: { value: 2, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: '#6366f1', 
                    opacity: 0.1, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 1, 
                    direction: 'none', 
                    random: true, 
                    straight: false 
                }
            },
            interactivity: { 
                detect_on: 'canvas',
                events: { 
                    onhover: { enable: true, mode: 'repulse' } 
                }
            }
        });
    }

    // Custom cursor functionality (desktop only)
    if (window.innerWidth >= 1024) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        
        if (cursor && follower) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 50);
            });
        }
    }

    // Animated counter function
    function animateCounter(element, start, end, duration, isDecimal = false) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue = progress * (end - start) + start;
            
            if (isDecimal) {
                element.textContent = currentValue.toFixed(1);
            } else {
                element.textContent = Math.floor(currentValue);
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = isDecimal ? end.toFixed(1) : Math.floor(end);
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // Stats observer with counters
    const statItems = document.querySelectorAll('.stat-item');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('stat-item')) {
                    const stat1 = document.getElementById('stat1');
                    const stat2 = document.getElementById('stat2');
                    const stat3 = document.getElementById('stat3');
                    const stat4 = document.getElementById('stat4');
                    
                    if (stat1 && stat2 && stat3 && stat4) {
                        stat1.textContent = '0';
                        stat2.textContent = '0';
                        stat3.textContent = '0';
                        stat4.textContent = '0';
                        
                        setTimeout(() => {
                            animateCounter(stat1, 0, 99.9, 2000, true);
                            animateCounter(stat2, 0, 15, 2000, false);
                            animateCounter(stat3, 0, 24, 2000, false);
                            animateCounter(stat4, 0, 500, 2000, false);
                        }, 300);
                    }
                }
            }
        });
    }, { threshold: 0.3 });

    statItems.forEach(item => statsObserver.observe(item));

    // Regular intersection observer for other elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .solution-card, .contact-card, .feature-item')
        .forEach(el => observer.observe(el));

    // Modal functionality
    const modal = document.getElementById('demoModal');
    const openModalBtns = document.querySelectorAll('#openDemoModal, #getStartedBtn, #contactBtn');
    const closeModal = document.querySelector('.close-modal');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Make showToast globally available
    window.showToast = showToast;

    // Open modal
    openModalBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                if (modal) modal.classList.add('active');
            });
        }
    });

    // Close modal with X button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Watch demo button
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', () => {
            showToast('Demo video will be available soon!');
        });
    }

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Handle responsive behavior for cursor on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 1024) {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            if (cursor && follower) {
                cursor.style.display = 'none';
                follower.style.display = 'none';
            }
        } else {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            if (cursor && follower) {
                cursor.style.display = 'block';
                follower.style.display = 'block';
            }
        }
    });
});