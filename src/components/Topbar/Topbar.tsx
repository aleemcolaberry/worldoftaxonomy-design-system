import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useRepo, formatCount } from '../../lib/useRepo';
import styles from './Topbar.module.css';

export default function Topbar() {
  const { data } = useRepo();
  return (
    <header className={styles.topbar}>
      <Link to="/" className={styles.brand} aria-label="WorldOfTaxonomy home">
        <img src="/brand/logo-favicon.svg" alt="" className={styles.mark} />
        <span className={styles.wordmark}>worldoftaxonomy</span>
        <span className={styles.tag}>design system</span>
      </Link>

      <div className={styles.searchSlot}>
        <button type="button" className={styles.searchBtn} disabled>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>Search docs…</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </button>
      </div>

      <div className={styles.right}>
        <a
          href="https://github.com/aleemcolaberry/worldoftaxonomy-design-system"
          target="_blank"
          rel="noreferrer"
          className={styles.ghLink}
          aria-label="View source on GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.7.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          <span className={styles.ghLabel}>GitHub</span>
          {data && (
            <span className={styles.ghStars}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2 14.6 8.6 22 9.3l-5.5 4.9L18 22l-6-3.6L6 22l1.5-7.8L2 9.3l7.4-.7L12 2Z" />
              </svg>
              {formatCount(data.stars)}
            </span>
          )}
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
