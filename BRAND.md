# WorldOfTaxonomy — Brand Guide

> _A living taxonomy of the world's knowledge._

The WoT mark is a **globe held in a precision crosshair**: a white reticle ring frames a cyan continent-form, with four cyan connector nodes pinned at N / E / S / W to suggest taxonomy edges branching outward into a wider knowledge graph. The mark reads as both *cartography* (a planet under measurement) and *network* (a node with four bound peers).

---

## 1. Logo system

The logo ships as **three master SVGs**, each available in a default colour, mono-white, and mono-black variant.

| File | Purpose |
| --- | --- |
| `logo-mark.svg` | Transparent mark for inline placements (header, footer text). |
| `logo-favicon.svg` | Tiled mark — rounded dark square with the full glyph baked in. Use for browser chrome, app icons and any badge / avatar role. |
| `logo-lockup.svg` | Mark + `WorldOfTaxonomy` wordmark side-by-side. README, footer, marketing. |

**Theme handling — Option A (preferred).**
The default-colour `logo-mark.svg` and `logo-lockup.svg` paint their dark elements with `fill="currentColor"`. Drop the SVG into a parent that sets `color`, and the mark inherits — light text on dark, dark text on light, with no JS wiring. The cyan accent (globe interior + connector dots) stays cyan in both modes.

```jsx
// Header.tsx — one file, both themes
<span className="text-zinc-900 dark:text-white">
  <LogoLockup />
</span>
```

**Option B fallback.** If a downstream consumer can't preserve `currentColor`, swap to `logo-mark-mono-white.svg` / `logo-mark-mono-black.svg` (and the lockup pair) inside a `useTheme()` switch.

---

## 2. Colour

| Token | Value | OKLCH | Use |
| --- | --- | --- | --- |
| **Cyan / Accent** | `#06B6D4` | `oklch(0.746 0.131 213.5)` | CTAs, globe interior, connector dots, focus rings. The only saturated colour in the system. |
| **Zinc 950 / Background dark** | `#09090B` | `oklch(0.141 0.005 285.8)` | Default app background. The mark sits directly on this. |
| **White / Background light** | `#FFFFFF` | `oklch(1 0 0)` | Light-mode background. |
| **Zinc 900 / Letterform dark** | `#141414` | `oklch(0.196 0 0)` | Mark dark elements when explicitly mono-black. |

Coral / orange is **not** a brand colour — it appears only as the CTA accent on `worldoftaxonomy.com`. The logo never uses it.

---

## 3. Typography

| Role | Family | Weight | Notes |
| --- | --- | --- | --- |
| Wordmark | **Geist** | 500 (Medium) | `letter-spacing: 0.2em`. Locked into the lockup SVG. |
| UI / Display | Geist | 400 / 500 / 600 | Variable, ships with Next.js/Vercel font loader. |
| Mono / Code | Geist Mono | 400 | For schema fragments, taxonomy IDs. |

The Geist family is **bundled in this hand-off** at `assets/fonts/` — variable
woff2 plus static fallbacks, the official OFL license, and a drop-in
`fonts.css` with `@font-face` declarations and `--font-sans` / `--font-mono`
CSS variables. See `assets/fonts/README.md` for install instructions.
Geist is open-source under the **SIL Open Font License 1.1**, free for any
commercial or open-source project.

If you can't ship the woff2 files for some reason, fall back to
`Inter, "Helvetica Neue", Arial, sans-serif`.

---

## 4. Clear space & minimum size

Clear space = the radius of one cyan connector node (`x` in the diagram below). No other element — type, image edge, button — may enter that buffer on any side of the mark.

```
   x
 ┌─────────────────────────┐
x│  [   WoT mark   ]     │x
 └─────────────────────────┘
   x
```

| Form | Minimum size |
| --- | --- |
| `logo-mark.svg` | 40 px wide on screen / 12 mm in print |
| `logo-favicon.svg` | 16 px wide |
| `logo-lockup.svg` | 160 px wide on screen / 32 mm in print |

Below those sizes, switch to the favicon mark.

---

## 5. Do / Don't

**Do**
- Place on `#FFFFFF` or `#09090B` (other near-blacks ≥ `oklch(0.18 …)` are fine).
- Let `currentColor` drive theme inheritance.
- Keep the cyan accent at `#06B6D4` — no shifts, no gradients.

**Don't**
- Don't recolour the cyan globe / dots into a second hue.
- Don't apply drop shadows, bevels, or outer glows to the mark.
- Don't compress the lockup horizontally — the mark-to-wordmark ratio is fixed.
- Don't place the default-colour mark on cyan; use mono-white instead.
- Don't substitute the wordmark font — the lockup SVG bakes in Geist Medium with 0.2em tracking.

---

## 6. Asset manifest

```
assets/
├─ logo-mark.svg                  Transparent mark, currentColor-themable
├─ logo-mark-mono-white.svg       Solid white
├─ logo-mark-mono-black.svg       Solid black
├─ logo-favicon.svg               Tiled mark, dark fill, all sizes
├─ logo-favicon-light.svg         Light tile variant
├─ logo-lockup.svg                Mark + wordmark, currentColor-themable
├─ logo-lockup-mono-white.svg
├─ logo-lockup-mono-black.svg
├─ favicon.ico                    Multi-res 16/32/48
├─ apple-icon-180.png             iOS Add-to-Home
├─ icon-192.png                   PWA / Android
├─ icon-512.png                   PWA splash
├─ logo-square-400.png            GitHub org, Twitter/X, LinkedIn
├─ logo-square-600.png            Schema.org Organization.logo
├─ social-card-1200x630.png       OpenGraph / Twitter / LinkedIn
├─ github-social-1280x640.png     GitHub repo social preview
├─ BRAND.md                       This file
└─ fonts/                         Geist Sans + Mono webfonts (OFL)
   ├─ Geist-Variable.woff2
   ├─ Geist-Regular.woff2
   ├─ Geist-Medium.woff2
   ├─ Geist-SemiBold.woff2
   ├─ Geist-Bold.woff2
   ├─ GeistMono-Variable.woff2
   ├─ GeistMono-Regular.woff2
   ├─ GeistMono-Medium.woff2
   ├─ fonts.css                    @font-face declarations + CSS vars
   ├─ README.md                    Install instructions (Next.js, Vite, plain HTML)
   └─ OFL.txt                      SIL Open Font License 1.1
```

---

_v1.0 · designed for `worldoftaxonomy.com` · April 2026_
