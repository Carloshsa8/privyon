// Force reload cart from localStorage on every page load
let cart = [];

function loadCart() {
    const stored = localStorage.getItem('privyon_cart');
    cart = stored ? JSON.parse(stored) : [];
    console.log('Loaded cart from storage:', cart);
}

function saveCart() {
    console.log('Saving cart:', cart);
    localStorage.setItem('privyon_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    console.log('Cart count:', count);
    const el = document.getElementById('cartCount');
    if (el) el.textContent = count;
}

function addToCart(serviceId) {
    const service = getServiceById(serviceId);
    if (!service) return;
    
    const existing = cart.find(item => item.id === serviceId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...service, qty: 1 });
    }
    
    console.log('Added to cart:', cart);
    saveCart();
    renderCart();
    toggleCart(true);
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    if (document.getElementById('summaryItems')) {
        renderCheckoutSummary();
    }
}

function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    saveCart();
    renderCart();
    if (document.getElementById('summaryItems')) {
        renderCheckoutSummary();
    }
}

function updateQuantity(serviceId, delta) {
    const item = cart.find(i => i.id === serviceId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(serviceId);
        } else {
            saveCart();
            renderCart();
            if (document.getElementById('summaryItems')) {
                renderCheckoutSummary();
            }
        }
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
            <div class="cart-item-image"></div>
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
            <div class="summary-item-image"></div>
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

function renderServiceCard(service) {
    return `
        <div class="service-card">
            <div class="service-header">
                <div class="service-icon">
                    ${icons[service.icon] || icons['shield']}
                </div>
                <div class="service-price">${formatPrice(service.price)}</div>
            </div>
            <h3 class="service-title">${service.name}</h3>
            <p class="service-desc">${service.description}</p>
            <div class="service-tags">
                ${service.tags.map(tag => `<span class="service-tag">${tag}</span>`).join('')}
            </div>
            <button class="service-btn" onclick="addToCart(${service.id})">
                Adicionar ao Carrinho
            </button>
        </div>
    `;
}

function loadServices(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = getServices().map(renderServiceCard).join('');
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
    
    alert('Pedido realizado com sucesso! Entraremos em contato para confirmar.');
    cart = [];
    saveCart();
    window.location.href = 'index.html';
    return false;
}

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (cursor && ring) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Always reload from localStorage
    console.log('DOM loaded, cart:', cart);
    console.log('localStorage privyon_cart:', localStorage.getItem('privyon_cart'));
    
    updateCartCount();
    renderCart();
    
    console.log('Cart loaded:', cart);
    
    if (document.getElementById('servicesGrid')) {
        loadServices('servicesGrid');
    }
    
    if (document.getElementById('summaryItems')) {
        console.log('Rendering checkout summary');
        renderCheckoutSummary();
    }
    
    document.querySelector('.cart-btn')?.addEventListener('click', () => toggleCart());
});