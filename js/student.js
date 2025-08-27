// Student Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeStudentDashboard();
});

function initializeStudentDashboard() {
    setupNavigation();
    setupResponsiveSidebar();
}

// Navigation setup
function setupNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');

            const pageName = this.getAttribute('data-page');
            loadPageContent(pageName);
        });
    });
}

// Load page content
function loadPageContent(pageName) {
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    updatePageTitle(pageName);
}

// Update page title
function updatePageTitle(pageName) {
    const pageTitles = {
        'dashboard': 'Dashboard',
        'bookings': 'My Bookings',
        'profile': 'My Profile',
        'payments': 'Payment History',
        'announcements': 'Announcements'
    };

    const titleElement = document.querySelector('.header-left h1');
    if (titleElement && pageTitles[pageName]) {
        titleElement.textContent = pageTitles[pageName];
    }
}

// Responsive sidebar
function setupResponsiveSidebar() {
    const sidebar = document.querySelector('.student-sidebar');
    const header = document.querySelector('.student-header');

    const mobileToggle = document.createElement('button');
    mobileToggle.innerHTML = '☰';
    mobileToggle.className = 'mobile-menu-toggle';

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

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
        } else {
            mobileToggle.style.display = 'none';
            sidebar.classList.remove('active');
        }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}
