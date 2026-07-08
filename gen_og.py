from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 1200
HEIGHT = 630
img = Image.new('RGB', (WIDTH, HEIGHT), '#0f172a')
draw = ImageDraw.Draw(img)

try:
    font_title = ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", 56)
    font_sub = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 26)
    font_url = ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", 20)
except:
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()
    font_url = ImageFont.load_default()

# Background box
draw.rounded_rectangle([40, 40, WIDTH-40, HEIGHT-40], radius=20, fill='#1e293b')
# Green accent bar at bottom
draw.rectangle([40, HEIGHT-140, WIDTH-40, HEIGHT-100], fill='#22c55e')

# G Logo circle
draw.rounded_rectangle([80, 80, 160, 160], radius=16, fill='#22c55e')
draw.text((120, 120), "G", fill='#000000', font=font_title, anchor='mm')

# Title text
draw.text((200, 100), "GPUBench.online", fill='#ffffff', font=font_title, anchor='mm')
draw.text((200, 160), "GPU Hashrate Database & Mining Calculator", fill='#94a3b8', font=font_sub, anchor='mm')

# Stats boxes
stats = [
    ("25+", "GPUs"),
    ("7", "Algorithms"),
    ("7", "Coins"),
    ("Real", "Hashrates"),
]
box_w = 230
box_h = 90
gap = 24
start_x = 80
y = 240
for i, (val, label) in enumerate(stats):
    x = start_x + (box_w + gap) * i
    draw.rounded_rectangle([x, y, x+box_w, y+box_h], radius=12, fill='#0f172a')
    draw.rounded_rectangle([x+2, y+2, x+box_w-2, y+box_h-2], radius=10, fill='#1e293b')
    draw.text((x+box_w//2, y+25), val, fill='#22c55e', font=font_sub, anchor='mm')
    draw.text((x+box_w//2, y+62), label, fill='#64748b', font=font_url, anchor='mm')

# Bottom tagline
draw.text((WIDTH//2, HEIGHT-70), "Real-world benchmark data  ·  Live prices  ·  Mining profitability calculator", fill='#64748b', font=font_url, anchor='mm')

out = r"E:\gpubench\public\og-image.png"
img.save(out, "PNG")
print(f"Saved: {out}, {os.path.getsize(out)} bytes")
