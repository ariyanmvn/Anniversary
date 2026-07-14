document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // CHAPTER NAVIGATION
    // ========================================
    let currentChapter = 1;
    const totalChapters = 5;
    
    const progressDots = document.querySelectorAll('.progress-dot');
    const progressText = document.querySelector('.progress-text');
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    const restartBtn = document.getElementById('restartBtn');
    
    function updateProgress(chapter) {
        progressDots.forEach((dot, index) => {
            if (index < chapter) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        progressText.textContent = `Chapter ${chapter} of ${totalChapters}`;
    }
    
    function goToChapter(chapterNum) {
        if (chapterNum < 1 || chapterNum > totalChapters) return;
        
        const currentChapterEl = document.getElementById(`chapter${currentChapter}`);
        const nextChapterEl = document.getElementById(`chapter${chapterNum}`);
        
        if (currentChapterEl) {
            currentChapterEl.classList.remove('active');
        }
        
        if (nextChapterEl) {
            setTimeout(() => {
                nextChapterEl.classList.add('active');
            }, 100);
        }
        
        currentChapter = chapterNum;
        updateProgress(chapterNum);
    }
    
    chapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextChapterId = btn.dataset.next;
            const nextChapterNum = parseInt(nextChapterId.replace('chapter', ''));
            goToChapter(nextChapterNum);
        });
    });
    
    restartBtn.addEventListener('click', () => {
        goToChapter(1);
        resetChapter1();
        resetChapter4();
    });
    
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToChapter(index + 1);
        });
    });
    
    // ========================================
    // CHAPTER 1 - INVITATION ENVELOPE
    // ========================================
    const invitationEnvelope = document.getElementById('invitationEnvelope');
    const invitationContent = document.getElementById('invitationContent');
    
    function resetChapter1() {
        invitationEnvelope.classList.remove('opened');
        invitationEnvelope.classList.remove('hidden');
        invitationContent.classList.remove('visible');
    }
    
    invitationEnvelope.addEventListener('click', () => {
        if (invitationEnvelope.classList.contains('opened')) return;
        
        invitationEnvelope.classList.add('opened');
        
        setTimeout(() => {
            invitationContent.classList.add('visible');
        }, 400);
        
        setTimeout(() => {
            invitationEnvelope.classList.add('hidden');
        }, 800);
    });
    
    // ========================================
    // CHAPTER 4 - CAKE
    // ========================================
    const cakeContainer = document.getElementById('cakeContainer');
    const giftMessage = document.getElementById('giftMessage');
    const finalChapterBtn = document.getElementById('finalChapterBtn');
    const blowBtn = document.getElementById('blowBtn');
    const cakeHint = document.getElementById('cakeHint');
    const flames = document.querySelectorAll('.flame');
    const smokes = document.querySelectorAll('.smoke');
    let candlesBlown = false;
    
    function resetChapter4() {
        cakeContainer.classList.remove('cake-cut');
        giftMessage.classList.remove('visible');
        finalChapterBtn.style.display = 'none';
        const balloonsContainer = document.getElementById('balloons');
        balloonsContainer.innerHTML = '';
        blowBtn.classList.remove('hidden');
        cakeHint.style.display = 'none';
        candlesBlown = false;
        flames.forEach(flame => flame.classList.remove('blown'));
        smokes.forEach(smoke => smoke.classList.remove('active'));
    }
    
    blowBtn.addEventListener('click', () => {
        if (candlesBlown) return;
        
        candlesBlown = true;
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.classList.add('blown');
                smokes[index].classList.add('active');
            }, index * 100);
        });
        
        setTimeout(() => {
            blowBtn.classList.add('hidden');
            cakeHint.style.display = 'block';
        }, 600);
    });
    
    cakeContainer.addEventListener('click', (e) => {
        if (!candlesBlown) return;
        if (cakeContainer.classList.contains('cake-cut')) return;
        if (e.target === blowBtn) return;
        
        cakeContainer.classList.add('cake-cut');
        launchConfetti();
        launchBalloons();
        
        setTimeout(() => {
            giftMessage.classList.add('visible');
        }, 900); // Wait for cake to almost disappear
        
        setTimeout(() => {
            finalChapterBtn.style.display = 'inline-block';
        }, 1300);
    });
    
    function launchBalloons() {
        const balloonsContainer = document.getElementById('balloons');
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#FF8E72', '#A8E6CF', '#FFD3B6', '#FFAAA5'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.style.left = `${10 + i * 12}%`;
                balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
                balloon.style.animationDelay = `${i * 0.1}s`;
                balloonsContainer.appendChild(balloon);
                
                setTimeout(() => {
                    balloon.classList.add('float');
                }, 50);
            }, i * 150);
        }
    }
    
    // ========================================
    // COUNTDOWN
    // ========================================
    const countdownEl = document.getElementById('countdown');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set target date to July 18 of current year
    const now = new Date();
    let targetYear = now.getFullYear();
    const targetDate = new Date(targetYear, 6, 18); // Month is 0-indexed
    
    // If July 18 has already passed this year, set for next year
    if (now > targetDate) {
        targetYear++;
        targetDate.setFullYear(targetYear);
    }
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            // Countdown complete
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = minutes;
        secondsEl.textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // ========================================
    // MUSIC PLAYER
    // ========================================
    const audio = new Audio('music.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    
    const playBtn = document.getElementById('playBtn');
    const volBtn = document.getElementById('volBtn');
    const disc = document.getElementById('disc');
    
    let isPlaying = false;
    let isMuted = false;
    
    // Try to autoplay when page loads
    (async () => {
        try {
            await audio.play();
            isPlaying = true;
            playBtn.textContent = '⏸';
            disc.classList.add('spinning');
        } catch (error) {
            console.log('Autoplay blocked - user interaction required');
        }
    })();
    
    // Start music on first user click
    const startMusicOnFirstClick = async () => {
        if (!isPlaying) {
            try {
                await audio.play();
                isPlaying = true;
                playBtn.textContent = '⏸';
                disc.classList.add('spinning');
            } catch (error) {
                console.log('Error playing music:', error);
            }
        }
        document.removeEventListener('click', startMusicOnFirstClick);
        document.removeEventListener('touchstart', startMusicOnFirstClick);
    };
    
    document.addEventListener('click', startMusicOnFirstClick);
    document.addEventListener('touchstart', startMusicOnFirstClick);
    
    playBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '▶';
            disc.classList.remove('spinning');
        } else {
            try {
                await audio.play();
                playBtn.textContent = '⏸';
                disc.classList.add('spinning');
            } catch (error) {
                console.log('Error playing music:', error);
            }
        }
        isPlaying = !isPlaying;
    });
    
    volBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMuted = !isMuted;
        audio.muted = isMuted;
        volBtn.textContent = isMuted ? '🔇' : '🔊';
    });
    
    // ========================================
    // CONFETTI
    // ========================================
    const confettiCanvas = document.getElementById('confettiCanvas');
    const ctx = confettiCanvas.getContext('2d');
    
    let confettiPieces = [];
    let confettiAnimationId = null;
    
    function resizeConfettiCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);
    
    const confettiColors = ['#E8A598', '#F9D5D3', '#FDEAE0', '#FDF8F3', '#FFD93D'];
    
    function createConfettiPiece() {
        return {
            x: Math.random() * confettiCanvas.width,
            y: -10,
            size: Math.random() * 8 + 4,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speedY: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4
        };
    }
    
    function launchConfetti() {
        confettiPieces = [];
        for (let i = 0; i < 100; i++) {
            confettiPieces.push(createConfettiPiece());
        }
        animateConfetti();
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;
            
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();
            
            if (piece.y > confettiCanvas.height + 10) {
                confettiPieces.splice(index, 1);
            }
        });
        
        if (confettiPieces.length > 0) {
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        }
    }
    
    // ========================================
    // SURPRISE BUTTON
    // ========================================
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    surpriseBtn.addEventListener('click', () => {
        launchConfetti();
        
        // Create floating hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    });
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.bottom = '0';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9998';
        heart.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    // Add CSS for floating hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-200px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
