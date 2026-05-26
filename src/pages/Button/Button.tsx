import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';
import Btn, { type ButtonVariant, type ButtonSize } from '../../components/Button/Button';
import styles from './Button.module.css';

const variants: ButtonVariant[] = ['primary', 'default', 'dashed', 'text', 'link'];
const sizes: ButtonSize[] = ['lg', 'md', 'sm'];

function VariantBlock({ danger = false, title }: { danger?: boolean; title: string }) {
  return (
    <section className={styles.block} aria-labelledby={`block-${title}`}>
      <h3 id={`block-${title}`} className={styles.blockTitle}>{title}</h3>
      <div className={styles.grid}>
        <span />
        {variants.map((v) => (
          <span key={v} className={styles.colHead}>{v}</span>
        ))}

        {sizes.map((s) => (
          <>
            <span key={`label-${s}`} className={styles.rowHead}>{s}</span>
            {variants.map((v) => (
              <div key={`${s}-${v}`} className={styles.cell}>
                <Btn variant={v} size={s} danger={danger}>Button</Btn>
                <Btn variant={v} size={s} danger={danger} disabled>Button</Btn>
              </div>
            ))}
          </>
        ))}
      </div>
    </section>
  );
}

function IconBlock() {
  // Simple inline icon used to demo icon-only buttons.
  const Search = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Icon-only</h3>
      <div className={styles.row}>
        {sizes.map((s) => (
          <div key={s} className={styles.iconRow}>
            <Btn variant="primary" size={s} iconOnly aria-label="Search"><Search /></Btn>
            <Btn variant="default" size={s} iconOnly aria-label="Search"><Search /></Btn>
            <Btn variant="dashed" size={s} iconOnly aria-label="Search"><Search /></Btn>
            <Btn variant="text" size={s} iconOnly aria-label="Search"><Search /></Btn>
            <Btn variant="primary" size={s} iconOnly shape="circle" aria-label="Search"><Search /></Btn>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoadingBlock() {
  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>Loading</h3>
      <div className={styles.row}>
        {sizes.map((s) => (
          <div key={s} className={styles.iconRow}>
            <Btn variant="primary" size={s} loading>Submitting</Btn>
            <Btn variant="default" size={s} loading>Submitting</Btn>
            <Btn variant="primary" size={s} danger loading>Deleting</Btn>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ButtonPage() {
  return (
    <>
      <PageHeader
        breadcrumb={['Style Guide', 'Components', 'Button']}
        title="Button"
        description="Buttons trigger actions. The system ships five variants — primary, default, dashed, text, link — across three sizes, with a danger flag and icon-only, loading, and circular forms."
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <VariantBlock title="Standard" />
          <VariantBlock title="Danger" danger />
          <IconBlock />
          <LoadingBlock />
        </div>
      </main>
      <PageFooter />
    </>
  );
}
