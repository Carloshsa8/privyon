/* =========================================
   Alexandria — Simulated Database (localStorage)
   ========================================= */

const DB_KEYS = {
    users: 'alexandria_users',
    courses: 'alexandria_courses',
    sales: 'alexandria_sales',
    enrollments: 'alexandria_enrollments',
    reviews: 'alexandria_reviews',
    settings: 'alexandria_settings',
    session: 'alexandria_session'
};

/* ---------- Default Data ---------- */

const defaultUsers = [
    {
        id: 1,
        name: 'Administrador',
        email: 'admin@alexandria.com',
        password: 'admin123',
        role: 'admin',
        avatar: '',
        bio: 'Administrador da plataforma Alexandria.',
        createdAt: '2026-01-01T00:00:00',
        active: true
    },
    {
        id: 2,
        name: 'Prof. Ricardo Mendes',
        email: 'prof@alexandria.com',
        password: 'prof123',
        role: 'professor',
        avatar: '',
        bio: 'Especialista em produtividade e ferramentas digitais com mais de 10 anos de experiência. Já treinou mais de 5.000 profissionais.',
        specialty: 'Produtividade & Automação',
        createdAt: '2026-01-15T00:00:00',
        active: true
    },
    {
        id: 3,
        name: 'Prof. Ana Beatriz',
        email: 'ana@alexandria.com',
        password: 'prof123',
        role: 'professor',
        avatar: '',
        bio: 'Desenvolvedora e educadora apaixonada por IA e tecnologia. Palestrante internacional.',
        specialty: 'Inteligência Artificial',
        createdAt: '2026-02-01T00:00:00',
        active: true
    },
    {
        id: 4,
        name: 'Carlos Silva',
        email: 'aluno@alexandria.com',
        password: 'aluno123',
        role: 'aluno',
        avatar: '',
        bio: '',
        createdAt: '2026-03-01T00:00:00',
        active: true
    },
    {
        id: 5,
        name: 'Maria Oliveira',
        email: 'maria@email.com',
        password: 'aluno123',
        role: 'aluno',
        avatar: '',
        bio: '',
        createdAt: '2026-03-10T00:00:00',
        active: true
    },
    {
        id: 6,
        name: 'João Santos',
        email: 'joao@email.com',
        password: 'aluno123',
        role: 'aluno',
        avatar: '',
        bio: '',
        createdAt: '2026-03-15T00:00:00',
        active: true
    }
];

const defaultSales = [
    { id: 1, userId: 4, courseId: 1, price: 297, status: 'completed', paymentMethod: 'pix', date: '2026-03-05T10:30:00' },
    { id: 2, userId: 4, courseId: 5, price: 197, status: 'completed', paymentMethod: 'cartao', date: '2026-03-05T10:30:00' },
    { id: 3, userId: 5, courseId: 1, price: 297, status: 'completed', paymentMethod: 'cartao', date: '2026-03-12T14:20:00' },
    { id: 4, userId: 5, courseId: 3, price: 347, status: 'completed', paymentMethod: 'pix', date: '2026-03-18T09:15:00' },
    { id: 5, userId: 6, courseId: 2, price: 297, status: 'completed', paymentMethod: 'boleto', date: '2026-03-20T18:00:00' },
    { id: 6, userId: 6, courseId: 5, price: 197, status: 'completed', paymentMethod: 'pix', date: '2026-03-22T11:45:00' },
    { id: 7, userId: 5, courseId: 10, price: 447, status: 'pending', paymentMethod: 'boleto', date: '2026-04-01T08:00:00' },
    { id: 8, userId: 4, courseId: 8, price: 397, status: 'completed', paymentMethod: 'cartao', date: '2026-04-02T16:30:00' },
    { id: 9, userId: 6, courseId: 4, price: 247, status: 'refunded', paymentMethod: 'pix', date: '2026-03-25T13:10:00' },
    { id: 10, userId: 4, courseId: 3, price: 347, status: 'completed', paymentMethod: 'pix', date: '2026-04-05T09:00:00' },
];

