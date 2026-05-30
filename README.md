# 🙏 Operation Maaf Karo 1/5 Footiya

A cute and dramatic sibling apology simulator built with pure HTML, CSS, and JavaScript. Send this to your sibling when you've messed up and need forgiveness -- complete with fingerprint scanning, anger detection, an escaping "No" button, confetti celebrations, shayari, and more!

## ✨ Features

- **Fingerprint Scanner** - Dramatic tap-to-start authentication screen
- **Anger Detection Loading** - Funny rotating messages while "scanning" anger levels
- **YES/NO Apology Flow** - 10 levels of increasingly dramatic confirmation questions
- **Escaping NO Button** - The "No" button runs away from your cursor (desktop) or finger (mobile)
- **Anger Meter** - Increases with each NO attempt, changing colors from green to red
- **Advanced Protocol** - Triggered after 12 NO attempts with a special flow
- **Heartbreak Screen** - Dramatic guilt-trip if they still say no
- **Celebration Screen** - Confetti, stars, and particle effects on forgiveness
- **Shayari Cards** - 4 heartfelt poetry cards displayed after success
- **Final Record** - Official forgiveness certificate with progress bar
- **Meme Screen** - Custom meme display with fallback support
- **Memory Gallery** - Photo gallery with editable captions
- **Compliment Cards** - Random compliments shown between YES levels
- **Glassmorphism UI** - Beautiful frosted glass design with animated gradients
- **Floating Animations** - Stars, clouds, and sparkles throughout

## 🛠 Tech Stack

- **HTML5** - Semantic structure, no frameworks
- **CSS3** - Glassmorphism, animations, responsive design
- **JavaScript (Vanilla)** - State machine, DOM manipulation, no libraries

No build tools. No npm. No frameworks. Just open `index.html` and it works.

## 📁 File Structure

```
/
├── index.html          # Main HTML with all screen containers
├── style.css           # Glassmorphism styles, animations, responsive design
├── script.js           # All interaction logic, state machine, screen flows
├── README.md           # This file
└── images/
    ├── final-meme.jpg  # (or .gif) Meme shown at the end
    ├── celebration.gif # Celebration animation
    ├── memory1.jpg     # Memory gallery photo 1
    ├── memory2.jpg     # Memory gallery photo 2
    ├── memory3.jpg     # Memory gallery photo 3
    ├── memory4.jpg     # Memory gallery photo 4
    └── memory5.jpg     # Memory gallery photo 5
```

## 🚀 Deployment

### GitHub Pages

1. Go to your repository **Settings**
2. Navigate to the **Pages** section (left sidebar)
3. Under "Build and deployment", select **Deploy from a branch**
4. Select the **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://username.github.io/repo-name/`

### Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. No build command needed (leave blank)
3. Set output/publish directory to `./`
4. Click **Deploy**

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder, OR connect your repository
3. No build command needed (leave blank)
4. Set publish directory to `./`
5. Click **Deploy**

## 🖼 How to Replace Meme Image

1. Drop your image file into the `images/` folder
2. Name it `final-meme.jpg` (or `final-meme.gif` for animated)
3. Supports **JPG, PNG, GIF, WEBP** formats
4. No code changes needed - the site picks it up automatically

## 📸 How to Replace Memory Photos

1. Add your photos to the `images/` folder
2. Name them `memory1.jpg` through `memory5.jpg`
3. Supports **JPG, PNG, GIF, WEBP** formats
4. Photos will automatically appear in the memory gallery section

## ✏️ How to Change Nickname

The default nickname is **"1/5 Footiya"**. To change it:

1. Search for `1/5 Footiya` in `index.html` and `script.js`
2. Replace **ALL** occurrences with your desired nickname
3. The nickname appears in multiple places across both files - make sure to replace every one

## 🔒 Security Features

- **Content Security Policy (CSP)** meta tag restricting resource loading
- **No `eval()`** used anywhere in the codebase
- **No inline JavaScript** - all JS in external `script.js` via `addEventListener`
- **No cookies, tracking, or analytics** - zero data collection
- **No external API calls** - everything runs locally
- **`textContent` over `innerHTML`** - prevents XSS where possible

## 📄 License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
