// Checkout and Paystack payment integration

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('checkout.html')) {
        displayCheckoutItems();
        setupCheckoutForm();
    }
});

function displayCheckoutItems() {
    const cart = getCart();
    const checkoutItems = document.getElementById('checkoutItems');

    if (!checkoutItems) return;

    checkoutItems.innerHTML = cart.map(item => {
        const total = item.price * item.quantity;
        return `
            <div style="display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                <div>
                    <strong>${item.name}</strong>
                    <p style="color: var(--text-light); font-size: 0.9rem;">Quantity: ${item.quantity}</p>
                </div>
                <div style="font-weight: 600;">₵${total.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15;
    const tax = subtotal * 0.03;
    const total = subtotal + shipping + tax;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₵${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `₵${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₵${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₵${total.toFixed(2)}`;

    // Store total for payment
    window.checkoutTotal = total;
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    const payButton = document.getElementById('payButton');

    if (payButton) {
        payButton.addEventListener('click', function(e) {
            e.preventDefault();
            processPayment();
        });
    }
}

function processPayment() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;

    // Validate form
    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        region: document.getElementById('region').value
    };

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const amount = window.checkoutTotal || 0;

    // In a real application, you would send this data to your backend
    // which would then initialize Paystack payment
    // For demo purposes, we'll use a test public key

    // Paystack integration
    const handler = PaystackPop.setup({
        key: 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual Paystack public key
        email: formData.email,
        amount: amount * 100, // Convert to kobo/pesewas
        currency: 'GHS',
        ref: 'GM' + Date.now(), // Generate unique reference
        metadata: {
            custom_fields: [
                {
                    display_name: "Full Name",
                    variable_name: "full_name",
                    value: formData.fullName
                },
                {
                    display_name: "Phone",
                    variable_name: "phone",
                    value: formData.phone
                },
                {
                    display_name: "Address",
                    variable_name: "address",
                    value: `${formData.address}, ${formData.city}, ${formData.region}`
                }
            ]
        },
        callback: function(response) {
            // Payment successful
            handlePaymentSuccess(response, formData);
        },
        onClose: function() {
            alert('Payment window closed. You can complete payment later.');
        }
    });

    handler.openIframe();
}

function handlePaymentSuccess(response, formData) {
    // In a real application, verify the payment with your backend
    // For now, we'll just show a success message
    
    // Clear cart
    localStorage.removeItem('ghanaMarketCart');
    updateCartCount();

    // Show success message and redirect
    alert('Payment successful! Your order has been placed.');
    
    // In a real app, you would redirect to an order confirmation page
    window.location.href = 'user-dashboard.html';
}

