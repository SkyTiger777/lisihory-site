"""Generate the brand raster assets: apple-touch-icon and the OG card.

Run: python scripts/brand.py
Requires Pillow. Photos stay in assets/img; output goes next to them.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
CREAM = (246, 241, 229)
PINE = (22, 38, 29)
PINE_DEEP = (13, 16, 12)
SAGE = (184, 196, 174)


def font(name, size):
    return ImageFont.truetype(str(Path("C:/Windows/Fonts") / name), size)


def rounded_icon(size=180):
    scale = 4
    s = size * scale
    icon = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(icon)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * 0.22), fill=PINE)

    w = int(s * 0.052)
    pts = [
        (int(s * 0.15), int(s * 0.74)),
        (int(s * 0.40), int(s * 0.28)),
        (int(s * 0.56), int(s * 0.58)),
        (int(s * 0.64), int(s * 0.44)),
        (int(s * 0.85), int(s * 0.74)),
    ]
    d.line(pts, fill=CREAM, width=w, joint="curve")
    for p in pts:
        r = w // 2
        d.ellipse((p[0] - r, p[1] - r, p[0] + r, p[1] + r), fill=CREAM)

    cx, cy, r = int(s * 0.745), int(s * 0.235), int(s * 0.072)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=SAGE, width=max(2, w - 2))

    return icon.resize((size, size), Image.LANCZOS)


def tracked(draw, xy, text, fnt, fill, tracking=0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking


def og_card():
    src = Image.open(IMG / "hero-poster-1920.webp").convert("RGB")
    w, h = 1200, 630
    base = ImageOps_fit(src, (w, h))

    # darken, stronger on the left and bottom
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(w):
        a = int(200 * max(0.0, 1 - x / (w * 1.05)) ** 1.15)
        od.line([(x, 0), (x, h)], fill=(10, 13, 9, a))
    for y in range(h):
        a = int(120 * (y / h) ** 2)
        od.line([(0, y), (w, y)], fill=(10, 13, 9, a))
    base = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")

    d = ImageDraw.Draw(base)

    # logo mark
    mx, my, ms = 74, 66, 44
    mark = [(mx, my + ms), (mx + ms * 0.38, my + ms * 0.36), (mx + ms * 0.58, my + ms * 0.74),
            (mx + ms * 0.72, my + ms * 0.5), (mx + ms, my + ms)]
    d.line(mark, fill=CREAM, width=3, joint="curve")
    d.ellipse((mx + ms * 0.84, my - 2, mx + ms * 1.02, my + ms * 0.16), outline=SAGE, width=2)
    tracked(d, (mx + ms + 16, my + 4), "ЛІС І ГОРИ", font("segoeui.ttf", 19), CREAM, 5)
    tracked(d, (mx + ms + 16, my + 29), "ПОЛЯНИЦЯ · БУКОВЕЛЬ", font("segoeui.ttf", 11),
            (246, 241, 229, 190), 3)

    # headline
    d.text((72, 180), "ліс", font=font("segoeuil.ttf", 158), fill=CREAM)
    d.text((66, 320), "і гори", font=font("georgiai.ttf", 148), fill=CREAM)

    # rule + footer
    d.line([(76, 510), (1124, 510)], fill=(246, 241, 229, 80), width=1)
    d.text((76, 534), "Маєток у Поляниці — 5 км до Буковеля", font=font("segoeui.ttf", 24),
           fill=(246, 241, 229, 225))
    tracked(d, (76, 578), "БАСЕЙН · ЛАЗНЯ · КАМІН · ДО 42 ГОСТЕЙ", font("segoeui.ttf", 13),
            (246, 241, 229, 175), 2)
    url = "lisihory.ua"
    uw = d.textlength(url, font=font("georgiai.ttf", 26))
    d.text((1124 - uw, 570), url, font=font("georgiai.ttf", 26), fill=SAGE)

    base.save(IMG / "og-image-1200x630.webp", "WEBP", quality=88, method=6)
    print("og-image-1200x630.webp")


def ImageOps_fit(im, size):
    from PIL import ImageOps

    return ImageOps.fit(im, size, method=Image.LANCZOS, centering=(0.5, 0.55))


if __name__ == "__main__":
    icon = rounded_icon(180)
    icon.save(IMG / "apple-touch-icon.png", "PNG")
    print("apple-touch-icon.png")
    icon.resize((512, 512), Image.LANCZOS).save(IMG / "icon-512.png", "PNG")
    print("icon-512.png")
    og_card()
