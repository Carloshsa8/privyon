const services = [
    {
        id: 1,
        name: "Desvinculação de Big Techs",
        shortName: "Desvinculação Big Techs",
        description: "Ajudamos você a migrar seus dados e serviços para alternativas que respeitam sua privacidade, sem complicação.",
        price: 499.90,
        icon: "shield-off",
        tags: ["Migração", "Privacidade", "Google Exit"],
        category: "consultoria"
    },
    {
        id: 2,
        name: "Configuração de Email Privado",
        shortName: "Email Privado",
        description: "Configure seu email com criptografia de ponta a ponta, livre de rastreamento e leitura por terceiros.",
        price: 299.90,
        icon: "mail",
        tags: ["Criptografia", "ProtonMail", "Tutanota"],
        category: "configuracao"
    },
    {
        id: 3,
        name: "Nuvem Soberana",
        shortName: "Nuvem Soberana",
        description: "Armazene seus arquivos em serviços de nuvem que você controla, sem que ninguém acesso sem permissão.",
        price: 349.90,
        icon: "cloud",
        tags: ["Nextcloud", "Criptografia", "Backup"],
        category: "configuracao"
    },
    {
        id: 4,
        name: "Gestão de Senhas",
        shortName: "Gestão de Senhas",
        description: "Ferramentas seguras para gerenciar suas credenciais digitais e proteger sua identidade online.",
        price: 199.90,
        icon: "key",
        tags: ["Bitwarden", "2FA", "KeePass"],
        category: "configuracao"
    },
    {
        id: 5,
        name: "Backup Seguro",
        shortName: "Backup Seguro",
        description: "Backups criptografados e automáticos dos seus dados importantes, sem depender de grandes plataformas.",
        price: 279.90,
        icon: "save",
        tags: ["Duplicati", "Cryptomator", "VeraCrypt"],
        category: "configuracao"
    },
    {
        id: 6,
        name: "Auditoria de Privacidade",
        shortName: "Auditoria",
        description: "Análise completa da sua pegada digital para identificar onde seus dados estão expostos e como corrigi-los.",
        price: 399.90,
        icon: "search",
        tags: ["Diagnóstico", "Relatório", "Recomendações"],
        category: "consultoria"
    },
    {
        id: 7,
        name: "Plano de Segurança Básico",
        shortName: "Segurança Básico",
        description: "Kit inicial de proteção: gerenciador de senhas, navegador privado, búsqueda segura e configuração básica.",
        price: 249.90,
        icon: "lock",
        tags: ["Iniciantes", "Kit Inicial", "4 ferramentas"],
        category: "plano"
    },
    {
        id: 8,
        name: "Plano Proteção Completa",
        shortName: "Proteção Completa",
        description: "Pacote completo: tudo do básico + email privado + nuvem + monitoramento contínuo por 3 meses.",
        price: 799.90,
        icon: "shield",
        tags: ["Avançado", "6 meses suporte", "Tudo incluso"],
        category: "plano"
    },
    {
        id: 9,
        name: "Consultoria Mensal",
        shortName: "Consultoria Mensal",
        description: "Suporte contínuo mensal: reuniões de acompanhamento, atualizações de segurança e suporte via Signal.",
        price: 199.90,
        icon: "users",
        tags: ["Recorrente", "Mensal", "Suporte"],
        category: "assinatura"
    },
    {
        id: 10,
        name: "Configuração de Mensageiro Seguro",
        shortName: "Mensageiro Seguro",
        description: "Instale e configure Signal ou Session com seus contatos, com tutorial e suporte para migração.",
        price: 179.90,
        icon: "message",
        tags: ["Signal", "Session", "Migração"],
        category: "configuracao"
    },
    {
        id: 11,
        name: "Segurança Wi-Fi Doméstico",
        shortName: "Wi-Fi Seguro",
        description: "Análise e configuração de rede Wi-Fi: senhas fortes, criptografia WPA3, DNS seguro e isolamento de IoT.",
        price: 299.90,
        icon: "wifi",
        tags: ["Roteador", "WPA3", "NextDNS"],
        category: "consultoria"
    },
    {
        id: 12,
        name: "Plano Família",
        shortName: "Plano Família",
        description: "Proteção para toda a família: controle parental, dispositivos protegidos e monitoramento compartilhado.",
        price: 599.90,
        icon: "home",
        tags: ["Familia", "até 5 dispositivos", "Controle parental"],
        category: "plano"
    }
];

function getServices() {
    return services;
}

function getServiceById(id) {
    return services.find(s => s.id === id);
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

const icons = {
    'shield-off': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"/><path d="M4.73 4.73 4 5v7a11.64 11.64 0 0 0 .49 1.51"/><path d="M12 22s8-4 8-10V5"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
    'mail': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    'cloud': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    'key': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>`,
    'save': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>`,
    'search': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
    'lock': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    'shield': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    'users': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    'message': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    'wifi': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    'home': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { services, getServices, getServiceById, formatPrice, icons };
}