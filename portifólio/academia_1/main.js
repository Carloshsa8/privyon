document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth ring following
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        
        requestAnimationFrame(animateRing);
    }
    animateRing();
    
    // Cursor hover effects
    const clickables = document.querySelectorAll('a, button, .service-card, .plan-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.borderColor = 'var(--primary)';
            ring.style.backgroundColor = 'rgba(204, 255, 0, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.borderColor = 'var(--primary)';
            ring.style.backgroundColor = 'transparent';
        });
    });

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Performance Calculator (BMI focus with a twist) ---
    const calcForm = document.getElementById('calc-form');
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;
            const resultDisplay = document.getElementById('calc-result-value');
            const statusDisplay = document.getElementById('calc-status');
            
            if (weight && height) {
                const bmi = (weight / (height * height)).toFixed(1);
                
                // Animated update
                let current = 0;
                const target = parseFloat(bmi);
                const step = target / 30;
                
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        resultDisplay.innerText = target;
                        clearInterval(interval);
                    } else {
                        resultDisplay.innerText = current.toFixed(1);
                    }
                }, 20);
                
                let status = "";
                let color = "var(--primary)";
                
                if (bmi < 18.5) { status = "Abaixo do peso - Vamos ganhar massa!"; color = "#ffcc00"; }
                else if (bmi < 25) { status = "Peso Ideal - Mantenha o ritmo!"; color = "var(--primary)"; }
                else if (bmi < 30) { status = "Sobrepeso - Hora de intensificar!"; color = "#ff9900"; }
                else { status = "Obesidade - Vamos focar no resultado!"; color = "#ff3300"; }
                
                statusDisplay.innerText = status;
                statusDisplay.style.color = color;
                resultDisplay.style.color = color;
            }
        });
    }

    // --- Mobile Menu Toggle (To be implemented in HTML) ---
    // ...

});
