const courses = [
    {
        id: 1,
        name: "Mastering Notion",
        shortName: "Notion Completo",
        description: "Aprenda a organizar sua vida com Notion. Templates, automações e produtividade.",
        price: 197.00,
        image: "notion",
        tags: ["Produtividade", "Iniciante", "10+ horas"],
        category: "ferramentas"
    },
    {
        id: 2,
        name: "Obsidian para Notas",
        shortName: "Obsidian Básico",
        description: "Domine o Obsidian para criar um sistema de notas inteligente e conectado.",
        price: 147.00,
        image: "obsidian",
        tags: ["Notas", "Intermediário", "8+ horas"],
        category: "ferramentas"
    },
    {
        id: 3,
        name: "Automação com Notion",
        shortName: "Notion Automations",
        description: "Crie automações poderosas com Notion, Google Sheets e Zapier.",
        price: 247.00,
        image: "automation",
        tags: ["Avançado", "Automação", "12+ horas"],
        category: "ferramentas"
    },
    {
        id: 4,
        name: "Second Brain Builder",
        shortName: "Second Brain",
        description: "Construa seu segundo cérebro digital com Obsidian e metodologia PARA.",
        price: 297.00,
        image: "secondbrain",
        tags: ["Avançado", "Metodologia", "15+ horas"],
        category: "produtividade"
    },
    {
        id: 5,
        name: "Gestão de Projetos Ágil",
        shortName: "Projetos Ágeis",
        description: "Aprenda metodologias ágeis e aplique com ferramentas modernas.",
        price: 177.00,
        image: "agile",
        tags: ["Gestão", "Intermediário", "6+ horas"],
        category: "gestao"
    },
    {
        id: 6,
        name: "Fundamentos de IA",
        shortName: "IA para Todos",
        description: "Introdução à Inteligência Artificial para uso pessoal e profissional.",
        price: 127.00,
        image: "ia",
        tags: ["IA", "Iniciante", "4+ horas"],
        category: "tech"
    },
    {
        id: 7,
        name: "Setup de Produtividade",
        shortName: "Setup Perfect",
        description: "Configure seu ambiente de trabalho digital ideal para máxima produtividade.",
        price: 97.00,
        image: "setup",
        tags: ["Setup", "Iniciante", "3+ horas"],
        category: "produtividade"
    },
    {
        id: 8,
        name: "Python para Automação",
        shortName: "Python Automação",
        description: "Aprenda Python para automatizar tarefas repetitivas do seu dia a dia.",
        price: 297.00,
        image: "python",
        tags: ["Programação", "Intermediário", "20+ horas"],
        category: "programacao"
    },
    {
        id: 9,
        name: "No-Code para Empreendedores",
        shortName: "No-Code Master",
        description: "Crie aplicativos e ferramentas sem precisar saber programar.",
        price: 247.00,
        image: "nocode",
        tags: ["No-Code", "Iniciante", "10+ horas"],
        category: "programacao"
    },
    {
        id: 10,
        name: "Google Workspace Completo",
        shortName: "Google Workspace",
        description: "Domine todas as ferramentas do Google para trabalho remoto.",
        price: 147.00,
        image: "google",
        tags: ["Google", "Iniciante", "8+ horas"],
        category: "ferramentas"
    },
    {
        id: 11,
        name: "Gestão Financeira Pessoal",
        shortName: "Finanças Pessoais",
        description: "Organize suas finanças com planilhas, Notion e metodologias эффективные.",
        price: 127.00,
        image: "finance",
        tags: ["Finanças", "Iniciante", "5+ horas"],
        category: "produtividade"
    },
    {
        id: 12,
        name: "Membership Bundle",
        shortName: "Bundle Completo",
        description: "Acesso a todos os cursos + atualizações vitalícias.",
        price: 497.00,
        image: "bundle",
        tags: ["Completo", "Vitalício", "50+ horas"],
        category: "bundle"
    }
];

function getCourses() {
    return courses;
}

function getCourseById(id) {
    return courses.find(c => c.id === id);
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

const courseImages = {
    'notion': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" fill="currentColor"/></svg>`,
    'obsidian': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'automation': `<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    'secondbrain': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'agile': `<svg viewBox="0 0 24 24" fill="none"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'ia': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'setup': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'python': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C7.5 2 7.5 6 7.5 6l3 3s-1.5 1.5-1.5 3c0 2 2 3.5 4.5 3.5s4.5-1.5 4.5-3.5c0-1.5-1.5-3-1.5-3l3-3s0-4-4.5-4z" stroke="currentColor" stroke-width="1.5"/><path d="M9.5 14.5h5" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'nocode': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`,
    'google': `<svg viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,
    'finance': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    'bundle': `<svg viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" stroke-width="1.5"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courses, getCourses, getCourseById, formatPrice, courseImages };
}