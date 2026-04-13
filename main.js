/* ============================================================
   PRIVYON V4 — main.js (Emergency Rescue Version)
   ============================================================ */

// Exposição Global para garantir funcionamento via onclick no HTML
window.openModal = function (serviceKey) {
  const elements = getModalElements();
  const data = SERVICE_DATA[serviceKey] || PRODUTO_DATA[serviceKey];
  if (!data || !elements.serviceModal) {
    console.error('Modal ou Dados não encontrados:', serviceKey);
    return;
  }

  const iconBox = document.getElementById('modal-icon');
  const titleBox = document.getElementById('modal-title');
  const descBox = document.getElementById('modal-desc');
  const listBox = document.getElementById('modal-list');

  if (iconBox) iconBox.innerHTML = data.icon;
  if (titleBox) titleBox.textContent = data.title;
  if (descBox) descBox.textContent = data.desc;
  if (listBox) listBox.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');

  if (elements.modalCta) {
    elements.modalCta.style.display = PRODUTO_DATA[serviceKey] ? 'none' : 'inline-flex';
  }

  elements.serviceModal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function () {
  const elements = getModalElements();
  if (elements.serviceModal) elements.serviceModal.classList.remove('open');
  checkBodyOverflow();
};

window.openManifesto = function () {
  const elements = getModalElements();
  if (elements.manifestoModal) {
    elements.manifestoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeManifesto = function () {
  const elements = getModalElements();
  if (elements.manifestoModal) elements.manifestoModal.classList.remove('open');
  checkBodyOverflow();
};

window.scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openContactHub = function () {
  const elements = getModalElements();
  if (elements.contactHub) {
    // Fecha outros modais para dar foco total ao Hub
    window.closeManifesto();
    window.closeModal();
    window.closeMobile();

    elements.contactHub.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeContactHub = function () {
  const elements = getModalElements();
  if (elements.contactHub) elements.contactHub.classList.remove('open');
  checkBodyOverflow();
};

// ----- Helper: Buscar Elementos -----
function getModalElements() {
  return {
    serviceModal: document.getElementById('service-modal'),
    modalClose: document.getElementById('modal-close'),
    modalCta: document.getElementById('modal-cta'),
    manifestoModal: document.getElementById('manifesto-modal'),
    manifestoBtn: document.getElementById('manifesto-btn'),
    mobileManifestoBtn: document.getElementById('mobile-manifesto-btn'),
    manifestoClose: document.getElementById('manifesto-close'),
    contactHub: document.getElementById('contact-hub'),
    hubClose: document.getElementById('hub-close')
  };
}

function checkBodyOverflow() {
  const elements = getModalElements();
  const isAnyOpen = elements.serviceModal?.classList.contains('open') ||
    elements.manifestoModal?.classList.contains('open') ||
    elements.contactHub?.classList.contains('open') ||
    document.getElementById('mobile-menu')?.classList.contains('open');
  if (!isAnyOpen) document.body.style.overflow = '';
}

// ----- Footer year -----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----- Custom Cursor -----
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (!isTouch) {
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
    }
  });
  if (isTouch) {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
  }
}

// ----- Mobile menu toggle -----
window.closeMobile = function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    checkBodyOverflow();
  }
};

const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      checkBodyOverflow();
    }
  });
}

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    window.closeMobile();
  }
});

// ----- Scroll-reveal -----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ----- Contact form (Somente se existir) -----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura os dados
    const name = document.getElementById('contact-name')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';

    // Prepara o mailto
    const subject = encodeURIComponent(`Privyon - Contato de ${name}`);
    const body = encodeURIComponent(`Olá, meu nome é ${name} (${email}).\n\nMinha mensagem:\n${message}`);
    const mailtoUrl = `mailto:privyon@protonmail.com?subject=${subject}&body=${body}`;

    // Abre o cliente de e-mail e limpa o form
    window.location.href = mailtoUrl;
    contactForm.reset();

    // Feedback visual
    const btnSubmit = document.getElementById('btn-submit');
    const formSuccess = document.getElementById('form-success');
    if (btnSubmit) btnSubmit.style.display = 'none';
    if (formSuccess) formSuccess.classList.add('visible');

    // Opcional: Reexibir botão após alguns segundos
    setTimeout(() => {
      if (btnSubmit) btnSubmit.style.display = 'inline-flex';
      if (formSuccess) formSuccess.classList.remove('visible');
    }, 5000);
  });
}

// ----- Navbar background -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.style.background = 'hsl(220 20% 4% / 0.98)';
    } else {
      navbar.style.background = 'hsl(220 20% 4% / 0.8)';
    }
  }
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }
});

