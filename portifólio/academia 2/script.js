// Inicializa a biblioteca de animações on-scroll (AOS)
AOS.init({
    once: true, // Anima apenas uma vez ao descer a barra
    offset: 50, // Distância em px do elemento até o fim da tela para iniciar a animação
});

// Muda o estilo do Header quando o usuário rolar a página
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav a');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });
}

// Fecha o menu vertical quando algum link é apertado
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
});
