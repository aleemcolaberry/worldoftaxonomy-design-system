# WoT AI Design System

> **Make the best UI the easiest UI for an agent to generate.**
>
> A working example of a design system that humans, developers, and AI coding
> agents can all read from. Built end-to-end with Figma MCP and Claude Code.

**Owner:** Mohammad Abdul Aleem — AI/UX Designer & Analyst · 12+ years in UI/UX,
product strategy, and design-to-code workflows.
**Portfolio:** [behance.net/uxaleem](https://behance.net/uxaleem) · Hyderabad, India

---

## What this is

This repo turns a design system into an **executable UI language**.

It is not a static style guide. It is a running React app where every component,
token, and color in the documentation is the same code that consumes them.
A designer maintains the source of truth; a developer imports it; an AI agent
can read it through MCP and generate UI that snaps to the system on first try.

The repo demonstrates the thesis behind my AI-Assisted Design Proposal —
*designers aren't cooked, they're cooking* — by walking the entire pipeline:
**Figma file → Figma MCP → React component code → branded docs site → deploy.**

---

## How it was built (the AI-driven workflow)

1. **Source design** — Started from the Ant Design Figma community file
   (MIT-licensed, designed to be forked) as a structural reference.
2. **Figma MCP** — Connected the file to Claude Code via the Figma Dev Mode
   MCP server (`http://127.0.0.1:3845/mcp`). Pulled `get_design_context`,
   `get_metadata`, `get_screenshot`, and `get_variable_defs` for every node
   that needed to be implemented.
3. **Token extraction** — Translated Figma variables into a layered CSS-variable
   foundation (`palette → neutral → semantic → typography → spacing → radius`).
4. **Component code** — Built a real React component library
   (`Button`, `ButtonGroup`, `PageHeader`, `PageFooter`, `SwatchTable`,
   `TokenTable`) wired to those tokens.
5. **Brand layer** — Applied the **WorldOfTaxonomy (WoT)** brand on top:
   - **Cyan #06B6D4** as the only saturated brand accent.
   - **Zinc 950 #09090B** as the dark surface, Zinc scale as every neutral.
   - **Geist + Geist Mono** (OFL-licensed) bundled as variable woff2.
   - WoT logo system (mark, lockup, favicon) wired through the layout
     components.
6. **Docs site** — Vite + React Router. Every page in the system documents
   itself using its own components, so drift between docs and code is
   structurally impossible.
7. **Shipped via Git** — Committed, pushed to GitHub, deployed to Vercel.

Every step above ran through Claude Code as the executing agent, with design
decisions, brand direction, and review owned by the designer.

---

## The three-layer architecture

The system follows the architecture from the proposal deck — each layer
maps to a directory in this repo.

### 1 · Design layer (source of truth)
Lives in Figma + the bundled `BRAND.md` and `/public/brand/` assets.
This is what designers edit. Token names map 1:1 to CSS variables.

### 2 · Code layer (`src/tokens/` + `src/components/`)
The implementation surface developers consume.
- `tokens/palette.css` — Cyan / Zinc / Emerald / Amber / Red 11-step scales.
- `tokens/neutral.css` — Text, icon, background, border, fill — all built from Zinc.
- `tokens/semantic.css` — Primary (cyan), Success, Warning, Info, Error, Link, focus ring.
- `tokens/typography.css` — Geist + Geist Mono, ramps, weights, composite shorthands.
- `components/Button/` — Five variants × three sizes × danger × icon-only × loading × shape.
- `components/ButtonGroup/` — Horizontal/vertical, default & compact modes.

### 3 · Agent layer (this README + the running docs)
What an AI coding agent reads to generate UI that matches the system.
The docs site itself is structured so an MCP-equipped agent can walk it
and learn the component API by example.

---

## What's in the repo

```
src/
├── tokens/          CSS-variable token foundation (6 files)
├── components/      Reusable React components
│   ├── Button/       — 5 variants × 3 sizes × danger × icon × loading
│   ├── ButtonGroup/  — horizontal / vertical, default / compact
│   ├── PageHeader/   — dark hero with breadcrumb + WoT corner mark
│   ├── PageFooter/   — branded footer
│   ├── SwatchTable/  — palette documentation table
│   └── TokenTable/   — Variable / Group / Value / Description grid
├── pages/           One page per design-system surface
│   ├── FontFamily/        — Geist + Geist Mono samples
│   ├── TextStyles/        — Base/SM/LG/XL + Heading 1–5
│   ├── ColorPalettes/     — Cyan, Zinc, Emerald, Amber, Red
│   ├── NeutralColors/     — Text, icon, surface, border, fill tokens
│   ├── BrandColors/       — Primary, success, warning, info, error, link
│   ├── Button/            — Button matrix (every variant × state)
│   ├── ButtonGroup/       — Group spec
│   ├── ButtonCompact/     — Toolbar / segmented-control anatomy
│   └── Showcase/          — Every primitive on one page
├── data/            Token tables and palette definitions
├── styles/          Global styles + home layout
└── App.tsx          Router + Home page

public/
├── brand/           Logo SVGs (mark / favicon / lockup × 3 variants)
├── fonts/           Geist + Geist Mono variable woff2 (OFL-1.1)
└── favicon.ico, apple-icon-180.png

BRAND.md             The WoT brand guide
```

---

## Running it locally

Requires Node 18+.

```bash
git clone https://github.com/aleemcolaberry/worldoftaxonomy-design-system.git
cd worldoftaxonomy-design-system
npm install
npm run dev
```

Open `http://localhost:5173/`.

Available routes:

| Route | What you'll see |
|---|---|
| `/` | Home — dark hero + nav grid for the whole system |
| `/showcase` | Every primitive on a single page |
| `/typography/font-family` | Geist + Geist Mono samples |
| `/typography/text-styles` | Type ramp (Base / SM / LG / XL + H1–H5) |
| `/colors/palettes` | The five palette scales |
| `/colors/neutral` | Zinc-based neutral tokens |
| `/colors/brand` | Cyan-based semantic tokens |
| `/components/button` | Full button matrix |
| `/components/button-group` | Horizontal + vertical groups |
| `/components/button-compact` | Compact-toolbar anatomy |

---

## Production build

```bash
npm run build       # outputs to /dist
npm run preview     # serves /dist locally
```

The build is a static SPA — deploy `/dist` to any static host. The repo is
wired for one-click Vercel deploy: connect the GitHub repo at
[vercel.com/new](https://vercel.com/new) and accept the auto-detected Vite preset.

---

## What's next (30-60-90 roadmap)

Per the proposal deck:

### 30 days — Foundation (✅ in this repo)
- ✅ Token foundation (palette + neutral + semantic + type + space + radius).
- ✅ Naming conventions aligned with Tailwind step scale.
- ✅ Brand layer applied (cyan / zinc / Geist).
- ✅ First component: Button (with ButtonGroup + Compact).

### 60 days — Build
- Expand to 8–10 core components: `Input`, `Select`, `Checkbox`, `Radio`,
  `Card`, `Modal`, `Tooltip`, `Toast`.
- Add Storybook for component-by-component browsing.
- Extract `src/tokens/` and `src/components/` into a publishable
  `@worldoftaxonomy/design-system` npm package.
- LLM component manifest — machine-readable JSON describing every prop,
  state, and import path for agents to consume.

### 90 days — Integrate & govern
- MCP server exposing the manifest so any Claude / agent session can pull
  the system without leaving its IDE.
- Quality gates: Style Dictionary token lint, `axe` for A11y, Chromatic for
  visual regression, dependency scanning.
- Contribution workflow (RFC → PR → designer signoff → release).
- Pilot integration with a first WoT product app.

---

## Quality gates (what should run on every PR — coming in the 90-day phase)

| Gate | Tool | Catches |
|---|---|---|
| Token lint | Style Dictionary / Tokens Studio | Hardcoded hex / spacing values |
| A11y | axe + Playwright | Contrast, focus, semantic labels |
| Visual regression | Chromatic / Percy | UI drift across components |
| Security | SAST + dependency scan | Unsafe inputs, vulnerable deps |
| Designer signoff | Figma + PR review | Pattern fit, UX intent |

---

## License

- **Source code** in this repo: MIT (see future `LICENSE` file).
- **Geist + Geist Mono fonts**: SIL Open Font License 1.1 (see `public/fonts/`).
- **WoT logos and brand assets**: © Mohammad Abdul Aleem — usage outside this
  project requires permission.

---

## Credits

**Designed and owned by Mohammad Abdul Aleem**
AI/UX Designer & Analyst · 12+ years
[behance.net/uxaleem](https://behance.net/uxaleem) · Hyderabad, India

**Stack used to build it** (the canvas is becoming executable):
Figma → Figma Dev Mode MCP → Claude Code → React + Vite + TypeScript → Vercel.

**AI-driven workflow** — Strategy, brand, and design decisions by Aleem;
code execution via Claude Code (Anthropic) using the Figma MCP server.
Built as a working demonstration of the design-systems-for-AI thesis from
my **"Design Systems for AI-Assisted Development"** proposal deck.

---

*Designers aren't cooked. They're cooking.*
