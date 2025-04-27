const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var tl = gsap.timeline()

tl.to("#page1", {
    y: "100vh",
    scale: 0.6,
    duration: 0
})
tl.to("#page1", {
    y: "30vh",
    duration: 1,
    delay: 1
})
tl.to("#page1", {
    y: "0vh",
    rotate: 360,
    scale: 1,
    duration: 0.7
})

// DOM Elements
const searchBox = document.querySelector('.search-box');
const filterButtons = document.querySelectorAll('.filter-btn');
const newsItems = document.querySelectorAll('.news-item');
const floatingButton = document.querySelector('.floating-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-button');
const contactForm = document.querySelector('.contact-form form');

// Search functionality
searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    newsItems.forEach(item => {
        const title = item.querySelector('.news-title').textContent.toLowerCase();
        const description = item.querySelector('.news-description').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        item.style.display = isVisible ? 'flex' : 'none';
    });
});

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter news items
        newsItems.forEach(item => {
            if (category === 'all') {
                item.style.display = 'flex';
            } else {
                const itemCategory = item.getAttribute('data-category');
                item.style.display = itemCategory === category ? 'flex' : 'none';
            }
        });

        // Smooth scroll to section
        const targetSection = document.querySelector(`#${category}-section`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Modal functionality
floatingButton.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
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