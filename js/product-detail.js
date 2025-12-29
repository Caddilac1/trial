// Product detail page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (productId) {
        displayProductDetail(productId);
    } else {
        document.getElementById('productDetailContent').innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <h2>Product not found</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">The product you're looking for doesn't exist.</p>
                <a href="products.html" class="btn-primary">Browse Products</a>
            </div>
        `;
    }
});

function displayProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const content = document.getElementById('productDetailContent');

    if (!product) {
        content.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <h2>Product not found</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">The product you're looking for doesn't exist.</p>
                <a href="products.html" class="btn-primary">Browse Products</a>
            </div>
        `;
        return;
    }

    const categoryName = {
        'data': 'Data Plans',
        'electronics': 'Electronics',
        'ebooks': 'Ebooks',
        'clothing': 'Clothing'
    }[product.category] || product.category;

    let detailHTML = '';

    if (product.category === 'data') {
        // Data bundle detail page
        detailHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 2rem;">
                <div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px; box-shadow: var(--shadow);" onerror="this.src='https://via.placeholder.com/500x400?text=Product'">
                </div>
                <div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-color);">${product.name}</h1>
                    <p style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 2rem;">${categoryName}</p>
                    
                    <div style="background: var(--bg-light); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                        <h2 style="font-size: 3rem; color: var(--primary-color); margin-bottom: 0.5rem;">₵${product.price.toFixed(2)}</h2>
                        <p style="color: var(--text-light); margin-bottom: 1.5rem;">Instant delivery • 24/7 available</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                            <div>
                                <strong>Data Volume:</strong><br>
                                <span style="font-size: 1.5rem; color: var(--primary-color);">${product.dataSize}GB</span>
                            </div>
                            <div>
                                <strong>Validity:</strong><br>
                                <span style="font-size: 1.5rem; color: var(--primary-color);">${product.validity} days</span>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <strong>Network:</strong><br>
                            <span style="text-transform: uppercase; font-weight: 600; color: var(--primary-color);">${product.network}</span>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label for="phoneNumber" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
                            <input type="tel" id="phoneNumber" placeholder="+233 XX XXX XXXX" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1rem;">
                        </div>
                        
                        <button class="btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem;" onclick="addDataBundleToCart(${product.id})">
                            Add to Cart - ₵${product.price.toFixed(2)}
                        </button>
                    </div>
                    
                    <div style="background: var(--bg-white); padding: 2rem; border-radius: 12px; box-shadow: var(--shadow);">
                        <h3 style="margin-bottom: 1rem;">Product Details</h3>
                        <p style="color: var(--text-light); line-height: 1.8;">${product.description}</p>
                        <ul style="margin-top: 1rem; color: var(--text-light); line-height: 2;">
                            <li>✅ Instant delivery to your phone</li>
                            <li>✅ Valid for ${product.validity} days</li>
                            <li>✅ Works on all ${product.network.toUpperCase()} devices</li>
                            <li>✅ 24/7 customer support</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Physical product detail page
        detailHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 2rem;">
                <div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px; box-shadow: var(--shadow);" onerror="this.src='https://via.placeholder.com/500x400?text=Product'">
                </div>
                <div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-color);">${product.name}</h1>
                    <p style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 2rem;">${categoryName}</p>
                    
                    <div style="background: var(--bg-light); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                        <h2 style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">₵${product.price.toFixed(2)}</h2>
                        <p style="color: var(--text-light); margin-bottom: 1.5rem;">In Stock: ${product.stock} units</p>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label for="quantity" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Quantity</label>
                            <div class="quantity-control" style="max-width: 200px;">
                                <button onclick="decreaseQuantity()">-</button>
                                <span id="quantity">1</span>
                                <button onclick="increaseQuantity()">+</button>
                            </div>
                        </div>
                        
                        <button class="btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem;" onclick="addPhysicalProductToCart(${product.id})">
                            Add to Cart - ₵${product.price.toFixed(2)}
                        </button>
                    </div>
                    
                    <div style="background: var(--bg-white); padding: 2rem; border-radius: 12px; box-shadow: var(--shadow); margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Product Description</h3>
                        <p style="color: var(--text-light); line-height: 1.8;">${product.description}</p>
                    </div>
                    
                    <div style="background: var(--bg-white); padding: 2rem; border-radius: 12px; box-shadow: var(--shadow);">
                        <h3 style="margin-bottom: 1rem;">Shipping Information</h3>
                        <ul style="color: var(--text-light); line-height: 2;">
                            <li>🚚 Free shipping on orders over ₵200</li>
                            <li>📦 Standard delivery: 3-5 business days</li>
                            <li>⚡ Express delivery: 1-2 business days (₵20)</li>
                            <li>📍 Available for pickup in Accra, Kumasi, and Tamale</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    content.innerHTML = detailHTML;
}

let currentQuantity = 1;

function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantity').textContent = currentQuantity;
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').textContent = currentQuantity;
    }
}

function addDataBundleToCart(productId) {
    const phoneNumber = document.getElementById('phoneNumber');
    if (phoneNumber && !phoneNumber.value.trim()) {
        alert('Please enter a phone number');
        phoneNumber.focus();
        return;
    }
    addToCart(productId, 1);
}

function addPhysicalProductToCart(productId) {
    const quantity = currentQuantity || 1;
    addToCart(productId, quantity);
}

