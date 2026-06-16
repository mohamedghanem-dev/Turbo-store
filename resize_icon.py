import sys
import os
from PIL import Image

os.makedirs('assets', exist_ok=True)

# Use the icon.png in the repo root (uploaded by the user)
if os.path.exists('icon.png'):
    img = Image.open('icon.png').convert('RGBA')
    if img.size != (1024, 1024):
        img = img.resize((1024, 1024), Image.LANCZOS)
    img.save('assets/icon.png', 'PNG')
    print('Icon prepared at assets/icon.png, size:', img.size)
else:
    print('ERROR: icon.png not found in repo root!')
    sys.exit(1)
