# Birthday Website

A beautiful, elegant, and heartfelt birthday website with animations and interactive elements.

## Overview

This website is designed to express sincere heartfelt birthday wishes. It features:

- Elegant, feminine design with soft colors
- Animated elements like floating hearts and sparkles
- Interactive gift box with a countdown timer
- Fully responsive design for all devices
- Simple HTML/CSS/JavaScript implementation

## Project Structure

```
Gift/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Main stylesheet
│   └── animations.css  # CSS for animations
├── js/
│   ├── main.js         # Main JavaScript file
│   └── animations.js   # JS for complex animations
├── assets/
│   ├── images/         # Background images, icons (optional)
│   ├── fonts/          # Custom fonts (optional)
│   └── audio/          # Background music (optional)
└── README.md           # This file
```

## Quick Start

To view the website locally:

1. Simply open the `index.html` file in any modern web browser.

That's it! No build process or server setup required.

## Deployment Options

### Option 1: Direct Hosting

Upload all files to any web hosting service that supports static websites.

1. Upload all files and folders to your web hosting service
2. Ensure you maintain the same directory structure
3. Access the website via the URL provided by your hosting service

### Option 2: GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select the branch you want to deploy (usually `main`)
5. Click Save, and your site will be published at `https://yourusername.github.io/repositoryname/`

### Option 3: Netlify/Vercel

1. Create an account on [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)
2. Drag and drop the entire project folder onto their upload area, or connect to your GitHub repository
3. The site will be automatically deployed with a unique URL

## Customization

### Changing the Text

Edit the text content in `index.html` to personalize the messages.

### Modifying Colors

The color scheme can be easily changed by editing the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #FFD1DC;    /* Soft pink */
    --secondary-color: #E6E6FA;  /* Lavender */
    --accent-color: #B76E79;     /* Rose gold */
    --text-dark: #333333;        /* Dark gray */
    --text-light: #FFFFFF;       /* White */
    /* ... */
}
```

### Countdown Timer

The countdown timer is set to 2 days from the current date by default. To change this:

1. Open `js/main.js`
2. Find the `initCountdown()` function
3. Modify the `countdownDate` variable to your desired date

```javascript
// Example: Set to a specific date
const countdownDate = new Date("2025-06-01T20:00:00");
```

### Adding a Phone Number

To add your phone number to the "Call Me" button:

1. Open `js/main.js`
2. Find the commented line at the bottom: `// setPhoneNumber('1234567890');`
3. Uncomment it and replace '1234567890' with your actual phone number

### Adding Background Music (Optional)

To add background music:

1. Place your audio file in the `assets/audio/` directory
2. Add the following code to `index.html` just before the closing `</body>` tag:

```html
<audio id="background-music" loop>
    <source src="assets/audio/your-music-file.mp3" type="audio/mp3">
</audio>
<button id="music-toggle" class="music-button">🎵</button>
```

3. Add the following styles to `css/style.css`:

```css
.music-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--accent-color);
    color: var(--text-light);
    border: none;
    cursor: pointer;
    z-index: 100;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.music-button:hover {
    opacity: 1;
}
```

4. Add the following code to `js/main.js`:

```javascript
// Initialize background music
function initBackgroundMusic() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.textContent = '🔊';
            } else {
                backgroundMusic.pause();
                musicToggle.textContent = '🎵';
            }
        });
    }
}

// Call the function in the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... other initializations
    initBackgroundMusic();
});
```

## Browser Compatibility

This website is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- The website uses CSS animations and JavaScript for visual effects
- For users with motion sensitivity, the site respects the `prefers-reduced-motion` media query
- All animations are optimized for performance on mobile devices

## License

Feel free to use and modify this website for your personal use.

---

Created with ❤️ as a heartfelt apology and birthday wish.
