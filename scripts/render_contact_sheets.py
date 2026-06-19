from pathlib import Path

from PIL import Image


SOURCE = Path(r"C:\Users\march\AppData\Local\Temp\maps-brief-render")
pages = [Image.open(SOURCE / f"page-{index}.png").convert("RGB") for index in range(1, 17)]
width = max(image.width for image in pages)
height = max(image.height for image in pages)

for group in range(4):
    canvas = Image.new("RGB", (width * 2, height * 2), (220, 224, 230))
    for index, image in enumerate(pages[group * 4 : group * 4 + 4]):
        canvas.paste(image, ((index % 2) * width, (index // 2) * height))
    canvas.save(SOURCE / f"contact-{group + 1}.png")
