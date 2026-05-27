import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import styles from './FontFamily.module.css';

interface FamilyBlock {
  name: string;
  fontFamily: string;
  description: string;
  variants: { label: string; className: string }[];
}

const families: FamilyBlock[] = [
  {
    name: 'Geist',
    fontFamily: "'Geist', sans-serif",
    description:
      'The WoT interface typeface. Variable woff2, optical weights 100–900, with static 400 / 500 / 600 / 700 fallbacks. Ships under SIL OFL 1.1.',
    variants: [
      { label: 'Normal', className: 'normal' },
      { label: 'Strong', className: 'strong' },
      { label: 'Underline', className: 'underline' },
      { label: 'Delete', className: 'delete' },
      { label: 'Italic', className: 'italic' },
    ],
  },
  {
    name: 'Geist Mono',
    fontFamily: "'Geist Mono', monospace",
    description:
      'Used for schema fragments, taxonomy IDs, code blocks, and design-token values throughout the system.',
    variants: [
      { label: 'Normal', className: 'mono-normal' },
      { label: 'Strong', className: 'mono-strong' },
    ],
  },
];

export default function FontFamily() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Foundations · Typography"
        title="Font Family"
        lede="The system pairs Geist (sans) with Geist Mono. Both are open source under the SIL OFL 1.1 and ship as variable woff2 inside /public/fonts/."
      />
      {families.map((family) => (
        <section key={family.name} className={styles.style}>
          <header className={styles.styleHeader}>
            <h2 className={styles.familyName}>{family.name}</h2>
            <p className={styles.description}>{family.description}</p>
            <p className={styles.glyphs} style={{ fontFamily: family.fontFamily }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 !@#$%^&amp;*()
            </p>
          </header>
          <ul className={styles.samples}>
            {family.variants.map((v) => (
              <li key={v.label} className={styles[v.className]}>
                {family.name} {v.label}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </AppShell>
  );
}
