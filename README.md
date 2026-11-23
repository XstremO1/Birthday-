# OUR LITTLE FOREVER ♡ — Random Moments Edition

A **no-calendar, no-date-labels**, photo-first romantic website. It works as ordinary static files on GitHub Pages, with no React, npm, or paid hosting.

## Publish on GitHub Pages

1. Unzip this folder on your computer.
2. Open your existing GitHub repository (`our-little-forever`, or whatever you named it).
3. **Replace the old** `index.html`, `styles.css`, `app.js`, `data.js` with the same four files in this ZIP. Do not leave both old and new versions with different names.
4. Keep `favicon.svg` and `little-stars.wav` in the root (upload the copies from this ZIP if missing).
5. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**. If already configured, no change needed.
6. After the Pages deployment finishes, refresh your website with Ctrl+Shift+R.

This version is **intentionally FLAT**: HTML, CSS, JS, and audio live directly in the repository root. It fixes the earlier styling issue caused by missing `assets/` folders.

## Add your own pictures (no dates or matching required)

Photos are entirely optional; the site already displays illustrated placeholders. When you're ready:

1. Put any photos in the `photos` folder.
2. Name them `photo-01.jpg`, `photo-02.jpg`, `photo-03.jpg`, ... up to `photo-40.jpg`. **The order is random; you do not need to know when or where they were taken.**
3. For PNG, WEBP, or HEIC files: convert them into JPG with an image converter **before** naming them `.jpg` (merely changing the filename extension does NOT convert an image). Or send the originals in a ZIP and ask me to integrate them.
4. Upload the `photos` folder and its contents to GitHub. To create the folder in GitHub's web interface, open the existing `photos/README.md` file (included here), navigate to its folder, and choose **Add file → Upload files**. Photos must end up at `photos/photo-01.jpg`, etc., not in the root.
5. Reload the website after the deployment. Every available photo automatically appears. Missing photos show pretty placeholder artwork; never a broken-image icon.

**TIP:** If you upload your original photos as a ZIP in ChatGPT, I can rename, optimise and add them into the ready-to-upload folder for you—no need to rename 22+ files yourself.

## Song

`little-stars.wav` is the included *original* gentle instrumental. To use the song you danced to, send the MP3. With permission to publish it, add it as `our-song.mp3` in the repository root. The birthday audio player tries `our-song.mp3` first and falls back to `little-stars.wav` when it is absent. In the meantime, the site does **not** claim to contain Darkhaast.

## Birthday

All random click-surprises and photographs are accessible all the time. **Only** the birthday finale unlocks from **December 25, 2026 in Asia/Kolkata time**. No dates are displayed as photo captions or story labels. To privately test the finale, append `?preview=1` to the website URL; remove it when you share the link. This is a visual lock only, not a secure private storage mechanism.

## Important privacy note

Public GitHub repositories and GitHub Pages host files publicly. Please only upload photos and audio that you both are comfortable publishing. A website link is not a privacy mechanism; anyone with access could view or save the photographs.

## Files

- `index.html` — website
- `styles.css` — design and 3D-style effects
- `app.js` — cards, games, gallery, saving progress, finale
- `data.js` — undated romantic messages and card captions
- `photos/` — optional images
- `little-stars.wav` — original background audio
- `favicon.svg` — icon
- `.nojekyll` — GitHub Pages helper