const defaultEnrollments = [
    { userId: 4, courseId: 1, progress: 75, completedLessons: [1,2,3,4,5,6], enrolledAt: '2026-03-05T10:30:00' },
    { userId: 4, courseId: 5, progress: 40, completedLessons: [1,2], enrolledAt: '2026-03-05T10:30:00' },
    { userId: 5, courseId: 1, progress: 100, completedLessons: [1,2,3,4,5,6,7,8], enrolledAt: '2026-03-12T14:20:00' },
    { userId: 5, courseId: 3, progress: 20, completedLessons: [1], enrolledAt: '2026-03-18T09:15:00' },
    { userId: 6, courseId: 2, progress: 60, completedLessons: [1,2,3,4], enrolledAt: '2026-03-20T18:00:00' },
    { userId: 6, courseId: 5, progress: 10, completedLessons: [1], enrolledAt: '2026-03-22T11:45:00' },
    { userId: 4, courseId: 8, progress: 0, completedLessons: [], enrolledAt: '2026-04-02T16:30:00' },
    { userId: 4, courseId: 3, progress: 0, completedLessons: [], enrolledAt: '2026-04-05T09:00:00' },
];

const defaultReviews = [
    { userId: 4, courseId: 1, rating: 5, comment: 'Curso incrível! Aprendi muito sobre Notion.', date: '2026-03-20' },
    { userId: 5, courseId: 1, rating: 5, comment: 'Melhor curso de Notion que já fiz. Muito completo!', date: '2026-03-25' },
    { userId: 6, courseId: 2, rating: 4, comment: 'Ótimo conteúdo sobre Obsidian, recomendo.', date: '2026-04-01' },
    { userId: 4, courseId: 5, rating: 5, comment: 'ChatGPT nunca mais será o mesmo pra mim!', date: '2026-03-28' },
    { userId: 5, courseId: 3, rating: 4, comment: 'Automações poderosas, vale cada centavo.', date: '2026-04-02' },
];

const defaultSettings = {
    platformName: 'Alexandria',
    platformTagline: 'Plataforma de Conhecimento',
    commissionRate: 30,
    currency: 'BRL',
    maintenanceMode: false
};

/* ---------- Database Operations ---------- */

