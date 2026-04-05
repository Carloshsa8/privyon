document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay * 1000);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Form Submission with EmailJS
    const form = document.getElementById('contact-form');
    if (form) {
        emailjs.init('YOUR_PUBLIC_KEY');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                .then(() => {
                    btn.textContent = 'Interesse Enviado!';
                    btn.style.background = '#10b981';
                    form.reset();
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                }, (error) => {
                    btn.textContent = 'Erro ao Enviar';
                    btn.style.background = '#ef4444';
                    console.error('Email error:', error);
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Smooth Scrolling for Nav Links
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
});