// ----- DATA SETS ----- (Generic/Hygienized)
const SCANNER_DATA = [
  { id: 'scan-ip', label: 'Endereço IP (Público)', icon: '🌐', wide: true },
  { id: 'scan-location', label: 'Sua Localização', icon: '📍' },
  { id: 'scan-isp', label: 'Provedor (ISP)', icon: '🏢' },
  { id: 'scan-browser', label: 'Sistema / Navegador', icon: '💻' },
  { id: 'scan-screen', label: 'Resolução da Tela', icon: '📐' },
  { id: 'scan-battery', label: 'Status da Bateria', icon: '⚡' },
  { id: 'scan-hardware', label: 'Processador / RAM', icon: '🧠' },
  { id: 'scan-tz', label: 'Fuso Horário / Hora', icon: '🕒' },
  { id: 'scan-conn', label: 'Tipo de Conexão', icon: '📡' },
  { id: 'scan-touch', label: 'Interface Touch', icon: '🖐️' }
];

const SERVICE_DATA = {
  'big-techs': {
    title: 'Desvinculação de Big Techs',
    desc: 'Afaste-se do monitoramento corporativo e recupere sua liberdade com alternativas éticas e privadas.',
    items: ['Migração assistida de arquivos', 'Configuração de sistemas independentes', 'Treinamento em software auditável', 'Redução de rastro digital'],
    icon: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  },
  'email': {
    title: 'Email Privado',
    desc: 'Comunicação blindada com criptografia de ponta a ponta sem intermediários lendo suas mensagens.',
    items: ['Domínios próprios e exclusivos', 'Protocolos PGP configurados', 'Bloqueio de rastreadores fixos', 'Sincronização redundante segura'],
    icon: '<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  },
  'nuvem': {
    title: 'Nuvem Soberana',
    desc: 'Seus dados, sua infraestrutura. Mantenha seus arquivos sob seu total controle e posse.',
    items: ['Nuvem privada individual', 'Edição de documentos segura', 'Backup de mídia proprietário', 'Contatos e agendas protegidos'],
    icon: '<svg viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>'
  },
  'senhas': {
    title: 'Gestão de Senhas',
    desc: 'Segurança absoluta para suas credenciais com cofres inacessíveis a terceiros.',
    items: ['Cofres auto-hospedados', 'Autenticação física multifeitor', 'Aliases de email estratégicos', 'Criptografia peer-to-peer'],
    icon: '<svg viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5"/></svg>'
  },
  'backup': {
    title: 'Backup Seguro',
    desc: 'Resiliência total contra perda de dados com redundância criptografada.',
    items: ['Regra de backup estratégica', 'Criptografia em repouso e trânsito', 'Automação sem nuvens públicas', 'Auditoria de integridade física'],
    icon: '<svg viewBox="0 0 24 24"><path d="M12 13V3L9 6m3-3l3 3"/><path d="M17 13a5 5 0 1 1-10 0"/><line x1="2" y1="21" x2="22" y2="21"/></svg>'
  },
  'auditoria': {
    title: 'Auditoria de Privacidade',
    desc: 'Mapeamento profissional de exposição digital e correção de brechas.',
    items: ['Varredura de pegada digital', 'Extração de dados públicos', 'Configurações de blindagem social', 'Plano de ação corretivo'],
    icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
  }
};

const PRODUTO_DATA = {
  'prod-apps': {
    title: 'Apps e Ferramentas',
    desc: 'Aplicações que priorizam sua privacidade e soberania digital.',
    items: ['Produtividade com sync controlado', 'Comunicação sem rastreadores', 'Notas com criptografia nativa', 'Software de escritório auditável'],
    icon: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'
  },
  'prod-rede': {
    title: 'Rede e Conectividade',
    desc: 'Configurações avançadas para blindar sua internet contra vigilância.',
    items: ['Wi-Fi com padrões militares', 'Túneis de conexão ofuscada', 'DNS seguro e privado', 'Redes mesh e descentralizadas'],
    icon: '<svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12" y2="20"/></svg>'
  },
  'prod-seguranca': {
    title: 'Segurança e Criptografia',
    desc: 'Protocolos de proteção absoluta para seus ativos digitais.',
    items: ['Criptografia de discos e mídias', 'Proteção granular de nuvem', 'Gestão de vulnerabilidades', 'Autenticação multifator física'],
    icon: '<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
  },
  'prod-backup': {
    title: 'Cloud e Backup',
    desc: 'Estratégias de preservação de dados sem depender de grandes corporações.',
    items: ['Nuvem privada soberana', 'Armazenamento distribuído', 'Resiliência contra perda total', 'Software de backup incremental'],
    icon: '<svg viewBox="0 0 24 24"><path d="M12 13V3L9 6m3-3l3 3"/><path d="M17 13a5 5 0 1 1-10 0"/><line x1="2" y1="21" x2="22" y2="21"/></svg>'
  },
  'prod-auditoria': {
    title: 'Conceitos e Auditoria',
    desc: 'Análise técnica e remoção de sua pegada digital pública.',
    items: ['Inteligência de fontes abertas', 'Limpeza em indexadores públicos', 'Auditoria de redes e serviços', 'Verificação de vazamento de credenciais'],
    icon: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
  },
  'prod-familia': {
    title: 'Privacidade Familiar',
    desc: 'Proteja seus dependentes mantendo a individualidade e segurança online.',
    items: ['Filtros de ameaças em nível de rede', 'Limites de exposição ética', 'Blindagem de dispositivos domésticos', 'Checklist de segurança residencial'],
    icon: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  'prod-negocio': {
    title: 'Segurança para Negócios',
    desc: 'Proteção digital estratégica para empresas e autônomos.',
    items: ['Criptografia de dados de clientes', 'Treinamento contra engenharia social', 'Estratégias de continuidade de negócio', 'Diretrizes de conformidade privadas'],
    icon: '<svg viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>'
  },
  'prod-anonimato': {
    title: 'Anonimato Avançado',
    desc: 'Técnicas para agir digitalmente sem deixar vestígios reais.',
    items: ['Redes distribuídas de ocultação', 'Sistemas voltados para anonimato', 'VPNs com prioridade técnica', 'Ofuscação de metadados críticos'],
    icon: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="2" y1="2" x2="22" y2="22"/></svg>'
  },
  'prod-mensageiros': {
    title: 'Mensageiros Privados',
    desc: 'Comunicação confidencial baseada em criptografia inquebrável.',
    items: ['Foco técnico em anonimato total', 'Chat sem vínculo com telefone', 'Infraestrutura descentralizada', 'Redes de proximidade bluetooth'],
    icon: '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
  },
  'prod-senhas': {
    title: 'Cofres de Senhas',
    desc: 'Organização e segurança de credenciais com chaves fortes.',
    items: ['Criptografia total em dispositivo', 'Armazenamento offline de chaves', 'Implementação de chaves físicas', 'Uso de aliases contra golpes'],
    icon: '<svg viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5"/></svg>'
  }
};

// ----- Numeric Counters Animation -----
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const observerOptions = { threshold: 0.8, rootMargin: '0px 0px -50px 0px' };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 segundos
        let startTimestamp = null;

        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentCount = Math.floor(progress * target);

          el.textContent = currentCount + suffix;

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.textContent = target + suffix;
          }
        };

        window.requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

