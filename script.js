/**
 * Turlock Local Area Alerts - Main JavaScript
 * Handles all interactive functionality for the alerts system
 */

// ===== DOM Elements =====
const elements = {
    searchBox: document.querySelector('.search-box'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    newsItems: document.querySelectorAll('.news-item:not(#trafficAlert)'),
    floatingButton: document.querySelector('.floating-button'),
    modal: document.querySelector('.modal'),
    overlay: document.querySelector('.overlay'),
    closeButton: document.querySelector('.close-button'),
    contactForm: document.querySelector('.contact-form form'),
    emergencyCounter: document.querySelector('.emergency-counter'),
    reportForm: document.getElementById('reportForm')
};

// ===== State Management =====
const state = {
    activeEmergencies: 1
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateEmergencyCounter();
    addVisualEffects();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Filter buttons
    elements.filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Modal controls
    elements.floatingButton.addEventListener('click', openModal);
    elements.closeButton.addEventListener('click', closeModal);

    // Form submissions
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactSubmit);
    }

    if (elements.reportForm) {
        elements.reportForm.addEventListener('submit', handleReportSubmit);
    }

    // Share buttons
    elements.newsItems.forEach(item => {
        addShareButton(item);
    });
}

/**
 * Add visual effects to the page
 */
function addVisualEffects() {
    const effects = {
        scanline: document.createElement('div'),
        noise: document.createElement('div')
    };

    effects.scanline.className = 'scanline';
    effects.noise.className = 'noise';

    document.body.appendChild(effects.scanline);
    document.body.appendChild(effects.noise);
}

// ===== Event Handlers =====
/**
 * Handle filter button clicks
 * @param {Event} e - Click event
 */
function handleFilterClick(e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href')?.substring(1); // Remove the # from href
    
    if (!targetId || targetId === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const element = document.getElementById(targetId);
    if (element) {
        // Get the element's position relative to the viewport
        const rect = element.getBoundingClientRect();
        
        // Calculate the scroll position
        // We want the element to appear near the top of the viewport
        const scrollPosition = window.pageYOffset + rect.top - window.innerHeight * 0.15;
        
        window.scrollTo({
            top: Math.max(0, scrollPosition), // Ensure we don't scroll past the top
            behavior: 'smooth'
        });

        // For emergency section, add a slight adjustment after initial scroll
        if (targetId === 'emergency-section') {
            setTimeout(() => {
                const currentScroll = window.pageYOffset;
                window.scrollTo({
                    top: Math.max(0, currentScroll - 50),
                    behavior: 'smooth'
                });
            }, 800);
        }
    }
}

/**
 * Handle contact form submission
 * @param {Event} e - Submit event
 */
function handleContactSubmit(e) {
    e.preventDefault();
    showSuccessMessage('Message sent successfully!');
    elements.contactForm.reset();
}

/**
 * Handle report form submission
 * @param {Event} e - Submit event
 */
function handleReportSubmit(e) {
    e.preventDefault();
    
    const formData = {
        incidentType: e.target.querySelector('.incident-type').value,
        location: e.target.querySelector('input[placeholder="Location"]').value,
        details: e.target.querySelector('textarea').value
    };
    
    if (!validateReportForm(formData)) {
        return;
    }
    
    const newReport = createReportElement(formData);
    addReportToSection(formData.incidentType, newReport);
    
    showSuccessMessage('Report submitted successfully!');
    e.target.reset();
    closeModal();
}

// ===== Helper Functions =====
/**
 * Validate report form data
 * @param {Object} data - Form data to validate
 * @returns {boolean} Whether the data is valid
 */
function validateReportForm(data) {
    if (!data.incidentType || !data.location || !data.details) {
        showSuccessMessage('Please fill in all required fields');
        return false;
    }
    return true;
}

/**
 * Create a new report element
 * @param {Object} data - Report data
 * @returns {HTMLElement} New report element
 */
function createReportElement(data) {
    const newReport = document.createElement('div');
    newReport.className = 'news-item';
    newReport.setAttribute('data-type', 'emergency');
    newReport.innerHTML = `
        <div class="news-content">
            <h3 class="news-title">${getIncidentTitle(data.incidentType)}</h3>
            <div class="news-meta">
                <span>Just now</span>
                <span>📍 ${data.location}</span>
            </div>
            <p class="news-description">${data.details}</p>
        </div>
        <div class="news-footer">
            <span class="news-tag">${getIncidentTag(data.incidentType)}</span>
        </div>
    `;
    return newReport;
}

/**
 * Add report to appropriate section
 * @param {string} incidentType - Type of incident
 * @param {HTMLElement} newReport - Report element to add
 */
function addReportToSection(incidentType, newReport) {
    if (incidentType === '5' || incidentType === '4') {
        const emergencySection = document.querySelector('#emergency-section .news-grid');
        emergencySection.insertBefore(newReport, emergencySection.firstChild);
        state.activeEmergencies++;
        updateEmergencyCounter();
    } else if (incidentType === '1' || incidentType === '2') {
        const citizenSection = document.querySelector('#department-section .news-grid');
        citizenSection.insertBefore(newReport, citizenSection.firstChild);
    }
}

/**
 * Add share button to news item
 * @param {HTMLElement} item - News item element
 */
function addShareButton(item) {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '📤';
    shareBtn.title = 'Share this news';

    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = item.querySelector('.news-title').textContent;
        const text = item.querySelector('.news-description').textContent;

        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
            showSuccessMessage('Sharing is not supported on this browser');
        }
    });

    item.appendChild(shareBtn);
}

