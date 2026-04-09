
/* =========================================
   Alexandria — Main App Logic
   ========================================= */

let cart = [];
let isCartOpen = false;

/* ---------- Cart ---------- */

function loadCart() {
    const stored = localStorage.getItem('alexandria_cart');
    cart = stored ? JSON.parse(stored) : [];
}

function saveCart() {
    localStorage.setItem('alexandria_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function addToCart(courseId, selectedPrice = null) {
    if (typeof Auth !== 'undefined' && !Auth.getCurrentUser()) {
        window.location.href = 'login.html';
        return;
    }

    const course = getCourseById(courseId);
    if (!course) return;
    
    const finalPrice = selectedPrice !== null ? selectedPrice : course.minPrice;
    
    const existing = cart.find(item => item.id === courseId);
    if (existing) {
        existing.qty++;
        existing.price = finalPrice; // update with latest chosen price
    } else {
        cart.push({ id: course.id, name: course.name, shortName: course.shortName, price: finalPrice, image: course.image, qty: 1 });
    }
    saveCart();
    renderCart();
    toggleCart(true);
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    saveCart();
    renderCart();
    updateCheckoutSummary();
}

function updateQuantity(courseId, delta) {
    const item = cart.find(i => i.id === courseId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) { removeFromCart(courseId); }
        else { saveCart(); renderCart(); updateCheckoutSummary(); }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateCheckoutSummary();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
        if (totalEl) totalEl.textContent = formatPrice(0);
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">${courseImages[item.image] || courseImages.notion}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.shortName}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            </div>
        </div>
    `).join('');

    if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

function updateCheckoutSummary() {
    const container = document.getElementById('summaryItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Carrinho vazio</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-icon">${courseImages[item.image] || courseImages.notion}</div>
            <div class="summary-item-info">
                <div class="summary-item-name">${item.shortName}</div>
                <div class="summary-item-price">${formatPrice(item.price)} x ${item.qty}</div>
            </div>
        </div>
    `).join('');

    const total = getCartTotal();
    const sub = document.getElementById('summarySubtotal');
    const tot = document.getElementById('summaryTotal');
    if (sub) sub.textContent = formatPrice(total);
    if (tot) tot.textContent = formatPrice(total);
}

function toggleCart(forceOpen = null) {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    if (!sidebar || !overlay) return;

    isCartOpen = forceOpen === true || (forceOpen === null && !isCartOpen);
    if (isCartOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }
}

/* ---------- Course Rendering ---------- */

