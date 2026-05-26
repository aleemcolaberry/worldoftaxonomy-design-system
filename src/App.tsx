import { Routes, Route, Link, NavLink } from 'react-router-dom';
import FontFamily from './pages/FontFamily/FontFamily';
import TextStyles from './pages/TextStyles/TextStyles';
import ColorPalettes from './pages/ColorPalettes/ColorPalettes';
import NeutralColors from './pages/NeutralColors/NeutralColors';
import BrandColors from './pages/BrandColors/BrandColors';
import ButtonPage from './pages/Button/Button';
import ButtonGroupPage from './pages/ButtonGroup/ButtonGroup';
import ButtonCompactPage from './pages/ButtonCompact/ButtonCompact';
import Showcase from './pages/Showcase/Showcase';
import PageFooter from './components/PageFooter/PageFooter';
import './styles/home.css';

const sections = [
  {
    group: 'Typography',
    items: [
      { to: '/typography/font-family', label: 'Font Family', summary: 'Geist + Geist Mono, the system typefaces.' },
      { to: '/typography/text-styles', label: 'Text Styles', summary: 'Base, SM, LG, XL ramps and heading scale.' },
    ],
  },
  {
    group: 'Color',
    items: [
      { to: '/colors/palettes', label: 'Color Palettes', summary: 'Brand cyan, neutral zinc, and functional state scales.' },
      { to: '/colors/neutral', label: 'Neutral Colors', summary: 'Zinc-based tokens for text, surface, border, and fill.' },
      { to: '/colors/brand', label: 'Brand Colors', summary: 'Cyan primary, plus success / warning / error states.' },
    ],
  },
  {
    group: 'Components',
    items: [
      { to: '/components/button', label: 'Button', summary: 'Five variants × three sizes, plus danger, icon-only, loading.' },
      { to: '/components/button-group', label: 'Button Group', summary: 'Horizontal and vertical clusters of related actions.' },
      { to: '/components/button-compact', label: 'Button Compact', summary: 'Tightly-bound toolbars with merged borders.' },
      { to: '/showcase', label: 'Showcase', summary: 'Every primitive on a single page — the system at a glance.' },
    ],
  },
];

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__inner">
          <img src="/brand/logo-lockup-mono-white.svg" alt="WorldOfTaxonomy" className="home-hero__lockup" />
          <p className="home-hero__tagline">
            <em>A living taxonomy of the world's knowledge.</em>
          </p>
          <p className="home-hero__lede">
            The WoT AI Design System — foundations and components built around a single
            brand accent, a precision neutral scale, and the Geist family of typefaces.
          </p>
        </div>
      </section>
      <main className="home-grid">
        <div className="home-grid__inner">
          {sections.map((section) => (
            <section key={section.group} className="home-section">
              <h2 className="home-section__title">{section.group}</h2>
              <div className="home-section__items">
                {section.items.map((item) => (
                  <NavLink key={item.to} to={item.to} className="home-card">
                    <span className="home-card__label">{item.label}</span>
                    <span className="home-card__summary">{item.summary}</span>
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <PageFooter />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/typography/font-family" element={<FontFamily />} />
      <Route path="/typography/text-styles" element={<TextStyles />} />
      <Route path="/colors/palettes" element={<ColorPalettes />} />
      <Route path="/colors/neutral" element={<NeutralColors />} />
      <Route path="/colors/brand" element={<BrandColors />} />
      <Route path="/components/button" element={<ButtonPage />} />
      <Route path="/components/button-group" element={<ButtonGroupPage />} />
      <Route path="/components/button-compact" element={<ButtonCompactPage />} />
      <Route path="/showcase" element={<Showcase />} />
    </Routes>
  );
}
