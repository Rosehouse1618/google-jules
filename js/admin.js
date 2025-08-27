// Admin Dashboard JavaScript

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

function initializeAdminDashboard() {
    // Set up navigation
    setupNavigation();
    
    // Set up dashboard stats
    setupDashboardStats();
    
    // Set up responsive sidebar
    setupResponsiveSidebar();
    
    // Initialize any charts or data visualizations
    initializeCharts();
}

// Navigation setup
function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Load page content (in a real app, this would load different content)
            const pageName = this.getAttribute('data-page');
            loadPageContent(pageName);
        });
    });
}

// Load page content
function loadPageContent(pageName) {
    // Hide all page content
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update page title
    updatePageTitle(pageName);
}

// Update page title
function updatePageTitle(pageName) {
    const pageTitles = {
        'overview': 'Dashboard Overview',
        'bookings': 'Manage Bookings',
        'students': 'Student Management',
        'rooms': 'Room Management',
        'maintenance': 'Maintenance Requests',
        'announcements': 'Announcements',
        'analytics': 'Analytics & Reports',
        'users': 'User Management',
        'documents': 'Document Management',
        'gallery': 'Photo Gallery',
        'deposit-receipt': 'Deposit Receipts'
    };
    
    const titleElement = document.querySelector('.header-left h1');
    if (titleElement && pageTitles[pageName]) {
        titleElement.textContent = pageTitles[pageName];
    }
}

// Dashboard statistics
function setupDashboardStats() {
    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        animateNumber(stat, 0, finalValue, 1000);
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Responsive sidebar
function setupResponsiveSidebar() {
    const sidebar = document.querySelector('.admin-sidebar');
    const main = document.querySelector('.admin-main');
    
    // Add mobile menu toggle button
    const header = document.querySelector('.admin-header');
    const mobileToggle = document.createElement('button');
    mobileToggle.innerHTML = '☰';
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.style.display = 'none';
    
    // Style the mobile toggle button
    mobileToggle.style.cssText = `
        background: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
    `;
    
    header.insertBefore(mobileToggle, header.firstChild);
    
    // Toggle sidebar on mobile
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Show mobile toggle on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
            sidebar.classList.remove('active');
        } else {
            mobileToggle.style.display = 'none';
            sidebar.classList.remove('active');
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Initialize charts (placeholder for future chart implementations)
function initializeCharts() {
    // This would integrate with chart libraries like Chart.js
    console.log('Charts initialized');
}

// Utility functions for admin operations
const AdminUtils = {
    // Show notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            'info': '#3498db',
            'success': '#27ae60',
            'warning': '#f39c12',
            'error': '#e74c3c'
        };
        
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    },
    
    // Confirm action
    confirmAction: function(message, callback) {
        if (confirm(message)) {
            callback();
        }
    },
    
    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },
    
    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(amount);
    }
};

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
`;
document.head.appendChild(notificationStyles);

// Export for use in other admin pages
window.AdminUtils = AdminUtils;