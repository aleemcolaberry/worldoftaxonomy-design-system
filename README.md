<div align="center">

# WoT AI Design System

### Make the best UI the easiest UI for an agent to generate.

A working example of a design system that humans, developers, and AI coding
agents can all read from. Built end-to-end with **Figma MCP** and **Claude Code**.

[**Live site**](https://worldoftaxonomy-design-system1.vercel.app/) ·
[Watch the explainer](#watch-the-explainer-2-min) ·
[Figma source](https://www.figma.com/design/RDtxYJx71BmsUWmF6j4pQG/Colaberry-Design-System-V1?node-id=784-2107) ·
[Brand guide](./BRAND.md) ·
[Portfolio](https://behance.net/uxaleem)

<br />

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Figma MCP](https://img.shields.io/badge/Figma_MCP-F24E1E?logo=figma&logoColor=white)](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server)
[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-000000?logo=vercel&logoColor=white)](https://worldoftaxonomy-design-system1.vercel.app/)
[![Built with Claude](https://img.shields.io/badge/Built_with-Claude_Code-D97757)](https://claude.com/claude-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

</div>

<br />

<p align="center">
  <img src="./docs/images/ai-driven-design-system.png"
       alt="The AI-Driven Design System: bridging human creativity and machine intelligence — three layers (Designer-owned design, Developer-consumable code, Agent-consumable LLM), surrounded by quality gates and the 90-day implementation roadmap."
       width="100%" />
</p>

<br />

<div align="center">

### Watch the explainer (2 min)

<video src="https://github.com/aleemcolaberry/worldoftaxonomy-design-system/raw/main/docs/videos/ai-assisted-design-proposal.mp4" controls width="720" muted>
  Your browser does not support the inline video tag.
  <a href="https://youtu.be/IgvbQH588aY">Watch on YouTube instead.</a>
</video>

<sub>Also available on <a href="https://youtu.be/IgvbQH588aY">YouTube</a>.</sub>

</div>

---

## Owner

**Mohammad Abdul Aleem** · AI/UX Designer & Analyst · 12+ years
in UI/UX, product strategy, and design-to-code workflows.

[behance.net/uxaleem](https://behance.net/uxaleem) · Hyderabad, India · He/Him

> *Designers aren't cooked. They're cooking.*

---

## What this is

This repo turns a design system into an **executable UI language**.

Not a static style guide — a running React app where every component, token,
and color in the docs is the same code that consumes them. A designer
maintains the source of truth; a developer imports it; an AI agent can read
it through MCP and generate UI that snaps to the system on the first try.

It demonstrates the thesis of my **AI-Assisted Design Proposal** by walking
the full pipeline end-to-end:

```
Figma file  →  Figma MCP  →  Claude Code  →  React component code  →  branded docs site  →  Vercel
```

---

## How it was built (the AI-driven workflow)

| # | Step | Tooling |
|---|---|---|
| 1 | **Source design** — [Colaberry-Design-System-V1](https://www.figma.com/design/RDtxYJx71BmsUWmF6j4pQG/Colaberry-Design-System-V1?node-id=784-2107) Figma file (forked from the Ant Design community file, MIT-licensed) | Figma |
| 2 | **Connected Figma MCP** — Dev Mode MCP server on `localhost:3845/mcp` | Figma Desktop |
| 3 | **Pulled context for every node** | `get_design_context` · `get_metadata` · `get_screenshot` · `get_variable_defs` |
| 4 | **Translated tokens** into a layered CSS-variable foundation | `palette → neutral → semantic → typography → spacing → radius` |
| 5 | **Built real React components** wired to those tokens | `Button`, `ButtonGroup`, `PageHeader`, `PageFooter`, `SwatchTable`, `TokenTable` |
| 6 | **Applied the WorldOfTaxonomy brand** on top — Cyan #06B6D4, Zinc 950, Geist + Geist Mono | `BRAND.md`, `public/brand/`, `public/fonts/` |
| 7 | **Shipped** — Git → GitHub → Vercel, [live here](https://worldoftaxonomy-design-system1.vercel.app/) | Standard pipeline |

Every step ran through **Claude Code** as the executing agent. Design
decisions, brand direction, and review owned by the designer.

---

## The three-layer architecture

> *(See the infographic at the top of this README for the full picture.)*

### 1 · Design layer (source of truth)
Figma + the bundled `BRAND.md` and `/public/brand/` assets.
Where the designer edits. Token names map 1:1 to CSS variables.

### 2 · Code layer (developer-consumable)
- `src/tokens/palette.css` — Cyan / Zinc / Emerald / Amber / Red 11-step scales.
- `src/tokens/neutral.css` — Text, icon, background, border, fill — all built from Zinc.
- `src/tokens/semantic.css` — Primary, Success, Warning, Info, Error, Link, focus ring.
- `src/tokens/typography.css` — Geist + Geist Mono, ramps, weights, composite shorthands.
- `src/components/Button/` — Five variants × three sizes × danger × icon-only × loading × shape.
- `src/components/ButtonGroup/` — Horizontal / vertical, default & compact modes.

### 3 · Agent layer (LLM-consumable)
This README + the running docs site + the Figma MCP feed.
What an AI agent reads to generate UI that matches the system.

<br />

<p align="center">
  <img src="./docs/images/executable-ui-language.png"
       alt="WoT AI Design System — the executable UI language. Infinity-loop visualization of the three layers (Design source of truth, Code implementation surface, Agent consumption layer) plus the 90-day evolution roadmap with token-lint, A11y, and visual-regression gates."
       width="100%" />
</p>

---

## Repo structure

```
src/
├── tokens/          CSS-variable token foundation (6 files)
├── components/      Reusable React components
│   ├── Button/        — 5 variants × 3 sizes × danger × icon × loading
│   ├── ButtonGroup/   — horizontal / vertical, default / compact
│   ├── PageHeader/    — dark hero with breadcrumb + WoT corner mark
│   ├── PageFooter/    — branded footer
│   ├── SwatchTable/   — palette documentation table
│   └── TokenTable/    — Variable / Group / Value / Description grid
├── pages/           One page per design-system surface
│   ├── FontFamily/         — Geist + Geist Mono samples
│   ├── TextStyles/         — Base / SM / LG / XL + Heading 1–5
│   ├── ColorPalettes/      — Cyan, Zinc, Emerald, Amber, Red
│   ├── NeutralColors/      — Text, icon, surface, border, fill tokens
│   ├── BrandColors/        — Primary, success, warning, info, error, link
│   ├── Button/             — Button matrix (every variant × state)
│   ├── ButtonGroup/        — Group spec
│   ├── ButtonCompact/      — Toolbar / segmented-control anatomy
│   └── Showcase/           — Every primitive on one page
├── data/            Token tables and palette definitions
├── styles/          Global styles + home layout
└── App.tsx          Router + Home page

public/
├── brand/           Logo SVGs (mark / favicon / lockup × 3 variants)
├── fonts/           Geist + Geist Mono variable woff2 (OFL-1.1)
└── favicon.ico, apple-icon-180.png

docs/
└── images/          Diagrams used in this README

BRAND.md             The WoT brand guide
```

---

## Running locally

Requires Node 18+.

```bash
git clone https://github.com/aleemcolaberry/worldoftaxonomy-design-system.git
cd worldoftaxonomy-design-system
npm install
npm run dev
```

Open [`http://localhost:5173/`](http://localhost:5173/).

### Routes

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

## Production build & deployment

```bash
npm run build       # outputs to /dist
npm run preview     # serves /dist locally
```

Static SPA — deploys to any static host.

This project is live on Vercel:
**[worldoftaxonomy-design-system1.vercel.app](https://worldoftaxonomy-design-system1.vercel.app/)**

Every push to `main` triggers an auto-deploy through the GitHub ↔ Vercel
integration. Pull requests get their own preview URL for design review
before merge.

---

## What's next — the 30-60-90 roadmap

### 30 days · Foundation &nbsp;✅ shipped in this repo
- ✅ Token foundation (palette + neutral + semantic + type + space + radius).
- ✅ Naming conventions aligned with Tailwind step scale.
- ✅ WoT brand layer applied (Cyan / Zinc / Geist).
- ✅ First component: Button (with ButtonGroup + Compact).

### 60 days · Build
- Expand to 8–10 core components: `Input`, `Select`, `Checkbox`, `Radio`,
  `Card`, `Modal`, `Tooltip`, `Toast`.
- Add **Storybook** for component-by-component browsing.
- Extract `src/tokens/` + `src/components/` into a publishable
  `@worldoftaxonomy/design-system` npm package.
- **LLM component manifest** — machine-readable JSON describing every prop,
  state, and import path for agents to consume directly.

### 90 days · Integrate & govern
- **MCP server** exposing the manifest so any Claude / agent session can pull
  the system without leaving its IDE.
- **Quality gates**: Style Dictionary token lint, `axe` for A11y, Chromatic
  for visual regression, dependency scanning.
- Contribution workflow — RFC → PR → designer signoff → release.
- Pilot integration with a first WoT product app.

---

## Quality gates (the proposal's five-gate model)

| Gate | Tool | Catches |
|---|---|---|
| **Token lint** | Style Dictionary / Tokens Studio | Hardcoded hex / spacing values |
| **A11y** | axe + Playwright | Contrast, focus, semantic labels |
| **Visual regression** | Chromatic / Percy | UI drift across components |
| **Security** | SAST + dependency scan | Unsafe inputs, vulnerable deps |
| **Designer signoff** | Figma + PR review | Pattern fit, UX intent |

---

## License

| What | License |
|---|---|
| Source code in this repo | MIT (see future `LICENSE` file) |
| Geist + Geist Mono fonts | [SIL Open Font License 1.1](./public/fonts/) |
| WoT logos and brand assets | © Mohammad Abdul Aleem — usage outside this project requires permission |

---

## Credits

**Designed and owned by Mohammad Abdul Aleem**
AI/UX Designer & Analyst · 12+ years
[behance.net/uxaleem](https://behance.net/uxaleem) · Hyderabad, India

**Stack used to build it** — *the canvas is becoming executable:*

```
Figma  →  Figma Dev Mode MCP  →  Claude Code  →  React + Vite + TypeScript  →  Vercel
```

**AI-driven workflow** — Strategy, brand, and design decisions by Aleem;
code execution via Claude Code (Anthropic) using the Figma MCP server.
Built as a working demonstration of the design-systems-for-AI thesis from my
**"Design Systems for AI-Assisted Development"** proposal deck.

<br />

<div align="center">

*The canvas is becoming executable.*

</div>
