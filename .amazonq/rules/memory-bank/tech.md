# Tech — House Africa MTÜ Website

## Stack Overview
Vanilla static website — no framework, no build tool, no package manager.

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Markup      | HTML5 (semantic, ARIA-enhanced)   |
| Styling     | CSS3 (custom properties, grid, flexbox) |
| Scripting   | Vanilla JavaScript (ES6+, IIFE)   |
| Fonts       | Google Fonts — Poppins + Lato     |
| Icons       | Inline SVG (no icon library)      |
| Images      | JPEG / PNG (local `/images/` dir) |
| Hosting     | Static file host (houseafrica.ee) |

## JavaScript Features Used
- `IntersectionObserver` — scroll reveal, threshold 0.12
- `document.querySelector` / `querySelectorAll`
- `classList.toggle / add / remove`
- `setAttribute` for ARIA state management
- `window.addEventListener('scroll', …, { passive: true })`
- `new FormData(form)` pattern noted in TODO for future submission
- `e.key` keyboard event handling (Escape, ArrowLeft, ArrowRight)
- `element.validity.valid` for native email validation

## CSS Features Used
- CSS custom properties (`--clr-*`, `--space-*`, `--radius-*`, `--shadow-*`)
- `clamp()` for fluid typography (`h1`, `h2`)
- CSS Grid with responsive `grid-template-columns`
- Flexbox for header, buttons, cards
- `backdrop-filter: blur(8px)` on sticky header
- `scroll-behavior: smooth` + `scroll-padding-top` for anchor nav
- `aspect-ratio: 1` on gallery items
- `@media (prefers-reduced-motion: reduce)` accessibility block
- `100svh` (small viewport height) for hero section

## Fonts
- **Poppins** (400, 500, 600, 700) — headings, labels, buttons, nav
- **Lato** (400, 700) — body text
- Loaded via Google Fonts with `preconnect` hints

## Colour Palette (from logo)
| Token              | Value     | Usage                        |
|--------------------|-----------|------------------------------|
| `--clr-red`        | `#dc3c14` | Primary CTA, accents         |
| `--clr-blue`       | `#1464a0` | Secondary, social section bg |
| `--clr-gold`       | `#c8882a` | Eyebrow text, footer links   |
| `--clr-text`       | `#1a1a2e` | Body text, hero/footer bg    |
| `--clr-bg`         | `#f8f6f4` | Page background              |
| `--clr-white`      | `#ffffff` | Cards, form backgrounds      |

## Responsive Breakpoints
| Breakpoint | Columns unlocked                                      |
|------------|-------------------------------------------------------|
| < 640 px   | All grids single-column; hamburger nav active         |
| ≥ 640 px   | Pillars 3-col, community 2-col, gallery 3-col         |
| ≥ 900 px   | About/contact 2-col, community/gallery 3-4 col, footer 3-col |
| ≤ 767 px   | Mobile nav overlay active                             |

## Development Commands
No build step required. Open `index.html` directly in a browser, or serve with any static server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .

# VS Code
# Use the Live Server extension
```

## Deployment
Drop all files (`index.html`, `styles.css`, `script.js`, `images/`) onto any static host (Netlify, GitHub Pages, Vercel, traditional web hosting).

## Planned / TODO (from code comments)
- Replace contact form front-end stub with real submission:
  - `fetch(form.action, { method: 'POST', body: new FormData(form) })`
  - Formspree: set `action="https://formspree.io/f/YOUR_ID"` and remove `e.preventDefault()`
  - Netlify Forms: add `netlify` attribute to `<form>`
- Replace `og-image.jpg` placeholder with a real Open Graph image
- Replace `about-placeholder` div with a real community photo `<img>`
