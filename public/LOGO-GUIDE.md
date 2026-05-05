# Portfolio Logo & Favicon — Generated

## 🎨 Color Palette Used
```
Tiger Flame    #f46036  (primary accent)
Dusty Denim    #5b85aa  (secondary)
Twilight Indigo #414770 (tertiary)
Dark Amethyst  #372248  (deep purple)
Midnight Violet #171123 (background)
```

## 📁 Generated Files

### Favicons (browser tabs)
```
favicon.ico              ← Multi-size ICO (16/32/48) — legacy browsers
favicon-16x16.svg        ← Ultra-minimal for 16px
favicon-32x32.svg        ← Default favicon
favicon-32x32.png        ← PNG fallback
favicon-48x48.svg        ← High-DPI fallback
```

### Logos (site header / about page)
```
portfolio-logo-v1.svg    ← Code brackets <L> — recommended
portfolio-logo-v2.svg    ← Geometric LP monogram
portfolio-logo-v3.svg    ← Neural node / AI network
portfolio-logo-v4.svg    ← Infinity loop
logo-180x180.png         ← Medium size for footer
logo-512x512.png         ← Large size for Open Graph
```

### Apple / PWA
```
apple-touch-icon.svg     ← iOS home screen icon (180×180)
site-manifest.json       ← Web App Manifest
```

### Preview
```
portfolio-logo-preview.html  ← Visual preview of all variants
Open in browser to see all options
```

## 🚀 Quick Setup

### HTML <head>
```html
<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon-32x32.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="alternate icon" href="/favicon.ico">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/apple-touch-icon.svg">

<!-- Web App Manifest -->
<link rel="manifest" href="/site-manifest.json">
<meta name="theme-color" content="#f46036">
```

### Next.js / React (app/layout.tsx)
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon-32x32.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site-manifest.json" />
        <meta name="theme-color" content="#f46036" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### CSS Text Logo (alternative to image)
```css
.logo-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: -1px;
  background: linear-gradient(90deg, #f46036, #5b85aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Firefox */
  background-clip: text;
  color: transparent;
}

.logo-text small {
  font-size: 0.6em;
  color: #414770;
  -webkit-text-fill-color: #414770;
}
```
```html
<div class="logo-text">LP<small>.dev</small></div>
```

## 🎯 Recommended Choice

**For your portfolio (React/Next.js frontend specialist):**

1. **Favicon**: `favicons-32x32.svg` (vector, crisp at any DPI)
2. **Main Logo**: `portfolio-logo-v1.svg` (code brackets + L → Leonid Petrov)
3. **Text alternative**: CSS gradient "LP" (fast, accessible, no HTTP request)
4. **Open Graph image**: `logo-512x512.png` (for social sharing)

**Why Variant 1?**
- Brackets `< >` directly reference frontend/code
- Clean, geometric, works on dark background
- Orange accent matches your theme color
- Recognizable at 16×16 favicon scale

## 📐 Export to Other Formats

### SVG → PNG (batch)
```bash
# Using rsvg-convert (already used)
for size in 72 96 144 192 256; do
  rsvg-convert -w $size -h $size portfolio-logo-v1.svg -o logo-${size}x${size}.png
done

# Using ImageMagick
convert portfolio-logo-v1.svg -resize 180x180 logo-180x180.png
```

### SVG → ICO (alternative)
```bash
# Using icoutils (Linux/macOS)
icotool -c -o favicon.ico favicon-16x16.png favicon-32x32.png favicon-48x48.png
# Or use online converter: https://convertico.com/
```

## 🛠️ Customization

### Change accent color
Edit the `fill` or `stroke` attributes in SVG files:
- Primary accent: `#f46036` (tiger flame)
- Secondary: `#5b85aa` (dusty denim)
- Background: `#171123` (midnight violet)

### Animate (optional CSS)
```css
.logo:hover path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s linear forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

### Dark/Light mode toggle
```css
:root {
  --logo-primary: #f46036;
  --logo-secondary: #5b85aa;
}

@media (prefers-color-scheme: light) {
  :root {
    --logo-bg: #ffffff;
  }
}
```

## ✅ Checklist Before Deploy

- [ ] Copy all `*.svg` and `*.png` files to `public/` folder of your Next.js app
- [ ] Add `<link>` tags to `app/layout.tsx` or `pages/_document.tsx`
- [ ] Verify favicon loads: open site → check tab icon
- [ ] Test Apple touch icon: open on iOS Safari → "Add to Home Screen"
- [ ] Validate manifest: https://web.dev/manifest/
- [ ] Check Open Graph: share link on Twitter/Discord → preview shows logo
- [ ] Ensure high-DPI displays: favicon looks sharp on Retina

## 📂 File Structure (suggested)
```
public/
├── favicon.ico
├── favicon-16x16.svg
├── favicon-32x32.svg
├── favicon-48x48.svg
├── apple-touch-icon.svg
├── logo-180x180.png
├── logo-512x512.png
├── site-manifest.json
└── images/
    ├── logo-v1.svg
    ├── logo-v2.svg
    └── logo-v3.svg
```

---

**All files generated with your color palette:** #f46036, #5b85aa, #414770, #372248, #171123

Preview: open `/Users/leonidpetrov/portfolio-logo-preview.html` in browser.
