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
- **PDF documents shown as images** (first page rendered to PNG), with download/right‑click disabled.
- **Fully responsive** and keyboard/aria friendly.
- **Zero dependencies to install** — only a CDN copy of Three.js is loaded at runtime.

## 🧱 Tech stack

- HTML5 / CSS3 (custom properties, no framework)
- Vanilla JavaScript (ES6, no bundler)
- [Three.js](https://threejs.org/) via CDN (animated hero background)
- [PyMuPDF](https://pymupdf.readthedocs.io/) — offline script to pre‑render portfolio PDFs to PNG

## 📁 Project structure

```
.
├── index.html            # Page markup
├── styles.css            # All styles + theme variables
├── i18n.js               # Translations (DE/EN/UK/ES) + language switcher
├── portfolio.js          # Portfolio carousel + lightbox
├── portfolio-data.js     # Generated portfolio manifest
├── hero3d.js             # Three.js hero scene
├── contours.js           # Topographic contour background
├── script.js             # Nav, scroll effects, contact form
├── render-portfolio.py   # (optional) regenerate portfolio-data.js + PDF thumbnails
├── Portfolio/            # Source images / PDFs
├── PortfolioRender/      # PNGs rendered from PDFs
├── Foto.png              # Portrait
└── topo-bg.png           # Background texture
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

If you add or replace files in `Portfolio/`, rebuild `portfolio-data.js` and the PDF thumbnails:

```bash
pip install pymupdf
python render-portfolio.py
```

## 🎨 Customization

- **Colors / theme:** edit the CSS variables in the `:root` block of `styles.css`
  (e.g. `--accent` to change the orange accent).
- **Text / translations:** edit the dictionary in `i18n.js`. German is the source text
  in `index.html`; EN/UK/ES live in `i18n.js` keyed by `data-i18n` attributes.

## 📄 License

Source code may be reused freely. Personal content — the name, photo, résumé text and
certificate documents — belongs to the site owner and must not be reused without permission.