function renderCourseCard(course) {
    const rating = DB ? DB.getCourseRating(course.id) : { avg: course.rating, count: 0 };
    const instructor = DB ? DB.getUserById(course.instructorId) : null;
    return `
        <div class="course-card">
            <div class="course-image">
                <div class="course-icon">${courseImages[course.image] || courseImages.notion}</div>
            </div>
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.name}</h3>
                <p class="course-desc">${course.description}</p>
                <div class="course-meta">
                    <span class="course-meta-item course-rating">★ ${rating.avg || course.rating}</span>
                    <span class="course-meta-item">👤 ${course.students} alunos</span>
                    <span class="course-meta-item">⏱ ${DB ? DB.getCourseTotalDuration(course) : course.duration}</span>
                </div>
                <div class="course-footer" style="display: flex; flex-direction: column; align-items: stretch; gap: 1rem; margin-top: auto;">
                    <div>
                        <span style="font-size: 0.75rem; color: var(--text-dim);">A partir de</span>
                        <div class="course-price">${formatPrice(course.minPrice)}</div>
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
                        <button class="course-btn" onclick="viewCourse(${course.id})" style="text-align:center;">Ver Mais</button>
                        <button class="course-btn" onclick="viewCourse(${course.id})" style="background:var(--gold);color:var(--darker);text-align:center;">Escolher Valor</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadCourses(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const list = limit ? getCourses().slice(0, limit) : getCourses();
    container.innerHTML = list.map(renderCourseCard).join('');
}

function viewCourse(id) {
    localStorage.setItem('selectedCourseId', id);
    window.location.href = `curso-detalhe.html?id=${id}`;
}

/* ---------- Contact ---------- */

function handleContact(e) {
    e.preventDefault();
    alert('Mensagem enviada! Entraremos em contato em breve.');
    e.target.reset();
    return false;
}

/* ---------- Checkout ---------- */

function handleCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) { alert('Seu carrinho está vazio!'); return false; }

    const methodElem = document.querySelector('.role-option.active');
    const paymentMethod = methodElem ? methodElem.dataset.method : 'cartao';

    // Simulate generic loading timeout and open payment modal if Pix or Boleto
    if (paymentMethod === 'pix') {
        showPixModal();
    } else if (paymentMethod === 'boleto') {
        showBoletoModal();
    } else {
        processOrder(paymentMethod);
    }

    return false;
}

function processOrder(paymentMethod) {
    const session = Auth.getSession();
    if (session) {
        cart.forEach(item => {
            DB.addSale({ userId: session.userId, courseId: item.id, price: item.price, status: 'completed', paymentMethod });
            DB.addEnrollment({ userId: session.userId, courseId: item.id });
        });
    }

    alert('Pedido realizado com sucesso! Você receberá o acesso por email.');
    cart = [];
    saveCart();

    const overlay = document.getElementById('paymentModalOverlay');
    if (overlay) overlay.remove();

    if (session) { window.location.href = 'meus-cursos.html'; }
    else { window.location.href = 'index.html'; }
}

function showPixModal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const pixCode = "00020126420014br.gov.bcb.pix0120exemplo@alexandria.com520400005303986540" + total.toFixed(2).replace('.', '') + "5802BR5920Alexandria Cursos6009Sao Paulo62070503***6304E2";

    const modalHTML = `
        <div class="modal-overlay open" id="paymentModalOverlay" style="z-index:9999;">
            <div class="modal" style="max-width: 400px; text-align: center;">
                <div class="modal-header">
                    <h3 class="modal-title">Pagamento via PIX</h3>
                    <button class="modal-close" onclick="document.getElementById('paymentModalOverlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <p style="margin-bottom: 1rem;">Escaneie o QR Code abaixo no app do seu banco:</p>
                    <div style="background: white; padding: 1rem; display: inline-block; border-radius: 8px; margin-bottom: 1.5rem;">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}" alt="QR Code Pix" style="width:200px;height:200px;">
                    </div>
                    <p style="font-size:0.9rem; color:var(--text-dim); margin-bottom: 1rem;">Ou copie o código Pix "Copia e Cola":</p>
                    <div style="display:flex;gap:0.5rem;margin-bottom:2rem;">
                        <input type="text" value="${pixCode}" readonly style="flex:1; padding:0.5rem; background:var(--darker); border:1px solid var(--border); color:var(--text); font-size:0.8rem;">
                        <button class="btn btn-primary" style="padding:0.5rem 1rem;" onclick="navigator.clipboard.writeText('${pixCode}');alert('Pix copiado!')">Copiar</button>
                    </div>
                    <button class="btn btn-primary btn-full" onclick="processOrder('pix')">Simular Pagamento Confirmado</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function showBoletoModal() {
    const modalHTML = `
        <div class="modal-overlay open" id="paymentModalOverlay" style="z-index:9999;">
            <div class="modal" style="max-width: 450px; text-align: center;">
                <div class="modal-header">
                    <h3 class="modal-title">Boleto Bancário gerado</h3>
                    <button class="modal-close" onclick="document.getElementById('paymentModalOverlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 2rem;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <p style="margin-bottom: 1.5rem; line-height:1.6;">Seu boleto foi gerado com sucesso. O vencimento é em 3 dias úteis. A liberação do curso ocorrerá após a compensação.</p>
                    
                    <p style="font-size:0.9rem; color:var(--text-dim); margin-bottom: 0.5rem;">Código de barras:</p>
                    <div style="background:var(--darker); padding:1rem; border:1px dashed var(--border); font-family:monospace; margin-bottom:2rem; word-break:break-all;">
                        34191.09008 10799.489181 21462.930000 6 863700000${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2).replace('.', '')}
                    </div>
                    <div style="display:flex;gap:1rem;">
                        <button class="btn" style="flex:1;" onclick="alert('Fazendo download do PDF...')">Baixar Boleto</button>
                        <button class="btn btn-primary" style="flex:1;" onclick="processOrder('boleto')">Finalizar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/* ---------- Filters ---------- */

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const container = document.getElementById('coursesGrid');
    if (!container) return;

    if (query === '') {
        container.innerHTML = getCourses().map(renderCourseCard).join('');
    } else {
        const filtered = getCourses().filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query) ||
            c.tags.some(t => t.toLowerCase().includes(query))
        );
        container.innerHTML = filtered.map(renderCourseCard).join('');
    }
}

function filterByCategory(category) {
    const container = document.getElementById('coursesGrid');
    if (!container) return;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        container.innerHTML = getCourses().map(renderCourseCard).join('');
    } else {
        const filtered = getCourses().filter(c => c.category === category);
        container.innerHTML = filtered.map(renderCourseCard).join('');
    }
}

/* ---------- Scroll ---------- */

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Init ---------- */

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
    renderCart();

    if (document.getElementById('coursesGrid')) {
        loadCourses('coursesGrid');
    }

    if (document.getElementById('summaryItems')) {
        updateCheckoutSummary();
    }

    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', () => toggleCart());
    });

    // Scroll to top button
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('scrollTopBtn');
        if (btn) {
            if (window.scrollY > 500) btn.classList.add('visible');
            else btn.classList.remove('visible');
        }
    });
});
