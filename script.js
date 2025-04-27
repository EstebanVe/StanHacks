// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

// var tl = gsap.timeline()
// tl.to("#page1", {
//     y: "100vh",
//     scale: 0.6,
//     duration: 0
// })
// tl.to("#page1", {
//     y: "30vh",
//     duration: 1,
//     delay: 1
// })
// tl.to("#page1", {
//     y: "0vh",
//     rotate: 360,
//     scale: 1,
//     duration: 0.7
// })

// DOM Elements
const searchBox = document.querySelector('.search-box');
const filterButtons = document.querySelectorAll('.filter-btn');
const newsItems = document.querySelectorAll('.news-item:not(#trafficAlert)'); // Exclude traffic alert
const floatingButton = document.querySelector('.floating-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-button');
const contactForm = document.querySelector('.contact-form form');

// Filter and scroll functionality
// Simple button click handler
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const targetId = this.getAttribute('data-scroll');
        if (targetId === 'all') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Search and filter functionality
function filterContent() {
    const searchTerm = searchBox.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

    document.querySelectorAll('.news-section').forEach(section => {
        const sectionType = section.id.replace('-section', '');
        const shouldShow = activeFilter === 'all' || sectionType === activeFilter;
        section.style.display = shouldShow ? 'block' : 'none';
    });

    if (searchTerm) {
        document.querySelectorAll('.news-item').forEach(item => {
            const title = item.querySelector('.news-title').textContent.toLowerCase();
            const description = item.querySelector('.news-description').textContent.toLowerCase();
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            item.style.display = matchesSearch ? 'flex' : 'none';
        });
    }
}

// Modal functionality
floatingButton.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeButton.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Share functionality
newsItems.forEach(item => {
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
            })
                .catch(console.error);
        } else {
            alert('Sharing is not supported on this browser');
        }
    });

    item.appendChild(shareBtn);
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const alertBanner = document.createElement('div');
    alertBanner.className = 'alert-banner';

    // Simulate form submission
    setTimeout(() => {
        alertBanner.textContent = 'Message sent successfully!';
        document.body.appendChild(alertBanner);

        // Clear form
        contactForm.reset();

        // Remove alert after 3 seconds
        setTimeout(() => {
            alertBanner.remove();
        }, 3000);
    }, 1000);
});

// Report form submission
const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const incidentType = reportForm.querySelector('.incident-type').value;
        const location = reportForm.querySelector('input[placeholder="Location"]').value;
        const details = reportForm.querySelector('textarea').value;
        const contact = reportForm.querySelector('input[placeholder="Contact Information (Optional)"]').value;
        
        // Create new report element
        const newReport = document.createElement('div');
        newReport.className = 'news-item';
        newReport.innerHTML = `
            <div class="news-content">
                <h3 class="news-title">${getIncidentTitle(incidentType)}</h3>
                <div class="news-meta">
                    <span>Just now</span>
                    <span>📍 ${location}</span>
                </div>
                <p class="news-description">
                    ${details}
                </p>
            </div>
            <div class="news-footer">
                <span class="news-tag">${getIncidentTag(incidentType)}</span>
            </div>
        `;
        
        // Add to appropriate section based on incident type
        const citizenSection = document.querySelector('#department-section .news-grid');
        if (incidentType === '1' || incidentType === '2') {
            citizenSection.insertBefore(newReport, citizenSection.firstChild);
        }
        
        // Show success message
        const alertBanner = document.createElement('div');
        alertBanner.className = 'alert-banner';
        alertBanner.textContent = 'Report submitted successfully!';
        document.body.appendChild(alertBanner);
        
        // Clear form and close modal
        reportForm.reset();
        closeModal();
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alertBanner.remove();
        }, 3000);
    });
}

// Helper functions for incident types
function getIncidentTitle(type) {
    const titles = {
        '1': 'Awareness Report',
        '2': 'Caution Advisory',
        '3': 'Possible Threat Alert',
        '4': 'Threat Alert'
    };
    return titles[type] || 'New Report';
}

function getIncidentTag(type) {
    const tags = {
        '1': 'Awareness',
        '2': 'Caution',
        '3': 'Threat',
        '4': 'Extreme Caution'
    };
    return tags[type] || 'Report';
}

// Emergency counter update
const emergencyCounter = document.querySelector('.emergency-counter');
let activeEmergencies = 3; // Initial value

function updateEmergencyCounter() {
    emergencyCounter.textContent = `${activeEmergencies} Active`;
}

// Update counter periodically (simulated)
setInterval(() => {
    // Simulate random changes in emergency count
    const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
    activeEmergencies = Math.max(0, activeEmergencies + change);
    updateEmergencyCounter();
}, 30000);

// Initialize emergency counter
updateEmergencyCounter();

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

// Scanline effect
const scanline = document.createElement('div');
scanline.className = 'scanline';
document.body.appendChild(scanline);

// Noise effect
const noise = document.createElement('div');
noise.className = 'noise';
document.body.appendChild(noise);