// ----- Linkar Escutadores (Fallback) -----
function initEventListeners() {
  const elements = getModalElements();

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      window.openModal(card.dataset.service);
    });
  });

  if (elements.modalClose) elements.modalClose.addEventListener('click', window.closeModal);
  if (elements.manifestoClose) elements.manifestoClose.addEventListener('click', window.closeManifesto);
  if (elements.hubClose) elements.hubClose.addEventListener('click', window.closeContactHub);

  // Escutadores para Esc e Clicar fora
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeModal();
      window.closeManifesto();
      window.closeContactHub();
    }
  });

  // Smooth Scroll for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === 'javascript:void(0)') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.closeMobile) window.closeMobile();
        history.pushState(null, null, href);
      }
    });
  });
}

// ----- Digital Footprint Scanner (The Scarespot) -----
function initScanner() {
  const btn = document.getElementById('reveal-scanner');
  const results = document.getElementById('scanner-results');
  const wrap = document.querySelector('.scanner-wrap');
  const fill = document.getElementById('exposure-fill');
  const pct = document.getElementById('exposure-pct');

  if (!btn || !results) return;

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.innerHTML = '<span class="loading-dots">Escaneando Vulnerabilidades</span>';
    wrap.classList.add('scanning');

    // 1. Coleta dados locais
    const ua = navigator.userAgent;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date().toLocaleTimeString();

    // Hardware
    const cores = navigator.hardwareConcurrency || 'N/A';
    const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : 'N/A';
    const touch = navigator.maxTouchPoints > 0 ? 'Detectado' : 'Não';

    // Conexão
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const connType = conn ? `${conn.effectiveType || ''} ${conn.type || ''}`.trim() : 'N/A';

    // Bateria
    let batteryInfo = 'Capturando...';
    try {
      const battery = await navigator.getBattery();
      batteryInfo = `${Math.round(battery.level * 100)}% (${battery.charging ? 'Carregando' : 'Descarregando'})`;
    } catch (e) { batteryInfo = 'Bloqueado'; }

    // 2. Busca dados de IP (API Externa)
    let ipData = null;
    try {
      const response = await fetch('https://ipapi.co/json/');
      ipData = await response.json();
    } catch (err) { console.error('Erro IP:', err); }

    // 3. Sequência de Revelação Dramática
    setTimeout(() => {
      wrap.classList.remove('scanning');
      results.classList.add('active');
      btn.style.display = 'none';

      const dataPoints = [
        { id: 'scan-ip', val: ipData?.ip || 'Detectado via AdBlock' },
        { id: 'scan-location', val: ipData ? `${ipData.city}, ${ipData.region}` : 'Oculto via VPN' },
        { id: 'scan-isp', val: ipData?.org || 'Provedor Privado' },
        { id: 'scan-browser', val: `${getBrowser(ua)} / ${getOS(ua)}` },
        { id: 'scan-screen', val: screenRes },
        { id: 'scan-battery', val: batteryInfo },
        { id: 'scan-hardware', val: `${cores} Cores / ${ram} RAM` },
        { id: 'scan-tz', val: `${timezone} (${now})` },
        { id: 'scan-conn', val: connType },
        { id: 'scan-touch', val: touch }
      ];

      let current = 0;
      const interval = setInterval(() => {
        if (current >= dataPoints.length) {
          clearInterval(interval);
          return;
        }

        const pt = dataPoints[current];
        const el = document.getElementById(pt.id);
        if (el) {
          el.textContent = pt.val;
          el.style.animation = 'fadeIn 0.5s forwards';
        }

        current++;
        const progress = (current / dataPoints.length) * 100;
        fill.style.width = `${progress}%`;
        pct.textContent = `${Math.round(progress)}%`;
      }, 150);

      results.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  });
}

