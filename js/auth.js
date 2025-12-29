// Authentication functionality

document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }

    // Vendor signup form
    const vendorSignupForm = document.getElementById('vendorSignupForm');
    if (vendorSignupForm) {
        vendorSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleVendorSignup();
        });
    }

    // Password confirmation validation
    const confirmPassword = document.getElementById('confirmPassword');
    const password = document.getElementById('password');
    if (confirmPassword && password) {
        confirmPassword.addEventListener('input', function() {
            if (confirmPassword.value !== password.value) {
                confirmPassword.setCustomValidity('Passwords do not match');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    }
});

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked || false;

    // In a real application, this would make an API call
    // For demo purposes, we'll simulate login
    const user = {
        email: email,
        name: email.split('@')[0],
        role: 'user'
    };

    // Store user session
    sessionStorage.setItem('ghanaMarketUser', JSON.stringify(user));
    if (remember) {
        localStorage.setItem('ghanaMarketUser', JSON.stringify(user));
    }

    // Redirect to dashboard
    window.location.href = 'user-dashboard.html';
}

function handleSignup() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // In a real application, this would make an API call
    const user = {
        name: fullName,
        email: email,
        phone: phone,
        role: 'user'
    };

    // Store user session
    sessionStorage.setItem('ghanaMarketUser', JSON.stringify(user));
    localStorage.setItem('ghanaMarketUser', JSON.stringify(user));

    alert('Account created successfully!');
    window.location.href = 'user-dashboard.html';
}

function handleVendorSignup() {
    const businessName = document.getElementById('businessName').value;
    const vendorName = document.getElementById('vendorName').value;
    const vendorEmail = document.getElementById('vendorEmail').value;
    const vendorPhone = document.getElementById('vendorPhone').value;
    const vendorPassword = document.getElementById('vendorPassword').value;
    const vendorConfirmPassword = document.getElementById('vendorConfirmPassword').value;

    if (vendorPassword !== vendorConfirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // In a real application, this would make an API call
    const vendor = {
        name: vendorName,
        businessName: businessName,
        email: vendorEmail,
        phone: vendorPhone,
        role: 'vendor'
    };

    // Store vendor session
    sessionStorage.setItem('ghanaMarketUser', JSON.stringify(vendor));
    localStorage.setItem('ghanaMarketUser', JSON.stringify(vendor));

    alert('Vendor application submitted! You will be notified once approved.');
    window.location.href = 'vendor-dashboard.html';
}

function handleGoogleLogin() {
    // In a real application, this would integrate with Google OAuth
    alert('Google OAuth integration would be implemented here. For demo, please use email/password login.');
}

function handleGoogleSignup() {
    // In a real application, this would integrate with Google OAuth
    alert('Google OAuth integration would be implemented here. For demo, please use email/password signup.');
}

function logout() {
    sessionStorage.removeItem('ghanaMarketUser');
    localStorage.removeItem('ghanaMarketUser');
    window.location.href = 'index.html';
}

