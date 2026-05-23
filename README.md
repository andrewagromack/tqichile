# TQI Chile — Sitio estático

Sitio estático listo para desplegar en GitHub Pages, Netlify, Cloudflare Pages o cualquier hosting que sirva archivos.

## Estructura

```
.
├── index.html          # Inicio
├── productos.html      # Catálogo de productos
├── resultados.html     # Pruebas piloto y evidencia
├── phageguard.html     # PhageGuard
├── asesoria.html       # Asesoría técnica
├── empresa.html        # Empresa
├── contacto.html       # Contacto
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/
        ├── favicon.svg
        ├── favicon-32.png
        ├── favicon-64.png
        ├── apple-touch-icon.png
        ├── icon-512.png
        └── og-tqi-chile.png   # Imagen Open Graph (redes sociales)
```

## Despliegue en GitHub Pages

1. Crea un repositorio (por ejemplo `tqichile`).
2. Sube todo el contenido de este ZIP a la rama `main` en la raíz.
3. En **Settings → Pages**, selecciona la rama `main` y carpeta `/ (root)`.
4. Espera 1–2 minutos: tu sitio estará en `https://<usuario>.github.io/<repo>/`.

Para usar el dominio `tqichile.cl`:
- Crea un archivo `CNAME` en la raíz con el contenido `tqichile.cl`.
- En tu DNS, apunta `tqichile.cl` (A) a las IPs de GitHub Pages y `www` (CNAME) a `<usuario>.github.io`.

## Edición

Los HTML son archivos planos — abre cualquiera con tu editor (VS Code, etc.) y edita directamente. Cambios en `assets/css/styles.css` se reflejan en todas las páginas.

## Favicon e imagen social

- Favicon: `assets/img/favicon.svg` (+ PNGs de respaldo) — TQI. blanco sobre fondo morado con punto naranjo.
- Open Graph: `assets/img/og-tqi-chile.png` (1200×630) — se previsualiza al compartir cualquier página en WhatsApp, LinkedIn, X o Facebook.

Para reemplazar la imagen Open Graph por una fotografía real, simplemente sobrescribe `assets/img/og-tqi-chile.png` manteniendo el nombre.