function getBrowser(ua) {
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Navegador';
}

function getOS(ua) {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'OS';
}

// Injection of Common Modals (To avoid redundancy in HTML files)
function injectCommonModals() {
  const modalHTML = `
    <!-- MODAL SERVIÇOS -->
    <div id="service-modal" class="modal-overlay" role="dialog" aria-modal="true">
      <div class="modal-box">
        <button class="modal-close" id="modal-close" aria-label="Fechar">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div class="modal-icon" id="modal-icon"></div>
        <h3 class="modal-title" id="modal-title"></h3>
        <p class="modal-desc" id="modal-desc"></p>
        <ul class="modal-list" id="modal-list"></ul>
        <a href="javascript:void(0)" class="modal-cta" id="modal-cta" onclick="window.openContactHub()">Quero saber mais</a>
      </div>
    </div>

    <!-- CONTACT HUB (Centralizado) -->
    <div id="contact-hub" class="hub-overlay" role="dialog" aria-modal="true">
      <div class="hub-box">
        <button class="hub-close" id="hub-close" aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="hub-header">
          <h2 class="hub-title">Vamos conversar?</h2>
          <p class="hub-desc">Escolha o seu canal preferido para atendimento imediato.</p>
        </div>
        <div class="hub-options">
          <a href="https://wa.me/5517991899553" target="_blank" class="hub-btn whatsapp">
            <div class="hub-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div class="hub-info"><span class="hub-label">WhatsApp</span><span class="hub-val">(17) 99189-9553</span></div>
          </a>
          <a href="https://t.me/privyon_suporte" target="_blank" class="hub-btn telegram">
            <div class="hub-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </div>
            <div class="hub-info"><span class="hub-label">Telegram</span><span class="hub-val">@privyon_suporte</span></div>
          </a>
          <a href="mailto:privyon@protonmail.com" class="hub-btn email">
            <div class="hub-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div class="hub-info"><span class="hub-label">E-mail Corporativo</span><span class="hub-val">privyon@protonmail.com</span></div>
          </a>
        </div>
        <div class="hub-footer"><p>Ou continue rolando para usar o formulário tradicional.</p></div>
      </div>
    </div>
  `;
  
  if (!document.getElementById('contact-hub')) {
    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);
  }
}

function renderScannerGrid() {
  const container = document.querySelector('.scanner-groups');
  if (!container) return;

  // Limpa containers hardcoded se existirem para evitar duplicidade
  container.innerHTML = `
    <div class="scanner-group">
      <h3 class="group-title">DADOS COLETADOS PELO NAVEGADOR</h3>
      <div class="scanner-grid" id="dynamic-scanner-grid">
      </div>
    </div>
  `;

  const grid = document.getElementById('dynamic-scanner-grid');
  SCANNER_DATA.forEach(item => {
    const card = document.createElement('div');
    card.className = `data-card ${item.wide ? 'wide' : ''}`;
    card.innerHTML = `
      <div class="data-icon">${item.icon}</div>
      <div class="data-content">
        <label>${item.label}</label>
        <div class="data-val" id="${item.id}">---</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Inicialização Final
let isInitialized = false;
function initApp() {
  if (isInitialized) return;
  isInitialized = true;
  injectCommonModals();
  renderScannerGrid();
  initEventListeners();
  initCounters();
  initScanner();
}

document.addEventListener('DOMContentLoaded', initApp);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApp();
}
