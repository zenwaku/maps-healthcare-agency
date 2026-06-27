from pathlib import Path

from PIL import Image


SOURCE = Path("public/assets/generated/maps-strategy-icon-sheet.png")
OUTPUT = Path("public/assets/generated/icons")
NAMES = [
    "clinical-compass",
    "ai-spark",
    "insight-radar",
    "evidence-journal",
    "patient-search",
    "safe-claim",
    "webinar-stage",
    "conversion-path",
]


def remove_chroma_key(image):
    pixels = image.load()
    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, alpha = pixels[x, y]
            if red > 205 and blue > 190 and green < 105:
                pixels[x, y] = (red, green, blue, 0)
    return image


def main():
    source = Image.open(SOURCE).convert("RGBA")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    cell_width, cell_height = source.width // 4, source.height // 2

    for index, name in enumerate(NAMES):
        column, row = index % 4, index // 4
        icon = source.crop(
            (
                column * cell_width,
                row * cell_height,
                (column + 1) * cell_width,
                (row + 1) * cell_height,
            )
        )
        icon = remove_chroma_key(icon)
        bounds = icon.getbbox()
        if bounds:
            icon = icon.crop(bounds)
        icon.thumbnail((400, 400), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (420, 420), (0, 0, 0, 0))
        canvas.alpha_composite(icon, ((420 - icon.width) // 2, (420 - icon.height) // 2))
        canvas.save(OUTPUT / f"{name}.png")


if __name__ == "__main__":
    main()
