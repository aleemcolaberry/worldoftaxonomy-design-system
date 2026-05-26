import { Link } from 'react-router-dom';
import styles from './PageFooter.module.css';

export default function PageFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.markRow} aria-label="WorldOfTaxonomy home">
          <img src="/brand/logo-favicon.svg" alt="" className={styles.mark} />
          <span className={styles.wordmark}>WorldOfTaxonomy</span>
        </Link>
        <p className={styles.meta}>
          © {new Date().getFullYear()} · WoT AI Design System v1
        </p>
      </div>
    </footer>
  );
}
