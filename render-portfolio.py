"""
Rendert die PDF-Dokumente des Portfolios in PNG-Bilder (Seite fuer Seite) und
erzeugt daraus portfolio-data.js.

Vorteile:
- Funktioniert auch beim Oeffnen ueber file:// (kein PDF.js/Fetch noetig).
- Die Original-PDFs werden im Frontend nicht referenziert -> kein direkter Download.

Erneut ausfuehren, wenn sich Dateien im Portfolio-Ordner aendern:
    py render-portfolio.py
"""
import json
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import quote

import fitz  # PyMuPDF

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE = Path(__file__).parent
PORTFOLIO = BASE / "Portfolio"
RENDER_DIR = BASE / "PortfolioRender"
ZOOM = 1.5          # Basis-Zoom (~108 dpi)
MAX_PAGE_PX = 1400  # Maximale Kantenlaenge fuer Web-Anzeige
JPEG_QUALITY = 85   # Qualitaet fuer gerenderte PDF-Seiten

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

IMAGE_EXT = re.compile(r"\.(jpe?g|png|webp)$", re.I)
PDF_EXT = re.compile(r"\.pdf$", re.I)


def natural_key(name: str):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", name)]


def pretty_name(file: str) -> str:
    n = re.sub(r"\.[^.]+$", "", file)          # Endung entfernen
    n = re.sub(r"^\s*\d+\s*\.\s*", "", n)       # fuehrendes "12." entfernen
    n = re.sub(r"[_\s]+", " ", n).strip()
    return n or file


def web_path(*parts: str) -> str:
    return "/".join(quote(p) for p in parts)


def main():
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
            if PDF_EXT.search(file):
                out_dir = RENDER_DIR / cat["id"] / str(idx)
                out_dir.mkdir(parents=True, exist_ok=True)
                pages = []
                doc = fitz.open(folder / file)
                for pno in range(doc.page_count):
                    page = doc.load_page(pno)
                    rect = page.rect
                    zoom = min(ZOOM, MAX_PAGE_PX / max(rect.width, rect.height))
                    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
                    img_name = f"{pno + 1}.jpg"
                    pix.save(str(out_dir / img_name), jpg_quality=JPEG_QUALITY)
                    pages.append(web_path("PortfolioRender", cat["id"], str(idx), img_name))
                doc.close()
                items.append({"type": "pdf", "label": label, "pages": pages})
                print(f"  {cat['id']}: PDF '{file}' -> {len(pages)} Seiten")
            else:
                items.append({
                    "type": "image",
                    "label": label,
                    "src": web_path("Portfolio", cat["folder"], file),
                })

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
