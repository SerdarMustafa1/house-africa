# Structure — House Africa MTÜ Website

## Directory Layout
```
house-africa/
├── index.html          # Single-page application entry point (all sections)
├── styles.css          # All styles — design tokens, components, responsive rules
├── script.js           # All interactivity — nav, reveal, gallery lightbox, form
├── images/
│   ├── logo.png        # Organisation logo
│   ├── event.jpeg      # Upcoming event hero image
│   └── gallery-1.jpeg … gallery-13.png   # Photo gallery assets (13 images)
└── .amazonq/
    └── rules/
        └── memory-bank/   # Amazon Q memory bank documentation
```

## Page Sections (in DOM order)
| Section ID   | Element      | Purpose                                      |
|--------------|--------------|----------------------------------------------|
| `#top`       | `<header>`   | Sticky nav with logo, links, hamburger, CTA  |
| hero         | `<section>`  | Full-viewport branded landing                |
| `#about`     | `<section>`  | Organisation description + visual            |
| `#mission`   | `<section>`  | Three core pillars (Culture/Education/Dialogue) |
| `#community` | `<section>`  | Activity cards grid                          |
| event        | `<section>`  | Upcoming event with image                    |
| gallery      | `<section>`  | Photo grid + lightbox overlay                |
| social       | `<section>`  | Social media links                           |
| `#contact`   | `<section>`  | Contact info + validated form                |
| —            | `<footer>`   | Brand, nav links, social icons, copyright    |
| —            | `<button>`   | Fixed back-to-top button                     |
| —            | `<div>`      | Lightbox overlay (hidden by default)         |

## Core Components

### HTML (index.html)
- Single HTML file; all sections are anchored with `id` attributes for smooth-scroll navigation
- Semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- Inline SVG icons for pillar cards (no icon font dependency)
- Schema.org JSON-LD script block in `<head>` for NGO structured data
- `aria-*` attributes on interactive elements (hamburger, lightbox buttons, nav)

### CSS (styles.css)
- CSS custom properties (design tokens) defined on `:root` — colours, spacing, radii, shadows, fonts, transitions
- Mobile-first layout; grid breakpoints at 640 px and 900 px
- Component sections separated by block comments
- `.reveal` / `.reveal.visible` animation classes driven by JS IntersectionObserver
- `@media (prefers-reduced-motion: reduce)` block disables all transitions/animations

### JavaScript (script.js)
- Single IIFE (`(function(){ 'use strict'; })()`) — no modules, no bundler
- Feature areas: sticky header, mobile nav toggle, active nav link tracking, scroll reveal, contact form validation, back-to-top visibility
- Lightbox: array of gallery images, prev/next/close controls, keyboard (Escape/ArrowLeft/ArrowRight) support
- Form: front-end only validation; TODO comment marks where real submission (Formspree / Netlify / fetch) should be wired

## Architectural Patterns
- **No framework / no build step** — plain HTML + CSS + JS, deployable as static files
- **Single-page layout** — all content in one HTML file, navigation via anchor links
- **Design token system** — all visual values centralised in CSS `:root` variables
- **Progressive enhancement** — page is readable without JS; JS adds interactivity on top
- **Accessibility-first** — ARIA labels, focus-visible styles, reduced-motion support, semantic HTML
