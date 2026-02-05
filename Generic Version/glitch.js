function wrapTextWithGlitch(element) {
    const text = element.textContent.trim();
    if (text) {
        element.innerHTML = `<span class="glitch-text" data-text="${text}"><span>${text}</span></span>`;
    }
}

function applyGlitchToAllText() {
    // Apply to all text elements
    const selectors = 'h1, h2, h3, h4, h5, h6, p, a, button, li';
    const textElements = document.querySelectorAll(selectors);

    textElements.forEach(el => {
        // Only wrap if it doesn't have child elements and has text
        if (el.children.length === 0 && el.textContent.trim() !== '' && !el.classList.contains('glitch-text')) {
            wrapTextWithGlitch(el);
        }
    });
}

function removeGlitchFromAllText() {
    document.querySelectorAll('.glitch-text').forEach(el => {
        const span = el.querySelector('span');
        if (span && el.parentNode) {
            el.parentNode.textContent = span.textContent;
        }
    });
}

function revealSecret() {
    const sidebar = document.getElementById('secretSidebar');
    const button = document.getElementById('secretButton');

    // Apply glitch to all text elements
    applyGlitchToAllText();

    // Remove glitch and slide in button after 1 second
    setTimeout(() => {
        removeGlitchFromAllText();
        sidebar.style.display = 'none';
        button.style.right = '20px'; // Slide in

        // Add click-outside-to-dismiss listener for both mouse and touch
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }, 100);
    }, 1000);
}

function handleClickOutside(e) {
    const button = document.getElementById('secretButton');
    const sidebar = document.getElementById('secretSidebar');

    // Check if click/touch is outside the button
    if (!button.contains(e.target)) {
        button.style.right = '-300px'; // Slide out
        sidebar.style.display = 'flex'; // Show psst again
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
    }
}

function triggerGlitchSwitch() {
    // Remove listeners before switching
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
    window.parent.postMessage('switchToCool', '*');
}
