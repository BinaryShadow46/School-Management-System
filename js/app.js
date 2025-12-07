// PWA Installation
let deferredPrompt;
const installButton = document.getElementById('installButton');
const pwaStatus = document.getElementById('pwaStatus');

// Check PWA support
if ('serviceWorker' in navigator && 'PushManager' in window) {
    pwaStatus.textContent = 'PWA: Supported ✅';
    pwaStatus.style.color = '#10b981';
} else {
    pwaStatus.textContent = 'PWA: Not Supported ❌';
    pwaStatus.style.color = '#ef4444';
}

// Install button handler
installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    }
});

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'inline-flex';
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Online/Offline Detection
window.addEventListener('online', () => {
    showNotification('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    showNotification('You are offline. Some features may be limited.', 'warning');
});

// Notification Function
function showNotification(message, type = 'info') {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(message);
    }
}

// Request Notification Permission
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

// Load online images with fallback
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/600x400/4f46e5/ffffff?text=Image+Not+Found';
        };
    });
});
