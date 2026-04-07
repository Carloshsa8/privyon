const courses = [
    {
        id: 1,
        name: "Notion Completo",
        shortName: "Notion",
        description: "Domine o Notion do básico ao avançado. Organize sua vida, trabalho e projetos em um único lugar.",
        price: 297,
        category: "Notion",
        tags: ["Iniciante", "Organização", "Produtividade"],
        image: "notion"
    },
    {
        id: 2,
        name: "Second Brain com Obsidian",
        shortName: "Obsidian",
        description: "Construa seu segundo cérebro. Conecte ideias, crie notas interligadas e expanda seu conhecimento.",
        price: 297,
        category: "Obsidian",
        tags: ["Avançado", "Notas", "PKM"],
        image: "obsidian"
    },
    {
        id: 3,
        name: "Automações com Zapier",
        shortName: "Zapier",
        description: "Automatize tarefas repetitivas e ganhe horas de produtividade todos os dias.",
        price: 347,
        category: "Automação",
        tags: ["Intermediário", "Automação", "Integração"],
        image: "zapier"
    },
    {
        id: 4,
        name: "Google Sheets Avançado",
        shortName: "Sheets",
        description: "Domine fórmulas, macros e automações no Google Sheets para análise de dados.",
        price: 247,
        category: "Google",
        tags: ["Intermediário", "Dados", "Excel"],
        image: "sheets"
    },
    {
        id: 5,
        name: "ChatGPT Master",
        shortName: "ChatGPT",
        description: "Aprenda a usar IA para aumentar sua produtividade 10x em qualquer área.",
        price: 197,
        category: "IA",
        tags: ["Iniciante", "IA", "Produtividade"],
        image: "chatgpt"
    },
    {
        id: 6,
        name: "Workflows com Make",
        shortName: "Make",
        description: "Crie automações complexas sem código. Integre centenas de apps e automatize tudo.",
        price: 347,
        category: "Automação",
        tags: ["Avançado", "Automação", "Integração"],
        image: "make"
    },
    {
        id: 7,
        name: "Todoist Professional",
        shortName: "Todoist",
        description: "Organize suas tarefas e projetos com técnicas avançadas de produtividade.",
        price: 197,
        category: "Produtividade",
        tags: ["Iniciante", "Tarefas", "Gestão"],
        image: "todoist"
    },
    {
        id: 8,
        name: "Excel VBA Master",
        shortName: "Excel VBA",
        description: "Automatize planilhas com macros e VBA. Execute tarefas repetitivas automaticamente.",
        price: 397,
        category: "Google",
        tags: ["Avançado", "Excel", "Automação"],
        image: "excel"
    },
    {
        id: 9,
        name: " notion Templates Pack",
        shortName: "Templates",
        description: "Coleção de templates prontos para Notion: Planner, Journal, Business e mais.",
        price: 147,
        category: "Notion",
        tags: ["Iniciante", "Templates", "Organização"],
        image: "notion"
    },
    {
        id: 10,
        name: "IA para Negócios",
        shortName: "IA Biz",
        description: "Use IA para automatizar atendimentos, criar conteúdo e vender mais.",
        price: 447,
        category: "IA",
        tags: ["Avançado", "Negócios", "IA"],
        image: "chatgpt"
    },
    {
        id: 11,
        name: "Keyboard Shortcuts",
        shortName: "Atalhos",
        description: "Domine atalhos de teclado para trabalhar 3x mais rápido em qualquer programa.",
        price: 97,
        category: "Produtividade",
        tags: ["Iniciante", "Atalhos", "Velocidade"],
        image: "keyboard"
    },
    {
        id: 12,
        name: "Obsidian Plugins",
        shortName: "Plugins",
        description: "Aprenda a usar os melhores plugins do Obsidian para potencializar seu second brain.",
        price: 247,
        category: "Obsidian",
        tags: ["Avançado", "Plugins", "Personalização"],
        image: "obsidian"
    }
];

const courseImages = {
    notion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/></svg>`,
    obsidian: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`,
    zapier: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    sheets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
    chatgpt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12"/><path d="M12 6v6l4 2"/></svg>`,
    make: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>`
};

function getCourses() {
    return courses;
}

function getCourseById(id) {
    return courses.find(c => c.id === id);
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}
