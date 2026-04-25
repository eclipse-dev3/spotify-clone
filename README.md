# MusicX — Music Player App

A sleek, Spotify-inspired music player built with **pure HTML, CSS, and Vanilla JavaScript**.  
Enjoy seamless music playback with a pixel-perfect, responsive interface — no frameworks, no backend, just clean frontend code.

---

## 🔗 Live Demo

**[ownmusicx.vercel.app](https://ownmusicx.vercel.app)**

---

## 📌 Overview

MusicX is a fully client-side music player that replicates the core Spotify experience using only **Vanilla JavaScript and DOM manipulation**. Built to demonstrate strong frontend fundamentals — from audio control logic to responsive UI design — without relying on any JavaScript framework.

---

## ✨ Features

### 🎵 Music Playback
- **Play / Pause** with smooth toggle control
- **Next / Previous** track navigation
- **Real-time progress bar** with interactive seek functionality
- **Dynamic song loading** from local directory
- Track duration display with proper time formatting

### 🎨 UI & UX
- Pixel-perfect, **Spotify-inspired dark interface**
- Fully **responsive** — mobile to desktop
- **Active song highlighting** in playlist
- Fluid animations and smooth transitions
- Clean, minimalist sidebar and player layout

### 📂 Playlist Management
- **Dynamic playlist rendering** via DOM manipulation
- **Auto-play** next track on song completion
- Smooth song switching with active state tracking
- Album cover display per track

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup & structure |
| **CSS3** | Flexbox, Grid & responsive design |
| **Vanilla JavaScript (ES6+)** | Audio engine & DOM manipulation |
| **JavaScript Events** | Playback controls & interactions |
| **Local Directory** | Song & asset management |

---

## 📁 Project Structure

```
musicx/
├── songs/              # Audio files organized by album
│   ├── album1/
│   ├── album2/
│   └── info.json       # Track metadata
├── svg/                # Vector icons
├── assets/             # Images & cover art
├── index.html          # Application entry point
├── style.css           # Core styles & layout
└── script.js           # Application logic & audio engine
```

---

## 🚀 Getting Started

### Prerequisites
- A modern browser (Chrome / Firefox / Edge / Safari)
- A local server (recommended for audio loading)

### Installation

```bash
# Clone the repository
git clone https://github.com/eclipse-dev3/MusicX-Player

# Navigate into the project
cd musicx-player
```

### Launch

```bash
# Option 1 — VS Code Live Server (recommended)
# Install Live Server extension → Right click index.html → Open with Live Server

# Option 2 — Python local server
python -m http.server 3000

# Option 3 — Direct browser open
# Simply open index.html in your browser
```

### Adding Your Own Music

1. Add audio files to the `/songs` directory
2. Update track metadata in `info.json`
3. Add matching cover art to `/assets`
4. Refresh the browser

---

## 📋 Usage Notes

- Songs load from **local directory** — ensure file paths are correct
- For best audio performance, use a **local server** instead of opening directly
- Supported formats: **MP3, OGG, WAV**
- Mobile browsers may require a user interaction before audio plays (browser policy)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please keep PRs small, focused, and well-documented.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

**Gourav Kumar** — Frontend Developer

- 🌐 Portfolio: [gauravk.vercel.app](https://gauravk.vercel.app)
- 💻 GitHub: [github.com/eclipse-dev3](https://github.com/eclipse-dev3)

---

> Built with ❤️ using HTML, CSS & Vanilla JavaScript