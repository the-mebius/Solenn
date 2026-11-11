# SOLENN Website — Codebase Memory

> Auto-generated reference for Claude Code. Describes the project as of 2026-11-11.

## What This Is

Static multi-page fashion brand site. No build step, no framework. Open HTML files directly in a browser, or serve with `npx serve .` from this folder.

## Stack

| | |
|---|---|
| HTML | Vanilla, one file per page |
| CSS | Tailwind CDN (inline config per page) + `cs/styles.css` |
| JS | Vanilla — `index.js` / `cart-drawer.js` as ES modules; `shop.js` as a plain script |
| Fonts | Google Fonts — Instrument Serif + Manrope |
| Data | `products.json` (fetched client-side) |

## Design Tokens

Defined in every page's inline `tailwind.config` block and also in `cs/styles.css` as CSS vars:

| Name | Hex | Usage |
|---|---|---|
| stoneBg | `#F6F4F0` | Page background |
| stoneSurface | `#EAE8E1` | Cards, surface areas |
| archiveDark | `#121210` | Primary text, dark backgrounds |
| mutedGray | `#6B6A65` | Secondary/caption text |
| sageAccent | `#7B8B76` | Hover states, accents |

## Pages

| File | Status | Notes |
|---|---|---|
| `index.html` | ✅ Built | Video hero, horizontal product scroll, waitlist |
| `shop.html` | ✅ Built | Filter + sort catalogue grid |
| `404.html` | ✅ Built | Not-found page |
| `collections.html` | ❌ Missing | Linked in nav |
| `journal.html` | ❌ Missing | Linked in nav |
| `archive.html` | ❌ Missing | Linked in nav |
| `about.html` | ❌ Missing | Linked in nav + footer |
| `product-washed-essential.html` | ❌ Missing | Product detail page |
| `product-black-essential.html` | ❌ Missing | Product detail page |
| `product-beige-sports.html` | ❌ Missing | Product detail page |
| `product-olive-utility.html` | ❌ Missing | Product detail page |
| `product-navy-performance.html` | ❌ Missing | Product detail page |

## JS Files

- **`js/index.js`** (ES module) — Header scroll show/hide + renders homepage product scroll from `products.json`
- **`js/shop.js`** (plain script) — Fetches `products.json`, renders/filters/sorts `#product-grid`. Exposes `window.filterProducts` and `window.sortProducts` (called via `onclick` in HTML)
- **`js/cart-drawer.js`** (ES module) — Injects cart drawer HTML into `<body>`, handles open/close/render. References `cartService` global — **not defined anywhere yet**

## Products (`products.json`)

5 products. Each has: `id`, `name`, `color`, `price` (€), `image` (front photo path), `url` (detail page).

Images live in `public/images/<color>/` — 4 angles each (front, side, rear, + one variant).

## Known Issues / Gaps

1. **`cartService` undefined** — `cart-drawer.js` calls `cartService.getCart()` etc. but no service is defined. Cart will throw on open.
2. **`category` missing from products.json** — `shop.js` filters by `p.category`; Headwear/Apparel filter buttons always return empty.
3. **`object-fit` class typo** in `index.html` line 148 — class should be `object-cover` or `object-contain`.
4. **Header/footer/Tailwind config duplicated** in every HTML file — no include/template system.
5. **5 product detail pages + 4 nav pages** still to be built.

## Patterns to Follow When Adding Pages

- Copy the `<head>`, announcement bar, `<header>`, and `<footer>` blocks from `shop.html` (most up to date)
- Load `js/index.js` and `js/cart-drawer.js` as `type="module"` at bottom of `<body>`
- Use existing Tailwind token classes (`bg-[#F6F4F0]`, `text-[#121210]`, etc.) — don't introduce new colors
- Font classes: `font-serif` for Instrument Serif headings, `font-sans` (default body)
