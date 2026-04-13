document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Navigation effect
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Parallax effect on Hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // --- Intersection Observer for Animations ---
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // --- Hero Canvas Particle Effect (Sparks) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1;
                this.life = Math.random() * 100 + 50;
                this.alpha = 1;
                this.color = `rgba(204, 0, 0, ${Math.random() * 0.5 + 0.5})`;
            }

            update() {
                this.y -= this.speedY;
                this.x += this.speedX;
                this.life--;
                this.alpha = this.life / 100;
                if (this.life <= 0) this.reset();
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();
        animate();
    }

    // --- Smooth Scroll for Buttons ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Back to Top Button ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Lightbox Gallery ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;

    if (lightbox && galleryItems.length > 0) {
        const images = Array.from(galleryItems).map(img => img.src);

        galleryItems.forEach((item, index) => {
            item.parentElement.style.cursor = 'pointer';
            item.parentElement.addEventListener('click', () => {
                currentIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            lightboxImg.src = images[currentIndex];
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            openLightbox();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openLightbox();
        }

        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        document.getElementById('lightboxNext').addEventListener('click', nextImage);
        document.getElementById('lightboxPrev').addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeLightbox();
        });
    }
});
