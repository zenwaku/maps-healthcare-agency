from io import BytesIO
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFilter, ImageFont


SOURCE_DIR = Path(r"E:\Download Google Chrome")
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "assets" / "showcase" / "decks"

DECKS = {
    "Effective & Safe Fever & Pain Management in Children_ Ibuprofen Syrup & Paracetamol Infusion Solutions (1).pdf": "fever-pain-management-children.webp",
    "Update on the Management of NSAID-Induced Lower Gastrointestinal Injury.pdf": "nsaid-lower-gi-injury.webp",
    "Managing the Unmanageable_ UDCA Strategies in Fatty Liver Disease.pdf": "fatty-liver-strategies.webp",
    "Sulfasalazine for IBD in the Era of Advanced Therapy_ Old is Gold.pdf": "ibd-therapy.webp",
    "Optimizing the Use of Somatostatin_ From Acute Esophageal Variceal Hemorrhagic_Bleeding to Pancreatitis.pdf": "variceal-bleeding-pancreatitis.webp",
}

REDACTIONS = {
    "fever-pain-management-children.webp": (0.59, 0.09, 0.94, 0.18),
    "nsaid-lower-gi-injury.webp": (0.06, 0.60, 0.48, 0.72),
    "fatty-liver-strategies.webp": (0.59, 0.09, 0.94, 0.18),
    "ibd-therapy.webp": (0.05, 0.61, 0.50, 0.73),
    "variceal-bleeding-pancreatitis.webp": (0.59, 0.09, 0.94, 0.18),
}


def rebuild_ibd_cover(image: Image.Image) -> Image.Image:
    width, height = image.size
    cover = Image.new("RGB", image.size, "#fbfaf6")
    pixels = cover.load()
    for y in range(height):
        for x in range(width):
            teal = max(0.0, 1.0 - (((x - width * 0.76) ** 2 + (y - height * 0.82) ** 2) ** 0.5) / (width * 0.58))
            orange = max(0.0, 1.0 - (((x - width * 0.95) ** 2 + (y - height * 0.88) ** 2) ** 0.5) / (width * 0.42))
            base = (251, 250, 246)
            pixels[x, y] = (
                int(base[0] - teal * 18 + orange * 3),
                int(base[1] + teal * 4 - orange * 8),
                int(base[2] - teal * 21 - orange * 24),
            )

    draw = ImageDraw.Draw(cover)
    regular = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", max(24, int(height * 0.035)))
    bold = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", max(44, int(height * 0.075)))
    label_box = (int(width * 0.07), int(height * 0.09), int(width * 0.31), int(height * 0.17))
    draw.rounded_rectangle(label_box, radius=18, fill="#0f766e")
    draw.text((label_box[0] + 24, label_box[1] + 13), "SCIENTIFIC DECK", font=regular, fill="white")
    title = "IBD in the Era of\nAdvanced Therapy:\nOld is Gold"
    draw.multiline_text(
        (int(width * 0.07), int(height * 0.27)),
        title,
        font=bold,
        fill="#111827",
        spacing=int(height * 0.025),
    )
    draw.line(
        (int(width * 0.07), int(height * 0.82), int(width * 0.55), int(height * 0.82)),
        fill="#f97316",
        width=max(5, int(height * 0.009)),
    )
    return cover


def redact_company_name(image: Image.Image, output_name: str) -> None:
    normalized = REDACTIONS[output_name]
    left = int(image.width * normalized[0])
    top = int(image.height * normalized[1])
    right = int(image.width * normalized[2])
    bottom = int(image.height * normalized[3])
    sample_top = max(0, top - 22)
    sample_bottom = max(sample_top + 1, top - 4)
    clean_strip = image.crop((left, sample_top, right, sample_bottom))
    replacement = clean_strip.resize((right - left, bottom - top), Image.Resampling.BICUBIC)
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).rectangle((left, top, right, bottom), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=6))
    layer = image.copy()
    layer.paste(replacement, (left, top))
    image.paste(layer, (0, 0), mask)


def render_first_page(source: Path, destination: Path) -> None:
    with fitz.open(source) as document:
        page = document.load_page(0)
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.7, 1.7), alpha=False)
        image = Image.open(BytesIO(pixmap.tobytes("png"))).convert("RGB")
        image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
        if destination.name == "ibd-therapy.webp":
            image = rebuild_ibd_cover(image)
        else:
            redact_company_name(image, destination.name)
        image.save(destination, "WEBP", quality=84, method=6)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in DECKS.items():
        source = SOURCE_DIR / source_name
        if not source.exists():
            raise FileNotFoundError(source)
        destination = OUTPUT_DIR / output_name
        render_first_page(source, destination)
        print(destination)


if __name__ == "__main__":
    main()
