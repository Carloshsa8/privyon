/* =========================================
   Alexandria — Course Data (Expanded)
   ========================================= */

const courses = [
    {
        id: 1,
        name: "Notion Completo: Do Zero ao Domínio Total",
        shortName: "Notion",
        description: "Domine o Notion do básico ao avançado. Organize sua vida, trabalho e projetos em um único lugar com templates profissionais.",
        longDescription: "Neste curso completo você vai aprender tudo sobre o Notion — desde a criação de páginas simples até sistemas avançados de gerenciamento de projetos. Inclui templates prontos para uso imediato, exercícios práticos e acesso à comunidade exclusiva.",
        price: 297,
        originalPrice: 497,
        category: "Notion",
        tags: ["Iniciante", "Organização", "Produtividade"],
        image: "notion",
        instructorId: 2,
        level: "Iniciante ao Avançado",
        duration: "32h de conteúdo",
        students: 1247,
        rating: 4.9,
        featured: true,
        published: true,
        modules: [
            {
                id: 1, title: "Fundamentos do Notion", lessons: [
                    { id: 1, title: "Introdução ao Notion", duration: "12:30", type: "video" },
                    { id: 2, title: "Criando sua primeira página", duration: "15:45", type: "video" },
                    { id: 3, title: "Blocos e formatação", duration: "18:20", type: "video" },
                    { id: 4, title: "Exercício prático", duration: "10:00", type: "exercise" }
                ]
            },
            {
                id: 2, title: "Databases e Propriedades", lessons: [
                    { id: 5, title: "O poder dos databases", duration: "20:15", type: "video" },
                    { id: 6, title: "Propriedades e filtros", duration: "22:30", type: "video" },
                    { id: 7, title: "Relacionamentos entre bases", duration: "25:00", type: "video" },
                    { id: 8, title: "Projeto: Sistema de CRM", duration: "30:00", type: "exercise" }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Second Brain com Obsidian",
        shortName: "Obsidian",
        description: "Construa seu segundo cérebro digital. Conecte ideias, crie notas interligadas e expanda seu conhecimento exponencialmente.",
        longDescription: "Aprenda o método Zettelkasten adaptado para o Obsidian. Transforme notas soltas em uma rede de conhecimento interconectada. Do conceito à implementação prática com plugins essenciais.",
        price: 297,
        originalPrice: 447,
        category: "Obsidian",
        tags: ["Avançado", "Notas", "PKM"],
        image: "obsidian",
        instructorId: 2,
        level: "Intermediário",
        duration: "28h de conteúdo",
        students: 892,
        rating: 4.8,
        featured: true,
        published: true,
        modules: [
            {
                id: 1, title: "Fundamentos do PKM", lessons: [
                    { id: 1, title: "O que é Personal Knowledge Management", duration: "15:00", type: "video" },
                    { id: 2, title: "Instalando e configurando Obsidian", duration: "12:00", type: "video" },
                    { id: 3, title: "Markdown essencial", duration: "18:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Links e Grafos", lessons: [
                    { id: 4, title: "Backlinks e referências", duration: "20:00", type: "video" },
                    { id: 5, title: "Graph View na prática", duration: "16:00", type: "video" },
                    { id: 6, title: "Templates e Daily Notes", duration: "22:00", type: "video" },
                    { id: 7, title: "Projeto: Seu Second Brain", duration: "35:00", type: "exercise" }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Automações com Zapier",
        shortName: "Zapier",
        description: "Automatize tarefas repetitivas e ganhe horas de produtividade todos os dias com workflows inteligentes.",
        longDescription: "Elimine trabalho manual criando automações poderosas no Zapier. Conecte mais de 5.000 apps e crie workflows que trabalham por você 24/7. Inclui 20+ templates de automação prontos.",
        price: 347,
        originalPrice: 547,
        category: "Automação",
        tags: ["Intermediário", "Automação", "Integração"],
        image: "zapier",
        instructorId: 2,
        level: "Intermediário",
        duration: "24h de conteúdo",
        students: 634,
        rating: 4.7,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Introdução ao Zapier", lessons: [
                    { id: 1, title: "O que é automação", duration: "10:00", type: "video" },
                    { id: 2, title: "Triggers e Actions", duration: "18:00", type: "video" },
                    { id: 3, title: "Seu primeiro Zap", duration: "20:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Automações Avançadas", lessons: [
                    { id: 4, title: "Multi-step Zaps", duration: "25:00", type: "video" },
                    { id: 5, title: "Filtros e Paths", duration: "22:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Google Sheets Avançado",
        shortName: "Sheets",
        description: "Domine fórmulas avançadas, macros e automações no Google Sheets para análise e visualização de dados.",
        longDescription: "Vá além do básico e domine Google Sheets como um profissional. Aprenda QUERY, ARRAYFORMULA, Apps Script e crie dashboards interativos. Ideal para analistas de dados e gestores.",
        price: 247,
        originalPrice: 397,
        category: "Google",
        tags: ["Intermediário", "Dados", "Excel"],
        image: "sheets",
        instructorId: 2,
        level: "Intermediário ao Avançado",
        duration: "26h de conteúdo",
        students: 456,
        rating: 4.6,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Fórmulas Avançadas", lessons: [
                    { id: 1, title: "QUERY e ARRAYFORMULA", duration: "25:00", type: "video" },
                    { id: 2, title: "IMPORTRANGE e conexões", duration: "18:00", type: "video" },
                    { id: 3, title: "Funções de texto e data", duration: "20:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Apps Script", lessons: [
                    { id: 4, title: "Introdução ao Apps Script", duration: "22:00", type: "video" },
                    { id: 5, title: "Macros e automações", duration: "28:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "ChatGPT Master: IA na Prática",
        shortName: "ChatGPT",
        description: "Aprenda a usar IA generativa para aumentar sua produtividade 10x em qualquer área profissional.",
        longDescription: "Domine o ChatGPT e outras IAs generativas. Aprenda técnicas avançadas de prompting, crie workflows com IA e automatize tarefas complexas. Do iniciante ao power user em semanas.",
        price: 197,
        originalPrice: 347,
        category: "IA",
        tags: ["Iniciante", "IA", "Produtividade"],
        image: "chatgpt",
        instructorId: 3,
        level: "Iniciante",
        duration: "20h de conteúdo",
        students: 2103,
        rating: 4.9,
        featured: true,
        published: true,
        modules: [
            {
                id: 1, title: "Fundamentos de IA", lessons: [
                    { id: 1, title: "Como funciona o ChatGPT", duration: "15:00", type: "video" },
                    { id: 2, title: "Anatomia de um bom prompt", duration: "20:00", type: "video" },
                    { id: 3, title: "Técnicas de prompting", duration: "25:00", type: "video" }
                ]
            },
            {
                id: 2, title: "IA no Trabalho", lessons: [
                    { id: 4, title: "IA para escrita e conteúdo", duration: "22:00", type: "video" },
                    { id: 5, title: "IA para análise de dados", duration: "18:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Workflows com Make (Integromat)",
        shortName: "Make",
        description: "Crie automações visuais complexas sem código. Integre centenas de apps e automatize processos completos.",
        longDescription: "Make (antigo Integromat) é a ferramenta definitiva para automações visuais. Aprenda a criar cenários complexos, usar iteradores, roteadores e conectar qualquer API.",
        price: 347,
        originalPrice: 497,
        category: "Automação",
        tags: ["Avançado", "Automação", "Integração"],
        image: "make",
        instructorId: 2,
        level: "Avançado",
        duration: "30h de conteúdo",
        students: 389,
        rating: 4.7,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Introdução ao Make", lessons: [
                    { id: 1, title: "Interface e conceitos", duration: "15:00", type: "video" },
                    { id: 2, title: "Módulos e conexões", duration: "20:00", type: "video" },
                    { id: 3, title: "Primeiro cenário", duration: "25:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Cenários Avançados", lessons: [
                    { id: 4, title: "Roteadores e filtros", duration: "22:00", type: "video" },
                    { id: 5, title: "Webhooks e APIs", duration: "28:00", type: "video" },
                    { id: 6, title: "Error handling", duration: "18:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 7,
        name: "Todoist Professional",
        shortName: "Todoist",
        description: "Organize suas tarefas com técnicas avançadas de produtividade. GTD, time-blocking e mais.",
        longDescription: "Transforme o Todoist em sua central de produtividade. Aprenda GTD, time-blocking, Eisenhower Matrix e mais — tudo implementado no Todoist com filtros avançados e integrações.",
        price: 197,
        originalPrice: 297,
        category: "Produtividade",
        tags: ["Iniciante", "Tarefas", "Gestão"],
        image: "todoist",
        instructorId: 2,
        level: "Iniciante",
        duration: "16h de conteúdo",
        students: 567,
        rating: 4.5,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Produtividade Essencial", lessons: [
                    { id: 1, title: "Configurando o Todoist", duration: "12:00", type: "video" },
                    { id: 2, title: "Projetos e seções", duration: "15:00", type: "video" },
                    { id: 3, title: "Filtros e labels", duration: "18:00", type: "video" },
                    { id: 4, title: "Método GTD no Todoist", duration: "25:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 8,
        name: "Excel VBA Master",
        shortName: "Excel VBA",
        description: "Automatize planilhas com macros e VBA. Execute tarefas complexas com um clique.",
        longDescription: "Aprenda a programar em VBA para Excel e transforme planilhas em ferramentas poderosas de automação. UserForms, conexão com bancos de dados e muito mais.",
        price: 397,
        originalPrice: 597,
        category: "Google",
        tags: ["Avançado", "Excel", "Automação"],
        image: "excel",
        instructorId: 2,
        level: "Avançado",
        duration: "35h de conteúdo",
        students: 312,
        rating: 4.8,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "VBA Essencial", lessons: [
                    { id: 1, title: "O editor VBA", duration: "15:00", type: "video" },
                    { id: 2, title: "Variáveis e tipos", duration: "20:00", type: "video" },
                    { id: 3, title: "Loops e condicionais", duration: "25:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Projetos Práticos", lessons: [
                    { id: 4, title: "UserForms profissionais", duration: "30:00", type: "video" },
                    { id: 5, title: "Automação de relatórios", duration: "35:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 9,
        name: "Notion Templates Pack Pro",
        shortName: "Templates",
        description: "Coleção premium de templates prontos: Planner, Journal, Business, CRM e mais de 50 templates.",
        longDescription: "Mais de 50 templates profissionais para Notion prontos para usar. Planner anual, Journal, Sistema de CRM, Gerenciador de projetos, Dashboard financeiro e muito mais.",
        price: 147,
        originalPrice: 247,
        category: "Notion",
        tags: ["Iniciante", "Templates", "Organização"],
        image: "notion",
        instructorId: 2,
        level: "Todos os níveis",
        duration: "8h de conteúdo",
        students: 1890,
        rating: 4.7,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Templates Pessoais", lessons: [
                    { id: 1, title: "Planner Anual", duration: "12:00", type: "video" },
                    { id: 2, title: "Journal Digital", duration: "10:00", type: "video" },
                    { id: 3, title: "Habit Tracker", duration: "08:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Templates Business", lessons: [
                    { id: 4, title: "CRM Completo", duration: "20:00", type: "video" },
                    { id: 5, title: "Project Management", duration: "18:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 10,
        name: "IA para Negócios: Automatize e Escale",
        shortName: "IA Biz",
        description: "Use IA para automatizar atendimentos, criar conteúdo em escala e vender mais todos os dias.",
        longDescription: "Transforme seu negócio com Inteligência Artificial. Automatize atendimento ao cliente, geração de conteúdo, análise de dados e processos de vendas com ferramentas de IA.",
        price: 447,
        originalPrice: 697,
        category: "IA",
        tags: ["Avançado", "Negócios", "IA"],
        image: "chatgpt",
        instructorId: 3,
        level: "Avançado",
        duration: "40h de conteúdo",
        students: 278,
        rating: 4.9,
        featured: true,
        published: true,
        modules: [
            {
                id: 1, title: "IA Estratégica", lessons: [
                    { id: 1, title: "Mapeando processos para IA", duration: "20:00", type: "video" },
                    { id: 2, title: "Chatbots inteligentes", duration: "25:00", type: "video" },
                    { id: 3, title: "Geração de conteúdo em escala", duration: "30:00", type: "video" }
                ]
            },
            {
                id: 2, title: "IA Aplicada", lessons: [
                    { id: 4, title: "Automação de vendas", duration: "28:00", type: "video" },
                    { id: 5, title: "Análise preditiva", duration: "22:00", type: "video" },
                    { id: 6, title: "Caso prático completo", duration: "40:00", type: "exercise" }
                ]
            }
        ]
    },
    {
        id: 11,
        name: "Keyboard Shortcuts Master",
        shortName: "Atalhos",
        description: "Domine atalhos de teclado para trabalhar 3x mais rápido em qualquer programa ou sistema.",
        longDescription: "Pare de perder tempo com o mouse. Aprenda mais de 200 atalhos essenciais para Windows, Mac, Chrome, VS Code, Office e mais. Inclui exercícios gamificados.",
        price: 97,
        originalPrice: 147,
        category: "Produtividade",
        tags: ["Iniciante", "Atalhos", "Velocidade"],
        image: "keyboard",
        instructorId: 2,
        level: "Iniciante",
        duration: "10h de conteúdo",
        students: 1456,
        rating: 4.4,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Atalhos Essenciais", lessons: [
                    { id: 1, title: "Sistema Operacional", duration: "15:00", type: "video" },
                    { id: 2, title: "Navegador e Web", duration: "12:00", type: "video" },
                    { id: 3, title: "Office e Produtividade", duration: "18:00", type: "video" }
                ]
            }
        ]
    },
    {
        id: 12,
        name: "Obsidian Plugins Essenciais",
        shortName: "Plugins",
        description: "Aprenda a usar os melhores plugins do Obsidian para potencializar seu segundo cérebro digital.",
        longDescription: "Descubra e domine os 30 plugins mais poderosos do Obsidian. Dataview, Templater, Calendar, Kanban e muito mais. Transforme o Obsidian na ferramenta definitiva de produtividade.",
        price: 247,
        originalPrice: 347,
        category: "Obsidian",
        tags: ["Avançado", "Plugins", "Personalização"],
        image: "obsidian",
        instructorId: 2,
        level: "Avançado",
        duration: "22h de conteúdo",
        students: 445,
        rating: 4.6,
        featured: false,
        published: true,
        modules: [
            {
                id: 1, title: "Plugins Essenciais", lessons: [
                    { id: 1, title: "Dataview: consultas poderosas", duration: "25:00", type: "video" },
                    { id: 2, title: "Templater: templates dinâmicos", duration: "20:00", type: "video" },
                    { id: 3, title: "Calendar e Periodic Notes", duration: "15:00", type: "video" }
                ]
            },
            {
                id: 2, title: "Plugins Avançados", lessons: [
                    { id: 4, title: "Kanban e Tasks", duration: "22:00", type: "video" },
                    { id: 5, title: "Excalidraw e mapas mentais", duration: "18:00", type: "video" }
                ]
            }
        ]
    }
];

const courseImages = {
    notion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/></svg>`,
    obsidian: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`,
    zapier: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    sheets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
    chatgpt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12"/><path d="M12 6v6l4 2"/></svg>`,
    make: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>`,
    todoist: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    excel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8l8 8M16 8l-8 8"/></svg>`,
    keyboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg>`
};

function getCourses() {
    return courses.filter(c => c.published);
}

function getAllCourses() {
    return courses;
}

function getCourseById(id) {
    return courses.find(c => c.id === parseInt(id));
}

function getCoursesByInstructor(instructorId) {
    return courses.filter(c => c.instructorId === instructorId);
}

function getFeaturedCourses() {
    return courses.filter(c => c.featured && c.published);
}

function getCategories() {
    return [...new Set(courses.map(c => c.category))];
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
