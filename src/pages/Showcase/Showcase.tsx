import { Link } from 'react-router-dom';
import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import Btn from '../../components/Button/Button';
import Group from '../../components/ButtonGroup/ButtonGroup';
import styles from './Showcase.module.css';

function StarRow() {
  return (
    <div className={styles.stars} aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="var(--color-amber-500)" aria-hidden>
          <path d="M12 2 14.6 8.6 22 9.3l-5.5 4.9L18 22l-6-3.6L6 22l1.5-7.8L2 9.3l7.4-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function CardTile() {
  return (
    <div className={styles.card}>
      <header className={styles.cardHead}>
        <h4 className={styles.cardTitle}>Taxonomy node</h4>
        <a href="#more" className={styles.cardMore}>More</a>
      </header>
      <div className={styles.cardSlot}>
        <code>schema://wot/v1/edge</code>
      </div>
    </div>
  );
}

function InputTile() {
  return (
    <label className={styles.inputWrap}>
      <span className={styles.inputLabel}>
        Input Label
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <em>(optional)</em>
      </span>
      <input className={styles.input} placeholder="Enter a value" />
    </label>
  );
}

function FormTile() {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input className={styles.input} placeholder="Username" />
      <input className={styles.input} placeholder="Password" type="password" />
      <label className={styles.checkRow}>
        <input type="checkbox" />
        <span>Remember me</span>
        <a href="#forgot" className={styles.link}>Forgot password</a>
      </label>
      <Btn variant="primary" block size="md">Log in</Btn>
      <p className={styles.formFooter}>
        Or <a href="#signup" className={styles.link}>Register now!</a>
      </p>
    </form>
  );
}

function AlertTile({ tone, title, body }: { tone: 'info' | 'success' | 'warning' | 'error'; title: string; body?: string }) {
  return (
    <div className={`${styles.alert} ${styles[`alert-${tone}`]}`} role="status">
      <span className={styles.alertDot} aria-hidden />
      <div className={styles.alertBody}>
        <strong>{title}</strong>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}

function NotificationTile() {
  return (
    <article className={styles.notification}>
      <header className={styles.notifHead}>
        <span className={styles.notifIcon} aria-hidden />
        <h4>Notification title</h4>
        <button className={styles.notifClose} aria-label="Dismiss">×</button>
      </header>
      <p className={styles.notifBody}>
        Indexing complete — 1,284 nodes synced to the taxonomy graph.
      </p>
      <div className={styles.notifActions}>
        <Btn variant="link" size="sm">Skip</Btn>
        <Btn variant="primary" size="sm">View</Btn>
      </div>
    </article>
  );
}

export default function Showcase() {
  return (
    <AppShell>
      <PageIntro
        eyebrow="Demos"
        title="Showcase"
        lede="Every primitive on a single page — composing the same Buttons, inputs, forms, alerts, and notifications that ship in the system."
      />
      <div className={styles.container}>
          <section className={styles.left}>
            <h2 className={styles.headline}>
              Build with <span className={styles.accent}>WoT primitives</span> from
              day one.
            </h2>
            <p className={styles.lede}>
              Every surface, control, and feedback pattern in the system is
              derived from the four base tokens — Cyan, Zinc, Geist, and the
              radius scale. Tokens stay swappable; the components stay the same.
            </p>
            <div className={styles.ctaRow}>
              <Link to="/" className={styles.ctaPrimary}>
                Browse the full guide
              </Link>
              <Link to="/components/button" className={styles.linkBtn}>
                Component reference →
              </Link>
            </div>
            <ul className={styles.bullets}>
              <li>Cyan #06B6D4 — the only brand accent</li>
              <li>Zinc scale — every neutral, every surface</li>
              <li>Geist + Geist Mono — both shipped, both OFL-licensed</li>
            </ul>
          </section>

          <section className={styles.right}>
            <div className={styles.tile + ' ' + styles.tile1}>
              <InputTile />
            </div>
            <div className={styles.tile + ' ' + styles.tile2}>
              <StarRow />
              <CardTile />
            </div>
            <div className={styles.tile + ' ' + styles.tile3}>
              <div className={styles.btnSampler}>
                <Group>
                  <Btn variant="primary">Button</Btn>
                  <Btn variant="default">Button</Btn>
                  <Btn variant="dashed">Button</Btn>
                  <Btn variant="text">Button</Btn>
                </Group>
                <Group>
                  <Btn variant="primary" size="lg">Primary</Btn>
                  <Btn variant="default" size="lg">Default</Btn>
                  <Btn variant="dashed" size="lg">Dashed</Btn>
                </Group>
              </div>
            </div>
            <div className={styles.tile + ' ' + styles.tile4}>
              <FormTile />
            </div>
            <div className={styles.tile + ' ' + styles.tile5}>
              <NotificationTile />
            </div>
            <div className={styles.tile + ' ' + styles.tile6}>
              <AlertTile tone="info" title="Alert title"
                body="Indexing complete — 1,284 nodes synced to the taxonomy graph." />
              <AlertTile tone="info" title="Alert title" />
              <AlertTile tone="success" title="Alert title" />
            </div>
          </section>
        </div>
    </AppShell>
  );
}
