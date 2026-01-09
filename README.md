# GroupThem - Random Group Generator 🎲

A Progressive Web App (PWA) for randomly assigning students to groups.

## Features

- ✅ Random group assignment with customizable number of groups
- ✅ Offline support (PWA enabled)
- ✅ Installable on desktop and mobile devices
- ✅ Local storage to save your student lists
- ✅ Responsive design
- ✅ Beautiful gradient UI
- ✅ Keyboard shortcuts (Ctrl/Cmd + Enter to generate)

## How to Use

1. **Enter Student Names**: Type student names in the text area, one per line
2. **Set Number of Groups**: Choose how many groups you want to create
3. **Generate Groups**: Click "Generate Groups" button or press Ctrl/Cmd + Enter
4. **View Results**: See the randomly assigned groups displayed below

## Installation

### Local Development

1. Open the project folder in a local web server (you can use VS Code Live Server extension)
2. Navigate to `http://localhost:5500` (or your server's URL)
3. The app will prompt you to install it as a PWA

### PWA Icons

The project includes an SVG icon template at `icons/icon.svg`. To generate PNG icons for all required sizes, you can:

**Option 1: Use an online tool**

- Visit https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
- Upload the `icons/icon.svg` file
- Download the generated icon pack
- Place the PNG files in the `icons/` folder

**Option 2: Use ImageMagick (CLI)**

```bash
# Install ImageMagick first, then run:
magick icons/icon.svg -resize 72x72 icons/icon-72x72.png
magick icons/icon.svg -resize 96x96 icons/icon-96x96.png
magick icons/icon.svg -resize 128x128 icons/icon-128x128.png
magick icons/icon.svg -resize 144x144 icons/icon-144x144.png
magick icons/icon.svg -resize 152x152 icons/icon-152x152.png
magick icons/icon.svg -resize 192x192 icons/icon-192x192.png
magick icons/icon.svg -resize 384x384 icons/icon-384x384.png
magick icons/icon.svg -resize 512x512 icons/icon-512x512.png
```

## Project Structure

```
GroupThem/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── service-worker.js   # Service worker for offline support
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── app.js          # Application logic
└── icons/
    ├── icon.svg        # SVG icon template
    └── icon-*.png      # PNG icons (to be generated)
```

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Service Workers
- Web App Manifest
- LocalStorage API

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with PWA support

## License

Free to use for educational purposes.

---

**Made with ❤️ for educators and students**
