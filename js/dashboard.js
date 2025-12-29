// User dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(sessionStorage.getItem('ghanaMarketUser') || localStorage.getItem('ghanaMarketUser') || 'null');
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Display user name
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = user.name || user.email;
    }

    // Load user data
    loadUserProfile();
});

function showSection(sectionId) {
    // Hide all sections
    const sections = ['profile', 'orders', 'addresses', 'settings'];
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

function loadUserProfile() {
    const user = JSON.parse(sessionStorage.getItem('ghanaMarketUser') || localStorage.getItem('ghanaMarketUser') || '{}');
    
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');

    if (profileName) profileName.value = user.name || '';
    if (profileEmail) profileEmail.value = user.email || '';
    if (profilePhone) profilePhone.value = user.phone || '';

    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }

    // Settings form submission
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
}

function updateProfile() {
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;

    // In a real application, this would make an API call
    const user = JSON.parse(sessionStorage.getItem('ghanaMarketUser') || localStorage.getItem('ghanaMarketUser') || '{}');
    user.name = name;
    user.email = email;
    user.phone = phone;

    sessionStorage.setItem('ghanaMarketUser', JSON.stringify(user));
    localStorage.setItem('ghanaMarketUser', JSON.stringify(user));

    alert('Profile updated successfully!');
}

function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        alert('Please fill in all password fields');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match');
        return;
    }

    // In a real application, this would make an API call
    alert('Password updated successfully!');
    
    // Clear password fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
}

function addNewAddress() {
    const address = prompt('Enter new address:');
    if (address) {
        // In a real application, this would make an API call
        alert('Address added successfully!');
        location.reload();
    }
}