/**
 * Show success message
 * @param {string} message - Message to display
 */
function showSuccessMessage(message) {
    const alertBanner = document.createElement('div');
    alertBanner.className = 'alert-banner';
    alertBanner.textContent = message;
    alertBanner.setAttribute('role', 'alert');
    alertBanner.setAttribute('aria-live', 'polite');
    document.body.appendChild(alertBanner);
    
    // Ensure the banner is visible
    setTimeout(() => {
        alertBanner.style.display = 'block';
    }, 100);
    
    // Remove the banner after 3 seconds
    setTimeout(() => {
        alertBanner.style.opacity = '0';
        setTimeout(() => alertBanner.remove(), 300);
    }, 3000);
}

/**
 * Open modal
 */
function openModal() {
    elements.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal() {
    elements.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Update emergency counter
 */
function updateEmergencyCounter() {
    elements.emergencyCounter.textContent = `${state.activeEmergencies} ACTIVE`;
}

/**
 * Get incident title based on type
 * @param {string} type - Incident type
 * @returns {string} Incident title
 */
function getIncidentTitle(type) {
    const titles = {
        '1': 'Awareness Report',
        '2': 'Caution Advisory',
        '3': 'Possible Threat Alert',
        '4': 'Threat Alert',
        '5': 'Police Warning'
    };
    return titles[type] || 'New Report';
}

/**
 * Get incident tag based on type
 * @param {string} type - Incident type
 * @returns {string} Incident tag
 */
function getIncidentTag(type) {
    const tags = {
        '1': 'Awareness',
        '2': 'Caution',
        '3': 'Threat',
        '4': 'Extreme Caution',
        '5': 'Police Only'
    };
    return tags[type] || 'Report';
}

// ===== Periodic Updates =====
setInterval(() => {
    const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    state.activeEmergencies = Math.max(0, state.activeEmergencies + change);
    updateEmergencyCounter();
}, 30000);

// Add hover effects to devices
const devices = document.querySelectorAll('.device');
devices.forEach(device => {
    device.addEventListener('mouseover', () => {
        device.style.transform = 'rotateY(10deg) rotateX(5deg)';
    });

    device.addEventListener('mouseout', () => {
        device.style.transform = 'rotateY(0) rotateX(0)';
    });
});