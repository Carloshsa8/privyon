let cart = [];

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
    const el = document.getElementById('cartCount');
    if (el) el.textContent = count;
}

function addToCart(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    
    const existing = cart.find(item => item.id === courseId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...course, qty: 1 });
    }
    
    saveCart();
    renderCart();
    toggleCart(true);
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    saveCart();
    renderCart();
    if (document.getElementById('summaryItems')) {
        renderCheckoutSummary();
    }
}

function updateQuantity(courseId, delta) {
    const item = cart.find(i => i.id === courseId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(courseId);
        } else {
            saveCart();
            renderCart();
            if (document.getElementById('summaryItems')) {
                renderCheckoutSummary();
            }
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    if (document.getElementById('summaryItems')) {
        renderCheckoutSummary();
    }
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
            <div class="cart-item-image">${courseImages[item.image] || courseImages['notion']}</div>
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

function renderCheckoutSummary() {
    const container = document.getElementById('summaryItems');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Carrinho vazio</p>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-image">${courseImages[item.image] || courseImages['notion']}</div>
            <div class="summary-item-info">
                <div class="summary-item-name">${item.shortName}</div>
                <div class="summary-item-price">${formatPrice(item.price)} x ${item.qty}</div>
            </div>
        </div>
    `).join('');
    
    const total = getCartTotal();
    document.getElementById('summarySubtotal').textContent = formatPrice(total);
    document.getElementById('summaryTotal').textContent = formatPrice(total);
}

function toggleCart(forceOpen = null) {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (forceOpen === true || (forceOpen === null && !sidebar.classList.contains('open'))) {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function renderCourseCard(course) {
    return `
        <div class="course-card">
            <div class="course-image">
                <div class="course-icon">${courseImages[course.image] || courseImages['notion']}</div>
            </div>
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.name}</h3>
                <p class="course-desc">${course.description}</p>
                <div class="course-tags">
                    ${course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('')}
                </div>
                <div class="course-footer">
                    <span class="course-price">${formatPrice(course.price)}</span>
                    <button class="course-btn" onclick="addToCart(${course.id})">Comprar</button>
                </div>
            </div>
        </div>
    `;
}

function loadCourses(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = getCourses().map(renderCourseCard).join('');
}

function handleContact(e) {
    e.preventDefault();
    alert('Mensagem enviada! Entraremos em contato em breve.');
    e.target.reset();
    return false;
}

function handleCheckout(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return false;
    }
    
    alert('Pedido realizado com sucesso! Você receberá o acesso por email.');
    cart = [];
    saveCart();
    window.location.href = 'index.html';
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
    renderCart();
    
    if (document.getElementById('coursesGrid')) {
        loadCourses('coursesGrid');
    }
    
    if (document.getElementById('summaryItems')) {
        renderCheckoutSummary();
    }
    
    document.querySelector('.cart-btn')?.addEventListener('click', () => toggleCart());
});