// Vendor dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in as vendor
    const user = JSON.parse(sessionStorage.getItem('ghanaMarketUser') || localStorage.getItem('ghanaMarketUser') || 'null');
    
    if (!user || user.role !== 'vendor') {
        window.location.href = 'vendor-signup.html';
        return;
    }

    // Category change handler for product form
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        productCategory.addEventListener('change', function() {
            const networkGroup = document.getElementById('networkGroup');
            const dataSizeGroup = document.getElementById('dataSizeGroup');
            const validityGroup = document.getElementById('validityGroup');

            if (this.value === 'data') {
                if (networkGroup) networkGroup.style.display = 'block';
                if (dataSizeGroup) dataSizeGroup.style.display = 'block';
                if (validityGroup) validityGroup.style.display = 'block';
            } else {
                if (networkGroup) networkGroup.style.display = 'none';
                if (dataSizeGroup) dataSizeGroup.style.display = 'none';
                if (validityGroup) validityGroup.style.display = 'none';
            }
        });
    }

    // Product form submission
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addProduct();
        });
    }
});

function showVendorSection(sectionId) {
    // Hide all sections
    const sections = ['overview', 'products', 'orders', 'analytics', 'settings'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) selectedSection.style.display = 'block';

    // Update nav active state
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(sectionId)) {
            link.classList.add('active');
        }
    });
}

function showAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (form) form.style.display = 'block';
}

function hideAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (form) form.style.display = 'none';
    
    // Reset form
    const productForm = document.getElementById('productForm');
    if (productForm) productForm.reset();
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').value;
    const stock = parseInt(document.getElementById('productStock').value);

    // In a real application, this would make an API call
    alert('Product added successfully!');
    hideAddProductForm();
    
    // Reload products table (in a real app, this would fetch from API)
    location.reload();
}

