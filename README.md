# Oleksii Yermakov — Surveying Engineer · CV / Portfolio

A fast, static, multilingual personal CV & portfolio landing page for a surveying
engineer (Vermessungsingenieur / інженер-геодезист). Built with plain HTML, CSS and
JavaScript — no build step required. Ready to host on **GitHub Pages**.

> **Languages:** German (default) · English · Ukrainian · Spanish
> **Theme:** "hi‑tech" dark navy + orange survey accent, animated 3D geodetic hero.

---

## ✨ Features

- **Multilingual UI** (DE / EN / UK / ES) with a language switcher; choice is stored in `localStorage`.
- **Animated 3D hero** — wireframe terrain, coordinate grid, survey instruments and satellites (Three.js).
- **Portfolio carousel** grouped by field, with a lightbox.
- **Web‑optimized portfolio** — every scan/PDF page is converted to WebP (≈ 500 px preview + ≤ 2000 px full view);
  the original PDFs and full‑size scans are **not published**.
- **Fully responsive** and keyboard/aria friendly.
- **No third‑party requests** — fonts and Three.js are self‑hosted (privacy‑friendly, no Google Fonts / CDN).
- **Performance‑aware** — the 3D hero pauses when off‑screen or in a background tab and renders a still frame for
  `prefers-reduced-motion`.

## 🧱 Tech stack

- HTML5 / CSS3 (custom properties, no framework)
- Vanilla JavaScript (ES6, no bundler)
- [Three.js](https://threejs.org/) r160, self‑hosted ES module in `vendor/` (animated hero background)
- Inter, Rajdhani, Share Tech Mono via [Fontsource](https://fontsource.org/), self‑hosted in `fonts/` (SIL OFL)
- [PyMuPDF](https://pymupdf.readthedocs.io/) + [Pillow](https://python-pillow.org/) — offline script that builds the
  optimized portfolio images

## 📁 Project structure

```
.
├── index.html            # Page markup
├── styles.css            # All styles + theme variables
├── i18n.js               # Translations (DE/EN/UK/ES) + language switcher
├── portfolio.js          # Portfolio carousel + lightbox
├── portfolio-data.js     # Generated portfolio manifest
├── hero3d.js             # Three.js hero scene (ES module)
├── contours.js           # Topographic contour background
├── script.js             # Nav, scroll effects, contact form
├── render-portfolio.py   # Builds PortfolioRender/ + portfolio-data.js from Portfolio/
├── Portfolio/            # Original scans / PDFs — local only, git‑ignored
├── PortfolioRender/      # Published WebP previews and full views
├── fonts/                # Self‑hosted web fonts + fonts.css
├── vendor/               # Self‑hosted Three.js
├── QR/                   # QR codes linking to the CV PDF
├── Foto.webp / Foto.jpg  # Portrait (page / social preview)
└── topo-bg.webp          # Background texture
```

## 🚀 Run locally

Because the page loads local assets, open it through a small web server (not `file://`):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repository and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CV / portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. In the repository: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
5. After a minute the site is live at `https://<your-username>.github.io/<your-repo>/`.

The included `.nojekyll` file makes GitHub serve all files as‑is.

> Tip: for a clean address like `https://<your-username>.github.io/` name the repo
> `<your-username>.github.io`.

## 🔁 Regenerating the portfolio (optional)

Put the original files into `Portfolio/<category folder>/` (this folder is git‑ignored, so originals never get
published), then rebuild `PortfolioRender/` and `portfolio-data.js`:

```bash
pip install pymupdf pillow
python render-portfolio.py
```

Commit only `PortfolioRender/` and `portfolio-data.js`. Nicer German titles for files with unclear names go into
the `LABELS` dictionary in `render-portfolio.py`; translations live in `i18n.js` under `pitem.<category>.<index>`.

> Older commits still contain the original files. To remove them from the repository history as well, rewrite
> the history (e.g. with `git filter-repo --path Portfolio --invert-paths`) and force‑push.

## 🎨 Customization

- **Colors / theme:** edit the CSS variables in the `:root` block of `styles.css`
  (e.g. `--accent` to change the orange accent).
- **Site URL:** `og:url`, `og:image` and `canonical` in `index.html` use `https://olyermakov.github.io/yermakov-cv/`;
  update them if the site moves to another address.
- **Text / translations:** edit the dictionary in `i18n.js`. German is the source text
  in `index.html`; EN/UK/ES live in `i18n.js` keyed by `data-i18n` attributes.

## 📄 License

Source code may be reused freely. Personal content — the name, photo, résumé text and
certificate documents — belongs to the site owner and must not be reused without permission.
