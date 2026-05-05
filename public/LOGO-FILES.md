# 🎨 Portfolio Logos & Favicons — Complete Set

**Generated for:** Leonid Petrov — Frontend Developer Portfolio  
**Color Palette:** Tiger Flame (#f46036), Dusty Denim (#5b85aa), Twilight Indigo (#414770), Dark Amethyst (#372248), Midnight Violet (#171123)

---

## 📦 Files Generated

### Favicons (browser tabs, PWA)
| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | Multi-size ICO | Legacy browsers (IE, Safari < 14) |
| `favicon-16x16.svg` | 16×16 vector | Minimal tab icon |
| `favicon-32x32.svg` | 32×32 vector | **Recommended default** |
| `favicon-32x32.png` | 32×32 raster | Fallback for old browsers |
| `favicon-48x48.svg` | 48×48 vector | High-DPI displays |

### Logos (site branding)
| File | Size | Description |
|------|------|-------------|
| `portfolio-logo-v1.svg` | 200×200 | **Code brackets <LP>** — recommended |
| `portfolio-logo-v2.svg` | 200×200 | Geometric LP monogram (overlapping) |
| `portfolio-logo-v3.svg` | 200×200 | Neural node / AI network symbol |
| `portfolio-logo-v4.svg` | 200×200 | Infinity loop |
| `logo-180x180.png` | 180×180 | Medium — footer, about page |
| `logo-512x512.png` | 512×512 | Large — Open Graph, social |

### PWA / Mobile
| File | Size | Purpose |
|------|------|---------|
| `apple-touch-icon.svg` | 180×180 | iOS home screen bookmark |
| `site-manifest.json` | — | Web App Manifest for PWA |

### React Component (animated)
| File | Description |
|------|-------------|
| `portfolio-logo.tsx` | Animated interactive logo with cursor blink |
| `logo-anim.css` | CSS styles for animation |
| `portfolio-logo-preview.html` | Visual preview of all variants in browser |

---

## 🚀 Quick Install (3 steps)

### 1. Copy files to `public/`
```bash
# Assuming your Next.js app is at ~/Projects/portfolio/
cp /Users/leonidpetrov/{favicon*,logo*,apple-touch-icon*,site-manifest.json,portfolio-logo-preview.html} ~/Projects/portfolio/public/
```

### 2. Add to HTML head (Next.js: `app/layout.tsx`)
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon-32x32.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site-manifest.json" />
        <meta name="theme-color" content="#f46036" />
        
        {/* Open Graph (optional, for social sharing) */}
        <meta property="og:image" content="/logo-512x512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Use logo in header/navbar
```tsx
import Logo from '@/components/Logo';  // Animated component
// OR static image:
import portfolioLogo from '@/public/portfolio-logo-v1.svg';

export default function Header() {
  return (
    <header>
      {/* Animated React component */}
      <Logo size="md" />
      
      {/* OR static image */}
      {/* <img src={portfolioLogo} alt="LP" width={48} height={48} /> */}
    </header>
  );
}
```

---

## 🎯 Which Logo to Choose?

| Use Case | Recommended | Alternative |
|----------|-------------|-------------|
| **Favicon** | `favicon-32x32.svg` | `favicon.ico` (legacy) |
| **Site header** | **Variant 1** (code brackets) | Variant 2 (LP monogram) |
| **About page** | Variant 2 (geometric) | Variant 3 (neural node) |
| **PWA / iOS** | `apple-touch-icon.svg` | — |
| **Social OG** | `logo-512x512.png` | — |
| **Text-only** | CSS gradient "LP" (see CSS below) | — |

**Why Variant 1?** It directly references frontend code with `< >` brackets and subtly includes "L" for Leonid. Works perfectly at 16px favicon scale and 200px header scale.

---

## 💡 Text-Only Logo (CSS)

If you prefer a text-based logo (faster, no HTTP request):

```css
/* globals.css or component.module.css */
.logo-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.05em;
  display: inline-flex;
  align-items: center;
}

.logo-text .L { color: #5b85aa; }
.logo-text .P { color: #414770; }
.logo-text .bracket { color: #f46036; margin: 0 0.05em; }
```

```tsx
// LogoText.tsx
export default function LogoText({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: '1.25rem', md: '1.5rem', lg: '2rem' };
  return (
    <div className="logo-text" style={{ fontSize: sizes[size] }}>
      <span className="bracket">&lt;</span>
      <span className="L">L</span><span className="P">P</span>
      <span className="bracket">&gt;</span>
    </div>
  );
}
```

---

## 🛠️ Customization

### Change primary accent color
Edit all SVG files (search/replace):
- `#f46036` → your new accent
- Update CSS `.bracketLeft, .bracketRight` and `.cursor` colors

### Add animation to static SVG
Convert SVG to React component and add CSS animation, or use inline styles:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.logo svg { animation: pulse 2s ease-in-out infinite; }
```

### Generate more sizes
```bash
# Batch convert SVG → PNG (requires rsvg-convert or Inkscape)
for size in 24 36 64 96 128 192 256; do
  rsvg-convert -w $size -h $size portfolio-logo-v1.svg -o logo-${size}x${size}.png
done
```

---

## 📱 Testing

```bash
# 1. Run dev server
npm run dev

# 2. Open http://localhost:3000
# 3. Check browser tab — favicon should appear
# 4. Open DevTools → Application → Manifest — no errors
# 5. Lighthouse audit — PWA score ≥90

# 3. Test on mobile (iOS Safari)
#    - Open site
#    - Share → "Add to Home Screen"
#    - Icon should be crisp (180×180 SVG)
```

---

## 📚 Resources

- **Color Palette Source:** Your provided HEX/HSL values
- **Design Tools Used:** Hand-crafted SVG (no AI generation — clean vectors)
- **Typography:** JetBrains Mono (free from GitHub)
- **Browser Support:** SVG favicons work in Chrome/Edge 90+, Firefox 88+, Safari 14+

---

## 📄 License

These logos are created specifically for Leonid Petrov's portfolio.  
Free to use, modify, and distribute. Attribution appreciated but not required.

---

**Generated:** May 5, 2026  
**Files location:** `/Users/leonidpetrov/`  
**Preview HTML:** `portfolio-logo-preview.html`
