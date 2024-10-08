// Select the toggle button and SVG icons
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

// Select the audio toggle button and audio player
const audioToggle = document.getElementById('audio-toggle');
const audioPlayer = document.getElementById('audio-player');

// Function to generate stars
function generateStars() {
    const starContainer = document.querySelector('.star-container');
    starContainer.innerHTML = ''; // Clear existing stars

    const numStars = 50; // Adjust the number as needed

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random initial position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        // Random angle and distance
        const angle = Math.random() * 360;
        const distance = Math.random() * 200 + 100; // 100 to 300 pixels
        const endX = Math.cos(angle * Math.PI / 180) * distance;
        const endY = Math.sin(angle * Math.PI / 180) * distance;
        star.style.setProperty('--star-end-x', `${endX}px`);
        star.style.setProperty('--star-end-y', `${endY}px`);

        // Random animation duration and delay
        const duration = Math.random() * 20 + 20; // 20 to 40 seconds
        const delay = Math.random() * 20; // 0 to 20 seconds
        star.style.animationDuration = `${duration}s, ${Math.random() * 5 + 5}s`;
        star.style.animationDelay = `${delay}s, ${Math.random() * 5}s`;

        starContainer.appendChild(star);
    }
}

// Function to toggle theme
function toggleTheme() {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        // Switch to Light Mode
        sunIcon.style.display = 'block'; // Show Sun
        moonIcon.style.display = 'none'; // Hide Moon
        themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');

        // Remove stars and hide asteroids
        const starContainer = document.querySelector('.star-container');
        if (starContainer) {
            starContainer.innerHTML = '';
        }
        const asteroidContainer = document.querySelector('.asteroid-container');
        if (asteroidContainer) {
            asteroidContainer.style.display = 'none';
        }
    } else {
        // Switch to Dark Mode
        sunIcon.style.display = 'none'; // Hide Sun
        moonIcon.style.display = 'block'; // Show Moon
        themeToggle.setAttribute('aria-label', 'Switch to Light Mode');

        // Generate stars and show asteroids
        generateStars();
        const asteroidContainer = document.querySelector('.asteroid-container');
        if (asteroidContainer) {
            asteroidContainer.style.display = 'block';
        }
    }

    // Save the user's preference in localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}

// Function to toggle audio play/pause
function toggleAudio() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        // Change to Pause Icon
        audioToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
    } else {
        audioPlayer.pause();
        // Change back to Play Icon
        audioToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
        `;
    }
}

// Event listener for the theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Event listener for the audio toggle button
audioToggle.addEventListener('click', toggleAudio);

// Check for saved user preference, if any, on initial load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');

    // Hide asteroids on initial load in light mode
    const asteroidContainer = document.querySelector('.asteroid-container');
    if (asteroidContainer) {
        asteroidContainer.style.display = 'none';
    }
} else {
    body.classList.remove('light-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    themeToggle.setAttribute('aria-label', 'Switch to Light Mode');

    // Generate stars on initial load in dark mode
    generateStars();

    // Show asteroids on initial load in dark mode
    const asteroidContainer = document.querySelector('.asteroid-container');
    if (asteroidContainer) {
        asteroidContainer.style.display = 'block';
    }
}
