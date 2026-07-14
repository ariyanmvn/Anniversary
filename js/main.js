document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCountdown();
    initLetter();
    initLightbox();
    initMusicPlayer();
    initSurpriseButton();
    initCounters();
});

// Particles Effect
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = ['#D88C7A', '#E8A698', '#F2C4B9'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = (Math.random() * 0.4 + 0.1).toString();
        particle.style.width = (Math.random() * 6 + 3) + 'px';
        particle.style.height = particle.style.width;
        
        animateParticle(particle);
        container.appendChild(particle);
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * 10;
    const x = (Math.random() - 0.5) * 150;
    const y = (Math.random() - 0.5) * 150;
    
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${x}px, ${y}px)` }
    ], {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline || window.innerWidth <= 768) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    const animate = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animate);
    };
    animate();
}

// Navbar
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveSection(sections, navLinks);
        updateScrollProgress();
    });
}

function updateActiveSection(sections, links) {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 250;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    });
}

function updateScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progress.style.width = `${scrollPercent}%`;
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll, .story-card, .timeline-item, .masonry-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Countdown
function initCountdown() {
    const countdownContainer = document.getElementById('countdownContainer');
    const anniversaryMessage = document.getElementById('anniversaryMessage');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    const anniversary = new Date(new Date().getFullYear(), 6, 18);
    
    function updateCountdown() {
        const now = new Date();
        let diff = anniversary - now;
        
        if (diff <= 0) {
            countdownContainer.style.display = 'none';
            anniversaryMessage.style.display = 'block';
            launchConfetti();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);
        
        const seconds = Math.floor(diff / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Letter Animation
function initLetter() {
    const envelope = document.getElementById('envelope');
    const letterPaper = document.getElementById('letterPaper');
    const typewriterEl = document.getElementById('typewriter');
    
    const letterText = "Dearest Jerin & Shihab,\n\nHappy 2nd Anniversary! 🎉\n\nTwo years ago, your beautiful journey began, and every moment since has been filled with love, laughter, and unforgettable memories.\n\nHere's to many more years of adventure, happiness, and growing old together.\n\nWith all our love,\n\nYour Friends";
    
    let isOpened = false;
    
    envelope.addEventListener('click', () => {
        if (isOpened) return;
        isOpened = true;
        
        envelope.classList.add('open');
        
        setTimeout(() => {
            letterPaper.classList.add('open');
            setTimeout(() => {
                typeWriter(typewriterEl, letterText, 0);
            }, 300);
        }, 600);
    });
}

function typeWriter(element, text, index) {
    if (index <= text.length) {
        element.textContent = text.substring(0, index);
        setTimeout(() => typeWriter(element, text, index + 1), 35);
    }
}

// Lightbox
function initLightbox() {
    const masonryCards = document.querySelectorAll('.masonry-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    let currentIndex = 0;
    const images = Array.from(masonryCards).map(card => ({
        src: card.querySelector('img').src,
        title: card.querySelector('h4').textContent,
        description: card.querySelector('p').textContent
    }));
    
    masonryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(images[index]);
        });
    });
    
    function openLightbox(imageData) {
        lightboxImg.src = imageData.src;
        lightboxCaption.innerHTML = `<h4>${imageData.title}</h4><p>${imageData.description}</p>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(images[currentIndex]);
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(images[currentIndex]);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// Music Player
function initMusicPlayer() {
    const playBtn = document.getElementById('playBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const disc = document.getElementById('playerDisc');
    const progressBar = document.getElementById('progressBar');
    
    // Create audio element - using your music file
    const audio = new Audio('music.mp3');
    audio.loop = true;
    
    let isPlaying = false;
    
    // Try to autoplay when page loads
    (async () => {
        try {
            await audio.play();
            isPlaying = true;
            playBtn.textContent = '⏸';
            disc.classList.add('spinning');
        } catch (error) {
            console.log('Autoplay blocked - will start on first user click');
        }
    })();
    
    // Start music on first user click (for browsers that block autoplay)
    const startMusicOnFirstClick = async () => {
        if (!isPlaying) {
            try {
                await audio.play();
                isPlaying = true;
                playBtn.textContent = '⏸';
                disc.classList.add('spinning');
            } catch (error) {
                console.log('Error starting music:', error);
            }
        }
        document.removeEventListener('click', startMusicOnFirstClick);
        document.removeEventListener('touchstart', startMusicOnFirstClick);
    };
    
    document.addEventListener('click', startMusicOnFirstClick);
    document.addEventListener('touchstart', startMusicOnFirstClick);
    
    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    });
    
    // Play/Pause button
    playBtn.addEventListener('click', async () => {
        if (!isPlaying) {
            try {
                await audio.play();
                isPlaying = true;
                playBtn.textContent = '⏸';
                disc.classList.add('spinning');
            } catch (error) {
                console.log('Error playing audio:', error);
            }
        } else {
            audio.pause();
            isPlaying = false;
            playBtn.textContent = '▶';
            disc.classList.remove('spinning');
        }
    });
    
    // Volume button
    let isMuted = false;
    volumeBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        volumeBtn.textContent = isMuted ? '🔇' : '🔊';
    });
    
    // Make progress bar clickable
    const progressContainer = progressBar.parentElement;
    progressContainer.addEventListener('click', (e) => {
        if (!audio.duration) return;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        audio.currentTime = percent * audio.duration;
    });
}

// Surprise Button
function initSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    surpriseBtn.addEventListener('click', () => {
        launchConfetti();
        showSurpriseMessage();
    });
}

function launchConfetti() {
    const colors = ['#D88C7A', '#E8A698', '#F2C4B9', '#F9D8CF', '#FFEBE6'];
    const confettiCount = 120;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 15);
    }
}

function showSurpriseMessage() {
    const messages = [
        "❤️ Happy Anniversary! ❤️",
        "🎉 You two are amazing! 🎉",
        "💕 Here's to forever! 💕",
        "✨ So much love for you both! ✨"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #D88C7A, #E8A698);
        color: white;
        padding: 28px 40px;
        border-radius: 24px;
        font-family: 'Outfit', sans-serif;
        font-size: 1.375rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        z-index: 10001;
        box-shadow: 0 16px 48px rgba(216, 140, 122, 0.35);
        text-align: center;
    `;
    msgEl.textContent = message;
    
    document.body.appendChild(msgEl);
    
    setTimeout(() => {
        msgEl.style.transition = 'opacity 0.4s ease';
        msgEl.style.opacity = '0';
        setTimeout(() => msgEl.remove(), 400);
    }, 2500);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.funfact-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2200;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}
