"""
Erzeugt aus den Originaldateien im Ordner Portfolio/ web-optimierte Bilder und
schreibt daraus portfolio-data.js.

- Fotos/Scans  -> Vorschaubild (thumb.webp) + Vollbild (1.webp)
- PDF-Dokumente -> jede Seite als WebP (1.webp, 2.webp, ...) + Vorschaubild

Die Originale (insbesondere die PDFs) werden NICHT veroeffentlicht: Portfolio/
steht in .gitignore, ins Repository kommt nur PortfolioRender/.

Erneut ausfuehren, wenn sich Dateien im Portfolio-Ordner aendern:
    pip install pymupdf pillow
    python render-portfolio.py
"""
import io
import json
import re
import shutil
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageOps

# Die Quellbilder sind eigene, vertrauenswuerdige Dateien (teils > 90 MP).
Image.MAX_IMAGE_PIXELS = None

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE = Path(__file__).parent
PORTFOLIO = BASE / "Portfolio"
RENDER_DIR = BASE / "PortfolioRender"
PDF_DPI = 150        # Render-Aufloesung fuer PDF-Seiten
FULL_PX = 2000       # Maximale Kantenlaenge Vollbild / PDF-Seite
THUMB_PX = 520       # Maximale Kantenlaenge Vorschaubild
FULL_QUALITY = 80    # WebP-Qualitaet Vollbild
THUMB_QUALITY = 72   # WebP-Qualitaet Vorschau

CATEGORIES = [
    {
        "id": "topo",
        "folder": "Topographie und Kartographie",
        "title": "Topographie und Kartographie",
        "desc": "Erstellung, Gestaltung und Bearbeitung digitaler Karten sowie topografische und geodätische Vermessungen.",
    },
    {
        "id": "kataster",
        "folder": "Landvermessung und Kataster",
        "title": "Landvermessung und Kataster",
        "desc": "Katastervermessung, Landmanagement, Grenzfestlegung und technische Dokumentation für Grundstücke.",
    },
    {
        "id": "certs",
        "folder": "Bestätigung der Qualifikation",
        "title": "Bestätigung der Qualifikation",
        "desc": "Zertifizierte Vermessungskompetenz mit anerkannten Befähigungsnachweisen, Zeugnissen und Ingenieurzulassung.",
    },
]

# Deutsche Bezeichnungen fuer Dateien, deren Name keinen sauberen Titel ergibt
# (Schluessel: Dateiname ohne Endung). Uebersetzungen stehen in i18n.js (pitem.*).
LABELS = {
    "Картограма_ухилів (2)": "Kartogramm der Hangneigungen",
    "Картограмма_грунтів (2)": "Kartogramm der Bodenarten",
    "План_існуючого (2)": "Bestandsplan",
    "1.Anerkennung des ": "Genehmigung zum Führen der Berufsbezeichnung „Ingenieur“ (Ingenieurkammer Hessen)",
    "6.Verbesserung der Qualifikation eines geodätischen Ingenieurs_(Ukraine)": "Weiterbildungsnachweis eines Vermessungsingenieurs (Ukraine, 2021)",
    "7.Verbesserung der Qualifikation eines geodätischen Ingenieurs_(Ukraine)": "Weiterbildungsnachweis eines Vermessungsingenieurs (Ukraine, 2017)",
    "4.Arbeitsbuch von Ukraine": "Arbeitsbuch (Ukraine)",
    "9.Charakteristisch": "Referenzschreiben (AWTOMAHISTRAL)",
    "10.RECOMMENDATION (PCCE LTD)_2025": "Empfehlungsschreiben (PCCE LTD, 2025)",
    "15.Coursera 89ZHLQRCZJF5": "Coursera-Zertifikat",
}

IMAGE_EXT = re.compile(r"\.(jpe?g|png|webp)$", re.I)
PDF_EXT = re.compile(r"\.pdf$", re.I)


def natural_key(name: str):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", name)]


def pretty_name(file: str) -> str:
    stem = re.sub(r"\.[^.]+$", "", file)
    if stem in LABELS:
        return LABELS[stem]
    n = re.sub(r"^\s*\d+\s*\.\s*", "", stem)    # fuehrendes "12." entfernen
    n = re.sub(r"[_\s]+", " ", n).strip()
    return n or file


def save_webp(img: Image.Image, path: Path, max_px: int, quality: int) -> list:
    img = img.copy()
    img.thumbnail((max_px, max_px), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)
    return list(img.size)


def load_image(path: Path) -> Image.Image:
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)  # Ausrichtung aus EXIF uebernehmen
    return img.convert("RGB")


def web_path(*parts: str) -> str:
    return "/".join(parts)


def main():
    if not PORTFOLIO.is_dir():
        sys.exit(f"Ordner fehlt: {PORTFOLIO}")
    if RENDER_DIR.exists():
        shutil.rmtree(RENDER_DIR)

    data = []
    for cat in CATEGORIES:
        folder = PORTFOLIO / cat["folder"]
        if not folder.is_dir():
            print(f"! Ordner fehlt: {folder}")
            continue

        files = sorted(
            [f.name for f in folder.iterdir()
             if f.is_file() and (IMAGE_EXT.search(f.name) or PDF_EXT.search(f.name))],
            key=natural_key,
        )

        items = []
        for idx, file in enumerate(files):
            label = pretty_name(file)
            out_dir = RENDER_DIR / cat["id"] / str(idx)
            out_dir.mkdir(parents=True, exist_ok=True)
            rel = lambda name: web_path("PortfolioRender", cat["id"], str(idx), name)

            if PDF_EXT.search(file):
                pages = []
                first = None
                with pymupdf.open(folder / file) as doc:
                    for pno, page in enumerate(doc):
                        pix = page.get_pixmap(dpi=PDF_DPI)
                        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
                        name = f"{pno + 1}.webp"
                        save_webp(img, out_dir / name, FULL_PX, FULL_QUALITY)
                        pages.append(rel(name))
                        first = first or img
                tsize = save_webp(first, out_dir / "thumb.webp", THUMB_PX, THUMB_QUALITY)
                items.append({"type": "pdf", "label": label, "thumb": rel("thumb.webp"),
                              "size": tsize, "pages": pages})
                print(f"  {cat['id']}/{idx}: PDF '{file}' -> {len(pages)} Seite(n)")
            else:
                img = load_image(folder / file)
                save_webp(img, out_dir / "1.webp", FULL_PX, FULL_QUALITY)
                tsize = save_webp(img, out_dir / "thumb.webp", THUMB_PX, THUMB_QUALITY)
                items.append({"type": "image", "label": label, "thumb": rel("thumb.webp"),
                              "size": tsize, "src": rel("1.webp")})
                print(f"  {cat['id']}/{idx}: Bild '{file}'")

        data.append({
            "id": cat["id"],
            "title": cat["title"],
            "desc": cat["desc"],
            "items": items,
        })

    out = "window.PORTFOLIO_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
    (BASE / "portfolio-data.js").write_text(out, encoding="utf-8")
    print("portfolio-data.js aktualisiert.")


if __name__ == "__main__":
    main()
