import zipfile
import os
from PIL import Image

# Nombre de tu imagen original
input_image_path = 'imagen.jpg' 

img = Image.open(input_image_path).convert('RGBA')

# Todos los tamaños estándar solicitados
all_sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'favicon-48x48.png': (48, 48),
    'apple-touch-icon.png': (180, 180),
    'android-icon-36x36.png': (36, 36),
    'android-icon-48x48.png': (48, 48),
    'android-icon-72x72.png': (72, 72),
    'android-icon-96x96.png': (96, 96),
    'android-icon-144x144.png': (144, 144),
    'android-icon-192x192.png': (192, 192),
    'ms-icon-70x70.png': (70, 70),
    'ms-icon-150x150.png': (150, 150),
    'ms-icon-310x310.png': (310, 310)
}

file_list = []
for name, size in all_sizes.items():
    resized = img.resize(size, Image.Resampling.LANCZOS)
    resized.save(name, format='PNG')
    file_list.append(name)

# Favicon.ico multi-resolución
ico_sizes = [(16, 16), (32, 32), (48, 48)]
img.save('favicon.ico', format='ICO', sizes=ico_sizes)
file_list.append('favicon.ico')

# browserconfig.xml
with open('browserconfig.xml', 'w', encoding='utf-8') as f:
    f.write('<?xml version="1.0" encoding="utf-8"?>\n<browserconfig><msapplication><tile><square70x70logo src="/ms-icon-70x70.png"/><square150x150logo src="/ms-icon-150x150.png"/><square310x310logo src="/ms-icon-310x310.png"/><TileColor>#ffffff</TileColor></tile></msapplication></browserconfig>')
file_list.append('browserconfig.xml')

# manifest.json
with open('manifest.json', 'w', encoding='utf-8') as f:
    f.write('{\n "name": "App",\n "icons": [\n  {"src": "\\/android-icon-36x36.png", "sizes": "36x36", "type": "image\\/png", "density": "0.75"},\n  {"src": "\\/android-icon-48x48.png", "sizes": "48x48", "type": "image\\/png", "density": "1.0"},\n  {"src": "\\/android-icon-72x72.png", "sizes": "72x72", "type": "image\\/png", "density": "1.5"},\n  {"src": "\\/android-icon-96x96.png", "sizes": "96x96", "type": "image\\/png", "density": "2.0"},\n  {"src": "\\/android-icon-144x144.png", "sizes": "144x144", "type": "image\\/png", "density": "3.0"},\n  {"src": "\\/android-icon-192x192.png", "sizes": "192x192", "type": "image\\/png", "density": "4.0"}\n ]\n}')
file_list.append('manifest.json')

# Empaquetar todo en el ZIP
with zipfile.ZipFile('complete_favicons_package.zip', 'w') as zipf:
    for file in file_list:
        zipf.write(file)

print("¡Listo! Archivo 'complete_favicons_package.zip' generado con éxito en esta carpeta.")