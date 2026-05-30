/**
 * Mini a Pé - Interactive Features (Vanilla JS Premium)
 * Suporte a todos os componentes interativos do tema Light Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Navigation & Drawer
    // ==========================================
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const siteHeader = document.getElementById('siteHeader');
    
    // Create modern responsive navigation overlay menu dynamically for perfect clean code
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.id = 'mobileMenuOverlay';
    mobileMenuOverlay.style.cssText = `
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 320px;
        height: 100%;
        background-color: #ffffff;
        box-shadow: -10px 0 30px rgba(0,0,0,0.05);
        z-index: 1001;
        display: flex;
        flex-direction: column;
        padding: 100px 30px 40px;
        gap: 25px;
        transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    
    const menuLinks = [
        { text: 'Sobre o Mini a Pé', href: '#sobre' },
        { text: 'Conhecendo o Mini a Pé', href: '#conhecendo' },
        { text: 'Como Brincar', href: '#como-brincar' },
        { text: 'Relação com a Tecnologia', href: '#relacao-tecnologia' },
        { text: 'FAQ', href: '#faq' }
    ];
    
    menuLinks.forEach(link => {
        const a = document.createElement('a');
        a.textContent = link.text;
        a.href = link.href;
        a.style.cssText = `
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 1.25rem;
            color: #000000;
            text-decoration: none;
            transition: color 0.2s ease;
        `;
        a.addEventListener('mouseenter', () => a.style.color = '#675bff');
        a.addEventListener('mouseleave', () => a.style.color = '#000000');
        a.addEventListener('click', () => closeMobileMenu());
        mobileMenuOverlay.appendChild(a);
    });
    
    // Close button for overlay
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 25px;
        right: 30px;
        font-size: 2.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        color: #000000;
        z-index: 1002;
        pointer-events: all;
        line-height: 1;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeBtn.addEventListener('click', () => closeMobileMenu());
    mobileMenuOverlay.appendChild(closeBtn);
    document.body.appendChild(mobileMenuOverlay);
    
    const openMobileMenu = () => {
        mobileMenuOverlay.style.right = '0';
        document.body.style.overflow = 'hidden';
    };
    
    const closeMobileMenu = () => {
        mobileMenuOverlay.style.right = '-100%';
        document.body.style.overflow = '';
    };
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            openMobileMenu();
        });
    }
    
    // Scroll header styling with hysteresis to prevent rapid toggling (blinking)
    const updateHeaderScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            siteHeader.classList.add('scrolled');
        } else if (scrollY < 20) {
            siteHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    // Initial check on load/refresh in case the viewport is already scrolled
    updateHeaderScroll();

    // ==========================================
    // 2. Active Pedometer Simulator (Hero Mockup)
    // ==========================================
    const heroStepsCounter = document.getElementById('heroStepsCounter');
    const heroCalorieCounter = document.getElementById('heroCalorieCounter');
    const heroCoinCounter = document.getElementById('heroCoinCounter');
    const heroProgressRing = document.getElementById('heroProgressRing');
    
    let currentSteps = 8420;
    let currentKcal = 336;
    let currentCoins = 142.50;
    const goalSteps = 10000;
    const ringCircumference = 534; // 2 * PI * r (r=85)
    
    const updateProgressRing = (steps) => {
        if (!heroProgressRing) return;
        const percentage = Math.min(steps / goalSteps, 1);
        const offset = ringCircumference - (percentage * ringCircumference);
        heroProgressRing.style.strokeDashoffset = offset;
    };
    
    const animateSteps = () => {
        if (!heroStepsCounter) return;
        
        // Randomly walk 1-3 steps
        const walk = Math.floor(Math.random() * 3) + 1;
        currentSteps += walk;
        currentKcal = Math.floor(currentSteps * 0.04);
        // 1 coin per 60 steps roughly
        currentCoins = 142.50 + ((currentSteps - 8420) * 0.016);
        
        // Render values
        heroStepsCounter.textContent = currentSteps.toLocaleString('pt-BR');
        if (heroCalorieCounter) heroCalorieCounter.textContent = `${currentKcal} KCAL`;
        if (heroCoinCounter) heroCoinCounter.textContent = currentCoins.toFixed(2).replace('.', ',');
        
        updateProgressRing(currentSteps);
    };
    
    // Init Progress ring
    updateProgressRing(currentSteps);
    setInterval(animateSteps, 3500); // Walk every 3.5 seconds


    // ==========================================
    // 4. FAQ Accordion Height transition
    // ==========================================
    const faqButtons = document.querySelectorAll('.faq-header-btn');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqCard = button.closest('.faq-item-card');
            const collapseContainer = faqCard.querySelector('.faq-body-collapse');
            const isOpened = faqCard.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item-card').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-body-collapse').style.maxHeight = '0';
                item.querySelector('.faq-header-btn').setAttribute('aria-expanded', 'false');
            });
            
            if (!isOpened) {
                faqCard.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                collapseContainer.style.maxHeight = `${collapseContainer.scrollHeight}px`;
            }
        });
    });

    // ==========================================
    // 5. Centered Interactive Slide Carousel (Option B) - Reusable Function
    // ==========================================
    const initCarousel = (trackId, nextBtnId, prevBtnId, dotsContainerId) => {
        const track = document.getElementById(trackId);
        if (!track) return;
        
        const slides = Array.from(track.children);
        const nextBtn = document.getElementById(nextBtnId);
        const prevBtn = document.getElementById(prevBtnId);
        const dotsContainer = document.getElementById(dotsContainerId);
        
        if (slides.length > 0 && nextBtn && prevBtn && dotsContainer) {
            let currentIndex = 0;
            
            // Generate dots dynamically
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    moveToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
            
            const dots = Array.from(dotsContainer.children);
            
            const updateSlidePositions = () => {
                slides.forEach((slide, index) => {
                    slide.classList.remove('active');
                    if (index === currentIndex) {
                        slide.classList.add('active');
                    }
                });
                
                // Calculate centering translation
                const wrapperWidth = track.parentElement.clientWidth;
                const slideWidth = slides[0].clientWidth;
                const gap = 30; // standard 30px gap in CSS
                
                // Shift the track so the active slide sits exactly in the center
                const shiftOffset = (wrapperWidth / 2) - (slideWidth / 2) - (currentIndex * (slideWidth + gap));
                track.style.transform = `translateX(${shiftOffset}px)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            };
            
            const moveToSlide = (index) => {
                if (index < 0) index = 0;
                if (index >= slides.length) index = slides.length - 1;
                currentIndex = index;
                updateSlidePositions();
            };
            
            // Button actions
            nextBtn.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    moveToSlide(currentIndex + 1);
                } else {
                    moveToSlide(0); // loop back
                }
            });
            
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    moveToSlide(currentIndex - 1);
                } else {
                    moveToSlide(slides.length - 1); // loop to end
                }
            });
            
            // Handle window resizing
            window.addEventListener('resize', updateSlidePositions);
            
            // Mouse/Touch Swipe interactions
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let currentTranslate = 0;
            let prevTranslate = 0;
            let animationID = 0;
            let isSwipingHorizontal = false;
            let isSwipingVertical = false;

            const getTranslateOffset = () => {
                const wrapperWidth = track.parentElement.clientWidth;
                const slideWidth = slides[0].clientWidth;
                const gap = 30; // standard 30px gap in CSS
                return (wrapperWidth / 2) - (slideWidth / 2) - (currentIndex * (slideWidth + gap));
            };

            const dragStart = (event) => {
                isDragging = true;
                isSwipingHorizontal = false;
                isSwipingVertical = false;
                
                startX = getPositionX(event);
                startY = getPositionY(event);
                prevTranslate = getTranslateOffset();
                
                // Disable transition during drag for real-time responsiveness
                track.style.transition = 'none';
                
                animationID = requestAnimationFrame(animation);
            };

            const dragMove = (event) => {
                if (!isDragging) return;
                
                const currentX = getPositionX(event);
                const currentY = getPositionY(event);
                
                const diffX = currentX - startX;
                const diffY = currentY - startY;

                // Detect direction
                if (!isSwipingHorizontal && !isSwipingVertical) {
                    if (Math.abs(diffX) > 10) {
                        isSwipingHorizontal = true;
                    } else if (Math.abs(diffY) > 10) {
                        isSwipingVertical = true;
                    }
                }

                if (isSwipingHorizontal) {
                    // Prevent page scroll when swiping horizontally
                    if (event.cancelable) event.preventDefault();
                    currentTranslate = prevTranslate + diffX;
                }
            };

            const dragEnd = (event) => {
                if (!isDragging) return;
                
                isDragging = false;
                cancelAnimationFrame(animationID);
                
                // Restore css transition for slide snap
                track.style.transition = '';
                
                if (isSwipingHorizontal) {
                    const currentX = getPositionX(event);
                    const diffX = currentX - startX;
                    
                    const threshold = 60; // 60px swipe threshold is more responsive on mobile
                    if (diffX < -threshold && currentIndex < slides.length - 1) {
                        moveToSlide(currentIndex + 1);
                    } else if (diffX > threshold && currentIndex > 0) {
                        moveToSlide(currentIndex - 1);
                    } else {
                        moveToSlide(currentIndex);
                    }
                } else {
                    moveToSlide(currentIndex);
                }
                
                isSwipingHorizontal = false;
                isSwipingVertical = false;
            };

            const getPositionX = (event) => {
                if (event.type.includes('mouse')) return event.pageX;
                if (event.touches && event.touches.length > 0) {
                    return event.touches[0].clientX;
                }
                if (event.changedTouches && event.changedTouches.length > 0) {
                    return event.changedTouches[0].clientX;
                }
                return 0;
            };

            const getPositionY = (event) => {
                if (event.type.includes('mouse')) return event.pageY;
                if (event.touches && event.touches.length > 0) {
                    return event.touches[0].clientY;
                }
                if (event.changedTouches && event.changedTouches.length > 0) {
                    return event.changedTouches[0].clientY;
                }
                return 0;
            };

            const animation = () => {
                if (isDragging && isSwipingHorizontal) {
                    track.style.transform = `translateX(${currentTranslate}px)`;
                }
                if (isDragging) {
                    animationID = requestAnimationFrame(animation);
                }
            };

            // Event Listeners for Touch/Mouse Dragging
            track.addEventListener('mousedown', dragStart);
            track.addEventListener('touchstart', dragStart, { passive: true });
            
            window.addEventListener('mousemove', dragMove, { passive: false });
            window.addEventListener('touchmove', dragMove, { passive: false });
            
            window.addEventListener('mouseup', dragEnd);
            window.addEventListener('touchend', dragEnd);
            window.addEventListener('touchcancel', dragEnd);
            
            // Initial setup
            updateSlidePositions();
        }
    };
    // Initialize all three section carousels (Section 2 - Conhecendo, Section 3 - Como Brincar, Section 4 - Tecnologia)
    initCarousel('conhecendoCarouselTrack', 'conhecendoCarouselNext', 'conhecendoCarouselPrev', 'conhecendoCarouselDots');
    initCarousel('comoBrincarCarouselTrack', 'comoBrincarCarouselNext', 'comoBrincarCarouselPrev', 'comoBrincarCarouselDots');
    initCarousel('tecnologiaCarouselTrack', 'tecnologiaCarouselNext', 'tecnologiaCarouselPrev', 'tecnologiaCarouselDots');
});