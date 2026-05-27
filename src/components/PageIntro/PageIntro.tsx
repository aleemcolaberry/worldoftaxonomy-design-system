import styles from './PageIntro.module.css';

export interface PageIntroProps {
  /** Small uppercase category above the title (e.g. "Foundations · Color"). */
  eyebrow?: string;
  /** Main page heading. */
  title: string;
  /** Short paragraph below the title. */
  lede?: string;
}

export default function PageIntro({ eyebrow, title, lede }: PageIntroProps) {
  return (
    <header className={styles.intro}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
