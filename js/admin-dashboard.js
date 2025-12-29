// Admin dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in as admin
    const user = JSON.parse(sessionStorage.getItem('ghanaMarketUser') || localStorage.getItem('ghanaMarketUser') || 'null');
    
    if (!user || user.role !== 'admin') {
        // For demo purposes, allow access
        // In production, redirect to login
        // window.location.href = 'login.html';
    }
});

function showAdminSection(sectionId) {
    // Hide all sections
    const sections = ['overview', 'products', 'vendors', 'orders', 'users', 'analytics'];
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

