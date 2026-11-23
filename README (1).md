# ♡ Our Little Forever

A complete, beautifully animated, **31-day romantic birthday website**. One interactive surprise opens each day from **25 November through 25 December 2026**, in **India Standard Time (IST)**. It's designed first for mobile and runs on GitHub Pages with **zero installs, zero subscriptions, and no build step**.

## 🪄 What's included

- Cinematic midnight-blue / lavender / champagne visual theme, 2D design with 3D-style depth and floating cards.
- A 31-door advent calendar with date-based unlocks, memory games and personalised mini-stories.
- 31 playable activities: collectible hunts, light-up puzzles, matching pairs, a typed secret phrase, a slider game, a recipe game, stars, petals, a little dance rhythm game, etc.
- A **Memory Museum** with three selectable chapters, featuring your real events (translated into English).
- A glowing constellation that grows with each completed activity.
- An emotional, interactive **25 December birthday finale**, including candle-blowing, a personal message, animated celebration, and original instrumental music.
- Optional soft synth music. Music starts only when the visitor turns it on.
- Local progress saving (each device and browser saves its own achievements).
- Fully responsive website with keyboard-friendly controls, reduced-motion support, no analytics, no third-party scripts, and no external font dependencies.

### Important story detail

The **16 December mangalsutra moment** is represented as a *birthday gift and private, symbolic “unofficial wedding” memory shared during a five-minute meet on an empty street*. **It is not described as an actual wedding.** You can edit the precise wording in `assets/data.js`.

## 🚀 Publish to GitHub Pages (no coding required)

1. Extract `our-little-forever.zip`.
2. On GitHub, create a new repository named, for example, `our-little-forever`.
3. Upload the **contents of this folder** to the repository root. `index.html` must be in the repo root, not inside an extra nested folder.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages → Build and deployment**.
6. Under **Source**, choose **Deploy from a branch**. Select `main` and `/(root)`; press **Save**.
7. Your website's address will be `https://YOUR-USERNAME.github.io/our-little-forever/` (assuming the repository name above).
8. Open it on your own phone to check the layout and daily gifts.

**You do not need React, Node, npm, a database, or any API key.** This folder is ready for static GitHub Pages hosting.

## 👀 Test all 31 gifts before November 25

To preview locally without changing the real unlock dates:

1. On a computer with Python, open a terminal inside the folder.
2. Run `python -m http.server 8000` (or `python3 -m http.server 8000`).
3. Open `http://localhost:8000/?preview=1`.
4. All 31 surprise doors will open **only for local testing**. The preview shortcut does not work on the GitHub Pages domain.
5. Open `http://localhost:8000/` to see the exact date-locked live experience.

You can also double-click `index.html` for a quick look. Use the local server for reliable testing.

## 🖼 Add your own photos (optional)

The website works and looks beautiful **without photos**. It uses its own illustrated memory cards and beautiful fallbacks. If you want your real photographs in the gallery, place them in `photos/` and name them:

- `chips-date.jpg`
- `first-best-photo.jpg`
- `family-photo.jpg`
- `trio-cafe.jpg`
- `birthday-memory.jpg`

You can use a JPG or rename the file reference in `assets/data.js` if your image is PNG or WEBP. Do not put private photographs in a public repository unless you are both comfortable with them being publicly accessible.

## ✍️ Personalise the writing

Open `assets/data.js` in GitHub's editor or a simple text editor. Modify:

- `greeting`, `openingLine`, and `letter` for your opening note and longer letter.
- `days` for the 31 daily memories, messages, activities and collectible star names.
- `chapters` for the Memory Museum timeline.

All the relationship writing already included is in English. No dates or names were fabricated. Chapter labels are intentionally undated by year because you did not specify which calendar year each relationship memory originally occurred in.

## 🎼 Music

- The top-right `♫` button plays a **gentle original, browser-generated tune**. No external audio is loaded.
- `audio/little-stars.wav` is an **original short instrumental** that plays on the birthday finale; no copyrighted song is bundled.
- The text references your special dance to **Darkhaast**. If you have a properly licensed personal copy and want to use it on your site, you can replace `audio/little-stars.wav` and edit its file path in `assets/app.js`. Don't publish unlicensed commercial music to a public repository.

## 🔐 Privacy and unlock limitations

**Read before sharing:** A public GitHub Pages site is **not private or password-protected**, even if you hide links. GitHub's free static hosting does not provide secure server-side logins or true access-controlled daily unlocks. Gift locks here use the browser date in **Asia/Kolkata** and keep the intended everyday experience, but someone who inspects or downloads the public files could read future messages ahead of time.

If you want to keep truly private pictures, intimate notes, or surprise endings confidential until their release dates, use a hosting service with a backend and authenticated access instead. Only upload content that you are comfortable being public.

Progress is saved in the visitor's browser's `localStorage`. Clearing site data, using incognito/private mode, or opening the site on another device will not preserve their collected stars. No tracking or personal information is transmitted by this website.

## 📁 Project contents

```text
our-little-forever/
├── index.html               The website
├── .nojekyll                GitHub Pages compatibility
├── assets/
│   ├── app.js              All interactions and games
│   ├── data.js             Your full story + 31 surprises
│   ├── styles.css          Responsive theme and animations
│   └── favicon.svg         Website icon
├── photos/
│   └── README.md           Photo filename instructions
├── audio/
│   └── little-stars.wav    Original instrumental
└── README.md               This guide
```

**Made with love, for one very special birthday.** ♡
