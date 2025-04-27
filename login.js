// DOM Elements
const elements = {
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    registerBtn: document.getElementById('registerBtn'),
    registerModal: document.getElementById('registerModal'),
    registerOverlay: document.getElementById('registerOverlay'),
    closeRegisterModal: document.getElementById('closeRegisterModal')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    elements.loginForm?.addEventListener('submit', handleLogin);
    elements.registerForm?.addEventListener('submit', handleRegister);
    elements.registerBtn?.addEventListener('click', openRegisterModal);
    elements.closeRegisterModal?.addEventListener('click', closeRegisterModal);
    elements.registerOverlay?.addEventListener('click', closeRegisterModal);
}

/**
 * Handle login form submission
 * @param {Event} e - Submit event
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = {
        username: e.target.username.value,
        password: e.target.password.value,
        remember: e.target.remember.checked
    };

    try {
        // TODO: Replace with actual MongoDB/backend integration
        const response = await mockLoginRequest(formData);
        
        if (response.success) {
            // Store the token in localStorage or sessionStorage based on remember me
            const storage = formData.remember ? localStorage : sessionStorage;
            storage.setItem('authToken', response.token);
            
            // Redirect to main page e
            window.location.href = 'index.html';
        } else {
            showError('Invalid username or password');
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
        console.error('Login error:', error);
    }
}

/**
 * Handle registration form submission
 * @param {Event} e - Submit event
 */
async function handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value
    };

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    try {
        // TODO: Replace with actual MongoDB/backend integration
        const response = await mockRegisterRequest(formData);
        
        if (response.success) {
            showSuccess('Registration successful! Please log in.');
            closeRegisterModal();
            e.target.reset();
        } else {
            showError(response.message || 'Registration failed');
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
        console.error('Registration error:', error);
    }
}

/**
 * Open registration modal
 * @param {Event} e - Click event
 */
function openRegisterModal(e) {
    e.preventDefault();
    elements.registerModal.style.display = 'block';
    elements.registerOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Close registration modal
 */
function closeRegisterModal() {
    elements.registerModal.style.display = 'none';
    elements.registerOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    showMessage(message, 'error');
}

/**
 * Show success message
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
    showMessage(message, 'success');
}

/**
 * Show message with type
 * @param {string} message - Message to display
 * @param {string} type - Message type ('error' or 'success')
 */
function showMessage(message, type) {
    const alertBanner = document.createElement('div');
    alertBanner.className = `alert-banner ${type}`;
    alertBanner.textContent = message;
    document.body.appendChild(alertBanner);
    
    setTimeout(() => {
        alertBanner.style.opacity = '0';
        setTimeout(() => alertBanner.remove(), 300);
    }, 3000);
}

// Mock functions for future MongoDB integration
async function mockLoginRequest(data) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual MongoDB/backend authentication
    if (data.username === 'police' && data.password === 'police') {
        return {
            success: true,
            token: 'police-jwt-token',
            userType: 'police'
        };
    }
    // Citizen login
    if (data.username === 'citizen' && data.password === 'citizen') {
        return {
            success: true,
            token: 'citizen-jwt-token',
            userType: 'citizen'
        };
    }
    return {
        success: false,
        message: 'Invalid credentials'
    };
}

async function mockRegisterRequest(data) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace with actual MongoDB/backend registration
    if (data.username && data.email && data.password) {
        return {
            success: true,
            message: 'Registration successful'
        };
    }
    return {
        success: false,
        message: 'Registration failed'
    };
} 