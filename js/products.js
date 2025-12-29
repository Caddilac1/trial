// Products page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');

    // Set page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        if (category) {
            const categoryNames = {
                'data': 'Data Plans',
                'electronics': 'Electronics',
                'ebooks': 'Ebooks',
                'clothing': 'Clothing'
            };
            pageTitle.textContent = categoryNames[category] || 'Products';
        } else if (search) {
            pageTitle.textContent = `Search Results for "${search}"`;
        } else {
            pageTitle.textContent = 'All Products';
        }
    }

    // Set category filter
    if (category) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = category;
        }
    }

    // Show/hide network and data size filters based on category
    const categoryFilter = document.getElementById('categoryFilter');
    const networkFilterGroup = document.getElementById('networkFilterGroup');
    const dataSizeFilterGroup = document.getElementById('dataSizeFilterGroup');

    function toggleDataFilters() {
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        if (selectedCategory === 'data') {
            if (networkFilterGroup) networkFilterGroup.style.display = 'block';
            if (dataSizeFilterGroup) dataSizeFilterGroup.style.display = 'block';
        } else {
            if (networkFilterGroup) networkFilterGroup.style.display = 'none';
            if (dataSizeFilterGroup) dataSizeFilterGroup.style.display = 'none';
        }
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            toggleDataFilters();
            filterProducts();
        });
        toggleDataFilters();
    }

    // Filter event listeners
    const filters = ['networkFilter', 'dataSizeFilter', 'priceFilter', 'sortFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', filterProducts);
        }
    });

    // Initial load
    filterProducts();
});

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const networkFilter = document.getElementById('networkFilter');
    const dataSizeFilter = document.getElementById('dataSizeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');

    let filteredProducts = [...products];

    // Search filter
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
    }

    // Category filter
    if (categoryFilter && categoryFilter.value) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter.value);
    }

    // Network filter (for data plans)
    if (networkFilter && networkFilter.value) {
        filteredProducts = filteredProducts.filter(p => p.network === networkFilter.value);
    }

    // Data size filter
    if (dataSizeFilter && dataSizeFilter.value) {
        const size = parseInt(dataSizeFilter.value);
        filteredProducts = filteredProducts.filter(p => {
            if (p.dataSize) {
                if (size >= 50) {
                    return p.dataSize >= 50;
                }
                return p.dataSize === size;
            }
            return false;
        });
    }

    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(v => v === '+' ? Infinity : parseFloat(v));
        filteredProducts = filteredProducts.filter(p => {
            if (max === Infinity) {
                return p.price >= min;
            }
            return p.price >= min && p.price <= max;
        });
    }

    // Sort
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }

    // Display products
    displayProducts(filteredProducts);
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');

    if (!productsGrid) return;

    if (productsToShow.length === 0) {
        productsGrid.style.display = 'none';
        if (noProducts) noProducts.style.display = 'block';
        return;
    }

    productsGrid.style.display = 'grid';
    if (noProducts) noProducts.style.display = 'none';

    productsGrid.innerHTML = productsToShow.map(product => {
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
                    ${product.dataSize ? `<p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem;"><strong>Data:</strong> ${product.dataSize}GB | <strong>Validity:</strong> ${product.validity} days</p>` : ''}
                    <a href="product-detail.html?id=${product.id}" style="text-decoration: none; display: block; margin-bottom: 0.5rem;">
                        <button class="btn-outline" style="width: 100%;">View Details</button>
                    </a>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

