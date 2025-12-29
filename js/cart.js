// Shopping cart functionality

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
});

function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        if (cartContent) cartContent.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }

    if (cartContent) cartContent.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    if (!cartItems) return;

    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        const total = item.price * item.quantity;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/120x120?text=Product'">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p style="color: var(--text-light); margin: 0.5rem 0;">${product ? product.description : ''}</p>
                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary-color); margin-top: 1rem;">
                        ₵${total.toFixed(2)}
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="btn-secondary" onclick="removeFromCart(${item.id})" style="margin-left: 1rem;">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    updateCartSummary();
}

function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15; // Free shipping over ₵200
    const tax = subtotal * 0.03; // 3% tax
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₵${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `₵${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₵${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₵${total.toFixed(2)}`;
}

