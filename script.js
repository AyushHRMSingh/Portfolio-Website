// ==========================================
// CYBERPUNK 2077 - TERMINAL UI JAVASCRIPT
// ==========================================

// ==========================================
// BOOT ANIMATION
// ==========================================

function startBootAnimation() {
    const bootOverlay = document.getElementById('boot-animation');
    const bootLines = document.querySelectorAll('.boot-line');
    const bootTexts = document.querySelectorAll('.boot-text');
    const progressBar = document.getElementById('boot-progress-bar');
    const bootTime = document.getElementById('boot-time');

    // Update boot time
    function updateBootTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        bootTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
    updateBootTime();
    const timeInterval = setInterval(updateBootTime, 1000);

    // Typing effect for each line
    function typeText(element, text, speed = 50) {
        return new Promise((resolve) => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                } else {
                    clearInterval(interval);
                    element.classList.add('typing-done');
                    resolve();
                }
            }, speed);
        });
    }

    // Animate boot sequence
    async function animateBootSequence() {
        for (let i = 0; i < bootLines.length; i++) {
            bootLines[i].style.animationDelay = `${i * 0.025}s`;
            bootLines[i].style.opacity = '1';

            const textElement = bootTexts[i];
            const text = textElement.getAttribute('data-text');

            await new Promise(resolve => setTimeout(resolve, 25 + (i * 25)));
            await typeText(textElement, text, 8); // Ultra fast typing

            // Update progress bar
            const progress = ((i + 1) / bootLines.length) * 100;
            progressBar.style.width = `${progress}%`;

            await new Promise(resolve => setTimeout(resolve, 25)); // Very short delay
        }

        // Instant fade out
        await new Promise(resolve => setTimeout(resolve, 150));
        clearInterval(timeInterval);
        bootOverlay.classList.add('fade-out');

        // Remove from DOM after fade
        setTimeout(() => {
            bootOverlay.style.display = 'none';
        }, 150);
    }

    animateBootSequence();
}

// Start boot animation on page load
window.addEventListener('DOMContentLoaded', startBootAnimation);

// ==========================================
// SYSTEM TIME
// ==========================================

// Update system time
function updateSystemTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeElement = document.getElementById('system-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Initialize time and update every second
updateSystemTime();
setInterval(updateSystemTime, 1000);

// Terminal Navigation System
const menuItems = document.querySelectorAll('.menu-item');
const screens = document.querySelectorAll('.screen');

// Handle menu item clicks
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        navigateToScreen(target);
    });
});

// Handle button navigation
document.querySelectorAll('[data-nav]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-nav');
        navigateToScreen(target);
    });
});

// Navigate to screen function
function navigateToScreen(targetId) {
    // Remove active class from all menu items and screens
    menuItems.forEach(item => item.classList.remove('active'));
    screens.forEach(screen => screen.classList.remove('active'));

    // Add active class to target
    const targetMenuItem = document.querySelector(`[data-target="${targetId}"]`);
    const targetScreen = document.getElementById(targetId);

    if (targetMenuItem) targetMenuItem.classList.add('active');
    if (targetScreen) {
        targetScreen.classList.add('active');
        // Scroll to top of content area
        document.querySelector('.content-area').scrollTop = 0;
    }
}

// Random glitch effect
function triggerGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    if (glitchElements.length > 0) {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 10);
    }
}

// Trigger glitch effect periodically
setInterval(triggerGlitch, 4000);

// Typing effect for terminal
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// Initialize typing effect on boot screen if needed
window.addEventListener('load', () => {
    const bootScreen = document.getElementById('boot');
    if (bootScreen && bootScreen.classList.contains('active')) {
        // Add any boot sequence animations here
        console.log('%c SYSTEM BOOT COMPLETE ', 'background: #FF003C; color: #000; font-size: 16px; font-weight: bold; padding: 8px;');
        console.log('%c NETRUNNER OS v2.077 ', 'background: #00F0FF; color: #000; font-size: 14px; padding: 5px;');
        console.log('%c > USER: A.SINGH', 'color: #FCE300; font-family: monospace;');
        console.log('%c > STATUS: ONLINE', 'color: #00F0FF; font-family: monospace;');
        console.log('%c > WELCOME TO NIGHT CITY', 'color: #FF003C; font-family: monospace;');
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const screens = ['boot', 'profile', 'projects', 'contact'];
        const index = parseInt(e.key) - 1;
        if (screens[index]) {
            navigateToScreen(screens[index]);
        }
    }
});

// Smooth scroll for content area
document.querySelector('.content-area')?.addEventListener('scroll', () => {
    // Add parallax or other scroll effects here if needed
});

// Add hover sound effect simulation (visual feedback)
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Visual feedback on hover
        item.style.transition = 'all 0.1s';
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('%c CHEAT CODE ACTIVATED! ', 'background: #FCE300; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
        console.log('%c You found the easter egg, choomba! ', 'color: #00F0FF; font-size: 14px;');
        // Add special effect
        document.body.style.animation = 'glitch-screen 0.3s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 300);
    }
});
