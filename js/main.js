// Main JavaScript for GhanaMarket

// Sample product data
const products = [
    // Data Plans
    { id: 1, name: 'MTN 1GB Data Bundle', category: 'data', network: 'mtn', dataSize: 1, validity: 30, price: 8.00, description: 'MTN 1GB data bundle valid for 30 days. Instant delivery.', image: 'https://via.placeholder.com/300x200?text=MTN+1GB', stock: 100 },
    { id: 2, name: 'MTN 5GB Data Bundle', category: 'data', network: 'mtn', dataSize: 5, validity: 30, price: 35.00, description: 'MTN 5GB data bundle valid for 30 days. Instant delivery.', image: 'https://via.placeholder.com/300x200?text=MTN+5GB', stock: 100 },
    { id: 3, name: 'MTN 10GB Data Bundle', category: 'data', network: 'mtn', dataSize: 10, validity: 30, price: 45.00, description: 'MTN 10GB data bundle valid for 30 days. Instant delivery.', image: 'https://via.placeholder.com/300x200?text=MTN+10GB', stock: 100 },
    { id: 4, name: 'AirtelTigo 2GB Data Bundle', category: 'data', network: 'airteltigo', dataSize: 2, validity: 30, price: 15.00, description: 'AirtelTigo 2GB data bundle valid for 30 days. Instant delivery.', image: 'https://via.placeholder.com/300x200?text=AirtelTigo+2GB', stock: 100 },
    { id: 5, name: 'AirtelTigo 10GB Data Bundle', category: 'data', network: 'airteltigo', dataSize: 10, validity: 30, price: 42.00, description: 'AirtelTigo 10GB data bundle valid for 30 days. Instant delivery.', image: 'https://via.placeholder.com/300x200?text=AirtelTigo+10GB', stock: 100 },
    { id: 6, name: 'Telecel 5GB Data Bundle', category: 'data', network: 'telecel', dataSize: 5, validity: 30, price: 33.00, description: 'Telecel 5GB data bundle valid for 30 days. Instant delivery.', image: 'https://via.placeholder.com/300x200?text=Telecel+5GB', stock: 100 },
    
    // Electronics
    { id: 7, name: 'Samsung Galaxy A54', category: 'electronics', price: 2500.00, description: 'Latest Samsung smartphone with 128GB storage, 6GB RAM, and 50MP camera.', image: 'https://via.placeholder.com/300x200?text=Samsung+Galaxy', stock: 15 },
    { id: 8, name: 'iPhone 13 Case', category: 'electronics', price: 120.00, description: 'Premium protective case for iPhone 13. Available in multiple colors.', image: 'https://via.placeholder.com/300x200?text=iPhone+Case', stock: 50 },
    { id: 9, name: 'Wireless Earbuds', category: 'electronics', price: 180.00, description: 'High-quality wireless earbuds with noise cancellation and 20-hour battery life.', image: 'https://via.placeholder.com/300x200?text=Wireless+Earbuds', stock: 30 },
    { id: 10, name: 'Laptop Stand', category: 'electronics', price: 95.00, description: 'Ergonomic aluminum laptop stand for better posture and cooling.', image: 'https://via.placeholder.com/300x200?text=Laptop+Stand', stock: 25 },
    
    // Ebooks
    { id: 11, name: 'Ghana History Ebook', category: 'ebooks', price: 25.00, description: 'Comprehensive guide to Ghanaian history from pre-colonial times to present.', image: 'https://via.placeholder.com/300x200?text=Ghana+History', stock: 999 },
    { id: 12, name: 'Business Success Guide', category: 'ebooks', price: 35.00, description: 'Complete guide to starting and growing a business in Ghana.', image: 'https://via.placeholder.com/300x200?text=Business+Guide', stock: 999 },
    { id: 13, name: 'Web Development Course', category: 'ebooks', price: 150.00, description: 'Learn modern web development with HTML, CSS, JavaScript, and React.', image: 'https://via.placeholder.com/300x200?text=Web+Dev+Course', stock: 999 },
    
    // Clothing
    { id: 14, name: 'Kente Print Shirt', category: 'clothing', price: 85.00, description: 'Authentic Ghanaian Kente print shirt. Available in various sizes.', image: 'https://via.placeholder.com/300x200?text=Kente+Shirt', stock: 40 },
    { id: 15, name: 'Traditional Kaftan', category: 'clothing', price: 120.00, description: 'Elegant traditional kaftan perfect for special occasions.', image: 'https://via.placeholder.com/300x200?text=Kaftan', stock: 30 }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Update cart count
    updateCartCount();
});

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Get cart from localStorage
function getCart() {
    const cartJson = localStorage.getItem('ghanaMarketCart');
    return cartJson ? JSON.parse(cartJson) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('ghanaMarketCart', JSON.stringify(cart));
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart(cart);
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.id !== productId);
    saveCart(filteredCart);
    updateCartCount();
    
    // Reload cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        location.reload();
    }
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        updateCartCount();
        
        // Reload cart page if on cart page
        if (window.location.pathname.includes('cart.html')) {
            location.reload();
        }
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Display featured products on homepage
function displayFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featuredProducts');
    if (!featuredProductsGrid) return;

    // Get 6 random products
    const featured = products.slice(0, 6);

    featuredProductsGrid.innerHTML = featured.map(product => {
        const categoryName = {
            'data': 'Data Plans',
            'electronics': 'Electronics',
            'ebooks': 'Ebooks',
            'clothing': 'Clothing'
        }[product.category] || product.category;

        const networkBadge = product.network ? `<span style="background: var(--primary-color); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; text-transform: uppercase;">${product.network}</span>` : '';

        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${categoryName} ${networkBadge}</p>
                    <div class="product-price">₵${product.price.toFixed(2)}</div>
                    <p class="product-description">${product.description}</p>
                    <a href="product-detail.html?id=${product.id}" style="text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        <button class="btn-outline" style="width: 100%;">View Details</button>
                    </a>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

