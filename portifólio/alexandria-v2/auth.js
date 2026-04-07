/* =========================================
   Alexandria — Authentication System
   ========================================= */

const Auth = {
    login(email, password) {
        const user = DB.getUserByEmail(email);
        if (!user) return { success: false, message: 'Usuário não encontrado.' };
        if (user.password !== password) return { success: false, message: 'Senha incorreta.' };
        if (!user.active) return { success: false, message: 'Conta desativada.' };

        const session = { userId: user.id, role: user.role, name: user.name, email: user.email };
        localStorage.setItem(DB_KEYS.session, JSON.stringify(session));
        return { success: true, user: session };
    },

    logout() {
        localStorage.removeItem(DB_KEYS.session);
        window.location.href = this._getBasePath() + 'index.html';
    },

    register(data) {
        if (DB.getUserByEmail(data.email)) {
            return { success: false, message: 'Email já cadastrado.' };
        }
        const user = DB.addUser({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || 'aluno',
            avatar: '',
            bio: ''
        });
        // Auto-login
        const session = { userId: user.id, role: user.role, name: user.name, email: user.email };
        localStorage.setItem(DB_KEYS.session, JSON.stringify(session));
        return { success: true, user: session };
    },

    getSession() {
        const data = localStorage.getItem(DB_KEYS.session);
        return data ? JSON.parse(data) : null;
    },

    isLoggedIn() {
        return this.getSession() !== null;
    },

    getRole() {
        const session = this.getSession();
        return session ? session.role : null;
    },

    getCurrentUser() {
        const session = this.getSession();
        if (!session) return null;
        return DB.getUserById(session.userId);
    },

    _getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/admin/') || path.includes('/professor/')) {
            return '../';
        }
        return '';
    },

    requireAuth(allowedRoles = []) {
        if (!this.isLoggedIn()) {
            window.location.href = this._getBasePath() + 'login.html';
            return false;
        }
        if (allowedRoles.length > 0 && !allowedRoles.includes(this.getRole())) {
            window.location.href = this._getBasePath() + 'index.html';
            return false;
        }
        return true;
    },

    redirectIfLoggedIn() {
        if (this.isLoggedIn()) {
            const role = this.getRole();
            const base = this._getBasePath();
            switch (role) {
                case 'admin': window.location.href = base + 'admin/dashboard.html'; break;
                case 'professor': window.location.href = base + 'professor/dashboard.html'; break;
                case 'aluno': window.location.href = base + 'meus-cursos.html'; break;
                default: window.location.href = base + 'index.html';
            }
        }
    },

    getDashboardUrl() {
        const role = this.getRole();
        const base = this._getBasePath();
        switch (role) {
            case 'admin': return base + 'admin/dashboard.html';
            case 'professor': return base + 'professor/dashboard.html';
            case 'aluno': return base + 'meus-cursos.html';
            default: return base + 'index.html';
        }
    }
};

/* ---------- Header Auth UI ---------- */

function renderAuthHeader() {
    const session = Auth.getSession();
    const authContainer = document.getElementById('authHeaderActions');
    const basePath = Auth._getBasePath();

    // Desktop header auth
    if (authContainer) {
        if (session) {
            authContainer.innerHTML = `
                <div class="user-menu">
                    <button class="user-menu-btn" onclick="toggleUserMenu()" id="userMenuBtn">
                        <div class="user-avatar-small">${session.name.charAt(0).toUpperCase()}</div>
                        <span class="user-name-header">${session.name.split(' ')[0]}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="${Auth.getDashboardUrl()}" class="dropdown-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                            Meu Painel
                        </a>
                        ${session.role === 'aluno' ? `<a href="${basePath}meus-cursos.html" class="dropdown-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                            Meus Cursos
                        </a>` : ''}
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item dropdown-logout" onclick="Auth.logout()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            Sair
                        </button>
                    </div>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="${basePath}login.html" class="btn btn-sm">Entrar</a>
                <a href="${basePath}registro.html" class="btn btn-sm btn-primary">Cadastrar</a>
            `;
        }
    }

    // Mobile menu auth
    renderMobileMenuAuth(session, basePath);
}

function renderMobileMenuAuth(session, basePath) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu) return;

    // Remove existing auth section if any
    const existingAuth = mobileMenu.querySelector('.mobile-menu-auth');
    if (existingAuth) existingAuth.remove();

    const authDiv = document.createElement('div');
    authDiv.className = 'mobile-menu-auth';

    if (session) {
        authDiv.innerHTML = `
            <a href="${Auth.getDashboardUrl()}" class="mobile-nav-link" onclick="closeMobileMenu()" style="font-size:1.5rem;">Meu Painel</a>
            ${session.role === 'aluno' ? `<a href="${basePath}meus-cursos.html" class="mobile-nav-link" onclick="closeMobileMenu()" style="font-size:1.5rem;">Meus Cursos</a>` : ''}
            <button class="btn btn-primary" onclick="Auth.logout()" style="margin-top:0.5rem;">Sair</button>
        `;
    } else {
        authDiv.innerHTML = `
            <a href="${basePath}login.html" class="btn" onclick="closeMobileMenu()">Entrar</a>
            <a href="${basePath}registro.html" class="btn btn-primary" onclick="closeMobileMenu()">Cadastrar</a>
        `;
    }

    mobileMenu.appendChild(authDiv);
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('open');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    const btn = document.getElementById('userMenuBtn');
    if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

/* ---------- Hamburger Menu ---------- */

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburgerBtn');
    if (menu && hamburger) {
        menu.classList.toggle('open');
        hamburger.classList.toggle('open');
        // Prevent body scroll when menu is open
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburgerBtn');
    if (menu) menu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

// Close mobile menu on link click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-nav-link')) {
        closeMobileMenu();
    }
});

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    renderAuthHeader();
});