const DB = {
    _get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    _set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    init() {
        if (!this._get(DB_KEYS.users)) this._set(DB_KEYS.users, defaultUsers);
        if (!this._get(DB_KEYS.courses) && typeof courses !== 'undefined') this._set(DB_KEYS.courses, courses);
        if (!this._get(DB_KEYS.sales)) this._set(DB_KEYS.sales, defaultSales);
        if (!this._get(DB_KEYS.enrollments)) this._set(DB_KEYS.enrollments, defaultEnrollments);
        if (!this._get(DB_KEYS.reviews)) this._set(DB_KEYS.reviews, defaultReviews);
        if (!this._get(DB_KEYS.settings)) this._set(DB_KEYS.settings, defaultSettings);
    },

    reset() {
        Object.values(DB_KEYS).forEach(k => localStorage.removeItem(k));
        this.init();
    },

    /* --- Courses --- */
    getCourses() { return this._get(DB_KEYS.courses) || []; },
    
    addCourse(course) {
        const stored = this.getCourses();
        course.id = stored.length ? Math.max(...stored.map(c => c.id)) + 1 : 1;
        stored.push(course);
        this._set(DB_KEYS.courses, stored);
        return course;
    },

    updateCourse(id, updates) {
        const stored = this.getCourses();
        const idx = stored.findIndex(c => c.id === id);
        if (idx === -1) return null;
        stored[idx] = { ...stored[idx], ...updates };
        this._set(DB_KEYS.courses, stored);
        return stored[idx];
    },

    addModuleToCourse(courseId, title) {
        const course = this.getCourses().find(c => c.id === courseId);
        if (!course) return null;
        if (!course.modules) course.modules = [];
        
        const newMod = {
            id: course.modules.length ? Math.max(...course.modules.map(m => m.id)) + 1 : 1,
            title: title,
            lessons: []
        };
        course.modules.push(newMod);
        this.updateCourse(courseId, course);
        return newMod;
    },

    addLessonToModule(courseId, moduleId, lesson) {
        const course = this.getCourses().find(c => c.id === courseId);
        if (!course) return null;
        if (!course.modules) course.modules = [];
        
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return null;
        
        lesson.id = mod.lessons.length ? Math.max(...mod.lessons.map(l => l.id)) + 1 : 1;
        mod.lessons.push(lesson);
        this.updateCourse(courseId, course);
        return lesson;
    },

    updateLesson(courseId, moduleId, lessonId, updates) {
        const course = this.getCourses().find(c => c.id === courseId);
        if (!course) return null;
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return null;
        const lessonIdx = mod.lessons.findIndex(l => l.id === lessonId);
        if (lessonIdx === -1) return null;
        
        mod.lessons[lessonIdx] = { ...mod.lessons[lessonIdx], ...updates };
        this.updateCourse(courseId, course);
        return mod.lessons[lessonIdx];
    },

    deleteLesson(courseId, moduleId, lessonId) {
        const course = this.getCourses().find(c => c.id === courseId);
        if (!course) return null;
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return null;
        mod.lessons = mod.lessons.filter(l => l.id !== lessonId);
        this.updateCourse(courseId, course);
        return true;
    },

    getCourseTotalDuration(course) {
        if (!course || !course.modules) return "0h";
        
        let totalSeconds = 0;
        let hasLessons = false;

        course.modules.forEach(m => {
            if (m.lessons) {
                m.lessons.forEach(l => {
                    hasLessons = true;
                    if (l.duration && typeof l.duration === 'string') {
                        const parts = l.duration.split(':');
                        if (parts.length === 2) {
                            totalSeconds += (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
                        } else if (parts.length === 1) {
                            totalSeconds += (parseInt(parts[0]) || 0) * 60;
                        }
                    }
                });
            }
        });

        if (totalSeconds > 0) {
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            if (h > 0) return `${h}h ${m}m`;
            return `${m}m`;
        }

        return course.duration || "0h";
    },

    /* --- Users --- */
    getUsers() { return this._get(DB_KEYS.users) || []; },
    getUserById(id) { return this.getUsers().find(u => u.id === id); },
    getUserByEmail(email) { return this.getUsers().find(u => u.email === email); },
    getUsersByRole(role) { return this.getUsers().filter(u => u.role === role); },

    addUser(user) {
        const users = this.getUsers();
        user.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
        user.createdAt = new Date().toISOString();
        user.active = true;
        users.push(user);
        this._set(DB_KEYS.users, users);
        return user;
    },

    updateUser(id, updates) {
        const users = this.getUsers();
        const idx = users.findIndex(u => u.id === id);
        if (idx === -1) return null;
        users[idx] = { ...users[idx], ...updates };
        this._set(DB_KEYS.users, users);
        return users[idx];
    },

    deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        this._set(DB_KEYS.users, users);
    },

    deleteCourse(id) {
        const courses = this.getCourses().filter(c => c.id !== id);
        this._set(DB_KEYS.courses, courses);
    },

    /* --- Sales --- */
    getSales() { return this._get(DB_KEYS.sales) || []; },
    getSaleById(id) { return this.getSales().find(s => s.id === id); },
    getSalesByUser(userId) { return this.getSales().filter(s => s.userId === userId); },
    getSalesByCourse(courseId) { return this.getSales().filter(s => s.courseId === courseId); },

    addSale(sale) {
        const sales = this.getSales();
        sale.id = sales.length ? Math.max(...sales.map(s => s.id)) + 1 : 1;
        sale.date = new Date().toISOString();
        sales.push(sale);
        this._set(DB_KEYS.sales, sales);
        return sale;
    },

    updateSale(id, updates) {
        const sales = this.getSales();
        const idx = sales.findIndex(s => s.id === id);
        if (idx === -1) return null;
        sales[idx] = { ...sales[idx], ...updates };
        this._set(DB_KEYS.sales, sales);
        return sales[idx];
    },

    /* --- Enrollments --- */
    getEnrollments() { return this._get(DB_KEYS.enrollments) || []; },
    getEnrollmentsByUser(userId) { return this.getEnrollments().filter(e => e.userId === userId); },
    getEnrollmentsByCourse(courseId) { return this.getEnrollments().filter(e => e.courseId === courseId); },

    getEnrollment(userId, courseId) {
        return this.getEnrollments().find(e => e.userId === userId && e.courseId === courseId);
    },

    addEnrollment(enrollment) {
        const enrollments = this.getEnrollments();
        if (this.getEnrollment(enrollment.userId, enrollment.courseId)) return null;
        enrollment.progress = 0;
        enrollment.completedLessons = [];
        enrollment.enrolledAt = new Date().toISOString();
        enrollments.push(enrollment);
        this._set(DB_KEYS.enrollments, enrollments);
        return enrollment;
    },

    updateEnrollment(userId, courseId, updates) {
        const enrollments = this.getEnrollments();
        const idx = enrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
        if (idx === -1) return null;
        enrollments[idx] = { ...enrollments[idx], ...updates };
        this._set(DB_KEYS.enrollments, enrollments);
        return enrollments[idx];
    },

    completeLesson(userId, courseId, lessonId) {
        const enrollment = this.getEnrollment(userId, courseId);
        if (!enrollment) return null;
        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);
            const course = getCourseById(courseId);
            if (course) {
                const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
            }
            this.updateEnrollment(userId, courseId, enrollment);
        }
        return enrollment;
    },

    /* --- Reviews --- */
    getReviews() { return this._get(DB_KEYS.reviews) || []; },
    getReviewsByCourse(courseId) { return this.getReviews().filter(r => r.courseId === courseId); },
    getCourseRating(courseId) {
        const reviews = this.getReviewsByCourse(courseId);
        if (!reviews.length) return { avg: 0, count: 0 };
        return {
            avg: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
            count: reviews.length
        };
    },

    addReview(review) {
        const reviews = this.getReviews();
        review.date = new Date().toISOString().split('T')[0];
        reviews.push(review);
        this._set(DB_KEYS.reviews, reviews);
        return review;
    },

    /* --- Settings --- */
    getSettings() { return this._get(DB_KEYS.settings) || defaultSettings; },
    updateSettings(updates) {
        const settings = { ...this.getSettings(), ...updates };
        this._set(DB_KEYS.settings, settings);
        return settings;
    },

    /* --- Stats --- */
    getStats() {
        const sales = this.getSales().filter(s => s.status === 'completed');
        const users = this.getUsers();
        const enrollments = this.getEnrollments();

        return {
            totalRevenue: sales.reduce((sum, s) => sum + s.price, 0),
            totalSales: sales.length,
            totalStudents: users.filter(u => u.role === 'aluno').length,
            totalProfessors: users.filter(u => u.role === 'professor').length,
            totalCourses: typeof getCourses === 'function' ? getCourses().length : 0,
            totalEnrollments: enrollments.length,
            pendingSales: this.getSales().filter(s => s.status === 'pending').length,
            refundedSales: this.getSales().filter(s => s.status === 'refunded').length
        };
    },

    getMonthlySales() {
        const sales = this.getSales().filter(s => s.status === 'completed');
        const months = {};
        const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
        
        sales.forEach(s => {
            const d = new Date(s.date);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
            const label = `${monthNames[d.getMonth()]}/${d.getFullYear()}`;
            if (!months[key]) months[key] = { label, revenue: 0, count: 0 };
            months[key].revenue += s.price;
            months[key].count++;
        });

        return Object.values(months).sort((a, b) => a.label.localeCompare(b.label));
    },

    getProfessorSales() {
        const professors = this.getUsers().filter(u => u.role === 'professor');
        const courses = this.getCourses();
        const sales = this.getSales().filter(s => s.status === 'completed');
        
        return professors.map(prof => {
            const profCourses = courses.filter(c => c.instructorId === prof.id);
            const profCourseIds = profCourses.map(c => c.id);
            const profSales = sales.filter(s => profCourseIds.includes(s.courseId));
            const totalRevenue = profSales.reduce((sum, s) => sum + s.price, 0);
            const totalLessons = profCourses.reduce((sum, c) => {
                if (!c.modules) return sum;
                return sum + c.modules.reduce((mSum, m) => mSum + (m.lessons ? m.lessons.length : 0), 0);
            }, 0);
            
            return {
                professor: prof,
                totalSales: profSales.length,
                totalRevenue: totalRevenue,
                totalCourses: profCourses.length,
                totalLessons: totalLessons
            };
        }).sort((a, b) => b.totalRevenue - a.totalRevenue);
    }
};

// Initialize database on load
DB.init();
